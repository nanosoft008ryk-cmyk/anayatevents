import { services, getService } from "@/content/services";
import { locations, getLocation } from "@/content/locations";
import { site } from "@/content/site";

/* ---------------------------------------------------------------------------
 * Answer Engine Optimisation layer.
 *
 * Everything here is written to be quoted accurately. Each entry answers a
 * question a real visitor asks, in a direct first sentence followed by the
 * detail that makes the answer usable. Nothing is invented: every fact is
 * already stated elsewhere in src/content (services, locations, site) — this
 * file only states it plainly, in question-and-answer form, so both readers
 * and answer engines can lift it without interpretation.
 * ------------------------------------------------------------------------- */

export interface AnswerItem {
  /** The question, phrased the way people actually ask it. */
  q: string;
  /** A direct answer in one or two sentences. Never a preamble. */
  a: string;
}

export interface ServiceAnswers {
  /** "What is X?" — a definition that can stand alone as a quotation. */
  definition: string;
  /** Who the service suits. */
  whoFor: string;
  /** How the work is actually carried out. */
  how: string;
  /** When to enquire, in plain calendar terms. */
  when: string;
  /** Short lead-time value for the facts table. */
  leadTime: string;
  /** Short "best suited to" value for the facts table. */
  bestFor: string;
}

export const serviceAnswers: Record<string, ServiceAnswers> = {
  "wedding-planning": {
    definition:
      "Wedding planning at Anayat Events is full-service management of an entire Pakistani wedding week — budget, design, florals, catering, vendors and the run-of-show for every function — held by one named lead planner from the first conversation to the final clear-down.",
    whoFor:
      "Families holding two or more functions who want a single accountable team rather than separate decor, catering and coordination contracts.",
    how: "We build the budget line by line before booking a supplier, issue a designed proposal with floor plans and elevations, contract and brief every vendor ourselves, then run each function against a rehearsed minute-by-minute schedule.",
    when: "Six to nine months ahead for a winter wedding week in Lahore. Single functions can be delivered in six to eight weeks, though floral and crew availability narrows sharply inside three months.",
    leadTime: "6–9 months for a winter week",
    bestFor: "Multi-function wedding weeks",
  },
  "luxury-weddings": {
    definition:
      "A luxury wedding commission is a wedding built rather than rented: sets fabricated in our workshop, a lighting design drawn for the room, florals specified by variety and season, and a private planning team assigned to one family.",
    whoFor:
      "Families who want a room designed from scratch instead of a package, and who accept that fabrication and imported florals carry a different investment level.",
    how: "The commission starts with a design document rather than a quotation — elevations, materials, lighting plot and floral schedule — and only then converts into an itemised investment range.",
    when: "As early as the date is fixed. Fabrication and imported floral lead times, not the calendar, decide what is possible.",
    leadTime: "9+ months preferred",
    bestFor: "Bespoke, fabricated commissions",
  },
  "destination-weddings": {
    definition:
      "A destination wedding is one produced at a venue with no permanent infrastructure — no service kitchen, no reliable power, sometimes no walls — so the plan has to bring the venue with it.",
    whoFor: "Couples marrying on land outside the city: a family farm, a lawn, an estate or a location chosen for the view rather than the facilities.",
    how: "We survey the site first, then build the plan around it: a field kitchen, power and water, guest transport and arrival timing, and a written weather contingency before any design is discussed.",
    when: "Earlier than a city wedding. Site surveys, permissions and transport logistics need time that a hotel ballroom does not.",
    leadTime: "8–12 months",
    bestFor: "Venues without infrastructure",
  },
  "mehndi-planning": {
    definition:
      "Mehndi planning covers the design and production of the mehndi function — colour-saturated sets, marigold installation, floor seating, sound and dhol — designed around movement rather than a fixed seating plan.",
    whoFor: "Families expecting a loud, cross-generational evening where most guests will be standing, dancing or seated on the floor.",
    how: "We design the dance floor and sightlines first, then build jharoka and mirror sets around them, install fresh marigold on the day, and plan sound so the dhol works without drowning the room.",
    when: "Six to eight weeks is workable for a standalone mehndi; longer if it sits inside a full wedding week.",
    leadTime: "6–8 weeks standalone",
    bestFor: "High-energy, floor-seated evenings",
  },
  "walima-planning": {
    definition:
      "Walima planning is the production of the most formal evening of the week, judged largely on the food and on how quickly it reaches every table.",
    whoFor: "Hosts holding a seated reception where guests arrive close together and stay for the full service.",
    how: "We set the table architecture and service routes before the decor, design the ceiling and drape to make a large room feel held, and size the service brigade to the guest count so no table is served late.",
    when: "Six to nine months for a peak winter date; less outside the season.",
    leadTime: "6–9 months in season",
    bestFor: "Formal seated receptions",
  },
  "nikah-planning": {
    definition:
      "Nikah planning is the design of the ceremony itself — a small, seated function where acoustics, sightlines and restraint matter more than scale.",
    whoFor: "Families holding an intimate ceremony at home, at a mosque hall or in a private room, often on the same day as a larger function.",
    how: "We plan the seating so the words are audible from the last row, keep florals restrained, specify a clean sound plan, and where needed turn the same room around for the reception that follows.",
    when: "Four to six weeks is usually enough for a nikah alone.",
    leadTime: "4–6 weeks",
    bestFor: "Intimate seated ceremonies",
  },
  "corporate-events": {
    definition:
      "Corporate event management covers conferences, launches, award evenings and annual dinners — stage and AV, branded environments, delegate flow and catering timed around the programme rather than the other way round.",
    whoFor: "Companies and institutions whose event is judged on whether the microphone worked, the deck was legible and dinner did not overrun the keynote.",
    how: "We produce against a technical schedule: stage and AV build, rehearsals, delegate registration and flow, then catering released to the run of the programme.",
    when: "Six to twelve weeks for most corporate programmes; formal procurement timelines usually decide the rest.",
    leadTime: "6–12 weeks",
    bestFor: "Conferences, launches, annual dinners",
  },
  "birthday-events": {
    definition:
      "Birthday event planning is bespoke design for a single person's celebration — theme, entrance, dessert programme and catering — with no standard template applied.",
    whoFor: "Families marking a first birthday on a lawn, a milestone at home, or a large celebration that carries the scale of a wedding.",
    how: "We develop the theme from the person rather than a catalogue, design one strong entrance or photo moment, and plan child-safe layouts where children are present.",
    when: "Three to six weeks for most birthdays; longer for fabricated themed sets.",
    leadTime: "3–6 weeks",
    bestFor: "Personal milestone celebrations",
  },
  "luxury-catering": {
    definition:
      "Luxury catering at Anayat Events is food produced by our own in-house kitchen brigade — sourcing, tastings, brigade size and service all controlled by us rather than subcontracted.",
    whoFor: "Hosts for whom the food is the part of the evening that will be remembered and discussed.",
    how: "Menus are developed with you and confirmed at a tasting, ingredients are sourced against set standards, and the service brigade is sized to the guest count so the last table is served with the first.",
    when: "Menu direction is agreed early; the final headcount and tasting are usually confirmed four to six weeks out.",
    leadTime: "Tasting 4–6 weeks out",
    bestFor: "Food-led weddings and receptions",
  },
  "live-bbq-catering": {
    definition:
      "Live BBQ catering is grill service cooked in front of guests at counters designed for continuous batching, with smoke managed so the room stays comfortable.",
    whoFor: "Evenings where the grill is meant to be a social centre rather than a single station at the end of a buffet.",
    how: "We design the counter, batch continuously so no queue forms, manage extraction and placement to keep smoke out of the seating, and run a separate vegetarian grill.",
    when: "Confirmed with the wider menu, typically four to six weeks before the event.",
    leadTime: "With menu confirmation",
    bestFor: "Mehndis and open-air functions",
  },
  "outdoor-catering": {
    definition:
      "Outdoor catering is a full field kitchen built on site — power, refrigeration, wash-up and waste all trucked in — so that food produced in the open holds the same standard as food produced in a building.",
    whoFor: "Lawns, farmhouses and remote venues with no permanent kitchen.",
    how: "We survey the ground, build the kitchen, maintain an unbroken cold chain in Lahore heat, hold food at temperature across long service distances, and clear the site completely afterwards.",
    when: "As soon as the venue is fixed, because the build depends on the site rather than the menu.",
    leadTime: "Site survey first",
    bestFor: "Lawns and farmhouse venues",
  },
  "indoor-catering": {
    definition:
      "Indoor catering is catering planned around a fixed room — its kitchen distance, doors and service routes — so that far tables are not served twenty minutes after near ones.",
    whoFor: "Hosts using a banquet hall, hotel ballroom or marquee where the layout cannot be changed.",
    how: "We survey the room, design the buffet or plated service around the real service routes, synchronise release across sections, and liaise directly with the venue's own operations team.",
    when: "Once the venue is booked; the room survey drives everything after that.",
    leadTime: "After venue booking",
    bestFor: "Halls, ballrooms and marquees",
  },
  "farmhouse-events": {
    definition:
      "Farmhouse event management is the production of a celebration on an estate that has land but little infrastructure — power, kitchen, parking, arrival and landscape lighting all built for the night.",
    whoFor: "Families choosing open land on the outskirts of Lahore over a hall.",
    how: "We work from a farmhouse ourselves — The Palms 7 in Green Acres — so estate selection, infrastructure build, parking and arrival sequencing are planned from direct experience of these venues.",
    when: "Four to nine months depending on the scale of the build.",
    leadTime: "4–9 months",
    bestFor: "Estate and open-land weddings",
  },
  "stage-decoration": {
    definition:
      "Stage decoration is the design and fabrication of the couple's stage — the single object that carries most of the night's photographs — drawn as an elevation before it is built.",
    whoFor: "Anyone whose wedding photographs will be taken almost entirely in front of one wall.",
    how: "We draw the elevation to the room's proportions, fabricate in our workshop, light it for photography rather than for the eye alone, and coordinate the build with your photographer's timings.",
    when: "Four to eight weeks for a fabricated stage; longer for complex sets.",
    leadTime: "4–8 weeks",
    bestFor: "Photograph-led wedding stages",
  },
  "floral-design": {
    definition:
      "Floral design is fresh-flower specification and installation — cut the same morning, conditioned in cold storage and installed hours before guests arrive, because flowers have a shelf life measured in hours.",
    whoFor: "Events where flowers carry the design rather than decorate it.",
    how: "We issue a specified schedule by variety and stem count, condition everything in cold storage, install on the day, and produce personal florals alongside the installations.",
    when: "Varieties are confirmed three to four weeks out, when seasonal availability is known.",
    leadTime: "Varieties fixed 3–4 weeks out",
    bestFor: "Installation-led floral schemes",
  },
  "venue-management": {
    definition:
      "Venue management is on-site control of the event day — load-in order, power distribution, security, parking, guest flow, clear-down and the final walk-through with the venue owner.",
    whoFor: "Families who have designed or booked the event themselves and want a professional crew running the day.",
    how: "Our team is on site from early morning, sequences supplier arrivals against a load-in schedule, marshals parking and guest flow, then clears the venue and hands it back.",
    when: "Can be added at any stage, including weeks before an event already planned elsewhere.",
    leadTime: "Bookable close to the date",
    bestFor: "Day-of control and coordination",
  },
  "private-events": {
    definition:
      "Private event planning covers anniversaries, engagements, baby showers and small dinners — intimate occasions planned with the same design, kitchen and service standards as a large wedding.",
    whoFor: "Hosts with thirty to a hundred guests who want discretion and detail rather than scale.",
    how: "We design for a small room, cook a chef's menu rather than a buffet, and brief a crew that can work comfortably inside a private home.",
    when: "Two to six weeks for most private events.",
    leadTime: "2–6 weeks",
    bestFor: "Intimate, discreet occasions",
  },
};

/** Ordered question set for a service page. Built from the answers above. */
export function serviceAnswerItems(slug: string): AnswerItem[] {
  const service = getService(slug);
  const a = serviceAnswers[slug];
  if (!service || !a) return [];
  const name = service.name.toLowerCase();
  return [
    { q: `What is ${name} at Anayat Events?`, a: a.definition },
    { q: `Who is ${name} suited to?`, a: a.whoFor },
    { q: `How does ${name} work in practice?`, a: a.how },
    { q: `When should ${name} be booked?`, a: a.when },
  ];
}

/** Rows for the visible "at a glance" table on a service page. */
export function serviceFacts(slug: string): { label: string; value: string }[] {
  const service = getService(slug);
  const a = serviceAnswers[slug];
  if (!service || !a) return [];
  return [
    { label: "Service", value: service.name },
    { label: "Category", value: service.family },
    { label: "Best suited to", value: a.bestFor },
    { label: "Typical lead time", value: a.leadTime },
    { label: "Where we deliver", value: site.serviceArea },
    { label: "Included as standard", value: service.inclusions.map((i) => i.title).join(", ") },
    { label: "Led by", value: "One named lead planner, from first enquiry to clear-down" },
    { label: "Enquiry response", value: site.responseTime },
  ];
}

/* --------------------------------------------------------------------------
 * Location answers.
 *
 * Derived from each area's own data so no two pages repeat the same sentence,
 * and so a change to the underlying content updates the answer automatically.
 * ------------------------------------------------------------------------ */

export function locationAnswerItems(slug: string): AnswerItem[] {
  const area = getLocation(slug);
  if (!area) return [];

  const serviceNames = area.services
    .map((s) => getService(s)?.name.toLowerCase())
    .filter(Boolean) as string[];
  const venues = area.venueTypes.map((v) => v.type.toLowerCase());
  const nearbyNames = area.nearby
    .map((n) => getLocation(n)?.shortName)
    .filter(Boolean) as string[];

  const list = (values: string[]) =>
    values.length > 1
      ? `${values.slice(0, -1).join(", ")} and ${values[values.length - 1]}`
      : (values[0] ?? "");

  return [
    {
      q: `Does Anayat Events cover ${area.shortName}?`,
      a: `Yes. ${site.name} plans, designs and caters events in ${area.name} from a single base at ${site.address.street}, ${site.address.locality}. There is no separate office in ${area.shortName}; the same planners, production crew and kitchen brigade travel out to it.`,
    },
    {
      q: `Which services are available in ${area.shortName}?`,
      a: serviceNames.length
        ? `${list(serviceNames.map((n) => n.charAt(0).toUpperCase() + n.slice(1)))} — all delivered by the same in-house team, so design, florals and catering stay under one contract.`
        : `Full event planning, design, floral production and catering, all delivered in-house.`,
    },
    {
      q: `What kind of venues do you work with in ${area.shortName}?`,
      a: venues.length
        ? `Most commissions here take place at ${list(venues)}. Every one begins with a physical survey of power, kitchen distance and the load-in window before any design is drawn.`
        : `Every commission begins with a physical survey of the venue before any design is drawn.`,
    },
    {
      q: `Which areas near ${area.shortName} do you also serve?`,
      a: nearbyNames.length
        ? `${list(nearbyNames)}, alongside the rest of ${site.serviceArea}. Crews reach all of them from the same Green Acres production base.`
        : `${site.serviceArea}, all reached from the same Green Acres production base.`,
    },
  ];
}

/** Rows for the visible "at a glance" table on an area page. */
export function locationFacts(slug: string): { label: string; value: string }[] {
  const area = getLocation(slug);
  if (!area) return [];
  const serviceNames = area.services
    .map((s) => getService(s)?.name)
    .filter(Boolean)
    .slice(0, 4) as string[];
  return [
    { label: "Area served", value: area.name },
    { label: "Based at", value: `${site.address.street}, ${site.address.locality}` },
    { label: "Offices in this area", value: "None — one base, teams travel out" },
    { label: "Core services here", value: serviceNames.join(", ") },
    { label: "Common venue types", value: area.venueTypes.map((v) => v.type).join(", ") },
    { label: "Contact", value: `${site.phoneDisplay} · ${site.hours}` },
  ];
}

/** Every service, as a compact machine-readable index (used by /llms.txt). */
export function serviceIndex() {
  return services.map((s) => ({
    name: s.name,
    path: `/services/${s.slug}`,
    summary: serviceAnswers[s.slug]?.definition ?? s.metaDescription,
  }));
}

/** Every service area, as a compact machine-readable index (used by /llms.txt). */
export function locationIndex() {
  return locations.map((l) => ({
    name: l.name,
    path: `/areas/${l.slug}`,
    summary: l.metaDescription,
  }));
}
