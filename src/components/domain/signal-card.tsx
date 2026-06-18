import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, MessageSquare, ThumbsUp, Activity, Zap, ShieldAlert, Cpu, Target } from "lucide-react";
import Link from "next/link";
import { IntelligenceSignal } from "@/app/api/agent/signals/route";
import { cn } from "@/lib/utils";

interface SignalCardProps {
  signal: IntelligenceSignal;
}

export function SignalCard({ signal }: SignalCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-rose-500 font-bold drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]";
    if (score >= 75) return "text-amber-500 font-bold drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]";
    if (score >= 50) return "text-cyan-500 font-bold drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]";
    return "text-zinc-500 dark:text-zinc-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-rose-500/10 border-rose-500/30";
    if (score >= 75) return "bg-amber-500/10 border-amber-500/30";
    if (score >= 50) return "bg-cyan-500/10 border-cyan-500/30";
    return "bg-zinc-100 dark:bg-zinc-800/50 border-zinc-200 dark:border-white/10";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'regulation': return <ShieldAlert className="h-3.5 w-3.5" />;
      case 'competitive': return <Target className="h-3.5 w-3.5" />;
      case 'technology': return <Cpu className="h-3.5 w-3.5" />;
      case 'industry': return <Activity className="h-3.5 w-3.5" />;
      default: return <Zap className="h-3.5 w-3.5" />;
    }
  };

  return (
    <Card className="group relative overflow-hidden bg-white dark:bg-[#1A1525] border-zinc-200 dark:border-white/5 hover:border-violet-500/50 transition-all duration-300">
      {/* Background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-cyan-500/0 group-hover:from-violet-500/5 group-hover:to-cyan-500/5 transition-all duration-500 z-0" />
      
      <CardHeader className="pb-3 relative z-10">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center flex-wrap gap-2 mb-3 text-[11px] font-medium tracking-wide uppercase text-zinc-500 dark:text-zinc-400">
              <Badge variant="outline" className={cn(
                "rounded-full px-2.5 py-0.5 border flex items-center gap-1.5",
                signal.category === 'regulation' ? "text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10" :
                signal.category === 'competitive' ? "text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10" :
                "text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/30 bg-cyan-50 dark:bg-cyan-500/10"
              )}>
                {getCategoryIcon(signal.category)}
                {signal.category}
              </Badge>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {signal.time}
              </span>
              <span className="text-zinc-300 dark:text-zinc-600">•</span>
              <span className="flex items-center gap-1 text-violet-600 dark:text-violet-400">
                <Activity className="h-3.5 w-3.5" /> {signal.source}
              </span>
            </div>
            
            <Link href={`/market/signals/${signal.id}`} className="block group/link">
              <h3 className="text-[17px] font-semibold leading-snug text-zinc-900 dark:text-zinc-100 group-hover/link:text-violet-600 dark:group-hover/link:text-violet-400 transition-colors">
                {signal.title}
              </h3>
            </Link>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <div className={cn("flex flex-col items-center justify-center p-2 rounded-xl border backdrop-blur-sm min-w-[70px]", getScoreBg(signal.score))}>
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 mb-0.5">Impact</span>
              <span className={cn("text-2xl leading-none font-black tracking-tighter", getScoreColor(signal.score))}>
                {signal.score}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4 relative z-10">
        <p className="text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-300 line-clamp-2">
          {signal.summary}
        </p>
        
        {signal.strategicTags && signal.strategicTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {signal.strategicTags.map(tag => (
              <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-semibold bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/10">
                {tag}
              </span>
            ))}
            <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-semibold bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20">
              {signal.confidence}% Confidence
            </span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-zinc-100 dark:border-white/5 relative z-10 bg-zinc-50/50 dark:bg-black/20">
        <div className="flex items-center gap-2">
          <Button 
            variant="default" 
            size="sm" 
            className="h-8 text-xs bg-violet-600 hover:bg-violet-700 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            onClick={() => {
              if (typeof window !== "undefined") {
                const { toast } = require("sonner");
                toast.success(`Signal Escalated`, {
                  description: `"${signal.title}" has been escalated to the dashboard for priority review.`
                });
              }
            }}
          >
            <Zap className="mr-1.5 h-3.5 w-3.5" /> Escalate to Dashboard
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs border-zinc-200 dark:border-white/10 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-200 dark:hover:border-cyan-500/30 transition-all"
            onClick={() => {
              if (typeof window !== "undefined") {
                const { toast } = require("sonner");
                toast.info(`Deep Scan Initiated`, {
                  description: `AI agents are currently scanning deeper context for "${signal.title}".`
                });
              }
            }}
          >
            <Target className="mr-1.5 h-3.5 w-3.5" /> Run Deep Scan
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={signal.status === "actionable" ? "default" : "secondary"} className={cn(
            "capitalize text-[10px] tracking-wider font-semibold",
            signal.status === "actionable" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30" : ""
          )}>
            {signal.status}
          </Badge>
          <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
            <a href={signal.url || `https://google.com/search?q=${encodeURIComponent(signal.title)}`} target="_blank" title="View Source">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
