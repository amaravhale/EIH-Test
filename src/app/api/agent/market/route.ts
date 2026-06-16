import { NextResponse } from 'next/server';
import { MarketIntelligencePipeline } from '@/lib/ai/market-intelligence/pipeline';

export async function GET() {
  try {
    const pipeline = new MarketIntelligencePipeline();
    const themes = await pipeline.runPipeline();

    // To simulate a system with history, we mock one 'approved' theme
    // and let the pipeline return the 'pending_validation' theme.
    const mockApprovedThemes = [
      {
        id: 'theme-0',
        title: 'Rotterdam Refining Safety Capex Cycle',
        description: 'Major operators in the Rotterdam area are initiating multi-year safety upgrades.',
        signals: [],
        interpretation: {
          impact: 'High opportunity for enterprise-wide deployments in the Netherlands.',
          relevantProduct: 'Leadership360',
          suggestedAction: 'Research target accounts at Rotterdam port for Leadership360 entry.'
        },
        status: 'approved',
        deltaStatus: 'intensified'
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
