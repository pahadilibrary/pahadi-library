export interface Song {
  id: string;
  slug: string;
  title: string;
  title_devanagari: string;
  region: string;
  district: string;
  occasion: string;
  contributor_name: string;
  contributor_village: string;
  audio_url: string;
  image: string;
  featured: boolean;
  excerpt: string;
  lyrics_original: string;
  lyrics_english: string;
  lyrics_hindi: string;
  cultural_context: string;
  glossary: GlossaryEntry[];
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
}

export interface GlossaryEntry {
  word: string;
  transliteration: string;
  meaning: string;
}

export interface Submission {
  id: string;
  contributor_name: string;
  contributor_village: string;
  song_name: string;
  occasion: string;
  lyrics: string;
  cultural_context: string;
  youtube_link: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes: string;
  created_at: string;
}

export interface FolkSong {
  id: string;
  slug: string;
  title: string;
  title_devanagari: string;
  category: 'bajuband' | 'thadya';
  contributor_name: string;
  contributor_village: string;
  image: string;
  featured: boolean;
  excerpt: string;
  lyrics_original: string;
  lyrics_english: string;
  lyrics_hindi: string;
  cultural_context: string;
  glossary: GlossaryEntry[];
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
  active: boolean;
}
