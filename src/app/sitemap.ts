import type { MetadataRoute } from 'next';
import { getAllSongsFromDB } from '@/lib/songs-db';
import { getAllFolkSongsFromDB } from '@/lib/folk-songs-db';

const siteUrl = 'https://himalayafolk.com';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/songs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/folk-songs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/field-notes`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contribute`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  const [songs, folkSongs] = await Promise.all([
    getAllSongsFromDB(),
    getAllFolkSongsFromDB(),
  ]);

  const songPages: MetadataRoute.Sitemap = songs.map((song) => ({
    url: `${siteUrl}/songs/${song.slug}`,
    lastModified: new Date(song.updated_at || song.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const folkSongPages: MetadataRoute.Sitemap = folkSongs.map((song) => ({
    url: `${siteUrl}/folk-songs/${song.slug}`,
    lastModified: new Date(song.updated_at || song.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...songPages, ...folkSongPages];
}
