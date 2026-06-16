"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export interface BarChartDataPoint {
  name: string;
  [key: string]: string | number;
}

export interface BarChartSeries {
  dataKey: string;
  label: string;
  color: string;
  stackId?: string;
  radius?: [number, number, number, number];
}

export interface BarChartProps {
  data: BarChartDataPoint[];
  series: BarChartSeries[];
  layout?: "horizontal" | "vertical";
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  height?: number;
  barSize?: number;
  className?: string;
}

export function BarChart({
  data,
  series,
  layout = "horizontal",
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  xAxisLabel,
  yAxisLabel,
  height = 350,
  barSize,
  className,
}: BarChartProps) {
  const isVertical = layout === "vertical";

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          layout={isVertical ? "vertical" : "horizontal"}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              className="text-zinc-200 dark:text-zinc-800"
              vertical={!isVertical}
              horizontal={isVertical}
            />
          )}
          {isVertical ? (
            <>
              <XAxis
                type="number"
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
                dataKey="name"
                type="category"
                width={100}
                tick={{ fontSize: 12, fill: "currentColor" }}
                className="text-zinc-500 dark:text-zinc-400"
              />
            </>
          ) : (
            <>
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
            </>
          )}
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
          {series.map((s) => (
            <Bar
              key={s.dataKey}
              dataKey={s.dataKey}
              name={s.label}
              fill={s.color}
              stackId={s.stackId}
              radius={s.radius || [4, 4, 0, 0]}
              barSize={barSize}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
