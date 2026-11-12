/* ---------------------------------------------------------------------------
 * Service × area pages and generated area pages.
 *
 * URLs are flat and match the way people search:
 *   /mehndi-planning-johar-town-lahore     a service in an area
 *   /areas/dha-phase-5                     an area (generated unless it has
 *                                          an editorial page in locations.ts)
 *
 * The copy is assembled from hand-written variants, chosen by a stable hash
 * of the URL, and filled with facts that genuinely differ per area: the road
 * distance and drive time from our base, the kind of neighbourhood and where
 * its events are held, its landmarks and its nearest neighbours. Service
 * substance (lede, inclusions) comes from src/content/services.ts, so nothing
 * here promises more than the service pages do.
 * ------------------------------------------------------------------------- */

import { getLocation } from "@/content/locations";
import {
  KIND_LABEL,
  ZONE_LABEL,
  directionFromBase,
  driveTime,
  getLahoreArea,
  isNearbyFirst,
  kmFromBase,
  lahoreAreas,
  nearbyAreas,
  type LahoreArea,
} from "@/content/lahore-areas";
import { services, type Service } from "@/content/services";
import { site } from "@/content/site";
import type { Crumb } from "@/lib/seo";

/* ------------------------------- routing ------------------------------- */

/** A destination wedding is, by definition, not tied to a Lahore neighbourhood. */
export const areaServices: Service[] = services.filter((s) => s.slug !== "destination-weddings");

const cityTail = (a: LahoreArea) => (a.slug.endsWith("lahore") ? a.slug : `${a.slug}-lahore`);
export const comboSlug = (s: Service, a: LahoreArea) => `${s.slug}-${cityTail(a)}`;
export const comboPath = (s: Service, a: LahoreArea) => `/${comboSlug(s, a)}`;
export const areaPagePath = (a: LahoreArea) => `/areas/${a.slug}`;
export const hasEditorialPage = (a: LahoreArea) => Boolean(getLocation(a.slug));
export const areaDisplay = (a: LahoreArea) =>
  a.slug === "dha-lahore" ? "DHA Lahore" : `${a.name}, Lahore`;

export interface Combo {
  service: Service;
  area: LahoreArea;
}
const comboIndex = new Map<string, Combo>();
for (const service of areaServices)
  for (const area of lahoreAreas) comboIndex.set(comboSlug(service, area), { service, area });

export const resolveCombo = (slug: string) => comboIndex.get(slug.toLowerCase());
export const allCombos = () => [...comboIndex.values()];
export const isComboPath = (path: string) =>
  comboIndex.has(path.replace(/^\/+|\/+$/g, "").toLowerCase());

/** Areas whose /areas/<slug> page is generated rather than hand-written. */
export const generatedAreas = () => lahoreAreas.filter((a) => !hasEditorialPage(a));
/** Hero frames rotate by zone, so neighbouring area pages do not open alike. */
const ZONE_HERO: Record<LahoreArea["zone"], string> = {
  raiwind: "ae-25",
  johar: "ae-08",
  multan: "ae-04",
  central: "ae-13",
  ferozepur: "ae-24",
  dha: "ae-10",
  north: "ae-16",
};
export const generatedAreaHero = (a: LahoreArea) => ZONE_HERO[a.zone];

export function generatedAreaTrail(a: LahoreArea): Crumb[] {
  return [
    { name: "Home", path: "/" },
    { name: "Areas", path: "/areas" },
    { name: a.name, path: `/areas/${a.slug}` },
  ];
}

export const getGeneratedArea = (slug: string) => {
  const a = getLahoreArea(slug);
  return a && !hasEditorialPage(a) ? a : undefined;
};

/* ------------------------------- helpers ------------------------------- */

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}
const pick = <T>(key: string, list: T[]): T => list[hash(key) % list.length];

/* Neighbouring areas sit next to each other in the directory, so rotating the
 * variant by the area's position guarantees that two adjacent areas never get
 * the same paragraph for the same service. */
const areaOrdinal = new Map(lahoreAreas.map((a, i) => [a.slug, i]));
const rotate = <T>(salt: string, a: LahoreArea, list: T[]): T =>
  list[(hash(salt) + (areaOrdinal.get(a.slug) ?? 0)) % list.length];

type Group = "wedding" | "celebration" | "catering" | "design" | "venue";
const GROUP: Record<string, Group> = {
  "wedding-planning": "wedding",
  "luxury-weddings": "wedding",
  "mehndi-planning": "wedding",
  "barat-planning": "wedding",
  "walima-planning": "wedding",
  "nikah-planning": "wedding",
  "corporate-events": "celebration",
  "birthday-events": "celebration",
  "private-events": "celebration",
  "luxury-catering": "catering",
  "live-bbq-catering": "catering",
  "outdoor-catering": "catering",
  "indoor-catering": "catering",
  "stage-decoration": "design",
  "floral-design": "design",
  "farmhouse-events": "venue",
  "venue-management": "venue",
};
const groupOf = (s: Service): Group => GROUP[s.slug] ?? "wedding";

/** What the event itself is called, for sentences like "your mehndi in …". */
const EVENT: Record<string, string> = {
  "wedding-planning": "wedding",
  "luxury-weddings": "luxury wedding",
  "mehndi-planning": "mehndi",
  "barat-planning": "barat",
  "walima-planning": "walima",
  "nikah-planning": "nikah",
  "corporate-events": "corporate event",
  "birthday-events": "birthday",
  "private-events": "private event",
  "luxury-catering": "catered dinner",
  "live-bbq-catering": "BBQ evening",
  "outdoor-catering": "outdoor function",
  "indoor-catering": "hall function",
  "stage-decoration": "reception",
  "floral-design": "celebration",
  "farmhouse-events": "farmhouse event",
  "venue-management": "function",
};
const eventOf = (s: Service) => EVENT[s.slug] ?? "event";
/** "a mehndi", "an event", "an outdoor event". */
const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const aEvent = (s: Service) => `${/^[aeiou]/.test(eventOf(s)) ? "an" : "a"} ${eventOf(s)}`;

/** A title that fits search results: brand suffix only while it fits. */
const fitTitle = (t: string) => (`${t} | ${site.short}`.length <= 65 ? `${t} | ${site.short}` : t);

/** Where the area sits relative to us, and who its neighbours are. */
function neighbourhoodLine(a: LahoreArea, s?: Service) {
  const dir = directionFromBase(a);
  const near = nearbyAreas(a, 3).map((n) => `${n.name} (~${kmFromBase(n)} km from us)`);
  const where =
    dir === "right beside"
      ? `${a.name} sits right beside our Green Acres base`
      : `${a.name} lies ${dir} of our Green Acres base`;
  const tail = s
    ? `Guests for ${aEvent(s)} in ${a.name} often come from those areas too, and one team covering all of them keeps the ${eventOf(s)} simple.`
    : `Families here often have relatives across those areas, and one team covering all of them keeps a wedding week simple.`;
  return `${where}, with ${listNames(near)} as its nearest neighbours. ${tail}`;
}
const lower = (s: Service) => s.name.toLowerCase().replace("bbq", "BBQ");

function landmarkPhrase(a: LahoreArea) {
  if (a.landmarks.length >= 2) return `${a.landmarks[0]} and ${a.landmarks[1]}`;
  return a.landmarks[0] ?? ZONE_LABEL[a.zone];
}

/** Where the area sits, phrased so it never repeats the area's own name. */
const ZONE_IN: Record<LahoreArea["zone"], string> = {
  raiwind: "on the Raiwind Road side of the city",
  johar: "along the Canal belt",
  central: "in central Lahore",
  dha: "on the DHA and Cantt side of Lahore",
  ferozepur: "off Ferozepur Road in south Lahore",
  north: "in the old city and north Lahore",
  multan: "off Multan Road in west Lahore",
};
function zoneIn(a: LahoreArea) {
  const z = ZONE_IN[a.zone];
  return z.toLowerCase().includes(a.name.toLowerCase()) ? "in Lahore" : z;
}

function listNames(items: string[]) {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** Where events in this kind of neighbourhood usually happen. */
const VENUES: Record<LahoreArea["kind"], string> = {
  society: "family homes with lawns, the society's community halls and parks, and marquees",
  town: "marriage halls, marquees and family homes",
  phase: "house lawns, the phase's marquees and halls, and club venues",
  locality: "family homes and rooftops, nearby marriage halls and community spaces",
  corridor: "farmhouses, marquees and banquet halls along the road",
};

/** The practical thing a crew has to get right in this kind of area. */
const LOGISTICS: Record<LahoreArea["kind"], string[]> = {
  society: [
    "For your {event} in {area}, gate passes and the society's event timings are cleared with security before the first truck arrives.",
    "Ahead of {anEvent} in {area}, we agree vehicle entry, generator placement and the noise cut-off with the society office.",
  ],
  town: [
    "If your {event} in {area} is in a hall, we read the contract first, because decor and outside-catering clauses decide what is possible.",
    "For {anEvent} in {area}, parking, generator capacity and the walk from kitchen to the furthest table are checked on a survey, not taken from a brochure.",
  ],
  phase: [
    "For your {event} in {area}, DHA entry and event rules are handled in advance, so vendor vehicles are not held at the gate.",
    "A house-lawn {event} in {area} is planned around the neighbours, entry passes and the phase's sound limits.",
  ],
  locality: [
    "Streets around {area} are narrow, so for your {event} deliveries come in smaller vehicles, in planned windows, with the cooking area agreed before the day.",
    "For {anEvent} in {area} we plan the route for every vehicle and keep the build compact enough for the lane outside.",
  ],
  corridor: [
    "For {anEvent} along {area}, farmhouse access, approach lighting and generator back-up are planned in, because the road itself gives you none of them.",
    "On {area}, the arrival for your {event} matters most: parking, a lit approach and a clear drop-off at the gate.",
  ],
};

function distanceLine(a: LahoreArea, s: Service) {
  const km = kmFromBase(a);
  const t = driveTime(a);
  const ev = eventOf(s);
  if (km <= 5)
    return `${a.name} is practically our own neighbourhood: your ${ev} there is about ${km} km from The Palms 7 Farmhouse, ${t} by road.`;
  if (km <= 12)
    return `${cap(aEvent(s))} in ${a.name} is a short run from our Green Acres base, roughly ${km} km and ${t} on an evening.`;
  if (km <= 22)
    return `${a.name} is about ${km} km from our base in Green Acres (${t} in evening traffic), so ${aEvent(s)} there sits well inside our everyday travel.`;
  return `${a.name} is one of our longer runs, about ${km} km from Green Acres (${t}), so for ${aEvent(s)} there crews leave early and large builds start the day before.`;
}

/* ---------------------------- service × area ---------------------------- */

const LEDES: Record<Group, string[]> = {
  wedding: [
    "{Service} for families in {area}, planned by one team from the first visit to the last guest leaving.",
    "Your {event} in {area}, designed, catered and run by the same people from start to finish.",
    "{Service} in {area} with decor, catering and the run of the day held by one accountable team.",
  ],
  celebration: [
    "{Service} in {area}, planned with the same care we give a wedding for eight hundred.",
    "From the first idea to the last plate, your {event} in {area} handled by one team.",
  ],
  catering: [
    "{Service} in {area}: menus planned with you, cooked by our own kitchen and served on time.",
    "Hot food, on time, at your {event} in {area}. {Service} from our own Green Acres kitchen.",
  ],
  design: [
    "{Service} in {area}, drawn, built in our workshop and installed on the day.",
    "The part of your {event} in {area} that every photograph is taken in front of.",
  ],
  venue: [
    "{Service} for {area}: the venue chosen, built and run so the family can be guests.",
    "Someone has to stand at the gate from six in the morning. For events in {area}, that is us.",
  ],
};

const AREA_PARAS: string[] = [
  "{area} is a {kind} {zoneIn}, and most {event}s here are held at {venues}. Our crews know the roads around {landmarks}, and we plan your {event} around the area rather than around a template.",
  "Families in {area} usually host {anEvent} at {venues}. Whichever it is, we survey it first, so the plan for your {event} fits the real space near {landmarks} and not a picture of it.",
  "In {area}, a {kind} {zoneIn}, {anEvent} tends to happen at {venues}. Our planners visit before quoting, and the proposal for your {event} is written for that venue.",
];

const SERVICE_PARAS: Record<Group, string[]> = {
  wedding: [
    "{lede} For a {event} in {area} that means {inclusions}, all under one plan and one point of contact.",
    "{lede} In {area} we bring {inclusions}, so the family is not managing five vendors on the day.",
  ],
  celebration: [
    "{lede} For {area} we look after {inclusions}, scaled to the guest list rather than to a package.",
    "{lede} A {event} in {area} gets {inclusions}, with one person answerable for all of it.",
  ],
  catering: [
    "{lede} In {area} that covers {inclusions}, with our own kitchen team and service brigade.",
    "{lede} For events in {area} we handle {inclusions}, planned around the venue's kitchen, power and space.",
  ],
  design: [
    "{lede} For {area} that means {inclusions}, built in our Green Acres workshop and installed on the day.",
    "{lede} In {area} we take care of {inclusions}, so the stage, florals and light read as one design.",
  ],
  venue: [
    "{lede} For families in {area} we handle {inclusions}, from the first survey to the clear-down.",
    "{lede} Around {area} that means {inclusions}, planned from our own experience of running a farmhouse.",
  ],
};

const OWN_VENUE =
  "If you would rather not host at home or in a hall, our own base, The Palms 7 Farmhouse in Green Acres, has lawns, a kitchen and our workshop on one site and is available subject to date.";

function fill(t: string, s: Service, a: LahoreArea) {
  const inc = s.inclusions
    .slice(1, 5)
    .map((i) => i.title.toLowerCase())
    .filter(Boolean);
  return t
    .replace(/\{Service\}/g, s.name)
    .replace(/\{service\}/g, lower(s))
    .replace(/\{anEvent\}/g, aEvent(s))
    .replace(/\{event\}/g, eventOf(s))
    .replace(/\{area\}/g, a.name)
    .replace(/\{kind\}/g, KIND_LABEL[a.kind].toLowerCase())
    .replace(/\{zoneIn\}/g, zoneIn(a))
    .replace(/\{zone\}/g, ZONE_LABEL[a.zone])
    .replace(/\{venues\}/g, VENUES[a.kind])
    .replace(/\{landmarks\}/g, landmarkPhrase(a))
    .replace(/\{lede\}/g, s.lede)
    .replace(/\{inclusions\}/g, listNames(inc));
}

export interface ComboContent {
  path: string;
  h1: string;
  planHeading: string;
  eventName: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  lede: string;
  paragraphs: string[];
  answers: { q: string; a: string }[];
  ctaTitle: string;
}

/** What drives the price, by kind of service. */
const COST: Record<Group, string> = {
  wedding: "A {event} is priced on the guest count, the menu and the decor brief.",
  celebration: "A {event} is priced on the guest count, the menu and how much is built on site.",
  catering: "Catering is priced per head; our packages are listed on the menu page.",
  design: "A {event} setup is priced on the size of the stage, the florals and the lighting.",
  venue: "A {event} is priced on the venue, the guest count and the build it needs.",
};

export function comboContent({ service: s, area: a }: Combo): ComboContent {
  const path = comboPath(s, a);
  const g = groupOf(s);
  const km = kmFromBase(a);
  const where = areaDisplay(a);

  const paragraphs = [
    fill(rotate(s.slug + "a", a, AREA_PARAS), s, a),
    neighbourhoodLine(a, s),
    fill(rotate(s.slug + "s", a, SERVICE_PARAS[g]), s, a),
    `${distanceLine(a, s)} ${fill(rotate(s.slug + "l", a, LOGISTICS[a.kind]), s, a)}`,
  ];

  const inc = s.inclusions.slice(1).map((i) => i.title.toLowerCase());
  const answers: { q: string; a: string }[] = [
    {
      q: `Do you offer ${lower(s)} in ${where}?`,
      a: `Yes. ${site.name} provides ${lower(s)} in ${a.name}, covering ${listNames(inc)}. The team travels from Green Acres Extension, about ${km} km away.`,
    },
    {
      q: `Where can ${aEvent(s)} in ${a.name} be held?`,
      a: `${cap(eventOf(s))}s in ${a.name} are usually held at ${VENUES[a.kind]}${
        s.slug === "indoor-catering"
          ? ", and we plan the service around the room you have"
          : `, or ${aEvent(s)} can move to our own farmhouse in Green Acres, subject to date`
      }.`,
    },
    {
      q: `How much does ${lower(s)} in ${a.name} cost?`,
      a: `${COST[g].replace("{event}", eventOf(s))} Every ${eventOf(s)} quote for ${a.name} is written in full before you commit.`,
    },
    {
      q: `How do we book ${lower(s)} in ${a.name}?`,
      a: `Call or WhatsApp ${site.phoneDisplay} with the date of your ${eventOf(s)}. A planner replies ${site.responseTime.toLowerCase()} and visits the venue in ${a.name}.`,
    },
  ];

  const h1 = `${s.name} in ${where}`;
  return {
    path,
    h1,
    planHeading: `How we plan your ${eventOf(s)} in ${a.name}`,
    eventName: eventOf(s),
    metaTitle: fitTitle(`${s.name} in ${where}`),
    metaDescription: `${s.name} in ${a.name}, Lahore, planned and run by ${site.short}, ${km} km from our Green Acres base. Call ${site.phoneDisplay}.`,
    kicker: `${KIND_LABEL[a.kind]} · ${ZONE_LABEL[a.zone]}`,
    lede: fill(rotate(s.slug + "h", a, LEDES[g]), s, a),
    paragraphs,
    answers,
    ctaTitle: `Planning ${aEvent(s)} in ${a.name}?`,
  };
}

/** Same service in the nearest areas: the sideways links of the coverage web. */
export function nearbyCombos(c: Combo, count = 6) {
  return nearbyAreas(c.area, count).map((a) => ({
    area: a,
    path: comboPath(c.service, a),
    km: kmFromBase(a),
  }));
}

/** Every other service in the same area. */
export function siblingCombos(c: Combo, count = 6) {
  const related = c.service.related.filter((slug) => slug !== c.service.slug);
  const sameGroup = areaServices
    .filter((s) => s.slug !== c.service.slug && groupOf(s) === groupOf(c.service))
    .map((s) => s.slug);
  const order = [...new Set([...related, ...sameGroup, ...areaServices.map((s) => s.slug)])];
  return order
    .filter((slug) => slug !== c.service.slug)
    .map((slug) => areaServices.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s))
    .slice(0, count)
    .map((s) => ({ service: s, path: comboPath(s, c.area) }));
}

/* ---------------------------- generated area ---------------------------- */

export interface AreaContent {
  path: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  lede: string;
  paragraphs: string[];
  facts: { label: string; value: string }[];
  answers: { q: string; a: string }[];
}

const AREA_LEDES = [
  "Weddings, celebrations and catering in {area}, planned and run from our base in Green Acres.",
  "Event management and catering for families in {area}, with one team answerable for all of it.",
  "From a nikah at home to a full wedding week, events in {area} planned by one team.",
];

export function areaContent(a: LahoreArea): AreaContent {
  const path = areaPagePath(a);
  const km = kmFromBase(a);
  const where = areaDisplay(a);
  // Area pages talk about events in general, not one service.
  const dummy = { ...areaServices[0], slug: "_area", name: "Events" } as Service;
  return {
    path,
    h1: `Event Management & Catering in ${where}`,
    metaTitle: fitTitle(`Event Planner & Catering in ${where}`),
    metaDescription: `Wedding planning, decor and catering in ${a.name}, Lahore by ${site.name}. About ${km} km from our Green Acres base. Call ${site.phoneDisplay}.`,
    kicker: `${KIND_LABEL[a.kind]} · ${ZONE_LABEL[a.zone]}`,
    lede: fill(pick(path, AREA_LEDES), dummy, a),
    paragraphs: [
      fill(pick(path + "a", AREA_PARAS), dummy, a),
      `${distanceLine(a, dummy)} ${fill(pick(path + "l", LOGISTICS[a.kind]), dummy, a)}`,
      neighbourhoodLine(a),
      OWN_VENUE,
    ],
    facts: [
      { label: "Area", value: `${a.name} (${KIND_LABEL[a.kind].toLowerCase()})` },
      { label: "Part of Lahore", value: ZONE_LABEL[a.zone] },
      { label: "Distance from our base", value: `About ${km} km, ${driveTime(a)}` },
      { label: "Where events are held", value: VENUES[a.kind] },
      {
        label: "Services here",
        value: `${areaServices.length} services, from wedding planning to live BBQ`,
      },
      { label: "Our base", value: site.address.full },
      { label: "Reply time", value: site.responseTime },
    ],
    answers: [
      {
        q: `Do you plan events in ${where}?`,
        a: `Yes. ${site.name} plans weddings, celebrations and catering in ${a.name}. We are based at The Palms 7 Farmhouse in Green Acres Extension, about ${km} km away.`,
      },
      {
        q: `Do you have an office in ${a.name}?`,
        a: `No. We work from one base at Green Acres, Lahore, and our planners and crews travel to ${a.name} for visits and event days.`,
      },
      {
        q: `Which services do you offer in ${a.name}?`,
        a: `Wedding planning (mehndi, barat, nikah, walima), stage and floral decor, luxury, outdoor, indoor and live BBQ catering, corporate, birthday and private events, and venue management.`,
      },
      {
        q: `How do we book an event in ${a.name}?`,
        a: `Call or WhatsApp ${site.phoneDisplay}, or send the enquiry form. A planner replies ${site.responseTime.toLowerCase()}.`,
      },
    ],
  };
}

export { isNearbyFirst };
