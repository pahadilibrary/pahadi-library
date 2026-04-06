import type { Metadata, Viewport } from 'next';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const siteUrl = 'https://himalayafolk.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: {
    google: '_KhYAy78FG0N4cr5-vphiCFpjj2gkWgi1SR0bDHHgDY',
  },
  title: {
    default: 'Himalaya Folk — Songs & Cultural Archive of the Himalayas',
    template: '%s | Himalaya Folk',
  },
  description:
    'A digital archive preserving the folk songs, oral traditions, and living culture of Uttarakhand. Pahadi, Garhwali & Kumaoni lyrics with English and Hindi translations, glossary, and cultural context.',
  keywords: [
    'Pahadi songs', 'Garhwali folk songs', 'Kumaoni songs', 'Uttarakhand folk music',
    'Pahadi lyrics', 'Garhwali lyrics in English', 'Kumaoni lyrics translation',
    'Himalayan folk songs', 'Pahadi song meaning', 'Uttarakhand wedding songs',
    'Garhwali cultural songs', 'Pahadi glossary', 'Devbhoomi songs', 'Himalaya Folk',
  ],
  authors: [{ name: 'Himalaya Folk', url: siteUrl }],
  creator: 'Himalaya Folk',
  publisher: 'Himalaya Folk',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Himalaya Folk',
    title: 'Himalaya Folk — Songs & Cultural Archive of the Himalayas',
    description:
      'Preserving Garhwali, Kumaoni & Pahadi folk songs with trilingual lyrics, cultural context, and a glossary of untranslatable Himalayan words.',
    images: [
      {
        url: '/images/IMG_20251018_082751293 (3).jpg',
        width: 1200,
        height: 630,
        alt: 'Himalaya Folk — Himalayan folk song archive',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Himalaya Folk — Songs & Cultural Archive of the Himalayas',
    description:
      'Preserving Garhwali, Kumaoni & Pahadi folk songs with trilingual lyrics, cultural context, and a glossary of untranslatable Himalayan words.',
    images: ['/images/IMG_20251018_082751293 (3).jpg'],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
