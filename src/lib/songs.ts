import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface SongMeta {
  slug: string;
  title: string;
  titleDevanagari: string;
  region: string;
  district: string;
  occasion: string;
  contributorName: string;
  contributorVillage: string;
  audioUrl: string;
  image: string;
  featured: boolean;
  excerpt: string;
}

export interface Song extends SongMeta {
  lyricsGarhwali: string;
  lyricsEnglish: string;
  lyricsHindi: string;
  culturalContext: string;
}

const songsDir = path.join(process.cwd(), "src/content/songs");

export function getAllSongs(): SongMeta[] {
  const files = fs.readdirSync(songsDir).filter((f) => f.endsWith(".mdx"));
  const songs = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(songsDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title || "",
      titleDevanagari: data.titleDevanagari || "",
      region: data.region || "",
      district: data.district || "",
      occasion: data.occasion || "",
      contributorName: data.contributorName || "",
      contributorVillage: data.contributorVillage || "",
      audioUrl: data.audioUrl || "",
      image: data.image || "/images/default-song.jpg",
      featured: data.featured || false,
      excerpt: data.excerpt || "",
    } as SongMeta;
  });
  return songs;
}

export function getSong(slug: string): Song | null {
  const filePath = path.join(songsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // Parse sections from content
  const sections = content.split(/^## /m).filter(Boolean);
  let lyricsGarhwali = "";
  let lyricsEnglish = "";
  let lyricsHindi = "";
  let culturalContext = "";

  for (const section of sections) {
    const lines = section.trim().split("\n");
    const heading = lines[0].trim().toLowerCase();
    const body = lines.slice(1).join("\n").trim();

    if (heading.includes("garhwali") || heading.includes("lyrics")) {
      lyricsGarhwali = body;
    } else if (heading.includes("english")) {
      lyricsEnglish = body;
    } else if (heading.includes("hindi")) {
      lyricsHindi = body;
    } else if (heading.includes("cultural") || heading.includes("context")) {
      culturalContext = body;
    }
  }

  return {
    slug,
    title: data.title || "",
    titleDevanagari: data.titleDevanagari || "",
    region: data.region || "",
    district: data.district || "",
    occasion: data.occasion || "",
    contributorName: data.contributorName || "",
    contributorVillage: data.contributorVillage || "",
    audioUrl: data.audioUrl || "",
    image: data.image || "/images/default-song.jpg",
    featured: data.featured || false,
    excerpt: data.excerpt || "",
    lyricsGarhwali,
    lyricsEnglish,
    lyricsHindi,
    culturalContext,
  };
}

export function getRegions(): string[] {
  const songs = getAllSongs();
  return [...new Set(songs.map((s) => s.region).filter(Boolean))];
}

export function getOccasions(): string[] {
  const songs = getAllSongs();
  return [...new Set(songs.map((s) => s.occasion).filter(Boolean))];
}
