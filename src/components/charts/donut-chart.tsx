"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export interface DonutChartDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface DonutChartProps {
  data: DonutChartDataPoint[];
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  showLabels?: boolean;
  centerLabel?: string;
  centerValue?: string;
  height?: number;
  className?: string;
}

export function DonutChart({
  data,
  innerRadius = 60,
  outerRadius = 90,
  showLegend = true,
  showTooltip = true,
  showLabels = false,
  centerLabel,
  centerValue,
  height = 300,
  className,
}: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius: ir,
    outerRadius: or,
    percent,
    name,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    name: string;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = or + 25;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    return (
      <text
        x={x}
        y={y}
        fill="currentColor"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs text-zinc-600 dark:text-zinc-400"
      >
        {name} ({(percent * 100).toFixed(0)}%)
      </text>
    );
  };

  return (
    <div className={cn("w-full relative", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey="value"
            stroke="none"
            label={showLabels ? renderCustomLabel : undefined}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {showTooltip && (
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value} (${((value / total) * 100).toFixed(1)}%)`,
                name,
              ]}
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
              formatter={(value: string) => (
                <span className="text-zinc-700 dark:text-zinc-300">
                  {value}
                </span>
              )}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center" style={{ marginBottom: showLegend ? 30 : 0 }}>
            {centerValue && (
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {centerValue}
              </p>
            )}
            {centerLabel && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {centerLabel}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
