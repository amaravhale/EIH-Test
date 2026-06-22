"use client";

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChevronDown } from 'lucide-react';

interface ChartData {
  name: string;
  value: number;
  highlight: boolean;
  label?: string;
}

export function CashflowChart() {
  const [data, setData] = useState<{total: number, data: ChartData[]}>({ total: 0, data: [] });

  useEffect(() => {
    fetch('/api/finpath/cashflow')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-[#1A1A1A] rounded-[24px] p-6 h-[400px] flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm text-zinc-400 mb-2">Cashflow</h3>
          <div className="text-3xl font-light text-white">
            ${data.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 bg-zinc-800/50 rounded-full border border-white/5 hover:bg-zinc-800 transition-colors">
          Weekly <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-4 text-sm mb-6">
        <button className="text-white bg-zinc-800 px-4 py-1.5 rounded-full">Income</button>
        <button className="text-zinc-500 hover:text-white transition-colors">Expense</button>
        <button className="text-zinc-500 hover:text-white transition-colors">Saving</button>
      </div>

      <div className="flex-1 w-full min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            {/* Custom Tooltip implementation would go here for interactivity, using a simpler approach for the prototype layout */}
            <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={40}>
              {data.data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.highlight ? '#D4FF00' : '#2A2A2A'} 
                  className="transition-all duration-300"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {/* Absolute positioned overlay for the highlighted label as seen in the design */}
        {data.data.map((d, i) => d.highlight && (
          <div 
            key="label" 
            className="absolute z-10 bg-[#2A2A2A] text-white text-xs py-1 px-3 rounded-full border border-white/10 shadow-lg pointer-events-none"
            style={{ 
              bottom: '50%', // Approximated position
              left: `${(i / data.data.length) * 100 + (100 / data.data.length / 2)}%`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            {d.label}
            {/* Dashed line down to bar */}
            <div className="absolute top-full left-1/2 w-[1px] h-12 bg-dashed border-l border-dashed border-white/30 -translate-x-1/2"></div>
          </div>
        ))}

        {/* Y Axis Labels (Approximate overlay) */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-zinc-500 py-4 pointer-events-none">
          <span>$80</span>
          <span>$60</span>
          <span>$40</span>
          <span>$20</span>
          <span>$0</span>
        </div>
      </div>
    </div>
  );
}
