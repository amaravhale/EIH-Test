import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

export type SortDirection = "asc" | "desc" | null;

export interface SortHeaderProps {
  label: string;
  active: boolean;
  direction: SortDirection;
  onSort: () => void;
  className?: string;
}

export function SortHeader({
  label,
  active,
  direction,
  onSort,
  className,
}: SortHeaderProps) {
  return (
    <button
      onClick={onSort}
      className={cn(
        "group inline-flex items-center gap-1.5 text-left font-medium transition-colors hover:text-zinc-900 dark:hover:text-zinc-100",
        active
          ? "text-zinc-900 dark:text-zinc-100"
          : "text-zinc-600 dark:text-zinc-400",
        className
      )}
      aria-sort={
        active && direction
          ? direction === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
    >
      {label}
      <span className="shrink-0">
        {!active || !direction ? (
          <ArrowUpDown className="h-3.5 w-3.5 opacity-40 group-hover:opacity-70" />
        ) : direction === "asc" ? (
          <ArrowUp className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        ) : (
          <ArrowDown className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        )}
      </span>
    </button>
  );
}
