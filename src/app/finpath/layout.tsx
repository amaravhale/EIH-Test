import React from 'react';
import { TopNavBar } from '@/components/finpath/TopNavBar';

export default function FinpathLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#D4FF00] selection:text-black flex flex-col">
      <TopNavBar />
      <main className="flex-1 w-full max-w-[1600px] mx-auto p-8 pt-6">
        {children}
      </main>
    </div>
  );
}
