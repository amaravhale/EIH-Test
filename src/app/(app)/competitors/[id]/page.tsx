import { ProfileHeader } from "@/components/domain/profile-header";
import { CapabilitiesTab } from "@/components/domain/capabilities-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CompetitorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  // Mock data for the specific competitor
  const competitor = {
    id: "comp-1",
    name: "SafeTech Solutions",
    sector: "Oil & Gas Process Safety",
    hq: "Houston, TX",
    size: "500-1000",
    website: "safetech-solutions.io",
  };

  return (
    <div className="space-y-8">
      <ProfileHeader competitor={competitor} />
      
      <Tabs defaultValue="capabilities" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
          <TabsTrigger 
            value="capabilities" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
          >
            Capabilities
          </TabsTrigger>
          <TabsTrigger 
            value="swot" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
          >
            SWOT Analysis
          </TabsTrigger>
          <TabsTrigger 
            value="activity" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
          >
            Recent Activity
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="capabilities">
          <CapabilitiesTab />
        </TabsContent>
        
        <TabsContent value="swot">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-emerald-500">
              <CardHeader>
                <CardTitle>Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>First-mover advantage in AI-driven PHA</li>
                  <li>Deep pockets from recent Series B funding ($40M)</li>
                  <li>Strong foothold in the US Gulf Coast market</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-destructive">
              <CardHeader>
                <CardTitle>Weaknesses</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>High pricing model isolates mid-market clients</li>
                  <li>Software lacks robust integration with legacy ERPs (SAP)</li>
                  <li>High staff turnover in European offices</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle>Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Expanding their software to environmental compliance</li>
                  <li>Acquiring smaller European consultancies</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-warning">
              <CardHeader>
                <CardTitle>Threats to Us</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Direct competition for our key UK accounts</li>
                  <li>Poaching our senior engineers with higher salaries</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { date: "Oct 12, 2024", action: "Product Launch", desc: "Released version 2.0 of their AI PHA tool." },
                  { date: "Sep 28, 2024", action: "Key Hire", desc: "Hired former Director of Safety from BP." },
                  { date: "Aug 15, 2024", action: "Funding", desc: "Closed $40M Series B led by Insight Partners." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-24 text-sm text-muted-foreground pt-1">{item.date}</div>
                    <div className="flex-1 pb-6 border-l pl-4 relative">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5" />
                      <p className="font-medium">{item.action}</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
