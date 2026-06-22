"use client";

import React from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

interface ChartData {
  name: string;
  value: number;
  highlight: boolean;
  label?: string;
}

const mockChartData: ChartData[] = [
  { name: 'Mon', value: 4200, highlight: false },
  { name: 'Tue', value: 3800, highlight: false },
  { name: 'Wed', value: 5100, highlight: false },
  { name: 'Thu', value: 4600, highlight: false },
  { name: 'Fri', value: 6800, highlight: false },
  { name: 'Sat', value: 5900, highlight: false },
  { name: 'Sun', value: 8400, highlight: true, label: '8.4k' },
];

export function VolumeChart() {
  return (
    <div className="bg-[#1A1A1A] dark:bg-[#1A1A1A] rounded-[24px] p-6 h-[300px] flex flex-col relative w-full mb-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm text-zinc-400 mb-2 font-medium">Signal Processing Volume</h3>
          <div className="text-3xl font-light text-white">
            42,800
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockChartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
            <Tooltip 
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              contentStyle={{ backgroundColor: '#2A2A2A', border: 'none', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#D4FF00' }}
            />
            <XAxis dataKey="name" stroke="#52525B" fontSize={12} tickLine={false} axisLine={false} />
            <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={40}>
              {mockChartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.highlight ? '#D4FF00' : '#2A2A2A'} 
                  className="transition-all duration-300 hover:brightness-110 cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {/* Absolute positioned overlay for the highlighted label as seen in the reference */}
        {mockChartData.map((d, i) => d.highlight && (
          <div 
            key="label" 
            className="absolute z-10 bg-[#2A2A2A] text-white text-xs py-1 px-3 rounded-full border border-white/10 shadow-lg pointer-events-none"
            style={{ 
              bottom: '60%', 
              left: `${(i / mockChartData.length) * 100 + (100 / mockChartData.length / 2)}%`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            {d.label}
            {/* Dashed line down to bar */}
            <div className="absolute top-full left-1/2 w-[1px] h-10 bg-dashed border-l border-dashed border-white/30 -translate-x-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
