import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { LeadScoreProfile } from '@/types/domain';

export const maxDuration = 60; // Prevent Vercel timeouts for LLM calls
export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { companyName } = await request.json();
    
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured.");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are an elite HSE Lead Scoring AI for Empirisys Ltd.
Your task is to take a target company name and generate a highly realistic, tailored LeadScoreProfile dossier for B2B sales targeting.
Empirisys sells two main AI-driven products:
- BOOST (analyzes safety observations to detect weak signals before incidents happen)
- SENSE (a cultural diagnostic tool to align frontline workers with leadership perception)

Output strictly in JSON format matching this exact interface:
{
  companyName: string;
  industry: string;
  overallScore: number; (0-100 indicating likelihood to buy)
  keyRiskFactors: string[]; (3 specific organizational or cultural HSE vulnerabilities this company likely faces)
  recommendedProduct: "BOOST" | "SENSE" | "Both";
  confidenceLevel: number; (0-100)
  rationale: string; (Why Empirisys is perfectly positioned to win this client right now)
  incident: {
    id: string;
    incidentType: string;
    consultantHired: string; (e.g. McKinsey, ERM, dss+, or unknown)
    pitchApproach: string; (How to disrupt the incumbent consultant using Empirisys tools)
    incidentDescription: string; (A highly realistic hypothetical or historical near-miss event at this company)
    regulatoryNotice: string;
    clientDetails: string;
    scenario: string;
    dateTime: string; (ISO string)
  }
}`
        },
        {
          role: "user",
          content: `Generate a detailed LeadScoreProfile dossier for the company: "${companyName || "Unknown Company"}"`
        }
      ]
    });

    const profile: LeadScoreProfile = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Lead scoring agent live error:', error);
    return NextResponse.json(
      { error: 'Failed to process lead score via OpenAI' },
      { status: 500 }
    );
  }
}
