import React from "react";
import { cn } from "@/lib/utils";

export interface LoadingSkeletonProps {
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string;
  height?: string;
  lines?: number;
  className?: string;
}

function SkeletonPulse({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800",
        className
      )}
      style={style}
    />
  );
}

export function LoadingSkeleton({
  variant = "text",
  width,
  height,
  lines = 3,
  className,
}: LoadingSkeletonProps) {
  if (variant === "circular") {
    return (
      <SkeletonPulse
        className={cn("rounded-full", className)}
        style={{
          width: width || "40px",
          height: height || "40px",
        }}
      />
    );
  }

  if (variant === "rectangular") {
    return (
      <SkeletonPulse
        className={cn("rounded-lg", className)}
        style={{
          width: width || "100%",
          height: height || "120px",
        }}
      />
    );
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          "rounded-lg border border-zinc-200 p-4 dark:border-zinc-800",
          className
        )}
        style={{ width }}
      >
        <div className="flex items-center gap-3 mb-4">
          <SkeletonPulse className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <SkeletonPulse className="h-4 w-3/4" />
            <SkeletonPulse className="h-3 w-1/2" />
          </div>
        </div>
        <div className="space-y-2">
          <SkeletonPulse className="h-3 w-full" />
          <SkeletonPulse className="h-3 w-5/6" />
          <SkeletonPulse className="h-3 w-4/6" />
        </div>
        <div className="mt-4 flex gap-2">
          <SkeletonPulse className="h-8 w-20 rounded-md" />
          <SkeletonPulse className="h-8 w-20 rounded-md" />
        </div>
      </div>
    );
  }

  // text variant
  return (
    <div className={cn("space-y-2", className)} style={{ width }}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonPulse
          key={i}
          className="h-4"
          style={{
            width:
              i === lines - 1
                ? "60%"
                : `${85 + Math.floor(Math.random() * 15)}%`,
          }}
        />
      ))}
    </div>
  );
}
