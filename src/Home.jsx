const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
`;

const P = {
  cream: "#FAF3E0", parchment: "#F5E6CA", warmBrown: "#5D4037",
  darkBrown: "#3E2723", sage: "#6B8F71", softGold: "#C9A96E", muted: "#8B7D6B",
};

const DECKS = [
  {
    id: "birds",
    img: "/BendNaturalist/Birds Card.png",
    ready: true,
  },
  { id: "mammals", img: null, ready: false },
  { id: "wildflowers", img: null, ready: false },
  { id: "reptiles", img: null, ready: false },
];

export default function Home({ onSelect }) {
  return (
    <>
      <style>{fonts}{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #FAF3E0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { opacity:0; animation: fadeUp 0.55s ease forwards; }
        .deck-card {
          transition: transform 0.18s ease, filter 0.18s ease;
        }
        .deck-card.ready {
          cursor: pointer;
        }
        .deck-card.ready:hover {
          transform: translateY(-6px) scale(1.03);
          filter: drop-shadow(0 12px 24px rgba(93,64,55,0.28));
        }
        .deck-card.ready:active {
          transform: translateY(-2px) scale(1.01);
        }
        .deck-card.coming-soon {
          opacity: 0.45;
          cursor: default;
          filter: grayscale(0.4);
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${P.cream}, #EDE1CF)`,
        fontFamily: "'Lora', Georgia, serif",
        color: P.darkBrown,
        padding: "44px 24px 64px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>

        {/* Header */}
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 44, animationDelay: "0s" }}>
          <p style={{ fontSize: "0.75rem", color: P.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>
            Field Guide Flashcards
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2rem, 7vw, 3.4rem)",
            fontWeight: 700,
            color: P.warmBrown,
            letterSpacing: "0.02em",
            lineHeight: 1.15,
            marginBottom: 12,
          }}>
            Bend Naturalist
          </h1>
          <div style={{ width: 56, height: 3, borderRadius: 2, background: P.softGold, margin: "0 auto 14px" }} />
          <p style={{ fontSize: "0.88rem", color: P.muted, fontStyle: "italic" }}>
            Choose a deck to begin
          </p>
        </div>

        {/* Bird card — full width, natural landscape ratio */}
        <div
          className="deck-card fade-up ready"
          style={{ animationDelay: "0.1s", width: "100%", maxWidth: 500 }}
          onClick={() => onSelect("birds")}
        >
          <img
            src="/BendNaturalist/Birds Card.png"
            alt="Birds of Central Oregon"
            style={{ width: "100%", display: "block" }}
          />
        </div>

        {/* Coming soon placeholders */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          width: "100%",
          maxWidth: 500,
          marginTop: 20,
        }}>
          {DECKS.filter(d => !d.ready).map((deck, i) => (
            <div
              key={deck.id}
              className="deck-card fade-up coming-soon"
              style={{ animationDelay: `${0.22 + i * 0.09}s` }}
            >
              <div style={{
                aspectRatio: "2/3",
                borderRadius: 14,
                border: `2px dashed ${P.softGold}70`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: `linear-gradient(135deg, ${P.softGold}12, ${P.softGold}28)`,
              }}>
                <span style={{ fontSize: "1.8rem", opacity: 0.4 }}>
                  {deck.id === "mammals" ? "🦌" : deck.id === "wildflowers" ? "🌸" : "🦎"}
                </span>
                <p style={{ fontSize: "0.6rem", color: P.muted, letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center", padding: "0 4px" }}>
                  Coming Soon
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Beta note */}
        <div className="fade-up" style={{ animationDelay: "0.5s", marginTop: 48, textAlign: "center" }}>
          <span style={{
            display: "inline-block", padding: "3px 12px", borderRadius: 20,
            border: `1px solid ${P.softGold}`, background: `${P.softGold}22`,
            fontSize: "0.68rem", color: P.warmBrown, letterSpacing: "0.1em",
            textTransform: "uppercase", fontWeight: 600, marginBottom: 10,
          }}>
            Beta Version
          </span>
          <p style={{ fontSize: "0.75rem", color: `${P.muted}99`, fontStyle: "italic", lineHeight: 1.6 }}>
            More decks in development<br />Created for the naturalists of Central Oregon
          </p>
        </div>

      </div>
    </>
  );
}
