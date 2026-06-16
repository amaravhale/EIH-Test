export const queryKeys = {
  competitors: {
    all: ["competitors"] as const,
    list: (filters: Record<string, any>) => [...queryKeys.competitors.all, "list", filters] as const,
    detail: (id: string) => [...queryKeys.competitors.all, "detail", id] as const,
    metrics: (id: string) => [...queryKeys.competitors.all, "metrics", id] as const,
  },
  signals: {
    all: ["signals"] as const,
    feed: (filters: Record<string, any>) => [...queryKeys.signals.all, "feed", filters] as const,
    detail: (id: string) => [...queryKeys.signals.all, "detail", id] as const,
    summary: () => [...queryKeys.signals.all, "summary"] as const,
  },
  tenders: {
    all: ["tenders"] as const,
    kanban: () => [...queryKeys.tenders.all, "kanban"] as const,
    pipeline: () => [...queryKeys.tenders.all, "pipeline"] as const,
  },
  knowledge: {
    history: () => ["knowledge", "history"] as const,
    conversation: (id: string) => ["knowledge", "conversation", id] as const,
  },
  user: {
    profile: () => ["user", "profile"] as const,
    organisation: () => ["user", "organisation"] as const,
    permissions: () => ["user", "permissions"] as const,
  },
};
