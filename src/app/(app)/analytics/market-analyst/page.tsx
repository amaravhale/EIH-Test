"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Zap, Copy, CheckCircle2 } from "lucide-react";
import { toast } from "@/components/ui/toaster";

export default function MarketAnalystPage() {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsLoading(true);
    setAnalysisResult(null);
    setHasCopied(false);
    
    try {
      const res = await fetch("/api/agent/market-analyst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to generate analysis");
      }
      
      const data = await res.json();
      setAnalysisResult(data.analysis);
      toast({
        title: "Analysis Complete",
        description: "Your market analysis has been successfully generated.",
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "There was an error generating the analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (analysisResult) {
      navigator.clipboard.writeText(analysisResult);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
      toast({
        title: "Copied to clipboard",
        description: "Analysis has been copied to your clipboard.",
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <PageHeader
        title="Market Analyst"
        description="Generate strategic market analysis and campaigns using the prepared agent."
      />

      <Card className="bg-white dark:bg-[#241E32] border-zinc-100 dark:border-white/5">
        <CardHeader>
          <CardTitle>Analysis Parameters</CardTitle>
          <CardDescription>Enter the topic, product, or campaign objective.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <textarea
              className="w-full h-32 p-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#1A1525] text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none transition-all"
              placeholder="e.g., 'Analyze the current market positioning for sustainable offshore wind technologies in the North Sea region...'"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading}
            />
            <div className="flex justify-end">
              <Button 
                onClick={handleGenerate} 
                disabled={isLoading || !topic.trim()}
                className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-90 text-white shadow-lg transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Analysis...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4 fill-white" />
                    Generate Report
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Container */}
      {(isLoading || analysisResult) && (
        <Card className="bg-white dark:bg-[#241E32] border-zinc-100 dark:border-white/5 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="flex flex-row items-center justify-between bg-zinc-50 dark:bg-[#1A1525] border-b border-zinc-100 dark:border-white/5">
            <div>
              <CardTitle>Generated Intelligence</CardTitle>
              <CardDescription>AI-synthesized market analysis</CardDescription>
            </div>
            {analysisResult && (
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                {hasCopied ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                {hasCopied ? "Copied" : "Copy"}
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-10 space-y-4">
                <div className="h-4 bg-zinc-200 dark:bg-white/5 rounded-md animate-pulse w-3/4"></div>
                <div className="h-4 bg-zinc-200 dark:bg-white/5 rounded-md animate-pulse w-full"></div>
                <div className="h-4 bg-zinc-200 dark:bg-white/5 rounded-md animate-pulse w-5/6"></div>
                <div className="h-4 bg-zinc-200 dark:bg-white/5 rounded-md animate-pulse w-2/3 mt-8"></div>
                <div className="h-4 bg-zinc-200 dark:bg-white/5 rounded-md animate-pulse w-full"></div>
                <div className="h-4 bg-zinc-200 dark:bg-white/5 rounded-md animate-pulse w-4/5"></div>
              </div>
            ) : (
              <div className="p-8 prose prose-zinc dark:prose-invert max-w-none text-sm whitespace-pre-wrap leading-relaxed">
                {analysisResult}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
