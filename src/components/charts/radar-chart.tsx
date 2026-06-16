"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export interface RadarChartDataPoint {
  subject: string;
  [key: string]: string | number;
}

export interface RadarChartSeries {
  dataKey: string;
  label: string;
  color: string;
  fillOpacity?: number;
}

export interface RadarChartProps {
  data: RadarChartDataPoint[];
  series: RadarChartSeries[];
  maxValue?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  height?: number;
  className?: string;
}

export function RadarChart({
  data,
  series,
  maxValue = 100,
  showLegend = true,
  showTooltip = true,
  height = 350,
  className,
}: RadarChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid
            stroke="currentColor"
            className="text-zinc-200 dark:text-zinc-700"
          />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fontSize: 12,
              fill: "currentColor",
            }}
            className="text-zinc-600 dark:text-zinc-400"
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, maxValue]}
            tick={{ fontSize: 10, fill: "currentColor" }}
            className="text-zinc-400 dark:text-zinc-500"
          />
          {series.map((s) => (
            <Radar
              key={s.dataKey}
              name={s.label}
              dataKey={s.dataKey}
              stroke={s.color}
              fill={s.color}
              fillOpacity={s.fillOpacity ?? 0.2}
              strokeWidth={2}
            />
          ))}
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
          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: "12px" }}
            />
          )}
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
