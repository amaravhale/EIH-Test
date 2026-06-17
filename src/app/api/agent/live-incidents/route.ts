import { NextResponse } from 'next/server';
import { IncidentIntelligence } from '@/types/domain';

const LIVE_INCIDENTS: IncidentIntelligence[] = [
  {
    id: "inc-001",
    incidentType: "Tier 1 Process Safety Near-Miss",
    consultantHired: "McKinsey & Company",
    pitchApproach: "Disrupt McKinsey by leading with BOOST's AI-driven weak signal detection, proving that standard culture reviews miss predictive data patterns.",
    incidentDescription: "A severe overpressurization event occurred at the primary distillation column, triggering emergency relief valves but narrowly avoiding structural failure. Initial findings point to fragmented sensor data leading up to the event.",
    regulatoryNotice: "HSE Improvement Notice served under COMAH regulations regarding alarm management and predictive maintenance protocols.",
    clientDetails: "BP plc - North Sea Operations",
    scenario: "Offshore Platform - Distillation Unit",
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
  },
  {
    id: "inc-002",
    incidentType: "Subcontractor Fatality Risk Event",
    consultantHired: "ERM (Environmental Resources Management)",
    pitchApproach: "Position SENSE as the continuous pulse-check that ERM's static audits failed to capture; focus on sub-contractor integration and cultural alignment.",
    incidentDescription: "A lifting operation involving a 50-ton module failed due to miscommunication between primary contractors and lifting sub-contractors. The load dropped, narrowly missing a crew of 6 workers.",
    regulatoryNotice: "Immediate Prohibition Notice issued by HSE halting all heavy lifting operations on site pending a full cultural and operational review.",
    clientDetails: "Balfour Beatty - Major Infrastructure Project",
    scenario: "Heavy Lifting & Subcontractor Coordination",
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString() // 18 hours ago
  },
  {
    id: "inc-003",
    incidentType: "Critical Equipment Failure & Unplanned Flaring",
    consultantHired: "DuPont Sustainable Solutions (dss+)",
    pitchApproach: "Leverage both BOOST and SENSE to outcompete dss+ by offering a modern, tech-enabled predictive model rather than traditional consulting frameworks.",
    incidentDescription: "Failure of a primary cooling circuit led to an emergency shutdown sequence, resulting in massive unplanned flaring and local community complaints. Maintenance records showed 'weak signals' of vibration anomalies weeks prior.",
    regulatoryNotice: "Warning letter from Environmental Agency regarding flaring volumes, with HSE investigating maintenance culture.",
    clientDetails: "Shell - Onshore Refinery",
    scenario: "Plant Operations & Maintenance Routine",
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() // 2 days ago
  },
  {
    id: "inc-004",
    incidentType: "High-Potential Confined Space Incident",
    consultantHired: "Local Specialized HSE Firm",
    pitchApproach: "Lead with the Intelligence Hub. Show them how combining SENSE and BOOST can identify these high-potential events before they escalate, replacing fragmented local consulting.",
    incidentDescription: "Two maintenance workers entered a confined space with faulty atmospheric testing equipment. They were evacuated after a spot-check revealed critically low oxygen levels. The incident highlights a severe disconnect between frontline practices and leadership perception.",
    regulatoryNotice: "Pending HSE investigation into permit-to-work systems and frontline safety culture.",
    clientDetails: "National Grid - Underground Assets",
    scenario: "Confined Space Entry & Permit to Work",
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString() // 3 days ago
  }
];

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({ incidents: LIVE_INCIDENTS });
  } catch (error) {
    console.error('Live incidents error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch live incidents' },
      { status: 500 }
    );
  }
}
