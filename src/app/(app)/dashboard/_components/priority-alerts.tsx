import Link from "next/link";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  source: string;
  timestamp: string;
  actionUrl: string;
}

// TODO: Replace with Supabase query
// const { data: alerts } = await supabase.from('alerts').select('*').eq('dismissed', false).order('severity', { ascending: true }).limit(5);
const DEMO_ALERTS: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "BAE Systems acquires cybersecurity firm Nexaris",
    description:
      "BAE Systems announced the acquisition of Nexaris Defence for £340M, expanding their cyber capabilities in the MOD market segment.",
    source: "Companies House",
    timestamp: "2 hours ago",
    actionUrl: "/competitors/profiles/bae-systems",
  },
  {
    id: "2",
    type: "warning",
    title: "New MOD framework tender: DSTL Research Programme",
    description:
      "Defence Science and Technology Laboratory published a £120M research framework covering AI, autonomy, and sensor fusion.",
    source: "Contracts Finder",
    timestamp: "5 hours ago",
    actionUrl: "/market/tenders/dstl-research",
  },
  {
    id: "3",
    type: "info",
    title: "Thales UK restructures leadership team",
    description:
      "Thales UK appointed new VP of Defence & Security, signalling potential strategy shift in ground systems.",
    source: "LinkedIn",
    timestamp: "1 day ago",
    actionUrl: "/competitors/profiles/thales",
  },
];

const TYPE_STYLES = {
  critical: {
    bg: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
  warning: {
    bg: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
  info: {
    bg: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
  },
};

export function PriorityAlerts() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <span>🔔</span> Priority Alerts
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
            {DEMO_ALERTS.length}
          </span>
        </h2>
        <Link
          href="/market/signals"
          className="text-xs text-primary hover:text-primary/80"
        >
          View all →
        </Link>
      </div>

      <div className="space-y-2">
        {DEMO_ALERTS.map((alert) => {
          const styles = TYPE_STYLES[alert.type];
          return (
            <Link
              key={alert.id}
              href={alert.actionUrl}
              className={`block rounded-md border p-3 transition-colors hover:shadow-sm ${styles.bg}`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${styles.dot}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {alert.title}
                    </p>
                    <span
                      className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${styles.badge}`}
                    >
                      {alert.type}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                    {alert.description}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span>{alert.source}</span>
                    <span>·</span>
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
