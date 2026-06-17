import { CompetitorPulse } from "./_components/competitor-pulse";
import { KnowledgeShortcuts } from "./_components/knowledge-shortcuts";
import { PriorityAlerts } from "./_components/priority-alerts";
import { SignalSummary } from "./_components/signal-summary";
import { TenderPipeline } from "./_components/tender-pipeline";

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Overview Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Real-time intelligence across competitors, signals, and active tenders.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PriorityAlerts />
          <SignalSummary />
          <TenderPipeline />
        </div>
        <div className="space-y-6">
          <CompetitorPulse />
          <KnowledgeShortcuts />
        </div>
      </div>
    </div>
  );
}
