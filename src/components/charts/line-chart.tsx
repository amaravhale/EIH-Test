"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export interface LineChartDataPoint {
  name: string;
  [key: string]: string | number;
}

export interface LineChartSeries {
  dataKey: string;
  label: string;
  color: string;
  strokeWidth?: number;
  dashed?: boolean;
  dot?: boolean;
}

export interface LineChartReferenceLine {
  y: number;
  label: string;
  color?: string;
  dashed?: boolean;
}

export interface LineChartProps {
  data: LineChartDataPoint[];
  series: LineChartSeries[];
  referenceLines?: LineChartReferenceLine[];
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  showDots?: boolean;
  curved?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  height?: number;
  className?: string;
}

export function LineChart({
  data,
  series,
  referenceLines = [],
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  showDots = false,
  curved = true,
  xAxisLabel,
  yAxisLabel,
  height = 350,
  className,
}: LineChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              className="text-zinc-200 dark:text-zinc-800"
            />
          )}
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "currentColor" }}
            className="text-zinc-500 dark:text-zinc-400"
            label={
              xAxisLabel
                ? {
                    value: xAxisLabel,
                    position: "insideBottom",
                    offset: -5,
                    style: { fontSize: 12 },
                  }
                : undefined
            }
          />
          <YAxis
            tick={{ fontSize: 12, fill: "currentColor" }}
            className="text-zinc-500 dark:text-zinc-400"
            label={
              yAxisLabel
                ? {
                    value: yAxisLabel,
                    angle: -90,
                    position: "insideLeft",
                    style: { fontSize: 12 },
                  }
                : undefined
            }
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-zinc-900, #18181b)",
                border: "1px solid var(--color-zinc-700, #3f3f46)",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "12px",
              }}
            />
          )}
          {showLegend && <Legend wrapperStyle={{ fontSize: "12px" }} />}
          {referenceLines.map((ref, i) => (
            <ReferenceLine
              key={i}
              y={ref.y}
              label={{
                value: ref.label,
                position: "right",
                fontSize: 11,
              }}
              stroke={ref.color || "#ef4444"}
              strokeDasharray={ref.dashed !== false ? "5 5" : undefined}
            />
          ))}
          {series.map((s) => (
            <Line
              key={s.dataKey}
              type={curved ? "monotone" : "linear"}
              dataKey={s.dataKey}
              name={s.label}
              stroke={s.color}
              strokeWidth={s.strokeWidth || 2}
              strokeDasharray={s.dashed ? "5 5" : undefined}
              dot={s.dot ?? showDots}
              activeDot={{ r: 5 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
