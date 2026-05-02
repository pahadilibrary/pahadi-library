import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Cormorant_Garamond, Source_Serif_4, Inter, Tiro_Devanagari_Hindi } from 'next/font/google';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-ui',
  display: 'swap',
});

const tiroDevanagari = Tiro_Devanagari_Hindi({
  subsets: ['devanagari', 'latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-devanagari',
  display: 'swap',
});

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
        url: '/images/og-default.jpg',
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
    images: ['/images/og-default.jpg'],
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

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Himalaya Folk',
  url: siteUrl,
  description: 'A digital archive preserving the folk songs, oral traditions, and living culture of Uttarakhand.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/songs?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Himalaya Folk',
  url: siteUrl,
  logo: `${siteUrl}/images/og-default.jpg`,
  sameAs: [
    'https://www.instagram.com/himalayafolk',
    'https://www.youtube.com/@himalayafolk',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${sourceSerif.variable} ${inter.variable} ${tiroDevanagari.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <LayoutShell>{children}</LayoutShell>
      </body>
      {/* Google Analytics */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-P2ES74JTEZ" strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-P2ES74JTEZ');
      `}</Script>
    </html>
  );
}
