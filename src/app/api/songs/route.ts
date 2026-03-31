import { NextResponse } from 'next/server';
import { getAllSongsFromDB, getRegionsFromDB, getOccasionsFromDB } from '@/lib/songs-db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const [songs, regions, occasions] = await Promise.all([
    getAllSongsFromDB(),
    getRegionsFromDB(),
    getOccasionsFromDB(),
  ]);

  // Map to the shape the frontend expects
  const mapped = songs.map(s => ({
    slug: s.slug,
    title: s.title,
    titleDevanagari: s.title_devanagari,
    region: s.region,
    district: s.district,
    occasion: s.occasion,
    contributorName: s.contributor_name,
    contributorVillage: s.contributor_village,
    audioUrl: s.audio_url,
    image: s.image,
    featured: s.featured,
    excerpt: s.excerpt,
  }));

  return NextResponse.json({ songs: mapped, regions, occasions });
}
