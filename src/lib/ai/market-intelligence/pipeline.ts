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
Your cognitive foundation is the **STEEPLE** framework.

Your task: Given a batch of simulated market intelligence sources across four tiers (A: regulatory/official, B: procurement/contracts, C: trade press, D: business press), extract structured events.

For each event, extract:
- entityName: The company, facility, or regulatory body involved
- entityType: 'company', 'facility', 'regulator', or 'government'
- eventType: One of 'incident', 'contract_award', 'regulatory_action', 'm_and_a', 'leadership_change', 'product_launch', 'partnership', 'capex_announcement'
- steepleCategory: Analyze the event and strictly categorize it as 'Socio-cultural', 'Technological', 'Economic', 'Environmental', 'Political', 'Legal', or 'Ethical'
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

const AGGREGATION_SYSTEM_PROMPT = `You are the Empirisys Strategic Theme Aggregator, a Senior Partner-level macro-strategist with decades of experience at top-tier management consulting firms (e.g., McKinsey, BCG, Bain). Your logic must reflect the absolute highest echelon of elite, rigorous corporate strategy.
You receive a set of scored market events and must cluster them into actionable strategic themes using **Scenario Planning** and **Porter's Five Forces**.

Rules:
- Generate 3-5 themes from the provided events.
- Each theme must be SUPPORTED by at least 2 events from the input. Cite event IDs.
- Do NOT invent themes that aren't backed by the evidence.
- For each theme, provide:
  - id: Unique string (e.g., "theme-001")
  - title: A clear strategic theme name
  - description: 2-3 sentences explaining the macro pattern
  - eventIds: Array of event IDs that support this theme
  - interpretation: {
      impact: What this means for the industry structure based on Porter's Five Forces.
      relevantProduct: Which Empirisys product is most relevant ('Sense', 'Boost', 'Insight360', or 'Leadership360'). You MUST justify this using authentic process-safety frameworks and terminology (e.g., CCPS Risk Based Process Safety elements, COMAH tiering, ATEX zoning, LOPA, BowTie methodology).
      suggestedAction: One specific, actionable next step.
      scenarioForecasts: {
        bearCase: "Worst-case 12-18 month projection for the market.",
        baseCase: "Most likely 12-18 month projection.",
        bullCase: "Best-case 12-18 month projection."
      }
      stakeholderViews: {
        ceoSummary: "Why this matters for growth, market positioning, and revenue (Gus's perspective).",
        ctoSummary: "Why this matters for the product roadmap and technical capabilities (Peter's perspective)."
      }
      vrioAnalysis: {
        valuable: "Does Empirisys provide value here?",
        rare: "Is our capability rare?",
        inimitable: "Is our approach hard to copy?",
        organization: "Is Empirisys organized to capture this value?",
        competitiveImplication: "Overall VRIO outcome (e.g., Temporary Advantage, Sustained Advantage)."
      }
    }
  - deltaStatus: 'new', 'intensified', 'faded', or 'stable'
      - status: Set all to 'pending_review'

- You must also generate a "metrics" object containing quantitative data representing the broader market over the last 7 days:
  - trendVelocity: Array of 7 days (e.g. "Mon", "Tue"). For each day, provide realistic integers for STEEPLE categories (sociocultural, technological, economic, environmental, political, legal, ethical).
  - competitorPositioning: Array of 5 competitors (including "Empirisys"). For each, provide 'innovationScore' (0-100), 'marketShareScore' (0-100), and 'threatLevel' (Low/Medium/High). Make sure Empirisys is well positioned based on the VRIO analysis.
  - budgetAllocation: Array of budget categories (e.g., "Software & AI", "Legacy Hardware", "Consulting", "Safety Training") with 'allocationPercentage' (must sum to 100) and 'trend' (Increasing/Decreasing/Stable).

Output strictly valid JSON: { "themes": [...], "metrics": { "trendVelocity": [...], "competitorPositioning": [...], "budgetAllocation": [...] } }`;

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
    scenarioForecasts: {
      bearCase: string;
      baseCase: string;
      bullCase: string;
    };
    stakeholderViews: {
      ceoSummary: string;
      ctoSummary: string;
    };
    vrioAnalysis: {
      valuable: string;
      rare: string;
      inimitable: string;
      organization: string;
      competitiveImplication: string;
    };
  };
  deltaStatus: DeltaStatus;
  status: ThemeValidation;
}

interface RawAggregation {
  themes: RawTheme[];
  metrics: {
    trendVelocity: any[];
    competitorPositioning: any[];
    budgetAllocation: any[];
  };
}

// ────────────────────────────────────────────────────────────
// Pipeline
// ────────────────────────────────────────────────────────────

export interface PipelineResult {
  events: MarketEvent[];
  themes: AggregatedTheme[];
  metrics: any; // Using 'any' locally to avoid circular imports, types.ts handles the strict interface
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
      steepleCategory: raw.steepleCategory,
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
    return { 
      events: [], 
      themes: [], 
      metrics: { trendVelocity: [], competitorPositioning: [], budgetAllocation: [] } 
    };
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

  const parsedAggregation: RawAggregation = JSON.parse(aggregationText);
  if (!parsedAggregation.themes || !Array.isArray(parsedAggregation.themes)) {
    throw new Error('LLM aggregation response missing "themes" array');
  }

  // Fallback metrics with realistic sample data if LLM fails to generate them
  const fallbackMetrics = {
    trendVelocity: [
      { day: 'Mon', sociocultural: 3, technological: 7, economic: 5, environmental: 8, political: 2, legal: 6, ethical: 1 },
      { day: 'Tue', sociocultural: 4, technological: 9, economic: 6, environmental: 7, political: 3, legal: 8, ethical: 2 },
      { day: 'Wed', sociocultural: 2, technological: 8, economic: 4, environmental: 10, political: 5, legal: 7, ethical: 3 },
      { day: 'Thu', sociocultural: 5, technological: 6, economic: 8, environmental: 9, political: 4, legal: 9, ethical: 2 },
      { day: 'Fri', sociocultural: 3, technological: 10, economic: 7, environmental: 6, political: 6, legal: 5, ethical: 4 },
      { day: 'Sat', sociocultural: 6, technological: 8, economic: 5, environmental: 11, political: 3, legal: 10, ethical: 1 },
      { day: 'Sun', sociocultural: 4, technological: 7, economic: 9, environmental: 8, political: 7, legal: 6, ethical: 3 },
    ],
    competitorPositioning: [
      { competitorName: 'Empirisys', innovationScore: 82, marketShareScore: 35, threatLevel: 'Low' },
      { competitorName: 'Sphera', innovationScore: 68, marketShareScore: 55, threatLevel: 'High' },
      { competitorName: 'Enablon', innovationScore: 72, marketShareScore: 48, threatLevel: 'High' },
      { competitorName: 'Intelex', innovationScore: 60, marketShareScore: 40, threatLevel: 'Medium' },
      { competitorName: 'Cority', innovationScore: 55, marketShareScore: 30, threatLevel: 'Medium' },
    ],
    budgetAllocation: [
      { category: 'Software & AI', allocationPercentage: 35, trend: 'Increasing' },
      { category: 'Legacy Hardware', allocationPercentage: 20, trend: 'Decreasing' },
      { category: 'Consulting', allocationPercentage: 25, trend: 'Stable' },
      { category: 'Safety Training', allocationPercentage: 20, trend: 'Increasing' },
    ],
  };

  const rawMetrics = parsedAggregation.metrics || {};
  const metrics = {
    trendVelocity: (rawMetrics.trendVelocity && rawMetrics.trendVelocity.length > 0) ? rawMetrics.trendVelocity : fallbackMetrics.trendVelocity,
    competitorPositioning: (rawMetrics.competitorPositioning && rawMetrics.competitorPositioning.length > 0) ? rawMetrics.competitorPositioning : fallbackMetrics.competitorPositioning,
    budgetAllocation: (rawMetrics.budgetAllocation && rawMetrics.budgetAllocation.length > 0) ? rawMetrics.budgetAllocation : fallbackMetrics.budgetAllocation,
  };

  // ── Step 6 & 7: Link events, compute theme scores ─────
  const eventMap = new Map(filteredEvents.map((e) => [e.id, e]));

  const themes: AggregatedTheme[] = parsedAggregation.themes.map((raw) => {
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

  return { events: filteredEvents, themes, metrics };
}
