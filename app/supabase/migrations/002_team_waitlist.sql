-- ============================================================
-- Migration 002: Team plan email waitlist
-- Run in: Supabase Dashboard > SQL Editor
-- ============================================================

create table if not exists public.team_waitlist (
  id         uuid default gen_random_uuid() primary key,
  email      text not null,
  user_id    uuid references auth.users(id) on delete set null,
  source     text not null check (source in ('app', 'marketing')),
  created_at timestamp with time zone default now()
);

create unique index if not exists idx_team_waitlist_email
  on public.team_waitlist (email);

create index if not exists idx_team_waitlist_source
  on public.team_waitlist (source, created_at);

-- ── RLS ──────────────────────────────────────────────────────
alter table public.team_waitlist enable row level security;

create policy "Anon can insert waitlist"
  on public.team_waitlist for insert
  to anon
  with check (source = 'marketing' and user_id is null);

create policy "Auth can insert waitlist"
  on public.team_waitlist for insert
  to authenticated
  with check (auth.uid() = user_id and source = 'app');
