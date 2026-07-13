import { NextResponse } from 'next/server';
import { runLeadScoringPipeline } from '@/lib/ai/lead-scoring/pipeline';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { companyName } = await request.json();
    
    if (!companyName) {
      return NextResponse.json({ error: 'Company name is required' }, { status: 400 });
    }

    const profile = await runLeadScoringPipeline(companyName);

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('[LEAD_SCORING_API_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to process lead score pipeline' },
      { status: 500 }
    );
  }
}
