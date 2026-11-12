/* ---------------------------------------------------------------------------
 * Every Lahore neighbourhood we plan and cater events in.
 *
 * This is the coverage directory behind the service × area pages
 * (/<service>-<area>-lahore) and the generated /areas/<slug> pages. The
 * fourteen areas with hand-written editorial pages (src/content/locations.ts)
 * appear here too, under the same slug, so every area has the same set of
 * service pages whichever kind of area page it has.
 *
 * Coordinates are each area's rough centre. They only drive distances from
 * our base, drive-time bands and "nearby" links, so a few hundred metres of
 * error does not matter. Landmarks are well-known reference points only.
 * ------------------------------------------------------------------------- */

export type AreaKind = "society" | "town" | "phase" | "locality" | "corridor";

export type AreaZone = "raiwind" | "johar" | "central" | "dha" | "ferozepur" | "north" | "multan";

export interface LahoreArea {
  slug: string;
  name: string;
  kind: AreaKind;
  zone: AreaZone;
  lat: number;
  lng: number;
  landmarks: string[];
}

type Row = [
  name: string,
  kind: AreaKind,
  lat: number,
  lng: number,
  landmarks?: string[],
  slug?: string,
];

const ZONE_ROWS: Record<AreaZone, Row[]> = {
  raiwind: [
    [
      "Green Acres",
      "society",
      31.4038,
      74.2414,
      ["our farmhouse at The Palms 7", "Raiwind Road"],
      "green-acres",
    ],
    ["Valencia Town", "society", 31.4065, 74.26, ["Wapda Town"], "valencia-town"],
    ["Wapda Town", "society", 31.437, 74.265, ["Wapda Town Roundabout"], "wapda-town"],
    ["Raiwind Road", "corridor", 31.4, 74.235, ["Thokar Niaz Baig", "Lake City"], "raiwind-road"],
    ["Thokar Niaz Baig", "locality", 31.4725, 74.2435, ["the Thokar interchange", "Multan Road"]],
    ["Lake City", "society", 31.385, 74.225, ["Raiwind Road"]],
    [
      "Bahria Town",
      "society",
      31.367,
      74.185,
      ["the Eiffel Tower replica", "Grand Jamia Masjid"],
      "bahria-town-lahore",
    ],
    ["Bahria Orchard", "society", 31.335, 74.17, ["Raiwind Road"]],
    ["Etihad Town", "society", 31.38, 74.21, ["Raiwind Road"]],
    ["Al-Kabir Town", "society", 31.37, 74.235, ["Raiwind Road"]],
    ["Raiwind", "town", 31.25, 74.22, ["Raiwind Road"]],
    ["EME Society", "society", 31.455, 74.225, ["Multan Road", "Canal Road"]],
    ["Park View City", "society", 31.465, 74.205, ["Multan Road", "Thokar Niaz Baig"]],
    ["NFC Society", "society", 31.445, 74.275, ["Wapda Town"]],
    ["DHA Rahbar", "phase", 31.4, 74.29, ["Defence Road"]],
    ["DHA 9 Town", "phase", 31.41, 74.32, ["Defence Road"]],
    ["Defence Road", "corridor", 31.39, 74.31, ["DHA Rahbar"]],
  ],
  johar: [
    ["Johar Town", "town", 31.469, 74.272, ["Emporium Mall", "Expo Centre Lahore"], "johar-town"],
    [
      "Canal Road",
      "corridor",
      31.474,
      74.256,
      ["the Lahore Canal", "Punjab University New Campus"],
      "canal-road",
    ],
    ["PIA Housing Society", "society", 31.455, 74.295, ["Johar Town"]],
    ["Revenue Society", "society", 31.465, 74.288, ["Johar Town"]],
    ["PCSIR Housing Society", "society", 31.458, 74.282, ["Canal Road"]],
    ["Faisal Town", "town", 31.478, 74.305, ["Akbar Chowk"]],
    ["Township", "town", 31.452, 74.312, ["Kot Lakhpat"]],
    ["Green Town", "locality", 31.44, 74.3, ["Township"]],
  ],
  central: [
    ["Gulberg", "town", 31.515, 74.348, ["Liberty Market", "MM Alam Road"], "gulberg"],
    [
      "Model Town",
      "town",
      31.483,
      74.326,
      ["Model Town Park", "Model Town Link Road"],
      "model-town",
    ],
    ["Model Town Extension", "town", 31.47, 74.335, ["Model Town"]],
    ["Garden Town", "town", 31.505, 74.322, ["Barkat Market", "Kalma Chowk"]],
    ["Muslim Town", "locality", 31.512, 74.312, ["Canal Road"]],
    ["Wahdat Colony", "locality", 31.505, 74.298, ["Wahdat Road"]],
    ["Allama Iqbal Town", "town", 31.508, 74.285, ["Moon Market", "Karim Block Market"]],
    ["Mustafa Town", "locality", 31.495, 74.268, ["Wahdat Road"]],
    ["Shadman", "locality", 31.54, 74.33, ["Shadman Market", "Jail Road"]],
    ["Shah Jamal", "locality", 31.53, 74.325, ["Shadman"]],
    ["Ichhra", "locality", 31.534, 74.317, ["Ichhra Bazaar", "Ferozepur Road"]],
    ["Samanabad", "locality", 31.54, 74.295, ["Samanabad Morr"]],
    ["Sabzazar", "locality", 31.53, 74.268, ["Multan Road"]],
    ["Gulshan-e-Ravi", "locality", 31.552, 74.28, ["Samanabad"]],
    ["Mozang", "locality", 31.556, 74.318, ["Mozang Chungi"]],
    ["Upper Mall", "locality", 31.553, 74.345, ["Mall Road", "Bagh-e-Jinnah"]],
    ["Garhi Shahu", "locality", 31.56, 74.35, ["Allama Iqbal Road"]],
    ["Dharampura", "locality", 31.556, 74.365, ["Garhi Shahu"]],
    ["Cavalry Ground", "society", 31.497, 74.373, ["Cavalry Ground Market"]],
    ["Walton", "locality", 31.485, 74.37, ["Walton Road"]],
  ],
  dha: [
    ["DHA", "society", 31.473, 74.408, ["Y Block Market", "Lahore Ring Road"], "dha-lahore"],
    ["DHA Phase 1", "phase", 31.478, 74.385, ["Walton Road"]],
    ["DHA Phase 2", "phase", 31.468, 74.398, ["DHA Phase 1"]],
    ["DHA Phase 3", "phase", 31.475, 74.378, ["Y Block Market"]],
    ["DHA Phase 4", "phase", 31.465, 74.388, ["DHA Phase 3"]],
    ["DHA Phase 5", "phase", 31.462, 74.41, ["DHA Phase 4"]],
    ["DHA Phase 6", "phase", 31.47, 74.45, ["Lahore Ring Road"]],
    ["DHA Phase 7", "phase", 31.435, 74.47, ["Lahore Ring Road"]],
    ["DHA Phase 8", "phase", 31.505, 74.44, ["Allama Iqbal International Airport"]],
    ["DHA Phase 9 Prism", "phase", 31.49, 74.48, ["Lahore Ring Road"]],
    [
      "Cantt & Askari",
      "society",
      31.513,
      74.41,
      ["Fortress Stadium", "Sarwar Road"],
      "cantt-askari",
    ],
    ["Askari 10", "society", 31.52, 74.415, ["Airport Road"]],
    ["Askari 11", "society", 31.45, 74.445, ["Bedian Road"]],
    ["Divine Gardens", "society", 31.51, 74.42, ["Airport Road"]],
    ["Airport Road", "corridor", 31.52, 74.4, ["Allama Iqbal International Airport"]],
    ["Ghazi Road", "corridor", 31.48, 74.4, ["DHA Phase 1"]],
    ["Bedian Road", "corridor", 31.43, 74.45, ["DHA Phase 6"], "bedian-road"],
    ["Barki Road", "corridor", 31.47, 74.5, ["Lahore Ring Road"]],
    ["Paragon City", "society", 31.49, 74.47, ["Barki Road"]],
  ],
  ferozepur: [
    ["Ferozepur Road", "corridor", 31.45, 74.337, ["Kalma Chowk", "Kot Lakhpat"], "ferozepur-road"],
    ["Kot Lakhpat", "locality", 31.445, 74.327, ["Ferozepur Road"]],
    ["Chungi Amar Sidhu", "locality", 31.47, 74.34, ["Ferozepur Road"]],
    ["Nishtar Colony", "locality", 31.42, 74.34, ["Ferozepur Road"]],
    ["Gajju Matah", "locality", 31.4, 74.36, ["Ferozepur Road"]],
    ["Kahna", "town", 31.37, 74.37, ["Ferozepur Road"]],
    ["Central Park", "society", 31.33, 74.36, ["Ferozepur Road"]],
  ],
  north: [
    ["Walled City", "locality", 31.582, 74.316, ["Badshahi Mosque", "Delhi Gate"]],
    ["Anarkali", "locality", 31.567, 74.31, ["Anarkali Bazaar", "Mall Road"]],
    ["Shadbagh", "locality", 31.592, 74.33, ["the Walled City"]],
    ["Mughalpura", "locality", 31.567, 74.378, ["GT Road"]],
    ["Baghbanpura", "locality", 31.58, 74.372, ["GT Road", "Shalimar Gardens"]],
    ["Shalimar", "locality", 31.586, 74.383, ["Shalimar Gardens", "GT Road"]],
    ["Harbanspura", "locality", 31.583, 74.415, ["GT Road"]],
    ["Manawan", "town", 31.6, 74.45, ["GT Road"]],
    ["Shahdara", "town", 31.625, 74.285, ["Jahangir's Tomb", "the Ravi bridge"]],
  ],
  multan: [
    ["Multan Road", "corridor", 31.5, 74.25, ["Thokar Niaz Baig"]],
    ["Chung", "town", 31.475, 74.19, ["Multan Road"]],
    ["Hanjarwal", "locality", 31.49, 74.24, ["Multan Road"]],
    ["Awan Town", "locality", 31.495, 74.26, ["Multan Road"]],
  ],
};

export const ZONE_LABEL: Record<AreaZone, string> = {
  raiwind: "Raiwind Road, Thokar & Defence Road",
  johar: "Johar Town & the Canal belt",
  central: "Central Lahore",
  dha: "DHA, Cantt & Airport",
  ferozepur: "Ferozepur Road & South Lahore",
  north: "Old City & North Lahore",
  multan: "Multan Road & West Lahore",
};

/** Zones in the order a reader at our Green Acres base would meet them. */
export const ZONE_ORDER: AreaZone[] = [
  "raiwind",
  "johar",
  "multan",
  "central",
  "ferozepur",
  "dha",
  "north",
];

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const lahoreAreas: LahoreArea[] = ZONE_ORDER.flatMap((zone) =>
  ZONE_ROWS[zone].map(([name, kind, lat, lng, landmarks = [], slug]) => ({
    slug: slug ?? slugify(name),
    name,
    kind,
    zone,
    lat,
    lng,
    landmarks,
  })),
);

const bySlug = new Map(lahoreAreas.map((a) => [a.slug, a]));
export function getLahoreArea(slug: string): LahoreArea | undefined {
  return bySlug.get(slug);
}

/** The neighbourhoods around our base, worked first (Phase 1 of the plan). */
export const nearbyFirstSlugs = [
  "green-acres",
  "valencia-town",
  "wapda-town",
  "raiwind-road",
  "johar-town",
];
export const isNearbyFirst = (a: LahoreArea) => nearbyFirstSlugs.includes(a.slug);

/* ----------------------------- geography ------------------------------- */

/** The Palms 7 Farmhouse, Green Acres Extension (src/content/site.ts geo). */
const BASE = { lat: 31.4037716, lng: 74.241375 };

function straightKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const dLat = (a.lat - b.lat) * 111;
  const dLng = (a.lng - b.lng) * 111 * Math.cos(((a.lat + b.lat) / 2) * (Math.PI / 180));
  return Math.hypot(dLat, dLng);
}

/** Rough road distance from our base (straight line × 1.3), never below 1. */
/** Compass direction of the area as seen from our base. */
export function directionFromBase(a: LahoreArea) {
  const dLat = a.lat - BASE.lat;
  const dLng = (a.lng - BASE.lng) * Math.cos((BASE.lat * Math.PI) / 180);
  if (Math.hypot(dLat, dLng) < 0.012) return "right beside";
  const deg = (Math.atan2(dLng, dLat) * 180) / Math.PI;
  const names = [
    "north",
    "north-east",
    "east",
    "south-east",
    "south",
    "south-west",
    "west",
    "north-west",
  ];
  return names[Math.round(((deg + 360) % 360) / 45) % 8];
}

export function kmFromBase(a: LahoreArea) {
  return Math.max(1, Math.round(straightKm(a, BASE) * 1.3));
}

/** An honest evening drive-time band for the road distance. */
export function driveTime(a: LahoreArea) {
  const km = kmFromBase(a);
  if (km <= 4) return "under 15 minutes";
  if (km <= 10) return "15 to 25 minutes";
  if (km <= 18) return "25 to 40 minutes";
  if (km <= 28) return "40 to 60 minutes";
  return "about an hour or more";
}

export function nearbyAreas(area: LahoreArea, count = 6) {
  return lahoreAreas
    .filter((a) => a.slug !== area.slug)
    .map((a) => ({ area: a, d: straightKm(area, a) }))
    .sort((x, y) => x.d - y.d)
    .slice(0, count)
    .map((x) => x.area);
}

export const KIND_LABEL: Record<AreaKind, string> = {
  society: "Housing society",
  town: "Town",
  phase: "DHA phase",
  locality: "Neighbourhood",
  corridor: "Road corridor",
};

export const areasInZone = (zone: AreaZone) => lahoreAreas.filter((a) => a.zone === zone);
