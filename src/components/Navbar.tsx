"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/songs", label: "Folk Songs" },
  { href: "/about", label: "About & Contribute" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      style={{
        background: "#ffffff",
        borderBottom: "1px solid rgba(170,170,170,0.2)",
      }}
    >
      {/* Top utility bar */}
      <div
        style={{
          borderBottom: "1px solid rgba(170,170,170,0.15)",
          padding: "6px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "12px",
          fontFamily: "var(--font-poppins)",
          fontWeight: 300,
          color: "var(--grey-text)",
        }}
      >
        <span>connect@pahadilibrary.com</span>
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--grey-text)", fontSize: "13px" }}
          >
            YouTube
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--grey-text)", fontSize: "13px" }}
          >
            Instagram
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Mountain icon */}
          <svg
            width="36"
            height="28"
            viewBox="0 0 36 28"
            fill="none"
            style={{ color: "var(--blue-dark)" }}
          >
            <path
              d="M18 2L32 26H4L18 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M12 10L22 26H2L12 10Z"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M26 12L34 26H18L26 12Z"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
          </svg>
          <div>
            <span
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "22px",
                fontWeight: 400,
                color: "var(--dark-text)",
                letterSpacing: "-0.5px",
              }}
            >
              Pahadi
            </span>
            <span
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "22px",
                fontWeight: 300,
                color: "var(--blue)",
                letterSpacing: "-0.5px",
              }}
            >
              Library
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: isActive ? "var(--orange)" : "rgb(68, 68, 68)",
                  letterSpacing: "0.5px",
                  transition: "color 0.2s ease",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
