"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Activity, ShieldAlert, Target, ShieldCheck, BarChart2, PieChart as PieChartIcon, Network } from "lucide-react";
import { motion } from "framer-motion";
import { FunFactLoader } from "@/components/ui/fun-fact-loader";
import { 
  ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as const, stiffness: 70, damping: 15 }
  }
} as const;

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
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 dark:bg-[#1A1525]/80 backdrop-blur-xl border border-zinc-200 dark:border-white/10 p-4 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        >
          <p className="text-sm font-bold text-zinc-900 dark:text-white mb-3">{label || payload[0].name}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-3 text-sm mb-1.5 last:mb-0">
              <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: entry.color || entry.fill, color: entry.color || entry.fill }} />
              <span className="text-zinc-500 dark:text-zinc-400 font-medium capitalize">{entry.name}:</span>
              <span className="font-bold text-zinc-900 dark:text-white">{entry.value}</span>
            </div>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  if (isLoading) {
    return <FunFactLoader message="Compiling Analytics Dashboard..." />;
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 max-w-[1400px] mx-auto pb-20"
    >
      {/* Header section with elite glassmorphic styling */}
      <motion.div variants={itemVariants} className="relative bg-white/40 dark:bg-[#1A1525]/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl shadow-violet-500/5 overflow-hidden">
        {/* Animated Background Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/20 dark:bg-violet-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/20 dark:bg-cyan-500/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none"
        />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1.5 rounded-full bg-violet-500/10 text-[11px] font-bold tracking-widest uppercase text-violet-600 dark:text-violet-400 border border-violet-500/20 flex items-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                <div className="relative flex h-2.5 w-2.5 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500"></span>
                </div>
                Intelligence Engine Live
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 mb-3 pb-2">
              Intelligence Analytics
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-[16px] leading-relaxed font-medium">
              Real-time visualization of the raw data flowing through the Empirisys AI platform. Track signal volume, threat topologies, and source verification metrics across the global process safety landscape.
            </p>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <Button 
              variant="outline" 
              className="rounded-full border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 bg-white/50 dark:bg-black/20 backdrop-blur-md transition-all duration-300 shadow-sm"
              onClick={fetchAnalytics}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin text-violet-500' : ''}`} />
              Sync Data
            </Button>
            <Button 
              className="rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </motion.div>

      {/* KPI Strip */}
      <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Total Signals Processed", value: data.kpis.totalSignalsProcessed, icon: Activity, color: "text-violet-500", bg: "bg-violet-500/10", border: "border-violet-500/20" },
          { label: "Active Verified Threats", value: data.kpis.activeThreats, icon: ShieldAlert, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
          { label: "Actionable Segments", value: data.kpis.actionableSegments, icon: Target, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
          { label: "High Confidence Signals", value: data.kpis.highConfidenceSignals, icon: ShieldCheck, color: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/20" }
        ].map((kpi, i) => (
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            key={i} 
            className={`bg-white dark:bg-[#1A1525]/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border ${kpi.border} shadow-lg shadow-zinc-200/20 dark:shadow-black/20 relative overflow-hidden group`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${kpi.bg} rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:scale-150 transition-transform duration-700`}></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[11px] font-bold tracking-widest text-zinc-500 uppercase leading-snug w-2/3">{kpi.label}</span>
                <div className={`p-3 rounded-2xl ${kpi.bg} relative`}>
                  <kpi.icon className={`h-5 w-5 ${kpi.color} relative z-10`} />
                  <div className={`absolute inset-0 rounded-2xl ${kpi.bg} animate-ping opacity-50`}></div>
                </div>
              </div>
              <div>
                {isLoading ? (
                  <div className="h-10 w-24 bg-zinc-200 dark:bg-white/5 rounded-lg animate-pulse"></div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl font-extrabold text-zinc-900 dark:text-white"
                  >
                    {kpi.value}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Sector Pipeline Activity Bar Chart */}
        <motion.div variants={itemVariants} className="bg-white/60 dark:bg-[#1A1525]/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-zinc-200 dark:border-white/10 shadow-xl shadow-zinc-200/20 dark:shadow-black/20 relative overflow-hidden col-span-1 lg:col-span-2">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div className="max-w-2xl">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-2">
                <BarChart2 className="h-6 w-6 text-cyan-500" /> Sector Pipeline Activity
              </h3>
              <p className="text-sm text-zinc-500 font-medium">Comparison of raw intelligence signals versus fully verified threats dropped into the action pipeline.</p>
            </div>
            
            {!isLoading && (
              <div className="mt-4 md:mt-0 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center gap-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">Highest Volume</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-white">
                  {data.sectorActivity.reduce((max, s) => s.signals > max.signals ? s : max, data.sectorActivity[0])?.sector || 'N/A'}
                </span>
              </div>
            )}
          </div>
          
          <div className="h-[400px] w-full relative z-10">
            {isLoading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 dark:bg-[#1A1525]/50 backdrop-blur-sm rounded-2xl">
                <RefreshCw className="h-8 w-8 text-cyan-500 animate-spin" />
              </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.sectorActivity} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorSignals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#52525b" opacity={0.15} />
                <XAxis dataKey="sector" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 13, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 13 }} dx={-10} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#a1a1aa', opacity: 0.05 }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '13px', fontWeight: 500 }} />
                <Bar dataKey="signals" name="Raw Signals" fill="url(#colorSignals)" radius={[6, 6, 0, 0]} maxBarSize={50} />
                <Bar dataKey="threats" name="Verified Threats" fill="url(#colorThreats)" radius={[6, 6, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Intelligence Sources Pie Chart */}
        <motion.div variants={itemVariants} className="bg-white/60 dark:bg-[#1A1525]/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-zinc-200 dark:border-white/10 shadow-xl shadow-zinc-200/20 dark:shadow-black/20 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-2">
                <PieChartIcon className="h-6 w-6 text-violet-500" /> Intelligence Sources
              </h3>
              <p className="text-sm text-zinc-500 font-medium">Distribution of processed signals by source tier.</p>
            </div>
          </div>
          
          <div className="h-[350px] w-full relative z-10">
            {isLoading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 dark:bg-[#1A1525]/50 backdrop-blur-sm rounded-2xl">
                <RefreshCw className="h-8 w-8 text-violet-500 animate-spin" />
              </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.sourceQuality}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={8}
                >
                  {data.sourceQuality.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ filter: `drop-shadow(0px 0px 8px ${COLORS[index % COLORS.length]}40)` }} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  iconType="circle" 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  wrapperStyle={{ fontSize: '13px', fontWeight: 500 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Threat Typology Radar Chart */}
        <motion.div variants={itemVariants} className="bg-white/60 dark:bg-[#1A1525]/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-zinc-200 dark:border-white/10 shadow-xl shadow-zinc-200/20 dark:shadow-black/20 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div className="max-w-xs">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-2">
                <Target className="h-6 w-6 text-emerald-500" /> Threat Typology Vector
              </h3>
              <p className="text-sm text-zinc-500 font-medium">Multi-dimensional categorization of dominating threats.</p>
            </div>
            
            {!isLoading && (
              <div className="mt-4 md:mt-0 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-0.5">Primary Vector</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-white">
                  {data.threatTypology.reduce((max, t) => t.A > max.A ? t : max, data.threatTypology[0])?.subject || 'N/A'}
                </span>
              </div>
            )}
          </div>
          
          <div className="h-[350px] w-full relative z-10">
            {isLoading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 dark:bg-[#1A1525]/50 backdrop-blur-sm rounded-2xl">
                <RefreshCw className="h-8 w-8 text-emerald-500 animate-spin" />
              </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data.threatTypology}>
                <defs>
                  <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.6}/>
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <PolarGrid stroke="#a1a1aa" strokeOpacity={0.2} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar
                  name="Threat Concentration"
                  dataKey="A"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#radarGradient)"
                  fillOpacity={1}
                  className="drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
