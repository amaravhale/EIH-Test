"use client";

import React, { useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { EmpirisysLogo } from "@/components/ui/empirisys-logo";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  LayoutDashboard,
  BarChart3,
  Shield,
  Users,
  Radio,
  Bot,
  Settings,
  HelpCircle,
  PenTool,
} from "lucide-react";
import { SidebarNav, type NavSection } from "./sidebar-nav";

export interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  setCollapsed: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

const defaultNavSections: NavSection[] = [
  {
    label: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: BarChart3,
        href: "/analytics",
        subItems: [
          { id: "market", label: "Market Trends", href: "/analytics/market" },
          {
            id: "competitor",
            label: "Competitor Intel",
            href: "/analytics/competitor",
          },
          {
            id: "sentiment",
            label: "Sentiment Analysis",
            href: "/analytics/sentiment",
          },
        ],
      },
    ],
  },
  {
    label: "Intelligence",
    items: [
      {
        id: "signals",
        label: "Signals",
        icon: Radio,
        href: "/signals",
        badge: "12",
      },
      {
        id: "threats",
        label: "Threat Monitor",
        icon: Shield,
        href: "/threats",
      },
      {
        id: "competitors",
        label: "Competitors",
        icon: Users,
        href: "/competitors",
      },
    ],
  },
  {
    label: "AI",
    items: [
      {
        id: "assistant",
        label: "AI Assistant",
        icon: Bot,
        href: "/assistant",
      },
    ],
  },
  {
    label: "Content Studio",
    items: [
      {
        id: "content",
        label: "Content Generation",
        icon: PenTool,
        href: "/content",
        subItems: [
          { id: "ideas", label: "Content Ideas", href: "/content/ideas" },
          { id: "trending", label: "Trending Topics", href: "/content/trending" },
          { id: "library", label: "Content Library", href: "/content/library" },
        ]
      }
    ]
  },
  {
    label: "System",
    items: [
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
        href: "/settings",
      },
      { id: "help", label: "Help & Docs", icon: HelpCircle, href: "/help" },
    ],
  },
];

export interface SidebarProps {
  sections?: NavSection[];
  activePath?: string;
  onNavigate?: (href: string) => void;
  onSearchClick?: () => void;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Sidebar({
  sections = defaultNavSections,
  activePath = "/dashboard",
  onNavigate,
  onSearchClick,
  logo,
  footer,
  className,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <aside
        className={cn(
          "flex h-screen flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          className
        )}
      >
        {/* Logo area */}
        <div className="flex h-14 items-center justify-center border-b border-zinc-200 px-4 dark:border-zinc-800">
          {logo ? (
            logo
          ) : (
            <div className="flex items-center gap-2 overflow-hidden">
              {!collapsed ? (
                <EmpirisysLogo className="h-6 w-auto" />
              ) : (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
                  E
                </div>
              )}
            </div>
          )}
        </div>

        {/* Search trigger */}
        {!collapsed && (
          <div className="px-3 py-2">
            <button
              onClick={onSearchClick}
              className="flex w-full items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              <Search className="h-4 w-4" />
              <span>Search…</span>
              <kbd className="ml-auto rounded border border-zinc-300 bg-white px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800">
                ⌘K
              </kbd>
            </button>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center py-2">
            <button
              onClick={onSearchClick}
              className="rounded-md p-2 text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-2">
          <SidebarNav
            sections={sections}
            activePath={activePath}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        </nav>

        {/* Footer */}
        {footer && (
          <div className="border-t border-zinc-200 px-3 py-2 dark:border-zinc-800">
            {footer}
          </div>
        )}

        {/* Collapse toggle */}
        <div className="border-t border-zinc-200 p-2 dark:border-zinc-800">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center rounded-md p-2 text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
      </aside>
    </SidebarContext.Provider>
  );
}
