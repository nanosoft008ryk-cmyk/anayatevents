/**
 * The About ecosystem — the emotional spine of the site.
 *
 * Every page in /about draws its copy from here so the voice stays one voice:
 * unhurried, first-person, editorial. No corporate register, no superlatives,
 * no claims we cannot stand behind on a Tuesday in November.
 */

export interface AboutChapter {
  slug: string;
  to: string;
  index: string;
  title: string;
  kicker: string;
  line: string;
  photo: string;
}

/** The submenu, in reading order. Used by nav, footer, sitemap and the hub. */
export const aboutChapters: AboutChapter[] = [
  {
    slug: "story",
    to: "/about/story",
    index: "I",
    title: "Brand Story",
    kicker: "Where it began",
    line: "A family kitchen, a borrowed lawn, and one evening that would not leave us alone.",
    photo: "ae-25",
  },
  {
    slug: "philosophy",
    to: "/about/philosophy",
    index: "II",
    title: "Our Philosophy",
    kicker: "How we think",
    line: "Six beliefs we keep returning to, written down so we can be held to them.",
    photo: "ae-14",
  },
  {
    slug: "journey",
    to: "/about/journey",
    index: "III",
    title: "Our Journey",
    kicker: "What changed us",
    line: "Not a timeline of trophies. The rooms, the mistakes and the nights that taught us.",
    photo: "ae-10",
  },
  {
    slug: "team",
    to: "/about/team",
    index: "IV",
    title: "Meet The Team",
    kicker: "Who stands there",
    line: "The people who will be awake at four in the morning so that you are not.",
    photo: "ae-19",
  },
  {
    slug: "behind-the-scenes",
    to: "/about/behind-the-scenes",
    index: "V",
    title: "Behind The Scenes",
    kicker: "The unseen hours",
    line: "Luxury is not a look. It is fourteen hours of preparation nobody is meant to notice.",
    photo: "ae-22",
  },
  {
    slug: "process",
    to: "/about/process",
    index: "VI",
    title: "Our Process",
    kicker: "Dream to memory",
    line: "Eight movements, from the first sentence you say to the photograph you keep.",
    photo: "ae-06",
  },
  {
    slug: "craftsmanship",
    to: "/about/craftsmanship",
    index: "VII",
    title: "Craftsmanship",
    kicker: "The hand in it",
    line: "Timber, stem, flame, salt and light — the seven crafts kept inside one house.",
    photo: "ae-15",
  },
  {
    slug: "why-us",
    to: "/about/why-us",
    index: "VIII",
    title: "Why Choose Us",
    kicker: "How it feels",
    line: "We would rather describe the evening you will have than the company we are.",
    photo: "ae-18",
  },
  {
    slug: "promise",
    to: "/about/promise",
    index: "IX",
    title: "Our Promise",
    kicker: "In writing",
    line: "Seven human promises. No guarantees, no small print, no clever wording.",
    photo: "ae-12",
  },
  {
    slug: "careers",
    to: "/about/careers",
    index: "X",
    title: "Careers",
    kicker: "Join the house",
    line: "For people who cannot walk past a crooked chair. There are more of us than you think.",
    photo: "ae-21",
  },
];

/* ------------------------------- The hub -------------------------------- */

export const aboutIntro = {
  eyebrow: "The house",
  heading: ["We do not plan events.", "We build the room a memory will live in."],
  lede: "Anayat Events & Catering is a Lahore house of design, fabrication, florals and food. But that sentence explains nothing about why anyone stays with us.",
  body: [
    "Every family that comes to us arrives carrying the same quiet fear: that the evening will pass in a blur, that they will spend it managing rather than living it, that a year later nobody will be able to say what it felt like — only what it cost.",
    "We started because we had sat in that chair ourselves. We had watched a mother check her watch instead of her daughter's face. We had seen a father shake three hundred hands and eat nothing. And we became convinced that the difference between a function and a memory is not budget. It is care applied hours before anyone arrives.",
    "So we built the house backwards from the feeling. Design, carpentry, lighting, floral and the kitchen all under one roof, one production head, one accountability. Not because it is efficient — it is harder — but because a memory cannot be sub-contracted.",
  ],
  signature: "You Think. We Do.",
};

export interface Pillar {
  index: string;
  word: string;
  title: string;
  body: string;
  photo: string;
  note: string;
}

export const pillars: Pillar[] = [
  {
    index: "01",
    word: "Craft",
    title: "Made, not rented",
    body: "A stage begins as a pencil elevation in our studio and ends as timber cut in our own workshop. We would rather build a thing once, badly, and learn — than rent it and never understand it.",
    photo: "ae-13",
    note: "Studio, Green Acres",
  },
  {
    index: "02",
    word: "Welcome",
    title: "Hospitality before design",
    body: "Before we discuss palettes we ask where the eldest guest will sit, how far she will walk, and whether she will be cold. Beauty that inconveniences a grandmother is not beauty.",
    photo: "ae-23",
    note: "Ivory salon, DHA lawn",
  },
  {
    index: "03",
    word: "Timing",
    title: "Precision you never see",
    body: "Eight hundred plates leaving a kitchen within four minutes of each other is not luck. It is a rehearsal, a written order of service, and a crew who have done it together for years.",
    photo: "ae-04",
    note: "Service line, garden banquet",
  },
  {
    index: "04",
    word: "Feeling",
    title: "Emotional design",
    body: "We design for the two seconds after a door opens — the intake of breath, the hand that reaches for another hand. Everything else is scenery built to earn that moment.",
    photo: "ae-17",
    note: "Arrival walkway, blush canopy",
  },
  {
    index: "05",
    word: "Restraint",
    title: "Elegance is subtraction",
    body: "The hardest conversation we have with clients is about what to remove. A room with one extraordinary gesture is remembered. A room with nine is merely expensive.",
    photo: "ae-14",
    note: "Urn study, floral bench",
  },
  {
    index: "06",
    word: "Yours",
    title: "Personal, not templated",
    body: "We have never repeated a stage. Not once in five hundred evenings. Your grandmother's shawl colour, the poem you both like, the sweet only your city makes — that is the brief.",
    photo: "ae-16",
    note: "Jharoka nights, mehndi set",
  },
];

/* ------------------------------ Brand story ------------------------------ */

export const storyPage = {
  hero: {
    eyebrow: "Chapter I · Brand Story",
    title: "It began with a wedding we were not paid for.",
    photo: "ae-25",
  },
  movements: [
    {
      index: "01",
      label: "The beginning",
      title: "A borrowed lawn in 2016",
      body: [
        "A cousin's nikah, a lawn borrowed from a neighbour, and a budget that had already been spent twice on paper. There was no company then — only two brothers, a rented generator and the stubborn belief that this evening should not look rented.",
        "We stayed up for two nights wiring lights into a mulberry tree because a florist had cancelled. At two in the morning the bride's mother came out with tea, looked up into the branches, and did not say anything for a long moment.",
        "That silence is the whole origin of this company. Not applause. Silence.",
      ],
      photo: "ae-12",
    },
    {
      index: "02",
      label: "The first commission",
      title: "The first family who paid us to feel that",
      body: [
        "Word travelled the way it travels in Lahore — a phone number passed at a walima, a photograph shown on someone's screen. The first paying family asked for one thing: that their daughter should not have to make a single decision after sunset.",
        "We wrote the order of service by hand on a single sheet. We rehearsed the entrance three times with a cousin standing in for the bride. Nothing that evening was improvised, and so the evening felt effortless — a trick we have never stopped practising.",
      ],
      photo: "ae-22",
    },
    {
      index: "03",
      label: "The problem",
      title: "What we were quietly trying to fix",
      body: [
        "Lahore had no shortage of event companies. It had a shortage of accountability. Most were brokers: they took your date, rented a stage from one yard, sub-contracted flowers to another, and phoned a caterer they had never eaten with.",
        "When something failed — and something always failed — there was nobody in the room whose fault it was. We decided the fix was unglamorous and expensive: bring every craft in-house, and let one production head carry the whole evening on their name.",
      ],
      photo: "ae-05",
    },
    {
      index: "04",
      label: "Growth",
      title: "Trust, compounding quietly",
      body: [
        "We have never bought a lead. Every commission since has arrived through a guest who was fed well, a sister who watched us re-cut a stage two days out without panic, an uncle who noticed the marigold was still fresh at one in the morning.",
        "Five hundred celebrations later the growth has been slow on purpose. We take fewer dates in a season than we could. A house that over-commits stops being a house and becomes a switchboard.",
      ],
      photo: "ae-24",
    },
    {
      index: "05",
      label: "Today",
      title: "One roof, forty hands",
      body: [
        "Today the studio sits at Green Acres with a workshop behind it and a kitchen beside it. Designers, carpenters, gaffers, floral hands and chefs walk between the three all day, which is the only reason a change on Thursday can be real by Saturday.",
        "Sixty-two families have written publicly about the result. We read every one of them, including the parts that were only nearly perfect.",
      ],
      photo: "ae-09",
    },
    {
      index: "06",
      label: "Looking forward",
      title: "What we still want",
      body: [
        "We are not trying to become the largest event company in Pakistan. We are trying to be the one a family recommends twenty years later, when the daughter of the bride is getting married and someone asks who did the first one.",
        "That is a long game. It is measured in second weddings, not in seasons.",
      ],
      photo: "ae-18",
    },
  ],
};

/* ------------------------------ Philosophy ------------------------------- */

export const philosophyPage = {
  hero: {
    eyebrow: "Chapter II · Our Philosophy",
    title: "A manifesto, in six lines.",
    lede: "Not values on a wall. Working rules we argue about, break occasionally, and return to.",
  },
  tenets: [
    {
      index: "I",
      title: "Detail is not decoration",
      statement: "A guest never notices the level of a table. They notice that nothing wobbled all night.",
      body: "Detail is the invisible discipline of removing every small friction before it reaches a guest. Chair heights measured against table heights. Cutlery polished twice. Cable runs buried before the first car arrives. It is the least glamorous work we do and the reason evenings feel calm.",
      photo: "ae-06",
    },
    {
      index: "II",
      title: "Hospitality outranks design",
      statement: "If the design and the guest disagree, the guest wins.",
      body: "We have narrowed aisles for photographs and been wrong. Now the questions come in this order: can she walk it, can he hear across it, will they be warm, will they be fed on time — and only then, is it beautiful.",
      photo: "ae-23",
    },
    {
      index: "III",
      title: "Design for emotion, not for the camera",
      statement: "Photographs are a by-product of a good evening, never the brief.",
      body: "A set that photographs magnificently and feels cold in person has failed. We test at eye level, in the actual light, at the actual hour — because your family will experience the room standing in it, not scrolling it.",
      photo: "ae-17",
    },
    {
      index: "IV",
      title: "Luxury is unhurriedness",
      statement: "Expensive is a price. Luxury is not being rushed.",
      body: "The luxury we are chasing is the feeling of having enough time: enough time to greet, to eat, to sit down. We buy that time by finishing the build hours before we need to, and by staffing above the number that would be sufficient.",
      photo: "ae-19",
    },
    {
      index: "V",
      title: "Relationships over transactions",
      statement: "We would rather lose a commission than a family.",
      body: "We have talked clients out of scope they did not need and dates we could not honour properly. Those conversations cost money and buy something better: families who return for the second wedding, and who send their friends without being asked.",
      photo: "ae-03",
    },
    {
      index: "VI",
      title: "Fewer evenings, done completely",
      statement: "Quantity is the enemy of the last ten per cent.",
      body: "We cap the season deliberately. The last ten per cent of an evening — the fresh stems at midnight, the second hot service, the crew who stay until the last car leaves — only exists when nobody is stretched across three venues.",
      photo: "ae-15",
    },
  ],
};

/* -------------------------------- Journey -------------------------------- */

export const journeyPage = {
  hero: {
    eyebrow: "Chapter III · Our Journey",
    title: "Nine years, told through the nights that changed us.",
  },
  milestones: [
    {
      year: "2016",
      title: "Two brothers, one generator",
      body: "The first lawn, the first strung lights, the first tea at two in the morning. No company name yet — just a phone number passed between families.",
      marker: "The beginning",
      photo: "ae-12",
    },
    {
      year: "2017",
      title: "The workshop",
      body: "We stopped renting stages. A small carpentry shed behind the studio meant an elevation drawn on Monday could be standing by Friday, and could be changed on Thursday without a fight.",
      marker: "Fabrication in-house",
      photo: "ae-13",
    },
    {
      year: "2018",
      title: "The kitchen comes home",
      body: "Catering stopped being a phone call. Our own chefs, our own tasting table, our own service line — and the first evening where eight hundred plates left within four minutes of each other.",
      marker: "Catering in-house",
      photo: "ae-04",
    },
    {
      year: "2019",
      title: "The floral bench",
      body: "A cold room, a conditioning bench and a rule that no stem is cut more than eighteen hours before a guest sees it. Marigold fresh at one in the morning became a house standard, not a happy accident.",
      marker: "Florals in-house",
      photo: "ae-14",
    },
    {
      year: "2020",
      title: "The year of forty guests",
      body: "The season everything shrank. We learned to make an intimate nikah feel as considered as a wedding for eight hundred — arguably the most useful thing we have ever been forced to learn.",
      marker: "Intimacy, by necessity",
      photo: "ae-03",
    },
    {
      year: "2021",
      title: "Lighting design",
      body: "We hired a gaffer. Colour temperature stopped being an afterthought and became the first decision of every design — because a room is only ever as good as the light falling on faces.",
      marker: "Light as material",
      photo: "ae-07",
    },
    {
      year: "2022",
      title: "The farmhouse belt",
      body: "Bedian Road, Barki, the lawns beyond the ring road. Long hauls, generators, water, dust and wind — production logistics that taught us how to build anywhere in the district.",
      marker: "Beyond the city",
      photo: "ae-10",
    },
    {
      year: "2024",
      title: "Five hundred celebrations",
      body: "A number that means less to us than the second weddings inside it: families who came back for another daughter, another son, another beginning.",
      marker: "The milestone",
      photo: "ae-24",
    },
    {
      year: "Ahead",
      title: "The next wedding, only better",
      body: "No expansion announcement. A slower season, a deeper archive, a house that a family recommends twenty years from now when the next generation asks who did the first one.",
      marker: "What comes next",
      photo: "ae-18",
    },
  ],
};

/* ---------------------------------- Team --------------------------------- */

export interface TeamMember {
  name: string;
  monogram: string;
  role: string;
  since: string;
  intro: string;
  philosophy: string;
  favourite: string;
  quote: string;
  photo: string;
}

export const teamPage = {
  hero: {
    eyebrow: "Chapter IV · The People",
    title: "A house is only ever its hands.",
    lede: "We do not publish staff cards. These are the people you will actually speak to, and what they care about when nobody is watching.",
  },
  members: <TeamMember[]>[
    {
      name: "Mian Saif",
      monogram: "MS",
      role: "Founder · Planning & Client House",
      since: "Since 2016",
      intro: "Saif reads every enquiry that arrives, personally, before it becomes anyone else's file. He is the one who will sit with your family, ask about the grandmother's walk, and quietly decide what the evening is really about.",
      philosophy: "That a plan is not finished when it is complete — it is finished when the family stops worrying.",
      favourite: "The ten minutes before guests arrive, when the room is finished and empty and the light is exactly right.",
      quote: "If the mother of the bride sits down and eats, we did our job.",
      photo: "ae-09",
    },
    {
      name: "Mian Asif",
      monogram: "MA",
      role: "Founder · Production & Kitchen",
      since: "Since 2016",
      intro: "Asif runs the build and the line. Timber, rigging, generators, hot service — anything that has to be true rather than pretty is his. He is on site before the first crew truck and after the last car leaves.",
      philosophy: "That every promise made in a proposal is a physical object somebody has to carry up a lawn.",
      favourite: "Standing at the pass when the first hot plates go out and the room falls quiet for a second.",
      quote: "Beautiful is easy at six o'clock. Beautiful at one in the morning is production.",
      photo: "ae-04",
    },
    {
      name: "The Design Studio",
      monogram: "DS",
      role: "Concept · Elevation · Palette",
      since: "Four designers",
      intro: "Every commission begins as pencil on paper here — floor plans, elevations, a palette pulled from something real: a shawl, a tile, a colour from the bride's city. Nothing is chosen from a catalogue.",
      philosophy: "That a set should be drawn at eye level, because that is where it will be lived.",
      favourite: "The first time a drawing stands up full size in the workshop and turns out to be right.",
      quote: "We are not decorating a venue. We are composing a room.",
      photo: "ae-05",
    },
    {
      name: "The Workshop",
      monogram: "WS",
      role: "Carpentry · Fabrication · Finish",
      since: "Eleven hands",
      intro: "Behind the studio: saws, paint, and the reason we can re-cut a barat stage two days out without panic. Everything is built here, finished here, and test-assembled here before it ever meets a venue.",
      philosophy: "That a joint nobody will ever see should still be square.",
      favourite: "Test-assembly day — the whole set standing in the yard, lit, before anyone else has seen it.",
      quote: "Rented looks rented. You can feel it from the third row.",
      photo: "ae-13",
    },
    {
      name: "The Floral Bench",
      monogram: "FB",
      role: "Conditioning · Installation",
      since: "Nine hands",
      intro: "A cold room, buckets, and an unforgiving rule: no stem is cut more than eighteen hours before a guest sees it. They install through the night and return at dawn to replace anything the heat has argued with.",
      philosophy: "That flowers are a perishable ingredient, treated the way a kitchen treats fish.",
      favourite: "The dawn walk-through, swapping the three stems only they would notice.",
      quote: "Fresh at one in the morning, or it does not go up.",
      photo: "ae-15",
    },
    {
      name: "The Kitchen",
      monogram: "KT",
      role: "Menu · Tasting · Hot Service",
      since: "Fifteen hands",
      intro: "The same chefs who cook your tasting stand behind the line on your night. Menus are cooked, eaten, argued over and re-cooked before they are ever offered — and the service is rehearsed like an entrance.",
      philosophy: "That a guest judges an entire evening by whether their food was hot.",
      favourite: "Tasting afternoons, when a family tries something from their own city done properly.",
      quote: "Eight hundred plates, four minutes. That is the whole art.",
      photo: "ae-23",
    },
  ],
};

/* --------------------------- Behind the scenes ---------------------------- */

export const behindPage = {
  hero: {
    eyebrow: "Chapter V · Behind The Scenes",
    title: "The fourteen hours you are not supposed to notice.",
    photo: "ae-22",
  },
  lede: "An evening that feels effortless is the visible tip of a very long day. This is that day, in order, without the flattering edit.",
  callsheet: [
    {
      time: "05:40",
      title: "Load out",
      body: "Trucks leave the workshop in build order — structure first, finish last. Every crate is labelled to a zone on the floor plan, so nothing is opened twice.",
      photo: "ae-25",
    },
    {
      time: "07:15",
      title: "Setting out",
      body: "Chalk lines on grass. The floor plan is walked at full scale before a single frame goes up — aisle widths, seat rows, the path from car to chair.",
      photo: "ae-21",
    },
    {
      time: "09:00",
      title: "Structure",
      body: "Stage decks, pavilion frames, rigging points. This is loud, unbeautiful, mathematical work, and it decides whether the evening will hold.",
      photo: "ae-11",
    },
    {
      time: "11:30",
      title: "The cold room opens",
      body: "Conditioned stems come out of water and onto the bench. Installation begins from the top of the set downwards, so nothing finished is stood on.",
      photo: "ae-14",
    },
    {
      time: "13:00",
      title: "Kitchen mise",
      body: "Twelve kilometres away the kitchen is already deep in prep. Curries base out, breads proof, the pass is set to the written order of service.",
      photo: "ae-04",
    },
    {
      time: "15:20",
      title: "Focus and grade",
      body: "The gaffer walks the room with a meter. Faces first, set second. Every fixture is aimed at the height a person will actually stand, not at the floor.",
      photo: "ae-07",
    },
    {
      time: "17:00",
      title: "Dress and detail",
      body: "Linen, cutlery, candles, place settings. Tables are levelled with shims. Cables are buried. The last hour of the build is entirely about removing evidence of the build.",
      photo: "ae-23",
    },
    {
      time: "18:30",
      title: "The empty room",
      body: "Ten minutes with the lights at show level and nobody in it. The whole crew walks it once, silently, looking for the one thing that is wrong.",
      photo: "ae-24",
    },
    {
      time: "19:00",
      title: "Doors",
      body: "Crew move to the edges and become invisible. From here everything is service — greeting, seating, timing, hot plates, fresh stems, and a floor that stays clear.",
      photo: "ae-18",
    },
    {
      time: "01:30",
      title: "The last car",
      body: "We do not begin strike while a family is still standing on the lawn. When the last car leaves, the room goes back into crates in reverse order — and the mulberry tree gets its branches back.",
      photo: "ae-10",
    },
  ],
  contactSheet: ["ae-01", "ae-11", "ae-13", "ae-26", "ae-20", "ae-08", "ae-02", "ae-21"],
};

/* -------------------------------- Process -------------------------------- */

export const processPage = {
  hero: {
    eyebrow: "Chapter VI · Our Process",
    title: "Dream. Then eight quiet movements.",
    lede: "Every commission runs this way, whether it is a nikah for forty at home or a wedding week for eight hundred.",
  },
  movements: [
    {
      index: "01",
      name: "Dream",
      caption: "Before anything is possible",
      body: "You arrive with a feeling rather than a brief — a colour, a memory of someone else's evening, a sentence you keep repeating. We start there, not with packages. Nothing is priced, sold or narrowed in this conversation.",
      photo: "ae-12",
    },
    {
      index: "02",
      name: "Discovery",
      caption: "Listening more than presenting",
      body: "We meet at the farmhouse or on a long call. Families, constraints, non-negotiables, the uncle who must be seated near the door, the aunt who cannot take chilli. By the end we know your evening better than we know our own portfolio.",
      photo: "ae-09",
    },
    {
      index: "03",
      name: "Concept",
      caption: "The room, drawn",
      body: "Pencil elevations, floor plan, palette and a single organising idea the whole evening can hang from. You see the room at eye level before anyone talks about cost.",
      photo: "ae-05",
    },
    {
      index: "04",
      name: "Planning",
      caption: "Everything made real on paper",
      body: "A designed proposal: floor plans, floral schedule, menu direction, lighting plot, crew count and a transparent investment range. One revision round is standard, and it is a real one.",
      photo: "ae-06",
    },
    {
      index: "05",
      name: "Preparation",
      caption: "Weeks before anyone sees a thing",
      body: "Fabrication, paint, rigging trials, tasting afternoons, stem sourcing, test-assembly in the yard. You receive a weekly note. Nothing about your evening should ever be news to you.",
      photo: "ae-13",
    },
    {
      index: "06",
      name: "Execution",
      caption: "Dawn to doors",
      body: "A full crew on site from first light, working to a written call sheet. The build finishes early on purpose — the last hour is reserved for removing every trace of the work.",
      photo: "ae-22",
    },
    {
      index: "07",
      name: "Celebration",
      caption: "You become a guest",
      body: "Crew move to the edges. Service, timing and hot plates run to the order of service. You arrive at your own celebration with nothing to carry and nothing to decide.",
      photo: "ae-18",
    },
    {
      index: "08",
      name: "Memory",
      caption: "What is left the next morning",
      body: "Strike begins only after the last car leaves. A week later we send the archive set of photographs and a short, honest note about what we would do differently. Most families keep both.",
      photo: "ae-24",
    },
  ],
};

/* ------------------------------- Why choose ------------------------------- */

export const whyPage = {
  hero: {
    eyebrow: "Chapter VIII · Why Choose Us",
    title: "We would rather describe your evening than ourselves.",
    lede: "No comparisons, no superlatives. Here is what tends to be different, in the words families use afterwards.",
  },
  differences: [
    {
      index: "01",
      title: "You will speak to one person",
      body: "Not an account manager, then a coordinator, then somebody new on the day. One planner from the first enquiry to the last car — who knows why the second cousin cannot be seated at table four.",
      felt: "Nobody has to be told the story twice.",
    },
    {
      index: "02",
      title: "Nothing is sub-contracted",
      body: "Design, carpentry, lighting, floral and the kitchen are all ours. When something needs to change on Thursday for a Saturday, it is a conversation across a yard, not a negotiation between four companies.",
      felt: "Changes stop feeling dangerous.",
    },
    {
      index: "03",
      title: "The build finishes early",
      body: "We schedule to be complete hours before doors, not minutes. The final hour is spent removing evidence of work — cables, offcuts, ladders, crew.",
      felt: "You arrive to a finished room, not a rehearsal.",
    },
    {
      index: "04",
      title: "The food is cooked by the people who cooked your tasting",
      body: "The same chefs, the same recipes, the same hands. Hot service is rehearsed and timed, because a guest will forgive almost anything except cold food arriving late.",
      felt: "Eight hundred plates within four minutes.",
    },
    {
      index: "05",
      title: "The numbers are honest",
      body: "A transparent investment range in the proposal, and a direct conversation when something you want will not survive the budget it has. We would rather lose scope than deliver it thinly.",
      felt: "No invoice on Monday that surprises anyone.",
    },
    {
      index: "06",
      title: "We are still there at one in the morning",
      body: "Crew do not thin out after dinner. Stems are replaced, floors are cleared, and strike does not begin while a family is still standing on the lawn.",
      felt: "The end of the night feels as cared for as the beginning.",
    },
  ],
};

/* ----------------------------- Craftsmanship ------------------------------ */

export const craftPage = {
  hero: {
    eyebrow: "Chapter VII · Craftsmanship",
    title: "Seven crafts. One roof.",
    plates: ["ae-15", "ae-13", "ae-14"],
  },
  crafts: [
    {
      index: "01",
      craft: "Timber",
      title: "The set",
      body: "Elevations drawn at eye level, cut in our own workshop, test-assembled in the yard and finished before it travels. Joints nobody will ever see are still square.",
      detail: "Cut · Paint · Test-assemble",
      photo: "ae-13",
    },
    {
      index: "02",
      craft: "Stem",
      title: "The florals",
      body: "Sourced at dawn, conditioned in a cold room, installed from the top of the set downwards. No stem is cut more than eighteen hours before a guest sees it, and the bench returns at first light to replace whatever the heat argued with.",
      detail: "Source · Condition · Install",
      photo: "ae-14",
    },
    {
      index: "03",
      craft: "Light",
      title: "The grade",
      body: "Faces first, set second. A gaffer walks every room with a meter, aiming fixtures at standing height and grading colour temperature to the hour the ceremony actually begins.",
      detail: "Plot · Focus · Grade",
      photo: "ae-07",
    },
    {
      index: "04",
      craft: "Salt",
      title: "The kitchen",
      body: "Menus cooked, eaten, argued over and re-cooked before they are offered. Service rehearsed to the written order of service so hot food arrives hot, together, at the right moment in the evening.",
      detail: "Taste · Rehearse · Serve",
      photo: "ae-04",
    },
    {
      index: "05",
      craft: "Cloth",
      title: "The table",
      body: "Linen pressed on site, tables shimmed level on grass, cutlery polished twice, candle heights set so nobody is looking through a flame at the person opposite them.",
      detail: "Level · Dress · Polish",
      photo: "ae-23",
    },
    {
      index: "06",
      craft: "Sound",
      title: "The room's voice",
      body: "Coverage measured seat by seat rather than pointed at a crowd. A nikah should be audible in the last row without the first row flinching, and a dhol should arrive as a feeling rather than a volume.",
      detail: "Cover · Balance · Cue",
      photo: "ae-16",
    },
    {
      index: "07",
      craft: "Welcome",
      title: "The guest's hour",
      body: "The route from car door to chair is designed as carefully as the stage: lit, level, shaded or warmed, staffed with people briefed by name on who needs helping.",
      detail: "Route · Greet · Seat",
      photo: "ae-17",
    },
  ],
};

/* -------------------------------- Promise -------------------------------- */

export const promisePage = {
  hero: {
    eyebrow: "Chapter IX · Our Promise",
    title: "Seven promises, written plainly.",
  },
  preamble:
    "These are not guarantees and there is no small print beneath them. They are the sentences we would want said to us if it were our daughter's wedding.",
  promises: [
    {
      index: "I",
      title: "We will tell you the truth early",
      body: "If something will not work — a date, a budget, a design in that wind — you will hear it in the first conversation, not in the last week.",
    },
    {
      index: "II",
      title: "One planner, all the way",
      body: "The person who reads your first message is the person standing on the lawn at midnight. You will never have to re-explain your family to anyone.",
    },
    {
      index: "III",
      title: "The number in the proposal is the number",
      body: "A transparent investment range, itemised. Anything that would change it is discussed before it is done, not invoiced afterwards.",
    },
    {
      index: "IV",
      title: "You will hear from us weekly",
      body: "A short written note through the production weeks. Nothing about your own evening should ever reach you as news.",
    },
    {
      index: "V",
      title: "Fresh, hot and on time",
      body: "Stems conditioned within eighteen hours. Hot food leaving the pass together. If either slips, we will tell you before you notice.",
    },
    {
      index: "VI",
      title: "We stay until the last car",
      body: "No thinning crew after dinner, no strike beginning around your guests, no rush to the next date.",
    },
    {
      index: "VII",
      title: "We will say what we would do differently",
      body: "A week later, an honest note alongside the photographs. Every evening has one thing in it we would change, and hiding it would make us worse at this.",
    },
  ],
  signoff: "Mian Saif & Mian Asif",
};

/* -------------------------------- Careers -------------------------------- */

export const careersPage = {
  hero: {
    eyebrow: "Chapter X · Careers",
    title: "For people who cannot walk past a crooked chair.",
    lede: "We hire rarely and slowly, for temperament before CV. If any of this reads like a description of you, write to us — even when nothing is posted.",
  },
  culture: [
    {
      title: "Craft is taught here",
      body: "Most of our crew learned their craft inside this house. Designers who can now hold a saw; floral hands who can read a lighting plot. Curiosity across disciplines is the fastest way to grow here.",
    },
    {
      title: "The standard is the standard at 1 a.m.",
      body: "Anyone can be excellent at six o'clock. We hire for the temperament that is still exact when it is dark, cold and everyone is tired.",
    },
    {
      title: "Fewer, better evenings",
      body: "We cap the season deliberately. That means real preparation weeks, real time off between them, and nobody stretched across three venues on a Saturday.",
    },
    {
      title: "Credit is given by name",
      body: "In the studio, in the debrief and in front of the client. Nobody's work disappears into the company name.",
    },
  ],
  roles: [
    { name: "Event Designer", note: "Studio · Elevations, palette, floor plans" },
    { name: "Production Carpenter", note: "Workshop · Cut, finish, test-assembly" },
    { name: "Floral Hand", note: "Bench · Conditioning and installation" },
    { name: "Chef de Partie", note: "Kitchen · Prep and hot service line" },
    { name: "Lighting Technician", note: "Site · Plot, focus and grade" },
    { name: "Guest Experience Host", note: "Site · Arrival, seating and care" },
  ],
  applySteps: [
    { index: "01", title: "Write, don't apply", body: "A short message about one evening — yours or someone else's — that you thought was done beautifully, and why." },
    { index: "02", title: "A conversation", body: "At the studio, with tea, walking the workshop. Less interview than tour." },
    { index: "03", title: "One night with us", body: "Paid, on a real build, doing real work. Both sides find out what they need to know." },
  ],
};
