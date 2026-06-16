"use client";

import React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const MOCK_DATA = [
  { month: "Jan", "Offshore Wind": 40, "Hydrogen": 24, "Process Safety": 24 },
  { month: "Feb", "Offshore Wind": 30, "Hydrogen": 13, "Process Safety": 22 },
  { month: "Mar", "Offshore Wind": 20, "Hydrogen": 58, "Process Safety": 29 },
  { month: "Apr", "Offshore Wind": 27, "Hydrogen": 39, "Process Safety": 20 },
  { month: "May", "Offshore Wind": 18, "Hydrogen": 48, "Process Safety": 21 },
  { month: "Jun", "Offshore Wind": 23, "Hydrogen": 38, "Process Safety": 25 },
  { month: "Jul", "Offshore Wind": 34, "Hydrogen": 43, "Process Safety": 21 },
];

export default function MarketAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Market Analytics"
        description="High-level market trends and macro indicators for target sectors."
        actions={
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Addressable Market</CardTitle>
            <CardDescription>Estimated for current year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">£4.2B</div>
            <p className="text-xs text-emerald-600 mt-1">↑ 12% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Tenders</CardTitle>
            <CardDescription>Currently open opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">142</div>
            <p className="text-xs text-zinc-500 mt-1">Across 8 sectors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Regulatory Shifts</CardTitle>
            <CardDescription>Major policy changes detected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">8</div>
            <p className="text-xs text-zinc-500 mt-1">In the last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sector Investment Volume</CardTitle>
          <CardDescription>Capital allocation across key energy sectors over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHydrogen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `£${value}M`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', boxShadow: 'none' }}
                />
                <Area type="monotone" dataKey="Offshore Wind" stroke="#3b82f6" fillOpacity={1} fill="url(#colorWind)" />
                <Area type="monotone" dataKey="Hydrogen" stroke="#10b981" fillOpacity={1} fill="url(#colorHydrogen)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
