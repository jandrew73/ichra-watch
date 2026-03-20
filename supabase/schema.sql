-- ============================================================
-- ICHRA Legislation Tracker — Supabase Schema
-- Run this in the Supabase SQL Editor to create all tables.
-- ============================================================

-- Bills table: stores both state and federal legislation from LegiScan
create table if not exists bills (
  id bigint primary key,                    -- LegiScan bill_id
  state text not null,                       -- e.g. "GA", "OH", "US" for federal
  state_name text,                           -- e.g. "Georgia", "Ohio", "US Congress"
  bill_number text not null,                 -- e.g. "HB 1110", "H.R. 6703"
  bill_type text,                            -- e.g. "B" (bill), "R" (resolution)
  title text not null,
  description text,
  session_id integer,
  session_name text,                         -- e.g. "2025-2026 Regular Session"
  status_id integer,                         -- LegiScan status code
  status_label text,                         -- Human-readable: "Introduced", "Engrossed", etc.
  status_category text,                      -- Our mapped status: enacted, passed_one_chamber, introduced, no_activity
  body text,                                 -- Originating body: "H" or "S"
  current_body text,                         -- Where bill currently is
  url text,                                  -- LegiScan URL for the bill
  state_url text,                            -- Official state legislature URL
  change_hash text not null,                 -- LegiScan change_hash for change detection
  last_action text,                          -- Most recent action description
  last_action_date date,                     -- Most recent action date
  sponsors jsonb default '[]'::jsonb,        -- Array of sponsor objects
  history jsonb default '[]'::jsonb,         -- Array of action history
  subjects jsonb default '[]'::jsonb,        -- Array of subject/topic tags
  raw_json jsonb,                            -- Full LegiScan getBill response (cached)
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Sync log: tracks each sync run for debugging and monitoring
create table if not exists sync_log (
  id bigserial primary key,
  started_at timestamptz default now(),
  completed_at timestamptz,
  status text not null default 'running',    -- running, completed, error
  queries_used integer default 0,
  bills_found integer default 0,
  bills_updated integer default 0,
  bills_created integer default 0,
  error_message text,
  search_terms text[]                        -- Which search terms were used
);

-- Search hashes: cache for getMasterListRaw / getSearchRaw results
create table if not exists search_cache (
  id bigserial primary key,
  search_term text not null,
  state text,                                -- null = national search
  result_hash text,                          -- hash of the search result set
  last_checked timestamptz default now(),
  result_json jsonb                          -- cached search results
);

-- Create indexes for common lookups
create index if not exists idx_bills_state on bills(state);
create index if not exists idx_bills_status_category on bills(status_category);
create index if not exists idx_bills_change_hash on bills(change_hash);
create index if not exists idx_bills_updated_at on bills(updated_at);
create index if not exists idx_sync_log_started_at on sync_log(started_at desc);
create index if not exists idx_search_cache_term on search_cache(search_term, state);

-- Row-level security (public read, service-role write)
alter table bills enable row level security;
alter table sync_log enable row level security;
alter table search_cache enable row level security;

-- Allow public (anon) read access to bills
create policy "Public can read bills" on bills
  for select using (true);

-- Allow service role full access (for the sync function)
create policy "Service role can manage bills" on bills
  for all using (true) with check (true);

create policy "Service role can manage sync_log" on sync_log
  for all using (true) with check (true);

create policy "Service role can manage search_cache" on search_cache
  for all using (true) with check (true);

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger bills_updated_at
  before update on bills
  for each row
  execute function update_updated_at();
