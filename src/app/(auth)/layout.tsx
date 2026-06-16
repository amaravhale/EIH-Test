import Link from "next/link";
import { Mountain } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col bg-slate-900 text-white p-10 justify-between">
        <div className="flex items-center gap-2 font-semibold text-xl tracking-tight">
          <Mountain className="h-6 w-6 text-primary" />
          <span>Empirisys</span>
        </div>
        
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">
            Strategic Intelligence for Process Safety
          </h1>
          <p className="text-slate-400 text-lg">
            Monitor competitors, discover emerging regulations, and leverage AI to uncover actionable market signals before they become mainstream.
          </p>
        </div>
        
        <div className="text-sm text-slate-500">
          © {new Date().getFullYear()} Empirisys Ltd. All rights reserved.
        </div>
      </div>
      
      <div className="flex flex-col justify-center items-center p-8 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md space-y-8">
          <div className="flex md:hidden items-center justify-center gap-2 font-semibold text-xl tracking-tight mb-8">
            <Mountain className="h-6 w-6 text-primary" />
            <span>Empirisys</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
