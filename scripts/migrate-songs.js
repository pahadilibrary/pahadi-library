/**
 * Migration Script: Move all MDX songs to Supabase
 *
 * Usage:
 *   1. Set your environment variables in .env.local
 *   2. Run: node scripts/migrate-songs.js
 *
 * This reads all .mdx files from src/content/songs/ and inserts them into Supabase.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Load environment from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const songsDir = path.join(__dirname, '..', 'src', 'content', 'songs');

async function migrate() {
  const files = fs.readdirSync(songsDir).filter(f => f.endsWith('.mdx'));
  console.log(`Found ${files.length} songs to migrate.\n`);

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(songsDir, file), 'utf-8');
    const { data, content } = matter(raw);

    // Parse sections from content
    const sections = content.split(/^## /m).filter(Boolean);
    let lyrics_original = '';
    let lyrics_english = '';
    let lyrics_hindi = '';
    let cultural_context = '';

    for (const section of sections) {
      const lines = section.trim().split('\n');
      const heading = lines[0].trim().toLowerCase();
      const body = lines.slice(1).join('\n').trim();

      if (heading.includes('garhwali') || heading.includes('lyrics')) {
        lyrics_original = body;
      } else if (heading.includes('english')) {
        lyrics_english = body;
      } else if (heading.includes('hindi')) {
        lyrics_hindi = body;
      } else if (heading.includes('cultural') || heading.includes('context')) {
        cultural_context = body;
      }
    }

    const song = {
      slug,
      title: data.title || '',
      title_devanagari: data.titleDevanagari || '',
      region: data.region || '',
      district: data.district || '',
      occasion: data.occasion || '',
      contributor_name: data.contributorName || '',
      contributor_village: data.contributorVillage || '',
      audio_url: data.audioUrl || '',
      image: data.image || '',
      featured: data.featured || false,
      excerpt: data.excerpt || '',
      lyrics_original,
      lyrics_english,
      lyrics_hindi,
      cultural_context,
      status: 'published',
    };

    // Insert into Supabase using REST API
    const res = await fetch(`${SUPABASE_URL}/rest/v1/songs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Prefer': 'resolution=merge-duplicates',
      },
      body: JSON.stringify(song),
    });

    if (res.ok) {
      console.log(`  ✓ ${data.title} (${slug})`);
    } else {
      const err = await res.text();
      console.error(`  ✗ ${data.title} — ${err}`);
    }
  }

  console.log('\nMigration complete!');
}

migrate().catch(console.error);
