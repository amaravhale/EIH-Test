"use client";

import React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, PenTool, ArrowRight } from "lucide-react";

const IDEAS = [
  {
    title: "The Shift from Reactive to Predictive Safety in Offshore Wind",
    type: "Whitepaper",
    score: 95,
    rationale: "High search volume on 'predictive safety offshore'. Your competitor ERM hasn't published deeply on this yet.",
    tags: ["Offshore Wind", "Predictive Analytics"]
  },
  {
    title: "How to Prepare for the New EU Data Privacy Regulations in HSE",
    type: "Blog Post",
    score: 88,
    rationale: "Time-sensitive topic based on recent draft legislation. Excellent for top-of-funnel engagement.",
    tags: ["Regulation", "Data Privacy"]
  },
  {
    title: "Case Study: Reducing Incident Rates by 40% with AI",
    type: "Case Study",
    score: 82,
    rationale: "Strong social proof needed for Q3 enterprise sales cycle.",
    tags: ["Case Study", "AI"]
  }
];

export default function ContentIdeasPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Content Ideas"
        description="AI-generated content concepts based on market gaps and trending topics."
        actions={
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Sparkles className="h-4 w-4" /> Generate New Ideas
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {IDEAS.map((idea, i) => (
          <Card key={i} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                  {idea.type}
                </Badge>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <Sparkles className="h-3 w-3" /> {idea.score} Match
                </div>
              </div>
              <CardTitle className="text-lg leading-snug">{idea.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm text-zinc-600 mb-4 flex-1">
                <span className="font-semibold text-zinc-900 block mb-1">Why this works:</span>
                {idea.rationale}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {idea.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-medium text-zinc-500 bg-zinc-100 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <Button className="w-full gap-2 bg-zinc-900 text-white hover:bg-zinc-800">
                <PenTool className="h-4 w-4" /> Draft Content
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
