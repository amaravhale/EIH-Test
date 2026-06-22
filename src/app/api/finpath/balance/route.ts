import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    totalBalance: 44060.00,
    accounts: [
      { id: 'visa', name: 'Visa', amount: 5710 },
      { id: 'mastercard', name: 'Mastercard', amount: 13792 },
      { id: 'savings', name: 'Savings', amount: 24558 },
    ]
  });
}
