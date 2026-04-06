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
    label: 'Bajuband',
    devanagari: 'बाजूबंद',
    description: 'Devotional and ceremonial songs tied to the sacred thread tradition of Garhwal.',
  },
  {
    key: 'thadya',
    label: 'Thadya',
    devanagari: 'थड्या',
    description: 'Communal dance songs sung in open courtyards during festivals and celebrations.',
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
    <>
      {/* Banner */}
      <section className="songs-page-banner">
        <img
          src="/images/IMG_20251018_082751293 (3).jpg"
          alt="Himalayan mountains"
          style={{ objectPosition: 'center 60%' }}
        />
        <div className="songs-page-banner-content">
          <h1>लोक गीत</h1>
          <p>Folk Songs of the Himalayas</p>
        </div>
      </section>

      {/* Intro */}
      <div className="folk-intro">
        <p>
          These are the songs that were never recorded in studios. Passed down through generations,
          sung at festivals, in courtyards, on mountain paths — the living voice of the Himalayas.
        </p>
      </div>

      {/* Category Sections */}
      {loading ? (
        <div style={{ padding: '80px 40px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: 'var(--text)' }}>Loading...</p>
        </div>
      ) : (
        CATEGORIES.map(cat => {
          const catSongs = getSongsByCategory(cat.key);
          return (
            <section key={cat.key} className="folk-category-section">
              <div className="folk-category-header">
                <div>
                  <span className="section-label">{cat.devanagari}</span>
                  <h2 style={{ marginTop: '4px', marginBottom: '8px' }}>{cat.label}</h2>
                  <p className="folk-category-desc">{cat.description}</p>
                </div>
              </div>

              {catSongs.length === 0 ? (
                <div className="folk-empty">
                  <p>Songs coming soon.</p>
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
    </>
  );
}
