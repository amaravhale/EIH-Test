import { KanbanCard } from "@/components/domain/kanban-card";

interface KanbanColumnProps {
  title: string;
  count: number;
  value: string;
  items: any[];
}

export function KanbanColumn({ title, count, value, items }: KanbanColumnProps) {
  return (
    <div className="flex flex-col h-full bg-muted/30 rounded-lg border">
      <div className="p-3 border-b bg-muted/50 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">{title}</h3>
          <span className="bg-background text-muted-foreground text-xs px-2 py-0.5 rounded-full border">
            {count}
          </span>
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {value}
        </span>
      </div>
      
      <div className="p-3 flex-1 overflow-y-auto">
        {items.map(item => (
          <KanbanCard key={item.id} tender={item} />
        ))}
      </div>
    </div>
  );
}
