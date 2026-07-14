"use client";

import React, { useState, useEffect } from "react";
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
  PenTool,
  ChevronDown,
  Target
} from "lucide-react";
import Link from "next/link";
import { EmpirisysLogo } from "@/components/ui/empirisys-logo";
import { usePathname } from "next/navigation";

export interface SynexisSidebarProps {
  activePath?: string;
  onNavigate?: (href: string) => void;
}

const mainNavItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "market-analyst", label: "Market Analyst", icon: Sparkles, href: "/market-analyst" },
  { id: "lead-scoring", label: "Client Acquisition", icon: Target, href: "/lead-scoring" },
  { 
    id: "analytics", label: "Analytics", icon: BarChart3, href: "/analytics",
    subItems: [
      { id: "market", label: "Market Trends", href: "/analytics/market" },
      { id: "competitor", label: "Competitor Intel", href: "/analytics/competitor" },
    ]
  },
  { id: "signals", label: "Signals", icon: Radio, href: "/market/signals" },
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
  const pathname = usePathname() || activePath;
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Auto-expand sections if their sub-items are active
  useEffect(() => {
    const newExpanded = { ...expandedItems };
    let hasChanges = false;
    
    mainNavItems.forEach(item => {
      if (item.subItems) {
        const hasActiveChild = item.subItems.some(sub => pathname.startsWith(sub.href));
        if (hasActiveChild && !newExpanded[item.id]) {
          newExpanded[item.id] = true;
          hasChanges = true;
        }
      }
    });
    
    if (hasChanges) {
      setExpandedItems(newExpanded);
    }
  }, [pathname]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleItemClick = (item: any) => {
    if (item.subItems) {
      toggleExpand(item.id);
    } else {
      onNavigate?.(item.href);
    }
  };

  return (
    <aside className="flex flex-col w-64 h-full bg-white/40 dark:bg-white/5 backdrop-blur-2xl text-zinc-900 dark:text-zinc-100 shrink-0 py-6 px-5 border-r border-zinc-200/50 dark:border-white/10 transition-colors duration-300 relative z-40 shadow-xl shadow-zinc-200/20 dark:shadow-black/40">
      
      {/* Brand Logo Area */}
      <div className="flex items-center justify-center w-full mt-4 mb-10">
        <EmpirisysLogo className="w-full max-w-[165px] h-auto" />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2 custom-scrollbar">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href || (item.subItems && item.subItems.some(sub => pathname.startsWith(sub.href)));
          const isExpanded = expandedItems[item.id];
          const Icon = item.icon;
          
          return (
            <div key={item.id} className="flex flex-col mb-1">
              <button
                onClick={() => handleItemClick(item)}
                className={cn(
                  "flex items-center w-full gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 text-[15px] font-semibold group relative overflow-hidden",
                  isActive && !item.subItems
                    ? "text-white shadow-[0_0_20px_rgba(139,92,246,0.2)] bg-white/10 dark:bg-white/10 border border-white/20" 
                    : isActive && item.subItems
                      ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-white/5"
                      : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent"
                )}
              >
                {isActive && !item.subItems && (
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-cyan-500/30 opacity-100 z-0 rounded-2xl" />
                )}
                <Icon className={cn("h-[20px] w-[20px] shrink-0 relative z-10", isActive && !item.subItems ? "text-white" : "")} />
                <span className="relative z-10 flex-1 text-left">{item.label}</span>
                {item.subItems && (
                  <ChevronDown className={cn("h-4 w-4 relative z-10 transition-transform duration-200", isExpanded ? "rotate-180" : "")} />
                )}
              </button>
              
              {item.subItems && (
                <div className={cn(
                  "flex flex-col ml-11 mt-1 border-l border-zinc-200 dark:border-white/10 space-y-1 overflow-hidden transition-all duration-300",
                  isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}>
                  {item.subItems.map(subItem => {
                    const isSubActive = pathname === subItem.href;
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
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate?.(item.href)}
              className={cn(
                "flex items-center w-full gap-3.5 px-4 py-2.5 rounded-2xl transition-all duration-200 text-[15px] font-semibold",
                isActive
                  ? "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10"
                  : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-200"
              )}
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
