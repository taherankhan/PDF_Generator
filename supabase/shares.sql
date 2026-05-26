-- PDF Generator — Supabase shares table + RLS
-- Run this in Supabase Dashboard → SQL Editor

create extension if not exists "pgcrypto";

create table if not exists public.shares (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  content text not null,
  theme text not null default 'professional',
  ip_address text
);

alter table public.shares enable row level security;

-- Reset policies if re-running (safe for dev)
drop policy if exists "shares_public_select" on public.shares;
drop policy if exists "shares_public_insert" on public.shares;
drop policy if exists "shares_public_update" on public.shares;

-- Anyone with the link can read
create policy "shares_public_select"
  on public.shares
  for select
  to anon, authenticated
  using (true);

-- Anyone can create a new shared document
create policy "shares_public_insert"
  on public.shares
  for insert
  to anon, authenticated
  with check (true);

-- REQUIRED for "Save Changes" — without this, updates silently affect 0 rows
create policy "shares_public_update"
  on public.shares
  for update
  to anon, authenticated
  using (true)
  with check (true);

-- Live updates in editor (skip if already enabled — safe to re-run)
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'shares'
  ) then
    alter publication supabase_realtime add table public.shares;
  end if;
end $$;
