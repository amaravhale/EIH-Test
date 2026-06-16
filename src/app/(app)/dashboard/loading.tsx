export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-64 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-80 animate-pulse rounded bg-muted" />
        </div>
      </div>

      {/* Alerts skeleton */}
      <div className="rounded-lg border border-border p-4">
        <div className="h-5 w-32 animate-pulse rounded bg-muted" />
        <div className="mt-3 space-y-2">
          <div className="h-12 animate-pulse rounded bg-muted" />
          <div className="h-12 animate-pulse rounded bg-muted" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="h-64 animate-pulse rounded-lg border border-border bg-muted" />
          <div className="h-64 animate-pulse rounded-lg border border-border bg-muted" />
        </div>
        <div className="space-y-6">
          <div className="h-64 animate-pulse rounded-lg border border-border bg-muted" />
          <div className="h-48 animate-pulse rounded-lg border border-border bg-muted" />
        </div>
      </div>
    </div>
  );
}
