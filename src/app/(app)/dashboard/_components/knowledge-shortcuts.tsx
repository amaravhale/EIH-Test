import Link from "next/link";

interface QuickAction {
  icon: string;
  label: string;
  description: string;
  href: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    icon: "💬",
    label: "Ask a question",
    description: "Query your intelligence knowledge base",
    href: "/knowledge/new",
  },
  {
    icon: "📊",
    label: "Compare competitors",
    description: "Side-by-side competitor analysis",
    href: "/competitors/compare",
  },
  {
    icon: "✍️",
    label: "Generate content",
    description: "Create thought leadership pieces",
    href: "/content/ideas",
  },
  {
    icon: "📡",
    label: "Scan market",
    description: "Latest signals and opportunities",
    href: "/market/signals",
  },
];

interface RecentQuery {
  id: string;
  question: string;
  timestamp: string;
}

// TODO: Replace with Supabase query
// const { data: recentQueries } = await supabase.from('conversations').select('id, title, updated_at').order('updated_at', { ascending: false }).limit(3);
const DEMO_RECENT: RecentQuery[] = [
  {
    id: "conv-1",
    question: "What are BAE Systems' key cyber capabilities?",
    timestamp: "2h ago",
  },
  {
    id: "conv-2",
    question: "Summarise MOD procurement trends for FY25/26",
    timestamp: "1d ago",
  },
  {
    id: "conv-3",
    question: "Compare our AI offering vs Thales and QinetiQ",
    timestamp: "3d ago",
  },
];

export function KnowledgeShortcuts() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <span>🧠</span> Quick Actions
        </h2>
        <Link
          href="/knowledge"
          className="text-xs text-primary hover:text-primary/80"
        >
          Open assistant →
        </Link>
      </div>

      {/* Quick action buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {QUICK_ACTIONS.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="rounded-md border border-border p-2 text-center transition-colors hover:bg-accent hover:border-primary/30"
          >
            <div className="text-lg">{action.icon}</div>
            <p className="mt-0.5 text-xs font-medium text-foreground">
              {action.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent queries */}
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Recent queries
        </p>
        <div className="space-y-1">
          {DEMO_RECENT.map((query) => (
            <Link
              key={query.id}
              href={`/knowledge/${query.id}`}
              className="flex items-center gap-2 rounded-md p-1.5 text-xs transition-colors hover:bg-accent"
            >
              <span className="text-muted-foreground">💬</span>
              <span className="flex-1 truncate text-foreground">
                {query.question}
              </span>
              <span className="flex-shrink-0 text-[10px] text-muted-foreground">
                {query.timestamp}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
