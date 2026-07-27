/* ---------------------------------------------------------------------------
 * Portfolio content layer.
 *
 * Two tiers:
 *  - PortfolioCategory  → /portfolio/$slug   — a standalone luxury microsite
 *    for one body of work (hero, philosophy, timeline, FAQs, related links).
 *  - PortfolioProject   → /portfolio/project/$slug — an architectural case
 *    study of a single completed event.
 *
 * Every photo id here exists in src/content/images.ts. No stock imagery.
 * ------------------------------------------------------------------------- */

export type CategoryPersonality = "editorial" | "mirrored" | "column" | "stacked";

export interface PortfolioCategory {
  slug: string;
  name: string;
  /** One-word / short overline used as the section eyebrow. */
  kicker: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  /** Second cinematic frame used for hero cross-dissolves. */
  heroFrames: string[];
  lede: string;
  body: string[];
  photos: string[];
  personality: CategoryPersonality;
  philosophy: { title: string; body: string }[];
  behind: { title: string; body: string }[];
  timeline: { step: string; title: string; body: string }[];
  faqs: { q: string; a: string }[];
  relatedServices: string[];
  relatedLocations: string[];
  /** Project slugs featured on this category page. */
  projects: string[];
}

export interface PortfolioProject {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  eventType: string;
  venue: string;
  area: string;
  season: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  heroFrames: string[];
  lede: string;
  story: { heading: string; body: string }[];
  concept: {
    theme: string;
    palette: { name: string; hex: string }[];
    materials: string[];
    floral: string;
    lighting: string;
    philosophy: string;
  };
  highlights: { label: string; value: string; note: string }[];
  gallery: string[];
  behind: { title: string; body: string }[];
  testimonial: { quote: string; name: string; event: string };
  relatedServices: string[];
  relatedLocations: string[];
}

export const portfolioCategories: PortfolioCategory[] = [
  {
    slug: "wedding-stages",
    name: "Wedding Stages",
    kicker: "Stagecraft",
    metaTitle: "Wedding Stage Portfolio — Lahore | Anayat Events",
    metaDescription:
      "A portfolio of wedding stages built by Anayat Events in Lahore — floral walls, crystal installations, fabricated arches and photographic lighting.",
    hero: "ae-13",
    heroFrames: ["ae-13", "ae-05", "ae-22"],
    lede: "The wall that appears in every photograph taken all night.",
    body: [
      "Each of these stages was drawn to its room's elevation, fabricated in our own workshop and lit before it ever reached the venue. None of them is a stock set, and none of them has been built twice.",
      "A stage is architecture with a four-hour lifespan. It must hold a family of twenty, read cleanly from ninety feet, and survive a photographer's lens at two feet.",
    ],
    photos: ["ae-13", "ae-05", "ae-01", "ae-08", "ae-22", "ae-07", "ae-02", "ae-20"],
    personality: "editorial",
    philosophy: [
      {
        title: "Drawn to the room",
        body: "We measure the hall before we sketch. Ceiling height, sightlines from the last table and the throw distance of every light decide the elevation — not a catalogue.",
      },
      {
        title: "Built, then lit, then moved",
        body: "Every set is assembled and lit in the workshop first. Clients approve the real object under real light, never a rendering.",
      },
      {
        title: "One night, one set",
        body: "Structures are struck and rebuilt. Nothing rotates between two families in the same season.",
      },
    ],
    behind: [
      {
        title: "Fabrication",
        body: "Timber and steel framing cut to drawing, skinned, and finished in the workshop over four to nine days depending on span.",
      },
      {
        title: "Lighting design",
        body: "Key, fill and rim mapped per stage so photographers get clean skin tones without a single on-camera flash.",
      },
      {
        title: "Load-in",
        body: "Sections arrive flat-packed at dawn. A twelve-metre stage is standing, dressed and lit before the caterers reach the kitchen.",
      },
    ],
    timeline: [
      { step: "01", title: "Elevation drawing", body: "Scaled to the venue, with camera lines marked." },
      { step: "02", title: "Material sampling", body: "Fabric, foil and bloom samples viewed under event-temperature light." },
      { step: "03", title: "Workshop build", body: "Full dry assembly, lit and photographed for approval." },
      { step: "04", title: "Install & focus", body: "On-site build, floral dressing, then a two-hour lighting focus." },
    ],
    faqs: [
      {
        q: "How far in advance should a stage be commissioned?",
        a: "Six to eight weeks for a full fabricated build. Floral-led stages can be delivered in three if the structure is from an existing drawing.",
      },
      {
        q: "Can we see the stage before the event?",
        a: "Yes. Every fabricated stage is dry-assembled and lit at our workshop, and you are invited to walk it before it ships.",
      },
      {
        q: "Do you re-use stage sets between clients?",
        a: "Structural framing is re-used. Everything visible — skins, florals, drapery, crystal — is built new for each event.",
      },
    ],
    relatedServices: ["stage-decoration", "luxury-weddings", "walima-planning"],
    relatedLocations: ["dha-lahore", "bahria-town-lahore", "bedian-road"],
    projects: ["the-long-white", "crystal-rain-walima"],
  },
  {
    slug: "floral-installations",
    name: "Floral Installations",
    kicker: "Bloom",
    metaTitle: "Floral Installation Portfolio — Lahore | Anayat Events",
    metaDescription:
      "Fresh floral installation work by Anayat Events in Lahore — hanging gardens, arch work, aisle design and table florals cut and conditioned for each function.",
    hero: "ae-14",
    heroFrames: ["ae-14", "ae-15", "ae-24"],
    lede: "Cut that morning, conditioned in cold storage, installed hours before the first guest.",
    body: [
      "Every stem here is fresh. Nothing was rotated between functions, and nothing at eye level is artificial.",
      "Flowers are the shortest-lived material we work with and the one guests touch. That asymmetry decides our whole schedule.",
    ],
    photos: ["ae-14", "ae-01", "ae-15", "ae-12", "ae-24", "ae-03", "ae-20"],
    personality: "column",
    philosophy: [
      {
        title: "Season over specification",
        body: "We buy what the Lahore markets are cutting well that week and design to it, rather than importing a bloom that will fail by ten o'clock.",
      },
      {
        title: "Volume at height, detail at hand",
        body: "Mass and silhouette above the shoulder line; fine, scented work where guests actually stand.",
      },
      {
        title: "Cold chain, always",
        body: "Conditioning in cold storage from market to venue is the difference between a nine o'clock photograph and a midnight one.",
      },
    ],
    behind: [
      { title: "Market at 4am", body: "Two buyers, three markets, everything cut the same morning." },
      { title: "Conditioning", body: "Stems hydrated and held cold for six to ten hours before they touch a frame." },
      { title: "Install", body: "Hanging structures rigged first, florals dressed last, finishing under an hour before doors." },
    ],
    timeline: [
      { step: "01", title: "Palette study", body: "Three bloom palettes proposed against your fabric and light." },
      { step: "02", title: "Sourcing plan", body: "Availability confirmed against your date, with substitutions pre-agreed." },
      { step: "03", title: "Conditioning", body: "Cut, hydrate, hold cold." },
      { step: "04", title: "Dressing", body: "Rigged, dressed and misted in the final hour." },
    ],
    faqs: [
      {
        q: "Are the florals real?",
        a: "Everything within reach and eye level is fresh. Occasionally, structural greenery high above the ceiling line is preserved foliage, and we tell you where.",
      },
      {
        q: "Will the flowers hold through a late function?",
        a: "Yes — cold-chain conditioning and a final misting are scheduled so peak appearance falls between 9pm and 1am.",
      },
      {
        q: "Can you match a specific colour story?",
        a: "We match to fabric swatches under event-temperature lighting, because a blush that reads correctly at noon can go grey under warm wash.",
      },
    ],
    relatedServices: ["floral-design", "stage-decoration", "nikah-planning"],
    relatedLocations: ["gulberg", "model-town", "green-acres"],
    projects: ["bloom-curtain-nikah"],
  },
  {
    slug: "mehndi-celebrations",
    name: "Mehndi Celebrations",
    kicker: "Colour",
    metaTitle: "Mehndi Decor Portfolio — Lahore | Anayat Events",
    metaDescription:
      "Mehndi decor and celebration photography from Anayat Events Lahore — jharoka sets, marigold installations, floor seating and dance-floor production.",
    hero: "ae-16",
    heroFrames: ["ae-16", "ae-17", "ae-21"],
    lede: "Colour at full volume, and a floor built to survive four hundred people.",
    body: [
      "Mehndi work is the least restrained thing we do and the most technically demanding to keep coherent.",
      "The set has to photograph like a painting and behave like a nightclub. Both, for six hours.",
    ],
    photos: ["ae-16", "ae-17", "ae-08", "ae-21", "ae-09", "ae-06"],
    personality: "stacked",
    philosophy: [
      { title: "One loud idea", body: "A mehndi fails when three colour stories argue. We commit to one and push it to the edge." },
      { title: "Floors before flowers", body: "Sprung dance flooring, cable routing and sightlines are solved before a single marigold is strung." },
      { title: "Seating that invites", body: "Floor cushions, low tables and jharoka nooks so families group naturally instead of lining the walls." },
    ],
    behind: [
      { title: "Marigold strings", body: "Strung by hand on site — up to four kilometres of it on a large set." },
      { title: "Sound & light", body: "Dance-floor rig tuned in the afternoon, then re-tuned once the room is full." },
      { title: "Crowd flow", body: "Entry, dhol, stage and dinner routes drawn so four hundred people never meet in one doorway." },
    ],
    timeline: [
      { step: "01", title: "Concept", body: "A single colour idea agreed in one sitting." },
      { step: "02", title: "Floor plan", body: "Dance floor, seating and service routes drawn to guest count." },
      { step: "03", title: "Build day", body: "Structures, jharokas and flooring in by noon." },
      { step: "04", title: "Show call", body: "Sound and lighting cues rehearsed with your entry party." },
    ],
    faqs: [
      { q: "Do you provide dhol and entry production?", a: "Yes — dhol, entry choreography lighting and sound cues are coordinated as one show call." },
      { q: "How large a dance floor do we need?", a: "We plan roughly one square foot per guest at peak, with a hard floor edge so seating never creeps in." },
      { q: "Can mehndi and barat share a venue day?", a: "Only with a full overnight strike crew. We will tell you honestly if the turnaround is not safe." },
    ],
    relatedServices: ["mehndi-planning", "stage-decoration", "private-events"],
    relatedLocations: ["johar-town", "wapda-town", "raiwind-road"],
    projects: ["jharoka-nights"],
  },
  {
    slug: "outdoor-farmhouse",
    name: "Outdoor & Farmhouse",
    kicker: "Ground",
    metaTitle: "Farmhouse & Outdoor Event Portfolio — Lahore | Anayat Events",
    metaDescription:
      "Farmhouse and outdoor event portfolio from Anayat Events Lahore — lawn builds, canopy lighting, garden weddings and full temporary infrastructure.",
    hero: "ae-25",
    heroFrames: ["ae-25", "ae-10", "ae-26"],
    lede: "Land, trees and everything else arriving on a truck.",
    body: [
      "Farmhouse work is production before it is decoration. What you see here sits on power, kitchens and drainage we built ourselves.",
      "An empty field is the most expensive venue in Lahore and the most beautiful one. Both facts are true on the same night.",
    ],
    photos: ["ae-25", "ae-10", "ae-11", "ae-26", "ae-24", "ae-19", "ae-18"],
    personality: "mirrored",
    philosophy: [
      { title: "Infrastructure first", body: "Power, water, kitchen and drainage are drawn before a single decorative element is discussed." },
      { title: "Work with the trees", body: "Mature planting is the best set piece on any farmhouse. We light it rather than hide it." },
      { title: "Weather as a plan, not a prayer", body: "Every outdoor build carries a documented wet-weather position agreed with you in writing." },
    ],
    behind: [
      { title: "Site survey", body: "Ground levels, tree canopy, access width and existing power measured and photographed." },
      { title: "Temporary build", body: "Generators, distribution, field kitchen, lighting towers and flooring installed over two to four days." },
      { title: "Strike", body: "Full reinstatement — the ground is left as we found it." },
    ],
    timeline: [
      { step: "01", title: "Survey", body: "Access, levels and power measured on site." },
      { step: "02", title: "Infrastructure plan", body: "Load calculations, kitchen siting and drainage." },
      { step: "03", title: "Build week", body: "Structures, flooring and lighting towers." },
      { step: "04", title: "Dressing & show", body: "Decor, florals and the evening itself." },
    ],
    faqs: [
      { q: "Do you supply power for a farmhouse event?", a: "Yes — silenced generators with N+1 redundancy on kitchen and lighting circuits, sized from a measured load calculation." },
      { q: "What happens if it rains?", a: "Every outdoor plan carries a covered position and a call time. The decision is made jointly, never at the last minute." },
      { q: "Can you build on ground with no kitchen?", a: "Routinely. Our field kitchen brigade cooks for four-figure guest counts on bare land." },
    ],
    relatedServices: ["farmhouse-events", "outdoor-catering", "venue-management"],
    relatedLocations: ["bedian-road", "raiwind-road", "green-acres"],
    projects: ["chandeliers-in-the-trees"],
  },
  {
    slug: "dining-catering",
    name: "Dining & Catering",
    kicker: "Table",
    metaTitle: "Catering & Dining Portfolio — Lahore | Anayat Events",
    metaDescription:
      "Catering and dining portfolio from Anayat Events Lahore — table architecture, live counters, plated service and buffet design for large guest counts.",
    hero: "ae-04",
    heroFrames: ["ae-04", "ae-23", "ae-18"],
    lede: "Table architecture, live fire and service that reaches every seat together.",
    body: [
      "The kitchen is in-house. Every table setting, counter and service line here was run by our own brigade.",
      "Food is the only part of an evening every guest experiences at the same moment. We schedule the entire night backwards from it.",
    ],
    photos: ["ae-04", "ae-23", "ae-18", "ae-02", "ae-09", "ae-07"],
    personality: "editorial",
    philosophy: [
      { title: "Hot food, all at once", body: "Service lines are drawn so the last table is served within eleven minutes of the first." },
      { title: "Cook in front of people", body: "Live counters are not theatre for its own sake — they hold quality that a holding cabinet destroys." },
      { title: "The table is a set", body: "Linen, glass, height and light are designed with the same care as the stage behind it." },
    ],
    behind: [
      { title: "Menu tasting", body: "A full sit-down tasting of your final menu, plated as it will be served." },
      { title: "Brigade planning", body: "Chef counts, holding equipment and service staff sized to guest numbers and venue distance." },
      { title: "Service rehearsal", body: "Runners walk their routes before doors open." },
    ],
    timeline: [
      { step: "01", title: "Menu drafting", body: "Built around your families, not a fixed package." },
      { step: "02", title: "Tasting", body: "Plated, tasted and revised." },
      { step: "03", title: "Kitchen plan", body: "Siting, power, holding and service routes." },
      { step: "04", title: "Service", body: "Counters live, lines timed, floor supervised." },
    ],
    faqs: [
      { q: "Is the catering in-house?", a: "Entirely. Our own kitchen, chefs and service brigade — no subcontracted caterer." },
      { q: "Can we hold a tasting?", a: "Yes, a full plated tasting of your shortlisted menu before the final selection is locked." },
      { q: "How many guests can you serve?", a: "From forty-seat private dinners to four-figure wedding counts on open ground." },
    ],
    relatedServices: ["luxury-catering", "live-bbq-catering", "indoor-catering"],
    relatedLocations: ["dha-lahore", "cantt-askari", "lahore"],
    projects: ["garden-banquet"],
  },
  {
    slug: "lounges-seating",
    name: "Lounges & Seating",
    kicker: "Repose",
    metaTitle: "Event Lounge & Seating Portfolio — Lahore | Anayat Events",
    metaDescription:
      "Lounge and seating design portfolio from Anayat Events Lahore — guest lounges, floor seating, family sections and intimate conversation settings.",
    hero: "ae-19",
    heroFrames: ["ae-19", "ae-23", "ae-06"],
    lede: "Where guests actually spend the evening once the photographs are done.",
    body: [
      "Lounge design is the most underrated part of an event. It decides whether people stay until midnight or leave after dinner.",
      "We design in conversation groups of four to six, never in rows.",
    ],
    photos: ["ae-19", "ae-06", "ae-12", "ae-03", "ae-21", "ae-15", "ae-17"],
    personality: "column",
    philosophy: [
      { title: "Groups of four", body: "People talk in fours. Furniture placed in fours keeps a room warm even when it is half full." },
      { title: "Light low", body: "Lounges are lit from below shoulder height so faces stay soft and the stage keeps its drama." },
      { title: "Somewhere for elders", body: "Every plan carries proper seated comfort near the service route, close to the stage, out of the speakers." },
    ],
    behind: [
      { title: "Furniture selection", body: "Cane, upholstery and marble pulled from our own inventory, cleaned and finished before load-in." },
      { title: "Zoning", body: "Lounge, dance, dining and family zones drawn so none of them fights another." },
      { title: "Detail dressing", body: "Cushions, throws, table florals and candle heights set last." },
    ],
    timeline: [
      { step: "01", title: "Zoning plan", body: "Where people will stand, sit and gather." },
      { step: "02", title: "Furniture edit", body: "A selected palette of pieces, not a catalogue dump." },
      { step: "03", title: "Layout", body: "Set on site and walked before dressing." },
      { step: "04", title: "Dressing", body: "Textiles, florals and candlelight." },
    ],
    faqs: [
      { q: "Is furniture owned or rented?", a: "The core inventory is ours. Specialist pieces are sourced and quoted transparently." },
      { q: "How much lounge space do we need?", a: "Roughly a quarter of the guest count seated in lounge at any moment is a comfortable planning figure." },
      { q: "Can you do floor seating?", a: "Yes — low tables, bolsters and rugs, with elder seating held nearby." },
    ],
    relatedServices: ["private-events", "venue-management", "birthday-events"],
    relatedLocations: ["dha-lahore", "gulberg", "model-town"],
    projects: ["ivory-salon"],
  },
  {
    slug: "nikah-ceremonies",
    name: "Nikah Ceremonies",
    kicker: "Vow",
    metaTitle: "Nikah Ceremony Decor Portfolio — Lahore | Anayat Events",
    metaDescription:
      "Nikah ceremony portfolio from Anayat Events Lahore — pavilions, daylight florals, intimate seating and quiet ceremony design for family gatherings.",
    hero: "ae-03",
    heroFrames: ["ae-03", "ae-20", "ae-11"],
    lede: "The quietest hour of the week, given the most careful room.",
    body: [
      "A nikah asks for restraint. Fewer elements, better ones, and enough silence around them to hear the words.",
      "Most of this work happens in daylight, which is unforgiving. Everything must be finished on all sides.",
    ],
    photos: ["ae-03", "ae-20", "ae-11", "ae-15", "ae-12", "ae-14"],
    personality: "mirrored",
    philosophy: [
      { title: "Restraint", body: "One structure, one bloom palette, one light temperature. Nothing competes with the ceremony." },
      { title: "Daylight discipline", body: "Daylight shows every seam, so nikah sets are finished front, back and underside." },
      { title: "Room for family", body: "Seating is planned for elders first and photographers second." },
    ],
    behind: [
      { title: "Pavilion build", body: "Lattice and frame work assembled and finished ahead of the morning." },
      { title: "Sound", body: "Discreet reinforcement so the nikah is audible without a visible PA." },
      { title: "Turnaround", body: "Where nikah precedes a reception, a strike-and-reset crew is scheduled from the start." },
    ],
    timeline: [
      { step: "01", title: "Brief", body: "Guest count, elders, timing and the tone the family wants." },
      { step: "02", title: "Set design", body: "A single pavilion or seating study, drawn to the space." },
      { step: "03", title: "Install", body: "Built in the cool hours before the ceremony." },
      { step: "04", title: "Ceremony", body: "Quiet floor management, no crew in sightlines." },
    ],
    faqs: [
      { q: "Do you handle small nikah gatherings?", a: "Yes — from thirty guests in a family home upward." },
      { q: "Can nikah and walima run on the same day?", a: "With a planned strike-and-reset window, yes. We will map the exact turnaround for you." },
      { q: "Is separate seating arranged?", a: "Where a family asks for it, seating and service routes are planned accordingly from the first drawing." },
    ],
    relatedServices: ["nikah-planning", "floral-design", "private-events"],
    relatedLocations: ["cantt-askari", "model-town", "dha-lahore"],
    projects: ["bloom-curtain-nikah"],
  },
  {
    slug: "corporate-private",
    name: "Corporate & Private",
    kicker: "Order",
    metaTitle: "Corporate & Private Event Portfolio — Lahore | Anayat Events",
    metaDescription:
      "Corporate and private event portfolio from Anayat Events Lahore — brand dinners, launches, milestone birthdays and intimate gatherings run to a schedule.",
    hero: "ae-23",
    heroFrames: ["ae-23", "ae-04", "ae-09"],
    lede: "Precision as a design language, not a compromise.",
    body: [
      "Corporate work is judged on the schedule as much as the room. Both are designed here.",
      "Private milestones sit in the same family: smaller counts, higher scrutiny, no margin for a visible seam.",
    ],
    photos: ["ae-23", "ae-04", "ae-09", "ae-26", "ae-06", "ae-18"],
    personality: "stacked",
    philosophy: [
      { title: "Run to the minute", body: "A published run sheet, a single floor manager and cues rehearsed before doors." },
      { title: "Brand without banners", body: "Identity carried through material, colour and light rather than printed signage." },
      { title: "Discretion", body: "Crew briefed on privacy. No photography of guests without written permission." },
    ],
    behind: [
      { title: "Technical rehearsal", body: "AV, presentation and lighting cues run in full before guests arrive." },
      { title: "Registration flow", body: "Arrival, coats, seating and dinner service mapped to avoid queues." },
      { title: "Post-event report", body: "Costs, timings and photographs delivered within a week." },
    ],
    timeline: [
      { step: "01", title: "Objectives", body: "What the evening has to achieve, stated plainly." },
      { step: "02", title: "Run sheet", body: "Minute-by-minute schedule circulated to all parties." },
      { step: "03", title: "Rehearsal", body: "Technical and service run-through." },
      { step: "04", title: "Delivery", body: "One floor manager, one point of contact." },
    ],
    faqs: [
      { q: "Do you handle AV and staging for launches?", a: "Yes — screens, sound, lighting and presentation cues are managed in house or with vetted partners." },
      { q: "Can you invoice a company formally?", a: "Yes, with itemised quotations and formal invoicing." },
      { q: "How private can an event be kept?", a: "Fully. Crew are briefed, and no imagery is published without written consent." },
    ],
    relatedServices: ["corporate-events", "birthday-events", "private-events"],
    relatedLocations: ["gulberg", "johar-town", "dha-lahore"],
    projects: ["ivory-salon", "garden-banquet"],
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "the-long-white",
    category: "wedding-stages",
    title: "The Long White",
    subtitle: "A twelve-metre stage built for a room of nine hundred",
    eventType: "Barat",
    venue: "Farmhouse marquee",
    area: "Bedian Road",
    season: "Winter",
    metaTitle: "The Long White — Barat Stage Case Study, Lahore | Anayat Events",
    metaDescription:
      "Case study of The Long White: a twelve-metre fabricated barat stage in Lahore with layered hanging greenery, ivory florals and photographic lighting for 900 guests.",
    hero: "ae-13",
    heroFrames: ["ae-13", "ae-24", "ae-22"],
    lede: "One wall, twelve metres wide, holding an entire family and reading cleanly from the last table.",
    story: [
      {
        heading: "The vision",
        body: "The family wanted no colour at all. White, ivory and the greens of real foliage — and a stage wide enough that twenty relatives could stand on it without the composition falling apart.",
      },
      {
        heading: "The problem",
        body: "A twelve-metre span in a marquee has no wall to hang from. The whole elevation had to be self-supporting, transportable flat, and stiff enough to carry three hundred kilos of fresh greenery.",
      },
      {
        heading: "The resolution",
        body: "A steel-braced timber frame in five bays, skinned and finished in the workshop, dressed on site in under five hours. The last bay was raised at eleven in the morning; guests arrived at eight.",
      },
    ],
    concept: {
      theme: "Monochrome garden — white on white, with foliage doing all the drawing.",
      palette: [
        { name: "Ivory", hex: "#F2EBDE" },
        { name: "Bone", hex: "#DCD3C4" },
        { name: "Fern", hex: "#5C6B52" },
        { name: "Champagne", hex: "#C9A84C" },
      ],
      materials: ["Braced timber frame", "Matte-finished skins", "Silk-cotton drape", "Cut crystal drops"],
      floral: "Ivory roses, lisianthus, tuberose and four varieties of trailing foliage, all cut the same morning.",
      lighting: "Warm 2700K key from front-of-house, cool rim from behind the greenery, no on-camera flash required.",
      philosophy: "Restraint at the level of colour, extravagance at the level of scale.",
    },
    highlights: [
      { label: "Guests", value: "900", note: "Seated dinner service" },
      { label: "Stage span", value: "12 m", note: "Five self-supporting bays" },
      { label: "Build", value: "9 days", note: "Workshop fabrication" },
      { label: "Florals", value: "300 kg", note: "Fresh, cut same morning" },
    ],
    gallery: ["ae-13", "ae-24", "ae-22", "ae-01", "ae-05", "ae-07"],
    behind: [
      { title: "Workshop", body: "Nine days of framing, skinning and finishing, then a full dry assembly under event lighting." },
      { title: "Load-in", body: "Five bays trucked flat at 5am, standing by 11am." },
      { title: "Dressing", body: "Fourteen florists working the wall from both ends inward." },
    ],
    testimonial: {
      quote:
        "The stage was built and lit in their workshop before we ever saw it at the venue. We knew exactly what we were getting, and it was better in the room than in the drawings.",
      name: "The Sheikh Family",
      event: "Luxury barat, Bedian Road",
    },
    relatedServices: ["stage-decoration", "luxury-weddings", "floral-design"],
    relatedLocations: ["bedian-road", "raiwind-road"],
  },
  {
    slug: "crystal-rain-walima",
    category: "wedding-stages",
    title: "Crystal Rain",
    subtitle: "A ceiling of falling light above a white settee stage",
    eventType: "Walima",
    venue: "Covered marquee",
    area: "DHA Lahore",
    season: "Autumn",
    metaTitle: "Crystal Rain — Walima Stage Case Study, DHA Lahore | Anayat Events",
    metaDescription:
      "Case study of Crystal Rain: a suspended crystal ceiling and white settee walima stage in DHA Lahore, with layered chandeliers and a fully rigged marquee build.",
    hero: "ae-02",
    heroFrames: ["ae-02", "ae-07", "ae-05"],
    lede: "Ten thousand crystal strands, hung so the ceiling reads as weather rather than decoration.",
    story: [
      { heading: "The vision", body: "A walima that felt cool and bright rather than warm and gold — the couple wanted silver light and glass, not candlelight." },
      { heading: "The problem", body: "Marquee roofs carry very little load. A crystal ceiling of that density needed its own truss grid, invisible from the floor." },
      { heading: "The resolution", body: "An independent rig above the liner, load-tested at twice its final weight, dressed strand by strand across two nights." },
    ],
    concept: {
      theme: "Rain of glass — silver light, white upholstery, no warm accents at all.",
      palette: [
        { name: "Glacier", hex: "#E9EEF1" },
        { name: "Silver", hex: "#BFC6CB" },
        { name: "Graphite", hex: "#2B2E31" },
        { name: "Champagne", hex: "#C9A84C" },
      ],
      materials: ["Cut crystal strands", "Independent truss grid", "White bouclé upholstery", "Mirror-topped consoles"],
      floral: "Deliberately minimal — white phalaenopsis at the console line only, so glass keeps the eye.",
      lighting: "4000K key with narrow spots into the crystal, warm 2700K only on skin.",
      philosophy: "Let one material be spectacular and keep everything else silent.",
    },
    highlights: [
      { label: "Guests", value: "550", note: "Plated walima service" },
      { label: "Crystal", value: "10,000+", note: "Individually hung strands" },
      { label: "Rig", value: "2 nights", note: "Independent load-tested grid" },
      { label: "Chandeliers", value: "18", note: "Layered at three heights" },
    ],
    gallery: ["ae-02", "ae-07", "ae-05", "ae-23", "ae-22", "ae-09"],
    behind: [
      { title: "Load test", body: "Grid loaded to twice final weight and held overnight before a single crystal was hung." },
      { title: "Strand work", body: "Two crews, two nights, working outward from the centre line." },
      { title: "Focus", body: "Every spot re-aimed after the room was dressed, because crystal moves the light." },
    ],
    testimonial: {
      quote:
        "Our walima looked like something out of a film and still ran on time to the minute. Dinner for five hundred and fifty went out without a single cold plate.",
      name: "Ahmed & Mariam",
      event: "Walima, DHA Lahore",
    },
    relatedServices: ["walima-planning", "stage-decoration", "indoor-catering"],
    relatedLocations: ["dha-lahore", "cantt-askari"],
  },
  {
    slug: "bloom-curtain-nikah",
    category: "nikah-ceremonies",
    title: "Bloom Curtain",
    subtitle: "A daylight nikah under a hanging garden",
    eventType: "Nikah",
    venue: "Private lawn",
    area: "Model Town",
    season: "Spring",
    metaTitle: "Bloom Curtain — Daylight Nikah Case Study, Lahore | Anayat Events",
    metaDescription:
      "Case study of Bloom Curtain: an intimate daylight nikah in Lahore with a hanging fresh-floral curtain, ivory seating and discreet sound for eighty guests.",
    hero: "ae-15",
    heroFrames: ["ae-15", "ae-03", "ae-20"],
    lede: "Eighty guests, one hanging curtain of fresh blooms, and nothing else in the frame.",
    story: [
      { heading: "The vision", body: "The couple asked for a ceremony that felt like a garden had simply been tidied — no visible structure, no stage." },
      { heading: "The problem", body: "Daylight and a low guest count leave nowhere to hide hardware, cabling or crew." },
      { heading: "The resolution", body: "A concealed frame set into existing planting, a floral curtain dressed from above, and sound run underground to two hidden points." },
    ],
    concept: {
      theme: "Hanging garden — soft, close, and entirely fresh.",
      palette: [
        { name: "Ivory", hex: "#F3ECE0" },
        { name: "Blush", hex: "#E4C9C2" },
        { name: "Sage", hex: "#9BA98C" },
        { name: "Stone", hex: "#B9AFA1" },
      ],
      materials: ["Concealed steel frame", "Linen seating", "Carved wood chairs", "Raw stone plinths"],
      floral: "Trailing white blooms, garden roses, eucalyptus and jasmine — three hundred stems for eighty guests.",
      lighting: "Daylight only, with light diffusion overhead to hold skin tones between noon and three.",
      philosophy: "The smallest event we design is the one where every seam shows.",
    },
    highlights: [
      { label: "Guests", value: "80", note: "Seated family ceremony" },
      { label: "Stems", value: "300", note: "All cut that morning" },
      { label: "Install", value: "6 hrs", note: "Dawn to late morning" },
      { label: "Visible cabling", value: "None", note: "Fully concealed sound" },
    ],
    gallery: ["ae-15", "ae-03", "ae-20", "ae-14", "ae-12", "ae-11"],
    behind: [
      { title: "Dawn cut", body: "Buyers at market by four, stems conditioned cold until nine." },
      { title: "Concealment", body: "Frames sunk into planting and painted to the foliage before dressing." },
      { title: "Sound", body: "Two hidden points, tested with the imam's own voice at level." },
    ],
    testimonial: {
      quote:
        "It looked like the garden had always been that way. Not one cable, not one crew member in a photograph — and our elders were comfortable the entire afternoon.",
      name: "Fatima & Bilal",
      event: "Nikah, Model Town",
    },
    relatedServices: ["nikah-planning", "floral-design", "private-events"],
    relatedLocations: ["model-town", "gulberg"],
  },
  {
    slug: "jharoka-nights",
    category: "mehndi-celebrations",
    title: "Jharoka Nights",
    subtitle: "Marigold, mirror-work and a floor built for four hundred",
    eventType: "Mehndi",
    venue: "Banquet lawn",
    area: "Johar Town",
    season: "Summer",
    metaTitle: "Jharoka Nights — Mehndi Case Study, Lahore | Anayat Events",
    metaDescription:
      "Case study of Jharoka Nights: a marigold and mirror-work mehndi in Lahore with carved jharoka sets, floor seating and a sprung dance floor for 400 guests.",
    hero: "ae-16",
    heroFrames: ["ae-16", "ae-17", "ae-21"],
    lede: "One colour idea, pushed all the way, over a floor engineered for a six-hour dance.",
    story: [
      { heading: "The vision", body: "The bride's brief was a single sentence: it should look like a bazaar at dusk and sound like a wedding at midnight." },
      { heading: "The problem", body: "Four hundred people dancing on a lawn destroys turf, cabling and sightlines within an hour." },
      { heading: "The resolution", body: "A sprung raised floor across the full dance zone, cable trays beneath it, and jharoka sets placed to break the crowd into four natural gathering points." },
    ],
    concept: {
      theme: "Bazaar at dusk — marigold, mirror and lacquered colour.",
      palette: [
        { name: "Marigold", hex: "#E4A028" },
        { name: "Fuchsia", hex: "#B4306B" },
        { name: "Peacock", hex: "#1E6E72" },
        { name: "Lacquer", hex: "#7A1F2B" },
      ],
      materials: ["Carved jharoka frames", "Mirror-work panels", "Block-printed cotton", "Bolsters and floor rugs"],
      floral: "Four kilometres of hand-strung marigold, plus rose and jasmine garlanding at the jharokas.",
      lighting: "Warm amber wash, festoon at canopy height, and a tuned dance rig held below the decor line.",
      philosophy: "Commit to one loud idea, then engineer the boring things perfectly so it survives the night.",
    },
    highlights: [
      { label: "Guests", value: "400", note: "Standing and floor seating" },
      { label: "Marigold", value: "4 km", note: "Strung by hand on site" },
      { label: "Dance floor", value: "Sprung", note: "Cable trays beneath" },
      { label: "Jharokas", value: "4", note: "Carved and lit sets" },
    ],
    gallery: ["ae-16", "ae-17", "ae-21", "ae-08", "ae-09", "ae-06"],
    behind: [
      { title: "Stringing", body: "Nine hands on marigold from six in the morning." },
      { title: "Flooring", body: "Sprung deck laid and levelled across uneven lawn." },
      { title: "Show call", body: "Dhol entry, lighting and sound cues rehearsed with the families at five." },
    ],
    testimonial: {
      quote:
        "Every single photo from that night looks like a painting, and nobody twisted an ankle on the dance floor. Both of those were their doing.",
      name: "The Malik Family",
      event: "Mehndi, Johar Town",
    },
    relatedServices: ["mehndi-planning", "stage-decoration", "live-bbq-catering"],
    relatedLocations: ["johar-town", "wapda-town"],
  },
  {
    slug: "chandeliers-in-the-trees",
    category: "outdoor-farmhouse",
    title: "Chandeliers in the Trees",
    subtitle: "A garden ceremony built on bare farmhouse ground",
    eventType: "Garden wedding",
    venue: "Private farmhouse",
    area: "Raiwind Road",
    season: "Winter",
    metaTitle: "Chandeliers in the Trees — Farmhouse Wedding Case Study, Lahore | Anayat Events",
    metaDescription:
      "Case study of a farmhouse garden wedding near Raiwind Road, Lahore — chandeliers rigged into mature trees, temporary power, a field kitchen and full site reinstatement.",
    hero: "ae-10",
    heroFrames: ["ae-10", "ae-25", "ae-26"],
    lede: "Twenty-two chandeliers rigged into living trees, over ground that had no power that morning.",
    story: [
      { heading: "The vision", body: "The family owned the land and wanted nothing built that would hide it. No marquee, no walls — only light." },
      { heading: "The problem", body: "Bare ground: no power, no kitchen, no drainage, and a canopy of mature trees nobody was willing to trim." },
      { heading: "The resolution", body: "Soft rigging into the canopy with tree-safe strops, silenced generators sited two hundred metres downwind, and a full field kitchen behind a hedge line." },
    ],
    concept: {
      theme: "Lit orchard — the landscape as the decor, everything else invisible.",
      palette: [
        { name: "Night", hex: "#12140F" },
        { name: "Moss", hex: "#4A5A44" },
        { name: "Bone", hex: "#E3DCCE" },
        { name: "Amber", hex: "#C98A32" },
      ],
      materials: ["Tree-safe soft rigging", "Crystal chandeliers", "Timber decking", "Linen and cane seating"],
      floral: "Restrained — aisle urns and table work only. The trees carried the composition.",
      lighting: "Chandeliers as practicals, uplighting into the canopy, and a warm low wash across seating.",
      philosophy: "The best farmhouse build is the one you cannot see the engineering of.",
    },
    highlights: [
      { label: "Guests", value: "650", note: "Ceremony and open-air dinner" },
      { label: "Chandeliers", value: "22", note: "Rigged into living canopy" },
      { label: "Power", value: "N+1", note: "Silenced generators, redundant" },
      { label: "Build", value: "4 days", note: "Bare ground to full venue" },
    ],
    gallery: ["ae-10", "ae-25", "ae-26", "ae-11", "ae-18", "ae-19"],
    behind: [
      { title: "Survey", body: "Canopy load points assessed by an arborist before any rigging was specified." },
      { title: "Field kitchen", body: "Full brigade cooking behind the hedge line for six hundred and fifty covers." },
      { title: "Reinstatement", body: "Site struck and the ground left exactly as found, within thirty-six hours." },
    ],
    testimonial: {
      quote:
        "There was nothing on that land at breakfast. By nightfall it was the most beautiful place any of us had eaten dinner, and by Sunday you could not tell we had been there.",
      name: "The Chaudhry Family",
      event: "Farmhouse wedding, Raiwind Road",
    },
    relatedServices: ["farmhouse-events", "outdoor-catering", "venue-management"],
    relatedLocations: ["raiwind-road", "bedian-road"],
  },
  {
    slug: "garden-banquet",
    category: "dining-catering",
    title: "Garden Banquet",
    subtitle: "Long tables, lantern posts and eleven minutes of service",
    eventType: "Open-air dinner",
    venue: "Lawn",
    area: "DHA Lahore",
    season: "Spring",
    metaTitle: "Garden Banquet — Open-Air Dining Case Study, Lahore | Anayat Events",
    metaDescription:
      "Case study of Garden Banquet: an open-air long-table dinner in Lahore with lantern-lit lawn dining, live counters and full plated service inside eleven minutes.",
    hero: "ae-04",
    heroFrames: ["ae-04", "ae-18", "ae-23"],
    lede: "Two hundred and forty covers on long tables, every plate down inside eleven minutes.",
    story: [
      { heading: "The vision", body: "No round tables, no buffet. The hosts wanted one long communal line down the lawn, lit only by lanterns and candles." },
      { heading: "The problem", body: "Long-table service is the hardest format to serve hot. Runners cover triple the distance of a round-table plan." },
      { heading: "The resolution", body: "Two hidden plating stations mid-lawn instead of one at the kitchen, and a rehearsed runner pattern that had the last plate down at eleven minutes." },
    ],
    concept: {
      theme: "Candlelit refectory — one table, one line of light.",
      palette: [
        { name: "Linen", hex: "#EFE8DA" },
        { name: "Olive", hex: "#6B7355" },
        { name: "Brass", hex: "#B08D3F" },
        { name: "Char", hex: "#22211E" },
      ],
      materials: ["Linen tablecloths", "Cut glass", "Brass lantern posts", "Hand-thrown ceramics"],
      floral: "Low running greenery with white blooms — nothing above eye level across the table.",
      lighting: "Lantern posts, taper candles and a barely-there wash so the candle line reads as the brightest thing.",
      philosophy: "Design the service pattern first; the table will look after itself.",
    },
    highlights: [
      { label: "Covers", value: "240", note: "Single long-table line" },
      { label: "Service", value: "11 min", note: "First plate to last" },
      { label: "Counters", value: "3", note: "Live fire, kept off the sightline" },
      { label: "Table run", value: "48 m", note: "Continuous linen line" },
    ],
    gallery: ["ae-04", "ae-18", "ae-23", "ae-09", "ae-19", "ae-26"],
    behind: [
      { title: "Tasting", body: "Two rounds, plated as served, before the menu was locked." },
      { title: "Plating stations", body: "Two concealed mid-lawn stations built to halve runner distance." },
      { title: "Rehearsal", body: "Runners walked the full pattern twice before guests arrived." },
    ],
    testimonial: {
      quote:
        "Everything came out hot, at the same time, for two hundred and forty people sitting at one table outdoors. I still do not entirely understand how.",
      name: "Sana & Usman",
      event: "Open-air dinner, DHA Lahore",
    },
    relatedServices: ["luxury-catering", "outdoor-catering", "live-bbq-catering"],
    relatedLocations: ["dha-lahore", "green-acres"],
  },
  {
    slug: "ivory-salon",
    category: "lounges-seating",
    title: "Ivory Salon",
    subtitle: "A lounge that kept four hundred people until two in the morning",
    eventType: "Reception lounge",
    venue: "Marquee",
    area: "Gulberg",
    season: "Autumn",
    metaTitle: "Ivory Salon — Event Lounge Case Study, Lahore | Anayat Events",
    metaDescription:
      "Case study of Ivory Salon: an event lounge in Gulberg, Lahore designed in conversation groups with cane seating, marble tables and low light for 400 guests.",
    hero: "ae-23",
    heroFrames: ["ae-23", "ae-19", "ae-06"],
    lede: "Nineteen conversation groups, no rows, and a room that never emptied after dinner.",
    story: [
      { heading: "The vision", body: "The hosts had been to a hundred weddings where everyone left after the food. They asked for the opposite." },
      { heading: "The problem", body: "Lounge furniture placed against walls turns a marquee into a waiting room." },
      { heading: "The resolution", body: "Nineteen islands of four to six seats, floated away from the walls, each with its own light source and low table." },
    ],
    concept: {
      theme: "Drawing room, floated — warm, low and grouped.",
      palette: [
        { name: "Ivory", hex: "#F0E9DC" },
        { name: "Cane", hex: "#C6A97C" },
        { name: "Marble", hex: "#D8D4CD" },
        { name: "Ink", hex: "#1C1B19" },
      ],
      materials: ["Cane frames", "Bouclé upholstery", "Marble tops", "Wool rugs"],
      floral: "Low table arrangements only, replaced at midnight so the room stayed fresh into the small hours.",
      lighting: "Every group lit individually below shoulder height; no overhead wash on the lounge at all.",
      philosophy: "People stay where they can hear each other and see each other's faces.",
    },
    highlights: [
      { label: "Guests", value: "400", note: "Reception and lounge" },
      { label: "Groups", value: "19", note: "Islands of four to six" },
      { label: "Last guest", value: "2:10 am", note: "Room still two-thirds full" },
      { label: "Rugs", value: "22", note: "Zoning without walls" },
    ],
    gallery: ["ae-23", "ae-19", "ae-06", "ae-09", "ae-03", "ae-17"],
    behind: [
      { title: "Inventory prep", body: "Every piece cleaned, repaired and finished in the workshop the week before." },
      { title: "Zoning", body: "Groups walked and re-spaced on site until the routes between them felt right." },
      { title: "Midnight refresh", body: "Table florals and candles replaced at twelve without interrupting a conversation." },
    ],
    testimonial: {
      quote:
        "Nobody left after dinner. That has never happened at a family wedding of ours, and it was entirely down to how the lounge was arranged.",
      name: "The Rehman Family",
      event: "Reception, Gulberg",
    },
    relatedServices: ["private-events", "venue-management", "luxury-weddings"],
    relatedLocations: ["gulberg", "model-town"],
  },
];

const catMap = new Map(portfolioCategories.map((c) => [c.slug, c]));
const projMap = new Map(portfolioProjects.map((p) => [p.slug, p]));

export function getPortfolioCategory(slug: string) {
  return catMap.get(slug);
}

export function getPortfolioProject(slug: string) {
  return projMap.get(slug);
}

export function projectsForCategory(slug: string): PortfolioProject[] {
  const cat = catMap.get(slug);
  if (!cat) return [];
  return cat.projects.map((s) => projMap.get(s)).filter(Boolean) as PortfolioProject[];
}

/** The one project the portfolio index elevates above everything else. */
export const signatureProjectSlug = "chandeliers-in-the-trees";
