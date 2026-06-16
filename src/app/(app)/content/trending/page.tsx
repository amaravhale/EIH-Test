"use client";

import React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Activity } from "lucide-react";

export default function TrendingTopicsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Trending Topics"
        description="Real-time analysis of what your target audience is discussing."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Rising Topics
            </CardTitle>
            <CardDescription>Topics gaining rapid traction in the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-zinc-900 text-sm">Hydrogen Storage Safety</p>
                  <p className="text-xs text-zinc-500">Mentions up 240%</p>
                </div>
                <div className="text-emerald-600 font-bold text-sm">Hot</div>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-zinc-900 text-sm">Predictive Maintenance AI</p>
                  <p className="text-xs text-zinc-500">Mentions up 120%</p>
                </div>
                <div className="text-emerald-600 font-bold text-sm">Warm</div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-amber-500" />
              Sustained Discussions
            </CardTitle>
            <CardDescription>Evergreen topics maintaining high engagement.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-zinc-900 text-sm">Offshore Wind Farm Logistics</p>
                  <p className="text-xs text-zinc-500">Consistent high volume</p>
                </div>
                <div className="text-amber-600 font-bold text-sm">Stable</div>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-zinc-900 text-sm">Safety Culture Transformation</p>
                  <p className="text-xs text-zinc-500">Consistent high volume</p>
                </div>
                <div className="text-amber-600 font-bold text-sm">Stable</div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
