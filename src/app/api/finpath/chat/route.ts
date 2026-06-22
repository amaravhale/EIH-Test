import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    // Mock response for the prototype
    return NextResponse.json({
      reply: `I can certainly help you with that. Based on your current cashflow of $96,788.12, analyzing "${message}" suggests we should review your recent transactions.`
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
