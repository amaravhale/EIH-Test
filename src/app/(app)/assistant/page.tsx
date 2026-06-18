"use client";

import React, { useState, useRef, useEffect } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, User, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "What are the top safety concerns in Offshore Wind right now?",
  "Draft an email summarizing the latest EU regulations.",
  "Compare our pricing model to DuPont Sustainable Solutions.",
  "Identify emerging risks in hydrogen storage facilities."
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Empirisys Intelligence Assistant. I am now fully connected to the live OpenAI engine. How can I help you analyze market trends, competitor moves, or safety signals today?",
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (overrideInput?: string) => {
    const text = overrideInput || input;
    if (!text.trim() || loading) return;

    const userMessage = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/knowledge/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Only send the previous messages (excluding the intro) + the new user message to the API
        body: JSON.stringify({ 
          messages: [...messages.slice(1), userMessage].map(m => ({ role: m.role, content: m.content })) 
        })
      });

      if (!response.ok) throw new Error("Failed to send message");

      // Add a placeholder for the assistant's streaming response
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (reader) {
        let assistantContent = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const textChunk = decoder.decode(value, { stream: true });
          assistantContent += textChunk;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].content = assistantContent;
            return newMessages;
          });
        }
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ I encountered an error connecting to the live API. Please check your API key configuration in Vercel." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <PageHeader
        title="Knowledge Assistant"
        description="Query the intelligence hub using natural language."
      />

      <div className="flex-1 overflow-hidden flex flex-col mt-4">
        <Card className="flex-1 flex flex-col overflow-hidden border-zinc-200">
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, i) => (
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
            {loading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <Bot className="h-5 w-5 animate-pulse" />
                </div>
                <div className="rounded-lg px-4 py-3 max-w-[80%] text-sm bg-zinc-50 border border-zinc-100 text-zinc-800">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </CardContent>
          
          <div className="p-4 bg-zinc-50 border-t border-zinc-100">
            <div className="mb-4 flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion, i) => (
                <button
                  key={i}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors shadow-sm disabled:opacity-50"
                  onClick={() => sendMessage(suggestion)}
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
                onKeyDown={handleKeyDown}
                disabled={loading}
                placeholder="Ask about competitors, market signals, or safety trends (Press Enter to send)..."
                className="min-h-[60px] w-full resize-none pr-12 pb-2 pt-3"
              />
              <Button 
                size="icon" 
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="absolute right-2 bottom-2 h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
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
