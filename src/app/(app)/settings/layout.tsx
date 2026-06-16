"use client";

import { PageHeader } from "@/components/layout/page-header";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SETTINGS_NAV = [
  { label: "Profile", href: "/settings/profile" },
  { label: "Organisation", href: "/settings/organisation" },
  { label: "Integrations", href: "/settings/integrations" },
  { label: "AI Prompts", href: "/settings/prompts" },
  { label: "Data Sync", href: "/settings/sync" },
  { label: "Preferences", href: "/settings/preferences" },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Settings" 
        description="Manage your account, team, and intelligence platform preferences."
      />
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {SETTINGS_NAV.map((item) => (
              <SettingsNavLink key={item.href} item={item} />
            ))}
          </nav>
        </aside>
        
        <main className="flex-1 max-w-4xl">
          {children}
        </main>
      </div>
    </div>
  );
}

function SettingsNavLink({ item }: { item: any }) {
  const pathname = usePathname() || "";
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
  
  return (
    <Link
      href={item.href}
      className={`px-3 py-2 text-sm rounded-md transition-colors whitespace-nowrap ${
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {item.label}
    </Link>
  );
}
