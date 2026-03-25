"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/songs", label: "Folk Songs" },
  { href: "/about", label: "About & Contribute" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{ background: "#ffffff", borderBottom: "1px solid rgba(170,170,170,0.2)" }}>
      {/* Top utility bar */}
      <div className="utility-bar">
        <span>connect@pahadilibrary.com</span>
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--grey-text)", fontSize: "13px" }}>YouTube</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--grey-text)", fontSize: "13px" }}>Instagram</a>
        </div>
      </div>

      {/* Main nav */}
      <div className="main-nav">
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="36" height="28" viewBox="0 0 36 28" fill="none" style={{ color: "var(--blue-dark)" }}>
            <path d="M18 2L32 26H4L18 2Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M12 10L22 26H2L12 10Z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M26 12L34 26H18L26 12Z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
          </svg>
          <div>
            <span style={{ fontFamily: "var(--font-fraunces)", fontSize: "22px", fontWeight: 400, color: "var(--dark-text)", letterSpacing: "-0.5px" }}>Pahadi</span>
            <span style={{ fontFamily: "var(--font-fraunces)", fontSize: "22px", fontWeight: 300, color: "var(--blue)", letterSpacing: "-0.5px" }}>Library</span>
          </div>
        </Link>

        {/* Hamburger button */}
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6l12 12M6 18L18 6" /></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7h18M3 12h18M3 17h18" /></svg>
          )}
        </button>

        {/* Nav links */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 300,
                  color: isActive ? "var(--orange)" : "rgb(68, 68, 68)",
                  letterSpacing: "0.5px", transition: "color 0.2s ease",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className={`mobile-nav-overlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />
    </header>
  );
}
