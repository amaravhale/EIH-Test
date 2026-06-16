import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "green" | "amber" | "red" | "zinc";
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
}

const barColors = {
  blue: "bg-blue-600 dark:bg-blue-500",
  green: "bg-emerald-600 dark:bg-emerald-500",
  amber: "bg-amber-500 dark:bg-amber-400",
  red: "bg-red-600 dark:bg-red-500",
  zinc: "bg-zinc-600 dark:bg-zinc-400",
};

const trackColors = {
  blue: "bg-blue-100 dark:bg-blue-950",
  green: "bg-emerald-100 dark:bg-emerald-950",
  amber: "bg-amber-100 dark:bg-amber-950",
  red: "bg-red-100 dark:bg-red-950",
  zinc: "bg-zinc-200 dark:bg-zinc-800",
};

const sizeMap = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function ProgressBar({
  value,
  max = 100,
  size = "md",
  color = "blue",
  showLabel = false,
  label,
  animated = false,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          {label && (
            <span className="text-zinc-700 dark:text-zinc-300 font-medium">
              {label}
            </span>
          )}
          {showLabel && (
            <span className="text-zinc-500 dark:text-zinc-400 tabular-nums">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full overflow-hidden rounded-full",
          trackColors[color],
          sizeMap[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            barColors[color],
            animated && "animate-pulse"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
