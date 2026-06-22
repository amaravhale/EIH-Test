import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    investments: [
      { id: 'amzn', symbol: 'a', name: 'Amazon', amount: 3.3528, growth: '+4.48%', isPositive: true },
      { id: 'nvda', symbol: 'nv', name: 'Nvidia', amount: 2.3221, growth: '+3.12%', isPositive: true, highlighted: true },
      { id: 'aapl', symbol: 'ap', name: 'Apple', amount: 0.4221, growth: '-0.28%', isPositive: false },
    ]
  });
}
