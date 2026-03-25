export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <section className="songs-banner">
        <p className="section-label" style={{ color: "rgba(255,255,255,0.5)", marginBottom: "12px" }}>Our Mission</p>
        <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "32px", fontWeight: 400, color: "#ffffff" }}>
          About Pahadi Library
        </h1>
      </section>

      {/* About — two-column */}
      <section className="about-grid about-grid-start">
        <div>
          <img src="https://images.unsplash.com/photo-1486551937199-baf066858de7?w=600&h=450&fit=crop" alt="Himalayan village landscape" style={{ width: "100%", display: "block" }} />
        </div>
        <div>
          <p className="section-label" style={{ marginBottom: "12px" }}>The Story</p>
          <h2 style={{ fontFamily: "var(--font-raleway)", fontSize: "25px", fontWeight: 400, color: "var(--grey-text)", marginBottom: "18px" }}>Why We Built This</h2>
          <p style={{ fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 200, color: "var(--grey-text)", lineHeight: 1.9, marginBottom: "18px", textAlign: "justify" }}>
            The Garhwal Himalayas hold one of the richest oral traditions in South Asia. Hundreds of folk songs — carrying centuries of cultural knowledge about rituals, ecology, agriculture, and social bonds — exist only in the memories of elderly villagers. As migration empties mountain villages and the last generation of traditional singers ages, these songs face extinction.
          </p>
          <p style={{ fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 200, color: "var(--grey-text)", lineHeight: 1.9, marginBottom: "18px", textAlign: "justify" }}>
            Pahadi Library was created to build a permanent, accessible digital record of Garhwali folk music. We collect songs from contributors across Uttarakhand, document them with original Garhwali lyrics (Devanagari), translations in English and Hindi, cultural context notes, and audio — all credited to the individuals and villages that keep these traditions alive.
          </p>
          <p style={{ fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 200, color: "var(--grey-text)", lineHeight: 1.9, textAlign: "justify" }}>
            This is not a streaming service. This is a cultural archive — built by the community, for the community, with the goal of ensuring that no song is lost to time.
          </p>
        </div>
      </section>

      {/* Roadmap */}
      <section className="section-pad" style={{ borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p className="section-label" style={{ marginBottom: "12px" }}>Roadmap</p>
            <h2 style={{ fontFamily: "var(--font-raleway)", fontSize: "25px", fontWeight: 400, color: "var(--grey-text)" }}>Building in Phases</h2>
          </div>

          <div className="roadmap-grid">
            {[
              { phase: "Phase 1", title: "Garhwali Folk Songs", status: "Current", items: ["10+ songs with full lyrics in 3 languages", "Cultural context documentation", "Audio recordings where available", "Contributor credits from villages"] },
              { phase: "Phase 2", title: "Expanded Archive", status: "Planned", items: ["50+ songs across all Garhwali regions", "Kumaoni folk songs addition", "Audio recording campaigns", "Community contributor portal"] },
              { phase: "Phase 3", title: "Pan-Himalayan", status: "Vision", items: ["Jaunsari, Bhotiya traditions", "Oral narratives and folk tales", "Academic collaboration", "Podcast series with culture bearers"] },
            ].map((phase) => (
              <div key={phase.phase}>
                <div style={{ width: "100%", height: "2px", background: phase.status === "Current" ? "var(--orange)" : "var(--border)", marginBottom: "20px" }} />
                <span style={{ fontFamily: "var(--font-raleway)", fontSize: "9px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "2px", color: phase.status === "Current" ? "var(--orange)" : "var(--grey-text)" }}>
                  {phase.phase} — {phase.status}
                </span>
                <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "18px", fontWeight: 400, color: "var(--dark-text)", margin: "10px 0 14px" }}>{phase.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {phase.items.map((item) => (
                    <li key={item} style={{ fontFamily: "var(--font-poppins)", fontSize: "12px", fontWeight: 200, color: "var(--grey-text)", lineHeight: 1.6, paddingLeft: "14px", position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: "var(--orange)" }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribute Form */}
      <section id="contribute" className="contribute-section" style={{ borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p className="section-label" style={{ marginBottom: "12px" }}>Share a Song</p>
            <h2 style={{ fontFamily: "var(--font-raleway)", fontSize: "25px", fontWeight: 400, color: "var(--grey-text)", marginBottom: "12px" }}>Contribute to the Archive</h2>
            <p style={{ fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 200, color: "var(--grey-text)", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto" }}>
              Know a folk song from your village or family? Help us preserve it. Fill in what you can — every bit of knowledge matters.
            </p>
          </div>

          <form style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="contribute-form-grid">
              <div>
                <label style={{ fontFamily: "var(--font-raleway)", fontSize: "9px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "2px", color: "var(--grey-text)", display: "block", marginBottom: "6px" }}>Your Name</label>
                <input type="text" style={{ width: "100%", fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 300, padding: "10px 14px", border: "1px solid var(--border)", outline: "none", color: "var(--dark-text)" }} />
              </div>
              <div>
                <label style={{ fontFamily: "var(--font-raleway)", fontSize: "9px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "2px", color: "var(--grey-text)", display: "block", marginBottom: "6px" }}>Village / Town</label>
                <input type="text" style={{ width: "100%", fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 300, padding: "10px 14px", border: "1px solid var(--border)", outline: "none", color: "var(--dark-text)" }} />
              </div>
            </div>

            <div className="contribute-form-grid">
              <div>
                <label style={{ fontFamily: "var(--font-raleway)", fontSize: "9px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "2px", color: "var(--grey-text)", display: "block", marginBottom: "6px" }}>Song Name</label>
                <input type="text" style={{ width: "100%", fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 300, padding: "10px 14px", border: "1px solid var(--border)", outline: "none", color: "var(--dark-text)" }} />
              </div>
              <div>
                <label style={{ fontFamily: "var(--font-raleway)", fontSize: "9px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "2px", color: "var(--grey-text)", display: "block", marginBottom: "6px" }}>Occasion</label>
                <select style={{ width: "100%", fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 300, padding: "10px 14px", border: "1px solid var(--border)", background: "#ffffff", outline: "none", color: "var(--grey-text)", cursor: "pointer" }}>
                  <option value="">Select an occasion</option>
                  <option value="wedding">Wedding</option>
                  <option value="harvest">Harvest / Agricultural</option>
                  <option value="holi">Holi</option>
                  <option value="ritual">Ritual / Devotional</option>
                  <option value="spring">Spring / Seasonal</option>
                  <option value="separation">Longing / Separation</option>
                  <option value="work">Work Song</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontFamily: "var(--font-raleway)", fontSize: "9px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "2px", color: "var(--grey-text)", display: "block", marginBottom: "6px" }}>Lyrics (Garhwali / Devanagari)</label>
              <textarea rows={6} placeholder="Share the lyrics as you remember them..." style={{ width: "100%", fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 300, padding: "12px 14px", border: "1px solid var(--border)", outline: "none", color: "var(--dark-text)", resize: "vertical", lineHeight: 1.8 }} />
            </div>

            <div>
              <label style={{ fontFamily: "var(--font-raleway)", fontSize: "9px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "2px", color: "var(--grey-text)", display: "block", marginBottom: "6px" }}>Cultural Context / Notes</label>
              <textarea rows={4} placeholder="When is this song traditionally sung? Any stories behind it?" style={{ width: "100%", fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 300, padding: "12px 14px", border: "1px solid var(--border)", outline: "none", color: "var(--dark-text)", resize: "vertical", lineHeight: 1.8 }} />
            </div>

            <div>
              <label style={{ fontFamily: "var(--font-raleway)", fontSize: "9px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "2px", color: "var(--grey-text)", display: "block", marginBottom: "6px" }}>Email (optional — for follow-up)</label>
              <input type="email" style={{ width: "100%", fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 300, padding: "10px 14px", border: "1px solid var(--border)", outline: "none", color: "var(--dark-text)" }} />
            </div>

            <div style={{ textAlign: "center", paddingTop: "8px" }}>
              <button type="submit" className="btn-filled">Submit Song</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
