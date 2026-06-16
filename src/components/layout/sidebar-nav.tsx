"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, type LucideIcon } from "lucide-react";

export interface NavSubItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  subItems?: NavSubItem[];
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export interface SidebarNavProps {
  sections: NavSection[];
  activePath: string;
  collapsed: boolean;
  onNavigate?: (href: string) => void;
}

export function SidebarNav({
  sections,
  activePath,
  collapsed,
  onNavigate,
}: SidebarNavProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set<string>()
  );

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleItemClick = (item: NavItem) => {
    if (item.subItems && item.subItems.length > 0 && !collapsed) {
      toggleExpand(item.id);
    } else {
      onNavigate?.(item.href);
    }
  };

  const isActive = (href: string) => activePath === href;
  const isSectionActive = (item: NavItem) =>
    isActive(item.href) ||
    (item.subItems?.some((sub) => isActive(sub.href)) ?? false);

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div key={section.label}>
          {!collapsed && (
            <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              {section.label}
            </p>
          )}
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const Icon = item.icon;
              const expanded = expandedItems.has(item.id);
              const active = isSectionActive(item);

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item)}
                    className={cn(
                      "group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                        : "text-zinc-600 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:bg-zinc-800/50",
                      collapsed && "justify-center px-0"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        active
                          ? "text-white dark:text-zinc-900"
                          : "text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
                      )}
                    />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left truncate">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                            {item.badge}
                          </span>
                        )}
                        {item.subItems && item.subItems.length > 0 && (
                          <ChevronDown
                            className={cn(
                              "h-3.5 w-3.5 text-zinc-400 transition-transform",
                              expanded && "rotate-180"
                            )}
                          />
                        )}
                      </>
                    )}
                  </button>

                  {/* Sub-items */}
                  {!collapsed &&
                    expanded &&
                    item.subItems &&
                    item.subItems.length > 0 && (
                      <ul className="ml-4 mt-0.5 space-y-0.5 border-l border-zinc-200 pl-3 dark:border-zinc-700">
                        {item.subItems.map((sub) => (
                          <li key={sub.id}>
                            <button
                              onClick={() => onNavigate?.(sub.href)}
                              className={cn(
                                "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                                isActive(sub.href)
                                  ? "font-medium text-zinc-900 bg-zinc-100 dark:bg-zinc-800/50 dark:text-zinc-100"
                                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/50"
                              )}
                            >
                              <span className="flex-1 text-left truncate">
                                {sub.label}
                              </span>
                              {sub.badge && (
                                <span className="rounded-full bg-zinc-200 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                                  {sub.badge}
                                </span>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
