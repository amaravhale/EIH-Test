import { NextResponse } from 'next/server';

export interface IntelligenceSignal {
  id: string;
  title: string;
  source: string;
  category: 'regulation' | 'competitive' | 'industry' | 'technology' | 'tender';
  time: string;
  summary: string;
  score: number;
  status: 'discovered' | 'reviewed' | 'actionable';
  confidence: number;
  strategicTags: string[];
}

export async function GET() {
  try {
    // Simulate AI extraction and scoring delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    const signals: IntelligenceSignal[] = [
      {
        id: "sig-ai-1",
        title: "OSHA Proposes Updates to PSM Standard",
        source: "Federal Register NLP Extraction",
        category: "regulation",
        time: "12 mins ago",
        summary: "The Occupational Safety and Health Administration (OSHA) is proposing to update the Process Safety Management (PSM) of Highly Hazardous Chemicals standard. Neural analysis indicates an 85% overlap with Empirisys' compliance modules.",
        score: 95,
        status: "actionable",
        confidence: 98,
        strategicTags: ["Compliance Gap", "PSM Audit"]
      },
      {
        id: "sig-ai-2",
        title: "ERM Wins £2.4M Culture Transformation Contract",
        source: "Market Tender Sweep",
        category: "competitive",
        time: "45 mins ago",
        summary: "ERM has secured a major contract to deploy their cultural transformation framework across offshore platforms. Sentiment analysis of their pitch suggests a vulnerability to predictive data models like BOOST.",
        score: 88,
        status: "reviewed",
        confidence: 91,
        strategicTags: ["Competitor Win", "Vulnerability Identified"]
      },
      {
        id: "sig-ai-3",
        title: "Incident Alert: Confined Space Near-Miss at BP",
        source: "HSE Incident Feed",
        category: "industry",
        time: "1 hour ago",
        summary: "An unreported high-potential near miss was extracted from scattered safety observation reports, indicating a failure in frontline reporting culture at BP's onshore facility.",
        score: 92,
        status: "actionable",
        confidence: 85,
        strategicTags: ["Target Client", "Lead Gen"]
      },
      {
        id: "sig-ai-4",
        title: "Draft EU AI Act Implications for Predictive Safety",
        source: "EU Parliament Docs",
        category: "regulation",
        time: "3 hours ago",
        summary: "Draft regulation may impact how employee safety data is stored and processed for predictive analytics. Impact on SENSE module requires review.",
        score: 75,
        status: "discovered",
        confidence: 89,
        strategicTags: ["Data Privacy", "Product Strategy"]
      },
      {
        id: "sig-ai-5",
        title: "New Wearable Tech Standard Drafted by ISO",
        source: "ISO Technical Committee",
        category: "technology",
        time: "4 hours ago",
        summary: "A new draft standard outlines requirements for integrating IoT wearables into safety-critical industrial processes.",
        score: 62,
        status: "discovered",
        confidence: 76,
        strategicTags: ["Integration Opportunity"]
      }
    ];

    return NextResponse.json({ signals });
  } catch (error) {
    console.error('Signals agent error:', error);
    return NextResponse.json(
      { error: 'Failed to process market signals' },
      { status: 500 }
    );
  }
}
