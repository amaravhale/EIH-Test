"use client";

import React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";

export default function ContentLibraryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Content Library"
        description="Your repository of approved and published thought leadership assets."
        actions={
          <Button className="bg-blue-600 hover:bg-blue-700">Upload Asset</Button>
        }
      />

      <div className="grid gap-4">
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-200">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-zinc-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-zinc-900">Q{i} Safety Analytics Report</h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-500">Published • PDF • 2.4MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-zinc-500 dark:text-zinc-400 hover:text-blue-600">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
