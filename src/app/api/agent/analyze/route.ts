import { NextResponse } from 'next/server';
import { MarketAnalysisAgent } from '@/lib/ai/market-analyzer';
import { CompetitorAnalysisAgent } from '@/lib/ai/competitor-analyzer';

export async function GET() {
  try {
    const marketAgent = new MarketAnalysisAgent();
    const competitorAgent = new CompetitorAnalysisAgent();

    // Run both analyses in parallel
    const [marketData, competitorData] = await Promise.all([
      marketAgent.runAnalysis(),
      competitorAgent.runAnalysis()
    ]);

    return NextResponse.json({
      market: marketData,
      competitor: competitorData
    });

  } catch (error) {
    console.error('[AGENT_ANALYZE_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
