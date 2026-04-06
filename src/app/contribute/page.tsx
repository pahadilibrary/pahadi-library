'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

// Note: metadata must be in a separate layout or parent server component for client pages
// For now, the root layout template handles the base SEO

export default function ContributePage() {
  const [form, setForm] = useState({
    contributor_name: '',
    contributor_village: '',
    song_name: '',
    occasion: '',
    lyrics_pahadi: '',
    lyrics_hindi: '',
    lyrics_english: '',
    cultural_context: '',
    youtube_link: '',
    email: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    // Combine lyrics into a structured format for the API
    const lyricsparts: string[] = [];
    if (form.lyrics_pahadi.trim()) lyricsparts.push(`[PAHADI]\n${form.lyrics_pahadi.trim()}`);
    if (form.lyrics_hindi.trim()) lyricsparts.push(`[HINDI]\n${form.lyrics_hindi.trim()}`);
    if (form.lyrics_english.trim()) lyricsparts.push(`[ENGLISH]\n${form.lyrics_english.trim()}`);

    const payload = {
      contributor_name: form.contributor_name,
      contributor_village: form.contributor_village,
      song_name: form.song_name,
      occasion: form.occasion,
      lyrics: lyricsparts.join('\n\n'),
      cultural_context: form.cultural_context,
      youtube_link: form.youtube_link,
      email: form.email,
    };

    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      const data = await res.json();
      setError(data.error || 'Something went wrong. Please try again.');
    }
    setSubmitting(false);
  }

  return (
    <>
      {/* Banner */}
      <section className="inset-banner" style={{ height: '320px' }}>
        <img
          src="/images/IMG_20250412_151357706.jpg"
          alt="Himalayan village with prayer flags"
          style={{ objectPosition: 'center 50%' }}
        />
        <div className="banner-content">
          <p className="tagline">Share Your Knowledge</p>
          <h1>Contribute a Song</h1>
        </div>
      </section>

      <div className="contribute-body">
        {/* Guidelines */}
        <ScrollReveal>
          <div className="contribute-guidelines">
            <h2>How to Contribute</h2>
            <p>
              Himalaya Folk is built by the community. If you know a Pahadi song — from your village, your family, or your own memory — we want to hear from you.
            </p>
            <p style={{ marginTop: '12px' }}>You can contribute in two ways:</p>
            <ul>
              <li><strong>Submit a new song</strong> — share original lyrics, translations, and any cultural context you know.</li>
              <li><strong>Correct an existing translation</strong> — if you find a mistake in any song on the archive, submit a correction with your reasoning and a proper reference.</li>
            </ul>
            <p style={{ marginTop: '12px' }}>
              Please provide clear reasons and references when suggesting corrections. All contributions are credited to you with your name and village.
            </p>
          </div>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal>
          <div className="contribute-form">
            <h2>Submit a Song</h2>

            {submitted ? (
              <div style={{ padding: '40px 0', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--accent)', marginBottom: '12px' }}>Thank You!</h3>
                <p>Your song has been submitted successfully. We will review it and add it to the archive soon.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ contributor_name: '', contributor_village: '', song_name: '', occasion: '', lyrics_pahadi: '', lyrics_hindi: '', lyrics_english: '', cultural_context: '', youtube_link: '', email: '' }); }}
                  className="btn-outline"
                  style={{ marginTop: '24px' }}
                >
                  Submit Another Song
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-field">
                    <label>Your Name *</label>
                    <input type="text" placeholder="Full name" value={form.contributor_name} onChange={e => update('contributor_name', e.target.value)} required />
                  </div>
                  <div className="form-field">
                    <label>Village / Town</label>
                    <input type="text" placeholder="Where are you from?" value={form.contributor_village} onChange={e => update('contributor_village', e.target.value)} />
                  </div>
                  <div className="form-field">
                    <label>Song Name *</label>
                    <input type="text" placeholder="Name of the song" value={form.song_name} onChange={e => update('song_name', e.target.value)} required />
                  </div>
                  <div className="form-field">
                    <label>Occasion</label>
                    <select value={form.occasion} onChange={e => update('occasion', e.target.value)}>
                      <option value="">Select an occasion</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Harvest / Agricultural">Harvest / Agricultural</option>
                      <option value="Holi">Holi</option>
                      <option value="Ritual / Devotional">Ritual / Devotional</option>
                      <option value="Spring / Seasonal">Spring / Seasonal</option>
                      <option value="Longing / Separation">Longing / Separation</option>
                      <option value="Work Song">Work Song</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-field full-width" style={{ marginBottom: '16px' }}>
                  <label>Lyrics in Pahadi *</label>
                  <textarea rows={5} placeholder="पहाड़ी भाषा में गीत के बोल लिखें..." value={form.lyrics_pahadi} onChange={e => update('lyrics_pahadi', e.target.value)} required />
                  <span style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px', display: 'block' }}>Original Pahadi / Garhwali / Kumaoni lyrics in Devanagari</span>
                </div>

                <div className="form-field full-width" style={{ marginBottom: '16px' }}>
                  <label>Lyrics in Hindi (optional)</label>
                  <textarea rows={5} placeholder="हिंदी अनुवाद या हिंदी में बोल लिखें..." value={form.lyrics_hindi} onChange={e => update('lyrics_hindi', e.target.value)} />
                  <span style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px', display: 'block' }}>Hindi translation or transliteration</span>
                </div>

                <div className="form-field full-width" style={{ marginBottom: '16px' }}>
                  <label>Lyrics in English (optional)</label>
                  <textarea rows={5} placeholder="English translation of the song..." value={form.lyrics_english} onChange={e => update('lyrics_english', e.target.value)} />
                  <span style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px', display: 'block' }}>English translation — poetic or literal</span>
                </div>

                <div className="form-field full-width" style={{ marginBottom: '16px' }}>
                  <label>Cultural Context / Notes</label>
                  <textarea rows={4} placeholder="When is this song traditionally sung? Any stories behind it?" value={form.cultural_context} onChange={e => update('cultural_context', e.target.value)} />
                </div>

                <div className="form-field full-width" style={{ marginBottom: '16px' }}>
                  <label>YouTube Link (optional)</label>
                  <input type="url" placeholder="https://youtube.com/..." value={form.youtube_link} onChange={e => update('youtube_link', e.target.value)} />
                </div>

                <div className="form-field full-width" style={{ marginBottom: '24px' }}>
                  <label>Email (optional — for follow-up)</label>
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
                </div>

                {error && <p style={{ color: '#d32f2f', fontSize: '14px', textAlign: 'center', marginBottom: '16px' }}>{error}</p>}

                <div style={{ textAlign: 'center' }}>
                  <button type="submit" className="btn-filled" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Song'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}
