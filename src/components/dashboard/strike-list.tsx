import React from 'react';
import { Target, ArrowRight, Building2, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export interface StrikeTarget {
  id: string;
  companyName: string;
  sector: string;
  triggerIncident: string;
  timeAgo: string;
}

interface StrikeListProps {
  targets: StrikeTarget[];
}

export function StrikeList({ targets }: StrikeListProps) {
  const router = useRouter();

  if (!targets || targets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-zinc-500 border border-dashed border-zinc-200 dark:border-white/10 rounded-2xl">
        <Target className="h-8 w-8 mb-2 opacity-50" />
        <p>No high-priority targets currently identified.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {targets.map((target) => (
        <div 
          key={target.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-[#1A1525] border border-zinc-100 dark:border-white/5 hover:border-violet-500/30 transition-colors group"
        >
          <div className="flex items-start gap-4">
            <div className="mt-1 h-8 w-8 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0">
              <Building2 className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                {target.companyName}
                <span className="px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-white/10 text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-300">
                  {target.sector}
                </span>
              </h4>
              <p className="text-[13px] text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5">
                <ShieldAlert className="h-3 w-3 text-red-500" />
                Trigger: {target.triggerIncident}
              </p>
            </div>
          </div>
          
          <Button 
            onClick={() => router.push(`/lead-scoring?target=${encodeURIComponent(target.companyName)}`)}
            className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition-all group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          >
            Generate Dossier <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
