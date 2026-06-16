import { CompetitorCard } from "@/components/domain/competitor-card";
import { FilterBar } from "@/components/data/filter-bar";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const MOCK_COMPETITORS = [
  {
    id: "comp-1",
    name: "SafeTech Solutions",
    threatLevel: "critical" as const,
    sector: "Oil & Gas Process Safety",
    hq: "Houston, TX",
    size: "500-1000",
    trend: "up" as const,
    aiSummary: "Aggressively expanding in the European market. Recently launched an AI-powered PHA tool that competes directly with our core offering. Strong talent acquisition from top tier firms.",
    tags: ["AI Tools", "Aggressive Growth", "Oil & Gas"]
  },
  {
    id: "comp-2",
    name: "Apex Process Safety",
    threatLevel: "high" as const,
    sector: "Chemical Manufacturing",
    hq: "Frankfurt, Germany",
    size: "100-250",
    trend: "stable" as const,
    aiSummary: "Solidified their hold on the German DAX chemical companies. Their recent acquisition of a boutique environmental consultancy suggests a pivot towards ESG integrated process safety.",
    tags: ["Chemicals", "ESG Pivot", "Europe"]
  },
  {
    id: "comp-3",
    name: "Vanguard Compliance",
    threatLevel: "medium" as const,
    sector: "Offshore Wind",
    hq: "Aberdeen, UK",
    size: "50-100",
    trend: "down" as const,
    aiSummary: "Experiencing executive churn and lost their major contract with North Sea Renewables. Might be a target for acquisition. Their proprietary risk framework is highly regarded despite business struggles.",
    tags: ["Offshore", "Vulnerable", "Strong IP"]
  },
  {
    id: "comp-4",
    name: "Global Risk Partners",
    threatLevel: "low" as const,
    sector: "General HSE",
    hq: "London, UK",
    size: "10,000+",
    trend: "stable" as const,
    aiSummary: "Large generalist firm. Slow moving and bureaucratic, but they have deep pockets and existing relationships at the C-suite level of most Fortune 500s. We usually beat them on deep technical capability.",
    tags: ["Generalist", "Incumbent", "Enterprise"]
  }
];

export default function CompetitorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Competitor Profiles" 
        description="Track and analyze key rivals in the process safety market."
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Competitor
          </Button>
        }
      />
      
      <FilterBar 
        searchPlaceholder="Search competitors by name, sector or location..."
        filters={[
          {
            id: "threat",
            type: "select",
            label: "Threat Level",
            options: [
              { label: "Critical", value: "critical" },
              { label: "High", value: "high" },
              { label: "Medium", value: "medium" },
              { label: "Low", value: "low" }
            ]
          },
          {
            id: "sector",
            type: "select",
            label: "Sector",
            options: [
              { label: "Oil & Gas", value: "oil-and-gas" },
              { label: "Chemicals", value: "chemicals" },
              { label: "Renewables", value: "renewables" },
              { label: "General", value: "general" }
            ]
          }
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_COMPETITORS.map(competitor => (
          <CompetitorCard key={competitor.id} competitor={competitor} />
        ))}
      </div>
    </div>
  );
}
