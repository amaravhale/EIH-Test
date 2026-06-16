import Link from "next/link";

interface SignalCategory {
  name: string;
  count: number;
  trend: number;
  color: string;
}

// TODO: Replace with Supabase aggregation query
// const { data } = await supabase.rpc('get_signal_summary', { days: 30 });
const DEMO_CATEGORIES: SignalCategory[] = [
  { name: "Competitor Moves", count: 47, trend: 12, color: "bg-red-500" },
  { name: "Tender Notices", count: 23, trend: -3, color: "bg-blue-500" },
  { name: "Regulatory Changes", count: 15, trend: 5, color: "bg-purple-500" },
  { name: "Technology Shifts", count: 31, trend: 8, color: "bg-emerald-500" },
  { name: "Market Entries", count: 9, trend: 2, color: "bg-amber-500" },
  { name: "Personnel Changes", count: 18, trend: -1, color: "bg-cyan-500" },
];

const TOTAL_SIGNALS = DEMO_CATEGORIES.reduce((acc, c) => acc + c.count, 0);

export function SignalSummary() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <span>📡</span> Signal Summary
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Last 30 days
          </span>
        </h2>
        <Link
          href="/market/signals"
          className="text-xs text-primary hover:text-primary/80"
        >
          View all →
        </Link>
      </div>

      {/* Total count */}
      <div className="mb-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-foreground">
          {TOTAL_SIGNALS}
        </span>
        <span className="text-sm text-muted-foreground">signals detected</span>
        <span className="text-xs font-medium text-green-600">+23 vs prev</span>
      </div>

      {/* Horizontal bar chart */}
      <div className="mb-4 flex h-3 w-full overflow-hidden rounded-full bg-muted">
        {DEMO_CATEGORIES.map((cat) => (
          <div
            key={cat.name}
            className={`${cat.color} transition-all`}
            style={{ width: `${(cat.count / TOTAL_SIGNALS) * 100}%` }}
            title={`${cat.name}: ${cat.count}`}
          />
        ))}
      </div>

      {/* Category breakdown */}
      <div className="grid grid-cols-2 gap-2">
        {DEMO_CATEGORIES.map((cat) => (
          <div
            key={cat.name}
            className="flex items-center gap-2 rounded-md p-2 hover:bg-accent transition-colors"
          >
            <span className={`h-2.5 w-2.5 rounded-full ${cat.color}`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                {cat.name}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-foreground">
                {cat.count}
              </span>
              <span
                className={`text-[10px] font-medium ${
                  cat.trend > 0
                    ? "text-green-600"
                    : cat.trend < 0
                    ? "text-red-600"
                    : "text-muted-foreground"
                }`}
              >
                {cat.trend > 0 ? `+${cat.trend}` : cat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
