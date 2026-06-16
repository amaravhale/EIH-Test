import { SourceIngestor } from './ingestion';
import { EventExtractor } from './extraction';
import { RelevanceFilter } from './filtering';
import { SignalScorer } from './scoring';
import { ThemeAggregator } from './aggregation';
import { StrategicInterpreter } from './interpretation';
import { AggregatedTheme } from './types';

/**
 * Market Intelligence Pipeline
 * 
 * Orchestrates the 9-step workflow defined by the architecture.
 */
export class MarketIntelligencePipeline {
  private ingestor = new SourceIngestor();
  private extractor = new EventExtractor();
  private filter = new RelevanceFilter();
  private scorer = new SignalScorer();
  private aggregator = new ThemeAggregator();
  private interpreter = new StrategicInterpreter();

  async runPipeline(): Promise<AggregatedTheme[]> {
    console.log('[Pipeline] Step 1: Source Ingestion');
    const rawEvents = await this.ingestor.fetchEvents();

    console.log('[Pipeline] Step 2: Entity & Event Extraction');
    const extractedEvents = await this.extractor.extract(rawEvents);

    console.log('[Pipeline] Step 3: Relevance Filtering');
    const filteredEvents = this.filter.filter(extractedEvents);

    console.log('[Pipeline] Step 4: Signal Scoring with Confidence');
    const scoredSignals = this.scorer.score(filteredEvents);

    console.log('[Pipeline] Step 5: Theme Aggregation');
    const aggregatedThemes = this.aggregator.aggregate(scoredSignals);

    console.log('[Pipeline] Step 6: Strategic Interpretation');
    const interpretedThemes = await this.interpreter.interpret(aggregatedThemes);

    // Step 7: Human-in-the-loop validation gate.
    // The pipeline returns these themes marked as 'pending_validation'.
    // They must be explicitly approved via UI/API before moving to the executive dashboard.
    console.log('[Pipeline] Complete. Yielding pending themes for human validation.');

    return interpretedThemes;
  }
}
