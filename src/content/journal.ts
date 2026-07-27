export interface Article {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: "Planning" | "Design" | "Catering" | "Venues";
  date: string;
  readingTime: string;
  hero: string;
  excerpt: string;
  body: { heading?: string; paragraphs: string[] }[];
  related: string[];
}

export const articles: Article[] = [
  {
    slug: "planning-a-lahore-wedding-week",
    title: "How to Plan a Lahore Wedding Week Without Losing the Month Before It",
    metaTitle: "How to Plan a Lahore Wedding Week | Anayat Events Journal",
    metaDescription:
      "A working timeline for planning a four-function wedding week in Lahore — when to book, when to stop changing things, and what actually goes wrong.",
    category: "Planning",
    date: "2026-06-18",
    readingTime: "7 min",
    hero: "ae-22",
    excerpt:
      "Four functions, three families, fourteen usable weekends in the season. A working timeline from nine months out to the morning of the barat.",
    body: [
      {
        paragraphs: [
          "A Lahore wedding is not one event. It is four or five events wearing the same surname, and almost everything that goes wrong across that week is a coordination failure rather than a design one.",
          "What follows is the timeline we actually work to, written plainly, so you can hold your planner to it — including us.",
        ],
      },
      {
        heading: "Nine to six months out: the decisions that cost money later",
        paragraphs: [
          "Two things get fixed here and nothing else matters as much: the dates and the guest count. Every other number in your budget is derived from them.",
          "Book venues in this window. Winter dates in Lahore are effectively gone by August, and the venues still available in October are available for a reason.",
          "Set a guest count and defend it. Two hundred additional guests will cost you more than every flower in the week combined.",
        ],
      },
      {
        heading: "Six to three months out: design and contracts",
        paragraphs: [
          "Design direction is agreed, elevation drawings issued, floral schedule specified by variety, menus developed and tasted.",
          "Every supplier should be contracted in this window, with payment tied to delivery milestones rather than to the calendar. A supplier paid in full in advance has no remaining incentive on the day.",
        ],
      },
      {
        heading: "Eight to four weeks out: stop changing things",
        paragraphs: [
          "Fabrication begins. Stages, arches and screens go into build. This is the point where changes stop being free, and a good planner will say so clearly rather than absorbing them quietly and cutting corners elsewhere.",
          "Final headcount, seating protocol and the run-of-show for each function are locked. Both families should have the same document.",
        ],
      },
      {
        heading: "The last two weeks: logistics only",
        paragraphs: [
          "Nothing creative happens now. Load-in schedules, crew rosters, vehicle passes, kitchen ordering, weather contingency confirmation and rehearsals.",
          "If your planner is still discussing palette in this window, the week is already in trouble.",
        ],
      },
      {
        heading: "The morning of",
        paragraphs: [
          "You should have nothing to do. That is the whole test. If a family member is on the phone to a florist at noon, the plan failed somewhere in month six.",
        ],
      },
    ],
    related: ["choosing-a-farmhouse-in-lahore", "what-a-wedding-actually-costs", "why-fresh-flowers-matter"],
  },
  {
    slug: "choosing-a-farmhouse-in-lahore",
    title: "Choosing a Farmhouse in Lahore: What Nobody Shows You on the Site Visit",
    metaTitle: "Choosing a Farmhouse Venue in Lahore | Anayat Events Journal",
    metaDescription:
      "How to assess a Lahore farmhouse venue properly — power, drainage, kitchen access, parking depth and the questions that reveal the truth.",
    category: "Venues",
    date: "2026-05-30",
    readingTime: "6 min",
    hero: "ae-25",
    excerpt:
      "Every farmhouse looks beautiful at four in the afternoon in November. Here is what to check instead.",
    body: [
      {
        paragraphs: [
          "We are based on a farmhouse, and we build on them most weekends of the season. The gap between how these estates present and how they perform is the widest in the industry.",
        ],
      },
      {
        heading: "Ask about power, then ask again",
        paragraphs: [
          "Almost every estate claims adequate generator capacity. Very few have enough to run a kitchen, a lighting design and a sound system simultaneously at eleven at night in December.",
          "Ask for the generator rating in kVA, not a reassurance. Then assume you will bring your own anyway, because a competent planner will.",
        ],
      },
      {
        heading: "Walk the lawn, ideally after rain",
        paragraphs: [
          "Drainage is the single most expensive surprise in farmhouse work. A lawn that holds water turns to mud within an hour and takes your flooring budget with it.",
          "If you cannot visit after rain, look for moss lines, uneven settling and where the ground slopes. It tells you most of what you need.",
        ],
      },
      {
        heading: "Measure the approach, not just the venue",
        paragraphs: [
          "Bedian and Raiwind approach roads flood, narrow unexpectedly and are unlit. Two hundred guests arriving at once on an unmarked road is a logistics event in itself.",
          "Check the gate width against a catering truck, not a car.",
        ],
      },
      {
        heading: "Where is the kitchen going to be?",
        paragraphs: [
          "There usually isn't one. Ask where a field kitchen can stand — flat ground, water access, downwind of seating, and close enough that service is not a hike across a lawn.",
          "If the only viable spot is a hundred metres from the dining, your guests will eat lukewarm food no matter who cooks it.",
        ],
      },
      {
        heading: "Then look at the trees",
        paragraphs: [
          "Once the practical questions are answered, choose on canopy. Mature trees uplit at night are the best set element available in Lahore, and no ceiling drape has ever matched them.",
        ],
      },
    ],
    related: ["planning-a-lahore-wedding-week", "outdoor-catering-in-lahore-heat", "what-a-wedding-actually-costs"],
  },
  {
    slug: "why-fresh-flowers-matter",
    title: "Why Fresh Flowers Matter More Than the Stage Behind Them",
    metaTitle: "Fresh vs Artificial Wedding Flowers in Lahore | Anayat Events",
    metaDescription:
      "The case for fresh floral work at Lahore weddings — conditioning, seasonal varieties, heat tolerance and why rotated orders always show.",
    category: "Design",
    date: "2026-05-12",
    readingTime: "5 min",
    hero: "ae-14",
    excerpt:
      "Flowers have a shelf life measured in hours. Everything worth knowing about floral work follows from that single fact.",
    body: [
      {
        paragraphs: [
          "A stage frame lasts years. A flower lasts a day, sometimes less in Lahore heat. That asymmetry is why floral is the element most often quietly compromised, and the one guests notice fastest.",
        ],
      },
      {
        heading: "The rotated order",
        paragraphs: [
          "The most common shortcut in the industry is one floral order moved across three or four functions of the same wedding.",
          "By the walima it shows — browning edges, drooping heads, and a room that smells of nothing. Fresh cutting for each function costs more because it is more.",
        ],
      },
      {
        heading: "Conditioning is not optional",
        paragraphs: [
          "Stems need hours in cold storage before installation. Skip it and the arrangement that looked perfect at six in the evening is visibly tired by ten.",
          "Ask your planner where their cold store is. If the answer is vague, so is the flower.",
        ],
      },
      {
        heading: "Specify by variety and stem count",
        paragraphs: [
          "A proposal that says 'floral wall' means nothing. A proposal that says the variety, colour and stem count is a commitment you can hold someone to.",
        ],
      },
      {
        heading: "What survives a Lahore summer",
        paragraphs: [
          "Orchids, anthurium, carnation, tuberose and heat-tolerant greenery hold beautifully outdoors. Peony and hydrangea will collapse in June, whatever anyone promises.",
          "Designing with the season rather than against it is not a compromise — it is why some rooms look effortless and others look like they are struggling.",
        ],
      },
    ],
    related: ["designing-a-stage-that-photographs", "planning-a-lahore-wedding-week", "choosing-a-farmhouse-in-lahore"],
  },
  {
    slug: "designing-a-stage-that-photographs",
    title: "Designing a Stage That Photographs, Not Just One That Looks Good in Person",
    metaTitle: "Wedding Stage Design & Lighting in Lahore | Anayat Events",
    metaDescription:
      "How wedding stages are designed for photography in Lahore — proportion, depth, lighting layers and the three mistakes that ruin most stage photos.",
    category: "Design",
    date: "2026-04-24",
    readingTime: "6 min",
    hero: "ae-13",
    excerpt:
      "Ninety per cent of the photographs from your wedding are taken in front of one wall. It should be designed for the camera, not the room.",
    body: [
      {
        paragraphs: [
          "The stage is the most photographed object of a Pakistani wedding, and most stages are designed as if they will only ever be looked at directly.",
        ],
      },
      {
        heading: "Mistake one: wrong proportion for the room",
        paragraphs: [
          "A stage drawn without measuring the ceiling reads as either overwhelming or apologetic. We draw every stage against the actual room elevation and the seated eyeline of the furthest guest.",
        ],
      },
      {
        heading: "Mistake two: no depth",
        paragraphs: [
          "A flat wall gives light nothing to fall across, so the camera records it as a colour field. Depth — recesses, layered arches, foreground florals — is what produces shadow, and shadow is what makes a photograph look three-dimensional.",
        ],
      },
      {
        heading: "Mistake three: a busy centre",
        paragraphs: [
          "The couple must read clearly. Anything intricate directly behind their heads competes with their faces in every single frame.",
          "Keep the centre calm and let the complexity live at the edges.",
        ],
      },
      {
        heading: "Lighting is the design, not the finish",
        paragraphs: [
          "Key, fill and separation lighting tested against real skin tones before the event. A flat wash from the front flattens everyone and turns warm decor grey.",
          "We share the lighting plot with the photographer in advance, because the person shooting into it should know what they are shooting into.",
        ],
      },
    ],
    related: ["why-fresh-flowers-matter", "planning-a-lahore-wedding-week", "the-service-standard-nobody-talks-about"],
  },
  {
    slug: "the-service-standard-nobody-talks-about",
    title: "The Service Standard Nobody Talks About: Getting Every Table Served Together",
    metaTitle: "Wedding Catering Service Standards in Lahore | Anayat Events",
    metaDescription:
      "Why service ratios, pass timing and table geometry decide whether wedding food is remembered well — from a Lahore caterer with an in-house kitchen.",
    category: "Catering",
    date: "2026-04-02",
    readingTime: "5 min",
    hero: "ae-04",
    excerpt:
      "Guests forgive a modest stage. They do not forgive being the last table served, twenty minutes after the first.",
    body: [
      {
        paragraphs: [
          "Ask anyone about a wedding they attended six months ago and they will not describe the centrepieces. They will tell you whether the food was good and whether it arrived hot.",
        ],
      },
      {
        heading: "The number that matters",
        paragraphs: [
          "Our standard is every table served within eight minutes of the first plate leaving the pass. That number determines crew size, pass placement and menu format — not the other way round.",
          "Most catering failures are staffing decisions made after the menu was priced.",
        ],
      },
      {
        heading: "Table geometry is a service decision",
        paragraphs: [
          "Aisle widths, distance to the pass and the position of the furthest table are service constraints before they are aesthetic ones. A beautiful layout with one narrow route to the kitchen guarantees cold plates at the back of the room.",
        ],
      },
      {
        heading: "Buffets should never be one queue",
        paragraphs: [
          "A single long buffet creates a single long line. Mirrored islands with duplicated dishes halve the wait and stop the room clustering in one corner.",
        ],
      },
      {
        heading: "Why the kitchen should be in-house",
        paragraphs: [
          "When catering is subcontracted, nobody in the room owns the outcome. Our kitchen is ours, our brigade is ours, and when a function runs forty minutes late the decision about holding the food is made by someone who will answer for it.",
        ],
      },
    ],
    related: ["outdoor-catering-in-lahore-heat", "what-a-wedding-actually-costs", "designing-a-stage-that-photographs"],
  },
  {
    slug: "outdoor-catering-in-lahore-heat",
    title: "Outdoor Catering in Lahore Heat: Building a Kitchen Where There Isn't One",
    metaTitle: "Outdoor Catering & Field Kitchens in Lahore | Anayat Events",
    metaDescription:
      "How outdoor catering works at Lahore farmhouses — field kitchens, cold chain, generator planning and keeping food safe and hot across an open lawn.",
    category: "Catering",
    date: "2026-03-14",
    readingTime: "6 min",
    hero: "ae-18",
    excerpt:
      "No building, no power, no refrigeration. Everything arrives on a truck, and the cold chain has to hold in forty degrees.",
    body: [
      {
        paragraphs: [
          "Outdoor catering is a logistics discipline dressed as hospitality. The food is the visible half; the invisible half is a temporary kitchen built to indoor standards on a lawn.",
        ],
      },
      {
        heading: "The cold chain is the whole job",
        paragraphs: [
          "Refrigerated transport, on-site holding, temperature logs from store to service. In a Lahore summer this is not a formality — it is the difference between a wedding and an incident.",
          "Ask any caterer how they hold temperature on a lawn. The specificity of the answer tells you everything.",
        ],
      },
      {
        heading: "Power planning",
        paragraphs: [
          "Kitchen load must sit on its own generator circuit, separate from lighting and sound. Shared load is why the lights dim every time a warmer cycles.",
        ],
      },
      {
        heading: "Zone the service, don't centralise it",
        paragraphs: [
          "One central pass on a large lawn guarantees that distance decides who eats last. Zoned service points with their own passes solve it.",
        ],
      },
      {
        heading: "Live fire, done properly",
        paragraphs: [
          "Grill counters need extraction and wind-direction planning, or the marquee fills with smoke and the counter becomes the thing people avoid.",
          "Placed correctly, the same counter becomes the social centre of the evening.",
        ],
      },
      {
        heading: "And then it all leaves",
        paragraphs: [
          "Full strike, waste removal, site handover — usually the same night. A lawn that looks untouched the next morning is the last deliverable.",
        ],
      },
    ],
    related: ["choosing-a-farmhouse-in-lahore", "the-service-standard-nobody-talks-about", "planning-a-lahore-wedding-week"],
  },
  {
    slug: "what-a-wedding-actually-costs",
    title: "What a Lahore Wedding Actually Costs — and Which Line Items Move the Number",
    metaTitle: "Lahore Wedding Cost Breakdown | Anayat Events Journal",
    metaDescription:
      "An honest breakdown of what drives wedding cost in Lahore — guest count, function count, floral volume, season and the savings that are worth making.",
    category: "Planning",
    date: "2026-02-20",
    readingTime: "7 min",
    hero: "ae-07",
    excerpt:
      "Guest count first, function count second, fresh floral third. Almost everything else is noise.",
    body: [
      {
        paragraphs: [
          "Families often begin by trying to economise on decor, which is close to the least effective lever available. Here is what actually moves a Lahore wedding budget.",
        ],
      },
      {
        heading: "Guest count is the entire conversation",
        paragraphs: [
          "Every additional hundred guests brings food, seating, crockery, service staff, tables, lighting coverage, parking and often a larger venue. It compounds across every function of the week.",
          "Cutting a guest list by fifty is worth more than cutting your floral budget in half, and the room will look better for it.",
        ],
      },
      {
        heading: "Function count multiplies everything",
        paragraphs: [
          "Five functions is not five times one function, but it is closer to that than most families expect. Each one needs its own build, crew, menu and floral cut.",
          "Combining the nikah and the mehndi, where the families are comfortable with it, is the single largest structural saving available.",
        ],
      },
      {
        heading: "Season is a real number",
        paragraphs: [
          "A November Saturday and a March Saturday can differ by twenty to thirty per cent for the identical event. The weather in October and March is genuinely excellent, and demand is not.",
        ],
      },
      {
        heading: "Where not to save",
        paragraphs: [
          "Service staff ratios, generator capacity and weather contingency. Every one of those cuts is invisible in the proposal and extremely visible on the night.",
        ],
      },
      {
        heading: "Where saving is sensible",
        paragraphs: [
          "Fabricated set complexity, imported floral varieties, and the number of separate photo installations. A single strong gesture beats four modest ones at a fraction of the cost.",
        ],
      },
    ],
    related: ["planning-a-lahore-wedding-week", "why-fresh-flowers-matter", "the-service-standard-nobody-talks-about"],
  },
  {
    slug: "an-intimate-nikah-at-home",
    title: "An Intimate Nikah at Home: Designing for Forty People and Total Silence",
    metaTitle: "Intimate Nikah at Home — Design Guide | Anayat Events Lahore",
    metaDescription:
      "How to design an intimate home nikah in Lahore — acoustics, sightlines, restrained florals and turning the room over for lunch afterwards.",
    category: "Design",
    date: "2026-01-28",
    readingTime: "5 min",
    hero: "ae-15",
    excerpt:
      "Small events are harder. With forty guests there is nowhere to hide a weak dish or a wilting arrangement.",
    body: [
      {
        paragraphs: [
          "The home nikah is our favourite commission and the most exposing. Nothing is at a distance; every detail is at arm's length.",
        ],
      },
      {
        heading: "Acoustics before aesthetics",
        paragraphs: [
          "A nikah is words. If the last row cannot hear them, nothing else you did matters. Soft furnishing, discreet microphone placement and speakers positioned to avoid echo off hard residential walls.",
        ],
      },
      {
        heading: "One decisive floral gesture",
        paragraphs: [
          "A single wall or arch, properly built, beats five arrangements scattered across a drawing room. Restraint reads as confidence at this scale.",
        ],
      },
      {
        heading: "Design for seated stillness",
        paragraphs: [
          "Guests will sit for a long stretch without moving. Real back support, sightlines to the couple from every chair, and temperature control planned for a full room.",
        ],
      },
      {
        heading: "The turnaround",
        paragraphs: [
          "Most home nikahs become a lunch within the hour. We rehearse that changeover in advance — who moves which chair, in what order, and how the room is revealed a second time.",
          "Done well, guests experience it as a second act rather than a reset.",
        ],
      },
    ],
    related: ["why-fresh-flowers-matter", "the-service-standard-nobody-talks-about", "planning-a-lahore-wedding-week"],
  },
];

export const articleCategories = ["Planning", "Design", "Catering", "Venues"] as const;

export type ArticleCategory = (typeof articleCategories)[number];

const map = new Map(articles.map((a) => [a.slug, a]));

export function getArticle(slug: string) {
  return map.get(slug);
}

export const articlesByDate = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));

/* ---------------------------------------------------------------------------
 * Editorial layer.
 *
 * The Journal is edited, not archived: a masthead note, a small set of
 * featured stories laid out unequally, and picks chosen by hand. Everything
 * below is written editorially — nothing is generated from the article list.
 * ------------------------------------------------------------------------- */

export interface ArticleExtras {
  /** Standfirst rendered under the hero — a magazine deck, not a summary. */
  deck: string;
  /** One line lifted from the piece and set large, mid-read. */
  pullQuote: string;
  /** Inline plate ids, dropped between sections at reading pace. */
  gallery: string[];
}

const extras: Record<string, ArticleExtras> = {
  "planning-a-lahore-wedding-week": {
    deck: "Four functions, three families, and fourteen usable weekends in the season. The timeline we actually work to — written plainly enough that you can hold us to it.",
    pullQuote:
      "If a family member is on the phone to a florist at noon on the day, the plan failed somewhere in month six.",
    gallery: ["ae-01", "ae-11"],
  },
  "choosing-a-farmhouse-in-lahore": {
    deck: "Every farmhouse photographs well at golden hour. What separates them is power, drainage and the width of a service road you will never see.",
    pullQuote:
      "Ask where the generator sits. The answer tells you more about your evening than the lawn ever will.",
    gallery: ["ae-10", "ae-21"],
  },
  "why-fresh-flowers-matter": {
    deck: "A stage is architecture. Flowers are the part guests touch, lean into and remember by scent — which is why we never economise there first.",
    pullQuote:
      "Guests do not photograph structure. They photograph the twelve inches of bloom in front of it.",
    gallery: ["ae-12", "ae-20"],
  },
  "designing-a-stage-that-photographs": {
    deck: "The couple sees the stage once. Everyone else sees it forever, through a lens. Designing for both is a discipline, not a compromise.",
    pullQuote:
      "Design the stage for the frame it will live in, and the room takes care of itself.",
    gallery: ["ae-05", "ae-13"],
  },
  "the-service-standard-nobody-talks-about": {
    deck: "Menus get all the attention. Service is what guests actually experience — and the difference between the two is measured in minutes.",
    pullQuote:
      "A dish served eleven minutes late is a different dish. Temperature is a recipe ingredient.",
    gallery: ["ae-04", "ae-23"],
  },
  "outdoor-catering-in-lahore-heat": {
    deck: "Building a working kitchen on a lawn in June: cold chain, staging, fuel, and the quiet engineering behind a plate that arrives correct.",
    pullQuote:
      "In outdoor catering, the cold chain is the menu. Everything else is decoration.",
    gallery: ["ae-18", "ae-09"],
  },
  "what-a-wedding-actually-costs": {
    deck: "Where the money genuinely goes in a Lahore wedding week, which line items move the number, and which ones only feel expensive.",
    pullQuote:
      "Two hundred extra guests will cost you more than every flower across the entire week.",
    gallery: ["ae-07", "ae-19"],
  },
  "an-intimate-nikah-at-home": {
    deck: "Forty people, one drawing room, nowhere to hide. Small events are the hardest brief we accept — and the one we love most.",
    pullQuote:
      "Restraint reads as confidence at this scale. One decisive gesture beats five arrangements.",
    gallery: ["ae-15", "ae-17"],
  },
};

export function articleExtras(slug: string): ArticleExtras {
  return (
    extras[slug] ?? {
      deck: getArticle(slug)?.excerpt ?? "",
      pullQuote: "",
      gallery: [],
    }
  );
}

export interface JournalCategory {
  slug: string;
  /** Must match Article["category"]. */
  category: ArticleCategory;
  name: string;
  kicker: string;
  metaTitle: string;
  metaDescription: string;
  heroFrames: string[];
  headline: string;
  headlineItalic: string;
  lede: string;
  intro: string[];
  /** Service slugs offered as a natural next step from this reading. */
  relatedServices: string[];
}

export const journalCategories: JournalCategory[] = [
  {
    slug: "planning",
    category: "Planning",
    name: "Planning & Timelines",
    kicker: "The Order of Things",
    metaTitle: "Wedding & Event Planning Writing | The Anayat Journal",
    metaDescription:
      "Timelines, budgets and the sequence of decisions behind a Lahore wedding week — written from the production floor, not from a template.",
    heroFrames: ["ae-22", "ae-07"],
    headline: "Everything beautiful",
    headlineItalic: "begins as a sequence.",
    lede: "Nine months, four functions, one calendar. Writing on how a celebration is actually ordered — and what it costs when the order slips.",
    intro: [
      "A wedding week looks like design and tastes like food, but it runs on sequence. Which decision must be made before which; which one becomes ten times more expensive if it waits a fortnight.",
      "These pieces are the working knowledge we would otherwise only share across a table at the farmhouse: budgets set out honestly, timelines written as we hold ourselves to them, and the failure points we watch for because we have seen them.",
    ],
    relatedServices: ["wedding-planning", "luxury-weddings", "venue-management"],
  },
  {
    slug: "design",
    category: "Design",
    name: "Design & Decor",
    kicker: "Light, Bloom, Structure",
    metaTitle: "Event Design & Decor Inspiration | The Anayat Journal",
    metaDescription:
      "Stage architecture, floral craft and colour stories from Lahore celebrations — how rooms are composed, lit and made to photograph.",
    heroFrames: ["ae-14", "ae-13"],
    headline: "A room is composed",
    headlineItalic: "long before it is decorated.",
    lede: "Stage architecture, floral craft, colour and light — the design thinking behind the rooms we build, told without mood-board vocabulary.",
    intro: [
      "Decor is the last five percent of a design process that begins with sightlines, ceiling heights and where the light will fall at nine in the evening.",
      "We write about the craft in the order we practise it: structure, then light, then bloom, then the small restraint that stops a beautiful room from becoming a loud one.",
    ],
    relatedServices: ["stage-decoration", "floral-design", "private-events"],
  },
  {
    slug: "catering",
    category: "Catering",
    name: "Catering & Hospitality",
    kicker: "The Kitchen Behind It",
    metaTitle: "Luxury Catering & Hospitality Writing | The Anayat Journal",
    metaDescription:
      "Menus, service standards and outdoor kitchens in Lahore — how food arrives hot, together and correct for four hundred guests.",
    heroFrames: ["ae-04", "ae-18"],
    headline: "Hospitality is a discipline",
    headlineItalic: "disguised as generosity.",
    lede: "Menus, live stations and the quiet engineering that gets four hundred plates to the table at the same temperature.",
    intro: [
      "Guests remember two things about the food: whether it was hot, and whether their table was served with the others. Both are logistics problems dressed as culinary ones.",
      "Here we write about the kitchen side of a celebration — cold chains built on lawns, service brigades rehearsed like a run-of-show, and menus designed backwards from the moment they are eaten.",
    ],
    relatedServices: ["luxury-catering", "live-bbq-catering", "outdoor-catering"],
  },
  {
    slug: "venues",
    category: "Venues",
    name: "Venues & Places",
    kicker: "Where It Happens",
    metaTitle: "Lahore Venue Guides & Farmhouse Notes | The Anayat Journal",
    metaDescription:
      "How to read a Lahore venue properly — farmhouse power and drainage, banquet acoustics, parking depth and the questions worth asking.",
    heroFrames: ["ae-25", "ae-10"],
    headline: "Choose the ground",
    headlineItalic: "before you choose the palette.",
    lede: "Farmhouses, lawns, banquet halls and private homes across Lahore — read the way a production team reads them.",
    intro: [
      "A venue is not a backdrop. It is a set of constraints — power, water, access, acoustics — that will quietly decide what your evening can and cannot be.",
      "These guides teach the site visit: what to look at while everyone else admires the lawn, and the four questions that reveal how a place actually behaves at eleven at night in December.",
    ],
    relatedServices: ["farmhouse-events", "venue-management", "outdoor-catering"],
  },
];

export function getJournalCategory(slug: string) {
  return journalCategories.find((c) => c.slug === slug);
}

export function categorySlugFor(category: ArticleCategory) {
  return journalCategories.find((c) => c.category === category)?.slug ?? "planning";
}

export function categoryNameFor(category: ArticleCategory) {
  return journalCategories.find((c) => c.category === category)?.name ?? category;
}

export function articlesInCategory(category: ArticleCategory) {
  return articlesByDate.filter((a) => a.category === category);
}

/** Hand-picked cover story plus its two supporting features. */
export const featuredSlugs = [
  "planning-a-lahore-wedding-week",
  "why-fresh-flowers-matter",
  "choosing-a-farmhouse-in-lahore",
];

/** The editor's shelf — chosen for pleasure, not for recency. */
export const editorsPickSlugs = [
  "designing-a-stage-that-photographs",
  "an-intimate-nikah-at-home",
  "the-service-standard-nobody-talks-about",
];

export const editorsNote = {
  eyebrow: "Editor's note",
  lines: [
    "We started writing because the same conversations kept happening across a table at the farmhouse — about light, about timing, about why the flowers arrive at four in the morning.",
    "The Anayat Journal is where those conversations are set down properly. Not advice borrowed from elsewhere, and not a catalogue of our own work: craft written by the people who carry the ladders, taste the trials and stand at the back of the room while a family walks in for the first time.",
    "Read it slowly. Everything here was learnt on an actual evening, in an actual room, in Lahore.",
  ],
  signature: "Mian Saif — Anayat Events & Catering",
};

