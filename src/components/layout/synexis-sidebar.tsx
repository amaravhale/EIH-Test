"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart3,
  Shield,
  Users,
  Radio,
  Settings,
  HelpCircle,
  PlusCircle,
  Cpu,
  User,
  Sparkles,
  Bot,
  PenTool
} from "lucide-react";
import Link from "next/link";
import { EmpirisysLogo } from "@/components/ui/empirisys-logo";

export interface SynexisSidebarProps {
  activePath?: string;
  onNavigate?: (href: string) => void;
}

const mainNavItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { 
    id: "analytics", label: "Analytics", icon: BarChart3, href: "/analytics",
    subItems: [
      { id: "market", label: "Market Trends", href: "/analytics/market" },
      { id: "competitor", label: "Competitor Intel", href: "/analytics/competitor" },
      { id: "sentiment", label: "Sentiment Analysis", href: "/analytics/sentiment" },
    ]
  },
  { id: "signals", label: "Signals", icon: Radio, href: "/market/signals" },
  { id: "threats", label: "Threat Monitor", icon: Shield, href: "/threats" },
  { id: "competitors", label: "Competitors", icon: Users, href: "/competitors" },
  { id: "assistant", label: "AI Assistant", icon: Bot, href: "/assistant" },
  { 
    id: "content", label: "Content Studio", icon: PenTool, href: "/content",
    subItems: [
      { id: "ideas", label: "Content Ideas", href: "/content/ideas" },
      { id: "trending", label: "Trending Topics", href: "/content/trending" },
      { id: "library", label: "Content Library", href: "/content/library" }
    ]
  },
];

const bottomNavItems = [
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  { id: "help", label: "Help & Docs", icon: HelpCircle, href: "/help" },
];

export function SynexisSidebar({
  activePath = "/dashboard",
  onNavigate,
}: SynexisSidebarProps) {
  return (
    <aside className="flex flex-col w-64 h-full bg-white dark:bg-[#1A1525] text-zinc-900 dark:text-zinc-100 shrink-0 py-6 px-5 border-r border-zinc-200 dark:border-white/5 transition-colors duration-300">
      
      {/* Brand Logo Area */}
      <div className="flex items-center justify-center w-full px-2 mb-10">
        <EmpirisysLogo className="h-10 w-auto" />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2 custom-scrollbar">
        {mainNavItems.map((item) => {
          const isActive = activePath.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <div key={item.id} className="flex flex-col mb-1">
              <button
                onClick={() => onNavigate?.(item.href)}
                className={cn(
                  "flex items-center w-full gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 text-[15px] font-semibold group relative overflow-hidden",
                  isActive 
                    ? "text-white shadow-[0_4px_20px_rgba(139,92,246,0.3)]" 
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-200"
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-400 opacity-100 z-0" />
                )}
                <Icon className={cn("h-[20px] w-[20px] shrink-0 relative z-10", isActive ? "text-white" : "")} />
                <span className="relative z-10">{item.label}</span>
              </button>
              
              {item.subItems && (
                <div className="flex flex-col ml-11 mt-1 border-l border-zinc-200 dark:border-white/10 space-y-1">
                  {item.subItems.map(subItem => {
                    const isSubActive = activePath === subItem.href;
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => onNavigate?.(subItem.href)}
                        className={cn(
                          "flex items-center w-full text-left pl-4 py-2 rounded-xl transition-all duration-200 text-[13px] font-medium",
                          isSubActive
                            ? "text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-50 dark:bg-cyan-500/10"
                            : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                        )}
                      >
                        {subItem.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Action Button */}
      <div className="mt-6 mb-8 px-2">
      </div>

      {/* Bottom Navigation */}
      <div className="space-y-1.5 mb-6">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate?.(item.href)}
              className="flex items-center w-full gap-3.5 px-4 py-2.5 rounded-2xl transition-all duration-200 text-[15px] font-semibold text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-200"
            >
              <Icon className="h-[20px] w-[20px] shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Upgrade Card */}
      <div className="px-1">
      </div>

    </aside>
  );
}
