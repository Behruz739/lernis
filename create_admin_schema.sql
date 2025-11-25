-- Admin Panel Database Schema
-- Organizations table and profiles updates

-- 1. Create organizations table
create table if not exists public.organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  domain text unique,
  logo_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 2. Add organization_id to profiles
alter table public.profiles
add column if not exists organization_id uuid references public.organizations(id);

-- 3. Add index for better performance
create index if not exists profiles_organization_id_idx on profiles(organization_id);

-- 4. Enable RLS on organizations
alter table public.organizations enable row level security;

-- 5. RLS Policies for organizations

-- Anyone authenticated can view organizations
create policy "Organizations are viewable by authenticated users"
  on organizations for select
  to authenticated
  using (true);

-- Only super admins can insert organizations
create policy "Organizations are insertable by super admins"
  on organizations for insert
  to authenticated
  with check (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'super_admin'
    )
  );

-- Only super admins can update organizations
create policy "Organizations are updatable by super admins"
  on organizations for update
  to authenticated
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'super_admin'
    )
  );

-- Only super admins can delete organizations
create policy "Organizations are deletable by super admins"
  on organizations for delete
  to authenticated
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'super_admin'
    )
  );

-- 6. Update profiles RLS for admin access

-- Super admins can view all profiles
create policy "Super admins can view all profiles"
  on profiles for select
  to authenticated
  using (
    exists (
      select 1 from profiles p
      where p.id = auth.uid()
      and p.role = 'super_admin'
    )
  );

-- Org admins can view profiles in their organization
create policy "Org admins can view org profiles"
  on profiles for select
  to authenticated
  using (
    exists (
      select 1 from profiles p
      where p.id = auth.uid()
      and p.role = 'org_admin'
      and p.organization_id = profiles.organization_id
    )
  );

-- Super admins can update any profile
create policy "Super admins can update profiles"
  on profiles for update
  to authenticated
  using (
    exists (
      select 1 from profiles p
      where p.id = auth.uid()
      and p.role = 'super_admin'
    )
  );

-- 7. Create function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 8. Create trigger for organizations
create trigger update_organizations_updated_at
  before update on organizations
  for each row
  execute function update_updated_at_column();

-- 9. Insert sample organization (optional)
insert into public.organizations (name, domain)
values ('Lernis Platform', 'lernis.uz')
on conflict (domain) do nothing;
