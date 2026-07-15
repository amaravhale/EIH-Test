"use client";

import { useEffect, useState } from "react";
import { SignalCard } from "@/components/domain/signal-card";
import { FilterBar } from "@/components/data/filter-bar";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { RefreshCw, Radio, ShieldAlert, Building2, Clock, Activity, Briefcase } from "lucide-react";
import { IntelligenceSignal } from "@/app/api/agent/signals/route";
import { FunFactLoader } from "@/components/ui/fun-fact-loader";

export default function SignalsFeedPage() {
  const [signals, setSignals] = useState<IntelligenceSignal[]>([]);
  const [threats, setThreats] = useState<any[]>([]);
  const [filteredSignals, setFilteredSignals] = useState<IntelligenceSignal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeStream, setActiveStream] = useState<"market" | "threats">("market");
  
  // Filter state
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeStatus, setActiveStatus] = useState<string>("all");
  const [activeScore, setActiveScore] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchAllFeeds = async () => {
    setIsLoading(true);
    try {
      const [signalsRes, threatsRes] = await Promise.all([
        fetch("/api/agent/signals"),
        fetch("/api/agent/threats")
      ]);
      const signalsData = await signalsRes.json();
      const threatsData = await threatsRes.json();
      
      if (signalsData.signals) {
        setSignals(signalsData.signals);
        setFilteredSignals(signalsData.signals);
      }
      if (threatsData.threats) {
        setThreats(threatsData.threats);
      }
    } catch (error) {
      console.error("Failed to fetch feeds:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFeeds();
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
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Radio className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">Live AI Feed Active</span>
            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Neural Signals Feed</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Real-time stream of market, competitor, and regulatory signals scored by the Anthropic engine.
          </p>
        </div>
        
        {/* Toggle Stream */}
        <div className="flex bg-zinc-100 dark:bg-[#110D17] p-1.5 rounded-full border border-zinc-200 dark:border-white/5">
          <button 
            onClick={() => setActiveStream("market")}
            className={`px-6 py-2 rounded-full text-[13px] font-bold transition-all duration-300 flex items-center gap-2 ${activeStream === 'market' ? 'bg-gradient-to-r from-violet-500 to-cyan-400 text-white shadow-lg' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
          >
            <Radio className="h-4 w-4" /> Market Signals
          </button>
          <button 
            onClick={() => setActiveStream("threats")}
            className={`px-6 py-2 rounded-full text-[13px] font-bold transition-all duration-300 flex items-center gap-2 ${activeStream === 'threats' ? 'bg-gradient-to-r from-red-500 to-orange-400 text-white shadow-lg' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
          >
            <ShieldAlert className="h-4 w-4" /> Verified Threats
          </button>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={fetchAllFeeds} 
            disabled={isLoading}
            className="bg-violet-600 hover:bg-violet-700 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
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
          <div className="animate-in fade-in duration-300">
            <FunFactLoader message="Fetching Strategic Signals..." />
          </div>
        ) : activeStream === "market" ? (
          filteredSignals.length === 0 ? (
            <div className="text-center py-10 text-zinc-500">No signals match your filters.</div>
          ) : (
            filteredSignals.map(signal => (
              <SignalCard key={signal.id} signal={signal} />
            ))
          )
        ) : (
          threats.length === 0 ? (
             <div className="text-center py-10 text-zinc-500">No verified threats detected in the current timeframe.</div>
          ) : (
            threats.map(threat => (
              <div key={threat.id} className="bg-white dark:bg-[#1A1525] rounded-xl p-6 border border-zinc-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-red-500/30 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-red-500 to-orange-400 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 flex items-center gap-1.5">
                         <ShieldAlert className="h-3 w-3" /> {threat.level}
                       </span>
                       <span className="text-[12px] text-zinc-500 flex items-center gap-1">
                         <Clock className="h-3 w-3" /> {threat.timeAgo}
                       </span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight">{threat.title}</h3>
                  </div>
                  <div className="flex flex-col items-start md:items-end shrink-0">
                    <span className="flex items-center gap-1.5 text-[12px] font-bold text-zinc-600 dark:text-zinc-300">
                      <Building2 className="h-3.5 w-3.5 text-orange-500" /> {threat.companyName}
                    </span>
                    <span className="text-[11px] text-zinc-400 uppercase tracking-widest mt-0.5">{threat.sector}</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                  {threat.description}
                </p>
                <div className="bg-zinc-50 dark:bg-[#241E32] rounded-xl border border-zinc-200 dark:border-white/5 p-4 relative">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">BowTie Analysis: Control Breakdown</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[11px] font-bold text-red-500 uppercase">Top Event</span>
                      <p className="text-[13px] text-zinc-900 dark:text-zinc-200 font-medium">{threat.bowTieAnalysis?.topEvent || "Unknown"}</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-orange-500 uppercase">Failed Barriers</span>
                      <p className="text-[13px] text-zinc-900 dark:text-zinc-200 font-medium truncate">{threat.bowTieAnalysis?.preventativeBarriers?.[0] || "Unknown"}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
}
