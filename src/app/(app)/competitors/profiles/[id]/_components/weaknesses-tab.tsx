interface Weakness {
  id: string;
  title: string;
  category: string;
  exploitability: "high" | "medium" | "low";
  description: string;
  implications: string[];
  lastValidated: string;
}

// TODO: Replace with Supabase query
const DEMO_WEAKNESSES: Weakness[] = [
  {
    id: "1",
    title: "Bureaucratic decision-making",
    category: "Organisation",
    exploitability: "high",
    description:
      "Large corporate structure leads to slow decision-making and inability to respond quickly to customer requirements. Multiple approval layers delay proposals.",
    implications: [
      "Opportunity to position as more agile on rapid procurement",
      "Can undercut on timeline for smaller programmes",
      "SME partnerships can exploit this gap",
    ],
    lastValidated: "2 weeks ago",
  },
  {
    id: "2",
    title: "Over-reliance on MOD revenue",
    category: "Market Position",
    exploitability: "medium",
    description:
      "Heavy dependence on MOD contracts (60%+ UK revenue) creates vulnerability to budget cuts and political changes. Limited diversification into commercial.",
    implications: [
      "Position strength in dual-use and commercial sectors",
      "Highlight risk to customer of single-supplier dependency",
    ],
    lastValidated: "1 month ago",
  },
  {
    id: "3",
    title: "Legacy technology debt",
    category: "Technical",
    exploitability: "high",
    description:
      "Significant legacy system portfolio creates maintenance burden and slows adoption of modern cloud-native and AI technologies.",
    implications: [
      "Emphasise modern tech stack in bids",
      "Highlight cost of legacy system migration",
      "Position cloud-native solutions as lower TCO",
    ],
    lastValidated: "3 weeks ago",
  },
  {
    id: "4",
    title: "Talent retention challenges",
    category: "People",
    exploitability: "medium",
    description:
      "Struggling to retain skilled engineers and technologists, particularly in AI/ML, cloud, and cybersecurity. Below-market compensation in some areas.",
    implications: [
      "Recruit from their talent pool",
      "Highlight team stability in proposals",
      "Showcase specialist expertise retention",
    ],
    lastValidated: "1 month ago",
  },
  {
    id: "5",
    title: "Cost overrun history",
    category: "Delivery",
    exploitability: "medium",
    description:
      "Track record of cost overruns on major programmes (Ajax, Type 26 delays). Reputational risk with procurement officers.",
    implications: [
      "Emphasise delivery track record in bids",
      "Offer fixed-price alternatives where possible",
      "Reference specific delivery successes",
    ],
    lastValidated: "2 months ago",
  },
];

const EXPLOITABILITY_STYLES = {
  high: "bg-green-100 text-green-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-slate-100 text-slate-700",
};

export function WeaknessesTab({ competitorId }: { competitorId: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {DEMO_WEAKNESSES.length} weaknesses identified
        </p>
        <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          + Add Weakness
        </button>
      </div>

      {DEMO_WEAKNESSES.map((weakness) => (
        <div
          key={weakness.id}
          className="rounded-lg border border-border bg-card p-4"
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">
                  {weakness.title}
                </h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    EXPLOITABILITY_STYLES[weakness.exploitability]
                  }`}
                >
                  {weakness.exploitability} exploitability
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {weakness.category}
              </p>
            </div>
            <span className="text-[10px] text-muted-foreground">
              Validated {weakness.lastValidated}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-3">
            {weakness.description}
          </p>

          <div className="space-y-1">
            <p className="text-xs font-medium text-foreground">
              Strategic Implications:
            </p>
            {weakness.implications.map((impl, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs text-muted-foreground"
              >
                <span className="text-green-600 mt-0.5">→</span>
                <span>{impl}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
