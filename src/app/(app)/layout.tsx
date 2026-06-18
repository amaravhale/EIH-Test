"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SynexisSidebar } from "@/components/layout/synexis-sidebar";
import { SynexisHeader } from "@/components/layout/synexis-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("synexis-theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newVal = !prev;
      localStorage.setItem("synexis-theme", newVal ? "dark" : "light");
      return newVal;
    });
  };

  const mockUser = {
    name: "Alex Rivera",
    role: "Pro Plan",
    // We can use a placeholder avatar
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d", 
  };

  // Prevent hydration mismatch flash
  if (!mounted) {
    return <div className="h-screen w-full bg-[#062A30]"></div>;
  }

  return (
    <div className={`flex h-screen w-full overflow-hidden ${isDarkMode ? 'dark bg-[#062A30]' : 'bg-[#F8F9FB]'} text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300`}>
      <SynexisSidebar 
        activePath={pathname}
        onNavigate={(href) => router.push(href)}
      />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <SynexisHeader 
          user={mockUser}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="mx-auto w-full p-8 pt-4 pb-20">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
