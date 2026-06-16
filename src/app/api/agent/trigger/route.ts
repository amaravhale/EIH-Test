import { NextResponse } from 'next/server';
import { LeadScoringAgent } from '@/lib/ai/lead-scorer';
import { RawSignal } from '@/lib/ai/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rawText, sourceUrl, sourceType } = body;

    if (!rawText) {
      return NextResponse.json({ error: 'Missing rawText field' }, { status: 400 });
    }

    const agent = new LeadScoringAgent();
    
    // Simulate a signal received from the ingestion layer
    const signal: RawSignal = {
      id: Math.random().toString(36).substring(7),
      sourceUrl: sourceUrl || 'https://euosha.europa.eu/incidents',
      sourceType: sourceType || 'eu_osha',
      rawText: rawText,
      publishedAt: new Date().toISOString()
    };

    // Process the signal through the AI Agent Workflow
    const executiveOutput = await agent.processIncomingSignal(signal);

    if (!executiveOutput) {
      return NextResponse.json({ 
        message: 'Signal processed. No trigger events found or lead score too low.',
        processed: true,
        output: null
      });
    }

    return NextResponse.json({
      message: 'High-scoring lead identified. Executive output generated.',
      processed: true,
      output: executiveOutput
    });

  } catch (error) {
    console.error('[AGENT_TRIGGER_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
