-- ============================================
-- PAHADI LIBRARY — Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. SONGS TABLE
create table if not exists songs (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  title_devanagari text default '',
  region text default '',
  district text default '',
  occasion text default '',
  contributor_name text default '',
  contributor_village text default '',
  audio_url text default '',
  image text default '',
  featured boolean default false,
  excerpt text default '',
  lyrics_original text default '',
  lyrics_english text default '',
  lyrics_hindi text default '',
  cultural_context text default '',
  status text default 'published' check (status in ('published', 'draft')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. SUBMISSIONS TABLE (from contribute form)
create table if not exists submissions (
  id uuid default gen_random_uuid() primary key,
  contributor_name text not null,
  contributor_village text default '',
  song_name text not null,
  occasion text default '',
  lyrics text default '',
  cultural_context text default '',
  youtube_link text default '',
  email text default '',
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  admin_notes text default '',
  created_at timestamptz default now()
);

-- 3. NEWSLETTER SUBSCRIBERS
create table if not exists newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  subscribed_at timestamptz default now(),
  active boolean default true
);

-- 4. AUTO-UPDATE updated_at ON SONGS
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger songs_updated_at
  before update on songs
  for each row execute function update_updated_at();

-- 5. ROW LEVEL SECURITY

-- Enable RLS on all tables
alter table songs enable row level security;
alter table submissions enable row level security;
alter table newsletter_subscribers enable row level security;

-- Songs: anyone can read published songs
create policy "Public can read published songs"
  on songs for select
  using (status = 'published');

-- Songs: service role can do everything (admin API routes use service role)
create policy "Service role full access to songs"
  on songs for all
  using (true)
  with check (true);

-- Submissions: anyone can insert (public contribute form)
create policy "Public can submit"
  on submissions for insert
  with check (true);

-- Submissions: service role can do everything
create policy "Service role full access to submissions"
  on submissions for all
  using (true)
  with check (true);

-- Newsletter: anyone can insert
create policy "Public can subscribe"
  on newsletter_subscribers for insert
  with check (true);

-- Newsletter: service role can do everything
create policy "Service role full access to newsletter"
  on newsletter_subscribers for all
  using (true)
  with check (true);

-- 6. INDEXES for performance
create index if not exists idx_songs_slug on songs (slug);
create index if not exists idx_songs_status on songs (status);
create index if not exists idx_songs_featured on songs (featured);
create index if not exists idx_submissions_status on submissions (status);
create index if not exists idx_newsletter_email on newsletter_subscribers (email);
