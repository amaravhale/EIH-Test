"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SynexisSidebar } from "@/components/layout/synexis-sidebar";
import { SynexisHeader } from "@/components/layout/synexis-header";
import { useUser } from "@/contexts/user-context";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/ui/page-transition";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.add("dark");
  }, []);

  const { user } = useUser();

  // Prevent hydration mismatch flash
  if (!mounted) {
    return <div className="h-screen w-full bg-[#1A1525]"></div>;
  }

  return (
    <div className={`flex h-screen w-full overflow-hidden dark bg-[#05030A] text-zinc-100 font-sans relative`}>
      
      {/* Ambient Background Mesh to reveal Glassmorphism in both modes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-700">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-violet-600/50 blur-[100px]" />
        <div className="absolute top-[50%] -right-[5%] w-[40%] h-[40%] rounded-full bg-cyan-600/40 blur-[100px]" />
      </div>

      <div className="relative z-10 flex h-full w-full">
        <SynexisSidebar 
          activePath={pathname}
          onNavigate={(href) => router.push(href)}
        />
        
        <div className="flex flex-1 flex-col overflow-hidden">
          <SynexisHeader 
            user={user}
          />
          
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto custom-scrollbar relative">
            <AnimatePresence mode="wait">
              <PageTransition key={pathname} className="mx-auto w-full p-8 pt-4 pb-20">
                {children}
              </PageTransition>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
