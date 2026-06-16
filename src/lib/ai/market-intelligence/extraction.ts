import { RawEvent, ExtractedEvent } from './types';

export class EventExtractor {
  async extract(events: RawEvent[]): Promise<ExtractedEvent[]> {
    // DEFERRED: LLM Extraction Prompts.
    // Call LLM strictly configured for structured extraction (JSON mode).
    // Prompt should mandate extraction of entity, eventType, date, geography, sector.
    
    return events.map(evt => ({
      ...evt,
      entity: evt.id === 'evt-1' ? 'Rotterdam Port Authorities' : 'UK Government',
      eventType: evt.id === 'evt-1' ? 'Regulatory Action' : 'Contract Award',
      date: new Date().toISOString(),
      geography: evt.id === 'evt-1' ? 'Netherlands' : 'UK',
      sector: evt.id === 'evt-1' ? 'Chemicals' : 'Offshore Wind'
    }));
  }
}
