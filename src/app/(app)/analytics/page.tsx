"use client";

import React, { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Activity, ShieldAlert, Target, ShieldCheck, BarChart2, PieChart as PieChartIcon, Network } from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

export default function IntelligenceAnalyticsPage() {
  const [data, setData] = useState<{ 
    kpis: any; 
    sectorActivity: any[];
    sourceQuality: any[];
    threatTypology: any[];
  }>({
    kpis: { totalSignalsProcessed: "...", activeThreats: "...", actionableSegments: "...", highConfidenceSignals: "..." },
    sectorActivity: [],
    sourceQuality: [],
    threatTypology: []
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/agent/trends");
      const result = await res.json();
      if (result.kpis) {
        setData(result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `empirisys-intelligence-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-[#1A1525] border border-zinc-200 dark:border-white/10 p-4 rounded-xl shadow-xl">
          <p className="text-sm font-bold text-zinc-900 dark:text-white mb-2">{label || payload[0].name}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
              <span className="text-zinc-500 dark:text-zinc-400 capitalize">{entry.name}:</span>
              <span className="font-bold text-zinc-900 dark:text-white">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header section with elite glassmorphic styling */}
      <div className="relative bg-white/40 dark:bg-[#1A1525]/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl shadow-zinc-200/20 dark:shadow-black/40 overflow-hidden">
        {/* Decorative background blurs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-violet-500/10 text-[11px] font-bold tracking-widest uppercase text-violet-600 dark:text-violet-400 border border-violet-500/20 flex items-center">
                <Network className="h-3 w-3 mr-1.5" /> Intelligence Engine Live
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2">
              Intelligence Analytics
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-[15px] leading-relaxed">
              Real-time visualization of the raw data flowing through the Empirisys AI platform. Track signal volume, threat topologies, and source verification metrics across the global process safety landscape.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button variant="outline" className="gap-2 bg-white/50 dark:bg-black/20 backdrop-blur-md border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 rounded-xl" onClick={handleExport}>
              <Download className="h-4 w-4" /> Export Data
            </Button>
            <Button 
              onClick={fetchAnalytics} 
              disabled={isLoading}
              className="gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] rounded-xl transition-all duration-300"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> 
              {isLoading ? "Syncing Engine..." : "Sync Engine"}
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Signals Processed", value: data.kpis.totalSignalsProcessed, icon: Activity, color: "text-violet-500", bg: "bg-violet-500/10" },
          { label: "Active Verified Threats", value: data.kpis.activeThreats, icon: ShieldAlert, color: "text-red-500", bg: "bg-red-500/10" },
          { label: "Actionable Segments", value: data.kpis.actionableSegments, icon: Target, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "High Confidence Signals", value: data.kpis.highConfidenceSignals, icon: ShieldCheck, color: "text-cyan-500", bg: "bg-cyan-500/10" }
        ].map((kpi, i) => (
          <div key={i} className="bg-white dark:bg-[#241E32] rounded-2xl p-6 border border-zinc-100 dark:border-white/5 shadow-sm relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 ${kpi.bg} rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 group-hover:scale-150 transition-transform duration-500`}></div>
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block mb-2">{kpi.label}</span>
                {isLoading ? (
                  <div className="h-8 w-20 bg-zinc-200 dark:bg-white/5 rounded animate-pulse"></div>
                ) : (
                  <div className="text-3xl font-extrabold text-zinc-900 dark:text-white">{kpi.value}</div>
                )}
              </div>
              <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sector Activity Chart (Takes up 2 columns on large screens) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#241E32] rounded-3xl p-6 md:p-8 border border-zinc-100 dark:border-white/5 shadow-sm relative">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-violet-500" /> Sector Pipeline Activity
              </h3>
              <p className="text-sm text-zinc-500 mt-1">Volume of raw signals vs verified threats extracted by the pipeline per sector.</p>
            </div>
          </div>
          
          <div className="h-[350px] w-full relative">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 dark:bg-[#241E32]/50 backdrop-blur-sm rounded-xl">
                <RefreshCw className="h-8 w-8 text-violet-500 animate-spin" />
              </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.sectorActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" strokeOpacity={0.1} />
                <XAxis dataKey="sector" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#8b5cf6', opacity: 0.05 }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                <Bar dataKey="signals" name="Raw Signals" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                <Bar dataKey="threats" name="Verified Threats" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Source Quality Chart */}
        <div className="bg-white dark:bg-[#241E32] rounded-3xl p-6 md:p-8 border border-zinc-100 dark:border-white/5 shadow-sm relative">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-cyan-500" /> Intelligence Sources
            </h3>
            <p className="text-sm text-zinc-500 mt-1">Distribution of extracted intelligence by source tier validation.</p>
          </div>
          
          <div className="h-[300px] w-full relative">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 dark:bg-[#241E32]/50 backdrop-blur-sm rounded-xl">
                <RefreshCw className="h-8 w-8 text-cyan-500 animate-spin" />
              </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.sourceQuality}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.sourceQuality.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  iconType="circle" 
                  layout="vertical" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threat Typology Radar Chart */}
        <div className="bg-white dark:bg-[#241E32] rounded-3xl p-6 md:p-8 border border-zinc-100 dark:border-white/5 shadow-sm relative lg:col-span-3">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div className="max-w-xl">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-emerald-500" /> Threat Typology Vector Map
              </h3>
              <p className="text-sm text-zinc-500 mt-1">Multi-dimensional analysis of threat categorization currently dominating the European HSE regulatory landscape.</p>
            </div>
            
            {!isLoading && (
              <div className="mt-4 md:mt-0 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">Dominant Vector</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-white">
                  {data.threatTypology.reduce((max, t) => t.A > max.A ? t : max, data.threatTypology[0])?.subject || "Calculating..."}
                </span>
              </div>
            )}
          </div>
          
          <div className="h-[400px] w-full relative">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 dark:bg-[#241E32]/50 backdrop-blur-sm rounded-xl">
                <RefreshCw className="h-8 w-8 text-emerald-500 animate-spin" />
              </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data.threatTypology}>
                <PolarGrid stroke="#e4e4e7" strokeOpacity={0.2} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar
                  name="Threat Concentration"
                  dataKey="A"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
