import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, MessageSquare, Search } from "lucide-react";
import Link from "next/link";

const SHORTCUTS = [
  {
    icon: <Search className="h-4 w-4" />,
    title: "Analyse Competitor Gap",
    description: "Compare our capabilities against SafeTech Solutions",
    href: "/knowledge?prompt=analyse-competitor-gap"
  },
  {
    icon: <MessageSquare className="h-4 w-4" />,
    title: "Summarize OSHA Changes",
    description: "What are the key impacts of the new OSHA proposal?",
    href: "/knowledge?prompt=summarize-osha-changes"
  },
  {
    icon: <Sparkles className="h-4 w-4" />,
    title: "Generate Tender Outline",
    description: "Draft a response outline for the European Energy Consortium",
    href: "/knowledge?prompt=generate-tender-outline"
  }
];

export function KnowledgeShortcuts() {
  return (
    <Card className="col-span-3 bg-primary/5 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-md">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-lg font-medium text-primary">AI Knowledge Assistant</CardTitle>
            <CardDescription className="text-primary/70">Ask questions across your entire intelligence base</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {SHORTCUTS.map((shortcut, index) => (
            <Link key={index} href={shortcut.href}>
              <div className="group flex items-center justify-between rounded-md border border-primary/20 bg-background/50 p-3 hover:bg-background transition-colors mb-2">
                <div className="flex items-center gap-3">
                  <div className="text-primary/70 group-hover:text-primary transition-colors">
                    {shortcut.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">{shortcut.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{shortcut.description}</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-primary/40 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0" />
              </div>
            </Link>
          ))}
          <Button className="w-full mt-4" asChild>
            <Link href="/knowledge">
              Open Assistant Chat
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
