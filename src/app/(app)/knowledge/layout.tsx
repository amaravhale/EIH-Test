import { ConversationSidebar } from "@/components/ai/conversation-sidebar";

export default function KnowledgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] -m-6 border-t">
      <ConversationSidebar />
      <div className="flex-1 overflow-hidden relative flex flex-col">
        {children}
      </div>
    </div>
  );
}
