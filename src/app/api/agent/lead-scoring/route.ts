import { NextResponse } from 'next/server';
import { LeadScoreProfile } from '@/types/domain';

const MOCK_PROFILES: Record<string, LeadScoreProfile> = {
  "BP": {
    companyName: "BP",
    industry: "Oil & Gas",
    overallScore: 82,
    keyRiskFactors: ["Offshore incident reporting delays", "Contractor safety variance", "Regulatory pressure in North Sea"],
    recommendedProduct: "BOOST",
    confidenceLevel: 88,
    rationale: "High volume of complex HSE data and historical weak signals indicate a strong need for BOOST's AI analytics to identify hidden risks before they materialize."
  },
  "Balfour Beatty": {
    companyName: "Balfour Beatty",
    industry: "Construction",
    overallScore: 65,
    keyRiskFactors: ["Leadership perception gaps", "Subcontractor culture alignment", "Frontline worker engagement"],
    recommendedProduct: "SENSE",
    confidenceLevel: 92,
    rationale: "Data indicates strong compliance but significant gaps in cultural alignment across projects. SENSE diagnostics will bridge the gap between leadership intent and workforce experience."
  },
  "Shell": {
    companyName: "Shell",
    industry: "Oil & Gas",
    overallScore: 91,
    keyRiskFactors: ["Aging infrastructure risks", "Safety culture drift in legacy sites", "Complex multi-national reporting"],
    recommendedProduct: "Both",
    confidenceLevel: 85,
    rationale: "Requires both cultural realignment (SENSE) for legacy sites and advanced weak-signal detection (BOOST) for their extensive observation datasets."
  }
};

export async function POST(request: Request) {
  try {
    const { companyName } = await request.json();
    
    // Simulate LLM processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For the MVP, we use hardcoded examples if they match, otherwise generate a generic response.
    let profile = MOCK_PROFILES[companyName as string];
    
    if (!profile) {
      profile = {
        companyName: companyName || "Unknown Company",
        industry: "High-Hazard Operations",
        overallScore: Math.floor(Math.random() * 40) + 40, // 40-80
        keyRiskFactors: ["Inconsistent safety reporting", "Leadership disconnect on frontline issues", "Reactive rather than proactive safety measures"],
        recommendedProduct: Math.random() > 0.5 ? "BOOST" : "SENSE",
        confidenceLevel: 75,
        rationale: "Based on generic industry patterns, this lead exhibits both data fragmentation and cultural challenges. Initial engagement should focus on the recommended product to establish a baseline."
      };
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Lead scoring agent error:', error);
    return NextResponse.json(
      { error: 'Failed to process lead score' },
      { status: 500 }
    );
  }
}
