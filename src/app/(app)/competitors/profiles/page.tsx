"use client";

import { useEffect, useState } from "react";
import { CompetitorCard } from "@/components/domain/competitor-card";
import { FilterBar } from "@/components/data/filter-bar";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Activity } from "lucide-react";

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCompetitors = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/agent/competitors");
      const data = await res.json();
      if (data.competitors) {
        setCompetitors(data.competitors);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitors();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader 
          title="Competitor Profiles" 
          description="Live AI tracking of key rivals in the European process safety market."
        />
        <div className="flex gap-3">
          <Button 
            onClick={fetchCompetitors} 
            disabled={isLoading}
            className="bg-violet-600 hover:bg-violet-700 text-white transition-all"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> 
            {isLoading ? "Generating Profiles..." : "Refresh Intelligence"}
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Competitor
          </Button>
        </div>
      </div>
      
      <FilterBar 
        searchPlaceholder="Search competitors by name, sector or location..."
        filters={[
          {
            id: "threat",
            type: "select",
            label: "Threat Level",
            options: [
              { label: "Critical", value: "critical" },
              { label: "High", value: "high" },
              { label: "Medium", value: "medium" },
              { label: "Low", value: "low" }
            ]
          },
          {
            id: "sector",
            type: "select",
            label: "Sector",
            options: [
              { label: "Oil & Gas", value: "oil-and-gas" },
              { label: "Chemicals", value: "chemicals" },
              { label: "Renewables", value: "renewables" },
              { label: "General", value: "general" }
            ]
          }
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 rounded-xl bg-zinc-100 dark:bg-[#1A1525] border border-zinc-200 dark:border-white/5 animate-pulse relative overflow-hidden">
               <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent"></div>
               <div className="p-6">
                 <div className="flex justify-between mb-4">
                   <div className="h-6 w-1/2 bg-zinc-200 dark:bg-white/10 rounded-md"></div>
                   <div className="h-6 w-16 bg-zinc-200 dark:bg-white/10 rounded-full"></div>
                 </div>
                 <div className="space-y-2 mb-6">
                   <div className="h-4 w-1/3 bg-zinc-200 dark:bg-white/10 rounded-md"></div>
                   <div className="h-4 w-1/4 bg-zinc-200 dark:bg-white/10 rounded-md"></div>
                 </div>
                 <div className="space-y-2">
                   <div className="h-3 w-full bg-zinc-200 dark:bg-white/10 rounded-full"></div>
                   <div className="h-3 w-full bg-zinc-200 dark:bg-white/10 rounded-full"></div>
                   <div className="h-3 w-2/3 bg-zinc-200 dark:bg-white/10 rounded-full"></div>
                 </div>
               </div>
            </div>
          ))
        ) : (
          competitors.map(competitor => (
            <CompetitorCard key={competitor.id} competitor={competitor} />
          ))
        )}
      </div>
    </div>
  );
}
