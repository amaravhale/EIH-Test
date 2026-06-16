import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, ExternalLink, MessageSquare, ThumbsUp } from "lucide-react";
import Link from "next/link";

interface SignalCardProps {
  signal: {
    id: string;
    title: string;
    source: string;
    category: string;
    time: string;
    summary: string;
    score: number;
    status: string;
  };
}

export function SignalCard({ signal }: SignalCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-destructive font-bold";
    if (score >= 75) return "text-warning font-bold";
    if (score >= 50) return "text-primary font-bold";
    return "text-muted-foreground";
  };

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="capitalize">{signal.category}</Badge>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {signal.time}
              </span>
              <span>•</span>
              <span>{signal.source}</span>
            </div>
            <Link href={`/market/signals/${signal.id}`} className="hover:underline">
              <h3 className="text-lg font-semibold leading-tight">{signal.title}</h3>
            </Link>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-center p-2 bg-muted rounded-md border w-16">
              <span className="text-[10px] uppercase text-muted-foreground block mb-1">Score</span>
              <span className={`text-lg leading-none ${getScoreColor(signal.score)}`}>{signal.score}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-sm text-foreground/80 line-clamp-2">
          {signal.summary}
        </p>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between border-t mt-4 pt-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
            <ThumbsUp className="mr-1.5 h-4 w-4" /> Validate
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
            <MessageSquare className="mr-1.5 h-4 w-4" /> Discuss
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={signal.status === "actionable" ? "default" : "secondary"} className="capitalize">
            {signal.status}
          </Badge>
          <Button variant="outline" size="sm" asChild className="h-8">
            <a href="#" target="_blank">
              <ExternalLink className="mr-1.5 h-4 w-4" /> Source
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
