'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 4000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    }
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          {/* Left Section: About */}
          <div className={styles.footerSection}>
            <h3>Pahadi Library</h3>
            <p>
              A community-built digital archive preserving the songs and living culture of the Himalayas. Celebrating the musical heritage of the mountains.
            </p>
            <div className={styles.footerLinks}>
              <Link href="/">Home</Link>
              <Link href="/songs">Songs</Link>
              <Link href="/about">About</Link>
              <Link href="/contribute">Contribute</Link>
            </div>
          </div>

          {/* Right Section: Subscribe */}
          <div className={styles.footerSection}>
            <h3>Stay Connected</h3>
            <p>
              Get updates on new songs and cultural stories from the Himalayas. Join our growing community.
            </p>
            <div className={styles.subscribeBox}>
              {subscribed ? (
                <p className={`${styles.statusMessage} ${styles.success}`}>
                  ✓ Thank you for subscribing! Check your inbox.
                </p>
              ) : (
                <form className={styles.subscribeForm} onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    required
                  />
                  {error && <p className={`${styles.statusMessage} ${styles.error}`}>{error}</p>}
                  <button type="submit">Subscribe</button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.footerBottom}>
          <div>
            <span className={styles.footerCopyright}>
              Made with ❤️ in Uttarakhand • © {currentYear} Pahadi Library
            </span>
            <div className={styles.footerContactSpacing}>
              <a 
                href="mailto:connect@pahadilibrary.com"
                className={styles.footerContactEmail}
              >
                connect@pahadilibrary.com
              </a>
            </div>
          </div>
          <div className={styles.footerSocial}>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}