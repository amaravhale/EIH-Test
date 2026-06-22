import React from 'react';
import { Search, SlidersHorizontal, Calendar, ChevronDown, ArrowLeft } from 'lucide-react';
import { TotalBalance } from '@/components/finpath/TotalBalance';
import { Investments } from '@/components/finpath/Investments';
import { AIAssistant } from '@/components/finpath/AIAssistant';
import { CashflowChart } from '@/components/finpath/CashflowChart';
import { TransactionsList } from '@/components/finpath/TransactionsList';

export default function FinpathDashboard() {
  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-4xl font-normal text-white">Hello, Steven</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <Calendar className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1A] border border-white/5 cursor-pointer hover:border-white/20 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-5 h-3 bg-zinc-700 rounded-sm"></div>
              <span className="text-sm font-medium text-white">**** 3625</span>
            </div>
            <ChevronDown className="w-4 h-4 text-zinc-400 ml-2" />
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Top Row: Balance and Investments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TotalBalance />
            <Investments />
          </div>

          {/* Bottom Row: Cashflow */}
          <CashflowChart />

        </div>

        {/* Right Column (Span 1) */}
        <div className="space-y-6">
          <AIAssistant />
          <TransactionsList />
        </div>

      </div>
    </div>
  );
}
