"use client";

import { useEffect, useState } from "react";
import { SignalCard } from "@/components/domain/signal-card";
import { FilterBar } from "@/components/data/filter-bar";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { RefreshCw, Radio } from "lucide-react";
import { IntelligenceSignal } from "@/app/api/agent/signals/route";

export default function SignalsFeedPage() {
  const [signals, setSignals] = useState<IntelligenceSignal[]>([]);
  const [filteredSignals, setFilteredSignals] = useState<IntelligenceSignal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter state
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeStatus, setActiveStatus] = useState<string>("all");
  const [activeScore, setActiveScore] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchSignals = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/agent/signals");
      const data = await res.json();
      if (data.signals) {
        setSignals(data.signals);
        setFilteredSignals(data.signals);
      }
    } catch (error) {
      console.error("Failed to fetch signals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
  }, []);

  useEffect(() => {
    let result = signals;
    if (activeCategory !== "all") {
      result = result.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());
    }
    if (activeStatus !== "all") {
      result = result.filter(s => s.status.toLowerCase() === activeStatus.toLowerCase());
    }
    if (activeScore !== "all") {
      const minScore = parseInt(activeScore, 10);
      result = result.filter(s => s.score >= minScore);
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.title.toLowerCase().includes(q) || 
        s.summary.toLowerCase().includes(q) ||
        s.source.toLowerCase().includes(q)
      );
    }
    setFilteredSignals(result);
  }, [signals, activeCategory, activeStatus, activeScore, searchQuery]);


  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Radio className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">Live AI Feed Active</span>
            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Neural Signals Feed</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Real-time stream of market, competitor, and regulatory signals scored by the Anthropic engine.
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={fetchSignals} 
            disabled={isLoading}
            className="bg-teal-600 hover:bg-teal-700 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> 
            {isLoading ? "Scanning..." : "Force Deep Scan"}
          </Button>
        </div>
      </div>
      
      <FilterBar 
        searchPlaceholder="Search raw signals..."
        onSearchChange={setSearchQuery}
        onFilterChange={(filterId, value) => {
          if (filterId === "category") setActiveCategory(value);
          if (filterId === "status") setActiveStatus(value);
          if (filterId === "score") setActiveScore(value);
        }}
        filters={[
          {
            id: "category",
            type: "select",
            label: "Category",
            options: [
              { label: "Regulation", value: "regulation" },
              { label: "Competitive", value: "competitive" },
              { label: "Industry", value: "industry" },
              { label: "Technology", value: "technology" },
              { label: "Tender", value: "tender" }
            ]
          },
          {
            id: "status",
            type: "select",
            label: "Status",
            options: [
              { label: "Discovered", value: "discovered" },
              { label: "Reviewed", value: "reviewed" },
              { label: "Actionable", value: "actionable" }
            ]
          },
          {
            id: "score",
            type: "select",
            label: "Relevance Score",
            options: [
              { label: "90+ (Critical)", value: "90" },
              { label: "75+ (High)", value: "75" },
              { label: "50+ (Medium)", value: "50" }
            ]
          }
        ]}
      />
      
      <div className="space-y-4 max-w-4xl">
        {isLoading ? (
          // Skeleton loaders
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 rounded-xl bg-zinc-100 dark:bg-[#062A30] border border-zinc-200 dark:border-white/5 animate-pulse relative overflow-hidden">
               <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent"></div>
               <div className="p-6">
                 <div className="flex justify-between">
                   <div className="space-y-3 w-2/3">
                     <div className="h-4 w-32 bg-zinc-200 dark:bg-white/10 rounded-full"></div>
                     <div className="h-6 w-full bg-zinc-200 dark:bg-white/10 rounded-md"></div>
                   </div>
                   <div className="h-16 w-16 bg-zinc-200 dark:bg-white/10 rounded-xl"></div>
                 </div>
                 <div className="space-y-2 mt-6">
                   <div className="h-3 w-full bg-zinc-200 dark:bg-white/10 rounded-full"></div>
                   <div className="h-3 w-5/6 bg-zinc-200 dark:bg-white/10 rounded-full"></div>
                 </div>
               </div>
            </div>
          ))
        ) : filteredSignals.length === 0 ? (
          <div className="text-center py-10 text-zinc-500">No signals match your filters.</div>
        ) : (
          filteredSignals.map(signal => (
            <SignalCard key={signal.id} signal={signal} />
          ))
        )}
      </div>
    </div>
  );
}
