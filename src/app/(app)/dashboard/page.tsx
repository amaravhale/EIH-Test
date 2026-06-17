"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, RefreshCw, CheckCircle2, XCircle, ArrowUpRight, ArrowRight, FileText, Activity, Shield, Zap, Target } from "lucide-react";
import { LeadScoringMatrix } from "./_components/lead-scoring-matrix";

export default function DashboardPage() {
  const [themes, setThemes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Intelligence Hub</h2>
          <p className="text-zinc-500 mt-1">
            Central command for market themes and Client Acquisition Intelligence (CAI).
          </p>
        </div>
      </div>

      <Tabs defaultValue="market" className="w-full">
        <TabsList className="mb-8 flex w-full max-w-2xl bg-zinc-100/70 p-1.5 rounded-2xl border border-zinc-200/60 shadow-inner h-auto">
          <TabsTrigger 
            value="market" 
            className="flex-1 rounded-xl py-3 text-sm font-semibold text-zinc-500 transition-all data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm hover:text-teal-600"
          >
            <Activity className="h-4 w-4 mr-2 inline-block" />
            Market Intelligence
          </TabsTrigger>
          <TabsTrigger 
            value="lead-scoring" 
            className="flex-1 rounded-xl py-3 text-sm font-semibold text-zinc-500 transition-all data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm hover:text-emerald-600"
          >
            <Target className="h-4 w-4 mr-2 inline-block" />
            Client Acquisition Intelligence
          </TabsTrigger>
        </TabsList>

        <TabsContent value="market" className="space-y-6 animate-in fade-in-50 duration-500">
          <div className="flex items-center justify-end">
            <Button variant="outline" className="bg-white shadow-sm" onClick={fetchMarketData} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              Run Pipeline
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm font-medium text-zinc-500">Ingesting Tier A & B sources and extracting events...</p>
              </div>
            </div>
          ) : (
            <>
              <section>
                <h3 className="text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                  <ArrowUpRight className="h-5 w-5 text-emerald-600" />
                  Action-Required Items
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {topActions.map((theme, i) => (
                    <Card key={`action-${i}`} className="border-emerald-100 bg-emerald-50/30 shadow-sm hover:shadow-md transition-all">
                      <CardContent className="p-5">
                        <Badge variant="outline" className="mb-3 bg-emerald-100 text-emerald-800 border-emerald-200">
                          {theme.interpretation.relevantProduct}
                        </Badge>
                        <p className="text-sm font-medium text-zinc-900 mb-4 leading-relaxed">
                          {theme.interpretation.suggestedAction}
                        </p>
                        <button className="text-xs font-semibold text-emerald-700 flex items-center hover:text-emerald-800">
                          <FileText className="h-3 w-3 mr-1" /> View Evidence Chain
                        </button>
                      </CardContent>
                    </Card>
                  ))}
                  {topActions.length === 0 && (
                    <div className="col-span-3 text-center py-8 text-zinc-500 text-sm border border-dashed rounded-lg">
                      No immediate actions required. Approve themes to generate actions.
                    </div>
                  )}
                </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <section className="lg:col-span-2 space-y-6">
                  <h3 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Active Theme Matrix
                  </h3>
                  <div className="space-y-4">
                    {approvedThemes.length === 0 ? (
                      <div className="text-center py-12 text-zinc-500 text-sm border border-dashed rounded-lg bg-zinc-50/50">
                        No approved themes this week. Check the validation queue.
                      </div>
                    ) : (
                      approvedThemes.map((theme) => (
                        <Card key={theme.id} className="shadow-sm border-zinc-200 overflow-hidden">
                          <div className="border-l-4 border-primary">
                            <CardHeader className="pb-2 bg-zinc-50/50">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="secondary" className={
                                      theme.deltaStatus === 'intensified' ? 'bg-orange-100 text-orange-800' :
                                      theme.deltaStatus === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-zinc-100 text-zinc-800'
                                    }>
                                      {theme.deltaStatus.toUpperCase()}
                                    </Badge>
                                  </div>
                                  <CardTitle className="text-lg text-zinc-900">{theme.title}</CardTitle>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-4">
                              <p className="text-sm text-zinc-600">{theme.description}</p>
                              <div className="bg-primary/5 border border-primary/10 rounded-md p-4">
                                <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Strategic Interpretation</h4>
                                <p className="text-sm text-zinc-800 mb-3">{theme.interpretation.impact}</p>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className="bg-white border-zinc-200 text-zinc-600 font-medium">
                                    Recommended Module: <span className="ml-1 text-zinc-900">{theme.interpretation.relevantProduct}</span>
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                </section>

                <section className="lg:col-span-1">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-orange-500" />
                    Pending Review
                  </h3>
                  <div className="space-y-4">
                    {pendingThemes.length === 0 ? (
                      <div className="text-center py-8 text-zinc-500 text-sm border border-dashed rounded-lg">
                        Validation queue is empty.
                      </div>
                    ) : (
                      pendingThemes.map((theme) => (
                        <Card key={theme.id} className="border-orange-200 shadow-sm bg-orange-50/30">
                          <CardHeader className="pb-3 p-4">
                            <Badge className="w-fit bg-orange-100 text-orange-800 hover:bg-orange-100 border-0 mb-2">Needs Validation</Badge>
                            <CardTitle className="text-base text-zinc-900 leading-tight">{theme.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-xs text-zinc-600 mb-4 line-clamp-3">{theme.description}</p>
                            <div className="flex items-center gap-2">
                              <Button size="sm" className="flex-1 bg-primary text-white" onClick={() => handleValidation(theme.id, 'approve')}>
                                <CheckCircle2 className="h-4 w-4 mr-1.5" /> Approve
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleValidation(theme.id, 'reject')}>
                                <XCircle className="h-4 w-4 mr-1.5" /> Reject
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </section>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="lead-scoring" className="animate-in fade-in-50 duration-500">
          <LeadScoringMatrix />
        </TabsContent>
      </Tabs>
    </div>
  );
}
