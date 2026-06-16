import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const PIPELINE = [
  {
    stage: "Qualification",
    count: 12,
    value: "£4.2M",
    percent: 100
  },
  {
    stage: "Proposal Creation",
    count: 5,
    value: "£1.8M",
    percent: 60
  },
  {
    stage: "Submitted / Awaiting",
    count: 3,
    value: "£850k",
    percent: 30
  },
  {
    stage: "Shortlisted",
    count: 2,
    value: "£1.2M",
    percent: 15
  }
];

export function TenderPipeline() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Tender Pipeline</CardTitle>
          <Link href="/market/tenders" className="text-sm text-primary hover:underline">
            View Kanban
          </Link>
        </div>
        <CardDescription>Current active bids and opportunities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {PIPELINE.map((stage) => (
          <div key={stage.stage} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{stage.stage}</span>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">{stage.count} active</span>
                <Badge variant="secondary" className="font-mono">{stage.value}</Badge>
              </div>
            </div>
            <Progress value={stage.percent} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
