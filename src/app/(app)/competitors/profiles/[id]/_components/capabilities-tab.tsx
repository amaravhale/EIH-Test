interface Capability {
  id: string;
  name: string;
  category: string;
  maturity: "emerging" | "developing" | "mature" | "leading";
  description: string;
  evidenceCount: number;
}

// TODO: Replace with Supabase query
// const { data } = await supabase.from('competitor_capabilities').select('*').eq('competitor_id', competitorId);
const DEMO_CAPABILITIES: Capability[] = [
  {
    id: "1",
    name: "Cybersecurity Operations",
    category: "Cyber",
    maturity: "leading",
    description:
      "Full-spectrum cyber capabilities including offensive, defensive, and intelligence operations. Operates dedicated Security Operations Centres.",
    evidenceCount: 23,
  },
  {
    id: "2",
    name: "Autonomous Systems",
    category: "AI & Autonomy",
    maturity: "mature",
    description:
      "Development of unmanned aerial, ground, and maritime vehicles with advanced autonomy. Tempest programme includes AI-enabled decision support.",
    evidenceCount: 18,
  },
  {
    id: "3",
    name: "Electronic Warfare",
    category: "EW",
    maturity: "leading",
    description:
      "Advanced EW suites for land, sea, and air platforms. Includes signal intelligence, jamming, and electronic protection measures.",
    evidenceCount: 15,
  },
  {
    id: "4",
    name: "AI & Machine Learning",
    category: "AI & Autonomy",
    maturity: "developing",
    description:
      "Growing AI capabilities in predictive maintenance, intelligence analysis, and decision support. Invested in dedicated AI research lab.",
    evidenceCount: 12,
  },
  {
    id: "5",
    name: "Cloud & Digital Services",
    category: "Digital",
    maturity: "developing",
    description:
      "Expanding cloud-native services for defence, including secure cloud hosting and digital engineering platforms.",
    evidenceCount: 8,
  },
  {
    id: "6",
    name: "Systems Integration",
    category: "Engineering",
    maturity: "leading",
    description:
      "World-class capability in integrating complex defence systems across air, land, sea, and cyber domains.",
    evidenceCount: 31,
  },
];

const MATURITY_STYLES = {
  emerging: { bg: "bg-slate-100 text-slate-700", width: "w-1/4" },
  developing: { bg: "bg-blue-100 text-blue-700", width: "w-2/4" },
  mature: { bg: "bg-amber-100 text-amber-700", width: "w-3/4" },
  leading: { bg: "bg-green-100 text-green-700", width: "w-full" },
};

export function CapabilitiesTab({ competitorId }: { competitorId: string }) {
  const categories = [...new Set(DEMO_CAPABILITIES.map((c) => c.category))];

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex gap-4">
        <div className="rounded-md border border-border p-3 text-center flex-1">
          <p className="text-2xl font-bold text-foreground">
            {DEMO_CAPABILITIES.length}
          </p>
          <p className="text-xs text-muted-foreground">Total Capabilities</p>
        </div>
        <div className="rounded-md border border-border p-3 text-center flex-1">
          <p className="text-2xl font-bold text-foreground">
            {DEMO_CAPABILITIES.filter((c) => c.maturity === "leading").length}
          </p>
          <p className="text-xs text-muted-foreground">Leading</p>
        </div>
        <div className="rounded-md border border-border p-3 text-center flex-1">
          <p className="text-2xl font-bold text-foreground">{categories.length}</p>
          <p className="text-xs text-muted-foreground">Categories</p>
        </div>
      </div>

      {/* Capabilities list */}
      <div className="space-y-3">
        {DEMO_CAPABILITIES.map((cap) => {
          const maturity = MATURITY_STYLES[cap.maturity];
          return (
            <div
              key={cap.id}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">
                      {cap.name}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${maturity.bg}`}
                    >
                      {cap.maturity}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{cap.category}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {cap.evidenceCount} evidence items
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {cap.description}
              </p>
              {/* Maturity bar */}
              <div className="h-1.5 w-full rounded-full bg-muted">
                <div
                  className={`h-1.5 rounded-full bg-primary transition-all ${maturity.width}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
