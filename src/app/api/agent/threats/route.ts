import { NextResponse } from 'next/server';
import { scrapeLiveThreats } from '@/lib/ai/threat-monitor/scraper';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const threats = await scrapeLiveThreats();
    return NextResponse.json({ threats });
  } catch (error) {
    console.error('[THREAT_MONITOR_API_ERROR]', error);
    return new NextResponse("Failed to fetch live threats", { status: 500 });
  }
}
