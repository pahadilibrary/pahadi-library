'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './page.module.css';


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
      <section className={styles.insetBanner}>
        <img
          src="/images/IMG_20250412_151357706.jpg"
          alt="Himalayan village with prayer flags"
        />
        <div className={styles.bannerContent}>
          <p className={styles.tagline}>Share Your Knowledge</p>
          <h1>Contribute a Song</h1>
        </div>
      </section>

      <div className={styles.contributeBody}>
        {/* Guidelines */}
        <ScrollReveal>
          <div className={styles.contributeGuidelines}>
            <h2>How to Contribute</h2>
            <p>
              Himalaya Folk is built by the community. If you know a Pahadi song — from your village, your family, or your own memory — we want to hear from you.
            </p>
            <p>You can contribute in two ways:</p>
            <ul>
              <li><strong>Submit a new song</strong> — share original lyrics, translations, and any cultural context you know.</li>
              <li><strong>Correct an existing translation</strong> — if you find a mistake in any song on the archive, submit a correction with your reasoning and a proper reference.</li>
            </ul>
            <p>
              Please provide clear reasons and references when suggesting corrections. All contributions are credited to you with your name and village.
            </p>
          </div>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal>
          <div className={styles.contributeForm}>
            <h2>Submit a Song</h2>

            {submitted ? (
              <div className={styles.successMessage}>
                <h3>Thank You!</h3>
                <p>Your song has been submitted successfully. We will review it and add it to the archive soon.</p>
                <button
                  onClick={() => { 
                    setSubmitted(false); 
                    setForm({ 
                      contributor_name: '', 
                      contributor_village: '', 
                      song_name: '', 
                      occasion: '', 
                      lyrics_pahadi: '',
                      lyrics_hindi: '',
                      lyrics_english: '',
                      cultural_context: '', 
                      youtube_link: '', 
                      email: '' 
                    }); 
                  }}
                  className={styles.buttonOutline}
                >
                  Submit Another Song
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                  <div className={styles.formField}>
                    <label>Your Name *</label>
                    <input 
                      type="text" 
                      placeholder="Full name" 
                      value={form.contributor_name} 
                      onChange={e => update('contributor_name', e.target.value)} 
                      required 
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Village / Town</label>
                    <input 
                      type="text" 
                      placeholder="Where are you from?" 
                      value={form.contributor_village} 
                      onChange={e => update('contributor_village', e.target.value)} 
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Song Name *</label>
                    <input 
                      type="text" 
                      placeholder="Name of the song" 
                      value={form.song_name} 
                      onChange={e => update('song_name', e.target.value)} 
                      required 
                    />
                  </div>
                  <div className={styles.formField}>
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

                <div className={`${styles.formField} ${styles.formFieldFullWidth}`}>
                  <label>Lyrics in Pahadi *</label>
                  <textarea 
                    rows={6} 
                    placeholder="पहाड़ी भाषा में गीत के बोल लिखें..." 
                    value={form.lyrics_pahadi} 
                    onChange={e => update('lyrics_pahadi', e.target.value)} 
                  />
                </div>

                <div className={`${styles.formField} ${styles.formFieldFullWidth}`}>
                  <label>Lyrics in Hindi (optional)</label>
                  <textarea 
                    rows={4} 
                    placeholder="हिंदी अनुवाद या हिंदी में बोल लिखें..." 
                    value={form.lyrics_hindi} 
                    onChange={e => update('lyrics_hindi', e.target.value)} 
                  />
                </div>

                <div className={`${styles.formField} ${styles.formFieldFullWidth}`}>
                  <label>Lyrics in English (optional)</label>
                  <textarea 
                    rows={4} 
                    placeholder="English translation of this song ..." 
                    value={form.lyrics_english} 
                    onChange={e => update('lyrics_english', e.target.value)} 
                  />
                </div>

                <div className={`${styles.formField} ${styles.formFieldFullWidth}`}>
                  <label>Cultural Context / Notes</label>
                  <textarea 
                    rows={4} 
                    placeholder="When is this song traditionally sung? Any stories behind it?" 
                    value={form.cultural_context} 
                    onChange={e => update('cultural_context', e.target.value)} 
                  />
                </div>

                <div className={`${styles.formField} ${styles.formFieldFullWidth}`}>
                  <label>YouTube Link (optional)</label>
                  <input 
                    type="url" 
                    placeholder="https://youtube.com/..." 
                    value={form.youtube_link} 
                    onChange={e => update('youtube_link', e.target.value)} 
                  />
                </div>

                <div className={`${styles.formField} ${styles.formFieldFullWidth}`}>
                  <label>Email (optional — for follow-up)</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    value={form.email} 
                    onChange={e => update('email', e.target.value)} 
                  />
                </div>

                {error && <p className={styles.errorMessage}>{error}</p>}

                <div className={styles.submitContainer}>
                  <button type="submit" className={styles.buttonFilled} disabled={submitting}>
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