"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Search, Target, Zap, CheckCircle2, ShieldAlert, AlertTriangle, Briefcase, Lightbulb, Clock, Activity, Building2, X } from "lucide-react";
import { LeadScoreProfile, IncidentIntelligence } from "@/types/domain";

export function LeadScoringMatrix() {
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<LeadScoreProfile | null>(null);
  const [liveIncidents, setLiveIncidents] = useState<IncidentIntelligence[]>([]);

  useEffect(() => {
    fetchLiveIncidents();
  }, []);

  const fetchLiveIncidents = async () => {
    try {
      const res = await fetch('/api/agent/live-incidents');
      const data = await res.json();
      if (data.incidents) {
        setLiveIncidents(data.incidents);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAnalyze = async (overrideCompanyName?: string) => {
    const targetCompany = overrideCompanyName || companyName;
    if (!targetCompany.trim()) return;
    
    setCompanyName(targetCompany);
    setIsLoading(true);
    setProfile(null); // Clear existing report before fetching
    try {
      const res = await fetch('/api/agent/lead-scoring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName: targetCompany }),
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

  const clearReport = () => {
    setProfile(null);
    setCompanyName("");
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Search Engine */}
      <Card className="border-0 shadow-lg bg-white overflow-hidden ring-1 ring-zinc-200">
        <div className="bg-gradient-to-r from-emerald-900 to-teal-800 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Target className="w-32 h-32" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Client Acquisition Intelligence</h3>
          <p className="text-emerald-100 max-w-2xl mx-auto relative z-10">Enter a target client to instantly aggregate HSE records, uncover near-miss incidents, and generate a customized Empirisys pitch strategy.</p>
        </div>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-3 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <input 
                type="text"
                placeholder="Enter company name to analyze (e.g. BP, Shell)..."
                className="w-full pl-12 pr-12 py-4 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg shadow-sm transition-shadow"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              />
              {companyName && (
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100 transition-colors"
                  onClick={clearReport}
                  title="Clear Search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <Button 
              size="lg" 
              className="py-4 px-8 h-auto rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-md transition-all hover:shadow-lg w-full md:w-auto"
              onClick={() => handleAnalyze()}
              disabled={isLoading || !companyName.trim()}
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Zap className="mr-2 h-5 w-5 fill-white" />}
              Analyze Client
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center mt-6 gap-3 text-sm text-zinc-500">
            <span className="font-semibold uppercase tracking-wider text-xs">Try Samples:</span>
            {["BP", "Shell", "Balfour Beatty"].map((sample) => (
              <Badge 
                key={sample} 
                variant="secondary" 
                className="cursor-pointer hover:bg-zinc-200 transition-colors py-1 px-3 text-sm font-medium"
                onClick={() => handleAnalyze(sample)}
              >
                {sample}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="animate-pulse space-y-6">
          <div className="h-24 bg-zinc-100 rounded-2xl w-full"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="h-[500px] bg-zinc-100 rounded-2xl w-full lg:col-span-2"></div>
            <div className="h-[500px] bg-zinc-100 rounded-2xl w-full"></div>
          </div>
        </div>
      )}

      {/* Live Incident Feed (Empty State) */}
      {!profile && !isLoading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-3 border-b border-zinc-200 pb-4">
            <Activity className="h-6 w-6 text-red-500 animate-pulse" />
            <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">Live Near-Miss Feed</h3>
            <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 border-red-200">Automatically Updating</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveIncidents.map((incident) => {
              const hoursAgo = Math.floor((Date.now() - new Date(incident.dateTime).getTime()) / (1000 * 60 * 60));
              const timeString = hoursAgo < 24 ? `${Math.max(1, hoursAgo)} hours ago` : `${Math.floor(hoursAgo / 24)} days ago`;
              const baseCompany = incident.clientDetails.split('-')[0].trim();

              return (
                <Card key={incident.id} className="border-zinc-200 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden flex flex-col bg-white">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-400"></div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <div>
                        <h4 className="font-black text-zinc-900 text-xl flex items-center gap-2 tracking-tight">
                          <Building2 className="h-5 w-5 text-zinc-400" />
                          {baseCompany}
                        </h4>
                        <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">{timeString}</span>
                      </div>
                      <Badge className="bg-red-50 text-red-700 border-red-200 shadow-sm text-xs font-bold text-center leading-tight py-1">{incident.incidentType}</Badge>
                    </div>
                    <p className="text-zinc-600 mb-5 line-clamp-3 flex-1 text-[15px] leading-relaxed font-medium">
                      {incident.incidentDescription}
                    </p>
                    <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100 mb-5 flex items-center gap-3">
                       <Briefcase className="h-5 w-5 text-zinc-400 shrink-0" />
                       <div>
                         <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-black block mb-0.5">Incumbent Consultant</span>
                         <span className="text-sm font-bold text-zinc-800">{incident.consultantHired}</span>
                       </div>
                    </div>
                    <Button 
                      className="w-full bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold shadow-sm transition-all text-sm py-5"
                      onClick={() => handleAnalyze(baseCompany)}
                    >
                      <Zap className="h-4 w-4 mr-2" /> Analyse Client Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
            
            {liveIncidents.length === 0 && (
              <div className="col-span-2 text-center py-12 text-zinc-500 font-medium">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-zinc-300" />
                Listening for incoming intelligence signals...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Comprehensive Analytical Report */}
      {profile && !isLoading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm gap-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <Building2 className="h-8 w-8 text-zinc-600" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-zinc-900 tracking-tight leading-tight">
                  {profile.companyName}
                </h3>
                <p className="text-zinc-500 font-semibold mt-1 uppercase tracking-wider text-sm">{profile.industry} &bull; Target Lead</p>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex flex-col items-end bg-zinc-50 p-4 rounded-xl border border-zinc-100 flex-1 md:flex-none">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Empirisys Score</span>
                <Badge className={`text-2xl py-1.5 px-6 shadow-sm border-2 ${profile.overallScore < 70 ? 'bg-orange-50 text-orange-800 border-orange-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'}`}>
                  {profile.overallScore} <span className="text-lg opacity-50 ml-1 font-medium">/ 100</span>
                </Badge>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-full px-4 rounded-xl border-zinc-200 text-zinc-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors"
                onClick={clearReport}
                title="Close Report & Return to Feed"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>
          
          {/* Detailed Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Column 1: Incident Dossier (Takes up 2 columns on lg) */}
            <div className="lg:col-span-2 space-y-6">
              
              {profile.incident && (
                <Card className="border-zinc-200 shadow-md overflow-hidden bg-white relative">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                    <ShieldAlert className="h-64 w-64 text-zinc-900" />
                  </div>
                  <div className="bg-red-50/50 border-b border-red-100 p-5 md:p-6 flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-xl shadow-sm">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-red-950 tracking-tight">Critical Incident Intelligence</h4>
                      <p className="text-sm text-red-700 font-medium mt-0.5">Classified Near-Miss Reconnaissance</p>
                    </div>
                  </div>
                  <CardContent className="p-6 md:p-8 space-y-8 relative z-10">
                    
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                      <div className="flex-1 space-y-6 w-full">
                        <div>
                          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Official Designation</h5>
                          <p className="text-2xl font-bold text-zinc-900 leading-snug">{profile.incident.incidentType}</p>
                        </div>
                        
                        <div className="bg-red-50/30 p-5 md:p-6 rounded-2xl border border-red-100">
                          <h5 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3">Detailed Narrative</h5>
                          <p className="text-zinc-800 leading-relaxed font-medium text-[15px]">{profile.incident.incidentDescription}</p>
                        </div>
                      </div>

                      <div className="w-full lg:w-72 space-y-4 shrink-0">
                        <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 shadow-sm">
                          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-2">Time of Event</span>
                          <div className="flex items-center text-sm font-semibold text-zinc-800 bg-white p-3 rounded-lg border border-zinc-200 shadow-sm">
                            <Clock className="h-4 w-4 mr-3 text-zinc-400" />
                            {new Date(profile.incident.dateTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                          </div>
                        </div>
                        <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 shadow-sm">
                          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-2">Operating Scenario</span>
                          <div className="flex items-center text-sm font-semibold text-zinc-800 bg-white p-3 rounded-lg border border-zinc-200 shadow-sm">
                            <Activity className="h-4 w-4 mr-3 text-zinc-400 shrink-0" />
                            <span className="line-clamp-2">{profile.incident.scenario}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-white border border-orange-100 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-400"></div>
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-orange-100 rounded-lg shrink-0">
                          <ShieldAlert className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-2">Regulatory & Enforcement Action</h5>
                          <p className="text-zinc-800 font-semibold text-[15px] leading-snug">{profile.incident.regulatoryNotice}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

            </div>

            {/* Column 2: Empirisys Strategy Board */}
            <div className="space-y-6">
              
              <Card className="border-emerald-100 shadow-lg bg-gradient-to-b from-emerald-50/80 to-white overflow-hidden ring-1 ring-emerald-200/50">
                <CardHeader className="pb-5 border-b border-emerald-100/50 bg-white/50 backdrop-blur-sm p-6">
                  <CardTitle className="text-emerald-950 flex items-center gap-3 text-xl font-black tracking-tight">
                    <Target className="h-6 w-6 text-emerald-600" />
                    Empirisys Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                  
                  {/* Recommended Product */}
                  <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-md relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-[0.04]">
                      <Zap className="h-32 w-32" />
                    </div>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Target Solution fit</span>
                    <div className="text-4xl font-black text-emerald-800 mt-2 tracking-tight">{profile.recommendedProduct}</div>
                    <p className="text-sm text-zinc-600 mt-4 leading-relaxed font-medium">{profile.rationale}</p>
                  </div>

                  {/* Competitor Intel */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                      <Briefcase className="h-4 w-4" /> Incumbent Consultant
                    </span>
                    <div className="bg-zinc-50 px-5 py-4 rounded-xl border border-zinc-200 shadow-sm">
                      <p className="font-bold text-zinc-800 text-lg">{profile.incident?.consultantHired || "Unknown"}</p>
                    </div>
                  </div>

                  {/* The Pitch */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" /> Recommended Pitch Angle
                    </span>
                    <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl shadow-inner">
                      <p className="text-[15px] text-amber-950 font-bold leading-relaxed">
                        "{profile.incident?.pitchApproach}"
                      </p>
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Risk Factors List */}
              <Card className="shadow-md border-zinc-200 bg-white overflow-hidden">
                <CardHeader className="pb-4 border-b border-zinc-100 bg-zinc-50/50 p-6">
                  <CardTitle className="text-sm font-bold text-zinc-800 uppercase tracking-widest">Identified Risk Factors</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {profile.keyRiskFactors.map((factor, i) => (
                      <li key={i} className="flex items-start gap-3 text-[15px] text-zinc-700 font-semibold leading-snug">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
