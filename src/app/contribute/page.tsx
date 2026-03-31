'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

export default function ContributePage() {
  const [form, setForm] = useState({
    contributor_name: '',
    contributor_village: '',
    song_name: '',
    occasion: '',
    lyrics: '',
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

    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
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
              Pahadi Library is built by the community. If you know a Pahadi song — from your village, your family, or your own memory — we want to hear from you.
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
                  onClick={() => { setSubmitted(false); setForm({ contributor_name: '', contributor_village: '', song_name: '', occasion: '', lyrics: '', cultural_context: '', youtube_link: '', email: '' }); }}
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
                  <label>Lyrics (Pahadi / Devanagari)</label>
                  <textarea rows={6} placeholder="Share the lyrics as you remember them..." value={form.lyrics} onChange={e => update('lyrics', e.target.value)} />
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
