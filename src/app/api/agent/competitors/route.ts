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
          content: `You are the Empirisys AI Competitor Intelligence Engine.
You continuously scan the European process safety and predictive HSE software market.
Generate a list of 4 highly realistic competitors in the current market environment.
Provide detailed, actionable profiles.

Respond with a JSON object containing an array of 'competitors' with the following fields:
- id: A unique string identifier.
- name: The name of the competing company.
- threatLevel: "critical", "high", "medium", or "low".
- sector: The specific HSE sub-sector they dominate (e.g., "Chemicals HSE", "Offshore Wind").
- hq: Their headquarters location (e.g., "Frankfurt, Germany", "London, UK").
- size: Their employee headcount range (e.g., "100-250", "10,000+").
- trend: "up", "stable", or "down".
- aiSummary: A 2-3 sentence strategic analysis of their recent moves, acquisitions, or product overlaps with our predictive analytics offering.
- tags: An array of 3 string tags representing their key traits (e.g., ["AI Tools", "Incumbent"]).

Output strictly valid JSON that matches this schema without markdown formatting.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const parsedContent = JSON.parse(completion.choices[0].message.content || '{"competitors": []}');

    return NextResponse.json(parsedContent);

  } catch (error) {
    console.error("[COMPETITORS_API_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
