import React from 'react';

export function ThreatsTab({ competitorId }: { competitorId: string }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-zinc-200">
      <h3 className="text-lg font-semibold text-zinc-900 mb-2">Threats</h3>
      <p className="text-sm text-zinc-500">
        Threat analysis for {competitorId} will be populated by the Competitor Intelligence Agent.
      </p>
    </div>
  );
}
