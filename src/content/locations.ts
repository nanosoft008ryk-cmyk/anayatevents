export interface LocationArea {
  slug: string;
  name: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  lede: string;
  body: string[];
  venues: { name: string; note: string }[];
  logistics: { title: string; body: string }[];
  gallery: string[];
  faqs: { q: string; a: string }[];
  nearby: string[];
}

export const locations: LocationArea[] = [
  {
    slug: "lahore",
    name: "Event Management in Lahore",
    shortName: "Lahore",
    metaTitle: "Event Management Company in Lahore | Anayat Events & Catering",
    metaDescription:
      "Luxury event management and catering across Lahore — weddings, corporate events and private celebrations produced end to end by a single in-house team.",
    hero: "ae-22",
    lede: "The city we were built in, and the only one we claim to know by heart.",
    body: [
      "Lahore does not have one wedding season; it has a winter rush that compresses eight months of demand into fourteen weekends. Florists run out. Good crews get double-booked. Venues quietly raise their rates in September.",
      "Working here well is a matter of timing and relationships more than taste. We hold crew capacity, book floral volume ahead of the curve, and tell families honestly when a date is going to cost them more than it should.",
      "From Gulberg drawing rooms to Bedian farmhouse lawns, we produce across the whole city — the same team, the same standards, whatever the postcode.",
    ],
    venues: [
      { name: "Farmhouse estates, Bedian & Raiwind", note: "Full production builds on open ground." },
      { name: "Hotel ballrooms, Gulberg & Mall", note: "Managed load-in with in-house venue operations." },
      { name: "Banquet halls, Johar Town & Model Town", note: "Service-route planning around fixed kitchens." },
      { name: "Private residences, DHA & Cantt", note: "Compact crews and residential sound planning." },
    ],
    logistics: [
      { title: "Peak season", body: "November to February books out by August. October and March offer the same weather at materially lower cost." },
      { title: "Traffic windows", body: "Load-ins are scheduled outside the Ferozepur Road and Canal peak hours to protect the build timeline." },
      { title: "Sound regulation", body: "We plan every function to the local cut-off time for its area and design the last hour to wind down." },
    ],
    gallery: ["ae-22", "ae-13", "ae-04", "ae-25", "ae-07", "ae-16"],
    faqs: [
      { q: "Which areas of Lahore do you cover?", a: "All of it — DHA, Bahria Town, Gulberg, Model Town, Johar Town, Cantt, Askari, Raiwind Road, Bedian Road, Green Acres and Wapda Town." },
      { q: "What does a Lahore wedding realistically cost?", a: "It scales with guest count and format more than with decor. We give an honest range in the first conversation rather than after a proposal." },
      { q: "Do you have a physical office we can visit?", a: "Yes — The Palms 7 Farmhouse in Green Acres. Most families prefer to meet there because they can see a real setup." },
    ],
    nearby: ["dha-lahore", "bahria-town-lahore", "gulberg", "model-town"],
  },
  {
    slug: "dha-lahore",
    name: "Event Management in DHA Lahore",
    shortName: "DHA Lahore",
    metaTitle: "Event Planner & Caterer in DHA Lahore | Anayat Events",
    metaDescription:
      "Event planning and catering in DHA Lahore — house lawns, club halls and private residences across Phases 1 to 8, produced with discreet compact crews.",
    hero: "ae-19",
    lede: "House lawns, club halls and a security gate that needs your supplier list by Thursday.",
    body: [
      "DHA events are usually residential, and residential events are governed by things nobody puts in a mood board: gate passes, neighbour tolerance, driveway width, and how many vans can stand on a street without blocking it.",
      "We submit supplier lists to the relevant phase administration in advance, arrive in a staged order rather than all at once, and work with compact crews who know how to move through somebody's home without leaving a mark.",
      "Phases 5, 6 and 8 have the lawn depth for a genuine outdoor function. The older phases suit seated dinners and nikah ceremonies beautifully.",
    ],
    venues: [
      { name: "Private house lawns, Phases 5–8", note: "Full lawn builds with generator and lighting." },
      { name: "Defence Raya & club venues", note: "Managed hall functions with external catering." },
      { name: "Y-Block & commercial halls", note: "Compact indoor formats for 150–400 guests." },
      { name: "Rooftop terraces", note: "Intimate dinners with wind and heater planning." },
    ],
    logistics: [
      { title: "Gate clearance", body: "Supplier vehicle lists are lodged with phase security at least seventy-two hours ahead." },
      { title: "Neighbour courtesy", body: "Sound levels and a firm cut-off agreed in writing before the build starts." },
      { title: "Street parking", body: "Marshals and a staged drop-off keep the road clear for residents throughout." },
    ],
    gallery: ["ae-19", "ae-15", "ae-06", "ae-09", "ae-23", "ae-03"],
    faqs: [
      { q: "Can you set up in a DHA house lawn?", a: "Yes — from a forty-guest nikah to a three-hundred-guest mehndi, with generator power so the house supply is never loaded." },
      { q: "How do you handle DHA security clearance?", a: "We prepare and submit the full supplier and vehicle list to the phase office on your behalf." },
      { q: "Is there a sound cut-off?", a: "Yes, and we design the final hour of the function to taper into it rather than end abruptly." },
    ],
    nearby: ["lahore", "cantt-askari", "bahria-town-lahore", "gulberg"],
  },
  {
    slug: "bahria-town-lahore",
    name: "Event Management in Bahria Town Lahore",
    shortName: "Bahria Town",
    metaTitle: "Event Planner & Caterer in Bahria Town Lahore | Anayat Events",
    metaDescription:
      "Event planning and catering in Bahria Town Lahore — grand halls, community lawns and villa celebrations with full production and in-house catering.",
    hero: "ae-05",
    lede: "Big halls, generous lawns and rooms with enough ceiling height to actually hang something.",
    body: [
      "Bahria Town is the easiest large-format venue landscape in Lahore. Wide access roads, real parking, halls with genuine height and lawns that were laid out rather than left over.",
      "Height is the opportunity most planners waste here. These ceilings take hanging floral gardens, chandelier clusters and drape work that would be impossible in an older Gulberg hall.",
      "We produce full winter wedding weeks across the sectors — mehndi on a lawn, nikah in a villa, walima in a grand hall — without the crew ever leaving the neighbourhood.",
    ],
    venues: [
      { name: "Grand banquet halls", note: "High ceilings suited to hanging installations." },
      { name: "Community lawns", note: "Marquee builds with full outdoor kitchens." },
      { name: "Villa residences", note: "Intimate nikah and dinner formats." },
      { name: "Club & golf venues", note: "Corporate dinners and award evenings." },
    ],
    logistics: [
      { title: "Access", body: "Wide roads and real parking make large load-ins genuinely straightforward here." },
      { title: "Ceiling height", body: "We survey and rig for hanging florals and chandeliers that lower halls cannot carry." },
      { title: "Distance", body: "Our crews stage overnight for early builds so the drive never eats into the setup window." },
    ],
    gallery: ["ae-05", "ae-02", "ae-14", "ae-08", "ae-26", "ae-13"],
    faqs: [
      { q: "Do you travel to Bahria Town for smaller events?", a: "Yes — we work there from intimate villa dinners upward, with no distance surcharge." },
      { q: "Can you hang heavy floral installations?", a: "Where the structure permits, yes. We survey rigging points before promising anything overhead." },
      { q: "Do you know the venue managers there?", a: "We work with most of the major halls regularly, which shortens load-in negotiation considerably." },
    ],
    nearby: ["lahore", "dha-lahore", "raiwind-road", "wapda-town"],
  },
  {
    slug: "gulberg",
    name: "Event Management in Gulberg",
    shortName: "Gulberg",
    metaTitle: "Event Planner & Caterer in Gulberg Lahore | Anayat Events",
    metaDescription:
      "Event planning and catering in Gulberg Lahore — hotel ballrooms, boutique halls and heritage residences with discreet, tightly scheduled production.",
    hero: "ae-07",
    lede: "Hotel ballrooms, heritage houses and load-in windows measured in minutes.",
    body: [
      "Gulberg is dense, and density dictates everything. Load-in windows are short, service lifts are shared, and the street outside will not tolerate three trucks for an afternoon.",
      "We plan Gulberg builds backwards from the venue's access constraints: pre-assembled modules, staged arrivals, and a crew that can strike a full walima in under ninety minutes because the next event loads in at nine.",
      "In return you get the city's best hotel ballrooms and a handful of heritage residences with a character no purpose-built hall can imitate.",
    ],
    venues: [
      { name: "Five-star hotel ballrooms", note: "Managed liaison with in-house operations teams." },
      { name: "Boutique event halls", note: "Compact seated formats for 100–300 guests." },
      { name: "Heritage residences", note: "Character venues requiring careful, low-impact builds." },
      { name: "Rooftop restaurants", note: "Intimate engagements and corporate receptions." },
    ],
    logistics: [
      { title: "Load-in windows", body: "Sets are pre-assembled off site so installation fits inside a short access slot." },
      { title: "Service lifts", body: "Module sizes are checked against lift dimensions before fabrication begins." },
      { title: "Street management", body: "Staged vehicle arrivals keep the road usable throughout the build." },
    ],
    gallery: ["ae-07", "ae-02", "ae-23", "ae-12", "ae-20", "ae-04"],
    faqs: [
      { q: "Can you cater inside a Gulberg hotel?", a: "Where the hotel permits outside catering, yes — and we confirm that policy before you sign a venue contract." },
      { q: "How do you manage tight load-in times?", a: "Pre-assembly. Sets arrive as finished modules rather than being built from raw materials on site." },
      { q: "Do you work at heritage properties?", a: "Yes, with low-impact rigging and no fixings into original fabric." },
    ],
    nearby: ["lahore", "model-town", "cantt-askari", "dha-lahore"],
  },
  {
    slug: "model-town",
    name: "Event Management in Model Town",
    shortName: "Model Town",
    metaTitle: "Event Planner & Caterer in Model Town Lahore | Anayat Events",
    metaDescription:
      "Event planning and catering in Model Town Lahore — garden residences, community halls and family celebrations produced with quiet, respectful crews.",
    hero: "ae-11",
    lede: "Old gardens, deep verandahs and families who have hosted in the same house for forty years.",
    body: [
      "Model Town rewards restraint. These are established homes with mature trees, generous verandahs and a certain formality that a loud contemporary set would fight rather than flatter.",
      "We design here with the architecture: lighting the trees rather than the walls, using the verandah as the natural stage, keeping palettes close to ivory, brass and deep green.",
      "The lawns are older and drain unevenly, so groundwork and flooring get more attention than they would elsewhere.",
    ],
    venues: [
      { name: "Garden residences", note: "Mature-tree lawns with verandah staging." },
      { name: "Model Town community halls", note: "Traditional formats for larger family gatherings." },
      { name: "Club venues", note: "Formal dinners and anniversary functions." },
      { name: "Link Road banquet spaces", note: "Mid-size walima and reception formats." },
    ],
    logistics: [
      { title: "Ground survey", body: "Older lawns drain unevenly, so levelling and flooring are surveyed before layout is fixed." },
      { title: "Tree lighting", body: "Mature canopies are lit as the primary set rather than screened off behind drapes." },
      { title: "Access lanes", body: "Narrow interior lanes require smaller vehicles and a staged supplier order." },
    ],
    gallery: ["ae-11", "ae-25", "ae-14", "ae-01", "ae-19", "ae-26"],
    faqs: [
      { q: "Can you work around mature trees on the lawn?", a: "We design around them deliberately — uplit canopies are the best set money cannot buy." },
      { q: "Are the interior lanes a problem for load-in?", a: "We use smaller vehicles and a staged arrival order so the lane is never blocked." },
      { q: "Do you handle traditional family formats?", a: "Yes, including separated seating arrangements where the family prefers them." },
    ],
    nearby: ["lahore", "gulberg", "johar-town", "wapda-town"],
  },
  {
    slug: "johar-town",
    name: "Event Management in Johar Town",
    shortName: "Johar Town",
    metaTitle: "Event Planner & Caterer in Johar Town Lahore | Anayat Events",
    metaDescription:
      "Event planning and catering in Johar Town Lahore — marriage halls, marquees and home functions with full decor, catering and on-site management.",
    hero: "ae-08",
    lede: "The city's densest concentration of marriage halls, and a real difference between the good and the merely available.",
    body: [
      "Johar Town has more banquet capacity than any other part of Lahore, which makes venue choice the single highest-leverage decision a family makes here.",
      "We survey before we recommend: ceiling height, kitchen distance, generator capacity, parking depth and whether the hall's own decor package can be declined. Several cannot, and that changes everything.",
      "For families working to a defined budget, this is the district where good planning produces the largest visible return.",
    ],
    venues: [
      { name: "Marriage halls & marquees", note: "Full decor overlays on hall shells." },
      { name: "Home lawn functions", note: "Compact residential builds with generator power." },
      { name: "Emporium-area venues", note: "Corporate and mid-size reception formats." },
      { name: "Community centres", note: "Value-led formats for large guest counts." },
    ],
    logistics: [
      { title: "Venue vetting", body: "We check kitchen distance, generator capacity and decor exclusivity clauses before recommending a hall." },
      { title: "Parking depth", body: "Guest-count-to-parking ratio is assessed honestly; most halls here overstate it." },
      { title: "Overlay decor", body: "Where a hall's fixed decor cannot be removed, we design an overlay that conceals rather than competes." },
    ],
    gallery: ["ae-08", "ae-17", "ae-02", "ae-21", "ae-13", "ae-06"],
    faqs: [
      { q: "Can you replace a hall's in-house decor?", a: "Where the contract allows it. Some halls mandate their own package — we check that clause before you sign." },
      { q: "Which halls do you recommend here?", a: "It depends entirely on your guest count and format; we shortlist by fit rather than by any commercial arrangement." },
      { q: "Do you cater in halls with their own kitchen?", a: "Where outside catering is permitted, yes, and we confirm that in writing beforehand." },
    ],
    nearby: ["lahore", "wapda-town", "model-town", "raiwind-road"],
  },
  {
    slug: "cantt-askari",
    name: "Event Management in Cantt & Askari",
    shortName: "Cantt & Askari",
    metaTitle: "Event Planner & Caterer in Lahore Cantt & Askari | Anayat Events",
    metaDescription:
      "Event planning and catering in Lahore Cantt and Askari — messes, officers' clubs and residential lawns with cleared crews and strict timing discipline.",
    hero: "ae-03",
    lede: "Cleared crews, submitted lists, and functions that start exactly when they say they will.",
    body: [
      "Cantt and Askari venues run on procedure. Vehicle passes, personnel clearance, fixed timings and a level of punctuality the rest of the city treats as optional.",
      "We are comfortable in that environment. Documentation goes in early, crews carry identification, and the run-of-show is written to the minute because here it will actually be held to the minute.",
      "Messes and officers' clubs are among the most elegant rooms in Lahore, with proportions and formality that suit a restrained design far better than a maximal one.",
    ],
    venues: [
      { name: "Officers' messes", note: "Formal rooms suited to restrained design." },
      { name: "Askari community halls", note: "Mid-size family functions and receptions." },
      { name: "Garrison club venues", note: "Corporate dinners and formal ceremonies." },
      { name: "Residential lawns", note: "Compact home builds within cleared areas." },
    ],
    logistics: [
      { title: "Clearance", body: "Crew identification and vehicle lists submitted well ahead of the load-in date." },
      { title: "Fixed timings", body: "Start and finish times are absolute; the run-of-show is built with that in mind." },
      { title: "Restrained design", body: "Formal rooms are treated with lighting and florals rather than heavy structural overlay." },
    ],
    gallery: ["ae-03", "ae-12", "ae-07", "ae-20", "ae-23", "ae-15"],
    faqs: [
      { q: "Can your crew get clearance for Cantt venues?", a: "Yes — we handle personnel and vehicle documentation as a standard part of the process." },
      { q: "Do you work with mess and club protocols?", a: "Regularly, including seating protocol and formal ceremony sequencing." },
      { q: "How strict are the timings?", a: "Absolute, and we plan to them. Our builds finish before the stated deadline, not at it." },
    ],
    nearby: ["lahore", "dha-lahore", "gulberg", "model-town"],
  },
  {
    slug: "raiwind-road",
    name: "Event Management on Raiwind Road",
    shortName: "Raiwind Road",
    metaTitle: "Farmhouse Event Planner on Raiwind Road Lahore | Anayat Events",
    metaDescription:
      "Farmhouse event management on Raiwind Road Lahore — large estate weddings with full power, kitchen, lighting and guest logistics built from the ground up.",
    hero: "ae-10",
    lede: "The farmhouse belt, where the venue gives you land and absolutely nothing else.",
    body: [
      "Raiwind Road is where Lahore's large farmhouse weddings happen. Acres of lawn, long approach drives, and infrastructure that ranges from excellent to entirely theoretical.",
      "Every estate is different, so every commission starts with a physical survey: power capacity, water, drainage, access width, mobile signal and how far the nearest hospital is.",
      "Then we build the event as a temporary settlement — kitchen, lighting, sanitation, shelter, parking — and take it all away again the same night.",
    ],
    venues: [
      { name: "Large farmhouse estates", note: "Multi-acre builds for 500–1500 guests." },
      { name: "Boutique farm venues", note: "Intimate outdoor formats under mature trees." },
      { name: "Agricultural land builds", note: "Complete temporary infrastructure on open ground." },
      { name: "Poolside lawns", note: "Evening mehndi and reception formats." },
    ],
    logistics: [
      { title: "Site survey", body: "Power, water, drainage and access measured in person before any layout is drawn." },
      { title: "Guest wayfinding", body: "Lit signage along the approach road so nobody misses an unmarked gate at night." },
      { title: "Crew accommodation", body: "Production stages overnight on site for dawn builds on distant estates." },
    ],
    gallery: ["ae-10", "ae-25", "ae-18", "ae-11", "ae-24", "ae-26"],
    faqs: [
      { q: "Do farmhouses here have enough power?", a: "Rarely for a full event. We bring independent generator capacity as standard rather than trusting the estate supply." },
      { q: "How do guests find the venue at night?", a: "Lit signage from the main road and marshals at every turn on the approach." },
      { q: "What is the largest event you have built here?", a: "Multi-acre wedding weeks well beyond a thousand guests, with kitchens and power built entirely from scratch." },
    ],
    nearby: ["bedian-road", "green-acres", "lahore", "bahria-town-lahore"],
  },
  {
    slug: "bedian-road",
    name: "Event Management on Bedian Road",
    shortName: "Bedian Road",
    metaTitle: "Farmhouse Wedding Planner on Bedian Road Lahore | Anayat Events",
    metaDescription:
      "Farmhouse wedding planning on Bedian Road Lahore — canal-side estates, garden weddings and full outdoor production with in-house catering.",
    hero: "ae-24",
    lede: "Canal-side estates with the best trees in the city and roads that flood in one good hour of rain.",
    body: [
      "Bedian Road holds Lahore's most beautiful farmhouse gardens — old trees, water features and a stillness you cannot fabricate on a hall floor.",
      "It also floods. Drainage on the approach roads is poor, and a monsoon-adjacent date needs a contingency that is drawn and funded, not merely discussed.",
      "We plan Bedian weddings with a covered alternative for every outdoor function, a stated decision cut-off, and vehicle routing that avoids the worst of the standing water.",
    ],
    venues: [
      { name: "Canal-side farmhouses", note: "Garden weddings under mature canopies." },
      { name: "Private estates", note: "Full-week multi-function commissions." },
      { name: "Garden marquee sites", note: "Covered builds with lawn overflow." },
      { name: "Poolside venues", note: "Evening receptions and mehndi functions." },
    ],
    logistics: [
      { title: "Drainage & weather", body: "Every outdoor function carries a drawn, costed covered alternative with a decision cut-off." },
      { title: "Approach routing", body: "Guest and supplier routes chosen to avoid the low-lying stretches after rain." },
      { title: "Canopy lighting", body: "Old trees are uplit as the principal set element rather than screened out." },
    ],
    gallery: ["ae-24", "ae-01", "ae-25", "ae-14", "ae-10", "ae-19"],
    faqs: [
      { q: "Is Bedian Road risky in monsoon?", a: "The approach roads flood. We plan a covered alternative and a rerouted approach for any date near the season." },
      { q: "Can you build under existing trees?", a: "Yes, and we prefer it — canopy uplighting produces a better room than any ceiling we could hang." },
      { q: "How far is it from central Lahore for guests?", a: "Roughly forty minutes from Gulberg outside peak hours; we build that into the invitation timing." },
    ],
    nearby: ["green-acres", "raiwind-road", "dha-lahore", "lahore"],
  },
  {
    slug: "green-acres",
    name: "Event Management in Green Acres",
    shortName: "Green Acres",
    metaTitle: "Event Management in Green Acres Lahore | Anayat Events",
    metaDescription:
      "Event management in Green Acres Lahore — our home ground at The Palms 7 Farmhouse, with same-day setup, on-site tastings and full production capability.",
    hero: "ae-26",
    lede: "Our own address. The one place where our warehouse, kitchen and lawn are the same postcode.",
    body: [
      "Anayat Events is based at The Palms 7 Farmhouse in Green Acres Housing Society. Our workshop, floral cold store, kitchen and crew all operate from here.",
      "For events in this society that proximity is a material advantage: same-day setup changes are possible, forgotten items are minutes away, and tastings happen in the same kitchen that will cook on your night.",
      "It is also where most families first meet us, because seeing a real stage half-built explains more than any portfolio.",
    ],
    venues: [
      { name: "The Palms 7 Farmhouse", note: "Our base — lawns, kitchen and workshop on site." },
      { name: "Neighbouring estates", note: "Minutes from our warehouse and cold store." },
      { name: "Society community lawns", note: "Mid-size family functions." },
      { name: "Private residences", note: "Compact home builds with immediate crew access." },
    ],
    logistics: [
      { title: "Proximity", body: "Warehouse and cold store minutes from site, so late changes remain genuinely possible." },
      { title: "On-site tastings", body: "Menu tastings run in the same kitchen brigade that will cook your event." },
      { title: "Extended build time", body: "Local builds can start earlier without additional transport cost." },
    ],
    gallery: ["ae-26", "ae-25", "ae-04", "ae-22", "ae-11", "ae-18"],
    faqs: [
      { q: "Can we visit your setup before booking?", a: "Yes — most families visit The Palms 7 Farmhouse and see a live build or a stage in the workshop." },
      { q: "Do you host events at your own farmhouse?", a: "We do, subject to availability, and it is often the simplest option for a full wedding week." },
      { q: "Where exactly are you located?", a: "The Palms 7 Farmhouse, Green Acres Housing Society, Lahore 54000." },
    ],
    nearby: ["bedian-road", "raiwind-road", "lahore", "dha-lahore"],
  },
  {
    slug: "wapda-town",
    name: "Event Management in Wapda Town",
    shortName: "Wapda Town",
    metaTitle: "Event Planner & Caterer in Wapda Town Lahore | Anayat Events",
    metaDescription:
      "Event planning and catering in Wapda Town Lahore — community halls, home lawns and family celebrations with full decor and in-house catering.",
    hero: "ae-06",
    lede: "Family neighbourhoods, generous home lawns and celebrations built around three generations in one room.",
    body: [
      "Wapda Town and its neighbouring societies are family territory — multi-generation households, home functions and guest lists shaped by relations rather than invitations.",
      "That changes the design brief. Seating has to work for elders, food has to cover a wide range of preferences, and the floor plan has to survive children running through it for four hours.",
      "We plan for the room as it actually behaves: real back support on floor seating, shaded waiting areas, continuous food service and a sound level that lets people talk.",
    ],
    venues: [
      { name: "Home lawns", note: "Residential builds with independent power." },
      { name: "Community halls", note: "Mid-size receptions and walima formats." },
      { name: "Local marquees", note: "Covered functions for larger family counts." },
      { name: "Rooftop spaces", note: "Compact evening gatherings." },
    ],
    logistics: [
      { title: "Multi-generation comfort", body: "Seating, shade and access planned for elders and small children first." },
      { title: "Continuous service", body: "Food runs across the evening rather than in a single fixed sitting." },
      { title: "Residential courtesy", body: "Sound and finish times agreed with neighbours before the build." },
    ],
    gallery: ["ae-06", "ae-21", "ae-17", "ae-09", "ae-08", "ae-16"],
    faqs: [
      { q: "Do you take on smaller family functions here?", a: "Yes — home functions from around forty guests upward, with full setup and clear-down." },
      { q: "Can you work within a defined budget?", a: "We will tell you honestly what is achievable at your number before you commit to anything." },
      { q: "Is parking a problem in these streets?", a: "It can be, so we marshal it and stage the drop-off to keep the road passable." },
    ],
    nearby: ["johar-town", "model-town", "lahore", "bahria-town-lahore"],
  },
];

const locationMap = new Map(locations.map((l) => [l.slug, l]));

export function getLocation(slug: string): LocationArea | undefined {
  return locationMap.get(slug);
}
