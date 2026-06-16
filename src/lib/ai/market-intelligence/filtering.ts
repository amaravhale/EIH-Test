import { ExtractedEvent } from './types';

export class RelevanceFilter {
  filter(events: ExtractedEvent[]): ExtractedEvent[] {
    // Current Build Scope Restriction:
    const ALLOWED_GEOGRAPHIES = ['UK', 'Ireland', 'Netherlands', 'Belgium'];
    const ALLOWED_SECTORS = ['Chemicals', 'Offshore Wind', 'Oil and Gas', 'Energy', 'Refining'];

    // DEFERRED: Dynamic Rules Engine.
    // In the future, this should pull from a database of current Empirisys target criteria.

    return events.filter(evt => {
      const matchesGeo = ALLOWED_GEOGRAPHIES.includes(evt.geography);
      const matchesSector = ALLOWED_SECTORS.includes(evt.sector);
      return matchesGeo && matchesSector;
    });
  }
}
