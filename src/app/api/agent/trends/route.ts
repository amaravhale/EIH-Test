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
          content: `You are the Empirisys Market Trends Engine.
Analyze the current European macro landscape for process safety, offshore wind, and hydrogen infrastructure.
Generate realistic live data for the Analytics Dashboard.

Respond with a JSON object containing:
- kpis: Object with:
  - totalMarket: string (e.g., "£4.5B")
  - marketGrowth: string (e.g., "14%")
  - tenders: number (e.g., 156)
  - regulatoryShifts: number (e.g., 12)
- chartData: An array of 7 objects representing the last 7 months of sector investment volume (in millions).
  Each object must have:
  - month: short string (e.g., "Jan", "Feb")
  - "Offshore Wind": number
  - "Hydrogen": number
  - "Process Safety": number

Output strictly valid JSON that matches this schema without markdown formatting.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const parsedContent = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json(parsedContent);

  } catch (error) {
    console.error("[TRENDS_API_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
