"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { SortHeader, type SortDirection } from "./sort-header";
import { Pagination } from "./pagination";
import { BulkActionBar, type BulkAction } from "./bulk-action-bar";
import { EmptyState } from "@/components/feedback/empty-state";
import { LoadingSpinner } from "@/components/feedback/loading-spinner";
import { ChevronDown, ChevronRight } from "lucide-react";

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  accessorFn?: (row: T) => React.ReactNode;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  pinned?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyField: keyof T;
  selectable?: boolean;
  expandable?: boolean;
  expandedContent?: (row: T) => React.ReactNode;
  sortable?: boolean;
  paginated?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  bulkActions?: BulkAction[];
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
  onRowClick?: (row: T) => void;
  stickyHeader?: boolean;
  striped?: boolean;
  compact?: boolean;
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  keyField,
  selectable = false,
  expandable = false,
  expandedContent,
  sortable = true,
  paginated = true,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  bulkActions = [],
  loading = false,
  emptyTitle = "No data found",
  emptyDescription = "No records match your current filters.",
  emptyAction,
  onRowClick,
  stickyHeader = false,
  striped = false,
  compact = false,
  className,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    const col = columns.find((c) => c.id === sortColumn);
    if (!col) return data;

    return [...data].sort((a, b) => {
      let aVal: unknown;
      let bVal: unknown;

      if (col.accessorKey) {
        aVal = a[col.accessorKey];
        bVal = b[col.accessorKey];
      } else if (col.accessorFn) {
        aVal = col.accessorFn(a);
        bVal = col.accessorFn(b);
      } else {
        return 0;
      }

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const cmp =
        typeof aVal === "number" && typeof bVal === "number"
          ? aVal - bVal
          : String(aVal).localeCompare(String(bVal));

      return sortDirection === "asc" ? cmp : -cmp;
    });
  }, [data, sortColumn, sortDirection, columns]);

  // Paginate
  const totalItems = sortedData.length;
  const totalPages = paginated ? Math.ceil(totalItems / pageSize) : 1;
  const displayData = paginated
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  // Selection
  const allSelected =
    displayData.length > 0 &&
    displayData.every((row) =>
      selectedKeys.has(String(row[keyField]))
    );
  const someSelected =
    !allSelected &&
    displayData.some((row) =>
      selectedKeys.has(String(row[keyField]))
    );

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedKeys(new Set());
    } else {
      const newKeys = new Set(
        displayData.map((row) => String(row[keyField]))
      );
      setSelectedKeys(newKeys);
    }
  };

  const toggleSelectRow = (key: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const toggleExpand = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      if (sortDirection === "asc") setSortDirection("desc");
      else if (sortDirection === "desc") {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(columnId);
      setSortDirection("asc");
    }
  };

  const getCellValue = (row: T, col: ColumnDef<T>): React.ReactNode => {
    if (col.cell) return col.cell(row);
    if (col.accessorFn) return col.accessorFn(row);
    if (col.accessorKey) return String(row[col.accessorKey] ?? "");
    return "";
  };

  const getSelectedRows = (): T[] =>
    data.filter((row) => selectedKeys.has(String(row[keyField])));

  const colSpan =
    columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner size="lg" label="Loading data..." />
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Bulk action bar */}
      {selectable && selectedKeys.size > 0 && bulkActions.length > 0 && (
        <BulkActionBar
          selectedCount={selectedKeys.size}
          actions={bulkActions}
          onAction={(actionId) => {
            const action = bulkActions.find((a) => a.id === actionId);
            action?.onAction?.(getSelectedRows());
          }}
          onClearSelection={() => setSelectedKeys(new Set())}
          className="mb-2"
        />
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full border-collapse text-left text-sm">
          <thead
            className={cn(
              "bg-zinc-50 dark:bg-zinc-900/50",
              stickyHeader && "sticky top-0 z-10"
            )}
          >
            <tr>
              {expandable && (
                <th className="w-8 px-2 py-3" />
              )}
              {selectable && (
                <th className="w-10 px-3 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected;
                    }}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-600"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={cn(
                    "px-4 font-medium text-zinc-600 dark:text-zinc-400",
                    compact ? "py-2" : "py-3",
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right"
                  )}
                  style={{ width: col.width }}
                >
                  {sortable && col.sortable !== false ? (
                    <SortHeader
                      label={col.header}
                      active={sortColumn === col.id}
                      direction={
                        sortColumn === col.id ? sortDirection : null
                      }
                      onSort={() => handleSort(col.id)}
                    />
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {displayData.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="px-4 py-8">
                  <EmptyState
                    title={emptyTitle}
                    description={emptyDescription}
                    action={emptyAction}
                  />
                </td>
              </tr>
            ) : (
              displayData.map((row, i) => {
                const key = String(row[keyField]);
                const isSelected = selectedKeys.has(key);
                const isExpanded = expandedKeys.has(key);

                return (
                  <React.Fragment key={key}>
                    <tr
                      className={cn(
                        "transition-colors",
                        onRowClick &&
                          "cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
                        isSelected &&
                          "bg-blue-50/50 dark:bg-blue-950/20",
                        striped &&
                          i % 2 === 1 &&
                          "bg-zinc-50/50 dark:bg-zinc-900/30"
                      )}
                      onClick={() => onRowClick?.(row)}
                    >
                      {expandable && (
                        <td className="w-8 px-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(key);
                            }}
                            className="rounded p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                          >
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </button>
                        </td>
                      )}
                      {selectable && (
                        <td className="w-10 px-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleSelectRow(key);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-600"
                          />
                        </td>
                      )}
                      {columns.map((col) => (
                        <td
                          key={col.id}
                          className={cn(
                            "px-4 text-zinc-900 dark:text-zinc-100",
                            compact ? "py-2" : "py-3",
                            col.align === "center" && "text-center",
                            col.align === "right" && "text-right"
                          )}
                        >
                          {getCellValue(row, col)}
                        </td>
                      ))}
                    </tr>
                    {expandable && isExpanded && expandedContent && (
                      <tr>
                        <td
                          colSpan={colSpan}
                          className="bg-zinc-50 px-4 py-4 dark:bg-zinc-900/30"
                        >
                          {expandedContent(row)}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginated && totalItems > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="rounded border border-zinc-300 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span>
              {(currentPage - 1) * pageSize + 1}–
              {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
            </span>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
