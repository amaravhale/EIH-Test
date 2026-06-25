// Source tiers per Claude's workflow
export type SourceTier = 'A' | 'B' | 'C' | 'D';

export type EventType =
  | 'incident'
  | 'contract_award'
  | 'regulatory_action'
  | 'm_and_a'
  | 'leadership_change'
  | 'product_launch'
  | 'partnership'
  | 'capex_announcement';

export type EntityType = 'company' | 'facility' | 'regulator' | 'government';

export type EventLifecycle =
  | 'extracted'
  | 'filtered'
  | 'scored'
  | 'aggregated'
  | 'archived';

export type ThemeValidation = 'pending_review' | 'approved' | 'rejected';

export type DeltaStatus = 'new' | 'intensified' | 'faded' | 'stable';

export type EmpProduct = 'Sense' | 'Boost' | 'Insight360' | 'Leadership360';

export interface MarketEvent {
  id: string;
  entityName: string;
  entityType: EntityType;
  eventType: EventType;
  title: string;
  summary: string;
  sourceUrl: string;
  sourceName: string;
  sourceTier: SourceTier;
  geography: string;
  sector: string;
  eventDate: string; // ISO 8601
  relevanceScore: number; // 0-100, deterministic
  evidenceStrength: number; // 0-100, deterministic
  confirmationCount: number;
  isDuplicate: boolean;
  lifecycleStatus: EventLifecycle;
  rawContent?: string;
}

export interface StrategicInterpretation {
  impact: string;
  relevantProduct: EmpProduct;
  suggestedAction: string;
}

export interface AggregatedTheme {
  id: string;
  title: string;
  description: string;
  events: MarketEvent[];
  interpretation: StrategicInterpretation;
  status: ThemeValidation;
  deltaStatus: DeltaStatus;
  relevanceScore: number;
  timestamp: string; // ISO 8601
}

export interface DeltaReport {
  generatedAt: string;
  periodLabel: string;
  newThemes: AggregatedTheme[];
  intensifiedThemes: AggregatedTheme[];
  fadedThemes: AggregatedTheme[];
  stableThemes: AggregatedTheme[];
  topActions: { theme: string; action: string; product: EmpProduct }[];
}

// LLM extraction output shape
export interface LLMExtractedEvent {
  entityName: string;
  entityType: EntityType;
  eventType: EventType;
  title: string;
  summary: string;
  sourceUrl: string;
  sourceName: string;
  sourceTier: SourceTier;
  geography: string;
  sector: string;
  eventDate: string;
}
