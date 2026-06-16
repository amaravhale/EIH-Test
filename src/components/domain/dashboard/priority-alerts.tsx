import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const ALERTS = [
  {
    id: "1",
    title: "New OSHA Regulation Proposed",
    description: "Proposed changes to Process Safety Management of Highly Hazardous Chemicals.",
    type: "regulation",
    severity: "critical",
    time: "2 hours ago"
  },
  {
    id: "2",
    title: "Competitor Safety Incident",
    description: "Major incident reported at AlphaChem facility in Texas.",
    type: "competitor",
    severity: "high",
    time: "5 hours ago"
  },
  {
    id: "3",
    title: "Key Tender Deadline Approaching",
    description: "European Energy Consortium Process Safety Audit tender due in 3 days.",
    type: "tender",
    severity: "high",
    time: "1 day ago"
  }
];

export function PriorityAlerts() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Priority Alerts
          </CardTitle>
          <Link href="/market/signals" className="text-sm text-primary hover:underline flex items-center">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <CardDescription>Critical signals requiring your immediate attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ALERTS.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-4 rounded-md border p-3">
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{alert.title}</p>
                  <Badge variant={alert.severity === "critical" ? "destructive" : "warning"} className="text-[10px] uppercase">
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {alert.description}
                </p>
                <div className="flex items-center pt-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="mr-2 text-[10px] capitalize">
                    {alert.type}
                  </Badge>
                  <Clock className="mr-1 h-3 w-3" />
                  {alert.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
