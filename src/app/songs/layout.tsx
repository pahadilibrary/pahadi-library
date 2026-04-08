import type { Metadata } from 'next';

const siteUrl = 'https://himalayafolk.com';

export const metadata: Metadata = {
  title: 'Pahadi Songs — Garhwali & Kumaoni Folk Song Lyrics Archive',
  description:
    'Browse Garhwali, Kumaoni, and Pahadi folk songs with original lyrics in Devanagari, English & Hindi translations, cultural context, and a glossary of untranslatable Himalayan words.',
  alternates: { canonical: `${siteUrl}/songs` },
  openGraph: {
    title: 'Pahadi Songs — Garhwali & Kumaoni Folk Song Lyrics',
    description:
      'Browse Garhwali, Kumaoni, and Pahadi folk songs with trilingual lyrics, cultural context, and a glossary of untranslatable Himalayan words.',
    url: `${siteUrl}/songs`,
    type: 'website',
    siteName: 'Himalaya Folk',
    images: [{ url: `${siteUrl}/images/og-default.jpg`, width: 1200, height: 630, alt: 'Himalaya Folk song archive' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pahadi Songs — Garhwali & Kumaoni Folk Song Lyrics',
    description:
      'Browse Garhwali, Kumaoni, and Pahadi folk songs with trilingual lyrics and cultural context.',
    images: [`${siteUrl}/images/og-default.jpg`],
  },
};

export default function SongsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
