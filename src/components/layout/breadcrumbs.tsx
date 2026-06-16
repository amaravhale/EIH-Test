"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  /** Auto-generate from a route path like /analytics/competitor/acme */
  routePath?: string;
  /** Map of path segments to custom labels */
  labelMap?: Record<string, string>;
  onNavigate?: (href: string) => void;
  showHome?: boolean;
  className?: string;
}

function segmentToLabel(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function generateBreadcrumbs(
  routePath: string,
  labelMap: Record<string, string> = {}
): BreadcrumbItem[] {
  const segments = routePath.split("/").filter(Boolean);
  return segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = labelMap[segment] || segmentToLabel(segment);
    return { label, href };
  });
}

export function Breadcrumbs({
  items,
  routePath,
  labelMap = {},
  onNavigate,
  showHome = true,
  className,
}: BreadcrumbsProps) {
  const breadcrumbs = items || (routePath ? generateBreadcrumbs(routePath, labelMap) : []);

  if (breadcrumbs.length === 0 && !showHome) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-sm", className)}
    >
      <ol className="flex items-center gap-1">
        {showHome && (
          <li className="flex items-center">
            <button
              onClick={() => onNavigate?.("/")}
              className="text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
              aria-label="Home"
            >
              <Home className="h-3.5 w-3.5" />
            </button>
          </li>
        )}
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={crumb.href || index} className="flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5 text-zinc-300 dark:text-zinc-600" />
              {isLast || !crumb.href ? (
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  {crumb.label}
                </span>
              ) : (
                <button
                  onClick={() => onNavigate?.(crumb.href!)}
                  className="text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  {crumb.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
