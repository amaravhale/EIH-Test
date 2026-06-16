"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";

export interface SparklineDataPoint {
  value: number;
}

export interface SparklineProps {
  data: SparklineDataPoint[];
  color?: string;
  height?: number;
  width?: number;
  showTooltip?: boolean;
  showArea?: boolean;
  strokeWidth?: number;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

const trendColors = {
  up: "#10b981",
  down: "#ef4444",
  neutral: "#6b7280",
};

export function Sparkline({
  data,
  color,
  height = 32,
  width,
  showTooltip = false,
  strokeWidth = 1.5,
  trend,
  className,
}: SparklineProps) {
  const resolvedColor =
    color || (trend ? trendColors[trend] : "#3b82f6");

  return (
    <div
      className={cn("inline-block", className)}
      style={{ width: width || "100%", height }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <YAxis hide domain={["dataMin", "dataMax"]} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={resolvedColor}
            strokeWidth={strokeWidth}
            dot={false}
            isAnimationActive={false}
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #3f3f46",
                borderRadius: "6px",
                color: "#fff",
                fontSize: "11px",
                padding: "4px 8px",
              }}
              formatter={(value: number) => [value.toLocaleString(), ""]}
              labelFormatter={() => ""}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
