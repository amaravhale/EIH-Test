"use client";

import React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, LifeBuoy, MessageCircle } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Help & Documentation"
        description="Learn how to use the intelligence hub or contact support."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="flex flex-col items-center text-center p-6">
          <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <Book className="h-6 w-6" />
          </div>
          <CardTitle className="mb-2">Documentation</CardTitle>
          <CardDescription className="mb-6">Read detailed guides on setting up your competitor trackers.</CardDescription>
          <Button variant="outline" className="w-full mt-auto">Read Docs</Button>
        </Card>

        <Card className="flex flex-col items-center text-center p-6">
          <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <LifeBuoy className="h-6 w-6" />
          </div>
          <CardTitle className="mb-2">Video Tutorials</CardTitle>
          <CardDescription className="mb-6">Watch step-by-step videos on how to leverage the AI Assistant.</CardDescription>
          <Button variant="outline" className="w-full mt-auto">Watch Videos</Button>
        </Card>

        <Card className="flex flex-col items-center text-center p-6">
          <div className="h-12 w-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
            <MessageCircle className="h-6 w-6" />
          </div>
          <CardTitle className="mb-2">Contact Support</CardTitle>
          <CardDescription className="mb-6">Can't find what you need? Our team is here to help.</CardDescription>
          <Button className="w-full mt-auto bg-blue-600 hover:bg-blue-700">Open Ticket</Button>
        </Card>
      </div>
    </div>
  );
}
