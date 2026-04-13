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
              I was born in Garhwal, and I have watched the youth grow distant from the culture they came from — including myself. I am not someone who can single-handedly revive what is fading, but I can offer this generation a glimpse of Garhwali, Kumaoni, and Himalayan culture through a native eye.
            </p>
            <p>
              I have seen people struggle to understand the lyrics of the songs they grew up hearing. I struggle with them too. That is where this archive begins — with translation and context. But it will not stop there. My curiosity stretches across the broader Himalayas, which is why it is called Himalaya Folk, not just Garhwal Folk.
            </p>
            <p>
              I want to show people the richness of our folk songs, the folklore and stories we can carry with us. And I want to share my own experience of the Garhwal Himalayas — my motherland — with anyone willing to listen.
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
