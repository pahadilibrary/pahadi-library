import Link from "next/link";
import { getAllSongs } from "@/lib/songs";

export default function HomePage() {
  const allSongs = getAllSongs();
  const featured = allSongs.filter((s) => s.featured).slice(0, 4);
  const occasions = [...new Set(allSongs.map((s) => s.occasion))];

  return (
    <>
      {/* Hero Banner — wide, short, landscape (Zedtells pattern) */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "400px",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=500&fit=crop"
          alt="Garhwal Himalayan landscape"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            left: "40px",
            maxWidth: "600px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-raleway)",
              fontSize: "9px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "3px",
              color: "rgba(255,255,255,0.8)",
              marginBottom: "10px",
            }}
          >
            A Digital Cultural Archive
          </p>
          <h1
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "36px",
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 1.2,
              marginBottom: "14px",
            }}
          >
            Songs of the
            <br />
            Garhwal Himalayas
          </h1>
          <p
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "13px",
              fontWeight: 200,
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.7,
            }}
          >
            Preserving the folk music, oral traditions, and living culture of
            Uttarakhand&apos;s mountain communities.
          </p>
        </div>
      </section>

      {/* Description text below banner — Zedtells pattern: centered, no container */}
      <section
        style={{
          padding: "56px 40px",
          maxWidth: "780px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-poppins)",
            fontSize: "14px",
            fontWeight: 200,
            color: "var(--grey-text)",
            lineHeight: 1.9,
          }}
        >
          Pahadi Library is a community-built archive of Garhwali folk songs —
          lyrics in the original Devanagari, translations in English and Hindi,
          cultural context, audio recordings, and contributor credits from across
          the villages of Uttarakhand. We document the songs before they fade
          from living memory.
        </p>
      </section>

      {/* Featured Songs — 3-column flat card grid (Zedtells style) */}
      <section style={{ padding: "0 40px 64px", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "32px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-raleway)",
              fontSize: "25px",
              fontWeight: 400,
              color: "var(--grey-text)",
            }}
          >
            Featured from our Archive
          </h2>
          <Link
            href="/songs"
            className="btn-outline"
            style={{ fontSize: "10px", padding: "8px 20px" }}
          >
            View All Songs
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {featured.slice(0, 3).map((song) => (
            <Link
              key={song.slug}
              href={`/songs/${song.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div className="flat-card">
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={song.image}
                    alt={song.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="card-info-band">
                  <h4 style={{ marginBottom: "4px" }}>{song.title}</h4>
                  <p
                    style={{
                      fontFamily: "var(--font-poppins)",
                      fontSize: "11px",
                      fontWeight: 200,
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {song.titleDevanagari} · {song.region}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Secondary Banner — landscape image strip */}
      <section
        style={{
          width: "100%",
          height: "300px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=400&fit=crop"
          alt="Mountain valley in Garhwal"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 60%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,75,122,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <p
            className="section-label"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Community Initiative
          </p>
          <h2
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "28px",
              fontWeight: 400,
              color: "#ffffff",
              textAlign: "center",
              maxWidth: "600px",
            }}
          >
            Every song carries a village&apos;s story.
            <br />
            Help us preserve them.
          </h2>
          <Link
            href="/about#contribute"
            className="btn-outline"
            style={{
              borderColor: "#ffffff",
              color: "#ffffff",
              marginTop: "8px",
              fontSize: "10px",
            }}
          >
            Contribute a Song
          </Link>
        </div>
      </section>

      {/* About Strip — two-column: image left, text right (Zedtells pattern) */}
      <section
        style={{
          padding: "64px 40px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "56px",
          alignItems: "center",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&h=400&fit=crop"
            alt="Garhwali village scene"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>
        <div>
          <p className="section-label" style={{ marginBottom: "12px" }}>
            About the Archive
          </p>
          <h2
            style={{
              fontFamily: "var(--font-raleway)",
              fontSize: "25px",
              fontWeight: 400,
              color: "var(--grey-text)",
              marginBottom: "18px",
            }}
          >
            Pahadi Library
          </h2>
          <p
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "13px",
              fontWeight: 200,
              color: "var(--grey-text)",
              lineHeight: 1.9,
              marginBottom: "20px",
              textAlign: "justify",
            }}
          >
            The folk songs of Garhwal are not merely entertainment — they are
            living repositories of history, ecology, spirituality, and social
            bonds. Nyoli carries the ache of separation across valleys. Jagar
            invocations connect communities to their ancestral deities. Mangal
            geet encode wedding rituals in melody. Yet with migration
            accelerating and oral traditions fading, these songs risk being lost
            within a generation.
          </p>
          <p
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "13px",
              fontWeight: 200,
              color: "var(--grey-text)",
              lineHeight: 1.9,
              marginBottom: "24px",
              textAlign: "justify",
            }}
          >
            Pahadi Library documents each song with original Garhwali lyrics,
            English and Hindi translations, cultural context, and contributor
            credits — building a searchable, permanent record created by the
            community, for the community.
          </p>
          <Link href="/about" className="btn-outline">
            Read More
          </Link>
        </div>
      </section>

      {/* Pillars Section — Zedtells-style flat blocks */}
      <section
        style={{
          padding: "64px 40px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p className="section-label" style={{ marginBottom: "12px" }}>
              What We Preserve
            </p>
            <h2
              style={{
                fontFamily: "var(--font-raleway)",
                fontSize: "25px",
                fontWeight: 400,
                color: "var(--grey-text)",
              }}
            >
              Pillars of Pahadi Culture
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "32px",
            }}
          >
            {[
              {
                title: "Folk Songs",
                desc: "Wedding hymns, harvest songs, seasonal celebrations, and the haunting Nyoli of separation.",
                count: `${allSongs.length} songs`,
              },
              {
                title: "Oral Traditions",
                desc: "Jagar rituals, Pandav Lila dance-dramas, and the bardic traditions of the Jagari storytellers.",
                count: "Coming soon",
              },
              {
                title: "Living Ecology",
                desc: "The buransh, kafal, and the Chipko legacy — songs that carry ecological knowledge.",
                count: "Coming soon",
              },
              {
                title: "Community Voices",
                desc: "Contributors from villages across Garhwal sharing songs from their own family traditions.",
                count: `${occasions.length} occasions`,
              },
            ].map((pillar) => (
              <div key={pillar.title}>
                <div
                  style={{
                    width: "100%",
                    height: "2px",
                    background: "var(--orange)",
                    marginBottom: "20px",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "18px",
                    fontWeight: 400,
                    color: "var(--dark-text)",
                    marginBottom: "10px",
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-poppins)",
                    fontSize: "12px",
                    fontWeight: 200,
                    color: "var(--grey-text)",
                    lineHeight: 1.8,
                    marginBottom: "14px",
                  }}
                >
                  {pillar.desc}
                </p>
                <span
                  style={{
                    fontFamily: "var(--font-raleway)",
                    fontSize: "9px",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    color: "var(--orange)",
                  }}
                >
                  {pillar.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          padding: "56px 40px",
          textAlign: "center",
          borderTop: "1px solid var(--border)",
        }}
      >
        <p className="section-label" style={{ marginBottom: "12px" }}>
          Join the Archive
        </p>
        <h2
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "26px",
            fontWeight: 400,
            color: "var(--dark-text)",
            marginBottom: "16px",
          }}
        >
          Know a folk song from your village?
        </h2>
        <p
          style={{
            fontFamily: "var(--font-poppins)",
            fontSize: "13px",
            fontWeight: 200,
            color: "var(--grey-text)",
            maxWidth: "520px",
            margin: "0 auto 24px",
            lineHeight: 1.8,
          }}
        >
          We are collecting songs from contributors across Garhwal. Share a song
          your grandmother sang, and help build the largest Pahadi folk music
          archive.
        </p>
        <Link href="/about#contribute" className="btn-filled">
          Submit a Song
        </Link>
      </section>
    </>
  );
}
