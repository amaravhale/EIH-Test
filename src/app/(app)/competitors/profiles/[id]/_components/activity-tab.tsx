import React from 'react';

export function ActivityTab({ competitorId }: { competitorId: string }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-zinc-200">
      <h3 className="text-lg font-semibold text-zinc-900 mb-2">Recent Activity</h3>
      <p className="text-sm text-zinc-500">
        Recent market signals and activity for {competitorId} will appear here.
      </p>
    </div>
  );
}
