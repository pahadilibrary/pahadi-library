"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--blue-dark)",
        color: "#ffffff",
        padding: "56px 40px 32px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "60px",
        }}
      >
        {/* Column 1: About */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "20px",
              fontWeight: 400,
              color: "#ffffff",
              marginBottom: "16px",
            }}
          >
            Pahadi Library
          </h3>
          <p
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "12px",
              fontWeight: 200,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            A community-built digital archive preserving the folk songs, oral
            traditions, and living culture of the Garhwal Himalayas.
          </p>
        </div>

        {/* Column 2: Links */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-raleway)",
              fontSize: "10px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "2.5px",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "18px",
            }}
          >
            Navigate
          </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {[
              { href: "/", label: "Home" },
              { href: "/songs", label: "Folk Songs" },
              { href: "/about", label: "About Us" },
              { href: "/about#contribute", label: "Contribute a Song" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontSize: "12px",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "underline",
                  textDecorationColor: "rgba(255,255,255,0.3)",
                  textUnderlineOffset: "3px",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: Subscribe */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-raleway)",
              fontSize: "10px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "2.5px",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "18px",
            }}
          >
            Stay Connected
          </h4>
          <p
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "12px",
              fontWeight: 200,
              color: "rgba(255,255,255,0.7)",
              marginBottom: "14px",
            }}
          >
            Get updates on new songs and cultural stories from the Himalayas.
          </p>
          <form
            style={{ display: "flex", gap: "0" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "12px",
                fontWeight: 300,
                padding: "9px 14px",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRight: "none",
                background: "transparent",
                color: "#ffffff",
                outline: "none",
                flex: 1,
              }}
            />
            <button
              type="submit"
              style={{
                fontFamily: "var(--font-raleway)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                padding: "9px 20px",
                background: "var(--orange)",
                color: "#ffffff",
                border: "1px solid var(--orange)",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.15)",
          marginTop: "40px",
          paddingTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-poppins)",
            fontSize: "11px",
            fontWeight: 200,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          © 2026 Pahadi Library. A community cultural initiative.
        </span>
        <div style={{ display: "flex", gap: "16px" }}>
          {["YouTube", "Instagram", "WhatsApp"].map((platform) => (
            <a
              key={platform}
              href="#"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "11px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
