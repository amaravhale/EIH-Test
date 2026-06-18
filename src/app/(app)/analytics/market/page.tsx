"use client";

import React, { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function MarketAnalyticsPage() {
  const [data, setData] = useState<{ kpis: any; chartData: any[] }>({
    kpis: { totalMarket: "...", marketGrowth: "...", tenders: 0, regulatoryShifts: 0 },
    chartData: []
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrends = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/agent/trends");
      const result = await res.json();
      if (result.kpis && result.chartData) {
        setData(result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `market-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader
          title="Market Analytics"
          description="Live AI-generated macro indicators for European process safety sectors."
        />
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" /> Export Report
          </Button>
          <Button 
            onClick={fetchTrends} 
            disabled={isLoading}
            className="bg-teal-600 hover:bg-teal-700 text-white transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> 
            {isLoading ? "Analyzing..." : "Refresh Intelligence"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Addressable Market</CardTitle>
            <CardDescription>Estimated for current year</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-10 w-24 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-md"></div>
            ) : (
              <>
                <div className="text-3xl font-bold">{data.kpis.totalMarket}</div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">↑ {data.kpis.marketGrowth} from last year</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Tenders</CardTitle>
            <CardDescription>Currently open opportunities</CardDescription>
          </CardHeader>
          <CardContent>
             {isLoading ? (
              <div className="h-10 w-16 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-md"></div>
            ) : (
              <>
                <div className="text-3xl font-bold">{data.kpis.tenders}</div>
                <p className="text-xs text-zinc-500 mt-1">Across monitored sectors</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Regulatory Shifts</CardTitle>
            <CardDescription>Major policy changes detected</CardDescription>
          </CardHeader>
          <CardContent>
             {isLoading ? (
              <div className="h-10 w-16 bg-amber-200/50 dark:bg-amber-900/50 animate-pulse rounded-md"></div>
            ) : (
              <>
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-500">{data.kpis.regulatoryShifts}</div>
                <p className="text-xs text-zinc-500 mt-1">In the last 30 days</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sector Investment Volume</CardTitle>
          <CardDescription>Capital allocation across key energy sectors over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full relative">
             {isLoading && (
               <div className="absolute inset-0 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                 <RefreshCw className="h-8 w-8 text-teal-500 animate-spin" />
               </div>
             )}
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHydrogen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `£${value}M`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" strokeOpacity={0.2} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', boxShadow: 'none' }}
                />
                <Area type="monotone" dataKey="Offshore Wind" stroke="#3b82f6" fillOpacity={1} fill="url(#colorWind)" />
                <Area type="monotone" dataKey="Hydrogen" stroke="#10b981" fillOpacity={1} fill="url(#colorHydrogen)" />
                <Area type="monotone" dataKey="Process Safety" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorWind)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
