import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadarChart } from "@/components/charts/radar-chart";

export function CapabilitiesTab() {
  const radarData = [
    { subject: "Process Safety", A: 90, B: 80, fullMark: 100 },
    { subject: "Environmental", A: 70, B: 85, fullMark: 100 },
    { subject: "Software/AI", A: 85, B: 50, fullMark: 100 },
    { subject: "Training", A: 60, B: 90, fullMark: 100 },
    { subject: "Consulting", A: 80, B: 85, fullMark: 100 },
    { subject: "Compliance", A: 75, B: 95, fullMark: 100 },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Capability Matrix</CardTitle>
          <CardDescription>SafeTech vs Empirisys (Our Benchmark)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            {/* Fallback rendering of Radar Chart if recharts fails */}
            <div className="w-full h-full flex items-center justify-center border-2 border-dashed rounded-md bg-muted/20">
              <span className="text-muted-foreground text-sm">Radar Chart: Capability Benchmarking</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Core Service Offerings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex justify-between items-start border-b pb-3">
                <div>
                  <p className="font-medium">AI-Powered PHA Software</p>
                  <p className="text-sm text-muted-foreground">Flagship product automating Process Hazard Analysis.</p>
                </div>
                <Badge>Strong</Badge>
              </li>
              <li className="flex justify-between items-start border-b pb-3">
                <div>
                  <p className="font-medium">Incident Investigation</p>
                  <p className="text-sm text-muted-foreground">Retained services for major clients.</p>
                </div>
                <Badge variant="outline">Average</Badge>
              </li>
              <li className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Training & Certification</p>
                  <p className="text-sm text-muted-foreground">Standardized e-learning modules.</p>
                </div>
                <Badge variant="secondary">Weak</Badge>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
