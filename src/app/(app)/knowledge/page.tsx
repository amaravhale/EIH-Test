import { ChatInput } from "@/components/ai/chat-input";
import { Sparkles, History, Search, FileText } from "lucide-react";
import Link from "next/link";

export default function KnowledgePage() {
  const SUGGESTED_QUERIES = [
    {
      icon: <Search className="h-4 w-4 text-primary" />,
      title: "Analyze Competitors",
      query: "Compare SafeTech's pricing model to our current offerings"
    },
    {
      icon: <History className="h-4 w-4 text-primary" />,
      title: "Regulatory Impact",
      query: "Summarize the proposed OSHA changes from last week"
    },
    {
      icon: <FileText className="h-4 w-4 text-primary" />,
      title: "Tender Assistance",
      query: "Draft a methodology section for the Equinor audit tender"
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/50 dark:bg-background">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
        <div className="bg-primary/10 p-4 rounded-2xl mb-6">
          <Sparkles className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Good afternoon, Jane</h1>
        <p className="text-muted-foreground max-w-lg mb-10">
          I'm your intelligence assistant. I've analyzed 14 new market signals, 3 competitor updates, and 2 tender deadlines today. How can I help you?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
          {SUGGESTED_QUERIES.map((suggestion, idx) => (
            <Link 
              key={idx} 
              href={`/knowledge?q=${encodeURIComponent(suggestion.query)}`}
              className="flex flex-col items-start p-4 bg-background border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all text-left group"
            >
              <div className="mb-3 p-2 bg-primary/5 rounded-md group-hover:bg-primary/10 transition-colors">
                {suggestion.icon}
              </div>
              <h3 className="font-semibold text-sm mb-1">{suggestion.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{suggestion.query}</p>
            </Link>
          ))}
        </div>
      </div>
      
      <ChatInput />
    </div>
  );
}
