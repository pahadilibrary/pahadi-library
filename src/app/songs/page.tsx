"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SongMeta {
  slug: string;
  title: string;
  titleDevanagari: string;
  region: string;
  district: string;
  occasion: string;
  contributorName: string;
  contributorVillage: string;
  image: string;
  excerpt: string;
}

export default function SongsPage() {
  const [songs, setSongs] = useState<SongMeta[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [occasions, setOccasions] = useState<string[]>([]);
  const [filterRegion, setFilterRegion] = useState("all");
  const [filterOccasion, setFilterOccasion] = useState("all");

  useEffect(() => {
    fetch("/api/songs")
      .then((r) => r.json())
      .then((data) => {
        setSongs(data.songs);
        setRegions(data.regions);
        setOccasions(data.occasions);
      });
  }, []);

  const filtered = songs.filter((s) => {
    if (filterRegion !== "all" && s.region !== filterRegion) return false;
    if (filterOccasion !== "all" && s.occasion !== filterOccasion) return false;
    return true;
  });

  return (
    <>
      {/* Page banner */}
      <section className="songs-banner">
        <p className="section-label" style={{ color: "rgba(255,255,255,0.5)", marginBottom: "12px" }}>The Archive</p>
        <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "32px", fontWeight: 400, color: "#ffffff", marginBottom: "8px" }}>
          गढ़वाली लोक गीत
        </h1>
        <p style={{ fontFamily: "var(--font-poppins)", fontSize: "14px", fontWeight: 200, color: "rgba(255,255,255,0.6)" }}>
          Garhwali Folk Songs
        </p>
      </section>

      {/* Filters */}
      <section className="filter-bar">
        <span style={{ fontFamily: "var(--font-raleway)", fontSize: "9px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "2.5px", color: "var(--grey-text)" }}>
          Filter by
        </span>
        <select
          value={filterRegion}
          onChange={(e) => setFilterRegion(e.target.value)}
          style={{ fontFamily: "var(--font-poppins)", fontSize: "12px", fontWeight: 300, padding: "7px 14px", border: "1px solid var(--border)", background: "#ffffff", color: "var(--grey-text)", outline: "none", cursor: "pointer" }}
        >
          <option value="all">All Regions</option>
          {regions.map((r) => (<option key={r} value={r}>{r}</option>))}
        </select>
        <select
          value={filterOccasion}
          onChange={(e) => setFilterOccasion(e.target.value)}
          style={{ fontFamily: "var(--font-poppins)", fontSize: "12px", fontWeight: 300, padding: "7px 14px", border: "1px solid var(--border)", background: "#ffffff", color: "var(--grey-text)", outline: "none", cursor: "pointer" }}
        >
          <option value="all">All Occasions</option>
          {occasions.map((o) => (<option key={o} value={o}>{o}</option>))}
        </select>
        <span className="filter-count" style={{ fontFamily: "var(--font-poppins)", fontSize: "11px", fontWeight: 300, color: "var(--grey-text)", marginLeft: "auto" }}>
          {filtered.length} song{filtered.length !== 1 ? "s" : ""}
        </span>
      </section>

      {/* Songs list */}
      <section className="songs-list">
        {filtered.map((song) => (
          <Link key={song.slug} href={`/songs/${song.slug}`} style={{ textDecoration: "none", display: "block" }}>
            <div
              className="song-row"
              onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(198,226,247,0.12)")}
              onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              <div className="song-row-thumb">
                <img src={song.image} alt={song.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <h3 className="song-row-title" style={{ fontFamily: "var(--font-fraunces)", fontSize: "17px", fontWeight: 400, color: "var(--dark-text)", marginBottom: "4px" }}>
                  {song.title}
                  <span className="devanagari-inline" style={{ fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 200, color: "var(--grey-text)", marginLeft: "10px" }}>
                    {song.titleDevanagari}
                  </span>
                </h3>
                <p style={{ fontFamily: "var(--font-poppins)", fontSize: "12px", fontWeight: 200, color: "var(--grey-text)", lineHeight: 1.6, maxWidth: "520px" }}>
                  {song.excerpt}
                </p>
              </div>
              <div className="song-row-tags">
                <span style={{ fontFamily: "var(--font-raleway)", fontSize: "9px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "1.5px", background: "var(--light-blue)", color: "var(--blue-dark)", padding: "3px 10px" }}>
                  {song.occasion}
                </span>
                <span style={{ fontFamily: "var(--font-poppins)", fontSize: "10px", fontWeight: 300, color: "var(--grey-text)" }}>
                  {song.region}
                </span>
              </div>
            </div>
          </Link>
        ))}

        {filtered.length === 0 && songs.length > 0 && (
          <div style={{ padding: "48px 0", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 200, color: "var(--grey-text)" }}>
              No songs match your filters. Try adjusting your selection.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
