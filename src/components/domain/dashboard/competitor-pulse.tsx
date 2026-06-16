import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import Link from "next/link";

const COMPETITORS = [
  {
    id: "1",
    name: "SafeTech Solutions",
    threatLevel: "critical",
    trend: "up",
    recentActivity: "Launched new AI-driven HSE software",
  },
  {
    id: "2",
    name: "Apex Process Safety",
    threatLevel: "high",
    trend: "stable",
    recentActivity: "Acquired smaller consultancy in Germany",
  },
  {
    id: "3",
    name: "Vanguard Compliance",
    threatLevel: "medium",
    trend: "down",
    recentActivity: "Lost major contract in offshore sector",
  }
];

export function CompetitorPulse() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Competitor Pulse</CardTitle>
          <Link href="/competitors" className="text-sm text-primary hover:underline">
            Full analysis
          </Link>
        </div>
        <CardDescription>Recent movements from key rivals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {COMPETITORS.map((competitor) => (
            <div key={competitor.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {competitor.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{competitor.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{competitor.recentActivity}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={
                    competitor.threatLevel === "critical" ? "destructive" : 
                    competitor.threatLevel === "high" ? "warning" : "default"
                  } 
                  className="text-[10px] capitalize"
                >
                  {competitor.threatLevel}
                </Badge>
                {competitor.trend === "up" && <TrendingUp className="h-4 w-4 text-destructive" />}
                {competitor.trend === "down" && <TrendingDown className="h-4 w-4 text-emerald-500" />}
                {competitor.trend === "stable" && <Minus className="h-4 w-4 text-muted-foreground" />}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
