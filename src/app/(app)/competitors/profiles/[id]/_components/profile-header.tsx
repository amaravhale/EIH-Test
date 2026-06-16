import Link from "next/link";

interface CompetitorData {
  id: string;
  name: string;
  initials: string;
  color: string;
  sector: string;
  headquarters: string;
  employees: string;
  revenue: string;
  founded: string;
  ceo: string;
  website: string;
  threatLevel: "high" | "medium" | "low";
  overlapScore: number;
  description: string;
  tags: string[];
}

const THREAT_BADGES = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
};

export function ProfileHeader({ competitor }: { competitor: CompetitorData }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white ${competitor.color}`}
          >
            {competitor.initials}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-foreground">
                {competitor.name}
              </h2>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  THREAT_BADGES[competitor.threatLevel]
                }`}
              >
                {competitor.threatLevel} threat
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{competitor.sector}</p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {competitor.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="rounded-md border border-input px-3 py-1.5 text-sm text-foreground hover:bg-accent transition-colors">
            Export PDF
          </button>
          <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            AI Analysis
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {competitor.description}
      </p>

      {/* Stats grid */}
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="rounded-md border border-border p-3 text-center">
          <p className="text-lg font-bold text-foreground">
            {competitor.revenue}
          </p>
          <p className="text-xs text-muted-foreground">Revenue</p>
        </div>
        <div className="rounded-md border border-border p-3 text-center">
          <p className="text-lg font-bold text-foreground">
            {competitor.employees}
          </p>
          <p className="text-xs text-muted-foreground">Employees</p>
        </div>
        <div className="rounded-md border border-border p-3 text-center">
          <p className="text-lg font-bold text-foreground">
            {competitor.overlapScore}%
          </p>
          <p className="text-xs text-muted-foreground">Market Overlap</p>
        </div>
        <div className="rounded-md border border-border p-3 text-center">
          <p className="text-lg font-bold text-foreground">
            {competitor.founded}
          </p>
          <p className="text-xs text-muted-foreground">Founded</p>
        </div>
        <div className="rounded-md border border-border p-3 text-center">
          <p className="text-lg font-bold text-foreground">{competitor.ceo}</p>
          <p className="text-xs text-muted-foreground">CEO</p>
        </div>
      </div>
    </div>
  );
}
