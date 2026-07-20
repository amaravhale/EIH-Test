"use client";

import React, { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";

export default function SentimentAnalyticsPage() {
  const [data, setData] = useState<{ kpis: any; mentions: any[] }>({
    kpis: { score: "...", negativeAlerts: 0, totalMentions: "..." },
    mentions: []
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchSentiment = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/agent/sentiment");
      const result = await res.json();
      if (result.kpis && result.mentions) {
        setData(result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSentiment();
  }, []);

  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sentiment-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader
          title="Sentiment Analysis"
          description="Live public perception and brand sentiment tracking."
        />
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" /> Export Report
          </Button>
          <Button 
            onClick={fetchSentiment} 
            disabled={isLoading}
            className="bg-violet-600 hover:bg-violet-700 text-white transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> 
            {isLoading ? "Analyzing..." : "Refresh Intelligence"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Overall Sentiment Score</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-10 w-24 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-md"></div>
            ) : (
              <>
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{data.kpis.score}</div>
                <p className="text-xs text-zinc-600 dark:text-zinc-500 mt-1">Positive mentions across all channels</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Negative Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-10 w-16 bg-red-200/50 dark:bg-red-900/50 animate-pulse rounded-md"></div>
            ) : (
              <>
                <div className="text-3xl font-bold text-red-600 dark:text-red-500">{data.kpis.negativeAlerts}</div>
                <p className="text-xs text-zinc-600 dark:text-zinc-500 mt-1">Requires immediate PR review</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Mentions</CardTitle>
          </CardHeader>
          <CardContent>
             {isLoading ? (
              <div className="h-10 w-24 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-md"></div>
            ) : (
              <>
                <div className="text-3xl font-bold">{data.kpis.totalMentions}</div>
                <p className="text-xs text-zinc-600 dark:text-zinc-500 mt-1">Last 30 days</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Mentions</CardTitle>
          <CardDescription>Live feed of latest articles and social posts categorized by sentiment.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
             {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-lg border border-zinc-200 dark:border-white/10 p-4 animate-pulse">
                     <div className="flex justify-between mb-2">
                       <div className="h-4 w-32 bg-zinc-200 dark:bg-white/10 rounded-md"></div>
                       <div className="h-4 w-16 bg-zinc-200 dark:bg-white/10 rounded-full"></div>
                     </div>
                     <div className="h-4 w-full bg-zinc-200 dark:bg-white/10 rounded-md mb-2"></div>
                     <div className="h-4 w-2/3 bg-zinc-200 dark:bg-white/10 rounded-md"></div>
                  </div>
                ))
             ) : data.mentions.length === 0 ? (
                <div className="text-center py-10 text-zinc-600 dark:text-zinc-500">No recent mentions found.</div>
             ) : (
               data.mentions.map((mention, index) => (
                <div key={index} className="rounded-lg border border-zinc-200 dark:border-white/10 p-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-sm">{mention.source}</span>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      mention.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      mention.sentiment === 'negative' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                      'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300'
                    }`}>
                      {mention.sentiment.charAt(0).toUpperCase() + mention.sentiment.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">"{mention.text}"</p>
                </div>
               ))
             )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
