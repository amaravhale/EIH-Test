"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Profiles", href: "/competitors/profiles" },
  { label: "Compare", href: "/competitors/compare" },
  { label: "Threats", href: "/competitors/threats" },
];

export default function CompetitorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Competitor Intelligence
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track, analyse, and compare competitors across your market landscape
        </p>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-border">
        <nav className="flex gap-6">
          {TABS.map((tab) => {
            const isActive =
              pathname === tab.href || pathname.startsWith(tab.href + "/");
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`border-b-2 pb-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {children}
    </div>
  );
}
