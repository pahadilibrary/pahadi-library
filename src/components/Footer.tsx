'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setSubscribed(true);
      setEmail('');
    }
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Left: About + nav */}
          <div>
            <h4>Himalaya Folk</h4>
            <p style={{ fontSize: '15px', lineHeight: 1.75, marginBottom: '20px', color: 'rgba(255,255,255,0.7)' }}>
              A community-built digital archive preserving the songs and living culture of the Himalayas.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/">Home</Link>
              <Link href="/songs">Songs</Link>
              <Link href="/about">About</Link>
              <Link href="/contribute">Contribute</Link>
            </div>
          </div>

          {/* Right: Subscribe */}
          <div className="footer-subscribe">
            <h4>Stay Connected</h4>
            <p style={{ fontSize: '15px', lineHeight: 1.75, marginBottom: '14px', color: 'rgba(255,255,255,0.7)' }}>
              Get updates on new songs and cultural stories from the Himalayas.
            </p>
            {subscribed ? (
              <p style={{ color: 'var(--accent)', fontSize: '14px' }}>Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Submit</button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>
            Made with love in Uttarakhand &middot; &copy; 2026 Himalaya Folk
          </span>
          <div className="footer-social">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
