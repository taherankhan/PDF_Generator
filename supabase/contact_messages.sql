-- PDF Generator — contact / suggestion form storage
-- Run in Supabase Dashboard → SQL Editor

create extension if not exists "pgcrypto";

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null check (length(email) <= 320),
  message text not null check (length(message) between 1 and 5000),
  ip_address text
);

-- If table already exists without ip_address, run this line alone:
-- alter table public.contact_messages add column if not exists ip_address text;

alter table public.contact_messages enable row level security;

-- Required: anon key must be allowed to INSERT (no public SELECT — admin reads in dashboard)
grant usage on schema public to anon, authenticated;
grant insert on table public.contact_messages to anon, authenticated;

drop policy if exists "contact_messages_public_insert" on public.contact_messages;

create policy "contact_messages_public_insert"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

-- Auto-capture client IP from PostgREST request headers (no client-side fetch)
create or replace function public.set_row_ip_from_headers()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  headers json;
  client_ip text;
begin
  headers := nullif(current_setting('request.headers', true), '')::json;

  if headers is not null then
    client_ip := coalesce(
      nullif(headers->>'cf-connecting-ip', ''),
      nullif(headers->>'x-real-ip', ''),
      nullif(split_part(coalesce(headers->>'x-forwarded-for', ''), ',', 1), '')
    );

    if client_ip is not null then
      new.ip_address := trim(client_ip);
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists contact_messages_set_ip on public.contact_messages;

create trigger contact_messages_set_ip
  before insert on public.contact_messages
  for each row
  execute function public.set_row_ip_from_headers();

-- Optional: apply same trigger to shares if not already configured
drop trigger if exists shares_set_ip on public.shares;

create trigger shares_set_ip
  before insert on public.shares
  for each row
  execute function public.set_row_ip_from_headers();
