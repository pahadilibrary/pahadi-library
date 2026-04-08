import Link from 'next/link';
import { getAllSongsFromDB } from '@/lib/songs-db';
import ScrollReveal from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const allSongs = await getAllSongsFromDB();
  const featured = allSongs.filter((s) => s.featured).slice(0, 3);
  const recent = allSongs.slice(0, 4);

  return (
    <>
      {/* Hero Banner — Devanagari as visual anchor */}
      <section className="inset-banner inset-banner--centered">
        <img
          src="/images/IMG_20251009_092027966.jpg"
          alt="Himalayan landscape"
          style={{ objectPosition: 'center 50%' }}
        />
        <div className="banner-content banner-content--centered">
          <p className="tagline">Echoes of the Himalayas</p>
          <h1>A directory of Himalayan Folk</h1>
          <Link href="/songs" className="hero-cta" style={{ marginTop: '24px' }}>Explore the Archive</Link>
        </div>
      </section>

      {/* Description */}
      <ScrollReveal>
        <section className="desc-section">
          <p>
            From our motherland to you. Himalaya Folk exists to collect every fragment of culture we can — translating every song for those who feel alienated from the culture they were born in, documenting every story for those who never heard of it. We preserve these songs before they fade from living memory.
          </p>
        </section>
      </ScrollReveal>

      {/* Featured Songs */}
      <ScrollReveal>
        <section className="section-container">
          <span className="section-label">Featured</span>
          <h2 className="section-heading">From our Archive</h2>

          {featured.length <= 2 ? (
            <div className="card-featured-layout">
              {featured[0] && (
                <Link key={featured[0].slug} href={`/songs/${featured[0].slug}`} className="card-featured-primary">
                  <div className="card-featured-primary-image">
                    <img src={featured[0].image} alt={featured[0].title} />
                  </div>
                  <div className="card-featured-primary-content">
                    <p className="card-meta">{featured[0].region}</p>
                    <h3>{featured[0].title}</h3>
                    <p className="devanagari">{featured[0].title_devanagari}</p>
                    {featured[0].excerpt && <p className="card-excerpt">{featured[0].excerpt}</p>}
                    <span className="card-read-link">Read →</span>
                  </div>
                </Link>
              )}
              {featured[1] && (
                <Link key={featured[1].slug} href={`/songs/${featured[1].slug}`} className="card-featured-secondary">
                  <div className="song-card" style={{ height: '100%' }}>
                    <img src={featured[1].image} alt={featured[1].title} />
                    <div className="song-card-content">
                      <h4>{featured[1].title}</h4>
                      <p className="devanagari">{featured[1].title_devanagari}</p>
                      <p className="card-meta">{featured[1].region}</p>
                      <span className="card-read-link">Read →</span>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ) : (
            <div className="card-grid-3">
              {featured.map((song) => (
                <Link key={song.slug} href={`/songs/${song.slug}`}>
                  <div className="song-card">
                    <img src={song.image} alt={song.title} />
                    <div className="song-card-content">
                      <h4>{song.title}</h4>
                      <p className="devanagari">{song.title_devanagari}</p>
                      <p className="card-meta">{song.region}</p>
                      <span className="card-read-link">Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </ScrollReveal>

      {/* Secondary Banner */}
      <ScrollReveal>
        <section className="secondary-banner">
          <img
            src="/images/IMG_20250606_161811543.jpg"
            alt="Mountain valley in the Himalayas"
            style={{ objectPosition: 'center 50%' }}
          />
          <div className="secondary-banner-content">
            <h2>Every song carries a village&apos;s story.<br />Help us preserve them.</h2>
            <Link href="/contribute" className="btn-outline-white">Contribute a Song</Link>
          </div>
        </section>
      </ScrollReveal>

      {/* Recently Added */}
      <ScrollReveal>
        <section className="section-container" style={{ paddingTop: '80px' }}>
          <span className="section-label">Recently Added</span>
          <h2 className="section-heading">New in the Archive</h2>

          <div className="card-grid-3">
            {recent.slice(0, 3).map((song) => (
              <Link key={song.slug} href={`/songs/${song.slug}`}>
                <div className="song-card">
                  <img src={song.image} alt={song.title} />
                  <div className="song-card-content">
                    <h4>{song.title}</h4>
                    <p className="devanagari">{song.title_devanagari}</p>
                    <p className="card-meta">{song.region}</p>
                    <span className="card-read-link">Read →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section divider */}
      <div className="section-divider">
        <span>&#9650;</span>
      </div>

      {/* About Strip */}
      <ScrollReveal>
        <section className="about-strip">
          <div className="about-strip-image">
            <img
              src="/images/IMG_20251009_090408599.jpg"
              alt="Himalayan village scene"
            />
          </div>
          <div>
            <span className="section-label">About the Archive</span>
            <h2 style={{ marginBottom: '18px' }}>Why This Archive?</h2>
            <p style={{ marginBottom: '16px' }}>
              I always wanted to know the lyrics of Pahadi songs, but there was no website, no place where I could find decent translations. So I built one — a single platform for the culture I grew up with.
            </p>
            <p style={{ marginBottom: '24px' }}>
              The songs of the Himalayas are living repositories of history, ecology, and community bonds. With migration emptying mountain villages, these songs risk being lost within a generation.
            </p>
            <Link href="/about" className="btn-outline">Read More</Link>
          </div>
        </section>
      </ScrollReveal>

      {/* Bottom CTA */}
      <ScrollReveal>
        <section className="bottom-cta">
          <span className="section-label">Join the Archive</span>
          <h2>Know a song from your village?</h2>
          <p>
            Share a song your grandmother sang, and help build the largest Pahadi music archive.
          </p>
          <Link href="/contribute" className="btn-filled">Submit a Song</Link>
        </section>
      </ScrollReveal>
    </>
  );
}
