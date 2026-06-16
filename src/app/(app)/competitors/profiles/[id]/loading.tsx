export default function CompetitorProfileLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="rounded-lg border border-border p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 animate-pulse rounded-full bg-muted" />
          <div className="space-y-2">
            <div className="h-6 w-48 animate-pulse rounded bg-muted" />
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded bg-muted" />
          ))}
        </div>
      </div>
      {/* Tabs skeleton */}
      <div className="h-8 w-80 animate-pulse rounded bg-muted" />
      {/* Content skeleton */}
      <div className="h-96 animate-pulse rounded-lg border border-border bg-muted" />
    </div>
  );
}
