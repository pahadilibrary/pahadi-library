import type { Metadata } from 'next';

const siteUrl = 'https://himalayafolk.com';

export const metadata: Metadata = {
  title: 'Contribute a Song — Himalaya Folk',
  description:
    'Know a Garhwali, Kumaoni, or Pahadi folk song? Submit original lyrics in Devanagari with Hindi & English translations to help preserve Himalayan folk traditions for future generations.',
  alternates: { canonical: `${siteUrl}/contribute` },
  openGraph: {
    title: 'Contribute a Song — Himalaya Folk',
    description:
      'Help preserve Himalayan folk traditions. Submit Garhwali, Kumaoni, or Pahadi lyrics with translations and cultural context.',
    url: `${siteUrl}/contribute`,
    type: 'website',
    siteName: 'Himalaya Folk',
    images: [{ url: `${siteUrl}/images/og-default.jpg`, width: 1200, height: 630, alt: 'Contribute to Himalaya Folk' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contribute a Song — Himalaya Folk',
    description:
      'Help preserve Himalayan folk traditions. Submit Garhwali, Kumaoni, or Pahadi lyrics with translations.',
    images: [`${siteUrl}/images/og-default.jpg`],
  },
};

export default function ContributeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
