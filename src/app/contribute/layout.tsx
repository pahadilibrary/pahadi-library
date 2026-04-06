import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contribute a Song — Himalaya Folk',
  description:
    'Share a Pahadi, Garhwali, or Kumaoni folk song you know. Submit original lyrics in Pahadi, Hindi translations, English translations, and cultural context to help preserve Himalayan folk traditions.',
  alternates: { canonical: 'https://himalayafolk.com/contribute' },
};

export default function ContributeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
