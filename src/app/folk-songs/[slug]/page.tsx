import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllFolkSongsFromDB, getFolkSongBySlug } from '@/lib/folk-songs-db';
import FolkSongDetailClient from './FolkSongDetailClient';

export const dynamic = 'force-dynamic';

const siteUrl = 'https://himalayafolk.com';

const CATEGORY_LABELS: Record<string, string> = {
  bajuband: 'Bajuband',
  thadya: 'Thadya',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const song = await getFolkSongBySlug(slug);
  if (!song) return {};

  const catLabel = CATEGORY_LABELS[song.category] || song.category;
  const title = `${song.title} lyrics in Garhwali, English & Hindi — ${catLabel}`;
  const description = `${song.title} (${song.title_devanagari}) is a ${catLabel} Garhwali folk song from Uttarakhand. Read the original Garhwali lyrics in Devanagari, English & Hindi translations, and cultural context.`;
  const url = `${siteUrl}/folk-songs/${slug}`;

  return {
    title,
    description,
    keywords: [
      song.title,
      song.title_devanagari,
      `${song.title} lyrics`,
      `${song.title} lyrics in Garhwali`,
      `${song.title} meaning`,
      `${catLabel} song`,
      `${catLabel} Garhwali folk song`,
      'Garhwali folk song lyrics',
      'Uttarakhand folk music',
      'Himalayan oral tradition',
    ],
    openGraph: {
      title, description, url,
      type: 'article',
      images: song.image ? [{ url: song.image, width: 1200, height: 630, alt: song.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title, description,
      images: song.image ? [song.image] : [],
    },
    alternates: { canonical: url },
  };
}

export default async function FolkSongDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const song = await getFolkSongBySlug(slug);
  if (!song) notFound();

  const allSongs = await getAllFolkSongsFromDB();
  const related = allSongs
    .filter(s => s.slug !== slug && s.category === song.category)
    .slice(0, 3);

  const catLabel = CATEGORY_LABELS[song.category] || song.category;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicComposition',
    name: song.title,
    alternateName: song.title_devanagari,
    description: song.cultural_context || `A ${catLabel} Garhwali folk song from Uttarakhand.`,
    genre: `Garhwali Folk — ${catLabel}`,
    inLanguage: 'gbm',
    lyrics: song.lyrics_original ? {
      '@type': 'CreativeWork',
      text: song.lyrics_original,
      inLanguage: 'gbm',
    } : undefined,
    image: song.image,
    contributor: {
      '@type': 'Person',
      name: song.contributor_name,
      address: song.contributor_village,
    },
    isPartOf: {
      '@type': 'MusicPlaylist',
      name: 'Himalaya Folk',
      url: siteUrl,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Folk Songs', item: `${siteUrl}/folk-songs` },
      { '@type': 'ListItem', position: 3, name: song.title, item: `${siteUrl}/folk-songs/${slug}` },
    ],
  };

  return (
    <div className="folk-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Banner */}
      <section className="song-detail-banner folk-detail-banner">
        <img src={song.image} alt={song.title} />
        <div className="song-detail-banner-content">
          <span className="occasion-label">{catLabel}</span>
          <h1>{song.title}</h1>
          <p className="devanagari-title">{song.title_devanagari}</p>
        </div>
      </section>

      {/* Body */}
      <div className="song-detail-body">
        {/* Meta strip */}
        <div className="song-meta-strip">
          {[
            { label: 'Type', value: catLabel },
            { label: 'Tradition', value: 'Garhwali Folk' },
            { label: 'Contributor', value: [song.contributor_name, song.contributor_village].filter(Boolean).join(', ') },
          ].filter(item => item.value?.trim()).map(item => (
            <div key={item.label} className="meta-item">
              <p className="meta-label">{item.label}</p>
              <p className="meta-value">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Lyrics */}
        {(song.lyrics_original || song.lyrics_english || song.lyrics_hindi) && (
          <div className="lyrics-columns">
            {song.lyrics_original && (
              <div className="lyrics-column">
                <h3>Pahadi</h3>
                <div className="lyrics-text">{song.lyrics_original}</div>
              </div>
            )}
            {song.lyrics_english && (
              <div className="lyrics-column">
                <h3>English</h3>
                <div className="lyrics-text">{song.lyrics_english}</div>
              </div>
            )}
            {song.lyrics_hindi && (
              <div className="lyrics-column">
                <h3>Hindi</h3>
                <div className="lyrics-text">{song.lyrics_hindi}</div>
              </div>
            )}
          </div>
        )}

        {/* Glossary */}
        {song.glossary && song.glossary.length > 0 && (
          <div className="glossary-section">
            <span className="section-label">Pahadi Glossary</span>
            <h3 style={{ marginBottom: '6px', marginTop: '4px' }}>Words That Cannot Be Translated</h3>
            <p className="glossary-intro">
              Some Pahadi words carry meanings that no single English or Hindi word can capture.
            </p>
            <div className="glossary-grid">
              {song.glossary.map((entry, i) => (
                <div key={i} className="glossary-card">
                  <div className="glossary-word">{entry.word}</div>
                  <div className="glossary-transliteration">{entry.transliteration}</div>
                  <div className="glossary-meaning">{entry.meaning}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cultural Context */}
        {song.cultural_context && (
          <FolkSongDetailClient culturalContext={song.cultural_context} />
        )}

        {/* Related Songs */}
        {related.length > 0 && (
          <div className="related-section">
            <span className="section-label">Related Songs</span>
            <h3 style={{ marginBottom: '28px', marginTop: '8px' }}>More {catLabel} Songs</h3>
            <div className="card-grid-3">
              {related.map(r => (
                <Link key={r.slug} href={`/folk-songs/${r.slug}`}>
                  <div className="song-card">
                    <img src={r.image} alt={r.title} />
                    <div className="song-card-content">
                      <h4>{r.title}</h4>
                      <p className="devanagari">{r.title_devanagari}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Contributor bar */}
        <div className="song-contributor-bar">
          <div>
            <span className="section-label">Contributed by</span>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 400, color: 'var(--text)', marginTop: '4px' }}>
              {song.contributor_name}
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text)' }}>{song.contributor_village}</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Check out "${song.title}" on Himalaya Folk`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.649-1.516A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.09 0-4.037-.648-5.642-1.756l-.405-.24-2.758.9.87-2.7-.264-.42A9.72 9.72 0 0 1 2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12s-4.365 9.75-9.75 9.75z"/></svg>
              Share
            </a>
            <Link href="/folk-songs" className="btn-outline">All Folk Songs</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
