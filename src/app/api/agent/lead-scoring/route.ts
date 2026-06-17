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
    rationale: "High volume of complex HSE data and historical weak signals indicate a strong need for BOOST's AI analytics to identify hidden risks before they materialize.",
    incident: {
      id: "inc-001",
      incidentType: "Tier 1 Process Safety Near-Miss",
      consultantHired: "McKinsey & Company",
      pitchApproach: "Disrupt McKinsey by leading with BOOST's AI-driven weak signal detection, proving that standard culture reviews miss predictive data patterns.",
      incidentDescription: "A severe overpressurization event occurred at the primary distillation column, triggering emergency relief valves but narrowly avoiding structural failure. Initial findings point to fragmented sensor data leading up to the event.",
      regulatoryNotice: "HSE Improvement Notice served under COMAH regulations regarding alarm management and predictive maintenance protocols.",
      clientDetails: "BP plc - North Sea Operations",
      scenario: "Offshore Platform - Distillation Unit",
      dateTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    }
  },
  "Balfour Beatty": {
    companyName: "Balfour Beatty",
    industry: "Construction",
    overallScore: 65,
    keyRiskFactors: ["Leadership perception gaps", "Subcontractor culture alignment", "Frontline worker engagement"],
    recommendedProduct: "SENSE",
    confidenceLevel: 92,
    rationale: "Data indicates strong compliance but significant gaps in cultural alignment across projects. SENSE diagnostics will bridge the gap between leadership intent and workforce experience.",
    incident: {
      id: "inc-002",
      incidentType: "Subcontractor Fatality Risk Event",
      consultantHired: "ERM (Environmental Resources Management)",
      pitchApproach: "Position SENSE as the continuous pulse-check that ERM's static audits failed to capture; focus on sub-contractor integration and cultural alignment.",
      incidentDescription: "A lifting operation involving a 50-ton module failed due to miscommunication between primary contractors and lifting sub-contractors. The load dropped, narrowly missing a crew of 6 workers.",
      regulatoryNotice: "Immediate Prohibition Notice issued by HSE halting all heavy lifting operations on site pending a full cultural and operational review.",
      clientDetails: "Balfour Beatty - Major Infrastructure Project",
      scenario: "Heavy Lifting & Subcontractor Coordination",
      dateTime: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString()
    }
  },
  "Shell": {
    companyName: "Shell",
    industry: "Oil & Gas",
    overallScore: 91,
    keyRiskFactors: ["Aging infrastructure risks", "Safety culture drift in legacy sites", "Complex multi-national reporting"],
    recommendedProduct: "Both",
    confidenceLevel: 85,
    rationale: "Requires both cultural realignment (SENSE) for legacy sites and advanced weak-signal detection (BOOST) for their extensive observation datasets.",
    incident: {
      id: "inc-003",
      incidentType: "Critical Equipment Failure & Unplanned Flaring",
      consultantHired: "DuPont Sustainable Solutions (dss+)",
      pitchApproach: "Leverage both BOOST and SENSE to outcompete dss+ by offering a modern, tech-enabled predictive model rather than traditional consulting frameworks.",
      incidentDescription: "Failure of a primary cooling circuit led to an emergency shutdown sequence, resulting in massive unplanned flaring and local community complaints. Maintenance records showed 'weak signals' of vibration anomalies weeks prior.",
      regulatoryNotice: "Warning letter from Environmental Agency regarding flaring volumes, with HSE investigating maintenance culture.",
      clientDetails: "Shell - Onshore Refinery",
      scenario: "Plant Operations & Maintenance Routine",
      dateTime: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
    }
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
        rationale: "Based on generic industry patterns, this lead exhibits both data fragmentation and cultural challenges. Initial engagement should focus on the recommended product to establish a baseline.",
        incident: {
          id: `inc-rand-${Math.floor(Math.random() * 1000)}`,
          incidentType: "Recent High-Potential Near Miss",
          consultantHired: "Local Specialized HSE Firm",
          pitchApproach: "Lead with the Intelligence Hub. Show them how combining SENSE and BOOST can identify these high-potential events before they escalate.",
          incidentDescription: "An unreported high-potential near miss was extracted from scattered safety observation reports, indicating a failure in frontline reporting culture.",
          regulatoryNotice: "Currently undetected by regulatory bodies, presenting an opportunity for proactive intervention.",
          clientDetails: companyName || "Unknown Company",
          scenario: "Frontline Operations",
          dateTime: new Date().toISOString()
        }
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
