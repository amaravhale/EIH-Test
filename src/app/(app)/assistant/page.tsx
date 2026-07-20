"use client";

import React, { useState, useRef, useEffect } from "react";
import { PageHeader } from "@/components/layout/page-header";
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
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">AI Assistant</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Chat with your intelligent copilot to explore data and generate insights.</p>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col bg-white dark:bg-[#221c35]/50 rounded-3xl border border-zinc-200 dark:border-white/5 shadow-sm relative">
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar scroll-smooth">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn("flex gap-4 max-w-[85%] md:max-w-[75%]", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                
                {/* Avatar */}
                <div className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl shadow-sm",
                  msg.role === "assistant" 
                    ? "bg-gradient-to-br from-violet-100 to-cyan-100 dark:from-violet-900/30 dark:to-cyan-900/30 text-violet-600 dark:text-cyan-400 border border-violet-200 dark:border-violet-800/50" 
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                )}>
                  {msg.role === "assistant" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                </div>

                {/* Message Bubble */}
                <div className={cn(
                  "px-6 py-4 text-[15px] leading-relaxed shadow-sm",
                  msg.role === "assistant" 
                    ? "bg-zinc-50 dark:bg-[#1A1525] text-zinc-800 dark:text-zinc-200 rounded-3xl rounded-tl-sm border border-zinc-100 dark:border-white/5" 
                    : "bg-gradient-to-br from-violet-600 to-cyan-500 text-white rounded-3xl rounded-tr-sm"
                )}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Loading State */}
          {loading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex w-full justify-start">
              <div className="flex gap-4 max-w-[85%] md:max-w-[75%] flex-row">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl shadow-sm bg-gradient-to-br from-violet-100 to-cyan-100 dark:from-violet-900/30 dark:to-cyan-900/30 text-violet-600 dark:text-cyan-400 border border-violet-200 dark:border-violet-800/50">
                  <Bot className="h-5 w-5 animate-pulse" />
                </div>
                <div className="px-6 py-5 bg-zinc-50 dark:bg-[#1A1525] rounded-3xl rounded-tl-sm border border-zinc-100 dark:border-white/5 shadow-sm">
                  <div className="flex space-x-1.5 items-center h-full">
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} className="h-4" />
        </div>
        
        {/* Input Area */}
        <div className="p-4 md:p-6 bg-white/80 dark:bg-[#1A1525]/80 backdrop-blur-md border-t border-zinc-100 dark:border-white/5">
          
          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="mb-4 flex flex-wrap gap-2 justify-center">
              {SUGGESTIONS.map((suggestion, i) => (
                <button
                  key={i}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 rounded-full border border-violet-100 dark:border-violet-500/20 bg-violet-50/50 dark:bg-violet-500/10 px-4 py-2 text-[13px] font-medium text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-500/20 transition-colors shadow-sm disabled:opacity-50"
                  onClick={() => sendMessage(suggestion)}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          
          {/* Chat Input */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative flex items-center bg-zinc-50 dark:bg-[#221c35] rounded-3xl border border-zinc-200 dark:border-white/10 shadow-sm transition-all focus-within:border-violet-400 dark:focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10">
              <Textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                placeholder="Ask your intelligence assistant..."
                className="min-h-[56px] max-h-[200px] w-full resize-none bg-transparent border-0 focus-visible:ring-0 py-4 pl-6 pr-14 text-[15px]"
                rows={1}
              />
              <Button 
                size="icon" 
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="absolute right-2 bottom-2 h-10 w-10 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 hover:opacity-90 text-white shadow-md disabled:opacity-50 transition-all"
              >
                <Send className="h-4 w-4 ml-0.5" />
              </Button>
            </div>
            <div className="text-center mt-3">
              <span className="text-xs text-zinc-500 dark:text-zinc-500">
                AI Assistant can make mistakes. Consider verifying important safety and market insights.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
