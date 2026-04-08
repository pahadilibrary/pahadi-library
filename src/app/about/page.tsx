import Link from 'next/link';
import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'About Himalaya Folk — Preserving Himalayan Folk Songs',
  description:
    'Himalaya Folk is a community-built digital archive preserving Garhwali, Kumaoni, and Pahadi folk songs from Uttarakhand with trilingual lyrics, cultural context, and a glossary of untranslatable words.',
  alternates: { canonical: 'https://himalayafolk.com/about' },
  openGraph: {
    title: 'About Himalaya Folk — Preserving Himalayan Folk Songs',
    description:
      'Himalaya Folk is a community-built digital archive preserving Garhwali, Kumaoni, and Pahadi folk songs from Uttarakhand.',
    url: 'https://himalayafolk.com/about',
    type: 'website',
    siteName: 'Himalaya Folk',
    images: [{ url: 'https://himalayafolk.com/images/og-default.jpg', width: 1200, height: 630, alt: 'Himalaya Folk — About' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Himalaya Folk — Preserving Himalayan Folk Songs',
    description: 'A community-built digital archive preserving Garhwali, Kumaoni, and Pahadi folk songs from Uttarakhand.',
    images: ['https://himalayafolk.com/images/og-default.jpg'],
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <section className="inset-banner">
        <img
          src="/images/IMG_20250606_161445494.jpg"
          alt="Himalayan deodar forest"
          style={{ objectPosition: 'center 50%' }}
        />
        <div className="banner-content">
          <p className="tagline">Our Story</p>
          <h1>About Himalaya Folk</h1>
        </div>
      </section>

      {/* Founder Story */}
      <ScrollReveal>
        <div className="about-body">
          <div className="about-story">
            <h2>Why I Built This</h2>
            <p>
              I always wanted to know the lyrics of Pahadi music — the songs I grew up hearing in my village in Tehri Garhwal. But there was no website, no place where I could find a decent translation, or even the original lyrics written down properly.
            </p>
            <p>
              I wanted to build a single platform where anyone could find all this information — the lyrics in Devanagari, translations in English and Hindi, the cultural stories behind each song, and proper credits to the people and villages that keep these traditions alive.
            </p>

            <blockquote className="about-pullquote">
              &ldquo;These songs are living repositories of history, ecology, and the bonds that hold mountain communities together — and they risk being lost within a generation.&rdquo;
            </blockquote>

            <p>
              The songs of the Himalayas are not just entertainment. Nyoli carries the ache of separation across valleys. Jagar invocations connect communities to their ancestral deities. Mangal geet encode wedding rituals in melody.
            </p>
            <p>
              Yet with migration accelerating and oral traditions fading, these songs risk being lost within a generation. Himalaya Folk is my attempt to make sure that doesn&apos;t happen.
            </p>
          </div>

          {/* Coming Soon */}
          <ScrollReveal>
            <div style={{ marginTop: '72px', textAlign: 'center' }}>
              <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--accent)', fontSize: '8px', letterSpacing: '12px', opacity: 0.5 }}>&#9650; &#9650; &#9650;</div>
              <h3 style={{ marginTop: '24px', marginBottom: '12px' }}>Blog & Field Notes</h3>
              <p style={{ fontSize: '14px', maxWidth: '480px', margin: '0 auto', color: 'var(--text)' }}>
                Stories from the field, interviews with village elders, and the journeys behind each song. Coming soon.
              </p>
            </div>
          </ScrollReveal>

          {/* Advisors placeholder */}
          <ScrollReveal>
            <div style={{ marginTop: '56px', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '12px' }}>Advisors & Cultural Elders</h3>
              <p style={{ fontSize: '14px', maxWidth: '480px', margin: '0 auto', color: 'var(--text)' }}>
                We are building relationships with cultural elders and academic institutions across Uttarakhand. More details coming soon.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </ScrollReveal>
    </>
  );
}
