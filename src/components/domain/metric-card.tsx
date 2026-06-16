import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react";

export interface MetricCardProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  change?: number;
  changeLabel?: string;
  trend?: "up" | "down" | "neutral";
  trendIsPositive?: boolean;
  icon?: LucideIcon;
  iconColor?: string;
  sparkline?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  trend,
  trendIsPositive,
  icon: Icon,
  iconColor,
  sparkline,
  footer,
  className,
}: MetricCardProps) {
  const resolvedTrend =
    trend || (change ? (change > 0 ? "up" : change < 0 ? "down" : "neutral") : undefined);

  const trendPositive =
    trendIsPositive ?? (resolvedTrend === "up");

  const TrendIcon =
    resolvedTrend === "up"
      ? TrendingUp
      : resolvedTrend === "down"
      ? TrendingDown
      : Minus;

  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {title}
          </p>
          <p className="mt-1.5 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {(change !== undefined || changeLabel) && resolvedTrend && (
            <div className="mt-2 flex items-center gap-1.5">
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium",
                  trendPositive
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                    : resolvedTrend === "neutral"
                    ? "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400"
                )}
              >
                <TrendIcon className="h-3 w-3" />
                {change !== undefined && (
                  <span>{change > 0 ? "+" : ""}{change}%</span>
                )}
              </span>
              {changeLabel && (
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          {Icon && (
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg",
                iconColor || "bg-blue-100 dark:bg-blue-900/50"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  iconColor
                    ? "text-current"
                    : "text-blue-600 dark:text-blue-400"
                )}
              />
            </div>
          )}
          {sparkline && <div className="mt-1">{sparkline}</div>}
        </div>
      </div>
      {footer && (
        <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-800">
          {footer}
        </div>
      )}
    </div>
  );
}
