import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    transactions: [
      { id: '1', name: 'PlayStation Network', date: '28.03.26', amount: -44.48, avatar: 'PS' },
      { id: '2', name: 'Liam Haprer', date: '28.03.26', amount: 280.00, avatar: 'https://i.pravatar.cc/150?img=33' },
      { id: '3', name: 'Spotify', date: '27.03.26', amount: -12.98, avatar: 'SP' },
      { id: '4', name: 'Amazon', date: '25.03.26', amount: -128.24, avatar: 'a' },
      { id: '5', name: 'Emily Thomas', date: '28.03.26', amount: 280.00, avatar: 'https://i.pravatar.cc/150?img=47' },
    ]
  });
}
