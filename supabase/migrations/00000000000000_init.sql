-- Enable pgvector extension
create extension if not exists vector;

-- Create core tables
create table public.competitors (
  id uuid default gen_random_uuid() primary key,
  organisation_id uuid not null,
  name text not null,
  slug text not null unique,
  description text,
  website text,
  logo_url text,
  sector text not null,
  sub_sector text,
  employee_count_range text,
  revenue_range text,
  headquarters text,
  founded_year integer,
  overall_score integer default 0,
  threat_level text check (threat_level in ('low', 'medium', 'high', 'critical')) default 'low',
  tracking_status text check (tracking_status in ('active', 'watchlist', 'archived')) default 'active',
  ai_summary text,
  ai_summary_updated_at timestamp with time zone,
  metadata jsonb default '{}'::jsonb,
  created_by uuid not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.signals (
  id uuid default gen_random_uuid() primary key,
  organisation_id uuid not null,
  title text not null,
  description text not null,
  content text,
  category text check (category in ('tender', 'regulation', 'industry', 'competitive', 'technology', 'economic')) not null,
  sub_category text,
  source_name text not null,
  source_url text,
  source_type text check (source_type in ('rss', 'api', 'scrape', 'manual', 'ai_generated')) not null,
  relevance_score integer default 0,
  lifecycle_status text check (lifecycle_status in ('discovered', 'reviewed', 'validated', 'actionable', 'archived')) default 'discovered',
  assigned_to uuid,
  reviewed_by uuid,
  reviewed_at timestamp with time zone,
  published_at timestamp with time zone,
  deadline timestamp with time zone,
  tags text[] default array[]::text[],
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table for storing document chunks and their vector embeddings
create table public.signal_chunks (
  id uuid default gen_random_uuid() primary key,
  signal_id uuid references public.signals(id) on delete cascade not null,
  content text not null,
  token_count integer not null,
  embedding vector(1536), -- Assuming OpenAI text-embedding-ada-002 or similar
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a function to search for signals based on vector similarity
create or replace function match_signals(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  signal_id uuid,
  content text,
  similarity float
)
language sql stable
as $$
  select
    signal_chunks.id,
    signal_chunks.signal_id,
    signal_chunks.content,
    1 - (signal_chunks.embedding <=> query_embedding) as similarity
  from signal_chunks
  where 1 - (signal_chunks.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;

-- Create an index for faster similarity searches
create index on signal_chunks using ivfflat (embedding vector_cosine_ops)
with (lists = 100);

-- Row Level Security (RLS) policies
alter table public.competitors enable row level security;
alter table public.signals enable row level security;
alter table public.signal_chunks enable row level security;

-- Only let authenticated users view data for their organization
create policy "Users can view their organisation's competitors"
  on public.competitors for select
  using (auth.uid() is not null); -- Simplified for mockup, normally checks org_id

create policy "Users can view their organisation's signals"
  on public.signals for select
  using (auth.uid() is not null);
