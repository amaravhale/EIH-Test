"use client";

import React, { useState, useEffect } from "react";
import { Loader2, RefreshCw, Activity, Target, Network, Zap, CheckCircle2, XCircle, Sparkles, Shield } from "lucide-react";
import { LeadScoringMatrix } from "./_components/lead-scoring-matrix";

export default function DashboardPage() {
  const [themes, setThemes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"market" | "cai">("market");

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/agent/market');
      const data = await res.json();
      if (data.themes) {
        setThemes(data.themes);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidation = (id: string, action: 'approve' | 'reject') => {
    setThemes(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: action === 'approve' ? 'approved' : 'rejected' };
      }
      return t;
    }));
  };

  const pendingThemes = themes.filter(t => t.status === 'pending_validation');
  const approvedThemes = themes.filter(t => t.status === 'approved');
  const topActions = approvedThemes.slice(0, 3);

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto animate-in fade-in-50 duration-700">
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="mb-10">
        <h1 className="text-[36px] font-bold text-zinc-900 dark:text-white tracking-tight mb-2">Market Intelligence</h1>
        <p className="text-[15px] text-zinc-500 dark:text-zinc-400">
          AI-driven analysis of emerging HSE trends and opportunities.
        </p>
      </div>
        
        {/* Synexis Toggle Pills */}
        <div className="flex bg-zinc-100 dark:bg-[#110D17] p-1.5 rounded-full border border-zinc-200 dark:border-white/5">
          <button 
            onClick={() => setActiveTab("market")}
            className={`px-6 py-2 rounded-full text-[13px] font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'market' ? 'bg-gradient-to-r from-violet-500 to-cyan-400 text-white shadow-lg' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
          >
            <Network className="h-4 w-4" /> Market Signals
          </button>
          <button 
            onClick={() => setActiveTab("cai")}
            className={`px-6 py-2 rounded-full text-[13px] font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'cai' ? 'bg-gradient-to-r from-violet-500 to-cyan-400 text-white shadow-lg' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
          >
            <Target className="h-4 w-4" /> Client Acquisition
          </button>
        </div>
      </div>

      {activeTab === "market" && (
        <div className="space-y-8">
          
          {/* Top KPI Cards (Synexis Style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#241E32] rounded-[24px] p-6 shadow-sm border border-zinc-100 dark:border-white/5 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[11px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">ACTION-REQUIRED ITEMS</span>
                    <span className="text-[13px] font-bold text-cyan-500 flex items-center">
                      <Activity className="h-3 w-3 mr-1" />
                      +{topActions.length} New
                    </span>
                  </div>
                  <div className="text-[48px] font-bold text-zinc-900 dark:text-white leading-none tracking-tighter mb-2">
                    {topActions.length}
                  </div>
                  <span className="text-[12px] font-bold text-zinc-500 dark:text-zinc-400">Items requiring immediate attention</span>
              {/* Fake bar chart visual */}
              <div className="absolute bottom-0 left-0 w-full flex items-end justify-between px-6 h-12 gap-2 opacity-50">
                <div className="w-full bg-violet-500/20 rounded-t-sm h-[30%]"></div>
                <div className="w-full bg-violet-500/20 rounded-t-sm h-[50%]"></div>
                <div className="w-full bg-violet-500/20 rounded-t-sm h-[20%]"></div>
                <div className="w-full bg-violet-500/50 rounded-t-sm h-[80%]"></div>
                <div className="w-full bg-violet-500/30 rounded-t-sm h-[60%]"></div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#241E32] rounded-[24px] p-6 shadow-sm border border-zinc-100 dark:border-white/5 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[11px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">TOTAL PROCESSED SIGNALS</span>
                    <span className="text-[13px] font-bold text-cyan-500 flex items-center">
                      <Activity className="h-3 w-3 mr-1" />
                      +4.2M
                    </span>
                  </div>
                  <div className="text-[48px] font-bold text-zinc-900 dark:text-white leading-none tracking-tighter mb-2">
                    12.8M
                  </div>
                  <span className="text-[12px] font-bold text-zinc-500 dark:text-zinc-400">Across all monitored channels</span>
              {/* Fake bar chart visual */}
              <div className="absolute bottom-0 left-0 w-full flex items-end justify-between px-6 h-12 gap-2 opacity-50">
                <div className="w-full bg-cyan-400/20 rounded-t-sm h-[40%]"></div>
                <div className="w-full bg-cyan-400/20 rounded-t-sm h-[70%]"></div>
                <div className="w-full bg-cyan-400/20 rounded-t-sm h-[30%]"></div>
                <div className="w-full bg-cyan-400/20 rounded-t-sm h-[50%]"></div>
                <div className="w-full bg-cyan-400/50 rounded-t-sm h-[90%]"></div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#241E32] rounded-[24px] p-6 shadow-sm border border-zinc-100 dark:border-white/5 relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[11px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Pending Actions</span>
                <span className="text-[11px] font-bold text-cyan-500 flex items-center gap-1"><Activity className="h-3 w-3" /> High</span>
              </div>
              <div className="text-[40px] font-bold text-zinc-900 dark:text-white leading-none mb-2">{topActions.length}</div>
              <p className="text-[12px] text-zinc-500 dark:text-zinc-400">Requires strategic deployment</p>
              {/* Fake bar chart visual */}
              <div className="absolute bottom-0 left-0 w-full flex items-end justify-between px-6 h-12 gap-2 opacity-50">
                <div className="w-full bg-emerald-400/20 rounded-t-sm h-[20%]"></div>
                <div className="w-full bg-emerald-400/20 rounded-t-sm h-[40%]"></div>
                <div className="w-full bg-emerald-400/20 rounded-t-sm h-[80%]"></div>
                <div className="w-full bg-emerald-400/50 rounded-t-sm h-[100%]"></div>
                <div className="w-full bg-emerald-400/20 rounded-t-sm h-[60%]"></div>
              </div>
            </div>
          </div>

          {/* Main Content Split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Side: Market Themes Matrix */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-[#241E32] rounded-[32px] p-8 shadow-sm border border-zinc-100 dark:border-white/5 h-[500px] overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-[24px] font-bold text-zinc-900 dark:text-white">Active Theme Matrix</h3>
                  <p className="text-[13px] text-zinc-500 dark:text-zinc-400 mt-1">Validated intelligence patterns and trends</p>
                </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-md text-[11px] font-bold bg-zinc-100 dark:bg-[#1A1525] text-zinc-500 dark:text-zinc-400">1H</button>
                    <button className="px-3 py-1 rounded-md text-[11px] font-bold bg-zinc-100 dark:bg-[#1A1525] text-zinc-500 dark:text-zinc-400">24H</button>
                    <button className="px-3 py-1 rounded-md text-[11px] font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">7D</button>
                  </div>
                </div>

                <div className="space-y-4">
                  {approvedThemes.length === 0 ? (
                    <div className="text-center py-20 text-zinc-500">No active themes processed.</div>
                  ) : (
                    approvedThemes.map(theme => (
                      <div key={theme.id} className="p-5 rounded-[20px] bg-zinc-50 dark:bg-[#1A1525] border border-zinc-100 dark:border-white/5 flex gap-4">
                        <div className="w-1.5 h-full bg-gradient-to-b from-violet-500 to-cyan-400 rounded-full shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-[15px] font-bold text-zinc-900 dark:text-white">{theme.title}</h4>
                            <span className="text-[10px] px-2 py-1 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold uppercase">{theme.deltaStatus}</span>
                          </div>
                          <p className="text-[13px] text-zinc-600 dark:text-zinc-400 mb-4">{theme.description}</p>
                          <div className="p-3 rounded-xl bg-white dark:bg-[#241E32] border border-zinc-100 dark:border-white/5">
                            <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block mb-1">Strategic Action</span>
                            <p className="text-[12px] text-zinc-700 dark:text-zinc-300">{theme.interpretation.suggestedAction}</p>
                            <div className="mt-3 text-[11px] font-semibold text-zinc-500">Target Module: <span className="text-violet-500">{theme.interpretation.relevantProduct}</span></div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>


            </div>

            {/* Right Side: Neural Activity (Pending Review) */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-[#241E32] rounded-[32px] p-6 shadow-sm border border-zinc-100 dark:border-white/5 h-[500px] flex flex-col relative overflow-hidden">
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <h3 className="text-[16px] font-bold text-zinc-900 dark:text-white flex items-center gap-2"><Shield className="h-5 w-5 text-orange-500" /> Pending Review</h3>
                  <button onClick={fetchMarketData} className="text-zinc-400 hover:text-white transition-colors">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-5 custom-scrollbar relative z-10 pr-2">
                  {pendingThemes.length === 0 ? (
                     <div className="text-center py-10 text-[12px] text-zinc-500">No pending neural patterns.</div>
                  ) : (
                    pendingThemes.map((theme) => (
                      <div key={theme.id} className="flex gap-3">
                        <div className="mt-1 flex items-center justify-center h-6 w-6 rounded-md bg-cyan-400/10 text-cyan-500 shrink-0 border border-cyan-400/20">
                          <Network className="h-3 w-3" />
                        </div>
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h5 className="text-[13px] font-bold text-zinc-900 dark:text-zinc-100 leading-tight pr-4">{theme.title}</h5>
                            <span className="text-[10px] text-zinc-500 shrink-0">Just now</span>
                          </div>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-2">{theme.description}</p>
                          <div className="flex gap-2">
                            <button onClick={() => handleValidation(theme.id, 'approve')} className="flex items-center text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 hover:bg-emerald-500/20">
                              <CheckCircle2 className="h-3 w-3 mr-1" /> Approve
                            </button>
                            <button onClick={() => handleValidation(theme.id, 'reject')} className="flex items-center text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded border border-red-500/20 hover:bg-red-500/20">
                              <XCircle className="h-3 w-3 mr-1" /> Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {activeTab === "cai" && (
        <LeadScoringMatrix />
      )}
    </div>
  );
}
