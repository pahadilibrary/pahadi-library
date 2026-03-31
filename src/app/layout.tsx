import type { Metadata, Viewport } from 'next';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Pahadi Library — Songs & Cultural Archive of the Himalayas',
  description:
    'A digital archive preserving the songs, oral traditions, and living culture of the Himalayas, Uttarakhand. Lyrics in Devanagari, English and Hindi translations, cultural context, and audio recordings.',
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
