'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface SongMeta {
  slug: string;
  title: string;
  titleDevanagari: string;
  region: string;
  occasion: string;
  image: string;
  excerpt: string;
}

export default function SongsPage() {
  const [songs, setSongs] = useState<SongMeta[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/songs')
      .then((r) => r.json())
      .then((data) => {
        setSongs(data.songs);
      });
  }, []);

  const filtered = songs.filter((s) => {
    if (search) {
      const q = search.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.titleDevanagari.includes(search) ||
        s.region.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <>
      {/* Banner */}
      <section className="songs-page-banner">
        <img
          src="/images/IMG_20251018_082751293 (3).jpg"
          alt="Himalayan mountain range"
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="songs-page-banner-content">
          <h1>पहाड़ी गीत</h1>
          <p>Songs of the Himalayas</p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="search-filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search songs by name or region..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="filter-count">
          {filtered.length} song{filtered.length !== 1 ? 's' : ''}
        </span>
      </section>

      {/* Song Cards Grid */}
      <section className="songs-grid">
        <div className="card-grid-3">
          {filtered.map((song) => (
            <Link key={song.slug} href={`/songs/${song.slug}`}>
              <div className="song-card">
                <img src={song.image} alt={song.title} />
                <div className="song-card-content">
                  <h4>{song.title}</h4>
                  <p className="devanagari">{song.titleDevanagari}</p>
                  <p className="card-meta">{song.region}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && songs.length > 0 && (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: 'var(--text)' }}>
              No songs match your search. Try adjusting your filters.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
