"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Zap,
  Copy,
  CheckCircle2,
  XCircle,
  Shield,
  Activity,
  Network,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import { toast } from "@/components/ui/toaster";

// ─── Types matching pipeline output ───
interface MarketEvent {
  id: string;
  entityName: string;
  entityType: string;
  eventType: string;
  steepleCategory: string;
  title: string;
  summary: string;
  sourceUrl: string;
  sourceName: string;
  sourceTier: string;
  geography: string;
  sector: string;
  eventDate: string;
  relevanceScore: number;
  evidenceStrength: number;
  confirmationCount: number;
  isDuplicate: boolean;
  lifecycleStatus: string;
}

interface AggregatedTheme {
  id: string;
  title: string;
  description: string;
  events: MarketEvent[];
  interpretation: {
    impact: string;
    relevantProduct: string;
    suggestedAction: string;
    scenarioForecast: string;
    vrioAnalysis: {
      valuable: string;
      rare: string;
      inimitable: string;
      organization: string;
      competitiveImplication: string;
    };
  };
  status: string;
  deltaStatus: string;
  relevanceScore: number;
  timestamp: string;
}

interface PipelineResult {
  events: MarketEvent[];
  themes: AggregatedTheme[];
  meta: {
    totalEventsExtracted: number;
    totalThemes: number;
    generatedAt: string;
  };
}

// ─── Tier badge colors ───
const tierColors: Record<string, { bg: string; text: string; label: string }> = {
  A: { bg: "bg-emerald-500/10 border-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400", label: "Tier A · Regulatory" },
  B: { bg: "bg-blue-500/10 border-blue-500/20", text: "text-blue-600 dark:text-blue-400", label: "Tier B · Procurement" },
  C: { bg: "bg-amber-500/10 border-amber-500/20", text: "text-amber-600 dark:text-amber-400", label: "Tier C · Trade Press" },
  D: { bg: "bg-zinc-500/10 border-zinc-500/20", text: "text-zinc-500 dark:text-zinc-400", label: "Tier D · Business Press" },
};

const deltaLabels: Record<string, { color: string; icon: React.ReactNode }> = {
  new: { color: "text-emerald-500 bg-emerald-500/10", icon: <Zap className="h-3 w-3" /> },
  intensified: { color: "text-red-500 bg-red-500/10", icon: <AlertTriangle className="h-3 w-3" /> },
  faded: { color: "text-zinc-400 bg-zinc-400/10", icon: <ChevronDown className="h-3 w-3" /> },
  stable: { color: "text-blue-500 bg-blue-500/10", icon: <Activity className="h-3 w-3" /> },
};

const eventTypeLabels: Record<string, string> = {
  incident: "🔴 Incident",
  contract_award: "💰 Contract Award",
  regulatory_action: "📋 Regulatory Action",
  m_and_a: "🤝 M&A",
  leadership_change: "👤 Leadership Change",
  product_launch: "🚀 Product Launch",
  partnership: "🔗 Partnership",
  capex_announcement: "📊 Capex Announcement",
};

// ─── Component ───
export default function MarketAnalystPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PipelineResult | null>(null);
  const [activeView, setActiveView] = useState<"themes" | "events">("themes");
  const [expandedTheme, setExpandedTheme] = useState<string | null>(null);
  const [validationState, setValidationState] = useState<Record<string, string>>({});

  const handleRunPipeline = async () => {
    setIsLoading(true);
    setResult(null);
    setValidationState({});

    try {
      const res = await fetch("/api/agent/market-analyst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!res.ok) throw new Error("Pipeline failed");

      const data: PipelineResult = await res.json();
      setResult(data);
      toast({
        title: "Pipeline Complete",
        description: `Extracted ${data.meta.totalEventsExtracted} events → ${data.meta.totalThemes} themes`,
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Pipeline Error",
        description: "Failed to execute the intelligence pipeline. Check console.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidate = (themeId: string, action: "approved" | "rejected") => {
    setValidationState((prev) => ({ ...prev, [themeId]: action }));
    toast({
      title: action === "approved" ? "Theme Approved" : "Theme Rejected",
      description: `Theme has been ${action} and logged for feedback calibration.`,
    });
  };

  const pendingThemes = result?.themes.filter(
    (t) => (validationState[t.id] || t.status) === "pending_review"
  ) ?? [];
  const processedThemes = result?.themes.filter(
    (t) => (validationState[t.id] || t.status) !== "pending_review"
  ) ?? [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <PageHeader
          title="Market Analyst"
          description="Event-driven intelligence pipeline: Source Ingestion → Entity Extraction → Deterministic Scoring → Theme Aggregation → Strategic Interpretation"
        />
        <Button
          onClick={handleRunPipeline}
          disabled={isLoading}
          className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-90 text-white shadow-lg transition-all h-11 px-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running Pipeline...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4 fill-white" />
              Run Intelligence Pipeline
            </>
          )}
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#241E32] rounded-2xl p-8 border border-zinc-100 dark:border-white/5 text-center">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-violet-500/10 mb-4">
              <Network className="h-8 w-8 text-violet-500 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Executing Market Intelligence Pipeline
            </h3>
            <div className="flex items-center justify-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Source Ingestion
              </span>
              <span>→</span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: "0.3s" }} />
                Event Extraction
              </span>
              <span>→</span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" style={{ animationDelay: "0.6s" }} />
                Scoring & Filtering
              </span>
              <span>→</span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: "0.9s" }} />
                Theme Aggregation
              </span>
            </div>
            {/* Skeleton cards */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-zinc-100 dark:bg-white/5 rounded-xl animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {result && !isLoading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* KPI Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#241E32] rounded-2xl p-5 border border-zinc-100 dark:border-white/5">
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">Events Extracted</span>
              <div className="text-3xl font-bold text-zinc-900 dark:text-white mt-1">{result.meta.totalEventsExtracted}</div>
            </div>
            <div className="bg-white dark:bg-[#241E32] rounded-2xl p-5 border border-zinc-100 dark:border-white/5">
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">Themes Identified</span>
              <div className="text-3xl font-bold text-zinc-900 dark:text-white mt-1">{result.meta.totalThemes}</div>
            </div>
            <div className="bg-white dark:bg-[#241E32] rounded-2xl p-5 border border-zinc-100 dark:border-white/5">
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">Pending Review</span>
              <div className="text-3xl font-bold text-amber-500 mt-1">{pendingThemes.length}</div>
            </div>
            <div className="bg-white dark:bg-[#241E32] rounded-2xl p-5 border border-zinc-100 dark:border-white/5">
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">Pipeline Run</span>
              <div className="text-sm font-bold text-zinc-900 dark:text-white mt-2">
                {new Date(result.meta.generatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex bg-zinc-100 dark:bg-[#110D17] p-1.5 rounded-full border border-zinc-200 dark:border-white/5 w-fit">
            <button
              onClick={() => setActiveView("themes")}
              className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all duration-300 ${
                activeView === "themes"
                  ? "bg-gradient-to-r from-violet-500 to-cyan-400 text-white shadow-lg"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <Shield className="h-3.5 w-3.5 inline mr-1.5" />
              Strategic Themes ({result.themes.length})
            </button>
            <button
              onClick={() => setActiveView("events")}
              className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all duration-300 ${
                activeView === "events"
                  ? "bg-gradient-to-r from-violet-500 to-cyan-400 text-white shadow-lg"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <Activity className="h-3.5 w-3.5 inline mr-1.5" />
              Event Feed ({result.events.length})
            </button>
          </div>

          {/* ═══════════════ THEMES VIEW ═══════════════ */}
          {activeView === "themes" && (
            <div className="space-y-4">
              {/* Pending Review Section */}
              {pendingThemes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
                    <Shield className="h-4 w-4" /> Pending Analyst Review ({pendingThemes.length})
                  </h3>
                  {pendingThemes.map((theme) => (
                    <ThemeCard
                      key={theme.id}
                      theme={theme}
                      expanded={expandedTheme === theme.id}
                      onToggle={() => setExpandedTheme(expandedTheme === theme.id ? null : theme.id)}
                      onValidate={handleValidate}
                      isPending
                    />
                  ))}
                </div>
              )}

              {/* Processed Themes */}
              {processedThemes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mt-6">
                    Processed Themes ({processedThemes.length})
                  </h3>
                  {processedThemes.map((theme) => (
                    <ThemeCard
                      key={theme.id}
                      theme={theme}
                      validationOverride={validationState[theme.id]}
                      expanded={expandedTheme === theme.id}
                      onToggle={() => setExpandedTheme(expandedTheme === theme.id ? null : theme.id)}
                      onValidate={handleValidate}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══════════════ EVENTS VIEW ═══════════════ */}
          {activeView === "events" && (
            <div className="space-y-3">
              {result.events.map((event, idx) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-[#241E32] rounded-2xl p-5 border border-zinc-100 dark:border-white/5 flex gap-4 animate-in fade-in duration-300"
                  style={{ animationDelay: `${idx * 50}ms`, animationFillMode: "both" }}
                >
                  {/* Tier Badge */}
                  <div className="shrink-0">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase ${tierColors[event.sourceTier]?.bg} ${tierColors[event.sourceTier]?.text}`}>
                      {event.sourceTier}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h4 className="text-[14px] font-bold text-zinc-900 dark:text-white leading-tight">
                        {event.title}
                      </h4>
                      <span className="text-[10px] text-zinc-400 shrink-0 whitespace-nowrap">
                        {eventTypeLabels[event.eventType] || event.eventType}
                      </span>
                    </div>
                    <p className="text-[12px] text-zinc-500 dark:text-zinc-400 mb-3 line-clamp-2">
                      {event.summary}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-[11px]">
                      <span className="text-zinc-400">
                        📍 {event.geography} · {event.sector}
                      </span>
                      <span className="text-zinc-400">
                        🏢 {event.entityName}
                      </span>
                      <span className="text-zinc-400">
                        📰 {event.sourceName}
                      </span>
                      <span className="px-2 py-0.5 rounded border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 text-zinc-500 font-medium">
                        {event.steepleCategory}
                      </span>
                      <div className="flex gap-2 ml-auto">
                        <span className="px-2 py-0.5 rounded bg-violet-500/10 text-violet-500 font-bold">
                          Rel: {event.relevanceScore}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-500 font-bold">
                          Evd: {event.evidenceStrength}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!result && !isLoading && (
        <div className="bg-white dark:bg-[#241E32] rounded-3xl p-16 border border-zinc-100 dark:border-white/5 text-center">
          <div className="inline-flex items-center justify-center p-5 rounded-full bg-gradient-to-br from-violet-500/10 to-cyan-500/10 mb-5">
            <Network className="h-10 w-10 text-violet-500" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
            Market Intelligence Pipeline
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-8">
            Run the pipeline to extract structured events from tiered sources, apply deterministic scoring, 
            aggregate into strategic themes, and generate actionable intelligence.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-[11px] text-zinc-400">
            {["Tier A: Regulatory", "Tier B: Procurement", "Tier C: Trade Press", "Tier D: Business Press"].map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Theme Card Component ───
function ThemeCard({
  theme,
  expanded,
  onToggle,
  onValidate,
  isPending,
  validationOverride,
}: {
  theme: AggregatedTheme;
  expanded: boolean;
  onToggle: () => void;
  onValidate: (id: string, action: "approved" | "rejected") => void;
  isPending?: boolean;
  validationOverride?: string;
}) {
  const delta = deltaLabels[theme.deltaStatus] || deltaLabels.stable;
  const status = validationOverride || theme.status;

  return (
    <div
      className={`bg-white dark:bg-[#241E32] rounded-2xl border transition-all duration-300 overflow-hidden ${
        isPending
          ? "border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.05)]"
          : status === "approved"
          ? "border-emerald-500/20"
          : status === "rejected"
          ? "border-red-500/20 opacity-60"
          : "border-zinc-100 dark:border-white/5"
      }`}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 flex items-start gap-4"
      >
        {/* Gradient bar */}
        <div className="w-1.5 h-12 bg-gradient-to-b from-violet-500 to-cyan-400 rounded-full shrink-0 mt-0.5" />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h4 className="text-[15px] font-bold text-zinc-900 dark:text-white leading-tight">
              {theme.title}
            </h4>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${delta.color}`}>
                {delta.icon} {theme.deltaStatus}
              </span>
              {status === "approved" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="h-3 w-3" /> Approved
                </span>
              )}
              {status === "rejected" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/10 text-red-500">
                  <XCircle className="h-3 w-3" /> Rejected
                </span>
              )}
            </div>
          </div>
          <p className="text-[13px] text-zinc-500 dark:text-zinc-400 line-clamp-2">
            {theme.description}
          </p>
          <div className="flex items-center gap-4 mt-2 text-[11px] text-zinc-400">
            <span>📊 Relevance: <strong className="text-violet-500">{theme.relevanceScore}</strong></span>
            <span>🧩 {theme.events?.length || 0} supporting events</span>
            <span>🎯 Module: <strong className="text-cyan-500">{theme.interpretation?.relevantProduct}</strong></span>
          </div>
        </div>

        <div className="shrink-0 mt-1">
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-zinc-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-zinc-400" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-zinc-100 dark:border-white/5 pt-4 animate-in fade-in duration-200">
          {/* Strategic Interpretation */}
          <div className="bg-zinc-50 dark:bg-[#1A1525] rounded-xl p-4 border border-zinc-100 dark:border-white/5">
            <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block mb-2">
              Strategic Interpretation
            </span>
            <p className="text-[13px] text-zinc-700 dark:text-zinc-300 mb-3">
              {theme.interpretation?.impact}
            </p>
            <div className="flex items-center gap-4 text-[11px] mb-3">
              <span className="text-zinc-500">
                Target: <strong className="text-violet-500">{theme.interpretation?.relevantProduct}</strong>
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div className="p-3 rounded-lg bg-white dark:bg-[#241E32] border border-zinc-100 dark:border-white/5">
                <span className="text-[10px] font-bold text-violet-500 uppercase tracking-wider block mb-1">
                  18-Month Scenario Forecast
                </span>
                <p className="text-[12px] text-zinc-700 dark:text-zinc-300">
                  {theme.interpretation?.scenarioForecast}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-[#241E32] border border-zinc-100 dark:border-white/5">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider block mb-1">
                  Suggested Action
                </span>
                <p className="text-[12px] text-zinc-700 dark:text-zinc-300">
                  {theme.interpretation?.suggestedAction}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-[#241E32] border border-zinc-100 dark:border-white/5">
              <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-wider block mb-2">
                VRIO Competitive Analysis ({theme.interpretation?.vrioAnalysis?.competitiveImplication})
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
                <div><strong className="text-zinc-900 dark:text-zinc-200">V:</strong> {theme.interpretation?.vrioAnalysis?.valuable}</div>
                <div><strong className="text-zinc-900 dark:text-zinc-200">R:</strong> {theme.interpretation?.vrioAnalysis?.rare}</div>
                <div><strong className="text-zinc-900 dark:text-zinc-200">I:</strong> {theme.interpretation?.vrioAnalysis?.inimitable}</div>
                <div><strong className="text-zinc-900 dark:text-zinc-200">O:</strong> {theme.interpretation?.vrioAnalysis?.organization}</div>
              </div>
            </div>
          </div>

          {/* Supporting Events */}
          {theme.events && theme.events.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                Evidence Chain ({theme.events.length} events)
              </span>
              <div className="space-y-2">
                {theme.events.map((evt) => (
                  <div
                    key={evt.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-[#1A1525] border border-zinc-100 dark:border-white/5"
                  >
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border mt-0.5 ${tierColors[evt.sourceTier]?.bg} ${tierColors[evt.sourceTier]?.text}`}>
                      {evt.sourceTier}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                        {evt.title}
                      </p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        {evt.sourceName} · {evt.geography} · Rel: {evt.relevanceScore}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Validation Actions (only for pending) */}
          {isPending && status === "pending_review" && (
            <div className="flex gap-3 pt-2">
              <button
                onClick={(e) => { e.stopPropagation(); onValidate(theme.id, "approved"); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
              >
                <CheckCircle2 className="h-4 w-4" /> Approve for Dashboard
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onValidate(theme.id, "rejected"); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] font-bold text-red-500 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors"
              >
                <XCircle className="h-4 w-4" /> Reject
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
