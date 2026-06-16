"use client";

import React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function SentimentAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Sentiment Analysis"
        description="Public perception and brand sentiment tracking."
        action={
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Overall Sentiment Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">72%</div>
            <p className="text-xs text-zinc-500 mt-1">Positive mentions across all channels</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Negative Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">3</div>
            <p className="text-xs text-zinc-500 mt-1">Requires immediate PR review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Mentions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,402</div>
            <p className="text-xs text-zinc-500 mt-1">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Mentions</CardTitle>
          <CardDescription>Latest articles and social posts categorized by sentiment.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border border-zinc-200 p-4">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-sm">Industry Weekly</span>
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">Positive</span>
              </div>
              <p className="text-sm text-zinc-600">"Empirisys' new predictive models show a 40% reduction in safety incidents during pilot phases."</p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-4">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-sm">Offshore Tech Forum</span>
                <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800">Neutral</span>
              </div>
              <p className="text-sm text-zinc-600">"Discussion on the integration timelines for the new Empirisys modules with existing ERP systems."</p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-4">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-sm">Safety Watch Blog</span>
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">Negative</span>
              </div>
              <p className="text-sm text-zinc-600">"Concerns raised about data privacy and employee tracking in AI-driven safety software."</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
