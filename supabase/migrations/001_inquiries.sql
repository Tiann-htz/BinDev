-- Table for contact form inquiries
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  need text not null,
  budget text not null,
  timeline text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Allow anonymous/public inserts (used by the publishable key)
alter table public.inquiries enable row level security;

drop policy if exists "anon can insert inquiries" on public.inquiries;
create policy "anon can insert inquiries"
  on public.inquiries
  for insert
  to anon
  with check (true);

-- Only authenticated/service role can read
drop policy if exists "service can read inquiries" on public.inquiries;
create policy "service can read inquiries"
  on public.inquiries
  for select
  to authenticated
  using (true);
