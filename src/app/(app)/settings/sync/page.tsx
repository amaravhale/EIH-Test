"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DataSyncSettingsPage() {
  const dataSources = [
    {
      id: "rss",
      name: "Industry RSS Feeds",
      status: "active",
      lastSync: "10 mins ago",
      records: "1,245"
    },
    {
      id: "patents",
      name: "Global Patent Database",
      status: "active",
      lastSync: "2 hours ago",
      records: "850"
    },
    {
      id: "social",
      name: "Social Sentiment Streams",
      status: "paused",
      lastSync: "2 days ago",
      records: "45,200"
    },
    {
      id: "financial",
      name: "Financial Disclosures (SEC)",
      status: "active",
      lastSync: "1 day ago",
      records: "320"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Data Sync</h3>
          <p className="text-sm text-muted-foreground">
            Manage your connected data sources and synchronization schedules.
          </p>
        </div>
        <Button>Add Source</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Connected Sources</CardTitle>
          <CardDescription>
            Active data streams feeding the intelligence hub.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y rounded-md border">
            {dataSources.map((source) => (
              <div key={source.id} className="flex items-center justify-between p-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium leading-none">{source.name}</p>
                    {source.status === "active" ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">Active</Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-500">Paused</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Last synced: {source.lastSync} • {source.records} records
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    {source.status === "active" ? "Pause" : "Resume"}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                    Disconnect
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Global Sync Schedule</CardTitle>
          <CardDescription>
            Set how frequently the platform should poll active sources for new data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border p-4 text-center cursor-pointer hover:border-primary transition-colors">
              <div className="font-medium">Real-time</div>
              <div className="text-xs text-muted-foreground mt-1">Constant polling</div>
            </div>
            <div className="rounded-lg border-2 border-primary bg-primary/5 p-4 text-center cursor-pointer">
              <div className="font-medium text-primary">Hourly</div>
              <div className="text-xs text-primary/70 mt-1">Recommended</div>
            </div>
            <div className="rounded-lg border p-4 text-center cursor-pointer hover:border-primary transition-colors">
              <div className="font-medium">Daily</div>
              <div className="text-xs text-muted-foreground mt-1">Overnight sync</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          <Button>Save Schedule</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
