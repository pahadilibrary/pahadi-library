'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface FolkSongMeta {
  slug: string;
  title: string;
  titleDevanagari: string;
  category: string;
  contributorName: string;
  contributorVillage: string;
  image: string;
  excerpt: string;
}

const CATEGORIES = [
  {
    key: 'bajuband',
    devanagari: 'बाजूबंद',
    label: 'Bajuband',
    description: 'Devotional and ceremonial songs tied to the sacred thread tradition of Garhwal — sung at rites of passage, in temples, and around the hearth.',
  },
  {
    key: 'thadya',
    devanagari: 'थड्या',
    label: 'Thadya',
    description: 'Communal dance songs sung in open courtyards during festivals and celebrations — voices and footsteps moving as one.',
  },
];

export default function FolkSongsPage() {
  const [songs, setSongs] = useState<FolkSongMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/folk-songs')
      .then(r => r.json())
      .then(data => {
        setSongs(data.songs || []);
        setLoading(false);
      });
  }, []);

  const getSongsByCategory = (key: string) =>
    songs.filter(s => s.category === key);

  return (
    <div className="folk-page">
      {/* Atmospheric Banner */}
      <section className="folk-banner">
        <img
          src="/images/IMG_20251018_082751293 (3).jpg"
          alt="Himalayan mountains at dusk"
          style={{ objectPosition: 'center 50%' }}
        />
        <div className="folk-banner-content">
          <h1 className="devanagari-title">लोक गीत</h1>
          <p className="english-sub">Songs of the Living Tradition</p>
        </div>
      </section>

      {/* Epigraph */}
      <div className="folk-epigraph">
        <p>
          &ldquo;These are the songs that were never recorded in studios.
          Passed mouth to ear, generation to generation —
          the breath of the mountains, still moving.&rdquo;
        </p>
        <span className="attribution">— from the archive</span>
      </div>

      <div className="folk-divider">▲ ▲ ▲</div>

      {/* Category Sections */}
      {loading ? (
        <div style={{ padding: '80px 40px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#8B6F3D', fontStyle: 'italic' }}>Loading the archive...</p>
        </div>
      ) : (
        CATEGORIES.map(cat => {
          const catSongs = getSongsByCategory(cat.key);
          return (
            <section key={cat.key} className="folk-category-section">
              <div className="folk-category-header">
                <span className="devanagari-label">{cat.devanagari}</span>
                <span className="english-label">{cat.label}</span>
                <p className="folk-category-desc">{cat.description}</p>
              </div>

              {catSongs.length === 0 ? (
                <div className="folk-empty">
                  <p>Songs coming to this section soon.</p>
                </div>
              ) : (
                <div className="folk-scroll-row">
                  <div className="folk-scroll-track">
                    {catSongs.map(song => (
                      <Link key={song.slug} href={`/folk-songs/${song.slug}`} className="folk-card">
                        <div className="folk-card-image">
                          <img src={song.image} alt={song.title} />
                        </div>
                        <div className="folk-card-content">
                          <h4>{song.title}</h4>
                          <p className="devanagari">{song.titleDevanagari}</p>
                          {song.contributorVillage && (
                            <p className="folk-card-village">{song.contributorVillage}</p>
                          )}
                          <span className="card-read-link">Read →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })
      )}

      <div style={{ height: '60px' }} />
    </div>
  );
}
