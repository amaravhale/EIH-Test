"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AIPromptsSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">AI Prompts & Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Customize how the AI Assistant generates insights and interacts with you.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>System Instructions</CardTitle>
          <CardDescription>
            These base instructions will be appended to all your AI queries to guide the response style and focus.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="base-prompt">Custom Instructions</Label>
            <Textarea 
              id="base-prompt" 
              placeholder="e.g., Always prioritize actionable insights over theoretical analysis. Format responses with clear bullet points."
              className="min-h-[120px]"
              defaultValue="Focus on providing executive-level summaries. Highlight regulatory risks explicitly. Do not use overly technical jargon unless necessary."
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          <Button>Save Instructions</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Response Formatting</CardTitle>
          <CardDescription>
            Set default preferences for how the AI formats its output.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Default Tone</Label>
              <Select defaultValue="professional">
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional & Objective</SelectItem>
                  <SelectItem value="executive">Executive Summary</SelectItem>
                  <SelectItem value="technical">Technical & Detailed</SelectItem>
                  <SelectItem value="casual">Conversational</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Response Length</Label>
              <Select defaultValue="concise">
                <SelectTrigger>
                  <SelectValue placeholder="Select length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concise">Concise (Bullet points)</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="comprehensive">Comprehensive (In-depth)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          <Button>Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
