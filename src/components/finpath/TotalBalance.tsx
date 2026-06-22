"use client";

import React, { useEffect, useState } from 'react';

interface BalanceData {
  totalBalance: number;
  accounts: { id: string; name: string; amount: number }[];
}

export function TotalBalance() {
  const [data, setData] = useState<BalanceData | null>(null);

  useEffect(() => {
    fetch('/api/finpath/balance')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-[#1A1A1A] rounded-[24px] p-6 relative overflow-hidden flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm text-zinc-400">Total Balance</span>
        <div className="flex gap-2 text-xs font-medium">
          <span className="text-zinc-400 cursor-pointer">EUR</span>
          <span className="text-white cursor-pointer px-2 py-0.5 bg-zinc-800 rounded">USD</span>
        </div>
      </div>
      
      <div className="text-4xl font-light text-white mb-8">
        ${data ? data.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
      </div>

      <div className="flex-1 relative mb-8 flex items-center justify-between px-2">
        {/* Connected Node Visualization */}
        <div className="absolute top-1/2 left-4 right-4 h-8 bg-gradient-to-r from-zinc-800 via-[#D4FF00]/20 to-[#D4FF00]/40 -translate-y-1/2 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-gradient-to-r from-zinc-700 via-[#D4FF00]/50 to-[#D4FF00] -translate-y-1/2 pointer-events-none z-0"></div>

        {data?.accounts.map((acc, index) => (
          <div key={acc.id} className="relative z-10 flex flex-col items-center">
            <div className={`w-16 h-16 rounded-full flex flex-col items-center justify-center backdrop-blur-md border ${index === 2 ? 'bg-[#D4FF00]/10 border-[#D4FF00]/50 text-[#D4FF00]' : index === 1 ? 'bg-[#D4FF00]/5 border-[#D4FF00]/20 text-[#D4FF00]/80' : 'bg-zinc-800/50 border-zinc-700 text-zinc-300'}`}>
              <span className="text-xs font-medium">${acc.amount.toLocaleString()}</span>
            </div>
            <span className="text-[10px] text-zinc-500 mt-2">{acc.name}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-auto">
        <button className="flex-1 py-3 rounded-full border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors">
          Receive Money
        </button>
        <button className="flex-1 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors">
          Send Money
        </button>
      </div>
    </div>
  );
}
