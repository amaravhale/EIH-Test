import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Mic } from "lucide-react";

export function ChatInput() {
  return (
    <div className="p-4 bg-background border-t">
      <div className="max-w-3xl mx-auto relative flex items-end gap-2 bg-muted/50 rounded-lg border p-2 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
        <Button variant="ghost" size="icon" className="shrink-0 rounded-full text-muted-foreground hover:text-foreground">
          <Paperclip className="h-4 w-4" />
        </Button>
        <Textarea 
          placeholder="Ask about competitors, regulations, or market signals..." 
          className="min-h-[44px] max-h-32 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0 p-3 py-2.5 scrollbar-hide"
          rows={1}
        />
        <div className="flex shrink-0 gap-1 pb-1">
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground h-8 w-8">
            <Mic className="h-4 w-4" />
          </Button>
          <Button size="icon" className="rounded-full h-8 w-8">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-2 flex justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <kbd className="bg-muted border rounded px-1 font-sans text-[10px]">Enter</kbd> to send
        </span>
        <span className="flex items-center gap-1">
          <kbd className="bg-muted border rounded px-1 font-sans text-[10px]">Shift + Enter</kbd> to add a new line
        </span>
      </div>
    </div>
  );
}
