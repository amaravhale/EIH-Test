import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MoreHorizontal, Calendar, DollarSign } from "lucide-react";
import Link from "next/link";

interface KanbanCardProps {
  tender: {
    id: string;
    title: string;
    client: string;
    value: string;
    deadline: string;
    probability: number;
    tags: string[];
  };
}

export function KanbanCard({ tender }: KanbanCardProps) {
  const getProbabilityColor = (prob: number) => {
    if (prob >= 75) return "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10";
    if (prob >= 40) return "text-warning bg-warning/10";
    return "text-destructive bg-destructive/10";
  };

  return (
    <Card className="mb-3 cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
      <CardHeader className="p-3 pb-0 flex flex-row items-start justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] font-normal mb-1">
            {tender.client}
          </Badge>
          <Link href={`/market/tenders/${tender.id}`} className="block hover:underline">
            <h4 className="text-sm font-semibold leading-tight line-clamp-2">
              {tender.title}
            </h4>
          </Link>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </CardHeader>
      
      <CardContent className="p-3 pb-2 pt-2">
        <div className="flex flex-wrap gap-1 mb-2">
          {tender.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-[9px] px-1.5 py-0">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
          <span className="flex items-center">
            <DollarSign className="h-3 w-3 mr-0.5" />
            {tender.value}
          </span>
          <span className={`px-1.5 py-0.5 rounded-sm font-medium ${getProbabilityColor(tender.probability)}`}>
            {tender.probability}% Win
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-3 pt-0 text-xs text-muted-foreground flex items-center border-t mt-2 pt-2">
        <Calendar className="h-3 w-3 mr-1" />
        Due: {tender.deadline}
      </CardFooter>
    </Card>
  );
}
