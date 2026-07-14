"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, Target, Zap, Activity, AlertTriangle, Briefcase, ChevronRight, BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import { StrikeList, StrikeTarget } from "@/components/dashboard/strike-list";

interface ExecutiveBriefing {
  bluf: {
    headline: string;
    summary: string;
    recommendedAction: string;
  };
  matrix: {
    tailwinds: { sector: string; driver: string; intensity: "high" | "medium" }[];
    headwinds: { sector: string; driver: string; intensity: "high" | "medium" }[];
  };
  dominantTheme: string;
  targets: StrikeTarget[];
}

export default function DashboardPage() {
  const [briefing, setBriefing] = useState<ExecutiveBriefing | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBriefing();
  }, []);

  const fetchBriefing = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/agent/executive-briefing');
      if (res.ok) {
        const data = await res.json();
        setBriefing(data);
      }
    } catch (error) {
      console.error("Failed to load briefing", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !briefing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Activity className="h-8 w-8 text-violet-500 animate-spin" />
        <p className="text-zinc-500 font-medium">Compiling Executive Briefing...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto animate-in fade-in-50 duration-700 pb-20">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="mb-2">
          <h1 className="text-[36px] font-bold text-zinc-900 dark:text-white tracking-tight mb-2">Mission Control</h1>
          <p className="text-[15px] text-zinc-500 dark:text-zinc-400">
            Real-time strategic posture, revenue pulse, and priority intelligence.
          </p>
        </div>
      </div>

      {/* The BLUF (Bottom Line Up Front) Banner */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-widest uppercase flex items-center">
              <Zap className="h-3 w-3 mr-1.5 text-yellow-300" /> BLUF Briefing
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight max-w-3xl">
            {briefing.bluf.headline}
          </h2>
          <p className="text-violet-100 text-[15px] md:text-[17px] mb-6 max-w-4xl leading-relaxed">
            {briefing.bluf.summary}
          </p>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 border-l-4 border-l-cyan-400 inline-block w-full max-w-4xl">
            <span className="text-[11px] uppercase tracking-widest text-cyan-300 font-bold mb-1 block">Recommended Action</span>
            <p className="text-[15px] font-medium">{briefing.bluf.recommendedAction}</p>
          </div>
        </div>
      </div>

      {/* Revenue Pulse KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1A1525] rounded-3xl p-6 border border-zinc-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold">Active Pipeline</span>
            <Target className="h-4 w-4 text-violet-500" />
          </div>
          <div className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">{briefing.targets.length}</div>
          <p className="text-sm text-zinc-500">Tier-A targets currently vulnerable</p>
        </div>

        <div className="bg-white dark:bg-[#1A1525] rounded-3xl p-6 border border-zinc-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-orange-500/5"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold">Displacement Opps</span>
            <Briefcase className="h-4 w-4 text-orange-500" />
          </div>
          <div className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">{Math.floor(briefing.targets.length / 2) + 1}</div>
          <p className="text-sm text-zinc-500">Incumbents vulnerable to disruption</p>
        </div>

        <div className="bg-white dark:bg-[#1A1525] rounded-3xl p-6 border border-zinc-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold">Dominant Theme</span>
            <BarChart3 className="h-4 w-4 text-cyan-500" />
          </div>
          <div className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white leading-tight mb-2 h-10 flex items-center">
            {briefing.dominantTheme}
          </div>
          <p className="text-sm text-zinc-500">Primary driver for consulting demand</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Strategic Posture Matrix */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Strategic Posture</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-zinc-100 dark:bg-white/10 text-zinc-500">Matrix</span>
          </div>

          <div className="bg-white dark:bg-[#1A1525] rounded-3xl border border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm">
            {/* Tailwinds */}
            <div className="p-6 border-b border-zinc-100 dark:border-white/5">
              <div className="flex items-center gap-2 mb-6 text-emerald-500">
                <TrendingUp className="h-5 w-5" />
                <h4 className="font-bold uppercase tracking-widest text-sm">Regulatory Tailwinds</h4>
              </div>
              <div className="space-y-4">
                {briefing.matrix.tailwinds.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-[#241E32] border border-emerald-500/20">
                    <div className="w-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                    <div>
                      <h5 className="font-bold text-zinc-900 dark:text-white text-sm mb-1">{item.sector}</h5>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.driver}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Headwinds */}
            <div className="p-6 bg-zinc-50/50 dark:bg-[#1A1525]/50">
              <div className="flex items-center gap-2 mb-6 text-rose-500">
                <TrendingDown className="h-5 w-5" />
                <h4 className="font-bold uppercase tracking-widest text-sm">CapEx Headwinds</h4>
              </div>
              <div className="space-y-4">
                {briefing.matrix.headwinds.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-white dark:bg-[#241E32] border border-rose-500/20 shadow-sm">
                    <div className="w-1.5 rounded-full bg-rose-500 shrink-0"></div>
                    <div>
                      <h5 className="font-bold text-zinc-900 dark:text-white text-sm mb-1">{item.sector}</h5>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.driver}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Priority Strike List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Priority Strike List</h3>
              <span className="relative flex h-2 w-2 ml-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#1A1525] p-2 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-sm">
            <StrikeList targets={briefing.targets} />
          </div>
        </div>
      </div>

    </div>
  );
}
