"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Search, Bell, Moon, Sun } from "lucide-react";
import Link from "next/link";

export interface SynexisHeaderProps {
  user: {
    name: string;
    role?: string;
    avatarUrl?: string;
  };
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function SynexisHeader({ user, isDarkMode, onToggleTheme }: SynexisHeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between px-8 bg-transparent shrink-0">
      
      {/* Left side: Search Pill */}
      <div className="flex-1 flex items-center">
        <div className="flex items-center w-full max-w-sm px-4 py-2.5 rounded-full bg-zinc-100/50 dark:bg-[#2A233D] border border-transparent dark:border-white/5 transition-colors">
          <Search className="h-4 w-4 text-zinc-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search neural patterns..." 
            className="bg-transparent border-none outline-none text-sm w-full text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
          />
        </div>
      </div>

      {/* Middle: Links */}
      <div className="flex-1 flex justify-center items-center gap-8 hidden md:flex">
      </div>


      {/* Right side: Actions & Profile */}
      <div className="flex-1 flex items-center justify-end gap-6">
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="relative text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full border border-white dark:border-[#1A1525]"></span>
          </button>
          
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
            <span className="text-[10px] font-bold text-cyan-500 dark:text-cyan-400">Pro Plan</span>
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
