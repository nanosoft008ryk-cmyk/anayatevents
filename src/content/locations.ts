/* ---------------------------------------------------------------------------
 * Service-area content.
 *
 * CONTENT RULE (non-negotiable): Anayat Events has ONE base — The Palms 7
 * Farmhouse, Green Acres Extension, Lahore. Every other area page
 * describes work we travel to do. Nothing on these pages may imply a branch,
 * an office, a showroom or a second address in that locality. The permitted
 * register is "we serve clients here", "our team travels here", "we regularly
 * plan events in this area".
 *
 * Every area also carries genuinely distinct copy — different audience,
 * venues, celebration styles and planning considerations. Nothing here is a
 * find-and-replace of another entry.
 * ------------------------------------------------------------------------- */

/** Drives the per-page layout rhythm so no two area pages read alike. */
export type AreaRhythm = "editorial" | "mirrored" | "column" | "stacked";

export interface LocationArea {
  slug: string;
  name: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  /** The visible H1. Written naturally — never keyword-stuffed. */
  heroHeadline: string;
  heroKicker: string;
  hero: string;
  lede: string;
  rhythm: AreaRhythm;
  intro: { heading: string; body: string[] };
  experience: {
    heading: string;
    body: string[];
    notes: { title: string; body: string }[];
  };
  /** Service slugs presented as an editorial list, not a keyword block. */
  services: string[];
  /** Venue *types* commonly chosen locally — never claimed relationships. */
  venueTypes: { type: string; note: string }[];
  inspiration: {
    heading: string;
    body: string;
    palette: { name: string; hex: string }[];
    gallery: string[];
  };
  why: { heading: string; body: string[] };
  categories: string[];
  projects: string[];
  articles: string[];
  faqs: { q: string; a: string }[];
  nearby: string[];
  /** How the team reaches this area from the single Green Acres base. */
  travelNote: string;
}

export const locations: LocationArea[] = [
  {
    slug: "lahore",
    name: "Lahore",
    shortName: "Lahore",
    metaTitle: "Luxury Event Management in Lahore | Anayat Events",
    metaDescription:
      "Weddings, corporate occasions and private celebrations across Lahore — planned, designed and catered by one in-house team.",
    heroHeadline: "Luxury Event Management Serving Lahore",
    heroKicker: "Our home city",
    hero: "ae-22",
    lede:
      "The city our team knows best — and the one whose seasons, traffic and courtyards shape how we plan everything else.",
    rhythm: "editorial",
    intro: {
      heading: "A city that celebrates loudly, and well",
      body: [
        "Lahore does not treat a wedding as an evening. It treats it as a season — a run of dinners, mehndis, nikahs and walimas that pull three generations of a family into the same rooms across a fortnight. Nothing else in the country compresses so much hosting into so little calendar.",
        "That rhythm shapes everything about how celebrations are produced here. Between November and February the city's florists, crews and good venues are spoken for months in advance, and the difference between a smooth wedding week and a frantic one is almost always decided in August, not in December.",
        "Our own base sits at The Palms 7 Farmhouse in Green Acres, and from there our team travels across the whole city — Gulberg drawing rooms, DHA house lawns, Bahria halls, Bedian gardens. Same planners, same kitchen brigade, same standards, whichever postcode the invitation carries.",
      ],
    },
    experience: {
      heading: "What we have learned working across Lahore",
      body: [
        "We do not publish counts of weddings or claim to have worked at every venue in the city. What we can say honestly is that our team has planned and produced celebrations across most of Lahore's districts, and that the accumulated knowledge shows up in unglamorous places: which halls hide a decor-exclusivity clause, which lawns drain badly after rain, which approach roads seize up at seven in the evening.",
        "That knowledge is the actual service. Design is what a client sees; logistics is what keeps the design intact from the moment the first truck leaves Green Acres to the moment the last chair is loaded back onto it.",
      ],
      notes: [
        {
          title: "Seasonality read honestly",
          body: "We will tell you when a date is going to cost meaningfully more than a date two weeks either side of it, and why.",
        },
        {
          title: "One team, whole city",
          body: "Planning, decor, florals and kitchen are in-house. Nothing is subcontracted out to a crew you have never met.",
        },
        {
          title: "Access before aesthetics",
          body: "Every commission begins with a physical look at the venue's power, kitchen distance and load-in window before a single sketch is drawn.",
        },
      ],
    },
    services: [
      "wedding-planning",
      "luxury-weddings",
      "luxury-catering",
      "corporate-events",
      "stage-decoration",
      "floral-design",
    ],
    venueTypes: [
      { type: "Hotel ballrooms", note: "Formal receptions where the venue runs its own operations team and timings are shared." },
      { type: "Banquet halls & marquees", note: "The city's workhorse format — best transformed with an overlay rather than fought." },
      { type: "Farmhouse estates", note: "Open land on the outskirts, built up into a full temporary venue for the night." },
      { type: "Private residences", note: "Home lawns and courtyards, planned around neighbours, gates and driveway width." },
    ],
    inspiration: {
      heading: "The Lahore palette",
      body:
        "A city of brick, brass and old gardens tends to reward warmth over contrast. Most of our Lahore work sits in ivory and candlelight with a single deep accent — jewel green, oxblood, or the marigold that arrives with every mehndi whether you plan for it or not.",
      palette: [
        { name: "Candle ivory", hex: "#F2E8D8" },
        { name: "Old brass", hex: "#B08D4F" },
        { name: "Mughal green", hex: "#1F3A2E" },
        { name: "Marigold", hex: "#E39A2B" },
      ],
      gallery: ["ae-22", "ae-13", "ae-04", "ae-25", "ae-07", "ae-16"],
    },
    why: {
      heading: "Why families across the city call us",
      body: [
        "Most people who contact us have already been quoted by someone cheaper and someone louder. What they are usually looking for is the third thing: a house that will tell them the truth about what their number buys, and then deliver exactly that without a single conversation about extras on the morning of the event.",
        "We keep design, florals and food under one roof because that is the only way to be accountable for all three. When the stage is late, it is our problem. When a table is served four minutes behind the rest of the room, it is our problem. There is nobody else in the chain to look at.",
      ],
    },
    categories: ["wedding-stages", "floral-installations", "dining-catering"],
    projects: ["the-long-white", "crystal-rain-walima", "chandeliers-in-the-trees"],
    articles: [
      "planning-a-lahore-wedding-week",
      "what-a-wedding-actually-costs",
      "designing-a-stage-that-photographs",
    ],
    faqs: [
      {
        q: "Which parts of Lahore do you serve?",
        a: "Effectively all of it — DHA, Bahria Town, Gulberg, Model Town, Johar Town, Cantt and Askari, Wapda Town, Raiwind Road, Bedian Road and Green Acres, plus surrounding Punjab on request.",
      },
      {
        q: "Do you have offices in each of these areas?",
        a: "No. We work from a single base at The Palms 7 Farmhouse in Green Acres, Lahore. Our planning and production teams travel out to every other area we serve.",
      },
      {
        q: "How far in advance should a Lahore wedding be booked?",
        a: "For a peak winter date, six to nine months is comfortable and four is tight. Off-peak dates in October or March can often be arranged in far less time.",
      },
      {
        q: "Can you handle an entire wedding week rather than a single function?",
        a: "Yes, and it is usually the better arrangement — one design language, one crew and one point of accountability across mehndi, nikah and walima.",
      },
    ],
    nearby: ["dha-lahore", "bahria-town-lahore", "gulberg", "model-town"],
    travelNote:
      "Everything we build leaves from one place: our production base at The Palms 7 Farmhouse in Green Acres. Fabrication, floral cold storage and the kitchen brigade all operate from that single address, and our crews travel out from there to every area of the city we serve.",
  },

  {
    slug: "dha-lahore",
    name: "DHA Lahore",
    shortName: "DHA Lahore",
    metaTitle: "Luxury Wedding Planner Serving DHA Lahore | Anayat Events",
    metaDescription:
      "Celebrations across DHA Lahore — house lawns, club halls and residences from Phase 1 to Phase 8, run by discreet, compact crews.",
    heroHeadline: "Luxury Wedding Planner Serving DHA Lahore",
    heroKicker: "Phases 1 – 8",
    hero: "ae-19",
    lede:
      "Where the venue is usually somebody's home, and the plan has to respect the street as much as the guest list.",
    rhythm: "mirrored",
    intro: {
      heading: "A neighbourhood that hosts at home",
      body: [
        "DHA celebrates privately. Families here tend to choose their own lawn over a hall — partly for control, largely because a house full of relatives is the point of the evening rather than an inconvenience to be managed elsewhere.",
        "It gives the work a particular character. The design brief is smaller and more intimate, but the operational one is harder: a residential build has to arrive, install, run and disappear without leaving a mark on a driveway, a lawn edge or a neighbour's patience.",
        "The phases differ too. Five, six and eight have the lawn depth for a genuine outdoor function with a stage and a proper dance floor. The older phases, with their narrower plots and mature planting, are at their best for a seated dinner or a nikah where the house itself is the backdrop.",
      ],
    },
    experience: {
      heading: "How our team works in DHA",
      body: [
        "Our crews travel into DHA regularly, and over time we have learned to plan backwards from the gate rather than forwards from the mood board. Supplier and vehicle lists go to the relevant phase administration well ahead of the build. Arrivals are staged so that four vans never stand on one residential street at the same time.",
        "We also plan around what a house can actually carry. Domestic supply is never loaded with event lighting or kitchen draw — power comes in on our own generator so nothing in the home flickers when the stage lights come up.",
      ],
      notes: [
        { title: "Gate clearance handled for you", body: "We prepare and lodge the supplier and vehicle documentation with phase security on your behalf." },
        { title: "Compact, discreet crews", body: "Smaller teams who know how to move through a family home without disturbing it." },
        { title: "Neighbour courtesy", body: "Sound levels and a firm finish time are agreed in writing before the first truck arrives." },
      ],
    },
    services: [
      "wedding-planning",
      "nikah-planning",
      "private-events",
      "luxury-catering",
      "floral-design",
      "birthday-events",
    ],
    venueTypes: [
      { type: "Private house lawns", note: "The commonest DHA format — full builds with independent power and lighting." },
      { type: "Club and members' venues", note: "Managed hall functions where external catering is permitted." },
      { type: "Commercial halls in the blocks", note: "Compact indoor formats for roughly 150 to 400 guests." },
      { type: "Rooftop terraces", note: "Intimate winter dinners, planned around wind and heating." },
    ],
    inspiration: {
      heading: "Restraint, at home",
      body:
        "Residential DHA work looks best when it stays close to the architecture instead of hiding it. Warm white light on existing planting, low floral runs that let people see each other across a table, and metal rather than colour doing the ornament.",
      palette: [
        { name: "Bone", hex: "#EFE7DC" },
        { name: "Champagne", hex: "#D8BE8E" },
        { name: "Garden green", hex: "#2C4232" },
        { name: "Dusk grey", hex: "#4A4A46" },
      ],
      gallery: ["ae-19", "ae-15", "ae-06", "ae-09", "ae-23", "ae-03"],
    },
    why: {
      heading: "Why DHA clients keep our number",
      body: [
        "Because a home event is an act of trust before it is a design commission. You are letting a production crew into the place your family lives, and the thing clients tell us afterwards is almost never about the stage — it is that nothing was scratched, nobody shouted, and the lawn was back to itself by the following afternoon.",
        "The design matters too, of course. But at this scale, taste is table stakes and behaviour is the differentiator.",
      ],
    },
    categories: ["nikah-ceremonies", "lounges-seating", "floral-installations"],
    projects: ["bloom-curtain-nikah", "ivory-salon"],
    articles: ["an-intimate-nikah-at-home", "why-fresh-flowers-matter"],
    faqs: [
      {
        q: "Do you have an office in DHA?",
        a: "No — our single base is at Green Acres, Lahore. Our planning and production team travels into DHA for site visits, builds and event days.",
      },
      {
        q: "Can you set up a full function in a DHA house lawn?",
        a: "Yes, from a forty-guest nikah up to around three hundred guests, with our own generator so the household supply is never loaded.",
      },
      {
        q: "Who arranges DHA security clearance for the suppliers?",
        a: "We do. The full supplier and vehicle list is prepared and submitted to the phase office ahead of the build date.",
      },
      {
        q: "How is the sound cut-off managed?",
        a: "We design the last hour of the function to taper toward the agreed finish time rather than stopping abruptly at it.",
      },
    ],
    nearby: ["cantt-askari", "bedian-road", "gulberg", "lahore"],
    travelNote:
      "DHA is a straightforward run from our Green Acres base, and our crews make it regularly. Site visits, tastings and design meetings can happen at your home or at the farmhouse — whichever suits the family.",
  },

  {
    slug: "bahria-town-lahore",
    name: "Bahria Town Lahore",
    shortName: "Bahria Town",
    metaTitle: "Luxury Event Management for Bahria Town Lahore | Anayat Events",
    metaDescription:
      "Anayat Events serves clients across Bahria Town Lahore — grand halls, community lawns and villa celebrations, with full production, decor and in-house catering.",
    heroHeadline: "Luxury Event Management for Bahria Town Lahore",
    heroKicker: "Grand halls & open lawns",
    hero: "ae-05",
    lede:
      "Wide roads, real parking and ceilings tall enough to hang something worth looking up at.",
    rhythm: "column",
    intro: {
      heading: "The easiest large format in the city",
      body: [
        "Bahria Town was laid out rather than accumulated, and it shows in the way celebrations run here. Access roads are wide, parking genuinely exists, and the halls were designed as venues instead of converted into them.",
        "The community skews young and family-oriented, and the celebration style follows: larger guest lists, more elaborate mehndi nights, and a real appetite for scale — bigger stages, longer dining rooms, more light in the air.",
        "Height is the local advantage most planners waste. These ceilings will carry hanging floral gardens and chandelier clusters that a converted hall in an older part of Lahore simply cannot take.",
      ],
    },
    experience: {
      heading: "Producing across the sectors",
      body: [
        "Our team regularly plans events throughout Bahria Town, and the practical benefit is that a full wedding week can be run without the crew ever leaving the neighbourhood — mehndi on a community lawn, nikah in a villa, walima in a grand hall, with the same production language across all three.",
        "Because the drive from our Green Acres base is longer than a cross-town run, we stage production overnight for early builds. The setup window belongs to the build, not to the journey.",
      ],
      notes: [
        { title: "Rigging surveyed first", body: "Overhead installations are only promised after we have physically checked the hall's rigging points." },
        { title: "Genuine load-in space", body: "Wide access means larger, fewer vehicle movements and a calmer build than most of the city allows." },
        { title: "Crews staged early", body: "For dawn builds our production team stages overnight so travel never eats into setup." },
      ],
    },
    services: [
      "luxury-weddings",
      "mehndi-planning",
      "walima-planning",
      "stage-decoration",
      "live-bbq-catering",
      "indoor-catering",
    ],
    venueTypes: [
      { type: "Grand banquet halls", note: "High ceilings that carry hanging florals and chandelier work." },
      { type: "Community lawns", note: "Marquee builds with full outdoor kitchens behind them." },
      { type: "Villa residences", note: "Intimate nikah and family dinner formats." },
      { type: "Club and golf venues", note: "Corporate dinners, award evenings and formal receptions." },
    ],
    inspiration: {
      heading: "Scale, lit properly",
      body:
        "Big rooms fail when they are decorated at floor level and left dark above shoulder height. Bahria work is at its best when the ceiling carries the design — suspended blooms, layered crystal, and a warm wash that fills the volume instead of pooling on the tables.",
      palette: [
        { name: "Pearl", hex: "#F4EFE6" },
        { name: "Antique gold", hex: "#C39B4E" },
        { name: "Deep rose", hex: "#7C2F3B" },
        { name: "Midnight", hex: "#141821" },
      ],
      gallery: ["ae-05", "ae-02", "ae-14", "ae-08", "ae-26", "ae-13"],
    },
    why: {
      heading: "Why clients here choose us",
      body: [
        "Families in Bahria Town are usually planning something large, and large events punish vagueness. What we offer is a drawn, costed plan before anything is committed — elevations, floral schedules, a service timeline for the kitchen — so the scale is designed rather than improvised.",
        "The other reason is food. At six hundred guests, catering stops being a menu question and becomes an engineering one. Ours is in-house, which means the kitchen sits in the same planning meetings as the design team.",
      ],
    },
    categories: ["wedding-stages", "mehndi-celebrations", "dining-catering"],
    projects: ["crystal-rain-walima", "jharoka-nights"],
    articles: ["the-service-standard-nobody-talks-about", "designing-a-stage-that-photographs"],
    faqs: [
      {
        q: "Is there a Bahria Town branch of Anayat Events?",
        a: "No. We operate from one base in Green Acres, Lahore, and our team travels out to Bahria Town for meetings, site surveys and event production.",
      },
      {
        q: "Do you charge extra for the distance?",
        a: "No distance surcharge is applied for Bahria Town. It is a regular part of our service area.",
      },
      {
        q: "Can you hang heavy floral installations in the halls?",
        a: "Where the structure allows it, yes — but we survey the rigging points before promising anything overhead, never afterwards.",
      },
      {
        q: "Will you take on a smaller villa dinner here?",
        a: "Yes. We work from intimate villa gatherings upward; the scale changes the plan, not the standard.",
      },
    ],
    nearby: ["raiwind-road", "wapda-town", "ferozepur-road", "dha-lahore"],
    travelNote:
      "Bahria Town sits a comfortable drive from our Green Acres production base. For early morning builds our crews stage overnight nearby, so the setup window is spent working rather than travelling.",
  },

  {
    slug: "gulberg",
    name: "Gulberg",
    shortName: "Gulberg",
    metaTitle: "Event Planning & Catering in Gulberg | Anayat Events",
    metaDescription:
      "Gulberg ballrooms, boutique halls and heritage residences, produced with pre-assembled sets and tightly scheduled load-ins.",
    heroHeadline: "Premium Event Planning for Gulberg, Lahore",
    heroKicker: "Ballrooms & heritage houses",
    hero: "ae-07",
    lede:
      "The city's most polished rooms, reached through its least forgiving streets.",
    rhythm: "stacked",
    intro: {
      heading: "Density, and what it demands",
      body: [
        "Gulberg is the commercial and social centre of Lahore, and celebrations here take their tone from that. Guest lists lean professional as often as familial; the dress code is a little sharper; evenings tend to start and finish earlier than in the outer societies.",
        "It is also the most physically constrained part of the city to work in. Load-in windows are measured in minutes rather than hours, service lifts are shared with the venue's own operations, and the street outside will not tolerate three trucks standing through an afternoon.",
        "In exchange you get rooms nothing else in Lahore can match — five-star ballrooms with real proportion, and a handful of heritage residences whose character no purpose-built hall will ever imitate.",
      ],
    },
    experience: {
      heading: "Working to the clock",
      body: [
        "Our team plans Gulberg builds backwards from the venue's access constraints. Sets are fabricated and pre-assembled at our Green Acres workshop and arrive as finished modules, sized against the service lift before anything is cut.",
        "The same discipline applies at the other end of the night. When a venue has another function loading in the next morning, the strike is rehearsed as carefully as the build.",
      ],
      notes: [
        { title: "Pre-assembly as standard", body: "Sets arrive finished. We do not build from raw material inside a hotel loading bay." },
        { title: "Lift-dimension checks", body: "Every module is measured against the venue's service lift at design stage." },
        { title: "Staged street arrivals", body: "Vehicles arrive in sequence so the road stays usable throughout the build." },
      ],
    },
    services: [
      "corporate-events",
      "luxury-weddings",
      "venue-management",
      "indoor-catering",
      "floral-design",
      "private-events",
    ],
    venueTypes: [
      { type: "Five-star hotel ballrooms", note: "Formal receptions requiring liaison with the venue's own operations team." },
      { type: "Boutique event halls", note: "Seated formats for roughly 100 to 300 guests." },
      { type: "Heritage residences", note: "Character properties that need low-impact rigging and no fixings into original fabric." },
      { type: "Rooftop restaurants", note: "Engagements, launches and corporate receptions with a skyline behind them." },
    ],
    inspiration: {
      heading: "Tailored, not decorated",
      body:
        "Gulberg rooms already have architecture. The work is editing rather than adding — a controlled palette, sculptural floral instead of volume, and lighting that flatters the room's own detailing rather than papering over it.",
      palette: [
        { name: "Alabaster", hex: "#EDE9E2" },
        { name: "Smoked bronze", hex: "#8A6B3B" },
        { name: "Ink", hex: "#1B1D22" },
        { name: "Blush stone", hex: "#C9A9A0" },
      ],
      gallery: ["ae-07", "ae-02", "ae-23", "ae-12", "ae-20", "ae-04"],
    },
    why: {
      heading: "Why Gulberg hosts work with us",
      body: [
        "Corporate clients and hotel-based weddings share one requirement above all others: predictability. A programme that starts when the invitation says it will, a room that is finished before the first guest is in the lobby, and a supplier who talks to the venue's banqueting manager without needing the client in the middle.",
        "That is the part of the job we take most seriously here. The design is what gets photographed; the schedule is what gets remembered.",
      ],
    },
    categories: ["corporate-private", "lounges-seating", "wedding-stages"],
    projects: ["ivory-salon", "the-long-white"],
    articles: ["designing-a-stage-that-photographs", "planning-a-lahore-wedding-week"],
    faqs: [
      {
        q: "Are you based in Gulberg?",
        a: "No — our base is at Green Acres, Lahore. We travel into Gulberg for surveys, venue liaison and production, which we do frequently.",
      },
      {
        q: "Can you cater inside a Gulberg hotel?",
        a: "Only where the hotel permits outside catering. We confirm that policy for you before you sign a venue contract, because it is not always obvious in the paperwork.",
      },
      {
        q: "How do you cope with very short load-in windows?",
        a: "By pre-assembling everything at our workshop. Installation inside the venue becomes placement and finishing rather than construction.",
      },
      {
        q: "Do you work in heritage properties?",
        a: "Yes, with rigging designed to leave no fixings or marks in original fabric. We survey the building before agreeing to any structural element.",
      },
    ],
    nearby: ["model-town", "cantt-askari", "ferozepur-road", "canal-road"],
    travelNote:
      "Our production base is in Green Acres, and Gulberg builds are planned around the drive: modules leave the workshop finished, timed to arrive inside the venue's access window rather than ahead of it.",
  },

  {
    slug: "model-town",
    name: "Model Town",
    shortName: "Model Town",
    metaTitle: "Elegant Event Planning for Model Town Lahore | Anayat Events",
    metaDescription:
      "Anayat Events serves clients in Model Town Lahore — garden residences, community halls and family celebrations designed around mature trees and traditional formats.",
    heroHeadline: "Elegant Event Planning for Model Town, Lahore",
    heroKicker: "Old gardens & deep verandahs",
    hero: "ae-11",
    lede:
      "Established houses, forty-year-old trees, and families who have hosted in the same garden for three generations.",
    rhythm: "editorial",
    intro: {
      heading: "A neighbourhood with its own manners",
      body: [
        "Model Town is one of the oldest planned neighbourhoods in Lahore, and it has kept a formality that newer societies never acquired. The houses are generous rather than showy, the gardens are mature, and the families hosting in them often have a very clear idea of how things are done.",
        "Celebration style follows from that. Guest lists here tend toward the extended and the traditional; ceremonies are given their proper weight; and there is far less appetite for spectacle than for a room that feels correct.",
        "The gardens are the real asset. Canopies that took decades to grow will out-perform anything we could build, provided the design is willing to be quieter than they are.",
      ],
    },
    experience: {
      heading: "Designing with the architecture, not over it",
      body: [
        "When our team works in Model Town, the first decision is usually what not to install. Lighting the trees rather than draping them, using a verandah as the natural stage, keeping the palette to ivory, brass and deep green so nothing competes with the brickwork.",
        "The practical side is less romantic. Older lawns drain unevenly and the interior lanes are narrow, so ground levelling and a staged supplier order get more attention here than they would in a purpose-built venue.",
      ],
      notes: [
        { title: "Ground surveyed before layout", body: "Levelling and flooring are assessed in person, because these lawns rarely sit flat." },
        { title: "Canopy lighting", body: "Mature trees are treated as the principal set element rather than screened away." },
        { title: "Small-vehicle access", body: "Narrow interior lanes require smaller vans and a staged arrival order." },
      ],
    },
    services: [
      "wedding-planning",
      "nikah-planning",
      "walima-planning",
      "outdoor-catering",
      "floral-design",
      "private-events",
    ],
    venueTypes: [
      { type: "Garden residences", note: "Mature-tree lawns with a verandah that usually makes the best stage." },
      { type: "Community halls", note: "Traditional formats for larger extended-family gatherings." },
      { type: "Club venues", note: "Formal dinners, anniversaries and milestone celebrations." },
      { type: "Link Road banquet spaces", note: "Mid-size walima and reception formats close to home." },
    ],
    inspiration: {
      heading: "Green, brass, and candlelight",
      body:
        "The most successful Model Town evenings look as though the garden was simply lit and set for dinner. Long tables under the canopy, brass and glass instead of acrylic, and florals in the register of the existing planting rather than imported against it.",
      palette: [
        { name: "Ivory linen", hex: "#F0E9DB" },
        { name: "Aged brass", hex: "#A98846" },
        { name: "Cypress", hex: "#25382B" },
        { name: "Terracotta", hex: "#9C5B3E" },
      ],
      gallery: ["ae-11", "ae-25", "ae-14", "ae-01", "ae-19", "ae-26"],
    },
    why: {
      heading: "Why Model Town families choose us",
      body: [
        "Largely because we are willing to do less. Families here have often seen a version of their garden over-decorated by someone determined to demonstrate value, and the relief when a planner suggests removing rather than adding is real.",
        "There is also the matter of protocol. Separated seating, elders' comfort, the order in which a family is greeted — these are not afterthoughts in this neighbourhood, and we plan them as carefully as the floral schedule.",
      ],
    },
    categories: ["floral-installations", "nikah-ceremonies", "dining-catering"],
    projects: ["garden-banquet", "bloom-curtain-nikah"],
    articles: ["why-fresh-flowers-matter", "an-intimate-nikah-at-home"],
    faqs: [
      {
        q: "Do you have a Model Town office?",
        a: "No. Anayat Events operates from a single base in Green Acres, Lahore, and travels to Model Town for consultations and event production.",
      },
      {
        q: "Can you work around old trees on the lawn?",
        a: "We prefer to. Uplit mature canopies produce a better room than any ceiling treatment we could hang beneath them.",
      },
      {
        q: "Are the narrow interior lanes a problem for load-in?",
        a: "Not if they are planned for. We use smaller vehicles and a staged arrival order so the lane is never blocked for residents.",
      },
      {
        q: "Do you handle traditional formats and separated seating?",
        a: "Yes, and we will discuss it early so the floor plan is built around the family's preference rather than adjusted on the day.",
      },
    ],
    nearby: ["gulberg", "johar-town", "ferozepur-road", "cantt-askari"],
    travelNote:
      "Our team travels to Model Town from the Green Acres base for every survey and build. Because the lanes here are tight, we plan vehicle sizes and arrival order well before the event week.",
  },

  {
    slug: "johar-town",
    name: "Johar Town",
    shortName: "Johar Town",
    metaTitle: "Wedding Planning & Catering, Johar Town | Anayat Events",
    metaDescription:
      "Anayat Events serves clients in Johar Town Lahore — marriage halls, marquees and home functions with full decor overlays, in-house catering and honest venue advice.",
    heroHeadline: "Wedding Planning & Catering for Johar Town",
    heroKicker: "The hall district",
    hero: "ae-08",
    lede:
      "More banquet capacity than anywhere else in Lahore — and a real gap between the good rooms and the merely available ones.",
    rhythm: "mirrored",
    intro: {
      heading: "Choice, which is not the same as ease",
      body: [
        "Johar Town has more marriage halls per square kilometre than any other part of the city. For a family planning a wedding, that abundance is a mixed blessing: the venue decision is the single highest-leverage choice they will make, and almost nothing on a hall's own brochure helps them make it.",
        "The community here is broad — established professional families, university staff, business owners — and the celebration style is generous but budget-aware. People want a room that looks like far more than they spent, which is a genuinely different design problem from an open-ended commission.",
        "It is also the district where good planning produces the most visible return, because so much of what goes wrong here is avoidable at the contract stage.",
      ],
    },
    experience: {
      heading: "We survey before we recommend",
      body: [
        "When clients in Johar Town ask us which hall to take, we do not answer from a list. We look at ceiling height, the distance from kitchen to the furthest table, generator capacity, honest parking depth, and — most importantly — whether the venue's own decor package can be declined. Several cannot, and that single clause changes the entire design conversation.",
        "Where a hall's fixed decor has to stay, we design an overlay that conceals it rather than argues with it. It is unglamorous work and it is the difference between a transformed room and a compromised one.",
      ],
      notes: [
        { title: "Contract clauses read first", body: "Decor exclusivity and outside-catering permissions are checked before you sign anything." },
        { title: "Parking assessed honestly", body: "Guest-count-to-parking ratios are measured, not taken from the venue's brochure." },
        { title: "Overlay design", body: "Fixed hall decor is concealed with a designed overlay rather than left to compete." },
      ],
    },
    services: [
      "wedding-planning",
      "walima-planning",
      "stage-decoration",
      "indoor-catering",
      "live-bbq-catering",
      "venue-management",
    ],
    venueTypes: [
      { type: "Marriage halls", note: "The local default — best handled with a full decor overlay on the existing shell." },
      { type: "Marquees", note: "Covered builds where a hall's capacity or aesthetics fall short." },
      { type: "Home lawn functions", note: "Compact residential builds with independent generator power." },
      { type: "Emporium-area venues", note: "Corporate and mid-size reception formats near the commercial belt." },
    ],
    inspiration: {
      heading: "Making a shell disappear",
      body:
        "The Johar Town brief is nearly always transformation on a budget. That means concentrating spend where the eye goes — the stage, the entrance, the ceiling line above the dance floor — and letting a disciplined palette do the rest of the work for free.",
      palette: [
        { name: "Warm white", hex: "#F5EFE4" },
        { name: "Burnished gold", hex: "#BE9247" },
        { name: "Plum", hex: "#4C2338" },
        { name: "Sage", hex: "#8C9A82" },
      ],
      gallery: ["ae-08", "ae-17", "ae-02", "ae-21", "ae-13", "ae-06"],
    },
    why: {
      heading: "Why clients in this area call us",
      body: [
        "Because we will tell them what their number actually buys before they commit to it. A great many families in Johar Town have been quoted a figure and then discovered the extras afterwards; our proposals carry the whole picture, including the parts that are not flattering to us.",
        "And because the catering is ours. In a district where the hall's in-house kitchen is often the weakest link in the evening, having food planned by the same people who planned the room changes the result more than any decor decision.",
      ],
    },
    categories: ["wedding-stages", "dining-catering", "mehndi-celebrations"],
    projects: ["crystal-rain-walima", "the-long-white"],
    articles: ["what-a-wedding-actually-costs", "the-service-standard-nobody-talks-about"],
    faqs: [
      {
        q: "Do you have a branch in Johar Town?",
        a: "No. We work from one base at Green Acres, Lahore, and our planners and crews travel to Johar Town for surveys and event days.",
      },
      {
        q: "Can you replace a hall's in-house decor?",
        a: "Only where the contract permits it. Some halls mandate their own package, so we check that clause before you sign and design an overlay if it cannot be removed.",
      },
      {
        q: "Which halls here do you recommend?",
        a: "It depends entirely on your guest count and format. We shortlist by fit after a survey — never by any commercial arrangement with a venue.",
      },
      {
        q: "Can you cater in a hall that has its own kitchen?",
        a: "Where outside catering is permitted, yes, and we get that confirmed in writing before the booking is made.",
      },
    ],
    nearby: ["wapda-town", "valencia-town", "model-town", "canal-road"],
    travelNote:
      "Johar Town is an easy run for our crews from the Green Acres base, and venue surveys there are usually arranged within a few days of an enquiry.",
  },

  {
    slug: "cantt-askari",
    name: "Cantt & Askari",
    shortName: "Cantt & Askari",
    metaTitle: "Formal Event Management for Lahore Cantt & Askari | Anayat Events",
    metaDescription:
      "Cantt and Askari messes, garrison clubs and residential lawns — cleared crews, filed documentation and exact timings.",
    heroHeadline: "Formal Event Management for Lahore Cantt & Askari",
    heroKicker: "Protocol & precision",
    hero: "ae-03",
    lede:
      "Documentation filed early, crews carrying identification, and a programme that runs to the minute because here it genuinely will.",
    rhythm: "column",
    intro: {
      heading: "A community that runs on procedure",
      body: [
        "Cantt and the Askari societies have a culture of their own, and celebrations reflect it. Punctuality is not aspirational. Guest lists are structured. Seating carries protocol. The evening has a shape everybody in the room already understands.",
        "The venues match that temperament. Officers' messes and garrison clubs are among the most elegant interiors in Lahore — high ceilings, disciplined proportion, dark wood — and they reward a restrained design far more than a maximal one.",
        "Access, meanwhile, is governed rather than negotiated: vehicle passes, personnel clearance, fixed start and finish times, no exceptions on the day.",
      ],
    },
    experience: {
      heading: "Comfortable inside the rules",
      body: [
        "Our team works within these protocols regularly. Crew identification and vehicle documentation are submitted well ahead of the load-in date, and the run-of-show is written to the minute because it will be held to the minute.",
        "Design-wise, we treat these rooms with lighting and florals rather than heavy structural overlay. Building a large set inside a mess usually diminishes it; the room is already the best thing in the room.",
      ],
      notes: [
        { title: "Clearance prepared in advance", body: "Personnel and vehicle lists are compiled and submitted as a standard part of the process." },
        { title: "Timings treated as absolute", body: "Our builds are complete before the stated deadline, not at it." },
        { title: "Light-touch design", body: "Formal interiors are enhanced with lighting and floral work rather than overlaid with structure." },
      ],
    },
    services: [
      "corporate-events",
      "walima-planning",
      "nikah-planning",
      "indoor-catering",
      "floral-design",
      "private-events",
    ],
    venueTypes: [
      { type: "Officers' messes", note: "Formal interiors best served by restraint and considered lighting." },
      { type: "Askari community halls", note: "Mid-size family functions and receptions." },
      { type: "Garrison club venues", note: "Corporate dinners, ceremonies and formal award evenings." },
      { type: "Residential lawns", note: "Compact home builds within cleared areas." },
    ],
    inspiration: {
      heading: "Formal, warm, unfussy",
      body:
        "The register here is closer to a state dinner than a party. Symmetry, low centrepieces that do not obstruct conversation, silverware that reads as heritage, and a light level that stays warm and even from the top table to the back of the room.",
      palette: [
        { name: "Parchment", hex: "#EDE4D4" },
        { name: "Regimental gold", hex: "#B08A3E" },
        { name: "Deep bottle", hex: "#1C3128" },
        { name: "Oxblood", hex: "#5A2126" },
      ],
      gallery: ["ae-03", "ae-12", "ae-07", "ae-20", "ae-23", "ae-15"],
    },
    why: {
      heading: "Why clients in Cantt work with us",
      body: [
        "Because we do not need to be managed. Documentation goes in without a reminder, the crew arrives dressed and identified, and the programme is delivered as written. For a host who is themselves accountable to a protocol, that is worth more than any design flourish.",
        "The design still matters — but it is measured here, and being trusted with a formal room is a compliment we try to deserve by leaving it looking like itself.",
      ],
    },
    categories: ["corporate-private", "nikah-ceremonies", "lounges-seating"],
    projects: ["ivory-salon", "bloom-curtain-nikah"],
    articles: ["planning-a-lahore-wedding-week", "the-service-standard-nobody-talks-about"],
    faqs: [
      {
        q: "Is Anayat Events located inside Cantt?",
        a: "No. Our single base is at Green Acres, Lahore. Our crews travel into Cantt and Askari with the appropriate clearance for each event.",
      },
      {
        q: "Can your crew obtain clearance for mess and club venues?",
        a: "Yes — personnel identification and vehicle documentation are handled by us as part of the standard planning process.",
      },
      {
        q: "Are you familiar with mess protocols and seating order?",
        a: "We work with them regularly, including formal ceremony sequencing and top-table arrangements.",
      },
      {
        q: "How strict are the venue timings?",
        a: "Absolute — and we plan to finish ahead of them rather than against them.",
      },
    ],
    nearby: ["dha-lahore", "gulberg", "model-town", "lahore"],
    travelNote:
      "Every crew that enters a Cantt or Askari venue travels from our Green Acres base with documentation lodged in advance. Planning meetings can be held at the farmhouse or wherever is most convenient for the host.",
  },

  {
    slug: "raiwind-road",
    name: "Raiwind Road",
    shortName: "Raiwind Road",
    metaTitle: "Farmhouse Wedding Production on Raiwind Road | Anayat Events",
    metaDescription:
      "Anayat Events serves clients along Raiwind Road Lahore — large farmhouse estate weddings with power, kitchens, lighting and guest logistics built from the ground up.",
    heroHeadline: "Farmhouse Wedding Production Along Raiwind Road",
    heroKicker: "The estate belt",
    hero: "ae-10",
    lede:
      "Land, a gate, and very little else. Everything a guest touches that night arrives on a truck.",
    rhythm: "stacked",
    intro: {
      heading: "Where Lahore's largest weddings happen",
      body: [
        "The Raiwind Road corridor is where the city goes when the guest list outgrows every hall in it. Acres of open lawn, long approach drives and the kind of horizon that makes a thousand-person wedding feel intimate rather than industrial.",
        "The trade is that the venue gives you space and almost nothing else. Power capacity ranges from adequate to entirely theoretical, kitchens are frequently non-existent, and the difference between two neighbouring estates can be enormous.",
        "Clients who choose this belt are usually planning a full wedding week and want a single canvas for it — which is exactly what open ground is, once someone has built a venue on top of it.",
      ],
    },
    experience: {
      heading: "Building a venue that did not exist that morning",
      body: [
        "Every Raiwind commission our team takes begins with a physical survey: power, water, drainage, access width, mobile signal and how far the nearest hospital is. Nothing about an estate can be assumed from photographs.",
        "From there we build the event as a temporary settlement — kitchen, lighting, sanitation, shelter, parking, wayfinding — run it for a night, and take all of it away again before morning.",
      ],
      notes: [
        { title: "Independent power as standard", body: "We bring generator capacity rather than trusting an estate supply we have not load-tested." },
        { title: "Wayfinding from the main road", body: "Lit signage and marshals at every turn, because an unmarked gate is invisible after dark." },
        { title: "Crews staged on site", body: "For dawn builds on distant estates, production stages overnight rather than commuting." },
      ],
    },
    services: [
      "farmhouse-events",
      "luxury-weddings",
      "destination-weddings",
      "outdoor-catering",
      "live-bbq-catering",
      "venue-management",
    ],
    venueTypes: [
      { type: "Large farmhouse estates", note: "Multi-acre builds for very large guest counts." },
      { type: "Boutique farm venues", note: "Intimate outdoor formats set under existing mature trees." },
      { type: "Open agricultural land", note: "Complete temporary infrastructure raised on bare ground." },
      { type: "Poolside lawns", note: "Evening mehndi and reception formats around existing water." },
    ],
    inspiration: {
      heading: "Fire, field and lantern light",
      body:
        "Open ground wants warmth and edges. Lantern runs to define the walkable world, live fire visible from the dining lawn, and a stage lit so that it reads from two hundred metres away without bleaching out at ten.",
      palette: [
        { name: "Raw linen", hex: "#E8DFCD" },
        { name: "Ember", hex: "#C4762E" },
        { name: "Field green", hex: "#31402C" },
        { name: "Night", hex: "#11130F" },
      ],
      gallery: ["ae-10", "ae-25", "ae-18", "ae-11", "ae-24", "ae-26"],
    },
    why: {
      heading: "Why estate clients choose us",
      body: [
        "Because building on empty ground is the least forgiving work in this industry, and it exposes any weakness in a supplier chain immediately. There is no venue operations team to absorb a mistake, no house kitchen to fall back on and no spare power to borrow.",
        "We keep production, florals and the kitchen in-house precisely so that on a site like this there is one plan and one crew, rather than five companies discovering each other's assumptions at four in the afternoon.",
      ],
    },
    categories: ["outdoor-farmhouse", "wedding-stages", "dining-catering"],
    projects: ["chandeliers-in-the-trees", "garden-banquet"],
    articles: ["choosing-a-farmhouse-in-lahore", "outdoor-catering-in-lahore-heat"],
    faqs: [
      {
        q: "Do you operate a venue on Raiwind Road?",
        a: "No. Our own base is at Green Acres, Lahore. Along Raiwind Road we work at estates chosen by the client, travelling out with full production.",
      },
      {
        q: "Do farmhouses here have enough power for a wedding?",
        a: "Rarely for a full event. We bring independent generator capacity as standard instead of relying on the estate supply.",
      },
      {
        q: "How will guests find an unmarked estate at night?",
        a: "Lit signage from the main road and marshals at each turn on the approach, set up before the first guest leaves home.",
      },
      {
        q: "Can you cater at scale where there is no kitchen?",
        a: "Yes. We build a full temporary kitchen on site, with the same brigade that cooks at every other event we produce.",
      },
    ],
    nearby: ["bedian-road", "green-acres", "bahria-town-lahore", "johar-town"],
    travelNote:
      "Estate work along Raiwind Road is run out of our Green Acres base. For multi-day builds the production team stages on site, so the crew is present from the first survey peg to the final load-out.",
  },

  {
    slug: "bedian-road",
    name: "Bedian Road",
    shortName: "Bedian Road",
    metaTitle: "Farmhouse Weddings on Bedian Road | Anayat Events",
    metaDescription:
      "Canal-side gardens and farmhouse weddings along Bedian Road, planned with weather contingency and full outdoor production.",
    heroHeadline: "Garden Wedding Planning Along Bedian Road",
    heroKicker: "Canal-side gardens",
    hero: "ae-24",
    lede:
      "The most beautiful trees in Lahore, growing beside roads that flood in one determined hour of rain.",
    rhythm: "editorial",
    intro: {
      heading: "Beauty with a caveat",
      body: [
        "Bedian Road holds the loveliest garden venues near the city — old canopies, water features, and a stillness that no built room reproduces. Couples who choose it are almost always choosing atmosphere over convenience, and they are usually right to.",
        "The caveat is drainage. The approach roads sit low, they flood, and a date anywhere near the monsoon shoulder needs a contingency that is drawn, costed and agreed rather than merely mentioned in a meeting.",
        "The style here leans natural: fewer structures, more candlelight, dinner under trees rather than under a ceiling. It suits smaller and mid-size weddings better than the enormous ones that head further down Raiwind.",
      ],
    },
    experience: {
      heading: "Planning for the weather honestly",
      body: [
        "Every outdoor function our team plans on Bedian Road carries a covered alternative that has been designed and priced, with a stated decision cut-off so nobody is choosing at midnight the night before.",
        "We also route around the problem. Guest and supplier approaches are chosen to avoid the low-lying stretches, and we will happily tell a client that a particular week in August is the wrong week for this particular road.",
      ],
      notes: [
        { title: "A costed wet-weather plan", body: "The covered alternative is drawn and priced at proposal stage, not improvised later." },
        { title: "Routing around standing water", body: "Guest and vehicle approaches avoid the stretches that hold water after heavy rain." },
        { title: "Canopy as architecture", body: "Existing trees are uplit and built around rather than screened behind drape." },
      ],
    },
    services: [
      "farmhouse-events",
      "wedding-planning",
      "mehndi-planning",
      "outdoor-catering",
      "floral-design",
      "private-events",
    ],
    venueTypes: [
      { type: "Canal-side farmhouses", note: "Garden weddings beneath established canopies." },
      { type: "Private estates", note: "Full-week, multi-function commissions on a single site." },
      { type: "Garden marquee sites", note: "Covered builds with lawn overflow for larger counts." },
      { type: "Poolside venues", note: "Evening receptions and mehndi functions around water." },
    ],
    inspiration: {
      heading: "Under the trees",
      body:
        "The design here is mostly about light. Warm uplight into the canopies, candle density at table level, and floral that reads as though it was cut from the garden that morning rather than trucked in from a cold store — even though, of course, it was.",
      palette: [
        { name: "Cream", hex: "#F1EADA" },
        { name: "Soft gold", hex: "#CBA968" },
        { name: "Moss", hex: "#3A4A32" },
        { name: "Water blue", hex: "#3C5560" },
      ],
      gallery: ["ae-24", "ae-01", "ae-25", "ae-14", "ae-10", "ae-19"],
    },
    why: {
      heading: "Why couples on this road trust us",
      body: [
        "Because we are candid about the risk before the deposit rather than after it. Several planners will happily book a July garden wedding on Bedian Road and deal with the consequences in July; we would rather have the awkward conversation in January.",
        "And because when the weather does behave, this is the most rewarding kind of event we produce. A garden dinner under old trees, lit properly, is worth every contingency line it took to protect.",
      ],
    },
    categories: ["outdoor-farmhouse", "floral-installations", "mehndi-celebrations"],
    projects: ["chandeliers-in-the-trees", "jharoka-nights"],
    articles: ["choosing-a-farmhouse-in-lahore", "why-fresh-flowers-matter"],
    faqs: [
      {
        q: "Do you have premises on Bedian Road?",
        a: "No — our base is at Green Acres, Lahore, which is a short run from the Bedian belt. We travel to whichever estate the client has chosen.",
      },
      {
        q: "Is Bedian Road risky during monsoon season?",
        a: "The approach roads do flood. For any date near the season we plan a covered alternative and an alternate approach route as part of the proposal.",
      },
      {
        q: "Can you build under existing trees?",
        a: "Yes, and we prefer it. Canopy uplighting produces a better room than anything we could hang beneath it.",
      },
      {
        q: "How long does it take guests to reach these venues?",
        a: "Roughly forty minutes from central Lahore outside peak hours — we build that into the invitation timings and the arrival plan.",
      },
    ],
    nearby: ["green-acres", "raiwind-road", "dha-lahore", "lahore"],
    travelNote:
      "Bedian Road is one of the closest areas to our Green Acres base, which makes late design changes and same-week site visits unusually easy here.",
  },

  {
    slug: "green-acres",
    name: "Green Acres",
    shortName: "Green Acres",
    metaTitle: "Event Management in Green Acres Lahore | Anayat Events & Catering",
    metaDescription:
      "Green Acres is home to Anayat Events. Our workshop, floral store and kitchen sit at The Palms 7 Farmhouse, serving the whole society.",
    heroHeadline: "Event Management in Green Acres, Lahore",
    heroKicker: "Where we are actually based",
    hero: "ae-26",
    lede:
      "Our one address. Workshop, cold store, kitchen and lawn, all inside the same gate.",
    rhythm: "mirrored",
    intro: {
      heading: "The only place we can call home ground",
      body: [
        "Anayat Events & Catering operates from The Palms 7 Farmhouse in Green Acres Extension. This is our single premises — the workshop where sets are fabricated, the cold store where florals are held, the kitchen where menus are trialled, and the lawn where a great many first meetings happen.",
        "Green Acres itself is a quiet, green society on the eastern edge of the city, close enough to the Bedian and Raiwind estate belts to make it a natural production base and far enough out to have space for one.",
        "For clients hosting inside the society, that proximity is a genuine operational advantage rather than a marketing line.",
      ],
    },
    experience: {
      heading: "What being local here actually changes",
      body: [
        "When an event is in Green Acres, our warehouse is minutes from the site. Late design changes remain possible, a forgotten crate is a ten-minute problem instead of a two-hour one, and builds can start earlier without additional transport cost.",
        "It is also where most families meet us for the first time. Seeing a stage half-assembled in the workshop, or tasting a menu cooked by the brigade that will cook on the night, explains more about how we work than any presentation.",
      ],
      notes: [
        { title: "Workshop on the doorstep", body: "Fabrication and floral storage sit minutes from site, so changes stay genuinely possible." },
        { title: "Tastings in the real kitchen", body: "Menus are tasted in the same kitchen, cooked by the same brigade that will serve your event." },
        { title: "Longer build windows", body: "Local builds can begin earlier in the day without extra transport or crew cost." },
      ],
    },
    services: [
      "luxury-catering",
      "farmhouse-events",
      "wedding-planning",
      "private-events",
      "stage-decoration",
      "birthday-events",
    ],
    venueTypes: [
      { type: "The Palms 7 Farmhouse", note: "Our own base — lawns, kitchen and workshop on a single site, available subject to date." },
      { type: "Neighbouring estates", note: "Minutes from our cold store and fabrication workshop." },
      { type: "Society community lawns", note: "Mid-size family functions close to home." },
      { type: "Private residences", note: "Compact home builds with immediate crew access." },
    ],
    inspiration: {
      heading: "How we design for ourselves",
      body:
        "Work on home ground tends to be the most experimental we do — new floral techniques, prototype stage structures, lighting rigs we want to test at full scale. If something on this site looks unusual, it is probably the first outing of an idea that will travel across the city next season.",
      palette: [
        { name: "Farmhouse white", hex: "#F3EDE1" },
        { name: "Signature gold", hex: "#C6A15B" },
        { name: "Leaf", hex: "#2A3C2B" },
        { name: "Charcoal", hex: "#1A1A18" },
      ],
      gallery: ["ae-26", "ae-25", "ae-04", "ae-22", "ae-11", "ae-18"],
    },
    why: {
      heading: "Why the base matters to every other area",
      body: [
        "Everything we produce anywhere in Lahore is made here first. The stage that goes up in a Gulberg ballroom is assembled in this workshop; the florals installed in a DHA lawn spend the previous night in this cold store; the food served on a Raiwind estate is planned in this kitchen.",
        "That is the reason we keep one base rather than several. A single production house means a single standard, and it is far easier to protect one of those than five.",
      ],
    },
    categories: ["outdoor-farmhouse", "dining-catering", "floral-installations"],
    projects: ["garden-banquet", "chandeliers-in-the-trees"],
    articles: ["outdoor-catering-in-lahore-heat", "planning-a-lahore-wedding-week"],
    faqs: [
      {
        q: "Is this your actual office?",
        a: "Yes. The Palms 7 Farmhouse in Green Acres Extension is our one and only premises — every other area we serve is reached by travelling from here.",
      },
      {
        q: "Can we visit before booking?",
        a: "Please do. Most families come to the farmhouse to see a live build or a stage in the workshop; we are open daily from 12:00 PM to 10:00 PM.",
      },
      {
        q: "Do you host events at the farmhouse itself?",
        a: "We do, subject to availability, and it is often the simplest arrangement for a full wedding week.",
      },
      {
        q: "Where exactly is it?",
        a: "The Palms 7 Farmhouse, Green Acres Extension, Lahore 54000.",
      },
    ],
    nearby: ["bedian-road", "raiwind-road", "dha-lahore", "lahore"],
    travelNote:
      "This is the address every crew, every truck and every floral delivery leaves from. Meetings, tastings and workshop visits all happen here by appointment during opening hours.",
  },

  {
    slug: "wapda-town",
    name: "Wapda Town",
    shortName: "Wapda Town",
    metaTitle: "Family Event Planning & Catering for Wapda Town | Anayat Events",
    metaDescription:
      "Wapda Town home lawns, community halls and multi-generation family celebrations — full decor, seating comfort and in-house catering.",
    heroHeadline: "Family Celebration Planning for Wapda Town",
    heroKicker: "Home lawns & community halls",
    hero: "ae-06",
    lede:
      "Three generations in one room for four hours — which is a design brief, not a detail.",
    rhythm: "column",
    intro: {
      heading: "Family territory, planned as such",
      body: [
        "Wapda Town and the societies around it are family neighbourhoods in the fullest sense: multi-generation households, guest lists shaped by relation rather than invitation, and celebrations that spill comfortably out of the house and onto the lawn.",
        "It changes what a good plan looks like. Elders need real seating with back support and a shaded place to wait. Children will run through the floor plan for the entire evening, so the floor plan had better survive them. Food preferences span sixty years of taste in one room.",
        "Most events here are home functions or community-hall receptions rather than hotel affairs, and the tone is warm rather than formal.",
      ],
    },
    experience: {
      heading: "Designing for how the room behaves",
      body: [
        "Our team plans these celebrations around behaviour rather than photographs. Continuous food service across the evening instead of a single rigid sitting. Sound levels that let a grandmother hold a conversation. Circulation wide enough that the buffet never becomes a bottleneck.",
        "It is less photogenic than a big stage reveal and it is what people actually remember about a family evening.",
      ],
      notes: [
        { title: "Comfort planned first", body: "Seating, shade and step-free access are designed around elders and small children before anything else." },
        { title: "Continuous service", body: "Food runs across the evening rather than landing in one fixed sitting." },
        { title: "Street courtesy", body: "Parking marshalled and drop-off staged so the road stays passable for neighbours." },
      ],
    },
    services: [
      "private-events",
      "birthday-events",
      "walima-planning",
      "luxury-catering",
      "live-bbq-catering",
      "stage-decoration",
    ],
    venueTypes: [
      { type: "Home lawns", note: "Residential builds with independent power so the house supply is untouched." },
      { type: "Community halls", note: "Mid-size receptions and walima formats within the society." },
      { type: "Local marquees", note: "Covered functions for larger extended-family counts." },
      { type: "Rooftop spaces", note: "Compact evening gatherings and milestone dinners." },
    ],
    inspiration: {
      heading: "Warm, generous, unpretentious",
      body:
        "The register here is hospitality rather than spectacle. Abundant table florals in warm tones, string and lantern light instead of hard beams, and a stage that is beautiful but low enough that the family can stand on it together without anyone feeling exhibited.",
      palette: [
        { name: "Butter cream", hex: "#F3E9D2" },
        { name: "Honey gold", hex: "#D2A24C" },
        { name: "Rosewood", hex: "#6B3A34" },
        { name: "Olive", hex: "#5A5F3C" },
      ],
      gallery: ["ae-06", "ae-21", "ae-17", "ae-09", "ae-08", "ae-16"],
    },
    why: {
      heading: "Why families here work with us",
      body: [
        "Because we will work honestly to a defined number. A great many celebrations in this area have a real ceiling on them, and the useful thing a planner can do is say clearly what is achievable at that figure before anyone commits, then hit it without surprises.",
        "And because the small courtesies matter more than the grand gesture here — a chair carried over to an elderly relative, a plate sent out to the drivers, food still hot at eleven. Those are decisions made by a crew that was briefed to care, and that is the part we can promise.",
      ],
    },
    categories: ["dining-catering", "lounges-seating", "wedding-stages"],
    projects: ["garden-banquet", "the-long-white"],
    articles: ["what-a-wedding-actually-costs", "the-service-standard-nobody-talks-about"],
    faqs: [
      {
        q: "Do you have an office in Wapda Town?",
        a: "No. We are based only at Green Acres, Lahore, and our team travels to Wapda Town for consultations, surveys and event days.",
      },
      {
        q: "Will you take on smaller family functions?",
        a: "Yes — home functions from around forty guests upward, with full setup, service and clear-down.",
      },
      {
        q: "Can you work within a fixed budget?",
        a: "We will tell you honestly what is achievable at your number before you commit to anything, including when the answer is that it is not enough.",
      },
      {
        q: "Is street parking a problem here?",
        a: "It can be, so we marshal it and stage the drop-off to keep the road passable for residents throughout the evening.",
      },
    ],
    nearby: ["johar-town", "model-town", "valencia-town", "lahore"],
    travelNote:
      "Wapda Town is served from our Green Acres base like every other area. Home surveys are usually arranged within a few days so the lawn, power and access can be measured properly before design begins.",
  },
  {
    slug: "valencia-town",
    name: "Valencia Town",
    shortName: "Valencia",
    metaTitle: "Event Planner in Valencia Town, Lahore | Anayat Events",
    metaDescription:
      "Valencia Town weddings and family celebrations — wide-plot home lawns, the society club and marquee receptions, planned and catered by one Lahore team.",
    heroHeadline: "Wedding & Event Planning for Valencia Town, Lahore",
    heroKicker: "Wide plots & society halls",
    hero: "ae-09",
    lede:
      "Some of the most generous private lawns on this side of the city — and plot width changes what a plan can be.",
    rhythm: "mirrored",
    intro: {
      heading: "A society built with room to host",
      body: [
        "Valencia was laid out with larger plots than most of the societies around it, and that single planning decision shapes almost every celebration held here. A kanal-plus lawn takes a full marquee, a built stage and a working catering line without the compromises that a tighter plot forces.",
        "It means families in Valencia often host at home where elsewhere they would have booked a hall — and hosting at home is a different brief. The house has to stay liveable while a production runs through it, and the event has to end without the family waking up inside a building site.",
        "The society's own club and community facilities take the mid-size receptions, and the marquee belt along the main approach handles the larger guest counts when a home lawn is not the answer.",
      ],
    },
    experience: {
      heading: "What a wider plot actually changes",
      body: [
        "Width buys you sightlines. On a generous Valencia lawn we can set the stage far enough back that guests see it across an open foreground instead of over each other's heads, run a service aisle that never crosses the guest route, and place the kitchen line far enough from the seating that the noise and heat of it never reach a table.",
        "It also means we can build rather than rent. There is space to dry-assemble a set on site, which is the difference between a stage that looks made for the room and one that was clearly delivered on a truck.",
        "The constraint here is rarely space. It is power, and the fact that a domestic supply was never designed to carry a lighting rig and a catering line at the same time.",
      ],
      notes: [
        {
          title: "Independent power, always",
          body: "Our own silenced generation carries the event load so the house supply runs the house and nothing else.",
        },
        {
          title: "Lawn protection",
          body: "Load-spread flooring under heavy structures and traffic routes, so the grass survives to the following week.",
        },
        {
          title: "Same-week clear-down",
          body: "Full strike and removal the morning after, not across the following days — the family gets the garden back.",
        },
      ],
    },
    services: [
      "wedding-planning",
      "barat-planning",
      "walima-planning",
      "luxury-catering",
      "stage-decoration",
      "floral-design",
    ],
    venueTypes: [
      { type: "Private home lawns", note: "Kanal and larger plots that take a full marquee and built stage." },
      { type: "Society club & halls", note: "Mid-size receptions and walima formats within Valencia itself." },
      { type: "Marquees on the approach", note: "Larger guest counts along the main road into the society." },
      { type: "Rooftop terraces", note: "Compact nikah ceremonies and milestone dinners." },
    ],
    inspiration: {
      heading: "Open, green and lit from within",
      body:
        "A wide lawn rewards restraint. We light Valencia gardens from inside the planting rather than flooding them from the perimeter, keep the marquee lining pale so the space reads as larger after dark, and let the depth of the plot — not the scale of the set — do the work.",
      palette: [
        { name: "Garden ivory", hex: "#F2EDE1" },
        { name: "Deep leaf", hex: "#3E4B36" },
        { name: "Warm brass", hex: "#C9A15A" },
        { name: "Dusk blue", hex: "#3A4557" },
      ],
      gallery: ["ae-09", "ae-04", "ae-19", "ae-21", "ae-01", "ae-18"],
    },
    why: {
      heading: "Why Valencia families work with us",
      body: [
        "Because a home function in Valencia is a production running through somebody's actual house, and the families who host well here care as much about how the week around the event is handled as the evening itself. Access times, where the trucks stand, which gate the crew uses, when the noise stops.",
        "And because everything arrives from one place. The design team, the floral crew and the kitchen brigade are the same house, so there is no morning on a Valencia lawn where three suppliers are discovering each other's plans for the first time.",
      ],
    },
    categories: ["outdoor-farmhouse", "wedding-stages", "dining-catering"],
    projects: ["garden-banquet", "chandeliers-in-the-trees"],
    articles: ["choosing-a-farmhouse-in-lahore", "outdoor-catering-in-lahore-heat"],
    faqs: [
      {
        q: "Do you have an office in Valencia Town?",
        a: "No. Our only base is The Palms 7 Farmhouse at Green Acres, and our team travels to Valencia for site surveys, consultations and event days.",
      },
      {
        q: "Can our home lawn take a full marquee and stage?",
        a: "Most kanal-plus Valencia plots can. We measure the usable lawn, the access width for the trucks and the power position on a site survey before promising anything — width on paper and width past a gate post are rarely the same number.",
      },
      {
        q: "Will the event damage the garden?",
        a: "We use load-spread flooring beneath structures and traffic routes. Grass under a marquee flattens and recovers; grass under an unprotected truck route does not, so we plan the route before the first vehicle arrives.",
      },
      {
        q: "How long does setup and clear-down take on a home lawn?",
        a: "Typically two days in for a full wedding build and one morning out. We strike the morning after rather than spreading it across the week, because a family hosting at home wants their garden back.",
      },
    ],
    nearby: ["johar-town", "wapda-town", "raiwind-road", "lahore"],
    travelNote:
      "Valencia sits a short run from our Green Acres base along the Raiwind side of the city, so surveys and pre-event visits are easy to arrange and the production convoy has a clear approach on the day.",
  },
  {
    slug: "ferozepur-road",
    name: "Ferozepur Road",
    shortName: "Ferozepur Road",
    metaTitle: "Event Planner on Ferozepur Road, Lahore | Anayat Events",
    metaDescription:
      "Ferozepur Road marquees, banquet halls and hotel ballrooms — wedding planning, decor and catering timed around one of Lahore's busiest corridors.",
    heroHeadline: "Event Planning & Catering Along Ferozepur Road",
    heroKicker: "The banquet corridor",
    hero: "ae-02",
    lede:
      "Lahore's densest run of marquees and banquet halls — and the traffic that decides when your guests actually arrive.",
    rhythm: "stacked",
    intro: {
      heading: "A corridor, not a neighbourhood",
      body: [
        "Ferozepur Road is where a very large share of Lahore's weddings are actually held. The stretch from Kalma Chowk out past Gajjumata carries marquee after banquet hall after hotel ballroom, and for families across the south of the city it is the default answer to where the function will be.",
        "Planning here has less to do with neighbourhood character and more to do with the road itself. It is one of the busiest corridors in Lahore, it is perpetually under one phase of work or another, and the Orange Line runs its length. Guests do not arrive when the invitation says. They arrive when the road lets them.",
        "So the plan has to absorb that. We do not design a Ferozepur Road evening that depends on four hundred people being seated at the same moment, because that moment does not exist on this road.",
      ],
    },
    experience: {
      heading: "Planning around a road that sets the timetable",
      body: [
        "The first thing we do for a Ferozepur Road function is establish the real arrival curve rather than the invited one — usually a long, uneven spread rather than a wave. That single number then drives everything: when the welcome service opens, how long the lounge has to hold people comfortably, and the latest minute at which dinner can be called without stranding half the guest list.",
        "The second thing is understanding the venue's own rules. The commercial halls along this corridor are experienced operators with fixed slot times, in-house decor clauses and hard clear-down deadlines because another function follows yours. A plan that ignores the contract gets stopped mid-evening.",
        "We read the venue agreement before we design. It is unromantic and it is the single most useful hour of the whole commission.",
      ],
      notes: [
        {
          title: "Arrival-curve planning",
          body: "Service timings built around how guests actually reach the venue, not the time printed on the card.",
        },
        {
          title: "Venue contract read first",
          body: "Slot times, exclusivity clauses and clear-down deadlines checked before a single design decision is made.",
        },
        {
          title: "Load-in inside the window",
          body: "Setup sequenced to the hall's access hours, with the heavy build done before the corridor seizes up.",
        },
      ],
    },
    services: [
      "wedding-planning",
      "barat-planning",
      "walima-planning",
      "indoor-catering",
      "venue-management",
      "stage-decoration",
    ],
    venueTypes: [
      { type: "Banquet halls", note: "The corridor's core — fixed slots, in-house rules, fast turnarounds." },
      { type: "Marquee complexes", note: "Multi-hall sites running several functions on the same evening." },
      { type: "Hotel ballrooms", note: "Formal walima and corporate formats with their own catering clauses." },
      { type: "Community & trust halls", note: "Mid-size family receptions along the southern stretch." },
    ],
    inspiration: {
      heading: "Making a standard hall stop looking like one",
      body:
        "Most halls on this road come with a ceiling you did not choose and a carpet you would not have picked. The work is concealment and redirection — drop the perceived ceiling with drape, pull the eye to a deep front-lit stage, and light the room warm so the existing finishes recede instead of competing.",
      palette: [
        { name: "Champagne", hex: "#E8D9BC" },
        { name: "Oxblood", hex: "#5C2B2B" },
        { name: "Antique gold", hex: "#BE9A4E" },
        { name: "Smoke", hex: "#4A4A4C" },
      ],
      gallery: ["ae-02", "ae-07", "ae-05", "ae-23", "ae-13", "ae-06"],
    },
    why: {
      heading: "Why families on this corridor work with us",
      body: [
        "Because we treat the hall as a constraint to be designed around rather than a backdrop to be fought. A venue on Ferozepur Road has rules, and the families who have the smoothest evenings are the ones whose planner knew those rules in week one instead of discovering them at load-in.",
        "And because our catering is our own. On a corridor where many venues push an in-house kitchen or a preferred list, we will tell you plainly where we can bring our brigade and where the contract does not allow it — before you book the hall, not after.",
      ],
    },
    categories: ["wedding-stages", "dining-catering", "lounges-seating"],
    projects: ["crystal-rain-walima", "ivory-salon"],
    articles: ["planning-a-lahore-wedding-week", "the-service-standard-nobody-talks-about"],
    faqs: [
      {
        q: "Do you have an office on Ferozepur Road?",
        a: "No. We work from our Green Acres base only, and our team travels out to venues along Ferozepur Road for recces, load-ins and event days.",
      },
      {
        q: "Our hall says decor must be done in-house. Can you still work with us?",
        a: "Sometimes. Some venues restrict decor but allow an external planner to run the function, and a few restrict catering rather than decor. Send us the agreement and we will tell you exactly what is open to us before you sign anything.",
      },
      {
        q: "How do you handle guests arriving late because of the traffic?",
        a: "We plan for it. The welcome service opens early and runs long, the lounge is sized to hold people comfortably rather than seat them immediately, and dinner is called against a decision point we agree with you in advance.",
      },
      {
        q: "Can you set up between two functions on the same day?",
        a: "Yes, where the venue's turnaround window is realistic. We will say so honestly if it is not — a slot that leaves ninety minutes for a full build is a slot that produces a half-finished room.",
      },
    ],
    nearby: ["model-town", "johar-town", "cantt-askari", "lahore"],
    travelNote:
      "Ferozepur Road is reached from Green Acres well ahead of the evening peak. We schedule heavy load-in early in the venue's access window precisely because this corridor does not forgive a late convoy.",
  },
  {
    slug: "canal-road",
    name: "Canal Road",
    shortName: "Canal Road",
    metaTitle: "Event Planner on Canal Road, Lahore | Anayat Events",
    metaDescription:
      "Canal Road weddings — canal-side lawns, university-belt halls and garden venues along Canal Bank, planned, decorated and catered by one Lahore team.",
    heroHeadline: "Wedding & Event Planning Along Canal Road, Lahore",
    heroKicker: "Canal-side lawns & gardens",
    hero: "ae-03",
    lede:
      "The greenest address in the city to hold an evening — and the one most exposed to the season.",
    rhythm: "editorial",
    intro: {
      heading: "Lahore's green spine",
      body: [
        "Canal Bank Road runs the length of the city under a canopy of old trees, and the venues strung along it trade on exactly that: mature planting, water, and a setting that needs very little help to look beautiful. For an outdoor wedding in season it is one of the most flattering settings Lahore has.",
        "It also connects a wide spread of the city, which is why families from Gulberg, Model Town, Johar Town and the Cantt all end up celebrating somewhere along it. The guest list for a Canal Road function is usually the most geographically scattered we plan for.",
        "The trade-off is exposure. These are open, tree-shaded, water-adjacent spaces, and that means humidity, insects at dusk, and a real dependence on the weather holding.",
      ],
    },
    experience: {
      heading: "Designing with the trees rather than against them",
      body: [
        "The mistake on a canal-side lawn is to build a set that ignores the planting and then fight the trees with lighting. We do the opposite: the mature canopy becomes the architecture, lit from beneath so the branches read as a ceiling, and the built structure stays low and deliberately secondary.",
        "Practically, that means a lighting plot drawn on site after dark rather than from a plan, because no drawing tells you where an eighty-year-old tree actually casts shadow.",
        "The other discipline is the weather contingency. Every Canal Road commission carries a defined wet plan agreed in writing — what gets covered, who calls it, and by what hour — so a change in the forecast is a decision rather than an argument.",
      ],
      notes: [
        {
          title: "Lighting plotted on site",
          body: "The rig is designed after dark under the actual canopy, because a tree's shadow is not on any drawing.",
        },
        {
          title: "A written wet plan",
          body: "Covered contingency, a named decision-maker and a cut-off hour agreed before the week of the event.",
        },
        {
          title: "Dusk comfort",
          body: "Insect management, ground heating in the cold months and shade held late in the warm ones.",
        },
      ],
    },
    services: [
      "wedding-planning",
      "nikah-planning",
      "outdoor-catering",
      "floral-design",
      "stage-decoration",
      "private-events",
    ],
    venueTypes: [
      { type: "Canal-side lawns", note: "Open garden venues under mature canopy along Canal Bank." },
      { type: "Garden restaurants", note: "Smaller nikah ceremonies and family dinners with an existing setting." },
      { type: "Institutional halls", note: "The university belt's halls and auditoria for formal and corporate formats." },
      { type: "Club lawns", note: "Members' grounds set back from the road for mid-size receptions." },
    ],
    inspiration: {
      heading: "Candlelight under an old canopy",
      body:
        "The palette follows the setting rather than overriding it — greens already present in the planting, ivory and candle amber for warmth after sunset, and almost no hard colour. Light sits low: candle fields, lanterns at ground level and warm uplight into the branches, so the canopy glows and the sky stays dark above it.",
      palette: [
        { name: "Canal green", hex: "#42513F" },
        { name: "Candle amber", hex: "#D8A65D" },
        { name: "Bone", hex: "#EFE8DA" },
        { name: "Night indigo", hex: "#2C3340" },
      ],
      gallery: ["ae-03", "ae-19", "ae-20", "ae-09", "ae-04", "ae-18"],
    },
    why: {
      heading: "Why families choose us for canal-side events",
      body: [
        "Because outdoor evenings are where a planner is genuinely tested. Anyone can dress a hall. A canal-side lawn asks you to have a real answer for rain, for dew on the seating, for insects at exactly the hour guests sit down, and for a lighting rig that has to look effortless under trees that were not planted for you.",
        "And because our kitchen is used to cooking away from a building. Outdoor catering at this standard is a logistics problem before it is a culinary one, and it is one we solve from our own farmhouse base most weeks of the season.",
      ],
    },
    categories: ["outdoor-farmhouse", "floral-installations", "nikah-ceremonies"],
    projects: ["chandeliers-in-the-trees", "bloom-curtain-nikah"],
    articles: ["outdoor-catering-in-lahore-heat", "why-fresh-flowers-matter"],
    faqs: [
      {
        q: "Do you have an office on Canal Road?",
        a: "No. Our single base is at Green Acres, and our team travels to Canal Road venues for site visits, lighting recces and event days.",
      },
      {
        q: "What happens if it rains?",
        a: "Every outdoor commission carries a written wet plan: what is covered, who makes the call and the hour by which it is made. Agreeing that in advance is what keeps a forecast change from becoming a crisis on the day.",
      },
      {
        q: "Is an evening under the trees warm enough in winter?",
        a: "With planning, yes. Ground-level heating placed along the seating rather than at the edges, and a floor covering that stops cold rising, make December canal-side evenings genuinely comfortable.",
      },
      {
        q: "Can you handle insects near the water at dusk?",
        a: "We treat the ground and planting in advance and place light sources so the brightest points sit away from where people are seated. It is a standard part of the plan for any venue on the canal, not an extra.",
      },
    ],
    nearby: ["gulberg", "model-town", "johar-town", "cantt-askari"],
    travelNote:
      "Canal Road venues are served from our Green Acres base. Lighting recces here are always scheduled after dark, because the canopy that makes these venues beautiful is also what makes a daytime survey misleading.",
  },
];

const locationMap = new Map(locations.map((l) => [l.slug, l]));

export function getLocation(slug: string): LocationArea | undefined {
  return locationMap.get(slug);
}

/** Highlighted on the main Areas page above the full explorer. */
export const featuredAreaSlugs = ["dha-lahore", "bahria-town-lahore", "gulberg", "raiwind-road"];
