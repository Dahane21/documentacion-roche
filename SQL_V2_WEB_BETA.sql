-- Roche V2 Web Beta: estado compartido de la aplicación
create table if not exists public.app_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

alter table public.app_state enable row level security;
grant select, insert, update on public.app_state to authenticated;

create policy "Usuarios autenticados leen estado compartido"
on public.app_state for select to authenticated
using (true);

create policy "Usuarios autenticados crean estado compartido"
on public.app_state for insert to authenticated
with check (auth.uid() = updated_by);

create policy "Usuarios autenticados actualizan estado compartido"
on public.app_state for update to authenticated
using (true)
with check (auth.uid() = updated_by);
