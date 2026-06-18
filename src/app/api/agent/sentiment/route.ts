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
          content: `You are the Empirisys Sentiment Analysis Engine.
Scan simulated social media, press releases, and forums regarding predictive HSE software and Empirisys.
Generate realistic live sentiment data.

Respond with a JSON object containing:
- kpis: Object with:
  - score: string (e.g., "78%")
  - negativeAlerts: number
  - totalMentions: string (e.g., "1,245")
- mentions: An array of 3-4 recent mentions.
  Each object must have:
  - source: string (e.g., "Industry Weekly", "Twitter", "Safety Watch Blog")
  - sentiment: "positive", "neutral", or "negative"
  - text: string (a 1-2 sentence quote or summary of the mention)

Output strictly valid JSON that matches this schema without markdown formatting.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const parsedContent = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json(parsedContent);

  } catch (error) {
    console.error("[SENTIMENT_API_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
