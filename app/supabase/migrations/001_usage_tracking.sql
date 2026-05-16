-- ============================================================
-- Migration 001: Usage tracking and subscription gating
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ── Profiles ────────────────────────────────────────────────
-- Replaces the old profiles table (which used `tier` / `user_id`).
-- New schema uses `id` = auth.users.id as PK, and stores full
-- subscription state from Stripe.

create table if not exists public.profiles (
  id                    uuid references auth.users(id) on delete cascade primary key,
  email                 text,
  stripe_customer_id    text unique,
  subscription_status   text default 'inactive'
    check (subscription_status in ('active', 'inactive', 'canceled', 'past_due')),
  subscription_tier     text default 'free'
    check (subscription_tier in ('free', 'pro', 'team')),
  stripe_subscription_id text,
  current_period_end    timestamp with time zone,
  created_at            timestamp with time zone default now(),
  updated_at            timestamp with time zone default now()
);

-- Back-fill: migrate rows from the old schema if the table already
-- existed with user_id / tier columns.
do $$
begin
  -- Rename user_id → id if present (old schema used user_id as PK)
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name   = 'profiles'
      and column_name  = 'user_id'
  ) then
    alter table public.profiles rename column user_id to id;
  end if;

  -- Rename tier → subscription_tier if present
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name   = 'profiles'
      and column_name  = 'tier'
  ) then
    alter table public.profiles rename column tier to subscription_tier;
  end if;
end;
$$;

-- ── Usage ────────────────────────────────────────────────────
create table if not exists public.usage (
  id         uuid default gen_random_uuid() primary key,
  user_id    uuid references auth.users(id) on delete cascade not null,
  action     text default 'generate'
    check (action in ('generate', 'save_template', 'export')),
  created_at timestamp with time zone default now()
);

-- Fast monthly usage queries
create index if not exists idx_usage_user_month
  on public.usage (user_id, created_at);

-- Fast Stripe customer lookups
create index if not exists idx_profiles_stripe_customer
  on public.profiles (stripe_customer_id);

-- ── Auto-create profile on signup ────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── RLS ──────────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.usage    enable row level security;

-- Drop old policies before recreating (idempotent re-runs)
drop policy if exists "Users can view own profile"   on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can view own usage"     on public.usage;
drop policy if exists "Users can insert own usage"   on public.usage;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can view own usage"
  on public.usage for select
  using (auth.uid() = user_id);

create policy "Users can insert own usage"
  on public.usage for insert
  with check (auth.uid() = user_id);

-- Service role bypasses RLS automatically — no extra policy needed.
