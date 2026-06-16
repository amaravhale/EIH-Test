"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface HeatMapCell {
  x: string;
  y: string;
  value: number;
  label?: string;
}

export interface HeatMapProps {
  data: HeatMapCell[];
  xLabels: string[];
  yLabels: string[];
  xAxisTitle?: string;
  yAxisTitle?: string;
  minColor?: string;
  maxColor?: string;
  minValue?: number;
  maxValue?: number;
  showValues?: boolean;
  cellSize?: number;
  className?: string;
  onCellClick?: (cell: HeatMapCell) => void;
}

function interpolateColor(
  min: [number, number, number],
  max: [number, number, number],
  ratio: number
): string {
  const r = Math.round(min[0] + (max[0] - min[0]) * ratio);
  const g = Math.round(min[1] + (max[1] - min[1]) * ratio);
  const b = Math.round(min[2] + (max[2] - min[2]) * ratio);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ];
  }
  return [0, 0, 0];
}

export function HeatMap({
  data,
  xLabels,
  yLabels,
  xAxisTitle,
  yAxisTitle,
  minColor = "#dbeafe",
  maxColor = "#dc2626",
  minValue,
  maxValue,
  showValues = true,
  cellSize = 56,
  className,
  onCellClick,
}: HeatMapProps) {
  const [hoveredCell, setHoveredCell] = useState<HeatMapCell | null>(null);

  const values = data.map((d) => d.value);
  const resolvedMin = minValue ?? Math.min(...values);
  const resolvedMax = maxValue ?? Math.max(...values);
  const range = resolvedMax - resolvedMin || 1;

  const minRgb = hexToRgb(minColor);
  const maxRgb = hexToRgb(maxColor);

  const getCellData = (x: string, y: string): HeatMapCell | undefined => {
    return data.find((d) => d.x === x && d.y === y);
  };

  const getCellColor = (value: number): string => {
    const ratio = Math.max(0, Math.min(1, (value - resolvedMin) / range));
    return interpolateColor(minRgb, maxRgb, ratio);
  };

  const getTextColor = (value: number): string => {
    const ratio = (value - resolvedMin) / range;
    return ratio > 0.5 ? "#ffffff" : "#18181b";
  };

  return (
    <div className={cn("inline-block", className)}>
      {/* Tooltip */}
      {hoveredCell && (
        <div className="mb-2 rounded-md bg-zinc-900 px-3 py-1.5 text-xs text-white dark:bg-zinc-100 dark:text-zinc-900">
          <span className="font-medium">{hoveredCell.y}</span>
          {" × "}
          <span className="font-medium">{hoveredCell.x}</span>
          {": "}
          <span className="font-bold">
            {hoveredCell.label || hoveredCell.value}
          </span>
        </div>
      )}

      <div className="flex">
        {/* Y-axis title */}
        {yAxisTitle && (
          <div className="flex items-center pr-2">
            <span
              className="text-xs font-medium text-zinc-500 dark:text-zinc-400"
              style={{
                writingMode: "vertical-lr",
                transform: "rotate(180deg)",
              }}
            >
              {yAxisTitle}
            </span>
          </div>
        )}

        <div>
          {/* Grid */}
          <div className="flex flex-col gap-1">
            {yLabels.map((yLabel) => (
              <div key={yLabel} className="flex items-center gap-1">
                <span
                  className="text-xs text-zinc-600 dark:text-zinc-400 text-right pr-2 truncate"
                  style={{ width: 80 }}
                >
                  {yLabel}
                </span>
                {xLabels.map((xLabel) => {
                  const cell = getCellData(xLabel, yLabel);
                  const value = cell?.value ?? 0;

                  return (
                    <button
                      key={`${xLabel}-${yLabel}`}
                      className={cn(
                        "flex items-center justify-center rounded-sm text-xs font-medium transition-all",
                        onCellClick && "cursor-pointer hover:ring-2 hover:ring-zinc-400",
                        !onCellClick && "cursor-default"
                      )}
                      style={{
                        width: cellSize,
                        height: cellSize,
                        backgroundColor: cell
                          ? getCellColor(value)
                          : "transparent",
                        color: cell ? getTextColor(value) : "transparent",
                        border: cell
                          ? "none"
                          : "1px dashed var(--color-zinc-300)",
                      }}
                      onMouseEnter={() => cell && setHoveredCell(cell)}
                      onMouseLeave={() => setHoveredCell(null)}
                      onClick={() => cell && onCellClick?.(cell)}
                    >
                      {showValues && cell
                        ? cell.label || cell.value
                        : ""}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="flex gap-1 mt-1" style={{ marginLeft: 80 + 4 }}>
            {xLabels.map((label) => (
              <div
                key={label}
                className="text-xs text-zinc-600 dark:text-zinc-400 text-center truncate"
                style={{ width: cellSize }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* X-axis title */}
          {xAxisTitle && (
            <div className="text-center mt-2" style={{ marginLeft: 80 }}>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {xAxisTitle}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-2" style={{ marginLeft: 80 }}>
        <span className="text-[10px] text-zinc-500">{resolvedMin}</span>
        <div
          className="h-3 flex-1 rounded-sm"
          style={{
            maxWidth: 200,
            background: `linear-gradient(to right, ${minColor}, ${maxColor})`,
          }}
        />
        <span className="text-[10px] text-zinc-500">{resolvedMax}</span>
      </div>
    </div>
  );
}
