-- Create user_experiences table
create table user_experiences (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  company text not null,
  position text not null,
  location text,
  start_date date not null,
  end_date date,
  current boolean default false,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user_educations table
create table user_educations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  institution text not null,
  degree text not null,
  field_of_study text,
  start_date date not null,
  end_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user_skills table
create table user_skills (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  skill_name text not null,
  level text check (level in ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user_languages table
create table user_languages (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  language text not null,
  proficiency text check (proficiency in ('Basic', 'Conversational', 'Fluent', 'Native')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on new tables
alter table user_experiences enable row level security;
alter table user_educations enable row level security;
alter table user_skills enable row level security;
alter table user_languages enable row level security;

-- Create policies (Users can manage their own data, everyone can read if we want public profiles later)
-- For now, let's allow users to read/write their own data.

-- Experiences
create policy "Users can view their own experiences" on user_experiences for select using (auth.uid() = user_id);
create policy "Users can insert their own experiences" on user_experiences for insert with check (auth.uid() = user_id);
create policy "Users can update their own experiences" on user_experiences for update using (auth.uid() = user_id);
create policy "Users can delete their own experiences" on user_experiences for delete using (auth.uid() = user_id);

-- Educations
create policy "Users can view their own educations" on user_educations for select using (auth.uid() = user_id);
create policy "Users can insert their own educations" on user_educations for insert with check (auth.uid() = user_id);
create policy "Users can update their own educations" on user_educations for update using (auth.uid() = user_id);
create policy "Users can delete their own educations" on user_educations for delete using (auth.uid() = user_id);

-- Skills
create policy "Users can view their own skills" on user_skills for select using (auth.uid() = user_id);
create policy "Users can insert their own skills" on user_skills for insert with check (auth.uid() = user_id);
create policy "Users can update their own skills" on user_skills for update using (auth.uid() = user_id);
create policy "Users can delete their own skills" on user_skills for delete using (auth.uid() = user_id);

-- Languages
create policy "Users can view their own languages" on user_languages for select using (auth.uid() = user_id);
create policy "Users can insert their own languages" on user_languages for insert with check (auth.uid() = user_id);
create policy "Users can update their own languages" on user_languages for update using (auth.uid() = user_id);
create policy "Users can delete their own languages" on user_languages for delete using (auth.uid() = user_id);
