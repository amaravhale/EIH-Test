"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Search, Bell, Moon, Sun, Sparkles } from "lucide-react";
import Link from "next/link";
import { toast } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";

export interface SynexisHeaderProps {
  user: {
    name: string;
    role?: string;
    avatarUrl?: string;
  };
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const MOTIVATIONAL_QUOTES = [
  "Growth is never by mere chance; it is the result of forces working together.",
  "Strategy without execution is hallucination.",
  "The secret of change is to focus all of your energy on building the new.",
  "Don't be afraid to give up the good to go for the great.",
  "Risk more than others think is safe. Dream more than others think is practical.",
  "Success is not final; failure is not fatal: it is the courage to continue that counts.",
  "The best way to predict the future is to create it."
];

export function SynexisHeader({ user, isDarkMode, onToggleTheme }: SynexisHeaderProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getDailyQuote = () => {
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    return MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length];
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      toast({
        title: "Search Initiated",
        description: `Scanning neural patterns for "${searchQuery}"...`,
      });
      setSearchQuery("");
    }
  };

  return (
    <header className="flex h-20 items-center justify-between px-8 shrink-0 sticky top-0 z-50 backdrop-blur-2xl bg-white/40 dark:bg-white/5 border-b border-zinc-200/50 dark:border-white/10 transition-colors duration-300">
      
      {/* Left side: Search Pill */}
      <div className="flex-1 flex items-center">
        <div className="flex items-center w-full max-w-sm px-4 py-2.5 rounded-full bg-zinc-100/50 dark:bg-[#2A233D] border border-transparent dark:border-white/5 transition-colors focus-within:ring-2 focus-within:ring-violet-500/50">
          <Search className="h-4 w-4 text-zinc-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search neural patterns..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent border-none outline-none text-sm w-full text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
          />
        </div>
      </div>

      {/* Middle: Links & Greeting (Only on Dashboard) */}
      <div className="flex-1 flex justify-center items-center px-4 hidden lg:flex">
        {mounted && pathname === '/dashboard' && (
          <div className="flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
            <div className="text-[14px] font-semibold text-violet-500 dark:text-violet-400 mb-0.5 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
              {getGreeting()}, Empirisys Team
            </div>
            <div className="text-[12px] italic text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              "{getDailyQuote()}"
            </div>
          </div>
        )}
      </div>


      {/* Right side: Actions & Profile */}
      <div className="flex-1 flex items-center justify-end gap-6">
        
        {/* Actions */}
        <div className="flex items-center gap-4 relative">
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full border border-white dark:border-[#1A1525]"></span>
          </button>
          
          {isNotificationsOpen && (
            <div className="absolute top-full right-8 mt-4 w-80 bg-white dark:bg-[#2A233D] border border-zinc-200 dark:border-white/10 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="p-4 border-b border-zinc-100 dark:border-white/5 flex justify-between items-center bg-zinc-50 dark:bg-white/5">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Notifications</h4>
                <span className="text-[10px] font-bold text-violet-500 bg-violet-500/10 px-2 py-0.5 rounded-full">2 New</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="p-4 border-b border-zinc-100 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors cursor-pointer relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                  <h5 className="text-[13px] font-bold text-zinc-900 dark:text-zinc-100 mb-1">Critical Pattern Detected</h5>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2">New regulatory signals match your alert threshold for the Chemical Sector.</p>
                  <span className="text-[10px] text-zinc-400 mt-2 block">10m ago</span>
                </div>
                <div className="p-4 border-b border-zinc-100 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors cursor-pointer relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500"></div>
                  <h5 className="text-[13px] font-bold text-zinc-900 dark:text-zinc-100 mb-1">System Update</h5>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2">Enterprise Intelligence Hub v2.1 successfully deployed.</p>
                  <span className="text-[10px] text-zinc-400 mt-2 block">1h ago</span>
                </div>
              </div>
              <div className="p-3 text-center bg-zinc-50 dark:bg-white/5 border-t border-zinc-100 dark:border-white/5">
                <button className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Mark all as read</button>
              </div>
            </div>
          )}
          
          <button 
            onClick={onToggleTheme} 
            className="flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right">
            <span className="text-sm font-bold text-zinc-900 dark:text-white">{user.name}</span>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 p-[2px]">
            <div className="h-full w-full rounded-full bg-white dark:bg-[#1A1525] border border-transparent overflow-hidden">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
