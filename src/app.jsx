import { useState, useEffect, useCallback, useRef, useMemo } from "react";

/* ───────────────────────────────────────────
   BIRDS OF CENTRAL OREGON — Flashcard Deck
   Inspired by the art & aesthetic of Wingspan
   ─────────────────────────────────────────── */


const BIRDS = [
  {
    name: "Mountain Bluebird",
    scientific: "Sialia currucoides",
    wiki: "Mountain_bluebird",
    xcId: "647423",
    color: "#4A90D9",
    facts: [
      "Males display brilliant cerulean plumage — one of the most vivid blues of any North American bird.",
      "They're cavity nesters that eagerly adopt nest boxes, making them a conservation success story in Central Oregon.",
      "Often the first migratory bird to return to the high desert in spring, sometimes arriving while snow still covers the ground."
    ],
    habitat: "Open meadows, sagebrush steppe, mountain parks"
  },
  {
    name: "Western Meadowlark",
    scientific: "Sturnella neglecta",
    wiki: "Western_meadowlark",
    xcId: "370746",
    color: "#E8B830",
    facts: [
      "Their rich, flute-like song is one of the most iconic sounds of the American West — and Oregon's state bird song.",
      "State bird of six U.S. states — more than any other species.",
      "The bold black 'V' on their yellow chest fades in winter and intensifies again each spring."
    ],
    habitat: "Grasslands, agricultural fields, sagebrush flats"
  },
  {
    name: "Steller's Jay",
    scientific: "Cyanocitta stelleri",
    wiki: "Steller%27s_jay",
    xcId: "297618",
    color: "#1B4F8A",
    facts: [
      "The only crested jay west of the Rocky Mountains — that dramatic crest can be raised or lowered to signal mood.",
      "Expert vocal mimics: they imitate Red-tailed Hawks, dogs, cats, and even mechanical sounds.",
      "Named after Georg Wilhelm Steller, the naturalist who first recorded the species in Alaska in 1741."
    ],
    habitat: "Conifer and mixed forests, campgrounds, mountain towns"
  },
  {
    name: "Clark's Nutcracker",
    scientific: "Nucifraga columbiana",
    wiki: "Clark%27s_nutcracker",
    xcId: "195647",
    color: "#8E8E8E",
    facts: [
      "Caches up to 98,000 pine seeds per season and remembers the location of each stash with over 90% accuracy months later.",
      "Primary seed disperser for whitebark pine — without this bird, entire high-elevation forests would vanish.",
      "Named for William Clark of the Lewis & Clark Expedition, who first described the species in 1805."
    ],
    habitat: "High-elevation conifer forests, timberline areas"
  },
  {
    name: "Osprey",
    scientific: "Pandion haliaetus",
    wiki: "Osprey",
    xcId: "322516",
    color: "#5D4037",
    facts: [
      "Can reverse an outer toe to grip fish with two talons on each side — the only raptor with this adaptation.",
      "Designated Oregon's official state raptor in 2017. Crane Prairie Reservoir hosts one of the densest nesting populations anywhere.",
      "Their 63-inch wingspan and dramatic feet-first fishing dives make them one of the most spectacular hunters in Central Oregon."
    ],
    habitat: "Lakes, reservoirs, rivers — always near water"
  },
  {
    name: "American Dipper",
    scientific: "Cinclus mexicanus",
    wiki: "American_dipper",
    xcId: "198322",
    color: "#4A5568",
    facts: [
      "North America's only truly aquatic songbird — walks along the bottom of fast-moving streams to hunt aquatic insects.",
      "Has a nictitating membrane (translucent third eyelid) and nasal flaps that seal shut underwater.",
      "Year-round resident of the Deschutes River, they sing even in the dead of winter while standing on ice."
    ],
    habitat: "Fast-flowing mountain streams and rivers"
  },
  {
    name: "White-headed Woodpecker",
    scientific: "Dryobates albolarvatus",
    wiki: "White-headed_woodpecker",
    xcId: "203591",
    color: "#2D2D2D",
    facts: [
      "One of the few woodpeckers that feeds heavily on pine seeds rather than insects — pries open ponderosa cones with its bill.",
      "An Oregon Conservation Strategy species — dependent on mature, open ponderosa pine forests that are increasingly rare.",
      "Despite a mostly black body, the bright white head makes them unmistakable — a true Central Oregon specialty bird."
    ],
    habitat: "Mature ponderosa pine forests"
  },
  {
    name: "Lewis's Woodpecker",
    scientific: "Melanerpes lewis",
    wiki: "Lewis%27s_woodpecker",
    xcId: "202978",
    color: "#8B4557",
    facts: [
      "Catches insects on the wing like a flycatcher — a behavior unique among North American woodpeckers.",
      "Named for Meriwether Lewis, who first described it near the mouth of the Salmon River, Idaho in 1805.",
      "Their iridescent green-black back, gray collar, and pink belly make them one of the most colorful woodpeckers."
    ],
    habitat: "Open ponderosa pine, burned forests, oak-pine woodland"
  },
  {
    name: "Pygmy Nuthatch",
    scientific: "Sitta pygmaea",
    wiki: "Pygmy_nuthatch",
    xcId: "197431",
    color: "#8B7D6B",
    facts: [
      "One of the few North American songbirds that uses 'helpers at the nest' — related birds assist the breeding pair.",
      "Entire flocks roost together in a single tree cavity on cold nights, huddling for warmth in groups of 100+.",
      "Their squeaky 'rubber ducky' calls are a constant soundtrack in Central Oregon's ponderosa pine forests."
    ],
    habitat: "Ponderosa pine forests"
  },
  {
    name: "Red-tailed Hawk",
    scientific: "Buteo jamaicensis",
    wiki: "Red-tailed_hawk",
    xcId: "155862",
    color: "#A0522D",
    facts: [
      "The most common hawk in North America — their piercing scream is the 'default' raptor call used in nearly every Hollywood film.",
      "Mate for life and reuse the same nest year after year, adding material until it can weigh several hundred pounds.",
      "Western birds show incredible color variation from nearly white to dark chocolate brown — a single species with many 'morphs.'"
    ],
    habitat: "Open country, grasslands, forest edges, highway corridors"
  },
  {
    name: "Great Horned Owl",
    scientific: "Bubo virginianus",
    wiki: "Great_horned_owl",
    xcId: "195050",
    color: "#4A3728",
    facts: [
      "Oregon's most widespread owl and one of the earliest nesters — they begin incubating eggs in January, even in freezing temperatures.",
      "Their grip strength is estimated at 300 psi — roughly the same as a large dog's bite.",
      "Apex nocturnal predator that takes prey as large as Great Blue Herons, house cats, and even skunks — they have almost no sense of smell."
    ],
    habitat: "Forests, canyons, juniper woodlands, urban areas"
  },
  {
    name: "Bald Eagle",
    scientific: "Haliaeetus leucocephalus",
    wiki: "Bald_eagle",
    xcId: "255336",
    color: "#3E2723",
    facts: [
      "Don't develop their iconic white head and tail until age 4–5; juveniles are mottled brown and often mistaken for Golden Eagles.",
      "Build the largest nests of any North American bird — the record is 9.5 feet wide, 20 feet deep, and nearly 3 tons.",
      "Winter congregations at Wickiup and Crane Prairie reservoirs can number in the dozens — one of Oregon's best eagle-watching spots."
    ],
    habitat: "Large lakes, reservoirs, rivers with tall perch trees"
  },
  {
    name: "Western Tanager",
    scientific: "Piranga ludoviciana",
    wiki: "Western_tanager",
    xcId: "220045",
    color: "#E85D26",
    facts: [
      "The northernmost-breeding tanager in the world, nesting as far north as Canada's Northwest Territories at 60°N.",
      "Males get their red head pigment from rhodoxanthin — a pigment they can only obtain from insects in their diet, not synthesize themselves.",
      "Despite their tropical appearance, they breed in conifer forests and are a common summer resident of the Central Oregon Cascades."
    ],
    habitat: "Conifer and mixed forests at mid to high elevations"
  },
  {
    name: "Calliope Hummingbird",
    scientific: "Selasphorus calliope",
    wiki: "Calliope_hummingbird",
    xcId: "303155",
    color: "#C850C0",
    facts: [
      "The smallest bird in North America — weighs about 2.5 grams, less than a penny.",
      "Undertakes one of the longest migrations relative to body size of any bird: 9,000 km round trip between Central Oregon and Mexico.",
      "Males flash iridescent magenta gorget rays in a starburst display while performing dramatic U-shaped courtship dives."
    ],
    habitat: "Mountain meadows, forest openings, riparian areas"
  },
  {
    name: "Mountain Chickadee",
    scientific: "Poecile gambeli",
    wiki: "Mountain_chickadee",
    xcId: "218397",
    color: "#6B7B6E",
    facts: [
      "Distinguished from other chickadees by a bold white eyebrow stripe — a field mark visible even at distance.",
      "Caches thousands of food items each autumn and relies on spatial memory to relocate them — their hippocampus actually enlarges in fall.",
      "Year-round resident of Central Oregon's ponderosa and lodgepole pine forests, often the most common bird at mountain feeders."
    ],
    habitat: "Conifer forests from ponderosa to subalpine"
  },
  {
    name: "Red Crossbill",
    scientific: "Loxia curvirostra",
    wiki: "Red_crossbill",
    xcId: "272413",
    color: "#C0392B",
    facts: [
      "Their crossed mandibles are uniquely specialized for prying open conifer cones — no other North American songbird has this adaptation.",
      "Can breed in any month of the year, timing nesting to match local cone crops — even mid-winter if food is abundant.",
      "Central Oregon hosts multiple 'types' (possibly separate species) specialized for different conifers: ponderosa, Douglas-fir, and lodgepole."
    ],
    habitat: "Conifer forests, especially where cone crops are heavy"
  },
  {
    name: "Common Raven",
    scientific: "Corvus corax",
    wiki: "Common_raven",
    xcId: "352953",
    color: "#1A1A2E",
    facts: [
      "Among the most intelligent birds on Earth — they use tools, plan ahead, and have been observed playing games like sliding down snowbanks.",
      "Have over 30 distinct vocalizations and can learn to mimic human speech, other animals, and mechanical sounds.",
      "Perform spectacular aerial acrobatics during courtship — barrel rolls, wingtip touches, and synchronized diving at speeds over 100 mph."
    ],
    habitat: "Nearly everywhere: forests, deserts, cliffs, towns"
  },
  {
    name: "Sandhill Crane",
    scientific: "Antigone canadensis",
    wiki: "Sandhill_crane",
    xcId: "190424",
    color: "#7B8B6F",
    facts: [
      "Standing nearly 5 feet tall with a 6.5-foot wingspan, they're Oregon's tallest bird — their rattling calls carry over a mile.",
      "Fossil evidence shows Sandhill Cranes have existed essentially unchanged for at least 2.5 million years — among the oldest living bird species.",
      "Thousands stage at Malheur National Wildlife Refuge each autumn, and breeding pairs return to Central Oregon's wet meadows every spring."
    ],
    habitat: "Wet meadows, marshes, agricultural fields"
  },
  {
    name: "Northern Flicker",
    scientific: "Colaptes auratus",
    wiki: "Northern_flicker",
    xcId: "189253",
    color: "#D4845A",
    facts: [
      "Unlike most woodpeckers, they feed primarily on the ground — ants make up nearly half their diet.",
      "The 'Red-shafted' form found in Central Oregon flashes salmon-pink underwings in flight — the Eastern form shows yellow.",
      "One of the few migratory woodpeckers in North America; many Central Oregon birds move to lower elevations or south in winter."
    ],
    habitat: "Open woodlands, forest edges, parks, yards"
  },
  {
    name: "Williamson's Sapsucker",
    scientific: "Sphyrapicus thyroideus",
    wiki: "Williamson%27s_sapsucker",
    xcId: "213735",
    color: "#2E4057",
    facts: [
      "Males and females look so different they were classified as two separate species until 1873.",
      "Males are jet-black with a yellow belly and red chin; females are pale brown with fine barring — barely recognizable as the same bird.",
      "Drills orderly rows of sap wells in ponderosa pine bark, which also attract insects that hummingbirds and other birds feed on."
    ],
    habitat: "Mature conifer forests, especially ponderosa and fir"
  },
  {
    name: "Golden Eagle",
    scientific: "Aquila chrysaetos",
    wiki: "Golden_eagle",
    xcId: "344588",
    color: "#8B6914",
    facts: [
      "With a wingspan up to 7.5 feet and diving speeds over 150 mph, they're one of the most powerful raptors in North America.",
      "Unlike Bald Eagles, they prefer open high desert and grasslands — Central Oregon's sagebrush steppe is prime habitat.",
      "Mate for life and maintain territories of up to 60 square miles, using the same cliff-side nest for decades."
    ],
    habitat: "Open sagebrush steppe, rimrock, grasslands"
  },
  {
    name: "Prairie Falcon",
    scientific: "Falco mexicanus",
    wiki: "Prairie_falcon",
    xcId: "271134",
    color: "#B8A88A",
    facts: [
      "A true bird of the American West — nests on cliff ledges in the rimrock canyons around Bend and Smith Rock.",
      "Hunts by flying fast and low over open ground, surprising prey like ground squirrels and horned larks.",
      "Dark 'wingpit' patches (axillaries) visible in flight are the quickest way to tell them from Peregrine Falcons."
    ],
    habitat: "Rimrock canyons, sagebrush flats, open desert"
  },
  {
    name: "Turkey Vulture",
    scientific: "Cathartes aura",
    wiki: "Turkey_vulture",
    xcId: "196498",
    color: "#6B3A3A",
    facts: [
      "One of the few birds with a highly developed sense of smell — they can detect carrion from over a mile away.",
      "Their distinctive wobbly, V-shaped soaring silhouette is a constant presence over Central Oregon from spring through fall.",
      "Play a vital ecological role as nature's cleanup crew — their stomach acid is so strong it destroys anthrax, botulism, and cholera bacteria."
    ],
    habitat: "Soaring over open country, forests, roadsides"
  },
  {
    name: "Lazuli Bunting",
    scientific: "Passerina amoena",
    wiki: "Lazuli_bunting",
    xcId: "296580",
    color: "#4682B4",
    facts: [
      "Males are electric blue, orange, and white — often called the 'western bluebird of the brush' for their vivid coloring.",
      "Young males learn their song by copying neighbors but deliberately make it slightly different — ensuring each male has a unique voice.",
      "Common summer resident along the Deschutes River trail and Tumalo Creek, favoring brushy edges and riparian thickets."
    ],
    habitat: "Brushy hillsides, riparian thickets, forest edges"
  },
  {
    name: "Green-tailed Towhee",
    scientific: "Pipilo chlorurus",
    wiki: "Green-tailed_towhee",
    xcId: "230484",
    color: "#6B8E23",
    facts: [
      "The only entirely migratory towhee in North America — they winter in Mexico and return to Central Oregon's high desert each spring.",
      "When flushed from the nest, they perform a 'rodent run' — scurrying away with tail raised to mimic a chipmunk and lure predators away.",
      "Their rufous cap, olive-green body, and white throat make them one of the most handsome sparrow-family birds in the West."
    ],
    habitat: "Sagebrush, manzanita, mountain mahogany scrub"
  },
  {
    name: "Black-billed Magpie",
    scientific: "Pica hudsonia",
    wiki: "Black-billed_magpie",
    xcId: "195820",
    color: "#1C1C1C",
    facts: [
      "Build enormous domed nests of sticks — some over 3 feet tall — with a mud-lined cup inside and a protective roof on top.",
      "One of the few non-mammal species known to recognize themselves in a mirror, demonstrating self-awareness.",
      "Their iridescent black feathers flash green, blue, and purple in sunlight — far more colorful than they first appear."
    ],
    habitat: "Sagebrush, ranches, riparian areas, juniper woodland"
  },
  {
    name: "Townsend's Solitaire",
    scientific: "Myadestes townsendi",
    wiki: "Townsend%27s_solitaire",
    xcId: "203189",
    color: "#9E9E9E",
    facts: [
      "A slim, elegant thrush that fiercely defends winter territories centered around a single juniper tree laden with berries.",
      "Their ethereal, warbling song — delivered from treetops — is considered one of the most beautiful bird songs in the West.",
      "Named for John Kirk Townsend, the 19th-century naturalist who collected extensively in Oregon."
    ],
    habitat: "Juniper woodlands in winter, mountain forests in summer"
  },
  {
    name: "Yellow-rumped Warbler",
    scientific: "Setophaga coronata",
    wiki: "Yellow-rumped_warbler",
    xcId: "302115",
    color: "#D4C75A",
    facts: [
      "The 'Audubon's' form found in Central Oregon has a bright yellow throat — the Eastern 'Myrtle' form has a white throat.",
      "Can digest the waxy coating of bayberries and juniper berries, allowing them to winter farther north than any other warbler.",
      "Affectionately nicknamed 'butter-butts' by birders for the conspicuous yellow patch on their rump."
    ],
    habitat: "Conifer forests, juniper woodland, riparian areas"
  },
  {
    name: "Spotted Towhee",
    scientific: "Pipilo maculatus",
    wiki: "Spotted_towhee",
    xcId: "192558",
    color: "#C44D2A",
    facts: [
      "Forages by doing a distinctive two-footed backwards hop-scratch, raking through leaf litter to uncover hidden insects and seeds.",
      "Males sing from exposed perches but spend most of their time hidden in dense brush — more often heard than seen.",
      "Their bold black, rufous, and white pattern with ruby-red eyes makes them unmistakable when they do emerge into the open."
    ],
    habitat: "Dense brush, manzanita, forest understory, gardens"
  },
  {
    name: "Barn Owl",
    scientific: "Tyto alba",
    wiki: "Barn_owl",
    xcId: "212932",
    color: "#D4A574",
    facts: [
      "Hunt in total darkness using asymmetrical ears — one higher than the other — to triangulate the exact position of prey by sound alone.",
      "A single Barn Owl family can consume over 3,000 rodents in a nesting season, making them invaluable to Central Oregon ranchers.",
      "Their heart-shaped facial disc works like a satellite dish, funneling sound to their ears with remarkable precision."
    ],
    habitat: "Open fields, ranches, old barns, juniper steppe"
  }
];

/* ── Image fetching: tries iNaturalist first, then Wikipedia ── */
const imageCache = {};

async function fetchBirdImage(bird) {
  if (imageCache[bird.name]) return imageCache[bird.name];

  /* Source 1: iNaturalist (search by scientific name — very precise) */
  try {
    const res = await fetch(
      `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(bird.scientific)}&rank=species&per_page=1`
    );
    const data = await res.json();
    const photo = data?.results?.[0]?.default_photo;
    if (photo) {
      /* iNaturalist returns medium (~500px). Swap to large (~1024px) */
      const url = (photo.medium_url || photo.url || "")
        .replace("/medium.", "/large.")
        .replace("square", "large");
      if (url && !url.includes("unknown")) {
        imageCache[bird.name] = url;
        return url;
      }
    }
  } catch (e) {
    /* silently fall through to next source */
  }

  /* Source 2: Wikipedia REST API */
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${bird.wiki}`
    );
    const data = await res.json();
    const url = data?.originalimage?.source || data?.thumbnail?.source;
    if (url) {
      imageCache[bird.name] = url;
      return url;
    }
  } catch (e) {
    /* silently fall through */
  }

  return null;
}

/* ── Inline styles for the Wingspan-inspired aesthetic ── */
const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
`;

const palette = {
  cream: "#FAF3E0",
  parchment: "#F5E6CA",
  warmBrown: "#5D4037",
  darkBrown: "#3E2723",
  sage: "#6B8F71",
  softGold: "#C9A96E",
  skyBlue: "#87CEEB",
  muted: "#8B7D6B",
};

/* ── SVG bird silhouette for placeholder ── */
const BirdSilhouette = ({ color }) => (
  <svg viewBox="0 0 200 200" width="120" height="120" style={{ opacity: 0.2 }}>
    <path
      d="M100 40 C60 40, 30 70, 30 100 C30 140, 60 170, 100 170 C140 170, 170 140, 170 100 C170 70, 140 40, 100 40 Z M70 90 C75 85, 85 85, 85 90 C85 95, 75 95, 70 90 Z M90 120 C95 115, 115 115, 120 120 L105 125 Z M140 80 L175 65 L170 80 L185 75 L165 90 C160 85, 150 82, 140 80 Z"
      fill={color || "#5D4037"}
    />
  </svg>
);

export default function BirdsOfCentralOregon() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [images, setImages] = useState({});
  const [loadingImg, setLoadingImg] = useState({});
  const [imgErrors, setImgErrors] = useState({});
  const [showAudioEmbed, setShowAudioEmbed] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [order, setOrder] = useState(BIRDS.map((_, i) => i));
  const [touchStart, setTouchStart] = useState(null);

  const bird = BIRDS[order[index]];

  /* Lazy image loading: fetch current + nearby cards */
  useEffect(() => {
    const toLoad = [
      order[index],
      order[(index + 1) % BIRDS.length],
      order[(index + 2) % BIRDS.length],
      order[(index - 1 + BIRDS.length) % BIRDS.length],
    ];

    toLoad.forEach((birdIdx) => {
      const b = BIRDS[birdIdx];
      if (images[b.name] || loadingImg[b.name]) return;

      setLoadingImg((prev) => ({ ...prev, [b.name]: true }));
      fetchBirdImage(b).then((url) => {
        if (url) setImages((prev) => ({ ...prev, [b.name]: url }));
        setLoadingImg((prev) => ({ ...prev, [b.name]: false }));
      });
    });
  }, [index, order]);

  const flip = useCallback(() => {
    setFlipped((f) => !f);
    setShowAudioEmbed(false);
  }, []);

  const next = useCallback(() => {
    setFlipped(false);
    setShowAudioEmbed(false);
    setIndex((i) => (i + 1) % BIRDS.length);
  }, []);

  const prev = useCallback(() => {
    setFlipped(false);
    setShowAudioEmbed(false);
    setIndex((i) => (i - 1 + BIRDS.length) % BIRDS.length);
  }, []);

  const goTo = useCallback((i) => {
    setIndex(i);
    setFlipped(false);
    setShowAudioEmbed(false);
  }, []);

  const toggleShuffle = useCallback(() => {
    if (!shuffled) {
      const newOrder = [...order];
      for (let i = newOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
      }
      setOrder(newOrder);
    } else {
      setOrder(BIRDS.map((_, i) => i));
    }
    setShuffled(!shuffled);
    setIndex(0);
    setFlipped(false);
    setShowAudioEmbed(false);
  }, [shuffled, order]);

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        flip();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, flip]);

  /* Touch/swipe support */
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 60) {
      if (diff > 0) prev();
      else next();
    }
    setTouchStart(null);
  };

  const imgUrl = images[bird.name];
  const isLoadingImg = loadingImg[bird.name];
  const hasImgError = imgErrors[bird.name];

  return (
    <>
      <style>{fonts}{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${palette.cream}; }

        .card-container {
          perspective: 1200px;
          width: 100%;
          max-width: 420px;
          aspect-ratio: 3 / 4;
          margin: 0 auto;
        }

        .card {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.7s cubic-bezier(0.4, 0.0, 0.2, 1);
          transform-style: preserve-3d;
          cursor: pointer;
        }

        .card.flipped {
          transform: rotateY(180deg);
        }

        .card-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .card-back {
          transform: rotateY(180deg);
        }

        .btn {
          font-family: 'Lora', Georgia, serif;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .btn:active {
          transform: translateY(0);
        }

        .nav-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          background: ${palette.parchment};
          color: ${palette.warmBrown};
          border: 2px solid ${palette.softGold};
        }

        .play-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          color: ${palette.warmBrown};
          font-size: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(8px);
          border: 2px solid rgba(255,255,255,0.6);
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        .progress-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .fact-item {
          padding: 12px 0;
          border-bottom: 1px solid ${palette.softGold}40;
          line-height: 1.55;
        }

        .fact-item:last-child {
          border-bottom: none;
        }

        .shimmer {
          background: linear-gradient(90deg, #e8dcc8 25%, #f0e6d4 50%, #e8dcc8 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInImg {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .fade-in {
          animation: fadeIn 0.4s ease forwards;
        }

        .img-loaded {
          animation: fadeInImg 0.5s ease forwards;
        }

        @media (max-width: 480px) {
          .card-container {
            max-width: 92vw;
            aspect-ratio: 3 / 4.5;
          }
          .nav-btn { width: 44px; height: 44px; font-size: 18px; }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: `linear-gradient(180deg, ${palette.cream} 0%, #EDE1CF 100%)`,
          fontFamily: "'Lora', Georgia, serif",
          color: palette.darkBrown,
          padding: "20px 16px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.4rem, 4vw, 2rem)",
              fontWeight: 600,
              color: palette.warmBrown,
              letterSpacing: "0.02em",
              marginBottom: 4,
            }}
          >
            Birds of Central Oregon
          </h1>
          <p
            style={{
              fontSize: "0.85rem",
              color: palette.muted,
              fontStyle: "italic",
            }}
          >
            A field guide flashcard deck
          </p>
        </div>

        {/* Card */}
        <div
          className="card-container"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`card ${flipped ? "flipped" : ""}`}
            onClick={flip}
            role="button"
            tabIndex={0}
            aria-label={
              flipped
                ? "Card back showing bird details"
                : "Card front showing bird photo. Click to reveal."
            }
          >
            {/* ── FRONT ── */}
            <div
              className="card-face"
              style={{
                background: palette.parchment,
                border: `2px solid ${palette.softGold}`,
                boxShadow:
                  "0 8px 32px rgba(93,64,55,0.12), 0 2px 8px rgba(93,64,55,0.08)",
              }}
            >
              {/* Image area */}
              <div
                style={{
                  flex: 1,
                  position: "relative",
                  overflow: "hidden",
                  background: `linear-gradient(135deg, ${bird.color}15, ${bird.color}30)`,
                }}
              >
                {isLoadingImg && !imgUrl ? (
                  <div
                    className="shimmer"
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: palette.muted,
                        fontStyle: "italic",
                      }}
                    >
                      Loading photo...
                    </p>
                  </div>
                ) : imgUrl && !hasImgError ? (
                  <img
                    key={bird.name}
                    src={imgUrl}
                    alt={`Photo of ${bird.name}`}
                    className="img-loaded"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center 20%",
                    }}
                    onError={() => {
                      setImgErrors((prev) => ({
                        ...prev,
                        [bird.name]: true,
                      }));
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `linear-gradient(135deg, ${bird.color}20, ${bird.color}40)`,
                      gap: 12,
                    }}
                  >
                    <BirdSilhouette color={bird.color} />
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: palette.muted,
                        fontStyle: "italic",
                      }}
                    >
                      {bird.scientific}
                    </p>
                  </div>
                )}

                {/* Audio play button */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    zIndex: 2,
                  }}
                >
                  <button
                    className="btn play-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAudioEmbed((s) => !s);
                    }}
                    aria-label="Play bird song"
                    title="Listen to bird song"
                  >
                    {showAudioEmbed ? "✕" : "♪"}
                  </button>
                </div>

                {/* Audio embed overlay */}
                {showAudioEmbed && (
                  <div
                    className="fade-in"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: "absolute",
                      bottom: 76,
                      right: 12,
                      left: 12,
                      background: "rgba(255,255,255,0.95)",
                      borderRadius: 12,
                      padding: 8,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <iframe
                      src={`https://xeno-canto.org/${bird.xcId}/embed?simple=1`}
                      width="100%"
                      height="60"
                      style={{ border: "none", borderRadius: 8 }}
                      title={`${bird.name} song from Xeno-canto`}
                      allow="autoplay"
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 4,
                        padding: "0 4px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.65rem",
                          color: palette.muted,
                        }}
                      >
                        Audio via xeno-canto.org
                      </p>
                      <a
                        href={`https://xeno-canto.org/${bird.xcId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "0.65rem",
                          color: palette.sage,
                          textDecoration: "none",
                        }}
                      >
                        Open full page &rarr;
                      </a>
                    </div>
                  </div>
                )}

                {/* Image source badge */}
                {imgUrl && !hasImgError && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 8,
                      left: 8,
                      padding: "2px 8px",
                      borderRadius: 10,
                      background: "rgba(0,0,0,0.4)",
                      backdropFilter: "blur(4px)",
                      fontSize: "0.6rem",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {imgUrl.includes("inaturalist") ? "iNaturalist" : "Wikimedia"}
                  </div>
                )}
              </div>

              {/* Bottom bar */}
              <div
                style={{
                  padding: "14px 20px",
                  textAlign: "center",
                  borderTop: `1px solid ${palette.softGold}40`,
                  background: `linear-gradient(180deg, ${palette.parchment}, #F0DFC0)`,
                }}
              >
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: palette.muted,
                    fontStyle: "italic",
                    letterSpacing: "0.05em",
                  }}
                >
                  tap to reveal · {index + 1} of {BIRDS.length}
                </p>
              </div>
            </div>

            {/* ── BACK ── */}
            <div
              className="card-face card-back"
              style={{
                background: `linear-gradient(180deg, ${palette.parchment}, #F0DFC0)`,
                border: `2px solid ${palette.softGold}`,
                boxShadow:
                  "0 8px 32px rgba(93,64,55,0.12), 0 2px 8px rgba(93,64,55,0.08)",
                padding: "28px 24px 20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Color accent bar */}
              <div
                style={{
                  width: 60,
                  height: 4,
                  borderRadius: 2,
                  background: bird.color,
                  margin: "0 auto 16px",
                  opacity: 0.7,
                }}
              />

              {/* Bird name */}
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.5rem, 5vw, 1.9rem)",
                  fontWeight: 700,
                  textAlign: "center",
                  color: palette.darkBrown,
                  lineHeight: 1.2,
                  marginBottom: 4,
                }}
              >
                {bird.name}
              </h2>

              {/* Scientific name */}
              <p
                style={{
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                  color: palette.muted,
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                {bird.scientific}
              </p>

              {/* Habitat badge */}
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 14px",
                    borderRadius: 20,
                    background: `${palette.sage}20`,
                    color: palette.sage,
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    border: `1px solid ${palette.sage}30`,
                  }}
                >
                  {bird.habitat}
                </span>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${palette.softGold}, transparent)`,
                  marginBottom: 16,
                }}
              />

              {/* Facts */}
              <div style={{ flex: 1, overflow: "auto" }}>
                {bird.facts.map((fact, i) => (
                  <div key={i} className="fact-item">
                    <span
                      style={{
                        display: "inline-block",
                        width: 20,
                        height: 20,
                        lineHeight: "20px",
                        textAlign: "center",
                        borderRadius: "50%",
                        background: `${bird.color}18`,
                        color: bird.color,
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        marginRight: 10,
                        verticalAlign: "top",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: palette.darkBrown,
                      }}
                    >
                      {fact}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom hint */}
              <div
                style={{
                  textAlign: "center",
                  paddingTop: 12,
                  borderTop: `1px solid ${palette.softGold}30`,
                  marginTop: 12,
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: palette.muted,
                    fontStyle: "italic",
                  }}
                >
                  tap to flip back · {index + 1} of {BIRDS.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            marginTop: 24,
          }}
        >
          <button
            className="btn nav-btn"
            onClick={prev}
            aria-label="Previous bird"
          >
            &#8249;
          </button>

          <button
            className="btn"
            onClick={flip}
            style={{
              padding: "10px 28px",
              borderRadius: 30,
              background: palette.warmBrown,
              color: palette.cream,
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.03em",
            }}
          >
            {flipped ? "Show Photo" : "Reveal"}
          </button>

          <button
            className="btn nav-btn"
            onClick={next}
            aria-label="Next bird"
          >
            &#8250;
          </button>
        </div>

        {/* Progress dots */}
        <div
          style={{
            display: "flex",
            gap: 6,
            marginTop: 20,
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: 320,
          }}
        >
          {BIRDS.map((_, i) => (
            <div
              key={i}
              className="progress-dot"
              style={{
                background:
                  i === index ? palette.warmBrown : `${palette.softGold}60`,
                transform: i === index ? "scale(1.4)" : "scale(1)",
              }}
              onClick={() => goTo(i)}
              role="button"
              aria-label={`Go to bird ${i + 1}`}
            />
          ))}
        </div>

        {/* Shuffle button */}
        <button
          className="btn"
          onClick={toggleShuffle}
          style={{
            marginTop: 16,
            padding: "6px 18px",
            borderRadius: 20,
            background: shuffled ? `${palette.sage}20` : "transparent",
            color: shuffled ? palette.sage : palette.muted,
            fontSize: "0.78rem",
            border: `1px solid ${shuffled ? palette.sage : palette.muted}40`,
          }}
        >
          {shuffled ? "&#10022; Shuffled" : "Shuffle Deck"}
        </button>

        {/* Keyboard hint (hidden on mobile) */}
        <p
          style={{
            marginTop: 16,
            fontSize: "0.7rem",
            color: `${palette.muted}99`,
            textAlign: "center",
          }}
        >
          &#8592; &#8594; navigate · Space to flip · Swipe on mobile
        </p>

        {/* Attribution */}
        <p
          style={{
            marginTop: 20,
            fontSize: "0.65rem",
            color: `${palette.muted}80`,
            textAlign: "center",
            maxWidth: 360,
            lineHeight: 1.5,
          }}
        >
          Photos via iNaturalist &amp; Wikimedia Commons · Bird songs via
          xeno-canto.org
          <br />
          Created for the birders of Central Oregon
        </p>
      </div>
    </>
  );
}
