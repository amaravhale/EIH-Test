-- Market Intelligence Agent Schema
-- Migration: 20250625_market_intelligence
-- Implements Claude's 9-step workflow data layer

-- =============================================================================
-- EVENTS TABLE (Claude Step 2: Entity and Event Extraction)
-- =============================================================================
create table if not exists public.market_events (
  id uuid default gen_random_uuid() primary key,
  organisation_id uuid not null default '00000000-0000-0000-0000-000000000000',
  entity_name text not null,
  entity_type text check (entity_type in ('company','facility','regulator','government')) not null,
  event_type text check (event_type in (
    'incident','contract_award','regulatory_action','m_and_a',
    'leadership_change','product_launch','partnership','capex_announcement'
  )) not null,
  title text not null,
  summary text not null,
  source_url text,
  source_name text not null,
  source_tier text check (source_tier in ('A','B','C','D')) not null,
  geography text,
  sector text,
  event_date timestamp with time zone,
  relevance_score integer default 0 check (relevance_score >= 0 and relevance_score <= 100),
  evidence_strength integer default 0 check (evidence_strength >= 0 and evidence_strength <= 100),
  confirmation_count integer default 1,
  is_duplicate boolean default false,
  duplicate_of uuid references public.market_events(id),
  lifecycle_status text check (lifecycle_status in (
    'extracted','filtered','scored','aggregated','archived'
  )) default 'extracted',
  raw_content text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for common queries
create index if not exists idx_market_events_lifecycle on public.market_events(lifecycle_status);
create index if not exists idx_market_events_event_type on public.market_events(event_type);
create index if not exists idx_market_events_source_tier on public.market_events(source_tier);
create index if not exists idx_market_events_event_date on public.market_events(event_date desc);

-- =============================================================================
-- THEMES TABLE (Claude Step 5: Theme Aggregation)
-- =============================================================================
create table if not exists public.market_themes (
  id uuid default gen_random_uuid() primary key,
  organisation_id uuid not null default '00000000-0000-0000-0000-000000000000',
  title text not null,
  description text not null,
  delta_status text check (delta_status in ('new','intensified','faded','stable')) default 'new',
  validation_status text check (validation_status in (
    'pending_review','approved','rejected'
  )) default 'pending_review',
  validated_by uuid,
  validated_at timestamp with time zone,
  interpretation_impact text,
  interpretation_product text check (interpretation_product in (
    'Sense','Boost','Insight360','Leadership360'
  )),
  interpretation_action text,
  evidence_event_ids uuid[] default array[]::uuid[],
  relevance_score integer default 0 check (relevance_score >= 0 and relevance_score <= 100),
  first_seen_at timestamp with time zone default timezone('utc'::text, now()),
  last_updated_at timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_market_themes_validation on public.market_themes(validation_status);
create index if not exists idx_market_themes_delta on public.market_themes(delta_status);

-- =============================================================================
-- FEEDBACK TABLE (Claude Step 9: Feedback Loop)
-- =============================================================================
create table if not exists public.theme_feedback (
  id uuid default gen_random_uuid() primary key,
  theme_id uuid references public.market_themes(id) on delete cascade not null,
  action text check (action in ('approved','rejected','led_to_action')) not null,
  analyst_id uuid,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_theme_feedback_theme on public.theme_feedback(theme_id);

-- =============================================================================
-- RLS POLICIES
-- =============================================================================
alter table public.market_events enable row level security;
alter table public.market_themes enable row level security;
alter table public.theme_feedback enable row level security;

create policy "Users can view market events"
  on public.market_events for select
  using (auth.uid() is not null);

create policy "Users can insert market events"
  on public.market_events for insert
  with check (auth.uid() is not null);

create policy "Users can view market themes"
  on public.market_themes for select
  using (auth.uid() is not null);

create policy "Users can insert market themes"
  on public.market_themes for insert
  with check (auth.uid() is not null);

create policy "Users can update market themes"
  on public.market_themes for update
  using (auth.uid() is not null);

create policy "Users can view theme feedback"
  on public.theme_feedback for select
  using (auth.uid() is not null);

create policy "Users can insert theme feedback"
  on public.theme_feedback for insert
  with check (auth.uid() is not null);
