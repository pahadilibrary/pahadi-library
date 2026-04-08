import type { Metadata } from 'next';

const siteUrl = 'https://himalayafolk.com';

export const metadata: Metadata = {
  title: 'Folk Songs — Bajuband, Thadya & Oral Traditions of the Himalayas',
  description:
    'Explore the living oral traditions of the Himalayas — Bajuband devotional songs, Thadya festival songs, and more. Original Garhwali lyrics with English & Hindi translations.',
  alternates: { canonical: `${siteUrl}/folk-songs` },
  openGraph: {
    title: 'Folk Songs — Bajuband & Thadya of the Garhwal Himalayas',
    description:
      'Bajuband devotional songs and Thadya festival songs — Garhwali oral traditions with trilingual lyrics and cultural context.',
    url: `${siteUrl}/folk-songs`,
    type: 'website',
    siteName: 'Himalaya Folk',
    images: [{ url: `${siteUrl}/images/og-default.jpg`, width: 1200, height: 630, alt: 'Himalaya Folk — Garhwali folk songs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Folk Songs — Bajuband & Thadya of the Garhwal Himalayas',
    description:
      'Bajuband and Thadya Garhwali folk songs with original lyrics, English & Hindi translations.',
    images: [`${siteUrl}/images/og-default.jpg`],
  },
};

export default function FolkSongsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
