import Link from "next/link";
import { MessageSquare, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ConversationSidebar() {
  const history = [
    { id: "1", title: "SafeTech vs Empirisys", date: "Today" },
    { id: "2", title: "OSHA PSM Update 2024", date: "Yesterday" },
    { id: "3", title: "Hydrogen Risk Factors", date: "Previous 7 Days" },
    { id: "4", title: "Competitor Analysis: Apex", date: "Previous 7 Days" },
  ];

  return (
    <div className="w-64 border-r bg-muted/20 flex flex-col h-[calc(100vh-theme(spacing.16))]">
      <div className="p-4 border-b">
        <Button className="w-full justify-start" asChild>
          <Link href="/knowledge">
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Link>
        </Button>
      </div>
      
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search history..." 
            className="w-full bg-background border rounded-md py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {history.map((chat) => (
            <Link 
              key={chat.id} 
              href={`/knowledge/c/${chat.id}`}
              className="flex items-center gap-2 px-3 py-2 text-sm text-foreground/80 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="truncate">{chat.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
