"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, CheckCircle2, XCircle, ArrowUpRight, ArrowRight, FileText } from "lucide-react";

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
    // In production, this would call an API to update the status and trigger the feedback loop.
    setThemes(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: action === 'approve' ? 'approved' : 'rejected' };
      }
      return t;
    }));
  };

  const pendingThemes = themes.filter(t => t.status === 'pending_validation');
  const approvedThemes = themes.filter(t => t.status === 'approved');

  // Derive top actions from approved themes
  const topActions = approvedThemes.slice(0, 3);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Market Intelligence</h2>
          <p className="text-zinc-500 mt-1">
            Delta reporting and emergent themes mapped to strategic targets.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="bg-white shadow-sm" onClick={fetchMarketData} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Run Pipeline
          </Button>
        </div>
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
          {/* Top Actions Panel */}
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
            
            {/* Theme Delta Matrix (Main View) */}
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
                          
                          <div className="pt-2">
                            <button className="text-xs font-semibold text-primary flex items-center hover:underline">
                              Explore {theme.signals?.length || 0} Underlying Signals <ArrowRight className="h-3 w-3 ml-1" />
                            </button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </section>

            {/* Human-in-the-Loop Validation Queue */}
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
                          <Button 
                            size="sm" 
                            variant="default" 
                            className="flex-1 bg-primary text-white"
                            onClick={() => handleValidation(theme.id, 'approve')}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1.5" /> Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleValidation(theme.id, 'reject')}
                          >
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
    </div>
  );
}
