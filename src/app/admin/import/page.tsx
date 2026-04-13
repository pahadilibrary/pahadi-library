'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ScrapedData {
  title: string;
  artist: string;
  lyrics_original: string;
  image: string;
  tags: string[];
  source_url: string;
  site: string;
}

export default function AdminImportPage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<ScrapedData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  async function handleScrape(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPreview(null);

    const res = await fetch('/api/admin/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Failed to import');
    } else {
      setPreview(data);
    }
    setLoading(false);
  }

  async function handleSaveDraft() {
    if (!preview) return;
    setSaving(true);
    setSaveMsg('');

    const slug = preview.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const res = await fetch('/api/admin/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: preview.title,
        title_devanagari: '',
        slug,
        artist: preview.artist,
        region: '',
        district: '',
        occasion: '',
        contributor_name: '',
        contributor_village: '',
        audio_url: '',
        image: preview.image || '',
        featured: false,
        excerpt: '',
        lyrics_original: preview.lyrics_original,
        lyrics_english: '',
        lyrics_hindi: '',
        cultural_context: '',
        glossary: [],
        status: 'draft',
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setSaveMsg('Draft saved! Redirecting to editor...');
      setTimeout(() => router.push(`/admin/songs/new?edit=${data.song?.id || ''}`), 800);
    } else {
      const data = await res.json();
      setSaveMsg(`Error: ${data.error}`);
    }
    setSaving(false);
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Import Song</h1>
          <p>Paste a song URL from garhwalii.com or garhwalisonglyrics.com</p>
        </div>
      </div>

      {/* URL Input */}
      <div className="admin-form-section" style={{ maxWidth: 700 }}>
        <form onSubmit={handleScrape} style={{ display: 'flex', gap: 12 }}>
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://www.garhwalii.com/2026/03/song-title.html"
            required
            style={{ flex: 1 }}
          />
          <button type="submit" className="admin-btn-primary" disabled={loading}>
            {loading ? 'Importing...' : 'Import'}
          </button>
        </form>
        {error && <p className="admin-error" style={{ marginTop: 12 }}>{error}</p>}

        <p style={{ fontSize: 13, color: 'var(--card-stats)', marginTop: 12 }}>
          Supported: <strong>garhwalii.com</strong> · <strong>garhwalisonglyrics.com</strong>
        </p>
      </div>

      {/* Preview */}
      {preview && (
        <div style={{ marginTop: 32 }}>
          <div className="admin-form-section">
            <h3 style={{ marginBottom: 20 }}>Preview — review before saving</h3>

            <div className="admin-form-grid">
              <div className="admin-form-field">
                <label>Title</label>
                <input
                  type="text"
                  value={preview.title}
                  onChange={e => setPreview({ ...preview, title: e.target.value })}
                />
              </div>
              <div className="admin-form-field">
                <label>Artist / Singer</label>
                <input
                  type="text"
                  value={preview.artist}
                  onChange={e => setPreview({ ...preview, artist: e.target.value })}
                />
              </div>
            </div>

            {preview.image && (
              <div className="admin-form-field" style={{ marginTop: 16 }}>
                <label>Image (from source)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
                  <img src={preview.image} alt="preview" style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--border)' }} />
                  <input
                    type="url"
                    value={preview.image}
                    onChange={e => setPreview({ ...preview, image: e.target.value })}
                    style={{ flex: 1 }}
                  />
                </div>
              </div>
            )}

            {preview.tags.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <label style={{ fontSize: 12, color: 'var(--card-stats)', textTransform: 'uppercase', letterSpacing: 1 }}>Tags from source</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
                  {preview.tags.map(t => (
                    <span key={t} style={{ padding: '3px 10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 20, fontSize: 13 }}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="admin-form-field" style={{ marginTop: 16 }}>
              <label>Lyrics (Devanagari) — {preview.lyrics_original.split('\n').filter(Boolean).length} lines extracted</label>
              <textarea
                rows={12}
                value={preview.lyrics_original}
                onChange={e => setPreview({ ...preview, lyrics_original: e.target.value })}
              />
            </div>

            <div style={{ marginTop: 8, padding: '10px 14px', background: '#FFF8E7', border: '1px solid #F0D080', borderRadius: 6, fontSize: 13 }}>
              This will be saved as a <strong>draft</strong>. You can add Devanagari title, Hindi/English translations, region, cultural context, and glossary in the editor before publishing.
            </div>

            <div className="admin-form-actions" style={{ marginTop: 20 }}>
              {saveMsg && <p className={saveMsg.startsWith('Error') ? 'admin-error' : 'admin-success'}>{saveMsg}</p>}
              <button type="button" onClick={() => setPreview(null)} className="admin-btn-secondary">Cancel</button>
              <button type="button" onClick={handleSaveDraft} disabled={saving} className="admin-btn-primary">
                {saving ? 'Saving...' : 'Save as Draft & Open Editor'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
