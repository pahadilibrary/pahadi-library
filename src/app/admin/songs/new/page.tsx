'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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

const emptyForm: SongForm = {
  title: '',
  title_devanagari: '',
  slug: '',
  artist: '',
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
  glossary: [],
  status: 'published',
};

export default function AdminSongForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');

  const [form, setForm] = useState<SongForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [fromSubmissionId, setFromSubmissionId] = useState<string | null>(null);

  useEffect(() => {
    if (editId) {
      fetch('/api/admin/songs')
        .then(r => r.json())
        .then(data => {
          const song = (data.songs || []).find((s: { id: string }) => s.id === editId);
          if (song) {
            setForm({
              title: song.title || '',
              title_devanagari: song.title_devanagari || '',
              slug: song.slug || '',
              artist: song.artist || '',
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
              glossary: song.glossary || [],
              status: song.status || 'published',
            });
          }
        });
    } else {
      // Pre-fill from submission if coming from submissions page
      const submissionId = searchParams.get('from_submission');
      const rawLyrics = searchParams.get('lyrics_raw') || '';

      // Parse [PAHADI]/[HINDI]/[ENGLISH] blocks from raw lyrics
      let lyrics_original = '';
      let lyrics_hindi = '';
      let lyrics_english = '';
      const pahadiMatch = rawLyrics.match(/\[PAHADI\]\n([\s\S]*?)(?=\n\n\[|$)/);
      const hindiMatch = rawLyrics.match(/\[HINDI\]\n([\s\S]*?)(?=\n\n\[|$)/);
      const englishMatch = rawLyrics.match(/\[ENGLISH\]\n([\s\S]*?)(?=\n\n\[|$)/);
      if (pahadiMatch) lyrics_original = pahadiMatch[1].trim();
      if (hindiMatch) lyrics_hindi = hindiMatch[1].trim();
      if (englishMatch) lyrics_english = englishMatch[1].trim();
      // If no blocks, put everything in original
      if (!lyrics_original && !lyrics_hindi && !lyrics_english && rawLyrics) {
        lyrics_original = rawLyrics;
      }

      if (submissionId) {
        setFromSubmissionId(submissionId);
        const title = searchParams.get('title') || '';
        const slug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
        setForm(prev => ({
          ...prev,
          title,
          slug,
          occasion: searchParams.get('occasion') || '',
          contributor_name: searchParams.get('contributor_name') || '',
          contributor_village: searchParams.get('contributor_village') || '',
          cultural_context: searchParams.get('cultural_context') || '',
          lyrics_original,
          lyrics_hindi,
          lyrics_english,
        }));
      }
    }
  }, [editId]);

  function update(field: keyof SongForm, value: string | boolean | GlossaryEntry[]) {
    setForm(prev => ({ ...prev, [field]: value }));
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

  // Glossary helpers
  function addGlossaryEntry() {
    setForm(prev => ({
      ...prev,
      glossary: [...prev.glossary, { word: '', transliteration: '', meaning: '' }],
    }));
  }

  function updateGlossaryEntry(index: number, field: keyof GlossaryEntry, value: string) {
    setForm(prev => {
      const glossary = [...prev.glossary];
      glossary[index] = { ...glossary[index], [field]: value };
      return { ...prev, glossary };
    });
  }

  function removeGlossaryEntry(index: number) {
    setForm(prev => ({
      ...prev,
      glossary: prev.glossary.filter((_, i) => i !== index),
    }));
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
      // If published from a submission, mark it as approved
      if (fromSubmissionId) {
        await fetch('/api/admin/submissions', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: fromSubmissionId, status: 'approved', admin_notes: 'Published to archive.' }),
        });
      }
      setMessage(editId ? 'Song updated!' : 'Song created!');
      setTimeout(() => router.push(fromSubmissionId ? '/admin/submissions' : '/admin/songs'), 1000);
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
          <h1>{editId ? 'Edit Song' : fromSubmissionId ? 'Publish Submission to Archive' : 'Add New Song'}</h1>
          <p>{editId ? 'Update song details' : fromSubmissionId ? 'Review, complete, and publish the submitted song' : 'Add a new song to the archive'}</p>
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
              <label>Artist / Singer</label>
              <input type="text" value={form.artist} onChange={e => update('artist', e.target.value)} placeholder="e.g. Narendra Singh Negi" />
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
                      setMessage('Image uploaded!');
                    } else {
                      const data = await res.json();
                      setMessage(`Error: ${data.error}`);
                    }
                  }}
                />
                <p style={{ fontSize: '12px', color: 'var(--card-stats)', marginTop: '6px' }}>
                  JPG, PNG, or WebP. Max 5MB. Or paste a URL below:
                </p>
                <input
                  type="url"
                  value={form.image}
                  onChange={e => update('image', e.target.value)}
                  placeholder="https://... or upload above"
                  style={{ marginTop: '8px' }}
                />
              </div>
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

        {/* Glossary */}
        <div className="admin-form-section">
          <h3>Glossary of Pahadi Terms</h3>
          <p style={{ fontSize: '13px', color: 'var(--card-stats)', marginBottom: '20px' }}>
            Add words that cannot be directly translated. Each entry shows the Pahadi word, how to pronounce it, and a descriptive meaning.
          </p>

          {form.glossary.map((entry, i) => (
            <div key={i} className="glossary-entry-editor">
              <div className="admin-form-grid" style={{ gridTemplateColumns: '1fr 1fr 2fr auto' }}>
                <div className="admin-form-field">
                  <label>Pahadi Word</label>
                  <input
                    type="text"
                    value={entry.word}
                    onChange={e => updateGlossaryEntry(i, 'word', e.target.value)}
                    placeholder="e.g. काफल"
                  />
                </div>
                <div className="admin-form-field">
                  <label>Transliteration</label>
                  <input
                    type="text"
                    value={entry.transliteration}
                    onChange={e => updateGlossaryEntry(i, 'transliteration', e.target.value)}
                    placeholder="e.g. Kafal"
                  />
                </div>
                <div className="admin-form-field">
                  <label>Meaning / Description</label>
                  <input
                    type="text"
                    value={entry.meaning}
                    onChange={e => updateGlossaryEntry(i, 'meaning', e.target.value)}
                    placeholder="e.g. A wild berry found in the Himalayan hills, ripens in spring"
                  />
                </div>
                <div className="admin-form-field" style={{ justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => removeGlossaryEntry(i)} className="admin-btn-sm btn-danger">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button type="button" onClick={addGlossaryEntry} className="admin-btn-secondary" style={{ marginTop: '8px' }}>
            + Add Word
          </button>
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
          <button type="button" onClick={() => router.push(fromSubmissionId ? '/admin/submissions' : '/admin/songs')} className="admin-btn-secondary">Cancel</button>
          <button type="submit" disabled={saving} className="admin-btn-primary">
            {saving ? 'Saving...' : editId ? 'Update Song' : fromSubmissionId ? 'Publish to Archive' : 'Create Song'}
          </button>
        </div>
      </form>
    </div>
  );
}
