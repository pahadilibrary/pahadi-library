import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Folk Songs — Bajuband, Thadya & Oral Traditions of the Himalayas',
  description: 'Explore the living oral traditions of the Himalayas — Bajuband devotional songs, Thadya festival songs, and more. Original Pahadi lyrics with translations.',
};

export default function FolkSongsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
