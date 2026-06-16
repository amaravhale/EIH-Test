"use client";

import React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FilterBar } from "@/components/data/filter-bar";
import { ShieldAlert, Activity, ArrowRight } from "lucide-react";

export default function ThreatsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Threat Monitor"
        description="Active tracking of high-priority competitor moves and regulatory risks."
      />

      <FilterBar
        filters={[
          { id: "status", label: "Status", options: [{ id: "critical", label: "Critical" }, { id: "high", label: "High" }] }
        ]}
        onSearch={() => {}}
        onFilterChange={() => {}}
        onSortChange={() => {}}
      />

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2 text-lg">
              <ShieldAlert className="h-5 w-5" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-red-700 dark:text-red-400">2</div>
            <p className="text-sm text-red-600/80 mt-2">Require immediate action plan</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Active Threats</CardTitle>
            <CardDescription>Prioritized list of strategic risks identified by the AI.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start justify-between rounded-lg border border-zinc-200 p-4">
                <div className="flex gap-4">
                  <div className="mt-1">
                    <Activity className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-zinc-900">ERM launches competing safety AI module</h4>
                      <Badge variant="destructive">Critical</Badge>
                    </div>
                    <p className="text-sm text-zinc-600 mt-1">
                      Press release indicates a direct competitor to the upcoming Empirisys predictive module. Features overlap by 80%.
                    </p>
                    <div className="flex gap-4 mt-3 text-xs text-zinc-500 font-medium">
                      <span>Detected: 2 hours ago</span>
                      <span>Source: PR Newswire</span>
                      <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        View analysis <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between rounded-lg border border-zinc-200 p-4">
                <div className="flex gap-4">
                  <div className="mt-1">
                    <ShieldAlert className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-zinc-900">New EU Data Privacy Regulation Draft</h4>
                      <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">High</Badge>
                    </div>
                    <p className="text-sm text-zinc-600 mt-1">
                      Draft regulation may impact how employee safety data is stored and processed across European regions.
                    </p>
                    <div className="flex gap-4 mt-3 text-xs text-zinc-500 font-medium">
                      <span>Detected: 1 day ago</span>
                      <span>Source: EU Parliament Docs</span>
                      <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        View compliance check <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
