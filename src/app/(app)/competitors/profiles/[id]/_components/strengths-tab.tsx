interface Strength {
  id: string;
  title: string;
  category: string;
  impact: "critical" | "high" | "medium";
  description: string;
  evidence: string[];
  lastValidated: string;
}

// TODO: Replace with Supabase query
const DEMO_STRENGTHS: Strength[] = [
  {
    id: "1",
    title: "Established MOD relationships",
    category: "Market Position",
    impact: "critical",
    description:
      "Deep, multi-decade relationships with MOD procurement teams. Embedded personnel in key programmes. Preferred supplier status on multiple frameworks.",
    evidence: [
      "Lead contractor on Type 26 frigate programme",
      "Strategic partner in FCAS/Tempest",
      "£4.4B MOD order backlog",
    ],
    lastValidated: "1 week ago",
  },
  {
    id: "2",
    title: "Scale and financial resources",
    category: "Organisation",
    impact: "critical",
    description:
      "Ability to invest significantly in R&D and absorb losses on competitive bids. Financial reserves to sustain long bid cycles typical in defence.",
    evidence: [
      "£23.3B annual revenue",
      "£1.4B annual R&D investment",
      "Strong balance sheet with investment grade credit",
    ],
    lastValidated: "2 weeks ago",
  },
  {
    id: "3",
    title: "Security clearance depth",
    category: "Operations",
    impact: "high",
    description:
      "Large pool of SC and DV cleared personnel. Cleared facilities across the UK. Established processes for rapid clearance of new hires.",
    evidence: [
      "Estimated 15,000+ cleared staff in UK",
      "Multiple STRAP-cleared facilities",
      "Dedicated vetting liaison team",
    ],
    lastValidated: "3 weeks ago",
  },
  {
    id: "4",
    title: "Cross-domain integration expertise",
    category: "Technical",
    impact: "high",
    description:
      "Unique ability to integrate systems across air, land, sea, cyber, and space domains. Proven track record on complex multi-domain programmes.",
    evidence: [
      "Typhoon upgrade programme integration lead",
      "ISTAR systems integration on multiple platforms",
      "Digital twin capability across domains",
    ],
    lastValidated: "1 month ago",
  },
  {
    id: "5",
    title: "Global supply chain leverage",
    category: "Supply Chain",
    impact: "medium",
    description:
      "Extensive global supply chain providing cost advantages and access to international technology. Leverages US and Australian operations.",
    evidence: [
      "Operations in 40+ countries",
      "£7B annual procurement spend",
      "Joint ventures with key subcontractors",
    ],
    lastValidated: "2 months ago",
  },
];

const IMPACT_STYLES = {
  critical: "bg-red-100 text-red-700 border-red-200",
  high: "bg-amber-100 text-amber-700 border-amber-200",
  medium: "bg-blue-100 text-blue-700 border-blue-200",
};

export function StrengthsTab({ competitorId }: { competitorId: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {DEMO_STRENGTHS.length} strengths identified
        </p>
        <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          + Add Strength
        </button>
      </div>

      {DEMO_STRENGTHS.map((strength) => (
        <div
          key={strength.id}
          className="rounded-lg border border-border bg-card p-4"
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">
                  {strength.title}
                </h3>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                    IMPACT_STYLES[strength.impact]
                  }`}
                >
                  {strength.impact} impact
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {strength.category}
              </p>
            </div>
            <span className="text-[10px] text-muted-foreground">
              Validated {strength.lastValidated}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-3">
            {strength.description}
          </p>

          <div className="space-y-1">
            <p className="text-xs font-medium text-foreground">Evidence:</p>
            {strength.evidence.map((e, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-primary mt-0.5">•</span>
                <span>{e}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
