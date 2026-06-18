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
  Sparkles
} from "lucide-react";
import Link from "next/link";

export interface SynexisSidebarProps {
  activePath?: string;
  onNavigate?: (href: string) => void;
}

const mainNavItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/analytics" },
  { id: "models", label: "Models", icon: Cpu, href: "/models" },
  { id: "signals", label: "Deployment", icon: Radio, href: "/deployment" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

const bottomNavItems = [
  { id: "support", label: "Support", icon: HelpCircle, href: "/help" },
  { id: "account", label: "Account", icon: User, href: "/account" },
];

export function SynexisSidebar({
  activePath = "/dashboard",
  onNavigate,
}: SynexisSidebarProps) {
  return (
    <aside className="flex flex-col w-64 h-full bg-white dark:bg-[#1A1525] text-zinc-900 dark:text-zinc-100 shrink-0 py-6 px-5 border-r border-zinc-200 dark:border-white/5 transition-colors duration-300">
      
      {/* Brand Logo Area */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="flex items-center justify-center h-10 w-10 rounded-[14px] bg-gradient-to-br from-violet-500 to-cyan-400 text-white font-bold text-lg shadow-[0_4px_14px_rgba(139,92,246,0.4)]">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-[20px] font-bold tracking-tight leading-none text-zinc-900 dark:text-white">Empirisys</span>
          <span className="text-[9px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mt-0.5">Intelligence</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2 custom-scrollbar">
        {mainNavItems.map((item) => {
          const isActive = activePath.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
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
          );
        })}
      </nav>

      {/* Action Button */}
      <div className="mt-6 mb-8 px-2">
        <button className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-violet-500 to-cyan-400 text-white rounded-2xl text-[15px] font-bold shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:shadow-[0_6px_25px_rgba(139,92,246,0.6)] transition-all transform hover:-translate-y-0.5">
          <PlusCircle className="h-5 w-5" />
          New Project
        </button>
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
        <div className="relative rounded-[24px] p-5 overflow-hidden bg-gradient-to-br from-violet-500/10 to-cyan-400/10 dark:from-[#2A233D] dark:to-[#221D35] border border-violet-500/20 dark:border-white/5 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-cyan-400/20 dark:bg-violet-500/30 rounded-full blur-[30px] pointer-events-none" />
          
          <div className="flex justify-center mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-b from-white to-violet-100 dark:from-white/10 dark:to-white/5 shadow-sm border border-white/20">
               <Sparkles className="h-5 w-5 text-violet-500 dark:text-cyan-400" />
            </div>
          </div>
          
          <h4 className="text-zinc-900 dark:text-white font-bold text-[15px] mb-1.5">Upgrade To Premium!</h4>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug mb-4">
            Upgrade your account and unlock all of the benefits
          </p>
          
          <button className="w-full py-2 bg-gradient-to-r from-violet-500 to-cyan-400 text-white rounded-xl text-[12px] font-bold shadow-md transition-transform hover:scale-105">
            Upgrade to premium
          </button>
        </div>
      </div>

    </aside>
  );
}
