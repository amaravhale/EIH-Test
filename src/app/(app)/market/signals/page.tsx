import { SignalCard } from "@/components/domain/signal-card";
import { FilterBar } from "@/components/data/filter-bar";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";

const MOCK_SIGNALS = [
  {
    id: "sig-1",
    title: "OSHA Proposes Updates to PSM Standard",
    source: "Federal Register",
    category: "regulation",
    time: "2 hours ago",
    summary: "The Occupational Safety and Health Administration (OSHA) is proposing to update the Process Safety Management (PSM) of Highly Hazardous Chemicals standard to better protect workers...",
    score: 95,
    status: "actionable"
  },
  {
    id: "sig-2",
    title: "SafeTech Wins £2M Contract with North Sea Operator",
    source: "Industry News",
    category: "competitive",
    time: "5 hours ago",
    summary: "SafeTech Solutions has secured a major contract to deploy their AI-driven Process Hazard Analysis tool across 5 offshore platforms in the North Sea...",
    score: 82,
    status: "reviewed"
  },
  {
    id: "sig-3",
    title: "New AI standard for industrial applications drafted by ISO",
    source: "ISO Technical Committee",
    category: "technology",
    time: "1 day ago",
    summary: "A new draft standard outlines requirements for integrating artificial intelligence into safety-critical industrial processes, including specific clauses for process safety management.",
    score: 75,
    status: "discovered"
  },
  {
    id: "sig-4",
    title: "Incident Alert: Explosion at Texas Chemical Plant",
    source: "CSB Alerts",
    category: "industry",
    time: "2 days ago",
    summary: "Chemical Safety Board is investigating an explosion at a petrochemical facility. Initial reports suggest a failure in the pressure relief systems.",
    score: 88,
    status: "actionable"
  }
];

export default function SignalsFeedPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Intelligence Signals Feed" 
        description="Real-time stream of market, competitor, and regulatory signals scored by AI."
        actions={
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button>
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh Feed
            </Button>
          </div>
        }
      />
      
      <FilterBar 
        searchPlaceholder="Search signals..."
        filters={[
          {
            id: "category",
            type: "select",
            label: "Category",
            options: [
              { label: "Regulation", value: "regulation" },
              { label: "Competitive", value: "competitive" },
              { label: "Industry", value: "industry" },
              { label: "Technology", value: "technology" },
              { label: "Tender", value: "tender" }
            ]
          },
          {
            id: "status",
            type: "select",
            label: "Status",
            options: [
              { label: "Discovered", value: "discovered" },
              { label: "Reviewed", value: "reviewed" },
              { label: "Actionable", value: "actionable" }
            ]
          },
          {
            id: "score",
            type: "select",
            label: "Relevance Score",
            options: [
              { label: "90+ (Critical)", value: "90" },
              { label: "75+ (High)", value: "75" },
              { label: "50+ (Medium)", value: "50" }
            ]
          }
        ]}
      />
      
      <div className="space-y-4 max-w-4xl">
        {MOCK_SIGNALS.map(signal => (
          <SignalCard key={signal.id} signal={signal} />
        ))}
      </div>
    </div>
  );
}
