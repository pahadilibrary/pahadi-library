import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pahadi Songs — Garhwali & Kumaoni Folk Song Lyrics Archive',
  description:
    'Browse our growing collection of Pahadi, Garhwali, and Kumaoni folk songs with original lyrics in Devanagari, English & Hindi translations, cultural context, and glossary of untranslatable Himalayan words.',
  alternates: { canonical: 'https://himalayafolk.com/songs' },
};

export default function SongsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
