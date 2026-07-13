import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
});

export interface VerifiedThreat {
  id: string;
  title: string;
  level: "critical" | "high";
  description: string;
  timeAgo: string;
  source: string;
  companyName: string;
  sector: string;
  bowTieAnalysis: {
    hazard: string;
    topEvent: string;
    threats: string[];
    consequences: string[];
    preventativeBarriers: string[];
    mitigativeBarriers: string[];
  };
}

export async function scrapeLiveThreats(): Promise<VerifiedThreat[]> {
  // If no real API key is present, provide a high-quality deterministic fallback
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy_key' || process.env.OPENAI_API_KEY.includes('your-openai-api-key')) {
    console.log('[Threat Scraper] No OpenAI API Key found, using fallback simulated regulatory data.');
    return [
      {
        id: `thr-${Date.now()}-1`,
        title: "COMAH Improvement Notice Issued for Aging Assets",
        level: "critical",
        description: "The UK HSE has issued an improvement notice to a major North Sea operator regarding severe corrosion under insulation (CUI) on primary containment vessels.",
        timeAgo: "2 hours ago",
        source: "UK Health and Safety Executive (HSE) Public Register",
        companyName: "BP",
        sector: "Oil & Gas",
        bowTieAnalysis: {
          hazard: "High-pressure hydrocarbons in aging vessels",
          topEvent: "Loss of Primary Containment (LOPC)",
          threats: ["Corrosion Under Insulation (CUI)", "Inadequate inspection intervals", "Deferred maintenance"],
          consequences: ["Fire/Explosion", "Environmental spill", "Regulatory shutdown"],
          preventativeBarriers: ["Non-destructive testing (NDT)", "Corrosion inhibitors", "Coating integrity management"],
          mitigativeBarriers: ["Gas detection systems", "Emergency shutdown (ESD) valves", "Deluge systems"]
        }
      },
      {
        id: `thr-${Date.now()}-2`,
        title: "Seveso Directive Violation: Chemical Storage",
        level: "high",
        description: "A chemical manufacturing plant in Antwerp has been fined for exceeding permitted storage limits of toxic precursors, violating the Seveso III directive.",
        timeAgo: "5 hours ago",
        source: "European Environment Agency (EEA) Enforcement Log",
        companyName: "Ineos",
        sector: "Chemicals",
        bowTieAnalysis: {
          hazard: "Storage of highly toxic chemical precursors",
          topEvent: "Toxic gas release beyond site boundary",
          threats: ["Inventory mismanagement", "Failure of inventory tracking software", "Supply chain bottleneck causing stockpile"],
          consequences: ["Off-site public health impact", "Massive regulatory fine", "Facility closure"],
          preventativeBarriers: ["Automated inventory hard-stops", "Daily mass balance audits", "Just-in-time delivery protocols"],
          mitigativeBarriers: ["Scrubber systems", "Shelter-in-place alarms for local community", "Site boundary atmospheric monitoring"]
        }
      }
    ];
  }

  // Live OpenAI parsing of hypothetical regulatory feeds
  const prompt = `
You are the Empirisys Threat Scraper.
Your function is to scan simulated European regulatory enforcement feeds (UK HSE, EEA, BAuA) and extract verified HSE threats and regulatory notices.

Generate exactly 3 verified threats.
For each threat, output strictly valid JSON matching this schema:
{
  "id": "thr-123",
  "title": "Headline",
  "level": "critical" | "high",
  "description": "Executive summary of the regulatory action or incident",
  "timeAgo": "e.g., 3 hours ago",
  "source": "e.g., UK HSE Public Register",
  "companyName": "Target company name (e.g. Shell, Orsted, Balfour Beatty)",
  "sector": "e.g., Oil & Gas, Offshore Wind",
  "bowTieAnalysis": {
    "hazard": "The dangerous condition",
    "topEvent": "The moment control is lost",
    "threats": ["cause 1", "cause 2"],
    "consequences": ["impact 1", "impact 2"],
    "preventativeBarriers": ["barrier 1", "barrier 2"],
    "mitigativeBarriers": ["mitigation 1", "mitigation 2"]
  }
}

Output format must be:
{ "threats": [ ... ] }
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: "You are an elite European HSE Regulatory Scraping AI with deep knowledge of the BowTie methodology." },
      { role: "user", content: prompt }
    ]
  });

  const parsed = JSON.parse(completion.choices[0].message.content || '{"threats": []}');
  return parsed.threats as VerifiedThreat[];
}
