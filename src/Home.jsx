const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
`;

const P = {
  cream: "#FAF3E0", parchment: "#F5E6CA", warmBrown: "#5D4037",
  darkBrown: "#3E2723", sage: "#6B8F71", softGold: "#C9A96E", muted: "#8B7D6B",
};

export default function Home({ onSelect }) {
  const decks = [
    {
      id: "birds",
      title: "Birds of Central Oregon",
      img: "/BendNaturalist/BirdsofCentralOregonDeck.png",
      count: 30,
      ready: true,
    },
    {
      id: "mammals",
      title: "Mammals of Central Oregon",
      img: null,
      count: null,
      ready: false,
    },
    {
      id: "wildflowers",
      title: "Wildflowers of Central Oregon",
      img: null,
      count: null,
      ready: false,
    },
    {
      id: "reptiles",
      title: "Reptiles & Amphibians",
      img: null,
      count: null,
      ready: false,
    },
  ];

  return (
    <>
      <style>{fonts}{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #FAF3E0; }
        .deck-card {
          cursor: pointer;
          border-radius: 16px;
          overflow: hidden;
          border: 2px solid ${P.softGold};
          background: ${P.parchment};
          box-shadow: 0 4px 18px rgba(93,64,55,0.12);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          position: relative;
        }
        .deck-card.ready:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(93,64,55,0.22);
        }
        .deck-card.coming-soon {
          opacity: 0.55;
          cursor: default;
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${P.cream}, #EDE1CF)`,
        fontFamily: "'Lora', Georgia, serif",
        color: P.darkBrown,
        padding: "40px 20px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>

        {/* Header */}
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: "0.8rem", color: P.muted, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>
            Field Guide Flashcards
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2rem, 7vw, 3.2rem)",
            fontWeight: 700,
            color: P.warmBrown,
            letterSpacing: "0.02em",
            lineHeight: 1.15,
            marginBottom: 10,
          }}>
            Bend Naturalist
          </h1>
          <div style={{ width: 60, height: 3, borderRadius: 2, background: P.softGold, margin: "0 auto 12px" }} />
          <p style={{ fontSize: "0.9rem", color: P.muted, fontStyle: "italic" }}>
            Choose a deck to begin
          </p>
        </div>

        {/* Deck grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 20,
          width: "100%",
          maxWidth: 720,
        }}>
          {decks.map((deck, i) => (
            <div
              key={deck.id}
              className={`deck-card fade-up ${deck.ready ? "ready" : "coming-soon"}`}
              style={{ animationDelay: `${i * 0.08}s` }}
              onClick={() => deck.ready && onSelect(deck.id)}
            >
              {/* Image area */}
              <div style={{
                aspectRatio: "3/4",
                background: deck.img
                  ? "transparent"
                  : `linear-gradient(135deg, ${P.softGold}22, ${P.softGold}44)`,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {deck.img ? (
                  <img
                    src={deck.img}
                    alt={deck.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                  />
                ) : (
                  <span style={{ fontSize: "2.8rem", opacity: 0.35 }}>
                    {deck.id === "mammals" ? "🦌" : deck.id === "wildflowers" ? "🌸" : "🦎"}
                  </span>
                )}

                {/* Coming soon badge */}
                {!deck.ready && (
                  <div style={{
                    position: "absolute",
                    top: 10, left: 10,
                    padding: "3px 10px",
                    borderRadius: 20,
                    background: "rgba(0,0,0,0.45)",
                    backdropFilter: "blur(4px)",
                    fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.9)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}>
                    Coming Soon
                  </div>
                )}
              </div>

              {/* Label */}
              <div style={{ padding: "12px 14px 14px", borderTop: `1px solid ${P.softGold}40` }}>
                <p style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: P.darkBrown,
                  lineHeight: 1.3,
                  marginBottom: 4,
                }}>
                  {deck.title}
                </p>
                {deck.count && (
                  <p style={{ fontSize: "0.72rem", color: P.muted }}>
                    {deck.count} cards
                  </p>
                )}
                {deck.ready && (
                  <p style={{ fontSize: "0.72rem", color: P.sage, marginTop: 2 }}>
                    Tap to start →
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Beta disclaimer */}
        <div style={{
          marginTop: 48,
          padding: "12px 20px",
          borderRadius: 10,
          border: `1px solid ${P.softGold}80`,
          background: `${P.parchment}`,
          maxWidth: 480,
          textAlign: "center",
        }}>
          <p style={{ fontSize: "0.75rem", color: P.warmBrown, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
            Beta Version
          </p>
          <p style={{ fontSize: "0.78rem", color: P.muted, fontStyle: "italic", lineHeight: 1.5 }}>
            This app is in early development. Content and features may change. More decks are on the way — created for the naturalists of Central Oregon.
          </p>
        </div>
      </div>
    </>
  );
}
