import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkline } from "@/components/charts/sparkline";
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

export function SignalSummary() {
  const metrics = [
    {
      title: "Total Signals (30d)",
      value: "1,248",
      change: "+12.5%",
      isPositive: true,
      data: [10, 20, 15, 25, 30, 45, 40]
    },
    {
      title: "Actionable Insights",
      value: "42",
      change: "+8.2%",
      isPositive: true,
      data: [2, 5, 3, 8, 12, 10, 15]
    },
    {
      title: "Pending Reviews",
      value: "18",
      change: "-5.1%",
      isPositive: false, // In this context, negative change is good, but we'll show it as red for simplicity, or we can customize. Let's make it gray.
      data: [30, 25, 28, 20, 15, 18, 18]
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3 col-span-full">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs flex items-center mt-1 ${metric.isPositive ? 'text-emerald-500' : 'text-muted-foreground'}`}>
                  {metric.isPositive ? (
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                  )}
                  {metric.change} from last month
                </p>
              </div>
              <div className="h-[40px] w-[80px]">
                {/* Fallback mock sparkline using SVG since component might not be fully working without recharts installed yet */}
                <svg viewBox="0 0 100 40" className="h-full w-full stroke-primary fill-none stroke-2">
                  <path d="M0,30 L20,20 L40,25 L60,10 L80,15 L100,5" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
