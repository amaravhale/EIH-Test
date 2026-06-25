import OpenAI from 'openai';
import type {
  MarketEvent,
  AggregatedTheme,
  LLMExtractedEvent,
  EmpProduct,
  DeltaStatus,
  ThemeValidation,
} from './types';
import {
  calculateRelevance,
  calculateEvidenceStrength,
  applyDecay,
  shouldFilter,
} from './scoring';

// ────────────────────────────────────────────────────────────
// Prompts
// ────────────────────────────────────────────────────────────

const EXTRACTION_SYSTEM_PROMPT = `You are the Empirisys Market Intelligence Extraction Engine. You analyze source intelligence from the European HSE (Health, Safety, Environment) and process safety market.

Your task: Given a batch of simulated market intelligence sources across four tiers (A: regulatory/official, B: procurement/contracts, C: trade press, D: business press), extract structured events.

For each event, extract:
- entityName: The company, facility, or regulatory body involved
- entityType: 'company', 'facility', 'regulator', or 'government'
- eventType: One of 'incident', 'contract_award', 'regulatory_action', 'm_and_a', 'leadership_change', 'product_launch', 'partnership', 'capex_announcement'
- title: A concise event title (max 15 words)
- summary: 2-3 sentence description of the event and its significance
- sourceUrl: A realistic URL for the source
- sourceName: Name of the publication/body
- sourceTier: 'A', 'B', 'C', or 'D'
- geography: Country or region (e.g., 'UK', 'Netherlands', 'Germany')
- sector: Industry sector (e.g., 'Oil & Gas', 'Chemicals', 'Offshore Wind')
- eventDate: ISO 8601 date string (within the last 14 days)

Rules:
- Generate exactly 8 events
- At least 2 must be Tier A (regulatory/official sources like HSE UK, BAuA, ECHA, eMARS)
- At least 2 must be Tier B (procurement: TED, OJEU, operator capex)
- Remaining can be Tier C or D
- Events must be highly realistic and specific to the European process safety market
- Do NOT include generic company press releases as primary sources
- Each event must be independently verifiable in principle

Output strictly valid JSON: { "events": [...] }`;

const AGGREGATION_SYSTEM_PROMPT = `You are the Empirisys Strategic Theme Aggregator. You receive a set of scored market events and must cluster them into actionable strategic themes.

Rules:
- Generate 3-5 themes from the provided events
- Each theme must be SUPPORTED by at least 2 events from the input. Cite event IDs.
- Do NOT invent themes that aren't backed by the evidence.
- For each theme, provide:
  - id: Unique string (e.g., "theme-001")
  - title: A clear strategic theme name
  - description: 2-3 sentences explaining the pattern
  - eventIds: Array of event IDs that support this theme
  - interpretation: {
      impact: What this means for Empirisys's pipeline
      relevantProduct: Which Empirisys product is most relevant: 'Sense', 'Boost', 'Insight360', or 'Leadership360'
      suggestedAction: One specific, actionable next step
    }
  - deltaStatus: 'new', 'intensified', 'faded', or 'stable'
  - status: Set all to 'pending_review'

Output strictly valid JSON: { "themes": [...] }`;

// ────────────────────────────────────────────────────────────
// LLM response shapes (raw JSON from OpenAI)
// ────────────────────────────────────────────────────────────

interface RawTheme {
  id: string;
  title: string;
  description: string;
  eventIds: string[];
  interpretation: {
    impact: string;
    relevantProduct: EmpProduct;
    suggestedAction: string;
  };
  deltaStatus: DeltaStatus;
  status: ThemeValidation;
}

// ────────────────────────────────────────────────────────────
// Pipeline
// ────────────────────────────────────────────────────────────

export interface PipelineResult {
  events: MarketEvent[];
  themes: AggregatedTheme[];
}

export async function runMarketIntelligencePipeline(): Promise<PipelineResult> {
  const openai = new OpenAI(); // uses OPENAI_API_KEY from env

  // ── Step 1: Extract events via LLM ──────────────────────
  const extractionResponse = await openai.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0.4,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: EXTRACTION_SYSTEM_PROMPT },
      {
        role: 'user',
        content:
          'Generate a fresh batch of market intelligence events for the current period. Today\'s date is ' +
          new Date().toISOString().slice(0, 10) +
          '.',
      },
    ],
  });

  const extractionText = extractionResponse.choices[0]?.message?.content;
  if (!extractionText) {
    throw new Error('LLM returned empty extraction response');
  }

  const parsed: { events: LLMExtractedEvent[] } = JSON.parse(extractionText);
  if (!Array.isArray(parsed.events)) {
    throw new Error('LLM extraction response missing "events" array');
  }

  // ── Step 2: Assign IDs ──────────────────────────────────
  // ── Step 3: Score each event deterministically ──────────
  const scoredEvents: MarketEvent[] = parsed.events.map((raw, index) => {
    const id = `evt-${index}`;
    const confirmationCount = 1; // single-source at extraction time

    const relevanceScore = calculateRelevance(raw);
    const evidenceStrength = calculateEvidenceStrength(raw.sourceTier, confirmationCount);
    const decayedRelevance = applyDecay(relevanceScore, raw.eventDate);

    return {
      id,
      entityName: raw.entityName,
      entityType: raw.entityType,
      eventType: raw.eventType,
      title: raw.title,
      summary: raw.summary,
      sourceUrl: raw.sourceUrl,
      sourceName: raw.sourceName,
      sourceTier: raw.sourceTier,
      geography: raw.geography,
      sector: raw.sector,
      eventDate: raw.eventDate,
      relevanceScore: decayedRelevance,
      evidenceStrength,
      confirmationCount,
      isDuplicate: false,
      lifecycleStatus: 'scored' as const,
    };
  });

  // ── Step 4: Filter below threshold ─────────────────────
  const filteredEvents = scoredEvents.filter(shouldFilter);

  if (filteredEvents.length === 0) {
    return { events: [], themes: [] };
  }

  // ── Step 5: Aggregate into themes via LLM ──────────────
  const eventsForLLM = filteredEvents.map((e) => ({
    id: e.id,
    title: e.title,
    summary: e.summary,
    eventType: e.eventType,
    entityName: e.entityName,
    geography: e.geography,
    sector: e.sector,
    relevanceScore: e.relevanceScore,
    sourceTier: e.sourceTier,
  }));

  const aggregationResponse = await openai.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0.3,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: AGGREGATION_SYSTEM_PROMPT },
      {
        role: 'user',
        content:
          'Here are the scored market events to aggregate into strategic themes:\n\n' +
          JSON.stringify(eventsForLLM, null, 2),
      },
    ],
  });

  const aggregationText = aggregationResponse.choices[0]?.message?.content;
  if (!aggregationText) {
    throw new Error('LLM returned empty aggregation response');
  }

  const parsedThemes: { themes: RawTheme[] } = JSON.parse(aggregationText);
  if (!Array.isArray(parsedThemes.themes)) {
    throw new Error('LLM aggregation response missing "themes" array');
  }

  // ── Step 6 & 7: Link events, compute theme scores ─────
  const eventMap = new Map(filteredEvents.map((e) => [e.id, e]));

  const themes: AggregatedTheme[] = parsedThemes.themes.map((raw) => {
    const linkedEvents = raw.eventIds
      .map((eid) => eventMap.get(eid))
      .filter((e): e is MarketEvent => e !== undefined);

    const themeRelevance =
      linkedEvents.length > 0
        ? Math.round(
            linkedEvents.reduce((sum, e) => sum + e.relevanceScore, 0) /
              linkedEvents.length,
          )
        : 0;

    return {
      id: raw.id,
      title: raw.title,
      description: raw.description,
      events: linkedEvents,
      interpretation: raw.interpretation,
      status: raw.status ?? 'pending_review',
      deltaStatus: raw.deltaStatus ?? 'new',
      relevanceScore: themeRelevance,
      timestamp: new Date().toISOString(),
    };
  });

  return { events: filteredEvents, themes };
}
