import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { scrapeLiveThreats } from '@/lib/ai/threat-monitor/scraper';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
});

export async function GET() {
  try {
    const liveThreats = await scrapeLiveThreats();
    
    // Provide a robust fallback if API key is missing
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy_key' || process.env.OPENAI_API_KEY.includes('your-openai-api-key')) {
        return NextResponse.json({
            kpis: { totalMarket: "£4.5B", marketGrowth: "14%", tenders: 156, regulatoryShifts: liveThreats.length },
            chartData: [
                { month: "Jan", "Offshore Wind": 120, "Hydrogen": 40, "Process Safety": 80 },
                { month: "Feb", "Offshore Wind": 130, "Hydrogen": 45, "Process Safety": 85 },
                { month: "Mar", "Offshore Wind": 140, "Hydrogen": 50, "Process Safety": 90 },
                { month: "Apr", "Offshore Wind": 150, "Hydrogen": 60, "Process Safety": 95 },
                { month: "May", "Offshore Wind": 160, "Hydrogen": 70, "Process Safety": 100 },
                { month: "Jun", "Offshore Wind": 180, "Hydrogen": 85, "Process Safety": 110 },
                { month: "Jul", "Offshore Wind": 200, "Hydrogen": 100, "Process Safety": 120 }
            ]
        });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are the Empirisys Market Trends Engine.
Analyze the current European macro landscape and the following recent live verified threats:
${JSON.stringify(liveThreats, null, 2)}

Generate realistic live data for the Analytics Dashboard reflecting the impact of these recent regulatory actions and incidents.

Respond with a JSON object containing:
- kpis: Object with:
  - totalMarket: string (e.g., "£4.5B")
  - marketGrowth: string (e.g., "14%")
  - tenders: number (e.g., 156)
  - regulatoryShifts: number (count of recent major shifts, ensure this reflects the provided threats)
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

    const parsedContent = JSON.parse(completion.choices[0].message.content || '{"kpis": {}, "chartData": []}');

    return NextResponse.json(parsedContent);
  } catch (error) {
    console.error('Market Trends API error:', error);
    return new NextResponse("Failed to fetch trends", { status: 500 });
  }
}
