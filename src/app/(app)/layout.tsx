"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "📊",
  },
  {
    label: "Competitors",
    href: "/competitors",
    icon: "🎯",
    children: [
      { label: "Profiles", href: "/competitors/profiles" },
      { label: "Compare", href: "/competitors/compare" },
      { label: "Threats", href: "/competitors/threats" },
    ],
  },
  {
    label: "Market",
    href: "/market",
    icon: "📡",
    children: [
      { label: "Signals", href: "/market/signals" },
      { label: "Tenders", href: "/market/tenders" },
      { label: "Regulations", href: "/market/regulations" },
      { label: "Programmes", href: "/market/programmes" },
    ],
  },
  {
    label: "Knowledge",
    href: "/knowledge",
    icon: "🧠",
  },
  {
    label: "Content",
    href: "/content",
    icon: "✍️",
    children: [
      { label: "Ideas", href: "/content/ideas" },
      { label: "Trending", href: "/content/trending" },
      { label: "Library", href: "/content/library" },
    ],
  },
  {
    label: "Settings",
    href: "/settings",
    icon: "⚙️",
  },
];

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // We can pass user info to Header
  const mockUser = {
    name: "Jane Doe",
    email: "jane@empirisys.com",
    role: "Senior Process Safety Engineer",
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar 
        activePath={pathname}
        onNavigate={(href) => router.push(href)}
      />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          user={mockUser}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
