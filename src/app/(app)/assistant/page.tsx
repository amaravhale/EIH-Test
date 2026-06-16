"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, User, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_CHAT = [
  {
    role: "assistant",
    content: "Hello! I'm your Empirisys Intelligence Assistant. How can I help you analyze market trends, competitor moves, or safety signals today?",
  },
  {
    role: "user",
    content: "Summarize the latest movements from ERM in the predictive safety analytics space.",
  },
  {
    role: "assistant",
    content: "Based on data from the last 30 days, ERM has made two significant moves in predictive safety analytics:\n\n1. **Acquisition of SafetyTech AI**: Last week, they acquired a startup specializing in computer vision for hazard detection.\n2. **Hiring Surge**: They have opened 15 new roles for Data Scientists with HSE backgrounds in their London and Amsterdam offices.\n\nThis suggests they are rapidly building out an in-house predictive modeling capability to augment their traditional consulting services.",
  }
];

const SUGGESTIONS = [
  "What are the top safety concerns in Offshore Wind right now?",
  "Draft an email summarizing the latest EU regulations.",
  "Compare our pricing model to DuPont Sustainable Solutions.",
  "Identify emerging risks in hydrogen storage facilities."
];

export default function AssistantPage() {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <PageHeader
        title="Knowledge Assistant"
        description="Query the intelligence hub using natural language."
      />

      <div className="flex-1 overflow-hidden flex flex-col mt-4">
        <Card className="flex-1 flex flex-col overflow-hidden border-zinc-200">
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
            {MOCK_CHAT.map((msg, i) => (
              <div key={i} className={cn("flex gap-4", msg.role === "user" ? "flex-row-reverse" : "")}>
                <div className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  msg.role === "assistant" ? "bg-blue-100 text-blue-700" : "bg-zinc-800 text-white"
                )}>
                  {msg.role === "assistant" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                </div>
                <div className={cn(
                  "rounded-lg px-4 py-3 max-w-[80%] text-sm",
                  msg.role === "assistant" ? "bg-zinc-50 border border-zinc-100 text-zinc-800" : "bg-blue-600 text-white"
                )}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}
          </CardContent>
          
          <div className="p-4 bg-zinc-50 border-t border-zinc-100">
            <div className="mb-4 flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion, i) => (
                <button
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors shadow-sm"
                  onClick={() => setInput(suggestion)}
                >
                  <Sparkles className="h-3 w-3 text-blue-500" />
                  {suggestion}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <Textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about competitors, market signals, or safety trends..."
                className="min-h-[60px] w-full resize-none pr-12 pb-2 pt-3"
              />
              <Button 
                size="icon" 
                className="absolute right-2 bottom-2 h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
