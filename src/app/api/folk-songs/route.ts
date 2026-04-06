import { NextResponse } from 'next/server';
import { getAllFolkSongsFromDB } from '@/lib/folk-songs-db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const songs = await getAllFolkSongsFromDB();

  const mapped = songs.map(s => ({
    slug: s.slug,
    title: s.title,
    titleDevanagari: s.title_devanagari,
    category: s.category,
    contributorName: s.contributor_name,
    contributorVillage: s.contributor_village,
    image: s.image,
    featured: s.featured,
    excerpt: s.excerpt,
  }));

  return NextResponse.json({ songs: mapped });
}
