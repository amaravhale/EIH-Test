"use client";

import React, { useState } from 'react';
import { ArrowUpRight, Paperclip, ArrowUp } from 'lucide-react';

export function AIAssistant() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('/api/finpath/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });
      const data = await res.json();
      setResponse(data.reply);
      setQuery('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1A1A1A] rounded-[24px] p-6">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-medium text-white flex items-center gap-2">
          <span className="text-[#D4FF00]">✧</span> AI Assistant
        </h3>
        <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center text-center mb-8">
        <div className="w-12 h-12 mb-4 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[#D4FF00]/20 blur-xl rounded-full"></div>
          {/* Audio waveform mockup icon */}
          <div className="flex items-center gap-1 z-10">
            <div className="w-1 h-3 bg-[#D4FF00] rounded-full animate-pulse"></div>
            <div className="w-1 h-6 bg-[#D4FF00] rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1 h-8 bg-[#D4FF00] rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
            <div className="w-1 h-5 bg-[#D4FF00] rounded-full animate-pulse" style={{ animationDelay: '450ms' }}></div>
            <div className="w-1 h-3 bg-[#D4FF00] rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
          </div>
        </div>
        <h4 className="text-lg text-white mb-6">What can i help you with today?</h4>
        
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button className="px-4 py-2 rounded-full border border-white/10 text-xs text-zinc-300 hover:bg-white/5 transition-colors">
            Plan my monthly budget
          </button>
          <button className="px-4 py-2 rounded-full border border-white/10 text-xs text-zinc-300 hover:bg-white/5 transition-colors">
            Detect unusual transactions
          </button>
          <button className="px-4 py-2 rounded-full border border-white/10 text-xs text-zinc-300 hover:bg-white/5 transition-colors">
            Others
          </button>
        </div>
      </div>

      {/* Response Area (conditionally rendered) */}
      {response && (
        <div className="mb-6 p-4 rounded-xl bg-zinc-800/50 border border-white/5 text-sm text-zinc-300">
          {response}
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-[#D4FF00] text-lg">✧</span>
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything" 
          className="w-full bg-zinc-800/50 border border-white/10 rounded-full py-3 pl-10 pr-24 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#D4FF00]/50 transition-colors"
        />
        <div className="absolute inset-y-0 right-2 flex items-center gap-2">
          <button type="button" className="p-1.5 text-zinc-400 hover:text-white transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>
          <button 
            type="submit" 
            disabled={loading || !query.trim()}
            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-zinc-400 hover:bg-white/20 hover:text-white transition-colors disabled:opacity-50"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-3 px-4 text-xs">
          <div className="flex gap-4">
            <button type="button" className="flex items-center gap-1 text-[#D4FF00]">
              <span className="w-2 h-2 rounded-full bg-[#D4FF00]"></span> Deep Think
            </button>
            <button type="button" className="flex items-center gap-1 text-zinc-500 hover:text-zinc-300">
              <span className="w-2 h-2 rounded-full border border-zinc-500"></span> Search
            </button>
          </div>
          <button type="button" className="text-zinc-500 hover:text-zinc-300 flex items-center gap-1">
            GPT 4o mini <span className="text-[10px]">▼</span>
          </button>
        </div>
      </form>
    </div>
  );
}
