'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/songs', label: 'Songs' },
  { href: '/about', label: 'About' },
  { href: '/contribute', label: 'Contribute' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header>
      {/* Utility bar */}
      <div className="utility-bar">
        <span>connect@pahadilibrary.com</span>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4l11.733 16h4.267l-11.733-16h-4.267z"/><path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772"/></svg>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="main-nav">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Nanda Devi mountain silhouette */}
          <svg width="30" height="26" viewBox="0 0 40 35" fill="none">
            <path d="M20 3L5 32h30L20 3z" fill="none" stroke="rgb(106,138,120)" strokeWidth="1.5"/>
            <path d="M20 10L12 32h16L20 10z" fill="none" stroke="rgb(232,116,12)" strokeWidth="1" opacity="0.7"/>
            <path d="M17 32l3-8 3 8" fill="none" stroke="rgb(106,138,120)" strokeWidth="0.8"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '21px', fontWeight: 400, letterSpacing: '-0.5px' }}>
            <span style={{ color: '#FC7B03' }}>Pahadi</span>
            <span style={{ color: 'rgb(106, 138, 120)' }}>Library</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          {menuOpen && (
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'absolute', top: '28px', right: '28px',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '32px', color: 'var(--text-dark)', fontWeight: 300, lineHeight: 1
              }}
              aria-label="Close menu"
            >
              &times;
            </button>
          )}
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="3" y1="7" x2="21" y2="7"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="17" x2="21" y2="17"/>
          </svg>
        </button>
      </nav>
    </header>
  );
}
