import { useState, useEffect, useCallback, useRef } from "react";

/* ───────────────────────────────────────────
   BIRDS OF CENTRAL OREGON — Flashcard Deck
   Inspired by the art & aesthetic of Wingspan
   Photos: iNaturalist (CC BY-NC) · Audio: xeno-canto.org (CC)
   ─────────────────────────────────────────── */

const BIRDS = [
  {
    name: "Mountain Bluebird",
    scientific: "Sialia currucoides",
    color: "#4A90D9",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/553266251/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/85631521/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/99789431/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/228676211/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/GVVNEJJEGA/XC441351-MOBL_2018-06-09_Opal_City_OR_1448%282%29.mp3",
    xcId: "441351",
    facts: [
      "Males display brilliant cerulean plumage — one of the most vivid blues of any North American bird.",
      "They're cavity nesters that eagerly adopt nest boxes, making them a conservation success story in Central Oregon.",
      "Often the first migratory bird to return to the high desert in spring, sometimes arriving while snow still covers the ground."
    ],
    habitat: "Open meadows, sagebrush steppe, mountain parks",
    idTips: [
      "All cerulean blue (male) with no rusty breast — unlike Western or Eastern Bluebird",
      "Female is plain gray-brown with pale blue wings and tail",
      "Often hovers in place over open fields while hunting"
    ]
  },
  {
    name: "Western Meadowlark",
    scientific: "Sturnella neglecta",
    color: "#E8B830",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/629135676/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/160166201/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/601931411/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/629135653/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/YBJUQSUJFZ/XC370746-Western%20Meadowlark.mp3",
    xcId: "370746",
    facts: [
      "Their rich, flute-like song is one of the most iconic sounds of the American West — and Oregon's state bird song.",
      "State bird of six U.S. states — more than any other species.",
      "The bold black 'V' on their yellow chest fades in winter and intensifies again each spring."
    ],
    habitat: "Grasslands, agricultural fields, sagebrush flats",
    idTips: [
      "Bright yellow breast with bold black V-shaped bib",
      "Stocky, short-tailed ground bird with brown-streaked back",
      "Listen for their rich, bubbly, flute-like song from fence posts"
    ]
  },
  {
    name: "Steller's Jay",
    scientific: "Cyanocitta stelleri",
    color: "#1B4F8A",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/268727081/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/209760311/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/267972091/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/172070171/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/GVVNEJJEGA/XC545913-STJA_2020-01-19_Wildwood_Trail_Newberry_TH_Forest_Park_Portland_OR_0844.mp3",
    xcId: "545913",
    facts: [
      "The only crested jay west of the Rocky Mountains — that dramatic crest can be raised or lowered to signal mood.",
      "Expert vocal mimics: they imitate Red-tailed Hawks, dogs, cats, and even mechanical sounds.",
      "Named after Georg Wilhelm Steller, the naturalist who first recorded the species in Alaska in 1741."
    ],
    habitat: "Conifer and mixed forests, campgrounds, mountain towns",
    idTips: [
      "Only western jay with a tall dark crest",
      "Deep blue body with blackish head and upper back",
      "Loud, harsh 'shack-shack-shack' call; also mimics hawk screams"
    ]
  },
  {
    name: "Clark's Nutcracker",
    scientific: "Nucifraga columbiana",
    color: "#8E8E8E",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/450090601/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/275750681/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/108391161/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/629109025/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/OCGLDSUVRE/XC567739-Clark%27s%20Nutcracker%20Nucifraga%20columbiana%20Blue%20Lake%2C%20lassen%20Co.%20CA%206-9-2020.mp3",
    xcId: "567739",
    facts: [
      "Caches up to 98,000 pine seeds per season and remembers each stash with over 90% accuracy months later.",
      "Primary seed disperser for whitebark pine — without this bird, entire high-elevation forests would vanish.",
      "Named for William Clark of the Lewis & Clark Expedition, who first described the species in 1805."
    ],
    habitat: "High-elevation conifer forests, timberline areas",
    idTips: [
      "Pale gray body with bold black-and-white wings and tail",
      "Long, dagger-like black bill",
      "Loud, grating 'kraa' call carries across mountain basins"
    ]
  },
  {
    name: "Osprey",
    scientific: "Pandion haliaetus",
    color: "#5D4037",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/248595461/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/175639871/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/652799353/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/608876235/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/FSCGENVPXK/XC1027115-OSPREY-juv-Edwin-B-Forsyth-NWR-NJ-10.11am-08052025.mp3",
    xcId: "1027115",
    facts: [
      "Can reverse an outer toe to grip fish with two talons on each side — the only raptor with this adaptation.",
      "Designated Oregon's official state raptor in 2017. Crane Prairie Reservoir hosts one of the densest nesting populations anywhere.",
      "Their 63-inch wingspan and dramatic feet-first fishing dives make them one of the most spectacular hunters in Central Oregon."
    ],
    habitat: "Lakes, reservoirs, rivers — always near water",
    idTips: [
      "White underparts with dark eye stripe across white head",
      "Wings held in a distinctive crook or M-shape in flight",
      "Always near water; plunges feet-first to catch fish"
    ]
  },
  {
    name: "American Dipper",
    scientific: "Cinclus mexicanus",
    color: "#4A5568",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/610300665/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/409416961/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/565803021/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/200709641/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/GVVNEJJEGA/XC368598-AMDI_2017-04-01_Dry_Wolf_Lewis_and_Clark_NF_MT_1347%282%29.mp3",
    xcId: "368598",
    facts: [
      "North America's only truly aquatic songbird — walks along the bottom of fast-moving streams to hunt aquatic insects.",
      "Has a nictitating membrane (translucent third eyelid) and nasal flaps that seal shut underwater.",
      "Year-round resident of the Deschutes River, they sing even in the dead of winter while standing on ice."
    ],
    habitat: "Fast-flowing mountain streams and rivers",
    idTips: [
      "Stocky, all-gray songbird that bobs constantly on streamside rocks",
      "Short tail often cocked upward",
      "Flies low and fast just above the water surface"
    ]
  },
  {
    name: "White-headed Woodpecker",
    scientific: "Leuconotopicus albolarvatus",
    color: "#2D2D2D",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/454723031/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/610078189/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/610112914/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/260762691/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/YWRKFXUDUR/XC1028546-100-Woodpecker---White-headed-%28Picoides-a.-albolaxrvatus%29-Calls-AUG-1030h-750m-WenasCampWA_gi_250807_026.mp3",
    xcId: "1028546",
    facts: [
      "One of the few woodpeckers that feeds heavily on pine seeds rather than insects — pries open ponderosa cones with its bill.",
      "An Oregon Conservation Strategy species — dependent on mature, open ponderosa pine forests that are increasingly rare.",
      "Despite a mostly black body, the bright white head makes them unmistakable — a true Central Oregon specialty bird."
    ],
    habitat: "Mature ponderosa pine forests",
    idTips: [
      "Striking white head on an all-black body",
      "Male has a small red patch on the back of the head",
      "Quiet for a woodpecker — listen for soft tapping on ponderosa bark"
    ]
  },
  {
    name: "Lewis's Woodpecker",
    scientific: "Melanerpes lewis",
    color: "#8B4557",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/341966341/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/638407833/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/148994831/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/341966331/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/FVNPWGEQCT/XC786998-LEWOcalls_DCH_SAC_3-17-23_0957.mp3",
    xcId: "786998",
    facts: [
      "Catches insects on the wing like a flycatcher — a behavior unique among North American woodpeckers.",
      "Named for Meriwether Lewis, who first described it near the mouth of the Salmon River, Idaho in 1805.",
      "Their iridescent green-black back, gray collar, and pink belly make them one of the most colorful woodpeckers."
    ],
    habitat: "Open ponderosa pine, burned forests, oak-pine woodland",
    idTips: [
      "Iridescent dark green-black back, gray collar, rose-pink belly",
      "Slow, crow-like wingbeats — unlike typical woodpecker flight",
      "Catches insects on the wing like a flycatcher"
    ]
  },
  {
    name: "Pygmy Nuthatch",
    scientific: "Sitta pygmaea",
    color: "#8B7D6B",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/253568141/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/614460325/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/534818791/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/135038131/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/YQNGFTBRRT/XC500962-PYNU_Baldy_2Sep2014_Harter_01.mp3",
    xcId: "500962",
    facts: [
      "One of the few North American songbirds that uses 'helpers at the nest' — related birds assist the breeding pair.",
      "Entire flocks roost together in a single tree cavity on cold nights, huddling for warmth in groups of 100+.",
      "Their squeaky 'rubber ducky' calls are a constant soundtrack in Central Oregon's ponderosa pine forests."
    ],
    habitat: "Ponderosa pine forests",
    idTips: [
      "Tiny gray-brown bird that creeps headfirst down tree trunks",
      "Brown cap comes down to the eye; pale grayish underparts",
      "Travels in noisy flocks giving constant high-pitched 'peep' calls"
    ]
  },
  {
    name: "Red-tailed Hawk",
    scientific: "Buteo jamaicensis",
    color: "#A0522D",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/380778111/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/80930791/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/380778141/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/507191441/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/WSTGWONJJJ/XC449110-Red-tailed%20Hawk_South%20End%20Pond_190106.mp3",
    xcId: "449110",
    facts: [
      "The most common hawk in North America — their piercing scream is the 'default' raptor call used in nearly every Hollywood film.",
      "Mate for life and reuse the same nest year after year, adding material until it can weigh several hundred pounds.",
      "Western birds show incredible color variation from nearly white to dark chocolate brown — a single species with many 'morphs.'"
    ],
    habitat: "Open country, grasslands, forest edges, highway corridors",
    idTips: [
      "Brick-red tail obvious on adults soaring overhead",
      "Dark belly band across pale underparts",
      "Heavy-bodied with broad, rounded wings — soars in wide circles"
    ]
  },
  {
    name: "Great Horned Owl",
    scientific: "Bubo virginianus",
    color: "#4A3728",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/368284791/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/368284831/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/164088741/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/20697891/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/CQVHGWMGMC/XC1087243-ghow031126.mp3",
    xcId: "1087243",
    facts: [
      "Oregon's most widespread owl and one of the earliest nesters — they begin incubating eggs in January, even in freezing temperatures.",
      "Their grip strength is estimated at 300 psi — roughly the same as a large dog's bite.",
      "Apex nocturnal predator that takes prey as large as Great Blue Herons, house cats, and even skunks — they have almost no sense of smell."
    ],
    habitat: "Forests, canyons, juniper woodlands, urban areas",
    idTips: [
      "Large prominent ear tufts and piercing yellow eyes",
      "Barred breast with distinctive white throat bib",
      "Deep, rhythmic 'hoo-hoo-hoooo hoo-hoo' hooting, often at dusk"
    ]
  },
  {
    name: "Bald Eagle",
    scientific: "Haliaeetus leucocephalus",
    color: "#3E2723",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/44317071/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/285750511/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/285750461/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/516458921/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/NPYDVIEFTA/XC535101-GAARFLOR_20180629_082440%20clear%20Bald%20Eagle%20calls.MP3",
    xcId: "535101",
    facts: [
      "Don't develop their iconic white head and tail until age 4–5; juveniles are mottled brown and often mistaken for Golden Eagles.",
      "Build the largest nests of any North American bird — the record is 9.5 feet wide, 20 feet deep, and nearly 3 tons.",
      "Winter congregations at Wickiup and Crane Prairie reservoirs can number in the dozens — one of Oregon's best eagle-watching spots."
    ],
    habitat: "Large lakes, reservoirs, rivers with tall perch trees",
    idTips: [
      "Adult: unmistakable white head and tail with massive yellow bill",
      "Immature: mottled dark brown — look for huge size and flat-winged soar",
      "Much larger than Red-tailed Hawk with longer, plank-like wings"
    ]
  },
  {
    name: "Western Tanager",
    scientific: "Piranga ludoviciana",
    color: "#E85D26",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/238787501/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/296932481/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/635252883/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/107814681/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/GVVNEJJEGA/XC441367-WETA_ATFL_2018-06-09_Geneva_OR_1036%282%29.mp3",
    xcId: "441367",
    facts: [
      "The northernmost-breeding tanager in the world, nesting as far north as Canada's Northwest Territories at 60°N.",
      "Males get their red head pigment from rhodoxanthin — a pigment they can only obtain from insects in their diet, not synthesize themselves.",
      "Despite their tropical appearance, they breed in conifer forests and are a common summer resident of the Central Oregon Cascades."
    ],
    habitat: "Conifer and mixed forests at mid to high elevations",
    idTips: [
      "Male: flame-red head, bright yellow body, black wings with wing bars",
      "Female: yellowish-green with gray wings and pale wing bars",
      "Robin-sized; song resembles a hoarse American Robin"
    ]
  },
  {
    name: "Calliope Hummingbird",
    scientific: "Selasphorus calliope",
    color: "#C850C0",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/164983801/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/49192831/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/329221821/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/333226281/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/JHFICMRVUX/XC764433-061422-0608-Caliope-Hummingbird.mp3",
    xcId: "764433",
    facts: [
      "The smallest bird in North America — weighs about 2.5 grams, less than a penny.",
      "Undertakes one of the longest migrations relative to body size of any bird: 9,000 km round trip between Central Oregon and Mexico.",
      "Males flash iridescent magenta gorget rays in a starburst display while performing dramatic U-shaped courtship dives."
    ],
    habitat: "Mountain meadows, forest openings, riparian areas",
    idTips: [
      "Smallest bird in North America — noticeably tinier than other hummingbirds",
      "Male: magenta gorget streaks radiate like a starburst",
      "Short bill and short tail compared to other hummingbirds"
    ]
  },
  {
    name: "Mountain Chickadee",
    scientific: "Poecile gambeli",
    color: "#6B7B6E",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/525189851/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/289864941/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/303995161/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/548834991/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/GVVNEJJEGA/XC349466-MOCH_RBNU_03-18-2016_Little_Belt_Mountains_MT_1434.mp3",
    xcId: "349466",
    facts: [
      "Distinguished from other chickadees by a bold white eyebrow stripe — a field mark visible even at distance.",
      "Caches thousands of food items each autumn and relies on spatial memory to relocate them — their hippocampus actually enlarges in fall.",
      "Year-round resident of Central Oregon's ponderosa and lodgepole pine forests, often the most common bird at mountain feeders."
    ],
    habitat: "Conifer forests from ponderosa to subalpine",
    idTips: [
      "White eyebrow stripe — the key mark separating it from Black-capped Chickadee",
      "Black cap and bib with gray flanks",
      "Whistled 'fee-bee-bay' song is lower and huskier than Black-capped's"
    ]
  },
  {
    name: "Red Crossbill",
    scientific: "Loxia curvirostra",
    color: "#C0392B",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/615822296/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/345704621/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/370772571/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/286231041/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/DJPZGYTAWH/XC1091440-Lille-Korsn%C3%A6b-%28Loxia-curvirostra%29-Isenvad_20241109-1332-sang.mp3",
    xcId: "1091440",
    facts: [
      "Their crossed mandibles are uniquely specialized for prying open conifer cones — no other North American songbird has this adaptation.",
      "Can breed in any month of the year, timing nesting to match local cone crops — even mid-winter if food is abundant.",
      "Central Oregon hosts multiple 'types' (possibly separate species) specialized for different conifers: ponderosa, Douglas-fir, and lodgepole."
    ],
    habitat: "Conifer forests, especially where cone crops are heavy",
    idTips: [
      "Crossed bill tips visible at close range — unique among songbirds",
      "Male: brick-red to orange-red with dark wings",
      "Female: olive-yellow with dark wings; usually in flocks in conifers"
    ]
  },
  {
    name: "Common Raven",
    scientific: "Corvus corax",
    color: "#1A1A2E",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/645103070/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/394617871/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/371283491/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/634223693/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC1084372-Korp_74.mp3",
    xcId: "1084372",
    facts: [
      "Among the most intelligent birds on Earth — they use tools, plan ahead, and have been observed playing games like sliding down snowbanks.",
      "Have over 30 distinct vocalizations and can learn to mimic human speech, other animals, and mechanical sounds.",
      "Perform spectacular aerial acrobatics during courtship — barrel rolls, wingtip touches, and synchronized diving at speeds over 100 mph."
    ],
    habitat: "Nearly everywhere: forests, deserts, cliffs, towns",
    idTips: [
      "Much larger than American Crow — about the size of a Red-tailed Hawk",
      "Wedge-shaped tail visible in flight (crow's tail is fan-shaped)",
      "Deep, resonant 'cronk' call unlike crow's higher-pitched 'caw'"
    ]
  },
  {
    name: "Sandhill Crane",
    scientific: "Antigone canadensis",
    color: "#7B8B6F",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/309666411/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/278098351/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/305597181/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/309666391/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/WFUNWVJFSZ/XC552624-20200427-hillman-sandhill.mp3",
    xcId: "552624",
    facts: [
      "Standing nearly 5 feet tall with a 6.5-foot wingspan, they're Oregon's tallest bird — their rattling calls carry over a mile.",
      "Fossil evidence shows Sandhill Cranes have existed essentially unchanged for at least 2.5 million years.",
      "Thousands stage at Malheur National Wildlife Refuge each autumn, and breeding pairs return to Central Oregon's wet meadows every spring."
    ],
    habitat: "Wet meadows, marshes, agricultural fields",
    idTips: [
      "Tall and gray with bare red skin patch on forehead",
      "Neck extended straight in flight (herons tuck their necks)",
      "Loud, rolling, bugle-like call audible from over a mile away"
    ]
  },
  {
    name: "Northern Flicker",
    scientific: "Colaptes auratus",
    color: "#D4845A",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/431726081/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/462640971/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/222447961/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/632729012/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/UTLXKPYDDK/XC1069251-Northern_Flicker-T-12-27-25-AUD.mp3",
    xcId: "1069251",
    facts: [
      "Unlike most woodpeckers, they feed primarily on the ground — ants make up nearly half their diet.",
      "The 'Red-shafted' form found in Central Oregon flashes salmon-pink underwings in flight — the Eastern form shows yellow.",
      "One of the few migratory woodpeckers in North America; many Central Oregon birds move to lower elevations or south in winter."
    ],
    habitat: "Open woodlands, forest edges, parks, yards",
    idTips: [
      "Brown with black spots, black chest crescent, and barred back",
      "Red-shafted form: salmon-pink under wings/tail, red moustache (male)",
      "Bright white rump patch conspicuous in undulating flight"
    ]
  },
  {
    name: "Williamson's Sapsucker",
    scientific: "Sphyrapicus thyroideus",
    color: "#2E4057",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/347088731/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/347525581/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/497962121/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/637758851/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/OCGLDSUVRE/XC564199-Williamson%27s%20sapsucker%20Sphyrapicus%20thtoideus%20Hwy%2088%20Eldorado%20Co.%20CA%205-31-2020.mp3",
    xcId: "564199",
    facts: [
      "Males and females look so different they were classified as two separate species until 1873.",
      "Males are jet-black with a yellow belly and red chin; females are pale brown with fine barring — barely recognizable as the same bird.",
      "Drills orderly rows of sap wells in ponderosa pine bark, which also attract insects that hummingbirds and other birds feed on."
    ],
    habitat: "Mature conifer forests, especially ponderosa and fir",
    idTips: [
      "Male: mostly black with white wing patch, yellow belly, red chin",
      "Female: brown-barred with brown head — looks like a different species",
      "Look for neat rows of horizontal sap wells drilled in bark"
    ]
  },
  {
    name: "Golden Eagle",
    scientific: "Aquila chrysaetos",
    color: "#8B6914",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/210931331/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/263214871/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/275690361/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/83886031/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC1045328-Kungs%C3%B6rn_17.mp3",
    xcId: "1045328",
    facts: [
      "With a wingspan up to 7.5 feet and diving speeds over 150 mph, they're one of the most powerful raptors in North America.",
      "Unlike Bald Eagles, they prefer open high desert and grasslands — Central Oregon's sagebrush steppe is prime habitat.",
      "Mate for life and maintain territories of up to 60 square miles, using the same cliff-side nest for decades."
    ],
    habitat: "Open sagebrush steppe, rimrock, grasslands",
    idTips: [
      "Dark brown overall with golden-tawny feathers on the nape",
      "Juveniles: white patches at base of tail and in wings",
      "Soars with wings in a slight V; longer tail than Bald Eagle"
    ]
  },
  {
    name: "Prairie Falcon",
    scientific: "Falco mexicanus",
    color: "#B8A88A",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/271654331/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/303782981/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/359363361/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/240841081/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/GVVNEJJEGA/XC386262-PRFA_HAFL_GTTO_2017-05-20_Bear_Canyon_Pryor_Mts_MT_0851%282%29.mp3",
    xcId: "386262",
    facts: [
      "A true bird of the American West — nests on cliff ledges in the rimrock canyons around Bend and Smith Rock.",
      "Hunts by flying fast and low over open ground, surprising prey like ground squirrels and horned larks.",
      "Dark 'wingpit' patches (axillaries) visible in flight are the quickest way to tell them from Peregrine Falcons."
    ],
    habitat: "Rimrock canyons, sagebrush flats, open desert",
    idTips: [
      "Light sandy-brown above, white below with sparse streaking",
      "Dark axillaries ('wingpit' patches) — key field mark in flight",
      "Pointed wings; fast, direct flight low over open ground"
    ]
  },
  {
    name: "Turkey Vulture",
    scientific: "Cathartes aura",
    color: "#6B3A3A",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/373545991/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/527839701/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/219940511/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/55494441/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/SEVIQQAKWM/XC520288-ZOOM0004_Tr1%20-%20Jote%20Cabeza%20colorada.mp3",
    xcId: "520288",
    facts: [
      "One of the few birds with a highly developed sense of smell — they can detect carrion from over a mile away.",
      "Their distinctive wobbly, V-shaped soaring silhouette is a constant presence over Central Oregon from spring through fall.",
      "Their stomach acid is so strong it destroys anthrax, botulism, and cholera bacteria — nature's ultimate cleanup crew."
    ],
    habitat: "Soaring over open country, forests, roadsides",
    idTips: [
      "Dark body with small red head (adult) — appears headless at distance",
      "Soars with wings in a tilted V, rocking side to side",
      "Two-toned underwings: dark leading edge, pale flight feathers"
    ]
  },
  {
    name: "Lazuli Bunting",
    scientific: "Passerina amoena",
    color: "#4682B4",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/166383141/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/163836051/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/330456851/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/460771221/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/OCGLDSUVRE/XC570661-Lazuli%20Bunting%20Passerina%20ameona%20Cucomungo%20Canyon.%20Inyo%20Co.%20CA%206-20-2020.mp3",
    xcId: "570661",
    facts: [
      "Males are electric blue, orange, and white — often called the 'western bluebird of the brush' for their vivid coloring.",
      "Young males learn their song by copying neighbors but deliberately make it slightly different — ensuring each male has a unique voice.",
      "Common summer resident along the Deschutes River trail and Tumalo Creek, favoring brushy edges and riparian thickets."
    ],
    habitat: "Brushy hillsides, riparian thickets, forest edges",
    idTips: [
      "Male: turquoise-blue head and back, orange breast, white wing bars",
      "Female: warm brown with faint bluish tinge on rump",
      "Sparrow-sized; sings a fast, high-pitched jumbled warble from exposed perches"
    ]
  },
  {
    name: "Green-tailed Towhee",
    scientific: "Pipilo chlorurus",
    color: "#6B8E23",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/248302271/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/448738191/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/252095821/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/324290971/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/OCGLDSUVRE/XC557066-Green-tailed%20Towhee%20Pipolo%20chlorurus%20Big%20Pine%20Canyon%2C%20Inyo%20County%20CA%204-27-19.mp3",
    xcId: "557066",
    facts: [
      "The only entirely migratory towhee in North America — they winter in Mexico and return to Central Oregon's high desert each spring.",
      "When flushed from the nest, they perform a 'rodent run' — scurrying away with tail raised to mimic a chipmunk and lure predators away.",
      "Their rufous cap, olive-green body, and white throat make them one of the most handsome sparrow-family birds in the West."
    ],
    habitat: "Sagebrush, manzanita, mountain mahogany scrub",
    idTips: [
      "Bright rufous cap, olive-green body, white throat",
      "Larger than most sparrows; scratches on ground with both feet",
      "Gray face contrasts with rufous crown and green wings/tail"
    ]
  },
  {
    name: "Black-billed Magpie",
    scientific: "Pica hudsonia",
    color: "#1C1C1C",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/272907441/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/375489631/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/320849621/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/220098041/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/GVVNEJJEGA/XC361480-BBMA_2017-03-10_Forest_Vale_Cementery_Helena_MT_1441%282%29.mp3",
    xcId: "361480",
    facts: [
      "Build enormous domed nests of sticks — some over 3 feet tall — with a mud-lined cup inside and a protective roof on top.",
      "One of the few non-mammal species known to recognize themselves in a mirror, demonstrating self-awareness.",
      "Their iridescent black feathers flash green, blue, and purple in sunlight — far more colorful than they first appear."
    ],
    habitat: "Sagebrush, ranches, riparian areas, juniper woodland",
    idTips: [
      "Unmistakable: bold black and white with an extremely long tail",
      "Iridescent blue-green sheen on wings and tail in good light",
      "Noisy, chattering calls; often seen in small groups"
    ]
  },
  {
    name: "Townsend's Solitaire",
    scientific: "Myadestes townsendi",
    color: "#9E9E9E",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/286278391/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/318123731/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/515683801/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/566299631/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/DUWDSSWZPN/XC1044204-250929_071649_Townsend-s-Solitaire.mp3",
    xcId: "1044204",
    facts: [
      "A slim, elegant thrush that fiercely defends winter territories centered around a single juniper tree laden with berries.",
      "Their ethereal, warbling song — delivered from treetops — is considered one of the most beautiful bird songs in the West.",
      "Named for John Kirk Townsend, the 19th-century naturalist who collected extensively in Oregon."
    ],
    habitat: "Juniper woodlands in winter, mountain forests in summer",
    idTips: [
      "Slim, upright gray bird with white eye ring",
      "Buffy-orange wing patches flash in flight",
      "Often perches at the very top of a juniper — territorial over berry crops"
    ]
  },
  {
    name: "Yellow-rumped Warbler",
    scientific: "Setophaga coronata",
    color: "#D4C75A",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/42617691/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/630734529/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/322695581/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/557872561/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/SDPCHKOHRH/XC1020578-Thu-May-22-2025-22-05-16-Paruline-%C3%A0-croupion-jaune-cri-chant-A.mp3",
    xcId: "1020578",
    facts: [
      "The 'Audubon's' form found in Central Oregon has a bright yellow throat — the Eastern 'Myrtle' form has a white throat.",
      "Can digest the waxy coating of bayberries and juniper berries, allowing them to winter farther north than any other warbler.",
      "Affectionately nicknamed 'butter-butts' by birders for the conspicuous yellow patch on their rump."
    ],
    habitat: "Conifer forests, juniper woodland, riparian areas",
    idTips: [
      "Conspicuous yellow rump patch visible in flight and perched",
      "Audubon's form (West): yellow throat, yellow side patches",
      "Streaky gray-brown; flits actively through foliage and flycatches"
    ]
  },
  {
    name: "Spotted Towhee",
    scientific: "Pipilo maculatus",
    color: "#C44D2A",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/217848351/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/424959711/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/47999501/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/537676401/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/OCGLDSUVRE/XC559006-Spotted%20Towhee%20Pipilo%20maculatus%2C%20Birchim%20Canyon%2C%20Inyo%20Co.%20CA%204-27-20.mp3",
    xcId: "559006",
    facts: [
      "Forages by doing a distinctive two-footed backwards hop-scratch, raking through leaf litter to uncover hidden insects and seeds.",
      "Males sing from exposed perches but spend most of their time hidden in dense brush — more often heard than seen.",
      "Their bold black, rufous, and white pattern with ruby-red eyes makes them unmistakable when they do emerge into the open."
    ],
    habitat: "Dense brush, manzanita, forest understory, gardens",
    idTips: [
      "Male: jet-black hood and back, rufous sides, white belly",
      "White spots on black wings; striking ruby-red eye",
      "Female: similar pattern but dark brown replaces black"
    ]
  },
  {
    name: "Barn Owl",
    scientific: "Tyto alba",
    color: "#D4A574",
    imgs: ["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/155550701/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/75210961/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/75210971/1200","https://cdn.download.ams.birds.cornell.edu/api/v2/asset/591235191/1200"],
    audio: "https://xeno-canto.org/sounds/uploaded/JDDHNKDHCS/XC1090793-2026.03.24-03h57-Effraie.mp3",
    xcId: "1090793",
    facts: [
      "Hunt in total darkness using asymmetrical ears — one higher than the other — to triangulate the exact position of prey by sound alone.",
      "A single Barn Owl family can consume over 3,000 rodents in a nesting season, making them invaluable to Central Oregon ranchers.",
      "Their heart-shaped facial disc works like a satellite dish, funneling sound to their ears with remarkable precision."
    ],
    habitat: "Open fields, ranches, old barns, juniper steppe",
    idTips: [
      "Heart-shaped white facial disc — unlike any other owl",
      "Pale buff-golden upperparts with fine gray spotting",
      "Silent flier; eerie raspy screeching call (not hooting)"
    ]
  }
];

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
`;

const P = {
  cream: "#FAF3E0", parchment: "#F5E6CA", warmBrown: "#5D4037",
  darkBrown: "#3E2723", sage: "#6B8F71", softGold: "#C9A96E", muted: "#8B7D6B",
};

export default function BirdsOfCentralOregon({ onBack }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [order, setOrder] = useState(BIRDS.map((_, i) => i));
  const [touchStart, setTouchStart] = useState(null); // {x, y}
  const [swipe, setSwipe] = useState(null); // 'next-exit'|'next-enter'|'prev-exit'|'prev-enter'|null
  const [photoIdx, setPhotoIdx] = useState(0);
  const navigating = useRef(false);
  const audioRef = useRef(null);

  const bird = BIRDS[order[index]];

  /* Reset audio when card changes */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlaying(false);
    setAudioReady(false);
  }, [index, order]);

  /* Audio ended */
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnded = () => setPlaying(false);
    el.addEventListener("ended", onEnded);
    return () => el.removeEventListener("ended", onEnded);
  }, []);

  const toggleAudio = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [playing]);

  const flip = useCallback(() => { setFlipped(f => !f); }, []);

  const goTo = useCallback((i) => {
    setIndex(i); setFlipped(false); setPhotoIdx(Math.floor(Math.random() * 4));
  }, []);

  const cyclePhoto = useCallback((e) => {
    if (e) e.stopPropagation();
    setPhotoIdx(i => i + 1); // modulo applied at render time
  }, []);

  const SWIPE_MS = 260;

  const next = useCallback(() => {
    if (navigating.current) return;
    navigating.current = true;
    setSwipe('next-exit');
    setTimeout(() => {
      setFlipped(false);
      setPhotoIdx(Math.floor(Math.random() * 4));
      setIndex(i => (i + 1) % BIRDS.length);
      setSwipe('next-enter');
      setTimeout(() => { setSwipe(null); navigating.current = false; }, SWIPE_MS);
    }, SWIPE_MS);
  }, []);

  const prev = useCallback(() => {
    if (navigating.current) return;
    navigating.current = true;
    setSwipe('prev-exit');
    setTimeout(() => {
      setFlipped(false);
      setPhotoIdx(Math.floor(Math.random() * 4));
      setIndex(i => (i - 1 + BIRDS.length) % BIRDS.length);
      setSwipe('prev-enter');
      setTimeout(() => { setSwipe(null); navigating.current = false; }, SWIPE_MS);
    }, SWIPE_MS);
  }, []);

  const toggleShuffle = useCallback(() => {
    if (!shuffled) {
      const a = [...order];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      setOrder(a);
    } else {
      setOrder(BIRDS.map((_, i) => i));
    }
    setShuffled(s => !s);
    setIndex(0); setFlipped(false);
  }, [shuffled, order]);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowUp") { e.preventDefault(); cyclePhoto(null); }
      else if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev, flip, cyclePhoto]);

  return (
    <>
      <style>{fonts}{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${P.cream}; }
        .card-scene { perspective: 1200px; width: 100%; max-width: 420px; aspect-ratio: 3/4; margin: 0 auto; }
        .card { position: relative; width: 100%; height: 100%; transition: transform 0.7s cubic-bezier(0.4,0,0.2,1); transform-style: preserve-3d; cursor: pointer; }
        .card.flipped { transform: rotateY(180deg); }
        .face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; }
        .back { transform: rotateY(180deg); }
        .btn { font-family: 'Lora', Georgia, serif; border: none; cursor: pointer; transition: all 0.2s ease; }
        .btn:hover { transform: translateY(-1px); filter: brightness(1.05); }
        .btn:active { transform: translateY(0); }
        .nav-btn { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; background: ${P.parchment}; color: ${P.warmBrown}; border: 2px solid ${P.softGold}; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .dot { width: 8px; height: 8px; border-radius: 50%; cursor: pointer; transition: all 0.3s; }
        .fact-row { padding: 11px 0; border-bottom: 1px solid ${P.softGold}40; line-height: 1.55; }
        .fact-row:last-child { border-bottom: none; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .shimmer { background: linear-gradient(90deg,#e8dcc8 25%,#f0e6d4 50%,#e8dcc8 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
        @keyframes swipeOutLeft { from{transform:translateX(0);opacity:1} to{transform:translateX(-105%);opacity:0} }
        @keyframes swipeOutRight { from{transform:translateX(0);opacity:1} to{transform:translateX(105%);opacity:0} }
        @keyframes swipeInFromRight { from{transform:translateX(105%);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes swipeInFromLeft { from{transform:translateX(-105%);opacity:0} to{transform:translateX(0);opacity:1} }
        .next-exit { animation: swipeOutLeft 0.26s cubic-bezier(0.4,0,0.2,1) forwards; pointer-events:none; }
        .next-enter { animation: swipeInFromRight 0.26s cubic-bezier(0.4,0,0.2,1) both; }
        .prev-exit { animation: swipeOutRight 0.26s cubic-bezier(0.4,0,0.2,1) forwards; pointer-events:none; }
        .prev-enter { animation: swipeInFromLeft 0.26s cubic-bezier(0.4,0,0.2,1) both; }
        @media(max-width:480px){ .card-scene{ max-width:92vw; aspect-ratio:3/4.4; } .nav-btn{width:42px;height:42px;font-size:18px;} }
      `}</style>

      {/* Hidden audio element — loads the real MP3 */}
      <audio
        ref={audioRef}
        src={bird.audio}
        preload="none"
        onCanPlay={() => setAudioReady(true)}
      />

      <div style={{ minHeight:"100vh", background:`linear-gradient(180deg,${P.cream},#EDE1CF)`, fontFamily:"'Lora',Georgia,serif", color:P.darkBrown, padding:"20px 16px 32px", display:"flex", flexDirection:"column", alignItems:"center" }}>

        {/* Header */}
        <div style={{ width:"100%", maxWidth:460, marginBottom:24 }}>
          {onBack && (
            <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", color:P.muted, fontSize:"0.8rem", fontFamily:"'Lora',Georgia,serif", padding:"0 0 10px", display:"flex", alignItems:"center", gap:4 }}>
              ← Bend Naturalist
            </button>
          )}
          <div style={{ textAlign:"center" }}>
            <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(1.4rem,4vw,2rem)", fontWeight:600, color:P.warmBrown, letterSpacing:"0.02em", marginBottom:4 }}>
              Birds of Central Oregon
            </h1>
            <p style={{ fontSize:"0.85rem", color:P.muted, fontStyle:"italic" }}>A field guide flashcard deck</p>
          </div>
        </div>

        {/* Card */}
        <div style={{ width:"100%", maxWidth:420, overflow:"hidden", margin:"0 auto" }}
          onTouchStart={e => setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })}
          onTouchEnd={e => {
            if (!touchStart) return;
            const dx = e.changedTouches[0].clientX - touchStart.x;
            const dy = e.changedTouches[0].clientY - touchStart.y;
            if (Math.abs(dy) > Math.abs(dx) && dy < -50) { cyclePhoto(null); }
            else if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 55) { dx > 0 ? prev() : next(); }
            setTouchStart(null);
          }}
        >
        <div className={`card-scene ${swipe || ""}`}>
          <div className={`card ${flipped ? "flipped" : ""}`} onClick={flip}>

            {/* ── FRONT ── */}
            <div className="face" style={{ background:P.parchment, border:`2px solid ${P.softGold}`, boxShadow:"0 8px 32px rgba(93,64,55,0.14)" }}>
              <div style={{ flex:1, position:"relative", overflow:"hidden", background:`linear-gradient(135deg,${bird.color}18,${bird.color}35)` }}>
                <img
                  src={(bird.imgs || [bird.img])[photoIdx % (bird.imgs || [bird.img]).length]}
                  alt={`Photo of ${bird.name}`}
                  style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 20%", display:"block" }}
                />

                {/* Play button */}
                <button
                  className="btn"
                  onClick={e => { e.stopPropagation(); toggleAudio(); }}
                  aria-label={playing ? "Pause song" : "Play bird song"}
                  style={{
                    position:"absolute", bottom:14, right:14,
                    width:52, height:52, borderRadius:"50%",
                    background: playing ? `${bird.color}ee` : "rgba(255,255,255,0.92)",
                    color: playing ? "#fff" : P.warmBrown,
                    fontSize:20, display:"flex", alignItems:"center", justifyContent:"center",
                    backdropFilter:"blur(8px)", border:`2px solid ${playing ? bird.color : "rgba(255,255,255,0.6)"}`,
                    boxShadow:"0 4px 18px rgba(0,0,0,0.22)", zIndex:2,
                  }}
                >
                  {playing ? "▐▐" : "♪"}
                </button>

                {/* Cycle photo button */}
                {(bird.imgs || [bird.img]).length > 1 && (
                  <button
                    className="btn"
                    onClick={cyclePhoto}
                    aria-label="Next photo"
                    style={{
                      position:"absolute", top:10, right:10,
                      width:38, height:38, borderRadius:"50%",
                      background:"rgba(255,255,255,0.85)",
                      color:P.warmBrown, fontSize:16,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      backdropFilter:"blur(6px)", border:`1px solid rgba(255,255,255,0.6)`,
                      boxShadow:"0 2px 10px rgba(0,0,0,0.18)", zIndex:2,
                    }}
                  >
                    ↑
                  </button>
                )}

                {/* Photo counter */}
                {(bird.imgs || [bird.img]).length > 1 && (
                  <div style={{ position:"absolute", top:10, left:10, padding:"2px 8px", borderRadius:10, background:"rgba(0,0,0,0.4)", backdropFilter:"blur(4px)", fontSize:"0.6rem", color:"rgba(255,255,255,0.85)" }}>
                    {photoIdx % (bird.imgs || [bird.img]).length + 1}/{(bird.imgs || [bird.img]).length}
                  </div>
                )}

                {/* Source badge */}
                <div style={{ position:"absolute", bottom:8, left:8, padding:"2px 8px", borderRadius:10, background:"rgba(0,0,0,0.4)", backdropFilter:"blur(4px)", fontSize:"0.6rem", color:"rgba(255,255,255,0.85)" }}>
                  Macaulay Library · xeno-canto
                </div>
              </div>

              <div style={{ padding:"13px 20px", textAlign:"center", borderTop:`1px solid ${P.softGold}40`, background:`linear-gradient(180deg,${P.parchment},#F0DFC0)` }}>
                <p style={{ fontSize:"0.8rem", color:P.muted, fontStyle:"italic", letterSpacing:"0.04em" }}>tap to reveal · {index + 1} of {BIRDS.length}</p>
              </div>
            </div>

            {/* ── BACK ── */}
            <div className="face back" style={{ background:`linear-gradient(180deg,${P.parchment},#F0DFC0)`, border:`2px solid ${P.softGold}`, boxShadow:"0 8px 32px rgba(93,64,55,0.14)", padding:"26px 22px 18px", display:"flex", flexDirection:"column" }}>
              <div style={{ width:56, height:4, borderRadius:2, background:bird.color, margin:"0 auto 16px", opacity:0.7 }} />

              <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(1.45rem,5vw,1.85rem)", fontWeight:700, textAlign:"center", color:P.darkBrown, lineHeight:1.2, marginBottom:4 }}>
                {bird.name}
              </h2>
              <p style={{ fontStyle:"italic", fontSize:"0.88rem", color:P.muted, textAlign:"center", marginBottom:10 }}>{bird.scientific}</p>

              <div style={{ textAlign:"center", marginBottom:18 }}>
                <span style={{ display:"inline-block", padding:"3px 14px", borderRadius:20, background:`${P.sage}20`, color:P.sage, fontSize:"0.73rem", fontWeight:500, border:`1px solid ${P.sage}30` }}>
                  {bird.habitat}
                </span>
              </div>

              <div style={{ height:1, background:`linear-gradient(90deg,transparent,${P.softGold},transparent)`, marginBottom:14 }} />

              <div style={{ flex:1, overflow:"auto" }}>
                {bird.facts.map((fact, i) => (
                  <div key={i} className="fact-row">
                    <span style={{ display:"inline-block", width:20, height:20, lineHeight:"20px", textAlign:"center", borderRadius:"50%", background:`${bird.color}18`, color:bird.color, fontSize:"0.68rem", fontWeight:700, marginRight:10, verticalAlign:"top", flexShrink:0 }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize:"0.84rem", color:P.darkBrown }}>{fact}</span>
                  </div>
                ))}

                {/* ID Tips */}
                {bird.idTips && bird.idTips.length > 0 && (
                  <>
                    <div style={{ height:1, background:`linear-gradient(90deg,transparent,${P.softGold},transparent)`, margin:"12px 0 10px" }} />
                    <p style={{ fontSize:"0.7rem", fontWeight:600, color:P.muted, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6 }}>How to Identify</p>
                    {bird.idTips.map((tip, i) => (
                      <div key={`id-${i}`} style={{ padding:"4px 0", fontSize:"0.78rem", color:P.darkBrown, lineHeight:1.45 }}>
                        <span style={{ color:bird.color, marginRight:6, fontSize:"0.65rem" }}>&#9670;</span>
                        {tip}
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div style={{ textAlign:"center", paddingTop:10, borderTop:`1px solid ${P.softGold}30`, marginTop:10 }}>
                <p style={{ fontSize:"0.73rem", color:P.muted, fontStyle:"italic" }}>tap to flip back · {index + 1} of {BIRDS.length}</p>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Controls */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:20, marginTop:22 }}>
          <button className="btn nav-btn" onClick={prev} aria-label="Previous">&#8249;</button>
          <button className="btn" onClick={flip} style={{ padding:"10px 28px", borderRadius:30, background:P.warmBrown, color:P.cream, fontSize:"0.84rem", fontWeight:500, letterSpacing:"0.03em", boxShadow:"0 2px 10px rgba(93,64,55,0.3)" }}>
            {flipped ? "Show Photo" : "Reveal"}
          </button>
          <button className="btn nav-btn" onClick={next} aria-label="Next">&#8250;</button>
        </div>

        {/* Progress dots */}
        <div style={{ display:"flex", gap:6, marginTop:18, flexWrap:"wrap", justifyContent:"center", maxWidth:320 }}>
          {BIRDS.map((_, i) => (
            <div key={i} className="dot" onClick={() => goTo(i)}
              style={{ background: i === index ? P.warmBrown : `${P.softGold}65`, transform: i === index ? "scale(1.4)" : "scale(1)" }}
            />
          ))}
        </div>

        {/* Shuffle */}
        <button className="btn" onClick={toggleShuffle} style={{ marginTop:14, padding:"5px 16px", borderRadius:20, background: shuffled ? `${P.sage}22` : "transparent", color: shuffled ? P.sage : P.muted, fontSize:"0.77rem", border:`1px solid ${shuffled ? P.sage : P.muted}40` }}>
          {shuffled ? "✦ Shuffled" : "Shuffle Deck"}
        </button>

        <p style={{ marginTop:13, fontSize:"0.7rem", color:`${P.muted}90`, textAlign:"center" }}>← → navigate · ↑ cycle photo · Space to flip · Swipe on mobile</p>

        <p style={{ marginTop:18, fontSize:"0.62rem", color:`${P.muted}75`, textAlign:"center", maxWidth:360, lineHeight:1.6 }}>
          Photos © Macaulay Library / Cornell Lab of Ornithology · Songs © xeno-canto.org contributors (CC)
          <br />Created for the birders of Central Oregon
        </p>
      </div>
    </>
  );
}
