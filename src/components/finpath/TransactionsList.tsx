"use client";

import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  avatar: string;
}

export function TransactionsList() {
  const [data, setData] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch('/api/finpath/transactions')
      .then(res => res.json())
      .then(res => setData(res.transactions))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-[#1A1A1A] rounded-[24px] p-6 h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Transactions</h3>
        <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
        {data.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border border-white/5">
                {tx.avatar.startsWith('http') ? (
                  <img src={tx.avatar} alt={tx.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-medium text-zinc-300">{tx.avatar}</span>
                )}
              </div>
              <div>
                <div className="text-sm text-white group-hover:text-[#D4FF00] transition-colors">{tx.name}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <span className="text-sm text-zinc-500">{tx.date}</span>
              <span className={`text-sm font-medium w-20 text-right ${tx.amount > 0 ? 'text-[#D4FF00]' : 'text-white'}`}>
                {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
