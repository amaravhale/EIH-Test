import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

const textSizeMap = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function LoadingSpinner({
  size = "md",
  label,
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="status"
      aria-label={label || "Loading"}
    >
      <Loader2
        className={cn("animate-spin text-blue-600 dark:text-blue-400", sizeMap[size])}
      />
      {label && (
        <span
          className={cn(
            "text-zinc-500 dark:text-zinc-400",
            textSizeMap[size]
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
