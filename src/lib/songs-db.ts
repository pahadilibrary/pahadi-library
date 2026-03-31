import { createAdminClient } from './supabase';
import type { Song } from './types';

export async function getAllSongsFromDB(): Promise<Song[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('status', 'published')
    .order('title', { ascending: true });

  if (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
  return data || [];
}

export async function getSongBySlug(slug: string): Promise<Song | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) return null;
  return data;
}

export async function getFeaturedSongs(): Promise<Song[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('title', { ascending: true });

  if (error) return [];
  return data || [];
}

export async function getRegionsFromDB(): Promise<string[]> {
  const songs = await getAllSongsFromDB();
  return [...new Set(songs.map(s => s.region).filter(Boolean))];
}

export async function getOccasionsFromDB(): Promise<string[]> {
  const songs = await getAllSongsFromDB();
  return [...new Set(songs.map(s => s.occasion).filter(Boolean))];
}
