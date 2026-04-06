import { createAdminClient } from './supabase';
import type { FolkSong } from './types';

export async function getAllFolkSongsFromDB(): Promise<FolkSong[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('folk_songs')
    .select('*')
    .eq('status', 'published')
    .order('title', { ascending: true });

  if (error) {
    console.error('Error fetching folk songs:', error);
    return [];
  }
  return data || [];
}

export async function getFolkSongBySlug(slug: string): Promise<FolkSong | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('folk_songs')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) return null;
  return data;
}

export async function getFolkSongsByCategory(category: string): Promise<FolkSong[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('folk_songs')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .order('title', { ascending: true });

  if (error) return [];
  return data || [];
}
