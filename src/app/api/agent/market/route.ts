import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { AggregatedTheme } from '@/lib/ai/market-intelligence/types';

export const maxDuration = 60; // Prevent Vercel timeouts for LLM calls
export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured.");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are an elite HSE Market Intelligence AI for Empirisys Ltd. 
Your task is to analyze current European (UK/Netherlands) process safety trends and generate 2 highly relevant "AggregatedThemes" based on current events.
Output strictly in JSON format as an object with a "themes" array containing exactly 2 objects.
Each object must perfectly match this interface:
{
  id: string; (e.g. "theme-ai-1")
  title: string;
  description: string;
  signals: []; (leave this empty for now)
  interpretation: {
    impact: string;
    relevantProduct: 'Sense' | 'Boost' | 'Insight360' | 'Leadership360' | 'Both';
    suggestedAction: string;
  };
  status: 'pending_validation' | 'approved';
  deltaStatus: 'new' | 'intensified' | 'faded' | 'stable';
}`
        },
        {
          role: "user",
          content: "Generate the latest 2 aggregated market themes."
        }
      ]
    });

    const parsedContent = JSON.parse(completion.choices[0].message.content || '{"themes": []}');
    const themes: AggregatedTheme[] = parsedContent.themes;

    const mockApprovedThemes = [
      {
        id: 'theme-0',
        title: 'Rotterdam Refining Safety Capex Cycle',
        description: 'Major operators in the Rotterdam area are initiating multi-year safety upgrades.',
        signals: [],
        interpretation: {
          impact: 'High opportunity for enterprise-wide deployments in the Netherlands.',
          relevantProduct: 'Leadership360' as const,
          suggestedAction: 'Research target accounts at Rotterdam port for Leadership360 entry.'
        },
        status: 'approved' as const,
        deltaStatus: 'intensified' as const
      }
    ];

    return NextResponse.json({
      themes: [...mockApprovedThemes, ...themes]
    });

  } catch (error) {
    console.error('[MARKET_AGENT_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
