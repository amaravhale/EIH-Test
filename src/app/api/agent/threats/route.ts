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
          content: `You are the Empirisys Threat Monitor AI.
Scan the European process safety market for emerging risks, regulatory changes, or competitor movements.
Generate 2 to 4 active threats that require strategic attention from the leadership team.

Respond with a JSON object containing an array of 'threats' with the following fields:
- id: A unique string identifier.
- title: The headline of the threat (e.g., "New EU Data Privacy Regulation Draft").
- level: "critical" or "high".
- description: A concise explanation of why this poses a threat to our predictive safety module.
- timeAgo: Simulated detection time (e.g., "2 hours ago", "1 day ago").
- source: The origin of the intelligence (e.g., "EU Parliament Docs", "PR Newswire").

Output strictly valid JSON that matches this schema without markdown formatting.`
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
