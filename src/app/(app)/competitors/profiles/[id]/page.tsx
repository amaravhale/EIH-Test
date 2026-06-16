"use client";

import { useState } from "react";
import { ProfileHeader } from "./_components/profile-header";
import { CapabilitiesTab } from "./_components/capabilities-tab";
import { StrengthsTab } from "./_components/strengths-tab";
import { WeaknessesTab } from "./_components/weaknesses-tab";
import { ThreatsTab } from "./_components/threats-tab";
import { ActivityTab } from "./_components/activity-tab";
import { use } from "react";

const TABS = [
  { id: "capabilities", label: "Capabilities" },
  { id: "strengths", label: "Strengths" },
  { id: "weaknesses", label: "Weaknesses" },
  { id: "threats", label: "Threats" },
  { id: "activity", label: "Activity" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// TODO: Replace with Supabase query
// const { data: competitor } = await supabase.from('competitors').select('*').eq('slug', id).single();
function getCompetitorData(id: string) {
  return {
    id,
    name: id === "bae-systems" ? "BAE Systems" : id === "thales" ? "Thales UK" : id === "qinetiq" ? "QinetiQ" : id === "leonardo" ? "Leonardo UK" : id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    initials: id === "bae-systems" ? "BA" : id.substring(0, 2).toUpperCase(),
    color: id === "bae-systems" ? "bg-red-500" : id === "thales" ? "bg-blue-600" : "bg-purple-600",
    sector: "Defence & Technology",
    headquarters: "London, UK",
    employees: "90,500",
    revenue: "£23.3B",
    founded: "1999",
    ceo: "Charles Woodburn",
    website: "www.baesystems.com",
    threatLevel: "high" as const,
    overlapScore: 87,
    description:
      "BAE Systems is a British multinational arms, security, and aerospace company with operations worldwide. They are one of the largest defence contractors globally.",
    tags: ["Cyber", "Air Systems", "Naval", "Land Systems", "Intelligence"],
  };
}

export default function CompetitorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const competitor = getCompetitorData(id);
  const [activeTab, setActiveTab] = useState<TabId>("capabilities");

  return (
    <div className="space-y-6">
      <ProfileHeader competitor={competitor} />

      {/* Tab navigation */}
      <div className="border-b border-border">
        <nav className="flex gap-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 pb-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === "capabilities" && <CapabilitiesTab competitorId={id} />}
      {activeTab === "strengths" && <StrengthsTab competitorId={id} />}
      {activeTab === "weaknesses" && <WeaknessesTab competitorId={id} />}
      {activeTab === "threats" && <ThreatsTab competitorId={id} />}
      {activeTab === "activity" && <ActivityTab competitorId={id} />}
    </div>
  );
}
