"use client";

import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Investment {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  growth: string;
  isPositive: boolean;
  highlighted?: boolean;
}

export function Investments() {
  const [data, setData] = useState<Investment[]>([]);

  useEffect(() => {
    fetch('/api/finpath/investments')
      .then(res => res.json())
      .then(res => setData(res.investments))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-[#1A1A1A] rounded-[24px] p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Investments</h3>
        <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {data.map((inv) => (
          <div 
            key={inv.id} 
            className={`flex items-center justify-between p-3 rounded-2xl transition-colors ${
              inv.highlighted 
                ? 'bg-[#D4FF00] text-black shadow-[0_0_20px_rgba(212,255,0,0.15)]' 
                : 'bg-transparent text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${inv.highlighted ? 'bg-black text-[#D4FF00]' : 'bg-zinc-800 text-white'}`}>
                {/* Simplified logos using text for prototype, could use SVGs */}
                {inv.name === 'Apple' ? (
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" opacity="0.2"/><path d="M15.15 9.77c-.82-.5-1.57-.46-2.07-.15-.65.41-.65 1.15 0 1.56.5.31 1.25.35 2.07-.15.65-.41.65-1.15 0-1.26zM12.5 7.5c.34 0 .68-.13.94-.39.52-.52.52-1.36 0-1.88-.52-.52-1.36-.52-1.88 0-.52.52-.52 1.36 0 1.88.26.26.6.39.94.39z"/></svg>
                ) : (
                  <span className="font-bold text-sm">{inv.symbol}</span>
                )}
              </div>
              <div>
                <div className={`font-semibold ${inv.highlighted ? 'text-black' : 'text-white'}`}>{inv.name}</div>
                <div className={`text-xs ${inv.highlighted ? 'text-black/70' : 'text-zinc-500'}`}>{inv.amount.toFixed(4)}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-sm font-medium ${inv.highlighted ? 'text-black' : (inv.isPositive ? 'text-[#D4FF00]' : 'text-red-400')}`}>
                {inv.growth}
              </div>
              <div className={`text-xs ${inv.highlighted ? 'text-black/70' : 'text-zinc-500'}`}>
                Per month
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
