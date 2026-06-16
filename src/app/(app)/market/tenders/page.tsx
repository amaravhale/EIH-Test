import { KanbanBoard } from "@/components/domain/kanban-board";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { FilterBar } from "@/components/data/filter-bar";
import { Plus, Table as TableIcon, LayoutDashboard } from "lucide-react";

export default function TendersPage() {
  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-theme(spacing.16))]">
      <PageHeader 
        title="Tender Pipeline" 
        description="Track commercial opportunities and bids through the sales lifecycle."
        actions={
          <div className="flex gap-2">
            <div className="flex bg-muted p-1 rounded-md border mr-2">
              <Button variant="ghost" size="sm" className="h-7 px-2 bg-background shadow-sm">
                <LayoutDashboard className="h-4 w-4 mr-2" /> Board
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-muted-foreground">
                <TableIcon className="h-4 w-4 mr-2" /> List
              </Button>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Tender
            </Button>
          </div>
        }
      />
      
      <FilterBar 
        searchPlaceholder="Search tenders by client, title, or tag..."
        filters={[
          {
            id: "sector",
            type: "select",
            label: "Sector",
            options: [
              { label: "Oil & Gas", value: "oil" },
              { label: "Chemicals", value: "chem" },
              { label: "Renewables", value: "renew" }
            ]
          },
          {
            id: "probability",
            type: "select",
            label: "Probability",
            options: [
              { label: "High (>70%)", value: "high" },
              { label: "Medium (30-70%)", value: "med" },
              { label: "Low (<30%)", value: "low" }
            ]
          }
        ]}
      />
      
      <div className="flex-1 min-h-0">
        <KanbanBoard />
      </div>
    </div>
  );
}
