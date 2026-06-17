"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Target, Activity, Zap, CheckCircle2, ShieldAlert } from "lucide-react";
import { LeadScoreProfile } from "@/types/domain";

export function LeadScoringMatrix() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<LeadScoreProfile | null>(null);

  const analyzeLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/agent/lead-scoring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName: query }),
      });
      const data = await res.json();
      if (data.profile) {
        setProfile(data.profile);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleLeads = ["BP", "Shell", "Balfour Beatty"];

  return (
    <div className="space-y-6">
      {/* Search Bar & Actions */}
      <Card className="border-border shadow-sm">
        <CardContent className="p-6">
          <form onSubmit={analyzeLead} className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Enter company name to analyze (e.g. BP, Shell)..."
                className="w-full pl-10 pr-4 py-3 bg-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={isLoading || !query} className="bg-teal hover:bg-teal-bright text-white min-w-[150px] py-6">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Zap className="mr-2 h-5 w-5" />}
              Analyze Lead
            </Button>
          </form>
          
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Try Samples:</span>
            {sampleLeads.map(lead => (
              <Badge 
                key={lead} 
                variant="outline" 
                className="cursor-pointer hover:bg-base text-xs"
                onClick={() => { setQuery(lead); setProfile(null); }}
              >
                {lead}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {isLoading ? (
        <Card className="border-dashed border-2 bg-base/50">
          <CardContent className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-teal" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-text-primary">Generating HSE Profile...</h3>
              <p className="text-sm text-text-muted mt-1">Cross-referencing safety records, market signals, and industry trends.</p>
            </div>
          </CardContent>
        </Card>
      ) : profile ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Score Card */}
          <Card className="md:col-span-1 shadow-md border-teal/20 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal to-teal-bright"></div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="secondary" className="mb-2 bg-teal-light text-teal">{profile.industry}</Badge>
                  <CardTitle className="text-2xl font-bold">{profile.companyName}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-4 flex flex-col items-center justify-center p-6 bg-base rounded-xl border border-border">
                <div className="text-5xl font-black text-text-primary mb-2">
                  {profile.overallScore}
                  <span className="text-2xl text-text-muted">/100</span>
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-text-muted">Lead Score</div>
                
                <div className="w-full mt-6 space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-text-secondary">AI Confidence</span>
                    <span className="text-teal">{profile.confidenceLevel}%</span>
                  </div>
                  <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                    <div className="bg-teal h-full rounded-full" style={{ width: `${profile.confidenceLevel}%` }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis & Recommendation */}
          <Card className="md:col-span-2 shadow-sm border-border">
            <CardHeader className="border-b border-border bg-base/30 pb-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Strategic Recommendation</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              {/* Product Match */}
              <div>
                <h4 className="text-sm font-bold text-text-primary uppercase tracking-wide mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Recommended Product Fit
                </h4>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-50/50 border border-emerald-100">
                  <Badge className="bg-emerald-500 text-white text-sm px-3 py-1">
                    {profile.recommendedProduct}
                  </Badge>
                  <p className="text-sm text-text-secondary">
                    {profile.rationale}
                  </p>
                </div>
              </div>

              {/* Identified Risks */}
              <div>
                <h4 className="text-sm font-bold text-text-primary uppercase tracking-wide mb-3 flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-amber-500" /> Key Safety & Cultural Blind Spots
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {profile.keyRiskFactors.map((risk, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-base p-3 rounded-md border border-border">
                      <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></div>
                      <span className="text-sm text-text-secondary leading-snug">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
