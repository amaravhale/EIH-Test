import React from "react";
import { cn } from "@/lib/utils";
import { X, type LucideIcon } from "lucide-react";

export interface BulkAction {
  id: string;
  label: string;
  icon?: LucideIcon;
  variant?: "default" | "destructive";
  onAction?: (selectedRows: unknown[]) => void;
}

export interface BulkActionBarProps {
  selectedCount: number;
  actions: BulkAction[];
  onAction: (actionId: string) => void;
  onClearSelection: () => void;
  className?: string;
}

export function BulkActionBar({
  selectedCount,
  actions,
  onAction,
  onClearSelection,
  className,
}: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-lg dark:bg-blue-700",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onClearSelection}
          className="rounded p-1 transition-colors hover:bg-blue-700 dark:hover:bg-blue-600"
          aria-label="Clear selection"
        >
          <X className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium">
          {selectedCount} item{selectedCount !== 1 ? "s" : ""} selected
        </span>
      </div>
      <div className="flex items-center gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onAction(action.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                action.variant === "destructive"
                  ? "bg-red-500 text-white hover:bg-red-400"
                  : "bg-white/20 text-white hover:bg-white/30"
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
