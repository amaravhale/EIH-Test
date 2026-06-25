import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return new NextResponse("Topic is required", { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse("Missing OPENAI_API_KEY", { status: 500 });
    }

    // =========================================================================
    // PASTE YOUR PREPARED PROMPT HERE
    // Replace the text inside the backticks below with your prepared prompt.
    // =========================================================================
    const SYSTEM_PROMPT = `You are a world-class Marketing Analyst Agent for Empirisys.
Your goal is to provide deep, actionable marketing analysis, competitive positioning strategies, and campaign ideas.

Structure your analysis using professional markdown formatting (headings, bullet points, bold text).
Focus on:
1. Market Positioning & Sentiment
2. Competitive Strategy & Differentiation
3. Proposed Campaign Angles & Deliverables
4. Risk Factors & Mitigation`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: `Please analyze the following topic/campaign: "${topic}"`
        }
      ],
    });

    const analysis = completion.choices[0].message.content || 'No analysis generated.';

    return NextResponse.json({ analysis });

  } catch (error) {
    console.error("[MARKETING_API_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
