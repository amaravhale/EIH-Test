import { NextResponse } from 'next/server';
import { runMarketIntelligencePipeline } from '@/lib/ai/market-intelligence/pipeline';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // Body is accepted but currently unused — reserved for future filter params
    await req.json().catch(() => ({}));

    const result = await runMarketIntelligencePipeline();

    console.log('[MARKET_ANALYST] Pipeline completed. Metrics:', !!result.metrics);

    return NextResponse.json({
      events: result.events,
      themes: result.themes,
      metrics: result.metrics,
      landscape: result.landscape,
      meta: {
        totalEventsExtracted: result.events.length,
        totalThemes: result.themes.length,
        totalSegments: result.landscape?.segments?.length || 0,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('[MARKET_ANALYST_PIPELINE_ERROR]', error);
    return new NextResponse('Pipeline execution failed', { status: 500 });
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'ready',
    agent: 'market-analyst',
    pipeline:
      'event-extraction → scoring → filtering → theme-aggregation → interpretation',
  });
}
