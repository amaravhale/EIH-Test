"use client";

import React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const MOCK_DATA = [
  { metric: "Share of Voice", "Empirisys": 34, "ERM": 45, "DuPont": 21 },
  { metric: "Hiring Velocity", "Empirisys": 65, "ERM": 30, "DuPont": 5 },
  { metric: "Patent Filings", "Empirisys": 12, "ERM": 54, "DuPont": 34 },
  { metric: "News Mentions", "Empirisys": 25, "ERM": 60, "DuPont": 15 },
];

export default function CompetitorAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Competitor Intelligence"
        description="Comparative metrics against key rivals in the HSE space."
        actions={
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Metric Comparison</CardTitle>
            <CardDescription>Performance across key strategic indicators.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                  <XAxis dataKey="metric" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: '#f4f4f5' }} contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', boxShadow: 'none' }} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="Empirisys" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ERM" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="DuPont" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Vulnerabilities</CardTitle>
              <CardDescription>Identified weaknesses in competitor strategies.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-zinc-900">ERM: Slow digital adoption</p>
                    <p className="text-xs text-zinc-500 mt-0.5">High reliance on manual consulting hours limits their scale in real-time predictive analytics.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-zinc-900">DuPont: Legacy software</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Customer feedback indicates frustration with outdated UI/UX in their primary reporting tool.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Moves</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-600">ERM acquired safety tech startup</span>
                  <span className="text-xs text-zinc-400">2 days ago</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-600">DuPont launched new ESG initiative</span>
                  <span className="text-xs text-zinc-400">1 week ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
