import Link from "next/link";

interface CompetitorActivity {
  id: string;
  name: string;
  initials: string;
  color: string;
  threatLevel: "high" | "medium" | "low";
  recentActivity: string;
  activityCount: number;
  trend: "up" | "down" | "stable";
}

// TODO: Replace with Supabase query
// const { data: competitors } = await supabase.from('competitors').select('*').order('threat_score', { ascending: false }).limit(6);
const DEMO_COMPETITORS: CompetitorActivity[] = [
  {
    id: "bae-systems",
    name: "BAE Systems",
    initials: "BA",
    color: "bg-red-500",
    threatLevel: "high",
    recentActivity: "Acquired Nexaris Defence",
    activityCount: 12,
    trend: "up",
  },
  {
    id: "thales",
    name: "Thales UK",
    initials: "TH",
    color: "bg-blue-600",
    threatLevel: "high",
    recentActivity: "New leadership appointment",
    activityCount: 8,
    trend: "up",
  },
  {
    id: "qinetiq",
    name: "QinetiQ",
    initials: "QQ",
    color: "bg-purple-600",
    threatLevel: "medium",
    recentActivity: "Won DSTL framework lot",
    activityCount: 6,
    trend: "stable",
  },
  {
    id: "leonardo",
    name: "Leonardo UK",
    initials: "LE",
    color: "bg-emerald-600",
    threatLevel: "medium",
    recentActivity: "Partnership with Rolls-Royce",
    activityCount: 4,
    trend: "down",
  },
  {
    id: "raytheon",
    name: "Raytheon UK",
    initials: "RT",
    color: "bg-amber-600",
    threatLevel: "low",
    recentActivity: "Opened new Edinburgh office",
    activityCount: 3,
    trend: "stable",
  },
];

const THREAT_BADGES = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
};

const TREND_ICONS = { up: "↑", down: "↓", stable: "→" };
const TREND_COLORS = {
  up: "text-red-500",
  down: "text-green-500",
  stable: "text-muted-foreground",
};

export function CompetitorPulse() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <span>🎯</span> Competitor Pulse
        </h2>
        <Link
          href="/competitors/profiles"
          className="text-xs text-primary hover:text-primary/80"
        >
          View all →
        </Link>
      </div>

      <div className="space-y-2">
        {DEMO_COMPETITORS.map((c) => (
          <Link
            key={c.id}
            href={`/competitors/profiles/${c.id}`}
            className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-accent"
          >
            <div
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${c.color}`}
            >
              {c.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground truncate">
                  {c.name}
                </p>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                    THREAT_BADGES[c.threatLevel]
                  }`}
                >
                  {c.threatLevel}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {c.recentActivity}
              </p>
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
              <span className={`text-sm font-medium ${TREND_COLORS[c.trend]}`}>
                {TREND_ICONS[c.trend]}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {c.activityCount} signals
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
