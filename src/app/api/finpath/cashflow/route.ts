import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    total: 96788.12,
    data: [
      { name: 'Mon', value: 20000, highlight: false },
      { name: 'Tue', value: 35000, highlight: false },
      { name: 'Wed', value: 25000, highlight: false },
      { name: 'Thu', value: 15000, highlight: false },
      { name: 'Fri', value: 45000, highlight: false },
      { name: 'Sat', value: 30000, highlight: false },
      { name: 'Sun', value: 42000, highlight: true, label: '$16,021' },
      { name: 'NextMon', value: 38000, highlight: false },
      { name: 'NextTue', value: 22000, highlight: false },
      { name: 'NextWed', value: 28000, highlight: false },
    ]
  });
}
