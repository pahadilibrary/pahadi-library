import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSongs, getSong } from "@/lib/songs";

export function generateStaticParams() {
  return getAllSongs().map((song) => ({ slug: song.slug }));
}

export default async function SongDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const song = getSong(slug);
  if (!song) notFound();

  return (
    <>
      {/* Banner image — wide landscape */}
      <section
        style={{
          width: "100%",
          height: "360px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={song.image}
          alt={song.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "40px",
            maxWidth: "700px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-raleway)",
              fontSize: "9px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "3px",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "8px",
            }}
          >
            {song.occasion} · {song.region}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "34px",
              fontWeight: 400,
              color: "#ffffff",
              marginBottom: "6px",
            }}
          >
            {song.title}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "18px",
              fontWeight: 200,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {song.titleDevanagari}
          </p>
        </div>
      </section>

      {/* Song content */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "48px 40px 64px",
        }}
      >
        {/* Meta strip */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
            paddingBottom: "28px",
            borderBottom: "1px solid var(--border)",
            marginBottom: "40px",
          }}
        >
          {[
            { label: "Region", value: song.region },
            { label: "District", value: song.district },
            { label: "Occasion", value: song.occasion },
            { label: "Contributor", value: `${song.contributorName}, ${song.contributorVillage}` },
          ].map((item) => (
            <div key={item.label}>
              <span
                style={{
                  fontFamily: "var(--font-raleway)",
                  fontSize: "9px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  color: "var(--grey-text)",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "var(--dark-text)",
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Audio player */}
        {song.audioUrl && (
          <div style={{ marginBottom: "40px" }}>
            <p className="section-label" style={{ marginBottom: "10px" }}>
              Listen
            </p>
            <audio controls style={{ width: "100%" }}>
              <source src={song.audioUrl} />
            </audio>
          </div>
        )}

        {/* Lyrics — Garhwali */}
        {song.lyricsGarhwali && (
          <div style={{ marginBottom: "40px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "18px",
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
                Garhwali Lyrics
              </h2>
              <span
                style={{
                  fontFamily: "var(--font-raleway)",
                  fontSize: "9px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  background: "var(--light-blue)",
                  color: "var(--blue-dark)",
                  padding: "3px 10px",
                }}
              >
                Original
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "15px",
                fontWeight: 300,
                color: "var(--dark-text)",
                lineHeight: 2.2,
                paddingLeft: "20px",
                borderLeft: "2px solid var(--orange)",
                whiteSpace: "pre-line",
              }}
            >
              {song.lyricsGarhwali}
            </div>
          </div>
        )}

        {/* English Translation */}
        {song.lyricsEnglish && (
          <div style={{ marginBottom: "40px" }}>
            <h2
              style={{
                fontFamily: "var(--font-raleway)",
                fontSize: "25px",
                fontWeight: 400,
                color: "var(--grey-text)",
                marginBottom: "18px",
              }}
            >
              English Translation
            </h2>
            <div
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "13px",
                fontWeight: 200,
                color: "var(--grey-text)",
                lineHeight: 2,
                whiteSpace: "pre-line",
                textAlign: "justify",
              }}
            >
              {song.lyricsEnglish}
            </div>
          </div>
        )}

        {/* Hindi Translation */}
        {song.lyricsHindi && (
          <div style={{ marginBottom: "40px" }}>
            <h2
              style={{
                fontFamily: "var(--font-raleway)",
                fontSize: "25px",
                fontWeight: 400,
                color: "var(--grey-text)",
                marginBottom: "18px",
              }}
            >
              Hindi Translation
            </h2>
            <div
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "14px",
                fontWeight: 300,
                color: "var(--grey-text)",
                lineHeight: 2,
                whiteSpace: "pre-line",
              }}
            >
              {song.lyricsHindi}
            </div>
          </div>
        )}

        {/* Cultural Context */}
        {song.culturalContext && (
          <div style={{ marginBottom: "48px" }}>
            <h2
              style={{
                fontFamily: "var(--font-raleway)",
                fontSize: "25px",
                fontWeight: 400,
                color: "var(--grey-text)",
                marginBottom: "18px",
              }}
            >
              Cultural Context
            </h2>
            <div
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "13px",
                fontWeight: 200,
                color: "var(--grey-text)",
                lineHeight: 1.9,
                whiteSpace: "pre-line",
                textAlign: "justify",
              }}
            >
              {song.culturalContext}
            </div>
          </div>
        )}

        {/* Contributor credit */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p className="section-label" style={{ marginBottom: "6px" }}>
              Contributed by
            </p>
            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "17px",
                fontWeight: 400,
                color: "var(--dark-text)",
              }}
            >
              {song.contributorName}
            </p>
            <p
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "12px",
                fontWeight: 200,
                color: "var(--grey-text)",
              }}
            >
              {song.contributorVillage}
            </p>
          </div>
          <Link href="/songs" className="btn-outline">
            Back to All Songs
          </Link>
        </div>
      </div>
    </>
  );
}
