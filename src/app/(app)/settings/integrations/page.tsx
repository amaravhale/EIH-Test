"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function IntegrationsSettingsPage() {
  const integrations = [
    {
      id: "slack",
      name: "Slack",
      description: "Receive threat alerts and system notifications directly in your Slack channels.",
      status: "connected",
      icon: "S",
      color: "bg-[#4A154B]"
    },
    {
      id: "teams",
      name: "Microsoft Teams",
      description: "Send actionable insights and reports to your Teams workspaces.",
      status: "disconnected",
      icon: "T",
      color: "bg-[#6264A7]"
    },
    {
      id: "jira",
      name: "Jira Software",
      description: "Automatically create Jira issues when critical threats are detected.",
      status: "connected",
      icon: "J",
      color: "bg-[#0052CC]"
    },
    {
      id: "salesforce",
      name: "Salesforce",
      description: "Sync competitor intel with your Salesforce accounts and opportunities.",
      status: "disconnected",
      icon: "SF",
      color: "bg-[#00A1E0]"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Integrations</h3>
        <p className="text-sm text-muted-foreground">
          Connect Empirisys with your favorite tools to streamline your workflow.
        </p>
      </div>
      
      <div className="grid gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg text-white font-bold text-xl ${integration.color}`}>
                  {integration.icon}
                </div>
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    {integration.name}
                    {integration.status === "connected" && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                        Connected
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {integration.description}
                  </CardDescription>
                </div>
              </div>
              <div>
                <Switch checked={integration.status === "connected"} />
              </div>
            </CardHeader>
            <CardContent>
              {integration.status === "connected" && (
                <div className="mt-4 rounded-md bg-muted p-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Last synced: 2 hours ago</span>
                    <Button variant="link" className="h-auto p-0 text-sm">Configure</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
