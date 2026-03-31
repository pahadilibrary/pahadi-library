'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SongForm {
  title: string;
  title_devanagari: string;
  slug: string;
  region: string;
  district: string;
  occasion: string;
  contributor_name: string;
  contributor_village: string;
  audio_url: string;
  image: string;
  featured: boolean;
  excerpt: string;
  lyrics_original: string;
  lyrics_english: string;
  lyrics_hindi: string;
  cultural_context: string;
  status: string;
}

const emptyForm: SongForm = {
  title: '',
  title_devanagari: '',
  slug: '',
  region: '',
  district: '',
  occasion: '',
  contributor_name: '',
  contributor_village: '',
  audio_url: '',
  image: '',
  featured: false,
  excerpt: '',
  lyrics_original: '',
  lyrics_english: '',
  lyrics_hindi: '',
  cultural_context: '',
  status: 'published',
};

export default function AdminSongForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');

  const [form, setForm] = useState<SongForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (editId) {
      // Load the song data for editing
      fetch('/api/admin/songs')
        .then(r => r.json())
        .then(data => {
          const song = (data.songs || []).find((s: { id: string }) => s.id === editId);
          if (song) {
            setForm({
              title: song.title || '',
              title_devanagari: song.title_devanagari || '',
              slug: song.slug || '',
              region: song.region || '',
              district: song.district || '',
              occasion: song.occasion || '',
              contributor_name: song.contributor_name || '',
              contributor_village: song.contributor_village || '',
              audio_url: song.audio_url || '',
              image: song.image || '',
              featured: song.featured || false,
              excerpt: song.excerpt || '',
              lyrics_original: song.lyrics_original || '',
              lyrics_english: song.lyrics_english || '',
              lyrics_hindi: song.lyrics_hindi || '',
              cultural_context: song.cultural_context || '',
              status: song.status || 'published',
            });
          }
        });
    }
  }, [editId]);

  function update(field: keyof SongForm, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }));
    // Auto-generate slug from title
    if (field === 'title' && !editId) {
      const slug = (value as string)
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setForm(prev => ({ ...prev, slug }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const method = editId ? 'PUT' : 'POST';
    const body = editId ? { ...form, id: editId } : form;

    const res = await fetch('/api/admin/songs', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setMessage(editId ? 'Song updated!' : 'Song created!');
      setTimeout(() => router.push('/admin/songs'), 1000);
    } else {
      const data = await res.json();
      setMessage(`Error: ${data.error}`);
    }
    setSaving(false);
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>{editId ? 'Edit Song' : 'Add New Song'}</h1>
          <p>{editId ? 'Update song details' : 'Add a new song to the archive'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        {/* Basic Info */}
        <div className="admin-form-section">
          <h3>Basic Information</h3>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label>Song Title (English)</label>
              <input type="text" value={form.title} onChange={e => update('title', e.target.value)} required />
            </div>
            <div className="admin-form-field">
              <label>Title (Devanagari)</label>
              <input type="text" value={form.title_devanagari} onChange={e => update('title_devanagari', e.target.value)} />
            </div>
            <div className="admin-form-field">
              <label>URL Slug</label>
              <input type="text" value={form.slug} onChange={e => update('slug', e.target.value)} required />
            </div>
            <div className="admin-form-field">
              <label>Region</label>
              <input type="text" value={form.region} onChange={e => update('region', e.target.value)} placeholder="e.g. Garhwal, Kumaon" />
            </div>
            <div className="admin-form-field">
              <label>District</label>
              <input type="text" value={form.district} onChange={e => update('district', e.target.value)} placeholder="e.g. Tehri Garhwal" />
            </div>
            <div className="admin-form-field">
              <label>Occasion</label>
              <input type="text" value={form.occasion} onChange={e => update('occasion', e.target.value)} placeholder="e.g. Wedding, Harvest, Holi" />
            </div>
          </div>
        </div>

        {/* Contributor */}
        <div className="admin-form-section">
          <h3>Contributor</h3>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label>Contributor Name</label>
              <input type="text" value={form.contributor_name} onChange={e => update('contributor_name', e.target.value)} />
            </div>
            <div className="admin-form-field">
              <label>Contributor Village/Town</label>
              <input type="text" value={form.contributor_village} onChange={e => update('contributor_village', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="admin-form-section">
          <h3>Media</h3>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label>Image URL</label>
              <input type="url" value={form.image} onChange={e => update('image', e.target.value)} placeholder="https://..." />
            </div>
            <div className="admin-form-field">
              <label>Audio URL</label>
              <input type="url" value={form.audio_url} onChange={e => update('audio_url', e.target.value)} placeholder="https://..." />
            </div>
          </div>
          <div className="admin-form-field" style={{ marginTop: '12px' }}>
            <label>Excerpt / Short Description</label>
            <input type="text" value={form.excerpt} onChange={e => update('excerpt', e.target.value)} placeholder="One-line description of the song" />
          </div>
        </div>

        {/* Lyrics */}
        <div className="admin-form-section">
          <h3>Lyrics</h3>
          <div className="admin-form-field">
            <label>Original Pahadi Lyrics (Devanagari)</label>
            <textarea rows={10} value={form.lyrics_original} onChange={e => update('lyrics_original', e.target.value)} />
          </div>
          <div className="admin-form-field">
            <label>English Translation</label>
            <textarea rows={10} value={form.lyrics_english} onChange={e => update('lyrics_english', e.target.value)} />
          </div>
          <div className="admin-form-field">
            <label>Hindi Translation</label>
            <textarea rows={10} value={form.lyrics_hindi} onChange={e => update('lyrics_hindi', e.target.value)} />
          </div>
        </div>

        {/* Cultural Context */}
        <div className="admin-form-section">
          <h3>Cultural Context</h3>
          <div className="admin-form-field">
            <label>Cultural Context & Background</label>
            <textarea rows={6} value={form.cultural_context} onChange={e => update('cultural_context', e.target.value)} placeholder="When is this song sung? What is its significance?" />
          </div>
        </div>

        {/* Settings */}
        <div className="admin-form-section">
          <h3>Settings</h3>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label>Status</label>
              <select value={form.status} onChange={e => update('status', e.target.value)}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div className="admin-form-field">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={e => update('featured', e.target.checked)}
                  style={{ width: '16px', height: '16px' }}
                />
                Featured Song (shown on homepage)
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="admin-form-actions">
          {message && <p className={message.startsWith('Error') ? 'admin-error' : 'admin-success'}>{message}</p>}
          <button type="button" onClick={() => router.push('/admin/songs')} className="admin-btn-secondary">Cancel</button>
          <button type="submit" disabled={saving} className="admin-btn-primary">
            {saving ? 'Saving...' : (editId ? 'Update Song' : 'Create Song')}
          </button>
        </div>
      </form>
    </div>
  );
}
