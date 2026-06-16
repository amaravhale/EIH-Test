import { RawSignal, TriggerEvent, MatrixScore, ExecutiveOutput } from './types';

/**
 * HSE Lead-Scoring Agent Engine
 * 
 * Implements the exact workflow specified:
 * 1. Data Ingestion Layer (Interface)
 * 2. Trigger Event Filter
 * 3. Matrix Scoring Engine
 * 4. Automated Executive Output
 */

export class LeadScoringAgent {
  /**
   * Data Ingestion Layer
   * In a production environment, this function receives data scraped from:
   * - Public European industrial databases
   * - EU OSHA incident repositories
   * - Chemical park registries (BASF network, Rotterdam ports)
   * - Regional press releases
   */
  async processIncomingSignal(signal: RawSignal): Promise<ExecutiveOutput | null> {
    console.log(`[Data Ingestion Layer] Processing signal from ${signal.sourceType}: ${signal.sourceUrl}`);

    // Step 1: Trigger Event Filter
    const triggerEvent = await this.triggerEventFilter(signal.rawText);
    
    if (!triggerEvent) {
      console.log(`[Trigger Event Filter] No operational vulnerabilities found. Discarding signal.`);
      return null;
    }

    console.log(`[Trigger Event Filter] Identified: ${triggerEvent.type} at ${triggerEvent.companyName}`);

    // Step 2: Matrix Scoring Engine
    const score = await this.matrixScoringEngine(triggerEvent);
    console.log(`[Matrix Scoring Engine] Total Score: ${score.totalScore}/100`);

    // Step 3: Automated Executive Output
    // Only generate output for high-scoring leads (e.g., > 70)
    if (score.totalScore >= 70) {
      const executiveBrief = await this.generateExecutiveOutput(triggerEvent, score);
      return executiveBrief;
    }

    return null;
  }

  /**
   * Trigger Event Filter:
   * Monitors for operational vulnerabilities: a recorded safety "near-miss," an environmental fine, 
   * a plant modernization announcement, or the appointment of a new Head of Process Safety.
   */
  private async triggerEventFilter(rawText: string): Promise<TriggerEvent | null> {
    // Note: In production, this would call an LLM (e.g., OpenAI/Anthropic) to extract the event
    // Mocking the LLM extraction based on keywords for the prototype
    
    const textLower = rawText.toLowerCase();
    
    if (textLower.includes('fine') || textLower.includes('environmental penalty')) {
      return {
        type: 'environmental_fine',
        description: '€2.5M fine levied for improper chemical discharge.',
        companyName: 'PetroChem Rotterdam B.V.',
        location: 'Rotterdam Port Facility'
      };
    }

    if (textLower.includes('near miss') || textLower.includes('near-miss')) {
      return {
        type: 'safety_near_miss',
        description: 'Pressure valve failure resulting in near-miss chemical release.',
        companyName: 'BASF Ludwigshafen Network',
        location: 'Ludwigshafen, Germany'
      };
    }

    if (textLower.includes('modernization') || textLower.includes('upgrade')) {
      return {
        type: 'plant_modernization',
        description: '€50M investment announced for legacy sensor modernization.',
        companyName: 'EuroSteel GmbH',
        location: 'Duisburg, Germany'
      };
    }

    return null;
  }

  /**
   * Matrix Scoring Engine: 
   * Applies a consulting-grade prioritization model to rank leads based on Market Size/Asset Value, 
   * Regulatory Pressure (Seveso III / AI Act), and Familiarity Alignment (similarity to UK energy clients).
   */
  private async matrixScoringEngine(trigger: TriggerEvent): Promise<MatrixScore> {
    // Note: In production, this queries the CRM / Market Database and asks an LLM to score.
    // Mocking the scoring logic for the prototype
    
    let marketSizeScore = 0;
    let regulatoryPressureScore = 0;
    let familiarityAlignmentScore = 0;

    if (trigger.companyName.includes('Rotterdam') || trigger.companyName.includes('BASF')) {
      marketSizeScore = 95; // Massive asset value
      regulatoryPressureScore = 90; // High Seveso III scrutiny
      familiarityAlignmentScore = 85; // Very similar to UK offshore/energy clients
    } else {
      marketSizeScore = 60;
      regulatoryPressureScore = 70;
      familiarityAlignmentScore = 50;
    }

    const totalScore = Math.round((marketSizeScore * 0.4) + (regulatoryPressureScore * 0.4) + (familiarityAlignmentScore * 0.2));

    return {
      marketSizeScore,
      regulatoryPressureScore,
      familiarityAlignmentScore,
      totalScore
    };
  }

  /**
   * Automated Executive Output: 
   * Synthesizes a tailored pitch brief arming CEO Gus Carroll with exact incident history, 
   * regulatory pressure points, and a tailored proposition (BOOST or DETECT).
   */
  private async generateExecutiveOutput(trigger: TriggerEvent, score: MatrixScore): Promise<ExecutiveOutput> {
    // Note: In production, this uses an LLM to synthesize the final brief.
    
    const productRecommendation = trigger.type === 'plant_modernization' ? 'BOOST' : 'DETECT';
    
    let mitigationStrategy = '';
    if (productRecommendation === 'DETECT') {
      mitigationStrategy = `Deploying DETECT's anomaly recognition algorithms across ${trigger.location}'s existing sensor grid will provide real-time leading indicators, directly preventing future occurrences of the ${trigger.description.toLowerCase()} and satisfying Seveso III continuous monitoring mandates.`;
    } else {
      mitigationStrategy = `Leveraging BOOST's culture and human-factors analytics during the modernization at ${trigger.location} will ensure the workforce adapts to the new operational systems safely, minimizing transition risk.`;
    }

    return {
      targetLead: trigger.companyName,
      leadScore: score.totalScore,
      dateGenerated: new Date().toISOString().split('T')[0],
      incidentHistory: {
        triggerIdentified: trigger.type.replace(/_/g, ' ').toUpperCase(),
        summary: trigger.description,
        location: trigger.location
      },
      regulatoryPressurePoint: {
        relevantFramework: 'Seveso III Directive & AI Act High-Risk Categorization',
        exposureAnalysis: `Recent trigger events place ${trigger.companyName} under elevated scrutiny from EU regulatory bodies. Further safety deviations risk compounding fines and forced operational pauses.`
      },
      tailoredProposition: {
        productRecommendation,
        mitigationStrategy
      }
    };
  }
}
