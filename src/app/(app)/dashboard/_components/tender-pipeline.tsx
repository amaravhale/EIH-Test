import Link from "next/link";

interface Tender {
  id: string;
  title: string;
  buyer: string;
  value: string;
  deadline: string;
  daysLeft: number;
  stage: "identified" | "qualifying" | "bidding" | "submitted" | "won" | "lost";
  matchScore: number;
}

// TODO: Replace with Supabase query
// const { data: tenders } = await supabase.from('tenders').select('*').in('stage', ['identified','qualifying','bidding']).order('deadline').limit(8);
const DEMO_TENDERS: Tender[] = [
  {
    id: "dstl-research",
    title: "DSTL Research Framework - AI & Autonomy",
    buyer: "DSTL",
    value: "£120M",
    deadline: "2026-07-15",
    daysLeft: 30,
    stage: "qualifying",
    matchScore: 92,
  },
  {
    id: "mod-cyber",
    title: "MOD Cyber Defence Operations",
    buyer: "Ministry of Defence",
    value: "£85M",
    deadline: "2026-08-01",
    daysLeft: 47,
    stage: "identified",
    matchScore: 88,
  },
  {
    id: "nhs-data",
    title: "NHS Data Platform Modernisation",
    buyer: "NHS Digital",
    value: "£45M",
    deadline: "2026-07-20",
    daysLeft: 35,
    stage: "bidding",
    matchScore: 75,
  },
  {
    id: "hmrc-analytics",
    title: "HMRC Advanced Analytics Suite",
    buyer: "HMRC",
    value: "£30M",
    deadline: "2026-06-30",
    daysLeft: 15,
    stage: "bidding",
    matchScore: 71,
  },
  {
    id: "police-comms",
    title: "National Police Communications Upgrade",
    buyer: "Home Office",
    value: "£200M",
    deadline: "2026-09-15",
    daysLeft: 92,
    stage: "identified",
    matchScore: 65,
  },
];

const STAGE_STYLES: Record<string, string> = {
  identified: "bg-slate-100 text-slate-700",
  qualifying: "bg-blue-100 text-blue-700",
  bidding: "bg-amber-100 text-amber-700",
  submitted: "bg-purple-100 text-purple-700",
  won: "bg-green-100 text-green-700",
  lost: "bg-red-100 text-red-700",
};

export function TenderPipeline() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <span>📋</span> Tender Pipeline
        </h2>
        <Link
          href="/market/tenders"
          className="text-xs text-primary hover:text-primary/80"
        >
          View all →
        </Link>
      </div>

      {/* Pipeline summary */}
      <div className="mb-4 grid grid-cols-4 gap-2">
        {["identified", "qualifying", "bidding", "submitted"].map((stage) => {
          const count = DEMO_TENDERS.filter((t) => t.stage === stage).length;
          return (
            <div
              key={stage}
              className="rounded-md border border-border p-2 text-center"
            >
              <div className="text-lg font-bold text-foreground">{count}</div>
              <div className="text-[10px] capitalize text-muted-foreground">
                {stage}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tender list */}
      <div className="space-y-2">
        {DEMO_TENDERS.map((tender) => (
          <Link
            key={tender.id}
            href={`/market/tenders/${tender.id}`}
            className="flex items-center gap-3 rounded-md border border-border p-3 transition-colors hover:bg-accent"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {tender.title}
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{tender.buyer}</span>
                <span>·</span>
                <span className="font-medium text-foreground">
                  {tender.value}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
                  STAGE_STYLES[tender.stage]
                }`}
              >
                {tender.stage}
              </span>
              <span
                className={`text-[10px] ${
                  tender.daysLeft <= 14
                    ? "font-medium text-red-600"
                    : "text-muted-foreground"
                }`}
              >
                {tender.daysLeft}d left
              </span>
            </div>
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {tender.matchScore}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
