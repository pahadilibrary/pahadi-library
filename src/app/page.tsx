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
      {/* Masthead — issue framing */}
      <div className="home-masthead">
        <div className="home-masthead-inner">
          <span className="issue-tag">An archive of Himalayan folk · <em>Volume I</em></span>
          <span className="issue-tag" style={{ textAlign: 'right' }}>Est. 2026 · Tehri Garhwal</span>
        </div>
      </div>

      {/* Hero Banner */}
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

      {/* Epigraph */}
      <ScrollReveal>
        <section className="desc-section">
          From our motherland to you. Himalaya Folk gathers the songs, stories and silences of these mountains — translating each one for those who feel a little distant from the culture they came from, and remembering them before they slip from living memory.
        </section>
      </ScrollReveal>

      {/* Featured Songs */}
      <ScrollReveal>
        <section className="section-container">
          <span className="section-label">From the Archive</span>
          <h2 className="section-heading">Featured songs</h2>

          {featured.length <= 2 ? (
            <div className="card-featured-layout">
              {featured[0] && (
                <Link key={featured[0].slug} href={`/songs/${featured[0].slug}`} className="card-featured-primary">
                  <div className="card-featured-primary-image">
                    <img src={featured[0].image} alt={featured[0].title} />
                  </div>
                  <div className="card-featured-primary-content">
                    <span className="article-number">No. 01</span>
                    <p className="card-meta">{featured[0].region}</p>
                    <h3>{featured[0].title}</h3>
                    <p className="devanagari">{featured[0].title_devanagari}</p>
                    {featured[0].excerpt && <p className="card-excerpt">{featured[0].excerpt}</p>}
                    <span className="card-read-link">Read the song →</span>
                  </div>
                </Link>
              )}
              {featured[1] && (
                <Link key={featured[1].slug} href={`/songs/${featured[1].slug}`} className="card-featured-secondary">
                  <div className="song-card" style={{ height: '100%' }}>
                    <img src={featured[1].image} alt={featured[1].title} />
                    <div className="song-card-content">
                      <span className="article-number">No. 02</span>
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
              {featured.map((song, i) => (
                <Link key={song.slug} href={`/songs/${song.slug}`}>
                  <div className="song-card">
                    <img src={song.image} alt={song.title} />
                    <div className="song-card-content">
                      <span className="article-number">No. {String(i + 1).padStart(2, '0')}</span>
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
        <section className="section-container" style={{ paddingTop: '96px' }}>
          <span className="section-label">Recently Added</span>
          <h2 className="section-heading">New in the archive</h2>

          <div className="card-grid-3">
            {recent.slice(0, 3).map((song, i) => (
              <Link key={song.slug} href={`/songs/${song.slug}`}>
                <div className="song-card">
                  <img src={song.image} alt={song.title} />
                  <div className="song-card-content">
                    <span className="article-number">No. {String(i + 1).padStart(2, '0')}</span>
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

      {/* Ornamental divider */}
      <div className="ornament">
        <span>❦</span>
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
            <h2 style={{ marginBottom: '24px' }}>Why this archive?</h2>
            <p style={{ marginBottom: '32px' }}>
              I was born in Garhwal, and I have watched the youth grow distant from the culture they came from — including myself. I am not someone who can single-handedly revive what is fading, but I can offer this generation a glimpse of Garhwali, Kumaoni, and Himalayan culture through a native eye.
            </p>
            <Link href="/about" className="btn-outline">Read More</Link>
          </div>
        </section>
      </ScrollReveal>

      {/* Bottom CTA */}
      <ScrollReveal>
        <section className="bottom-cta">
          <span className="section-label" style={{ marginLeft: 'auto', marginRight: 'auto', display: 'inline-block' }}>Join the Archive</span>
          <h2>Know a song from your village?</h2>
          <p>
            Share a song your grandmother sang, and help build the largest archive of Himalayan folk music.
          </p>
          <Link href="/contribute" className="btn-filled">Submit a Song</Link>
        </section>
      </ScrollReveal>
    </>
  );
}
