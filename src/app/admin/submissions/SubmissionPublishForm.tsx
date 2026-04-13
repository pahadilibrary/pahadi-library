'use client';

import { useState } from 'react';

interface GlossaryEntry {
  word: string;
  transliteration: string;
  meaning: string;
}

interface SongForm {
  title: string;
  title_devanagari: string;
  slug: string;
  artist: string;
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
  glossary: GlossaryEntry[];
  status: string;
}

interface Props {
  submissionId: string;
  initialData: Partial<SongForm>;
  onSuccess: () => void;
  onCancel: () => void;
}

function parseLyrics(raw: string) {
  const pahadiMatch = raw.match(/\[PAHADI\]\n([\s\S]*?)(?=\n\n\[|$)/);
  const hindiMatch = raw.match(/\[HINDI\]\n([\s\S]*?)(?=\n\n\[|$)/);
  const englishMatch = raw.match(/\[ENGLISH\]\n([\s\S]*?)(?=\n\n\[|$)/);
  return {
    lyrics_original: pahadiMatch ? pahadiMatch[1].trim() : raw,
    lyrics_hindi: hindiMatch ? hindiMatch[1].trim() : '',
    lyrics_english: englishMatch ? englishMatch[1].trim() : '',
  };
}

export default function SubmissionPublishForm({ submissionId, initialData, onSuccess, onCancel }: Props) {
  const parsed = parseLyrics(initialData.lyrics_original || '');

  const titleSlug = (initialData.title || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  const [form, setForm] = useState<SongForm>({
    title: initialData.title || '',
    title_devanagari: '',
    slug: titleSlug,
    artist: '',
    region: '',
    district: '',
    occasion: initialData.occasion || '',
    contributor_name: initialData.contributor_name || '',
    contributor_village: initialData.contributor_village || '',
    audio_url: '',
    image: '',
    featured: false,
    excerpt: '',
    lyrics_original: parsed.lyrics_original,
    lyrics_english: parsed.lyrics_english,
    lyrics_hindi: parsed.lyrics_hindi,
    cultural_context: initialData.cultural_context || '',
    glossary: [],
    status: 'published',
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  function update(field: keyof SongForm, value: string | boolean | GlossaryEntry[]) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (field === 'title') {
      const slug = (value as string)
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setForm(prev => ({ ...prev, slug, title: value as string }));
    }
  }

  function addGlossaryEntry() {
    setForm(prev => ({ ...prev, glossary: [...prev.glossary, { word: '', transliteration: '', meaning: '' }] }));
  }

  function updateGlossaryEntry(index: number, field: keyof GlossaryEntry, value: string) {
    setForm(prev => {
      const glossary = [...prev.glossary];
      glossary[index] = { ...glossary[index], [field]: value };
      return { ...prev, glossary };
    });
  }

  function removeGlossaryEntry(index: number) {
    setForm(prev => ({ ...prev, glossary: prev.glossary.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    // Create the song
    const songRes = await fetch('/api/admin/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!songRes.ok) {
      const data = await songRes.json();
      setMessage(`Error: ${data.error}`);
      setSaving(false);
      return;
    }

    // Mark submission as approved
    await fetch('/api/admin/submissions', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: submissionId, status: 'approved', admin_notes: 'Published to archive.' }),
    });

    setMessage('Published!');
    setTimeout(onSuccess, 800);
    setSaving(false);
  }

  return (
    <div style={{ borderTop: '2px solid var(--accent)', marginTop: 20, paddingTop: 20 }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 20, color: 'var(--accent)' }}>
        Publish to Archive — fill in details below
      </h3>

      <form onSubmit={handleSubmit} className="admin-form" style={{ padding: 0 }}>

        {/* Basic Info */}
        <div className="admin-form-section">
          <h3>Basic Information</h3>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label>Song Title (English) *</label>
              <input type="text" value={form.title} onChange={e => update('title', e.target.value)} required />
            </div>
            <div className="admin-form-field">
              <label>Title (Devanagari)</label>
              <input type="text" value={form.title_devanagari} onChange={e => update('title_devanagari', e.target.value)} />
            </div>
            <div className="admin-form-field">
              <label>Artist / Singer</label>
              <input type="text" value={form.artist} onChange={e => update('artist', e.target.value)} placeholder="e.g. Narendra Singh Negi" />
            </div>
            <div className="admin-form-field">
              <label>URL Slug *</label>
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
              <input type="text" value={form.occasion} onChange={e => update('occasion', e.target.value)} placeholder="e.g. Wedding, Harvest" />
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
          <div className="admin-form-field">
            <label>Song Image</label>
            <div className="admin-upload-area">
              {form.image && (
                <div className="admin-upload-preview">
                  <img src={form.image} alt="Song preview" />
                </div>
              )}
              <div className="admin-upload-controls">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const formData = new FormData();
                    formData.append('file', file);
                    setMessage('Uploading image...');
                    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
                    if (res.ok) {
                      const data = await res.json();
                      update('image', data.url);
                      setMessage('');
                    } else {
                      setMessage('Image upload failed');
                    }
                  }}
                />
                <p style={{ fontSize: 12, color: 'var(--card-stats)', marginTop: 6 }}>
                  JPG, PNG, or WebP. Max 5MB. Or paste a URL below:
                </p>
                <input
                  type="url"
                  value={form.image}
                  onChange={e => update('image', e.target.value)}
                  placeholder="https://... or upload above"
                  style={{ marginTop: 8 }}
                />
              </div>
            </div>
          </div>
          <div className="admin-form-field" style={{ marginTop: 12 }}>
            <label>Excerpt / Short Description</label>
            <input type="text" value={form.excerpt} onChange={e => update('excerpt', e.target.value)} placeholder="One-line description of the song" />
          </div>
        </div>

        {/* Lyrics */}
        <div className="admin-form-section">
          <h3>Lyrics</h3>
          <div className="admin-form-field">
            <label>Original Lyrics (Devanagari / Garhwali)</label>
            <textarea rows={8} value={form.lyrics_original} onChange={e => update('lyrics_original', e.target.value)} />
          </div>
          <div className="admin-form-field">
            <label>English Translation</label>
            <textarea rows={8} value={form.lyrics_english} onChange={e => update('lyrics_english', e.target.value)} />
          </div>
          <div className="admin-form-field">
            <label>Hindi Translation</label>
            <textarea rows={8} value={form.lyrics_hindi} onChange={e => update('lyrics_hindi', e.target.value)} />
          </div>
        </div>

        {/* Glossary */}
        <div className="admin-form-section">
          <h3>Glossary of Pahadi Terms</h3>
          {form.glossary.map((entry, i) => (
            <div key={i} className="glossary-entry-editor">
              <div className="admin-form-grid" style={{ gridTemplateColumns: '1fr 1fr 2fr auto' }}>
                <div className="admin-form-field">
                  <label>Pahadi Word</label>
                  <input type="text" value={entry.word} onChange={e => updateGlossaryEntry(i, 'word', e.target.value)} placeholder="e.g. काफल" />
                </div>
                <div className="admin-form-field">
                  <label>Transliteration</label>
                  <input type="text" value={entry.transliteration} onChange={e => updateGlossaryEntry(i, 'transliteration', e.target.value)} placeholder="e.g. Kafal" />
                </div>
                <div className="admin-form-field">
                  <label>Meaning / Description</label>
                  <input type="text" value={entry.meaning} onChange={e => updateGlossaryEntry(i, 'meaning', e.target.value)} placeholder="e.g. A wild berry found in Himalayan hills" />
                </div>
                <div className="admin-form-field" style={{ justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => removeGlossaryEntry(i)} className="admin-btn-sm btn-danger">Remove</button>
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={addGlossaryEntry} className="admin-btn-secondary" style={{ marginTop: 8 }}>
            + Add Word
          </button>
        </div>

        {/* Cultural Context */}
        <div className="admin-form-section">
          <h3>Cultural Context</h3>
          <div className="admin-form-field">
            <textarea rows={5} value={form.cultural_context} onChange={e => update('cultural_context', e.target.value)} placeholder="When is this song sung? What is its significance?" />
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
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.featured} onChange={e => update('featured', e.target.checked)} style={{ width: 16, height: 16 }} />
                Featured Song (shown on homepage)
              </label>
            </div>
          </div>
        </div>

        <div className="admin-form-actions">
          {message && <p className={message.startsWith('Error') ? 'admin-error' : 'admin-success'}>{message}</p>}
          <button type="button" onClick={onCancel} className="admin-btn-secondary">Cancel</button>
          <button type="submit" disabled={saving} className="admin-btn-primary">
            {saving ? 'Publishing...' : 'Publish to Archive'}
          </button>
        </div>
      </form>
    </div>
  );
}
