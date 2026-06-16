import React from "react";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  Bell,
  Clock,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";

export type AlertPriority = "critical" | "high" | "medium" | "low" | "info";

export interface AlertCardProps {
  title: string;
  description: string;
  priority: AlertPriority;
  source?: string;
  timestamp?: string;
  category?: string;
  read?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  className?: string;
}

const priorityConfig: Record<
  AlertPriority,
  { icon: LucideIcon; border: string; bg: string; badge: string; text: string }
> = {
  critical: {
    icon: AlertCircle,
    border: "border-l-red-600",
    bg: "bg-red-50/50 dark:bg-red-950/10",
    badge: "bg-red-600 text-white",
    text: "text-red-700 dark:text-red-400",
  },
  high: {
    icon: AlertTriangle,
    border: "border-l-orange-500",
    bg: "bg-orange-50/50 dark:bg-orange-950/10",
    badge: "bg-orange-500 text-white",
    text: "text-orange-700 dark:text-orange-400",
  },
  medium: {
    icon: Bell,
    border: "border-l-amber-500",
    bg: "bg-amber-50/30 dark:bg-amber-950/10",
    badge: "bg-amber-500 text-white",
    text: "text-amber-700 dark:text-amber-400",
  },
  low: {
    icon: Info,
    border: "border-l-blue-500",
    bg: "bg-blue-50/30 dark:bg-blue-950/10",
    badge: "bg-blue-500 text-white",
    text: "text-blue-700 dark:text-blue-400",
  },
  info: {
    icon: Info,
    border: "border-l-zinc-400",
    bg: "",
    badge: "bg-zinc-500 text-white",
    text: "text-zinc-600 dark:text-zinc-400",
  },
};

export function AlertCard({
  title,
  description,
  priority,
  source,
  timestamp,
  category,
  read = false,
  actionLabel,
  onAction,
  onDismiss,
  className,
}: AlertCardProps) {
  const config = priorityConfig[priority];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "rounded-lg border border-zinc-200 border-l-4 p-4 dark:border-zinc-800",
        config.border,
        !read && config.bg,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", config.text)} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <h3
                className={cn(
                  "text-sm font-semibold text-zinc-900 dark:text-zinc-100",
                  !read && "font-bold"
                )}
              >
                {title}
              </h3>
              <span
                className={cn(
                  "rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                  config.badge
                )}
              >
                {priority}
              </span>
            </div>
            {!read && (
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
            )}
          </div>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
            {description}
          </p>
          <div className="mt-3 flex items-center gap-4">
            {source && (
              <span className="flex items-center gap-1 text-xs text-zinc-500">
                <ExternalLink className="h-3 w-3" />
                {source}
              </span>
            )}
            {category && (
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {category}
              </span>
            )}
            {timestamp && (
              <span className="flex items-center gap-1 text-xs text-zinc-400">
                <Clock className="h-3 w-3" />
                {timestamp}
              </span>
            )}
          </div>
          {(onAction || onDismiss) && (
            <div className="mt-3 flex items-center gap-2">
              {onAction && (
                <button
                  onClick={onAction}
                  className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  {actionLabel || "View Details"}
                </button>
              )}
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="rounded-md px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                >
                  Dismiss
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
