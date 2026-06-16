import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye, TrendingUp, TrendingDown, Minus, Briefcase, MapPin, Users } from "lucide-react";
import Link from "next/link";

interface CompetitorCardProps {
  competitor: {
    id: string;
    name: string;
    threatLevel: "low" | "medium" | "high" | "critical";
    sector: string;
    hq: string;
    size: string;
    trend: "up" | "down" | "stable";
    aiSummary: string;
    tags: string[];
  };
}

export function CompetitorCard({ competitor }: CompetitorCardProps) {
  const getThreatColor = (level: string) => {
    switch (level) {
      case "critical": return "destructive";
      case "high": return "warning";
      case "medium": return "secondary";
      default: return "outline";
    }
  };

  return (
    <Card className="flex flex-col h-full hover:border-primary/50 transition-colors">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border">
              <AvatarFallback className="bg-primary/5 text-primary text-lg font-bold">
                {competitor.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{competitor.name}</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <Briefcase className="h-3 w-3" /> {competitor.sector}
              </CardDescription>
            </div>
          </div>
          <Badge variant={getThreatColor(competitor.threatLevel) as any} className="capitalize shadow-sm">
            {competitor.threatLevel} Threat
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 pb-4">
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate">{competitor.hq}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span className="truncate">{competitor.size}</span>
          </div>
        </div>
        
        <div className="bg-muted/50 p-3 rounded-md text-sm mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-xs uppercase text-muted-foreground flex items-center gap-1">
              <SparklesIcon className="h-3 w-3 text-primary" /> AI Summary
            </span>
            {competitor.trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-destructive" />}
            {competitor.trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />}
            {competitor.trend === "stable" && <Minus className="h-3.5 w-3.5 text-muted-foreground" />}
          </div>
          <p className="line-clamp-3 leading-relaxed text-foreground/80">
            {competitor.aiSummary}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {competitor.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-[10px] font-normal bg-background">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button asChild className="w-full" variant="outline">
          <Link href={`/competitors/${competitor.id}`}>
            <Eye className="mr-2 h-4 w-4" />
            View Full Profile
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M19 17v4"/>
      <path d="M3 5h4"/>
      <path d="M17 19h4"/>
    </svg>
  );
}
