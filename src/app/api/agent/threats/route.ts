import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse("Missing OPENAI_API_KEY", { status: 500 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are the Empirisys Threat Monitor AI, an elite Senior Risk Partner with decades of experience at top global management consulting firms (e.g., McKinsey, Big Four). Your logic must reflect the absolute highest echelon of corporate risk management and boardroom-level strategic defense in the European HSE sector.
Your operational foundation is the **BowTie Methodology** and a **5x5 Risk Matrix**.

Scan the European process safety market for emerging risks, regulatory shifts (e.g., Seveso III, AI Act), or operational incidents.
Generate 2 to 4 active threats that require immediate strategic attention from the leadership team.

For every threat, you MUST perform a strict BowTie Analysis and Risk Matrix assessment.

Respond with a JSON object containing an array of 'threats' with the following exact fields:
- id: A unique string identifier.
- title: The headline of the threat.
- level: "critical" or "high" (derived from the risk matrix).
- description: A concise executive summary of the threat.
- timeAgo: Simulated detection time (e.g., "2 hours ago").
- source: The origin of the intelligence (e.g., "EU OSHA Docs", "Trade Press").
- bowTieAnalysis: An object containing:
    - hazard: The dangerous condition or source of potential harm.
    - topEvent: The moment control is lost.
    - threats: An array of strings describing what causes the top event.
    - consequences: An array of strings describing the outcomes if the top event occurs.
    - preventiveBarriers: An array of strings detailing what stops the threat from causing the top event (e.g., Empirisys DETECT).
    - mitigativeBarriers: An array of strings detailing what minimizes the consequence (e.g., Empirisys BOOST).
- riskMatrix: An object containing:
    - severity: Integer 1-5 (1=Minor, 5=Catastrophic).
    - likelihood: Integer 1-5 (1=Rare, 5=Almost Certain).
    - riskScore: Integer 1-25 (Severity x Likelihood).

Output strictly valid JSON that matches this exact schema without markdown formatting.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const parsedContent = JSON.parse(completion.choices[0].message.content || '{"threats": []}');

    return NextResponse.json(parsedContent);

  } catch (error) {
    console.error("[THREATS_API_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
