'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Song {
  id: string;
  slug: string;
  title: string;
  title_devanagari: string;
  region: string;
  occasion: string;
  featured: boolean;
  status: string;
  created_at: string;
}

export default function AdminSongsPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/songs')
      .then(r => r.json())
      .then(data => { setSongs(data.songs || []); setLoading(false); });
  }, []);

  async function deleteSong(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    const res = await fetch('/api/admin/songs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setSongs(songs.filter(s => s.id !== id));
    }
  }

  async function toggleFeatured(song: Song) {
    const res = await fetch('/api/admin/songs', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: song.id, featured: !song.featured }),
    });

    if (res.ok) {
      setSongs(songs.map(s => s.id === song.id ? { ...s, featured: !s.featured } : s));
    }
  }

  async function toggleStatus(song: Song) {
    const newStatus = song.status === 'published' ? 'draft' : 'published';
    const res = await fetch('/api/admin/songs', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: song.id, status: newStatus }),
    });

    if (res.ok) {
      setSongs(songs.map(s => s.id === song.id ? { ...s, status: newStatus } : s));
    }
  }

  if (loading) return <div className="admin-page"><p>Loading songs...</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Songs</h1>
          <p>{songs.length} total songs in the archive</p>
        </div>
        <Link href="/admin/songs/new" className="admin-btn-primary">+ Add Song</Link>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Region</th>
              <th>Occasion</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {songs.map(song => (
              <tr key={song.id}>
                <td>
                  <div>
                    <strong>{song.title}</strong>
                    <br />
                    <span style={{ fontSize: '12px', color: 'var(--card-stats)' }}>{song.title_devanagari}</span>
                  </div>
                </td>
                <td>{song.region}</td>
                <td>{song.occasion}</td>
                <td>
                  <button
                    onClick={() => toggleStatus(song)}
                    className={`admin-badge ${song.status === 'published' ? 'badge-green' : 'badge-gray'}`}
                  >
                    {song.status}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => toggleFeatured(song)}
                    className={`admin-badge ${song.featured ? 'badge-orange' : 'badge-gray'}`}
                  >
                    {song.featured ? 'Featured' : 'No'}
                  </button>
                </td>
                <td>
                  <div className="admin-actions">
                    <Link href={`/admin/songs/new?edit=${song.id}`} className="admin-btn-sm">Edit</Link>
                    <button onClick={() => deleteSong(song.id, song.title)} className="admin-btn-sm btn-danger">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {songs.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text)' }}>
            <p>No songs yet. <Link href="/admin/songs/new" style={{ color: 'var(--accent)' }}>Add your first song</Link></p>
          </div>
        )}
      </div>
    </div>
  );
}
