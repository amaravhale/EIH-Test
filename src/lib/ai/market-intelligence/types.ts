// DEFERRED: Define true schemas when data layer is finalized.

export type SourceTier = 'A' | 'B' | 'C' | 'D';

export interface RawEvent {
  id: string;
  sourceUrl: string;
  sourceTier: SourceTier;
  rawText: string;
  publishedAt: string;
}

export interface ExtractedEvent extends RawEvent {
  entity: string;
  eventType: string;
  date: string;
  geography: string;
  sector: string;
}

export interface ScoredSignal extends ExtractedEvent {
  strategicRelevance: number; // 0-100
  evidenceStrength: number;   // 0-100
  confidenceScore: number;    // Derived metric
}

export interface StrategicInterpretation {
  impact: string;
  relevantProduct: 'Sense' | 'Boost' | 'Insight360' | 'Leadership360' | 'None';
  suggestedAction: string;
}

export interface AggregatedTheme {
  id: string;
  title: string;
  description: string;
  signals: ScoredSignal[];
  interpretation: StrategicInterpretation;
  status: 'pending_validation' | 'approved' | 'rejected';
  deltaStatus: 'new' | 'intensified' | 'faded' | 'stable';
  timestamp: string;
}
