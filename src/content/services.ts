export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  name: string;
  navLabel: string;
  family: "Weddings" | "Celebrations" | "Catering" | "Design & Production";
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  lede: string;
  body: string[];
  inclusions: { title: string; body: string }[];
  gallery: string[];
  faqs: ServiceFaq[];
  testimonial: string;
  related: string[];
}

export const services: Service[] = [
  {
    slug: "wedding-planning",
    name: "Wedding Planning",
    navLabel: "Wedding Planning",
    family: "Weddings",
    eyebrow: "Full-service planning",
    title: "Wedding Planning",
    metaTitle: "Wedding Planning in Lahore | Anayat Events & Catering",
    metaDescription:
      "Full-service wedding planning in Lahore — design, production, florals and catering held by one team from first sketch to the last guest.",
    hero: "ae-24",
    lede: "One team, one plan, one accountable line from the first sketch to the last guest walking out of the gate.",
    body: [
      "A Pakistani wedding is not one event. It is four or five events wearing the same surname, spread over a week, with three families quietly holding different expectations. Most of what goes wrong is not decor. It is coordination.",
      "Our full-service planning holds the entire arc: budget architecture, date and venue strategy, design direction, floral and lighting production, kitchen management, vendor contracts, guest logistics and the minute-by-minute run of each function.",
      "You get a named lead planner. Not an account manager, not a rotating desk. The same person who read your first message stands at your gate on the night.",
    ],
    inclusions: [
      {
        title: "Budget architecture",
        body: "A line-item plan built before a single supplier is booked, with a held contingency and no line you have not seen.",
      },
      {
        title: "Design direction",
        body: "Palette, elevation sketches, floral schedule and lighting plot — issued as a document, not a mood board.",
      },
      {
        title: "Vendor governance",
        body: "Every external supplier contracted through us, briefed by us, and paid against delivery milestones.",
      },
      {
        title: "Run-of-show",
        body: "A minute-by-minute schedule for each function, rehearsed with the crew and shared with both families.",
      },
    ],
    gallery: ["ae-24", "ae-01", "ae-22", "ae-10", "ae-13"],
    faqs: [
      {
        q: "How far in advance should we book wedding planning?",
        a: "Six to nine months is comfortable for a full winter-season wedding in Lahore. We have delivered complete weddings in eleven weeks, but venue and floral availability narrows sharply inside three months.",
      },
      {
        q: "Do you take on single functions or only full weddings?",
        a: "Both. Many families begin with the mehndi or walima alone and extend the scope once they have seen how the first evening ran.",
      },
      {
        q: "Can we keep our own photographer and makeup artist?",
        a: "Yes. We coordinate any supplier you have already chosen, brief them into the run-of-show and take responsibility for their timing on the day.",
      },
    ],
    testimonial: "t-01",
    related: ["luxury-weddings", "mehndi-planning", "walima-planning", "luxury-catering"],
  },
  {
    slug: "luxury-weddings",
    name: "Luxury Weddings",
    navLabel: "Luxury Weddings",
    family: "Weddings",
    eyebrow: "Signature commissions",
    title: "Luxury Weddings",
    metaTitle: "Luxury Wedding Planner in Lahore | Anayat Events & Catering",
    metaDescription:
      "Signature luxury wedding commissions in Lahore — bespoke set fabrication, imported florals, layered lighting design and a private planning team.",
    hero: "ae-22",
    lede: "For families who want the room to be remembered longer than the invitation.",
    body: [
      "A luxury commission is not the same wedding with a larger flower order. It is a different way of working: fabrication instead of rental, a lighting designer instead of a light supplier, a menu developed for your family rather than chosen from a card.",
      "We limit these commissions to a small number each season so the design team stays on one project at a time. Sets are built and dry-assembled in our workshop before they ever reach the venue.",
      "The result is a room with a point of view — proportioned, lit and scented as a single composition, photographed beautifully because it was designed to be seen from every seat, not only from the stage.",
    ],
    inclusions: [
      {
        title: "Bespoke fabrication",
        body: "Stages, colonnades, arches and screens built to your drawings, dry-assembled and lit in the workshop first.",
      },
      {
        title: "Lighting design",
        body: "A plotted design with layered warm sources — chandeliers, uplights, candle fields — never a flat wash.",
      },
      {
        title: "Imported & seasonal florals",
        body: "A floral schedule specified by variety and stem count, sourced fresh for each function of the week.",
      },
      {
        title: "Private planning team",
        body: "A dedicated lead, designer and production manager assigned exclusively to your week.",
      },
    ],
    gallery: ["ae-22", "ae-05", "ae-07", "ae-02", "ae-14"],
    faqs: [
      {
        q: "What separates a luxury commission from your standard planning?",
        a: "Custom fabrication instead of stock sets, a dedicated design team, a plotted lighting design, and a capped number of commissions per season so attention is not divided.",
      },
      {
        q: "Is there a minimum investment?",
        a: "Yes, and we will tell you the honest figure in the first conversation rather than after a proposal. It protects both sides.",
      },
      {
        q: "Can you work at a venue we have already booked?",
        a: "Always. We survey the site, measure the elevations and design specifically for that space — including farmhouses, hotel lawns and private residences.",
      },
    ],
    testimonial: "t-02",
    related: ["wedding-planning", "destination-weddings", "stage-decoration", "floral-design"],
  },
  {
    slug: "destination-weddings",
    name: "Destination Weddings",
    navLabel: "Destination Weddings",
    family: "Weddings",
    eyebrow: "Beyond the city",
    title: "Destination Weddings",
    metaTitle: "Destination Wedding Planner Lahore | Anayat Events & Catering",
    metaDescription:
      "Destination wedding planning from Lahore — farmhouse estates, out-of-city venues, guest travel, kitchens built on site and crews that travel with you.",
    hero: "ae-10",
    lede: "When the venue has no kitchen, no power and no walls, the plan has to carry everything.",
    body: [
      "Destination work is production before it is design. A lawn three hours outside the city has beauty and nothing else — no service kitchen, no reliable power, no green room, no shelter if the weather turns.",
      "We build all of it. Generators and distribution, a full field kitchen with cold chain, guest transport in convoy, accommodation blocks, weather contingency structures and a crew that sleeps on site.",
      "Families choose destination weddings for intimacy. Our job is to make that intimacy feel effortless while forty people work quietly behind the tree line.",
    ],
    inclusions: [
      {
        title: "Site survey & build plan",
        body: "Power, water, access, drainage and weather exposure assessed in person before anything is promised.",
      },
      {
        title: "Field kitchen",
        body: "A complete cold chain and cooking line built on site, run by our own chefs — no reheated outside catering.",
      },
      {
        title: "Guest logistics",
        body: "Transport convoys, arrival timing, room allocation and welcome hampers coordinated end to end.",
      },
      {
        title: "Weather contingency",
        body: "A funded, drawn Plan B for every outdoor function, decided by a stated cut-off time — not on the night.",
      },
    ],
    gallery: ["ae-10", "ae-25", "ae-18", "ae-11", "ae-26"],
    faqs: [
      {
        q: "How far from Lahore will you travel?",
        a: "Routinely across Punjab, and further for full-week commissions. Beyond three hours we build in an additional production day.",
      },
      {
        q: "Who cooks at a remote venue?",
        a: "Our own kitchen brigade, on a field line we build ourselves, with refrigerated transport for the cold chain.",
      },
      {
        q: "What happens if it rains?",
        a: "Every outdoor function carries a drawn and costed covered alternative with a decision cut-off, agreed in writing weeks before.",
      },
    ],
    testimonial: "t-03",
    related: ["farmhouse-events", "outdoor-catering", "venue-management", "luxury-weddings"],
  },
  {
    slug: "mehndi-planning",
    name: "Mehndi Planning",
    navLabel: "Mehndi",
    family: "Weddings",
    eyebrow: "The loudest night",
    title: "Mehndi Planning",
    metaTitle: "Mehndi Planner & Decor in Lahore | Anayat Events & Catering",
    metaDescription:
      "Mehndi planning and decor in Lahore — jharoka sets, marigold installations, floor seating, dhol and dance-floor production with catering to match.",
    hero: "ae-16",
    lede: "Colour, floor seating, marigold by the kilo, and a dance floor that has to survive four hundred people.",
    body: [
      "The mehndi is the one night nobody wants restrained. It is loud, saturated, cross-generational and completely uninterested in a seating plan. Designing for it means designing for movement.",
      "We build jharoka arches and mirror-work screens, hang marigold and gota in volume, lay floor cushions with real back support, and place the dance floor where the sound carries without deafening the elders.",
      "Food runs continuously rather than in a single service — chaat counters, live grills and dessert stations open across the evening so nobody has to leave the floor to eat.",
    ],
    inclusions: [
      {
        title: "Jharoka & mirror sets",
        body: "Carved arch frames, mirror-work panels and painted backdrops built to your palette.",
      },
      {
        title: "Marigold installation",
        body: "Fresh garlands, hanging curtains and floor motifs strung the morning of the function.",
      },
      {
        title: "Floor seating",
        body: "Cushioned takht and floor arrangements laid with genuine back support for elders.",
      },
      {
        title: "Sound & dhol",
        body: "Balanced sound design, dhol entry choreography and a dance floor sized for the actual guest count.",
      },
    ],
    gallery: ["ae-16", "ae-08", "ae-17", "ae-20", "ae-21"],
    faqs: [
      {
        q: "Can you do a mehndi at a private home?",
        a: "Yes. Residential mehndis are a specialism — we work around access, neighbours, parking and a fixed sound cut-off time.",
      },
      {
        q: "Do you provide the dholwala and mehndi artists?",
        a: "We coordinate both, along with a choreographer if the families are preparing performances.",
      },
      {
        q: "How late can the function run?",
        a: "We plan to the local sound regulation for your area and design the last hour so it winds down rather than stops abruptly.",
      },
    ],
    testimonial: "t-04",
    related: ["wedding-planning", "stage-decoration", "live-bbq-catering", "walima-planning"],
  },
  {
    slug: "walima-planning",
    name: "Walima Planning",
    navLabel: "Walima",
    family: "Weddings",
    eyebrow: "The formal evening",
    title: "Walima Planning",
    metaTitle: "Walima Planner & Catering in Lahore | Anayat Events & Catering",
    metaDescription:
      "Walima planning in Lahore — formal seating, draped ceilings, refined menus and service timed so every table is served within minutes.",
    hero: "ae-07",
    lede: "The most formal evening of the week, judged almost entirely on the food and how fast it reaches the table.",
    body: [
      "A walima is a hosting exercise. Guests arrive closer together, sit longer, and remember two things: whether the room felt considered, and whether the food arrived hot.",
      "We design walimas around service flow first — table geometry, aisle widths, kitchen distance, plate counts — and let the decor follow that logic. Draped ceilings, chandeliers, low centrepieces that people can actually see across.",
      "Our service standard is every table served within eight minutes of the first plate leaving the pass. That number drives the crew count, not the other way round.",
    ],
    inclusions: [
      {
        title: "Table architecture",
        body: "Seating geometry planned against service routes, sightlines and family protocol.",
      },
      {
        title: "Ceiling & drape design",
        body: "Layered fabric ceilings and chandelier placement that flatter photography without darkening the room.",
      },
      {
        title: "Refined menu",
        body: "A composed menu with a tasting session, sized precisely to your guest count.",
      },
      {
        title: "Service brigade",
        body: "Uniformed service staff at a ratio that gets every table served together.",
      },
    ],
    gallery: ["ae-07", "ae-02", "ae-04", "ae-23", "ae-13"],
    faqs: [
      {
        q: "How many service staff do you provide?",
        a: "We staff to guest count and menu complexity, typically one server per twelve to fifteen seated guests for a plated service.",
      },
      {
        q: "Can we hold a tasting before confirming the menu?",
        a: "Yes. A full tasting for up to six family members is included on walima catering above our minimum guest count.",
      },
      {
        q: "Do you handle the stage as well as the dining?",
        a: "Both, and we prefer to. Stage and dining designed separately is the most common reason a walima room feels disjointed.",
      },
    ],
    testimonial: "t-05",
    related: ["luxury-catering", "wedding-planning", "venue-management", "stage-decoration"],
  },
  {
    slug: "nikah-planning",
    name: "Nikah Planning",
    navLabel: "Nikah",
    family: "Weddings",
    eyebrow: "The quiet ceremony",
    title: "Nikah Planning",
    metaTitle: "Nikah Ceremony Planning & Decor Lahore | Anayat Events",
    metaDescription:
      "Intimate nikah ceremony planning in Lahore — restrained floral design, seated ceremony layouts, acoustics and a calm, unhurried run of the day.",
    hero: "ae-15",
    lede: "Small, seated, and the only function of the week where silence is part of the design.",
    body: [
      "A nikah does not need volume. It needs acoustics, sightlines and restraint — a room where the words are audible from the last row and nothing competes with them.",
      "We design nikah settings in white, ivory and green: a single considered floral wall, a low seated arrangement, natural light where the timing allows it, and a documented sound plan so the ceremony is heard, not amplified.",
      "Afterwards the room transitions — often within forty minutes — into a lunch or reception setting. That changeover is choreographed in advance, down to which crew member moves which chair.",
    ],
    inclusions: [
      {
        title: "Ceremony layout",
        body: "Seating designed for audibility and sightline, with separate family sections if requested.",
      },
      {
        title: "Restrained floral",
        body: "One decisive floral gesture rather than five competing ones — usually a single wall or arch.",
      },
      {
        title: "Sound plan",
        body: "Discreet microphones and speaker placement tuned so the last row hears without echo.",
      },
      {
        title: "Room turnaround",
        body: "A rehearsed changeover from ceremony to dining, crewed and timed to the minute.",
      },
    ],
    gallery: ["ae-15", "ae-03", "ae-20", "ae-14", "ae-12"],
    faqs: [
      {
        q: "Do you plan nikah ceremonies at home?",
        a: "Frequently. Home nikahs are among our favourite commissions — the constraint sharpens the design.",
      },
      {
        q: "What is a realistic guest count for an intimate nikah?",
        a: "We plan them from thirty guests upward. Below that we usually recommend a private dining format instead.",
      },
      {
        q: "Can the same setting be reused for the reception?",
        a: "Yes, and it is often the most elegant solution — we design the transition as a deliberate reveal rather than a reset.",
      },
    ],
    testimonial: "t-06",
    related: ["wedding-planning", "floral-design", "private-events", "luxury-catering"],
  },
  {
    slug: "corporate-events",
    name: "Corporate Events",
    navLabel: "Corporate Events",
    family: "Celebrations",
    eyebrow: "Brand-grade production",
    title: "Corporate Events",
    metaTitle: "Corporate Event Management in Lahore | Anayat Events",
    metaDescription:
      "Corporate event management in Lahore — conferences, award nights, product launches, annual dinners. Stage, AV, catering and run-of-show under one contract.",
    hero: "ae-23",
    lede: "Your brand on a stage for three hours, with no room for an improvised cable run.",
    body: [
      "Corporate work is judged by different people than a wedding. A CEO does not notice the florals; they notice that the microphone worked, the deck was legible from row twelve, and dinner did not overrun the keynote.",
      "We produce annual dinners, award nights, conferences, product launches and dealer conventions — stage build, LED and AV, branded environments, registration flow, catering and a run-of-show that survives contact with reality.",
      "One contract, one production manager, one invoice. Procurement teams tend to appreciate that more than the mood board.",
    ],
    inclusions: [
      {
        title: "Stage & AV",
        body: "Stage build, LED wall, line-array sound, lectern and comms, with a full technical rehearsal.",
      },
      {
        title: "Branded environment",
        body: "Backdrops, signage, registration desks and photo walls produced to your brand guidelines.",
      },
      {
        title: "Delegate flow",
        body: "Registration, badging, seating plans and movement designed to avoid queues at every pinch point.",
      },
      {
        title: "Corporate catering",
        body: "Working lunches, canapé receptions and formal dinners timed around the agenda, not against it.",
      },
    ],
    gallery: ["ae-23", "ae-04", "ae-09", "ae-06", "ae-02"],
    faqs: [
      {
        q: "Do you work with procurement and issue formal quotations?",
        a: "Yes — itemised quotations, tax documentation and a single contracting entity for the whole production.",
      },
      {
        q: "Can you produce at a hotel or a corporate venue?",
        a: "Routinely. We liaise directly with venue operations on load-in windows, power and health and safety requirements.",
      },
      {
        q: "Do you handle technical rehearsals?",
        a: "Always. Every speaker deck, video and cue is run at least once on the actual system before doors open.",
      },
    ],
    testimonial: "t-07",
    related: ["private-events", "venue-management", "luxury-catering", "stage-decoration"],
  },
  {
    slug: "birthday-events",
    name: "Birthday Events",
    navLabel: "Birthdays",
    family: "Celebrations",
    eyebrow: "Milestones",
    title: "Birthday Events",
    metaTitle: "Luxury Birthday Party Planner in Lahore | Anayat Events",
    metaDescription:
      "Birthday event planning in Lahore — first birthdays, milestone celebrations and grown-up dinners with bespoke decor, dessert tables and full catering.",
    hero: "ae-21",
    lede: "From a first birthday on a lawn to a sixtieth that quietly outshines most weddings.",
    body: [
      "Birthdays are the most personal brief we take. There is no template, no tradition to lean on — only a person, and what the room should say about them.",
      "We design first birthdays with soft palettes and shaded play areas, teenage parties with lighting and sound as the main event, and milestone dinners for adults that feel closer to a private restaurant takeover than a party.",
      "Dessert and cake design is developed with the same seriousness as the main menu, because it is the one photograph that always gets taken.",
    ],
    inclusions: [
      {
        title: "Theme development",
        body: "A single considered concept carried through invitation, entrance, table and cake.",
      },
      {
        title: "Entrance & photo moment",
        body: "One designed arrival gesture — arch, balloon installation or floral wall — built to photograph well.",
      },
      {
        title: "Dessert programme",
        body: "Cake design, dessert table and live sweet counters produced by our pastry team.",
      },
      {
        title: "Child-safe planning",
        body: "Shade, soft flooring, supervised play zones and allergy-aware menus for younger celebrations.",
      },
    ],
    gallery: ["ae-21", "ae-17", "ae-09", "ae-19", "ae-06"],
    faqs: [
      {
        q: "Do you handle small birthdays at home?",
        a: "Yes — home celebrations from around forty guests upward, including setup, catering and full clear-down.",
      },
      {
        q: "Can you produce a themed birthday?",
        a: "We prefer one strong idea executed properly to five thin references. Bring the theme and we will edit it into something coherent.",
      },
      {
        q: "Is the cake included?",
        a: "Cake and dessert design is quoted separately so you can specify exactly what you want without a bundled compromise.",
      },
    ],
    testimonial: "t-08",
    related: ["private-events", "luxury-catering", "stage-decoration", "corporate-events"],
  },
  {
    slug: "luxury-catering",
    name: "Luxury Catering",
    navLabel: "Luxury Catering",
    family: "Catering",
    eyebrow: "The kitchen",
    title: "Luxury Catering",
    metaTitle: "Luxury Catering Services in Lahore | Anayat Events & Catering",
    metaDescription:
      "Luxury catering in Lahore — bespoke menus, tasting sessions, in-house brigade and service timed so every table is served hot and together.",
    hero: "ae-04",
    lede: "Guests forgive a modest stage. They do not forgive cold food.",
    body: [
      "Our kitchen is in-house, not subcontracted. That single decision governs everything else: we control sourcing, we run tastings, we set the brigade size, and we own the outcome when a function runs late.",
      "Menus are composed rather than assembled — a considered progression from welcome bites through to dessert, sized to your guest count and balanced across the table so nobody is left with only one thing they can eat.",
      "Service is the discipline nobody sees. Plate counts, pass timing, runner routes and a service ratio that gets an entire hall served together rather than in slow waves.",
    ],
    inclusions: [
      {
        title: "Menu development",
        body: "A composed menu built with you, with a full tasting before anything is signed.",
      },
      {
        title: "Sourcing standards",
        body: "Named suppliers, fresh daily produce and a documented cold chain from store to service.",
      },
      {
        title: "Service brigade",
        body: "Uniformed servers, captains and a pass manager sized to your guest count and format.",
      },
      {
        title: "Dietary handling",
        body: "Allergy, vegetarian and medical requirements tracked by guest name, not by guesswork.",
      },
    ],
    gallery: ["ae-04", "ae-23", "ae-09", "ae-13", "ae-02"],
    faqs: [
      {
        q: "Is a tasting included?",
        a: "A tasting for up to six people is included above our standard guest minimum, and available at cost below it.",
      },
      {
        q: "Can you cater at a venue that already has an in-house kitchen?",
        a: "Yes, subject to the venue's policy. Where outside catering is barred we will tell you before you book the venue, not after.",
      },
      {
        q: "How do you handle very large guest counts?",
        a: "Above a thousand guests we split the service into zones with independent passes so distance from the kitchen never dictates who eats last.",
      },
    ],
    testimonial: "t-09",
    related: ["live-bbq-catering", "outdoor-catering", "indoor-catering", "walima-planning"],
  },
  {
    slug: "live-bbq-catering",
    name: "Live BBQ Catering",
    navLabel: "Live BBQ",
    family: "Catering",
    eyebrow: "Fire in the room",
    title: "Live BBQ Catering",
    metaTitle: "Live BBQ Catering in Lahore | Anayat Events & Catering",
    metaDescription:
      "Live BBQ catering in Lahore — open grills, seekh and tikka counters, smoke management and chefs who cook in front of your guests all evening.",
    hero: "ae-18",
    lede: "The counter everyone circles back to, three times, all evening.",
    body: [
      "A live grill is theatre and catering at once. Done badly it smokes out the marquee and produces a queue. Done properly it becomes the social centre of the night.",
      "We build grill counters with extraction and wind-direction planning, staff them with dedicated grill chefs, and cook in short continuous batches so nothing sits under a lamp waiting for a guest.",
      "Seekh, malai boti, tikka, chapli, grilled fish and a vegetarian line that is genuinely worth eating rather than an afterthought.",
    ],
    inclusions: [
      {
        title: "Counter design",
        body: "Grill stations placed for airflow and traffic, dressed to match the room rather than hidden behind it.",
      },
      {
        title: "Continuous batching",
        body: "Short-run cooking through the evening so every plate leaves the grill within minutes of being made.",
      },
      {
        title: "Smoke management",
        body: "Extraction and orientation planned against prevailing wind and seating position.",
      },
      {
        title: "Vegetarian grill",
        body: "A parallel meat-free line with its own utensils, board and chef.",
      },
    ],
    gallery: ["ae-18", "ae-04", "ae-09", "ae-16", "ae-17"],
    faqs: [
      {
        q: "Can a live grill run indoors?",
        a: "Only with proper extraction. In enclosed halls we usually place grills at a covered threshold so the theatre stays visible without the smoke.",
      },
      {
        q: "How many grill counters do we need?",
        a: "One well-staffed counter serves roughly a hundred and fifty guests comfortably across an evening.",
      },
      {
        q: "Is halal certification available for meat sourcing?",
        a: "All meat is halal-sourced from named suppliers, and we can share the sourcing documentation on request.",
      },
    ],
    testimonial: "t-10",
    related: ["luxury-catering", "outdoor-catering", "farmhouse-events", "mehndi-planning"],
  },
  {
    slug: "outdoor-catering",
    name: "Outdoor Catering",
    navLabel: "Outdoor Catering",
    family: "Catering",
    eyebrow: "Lawns & farmhouses",
    title: "Outdoor Catering",
    metaTitle: "Outdoor Catering Services in Lahore | Anayat Events",
    metaDescription:
      "Outdoor catering in Lahore — field kitchens on lawns and farmhouses, cold chain management, weather planning and hot service far from any building.",
    hero: "ae-04",
    lede: "A field kitchen built from nothing, holding a full cold chain in Lahore heat.",
    body: [
      "Outdoor catering is a logistics discipline dressed as hospitality. There is no building. Everything — power, refrigeration, wash-up, waste, lighting for the kitchen crew — arrives on a truck and leaves on one.",
      "We build the line to the same standard as an indoor kitchen: refrigerated transport, temperature logs, covered prep, separated raw and finished zones, and a wash station that is not a bucket behind a hedge.",
      "It is the invisible half of every farmhouse wedding you have admired.",
    ],
    inclusions: [
      {
        title: "Field kitchen build",
        body: "Covered prep, cooking line, refrigeration and wash-up erected and struck by our own crew.",
      },
      {
        title: "Cold chain",
        body: "Refrigerated transport and on-site holding with temperature logs through the whole service.",
      },
      {
        title: "Power & water",
        body: "Independent generator capacity and water supply so kitchen load never touches the event lighting.",
      },
      {
        title: "Weather planning",
        body: "Covered service routes so rain never travels between the kitchen and the table.",
      },
    ],
    gallery: ["ae-04", "ae-10", "ae-18", "ae-25", "ae-11"],
    faqs: [
      {
        q: "Do you need mains power on site?",
        a: "No. We bring generator capacity sized to the kitchen and keep it on a separate circuit from event lighting.",
      },
      {
        q: "How do you keep food hot across a large lawn?",
        a: "Zoned service points close to seating, insulated transport and short batch runs rather than one central pass.",
      },
      {
        q: "Do you clear and clean the site afterwards?",
        a: "Yes — full clear-down and waste removal are part of every outdoor contract, usually completed the same night.",
      },
    ],
    testimonial: "t-11",
    related: ["farmhouse-events", "live-bbq-catering", "destination-weddings", "indoor-catering"],
  },
  {
    slug: "indoor-catering",
    name: "Indoor Catering",
    navLabel: "Indoor Catering",
    family: "Catering",
    eyebrow: "Halls & hotels",
    title: "Indoor Catering",
    metaTitle: "Indoor Catering for Halls & Hotels in Lahore | Anayat Events",
    metaDescription:
      "Indoor catering in Lahore — banquet halls, hotels and marquees. Plated service, buffet architecture and timing built around the room's real service routes.",
    hero: "ae-02",
    lede: "Inside a hall the room is fixed, so the plan has to bend around it.",
    body: [
      "Indoor catering lives or dies on service routes. A beautiful hall with one narrow kitchen door will serve its far tables twenty minutes late unless somebody designs around that door.",
      "We survey the room first: pass location, door widths, distance to the furthest table, lift capacity if there is one. Only then do we set the menu format and the brigade size.",
      "Buffets are built as multiple mirrored islands rather than one long queue, and plated service is run in synchronised waves so no table watches another eat.",
    ],
    inclusions: [
      {
        title: "Room survey",
        body: "Service routes, door widths and pass placement measured before the menu is finalised.",
      },
      {
        title: "Buffet architecture",
        body: "Mirrored islands with duplicated dishes to eliminate the single-queue bottleneck.",
      },
      {
        title: "Synchronised service",
        body: "Plated courses released in waves so an entire section is served within minutes.",
      },
      {
        title: "Hotel liaison",
        body: "Coordination with in-house venue operations on load-in, storage and clearance.",
      },
    ],
    gallery: ["ae-02", "ae-23", "ae-07", "ae-05", "ae-06"],
    faqs: [
      {
        q: "Can you cater in a hotel that permits outside catering?",
        a: "Yes, and we handle the operational liaison, licensing paperwork and load-in scheduling directly with the venue.",
      },
      {
        q: "Buffet or plated — which do you recommend?",
        a: "Plated for walimas and corporate dinners; buffet for mehndis and larger mixed-age gatherings where people move.",
      },
      {
        q: "Do you provide crockery and linen?",
        a: "Full crockery, cutlery, glassware and linen in your chosen palette are included in every indoor contract.",
      },
    ],
    testimonial: "t-12",
    related: ["luxury-catering", "walima-planning", "venue-management", "corporate-events"],
  },
  {
    slug: "farmhouse-events",
    name: "Farmhouse Events",
    navLabel: "Farmhouse Events",
    family: "Design & Production",
    eyebrow: "Our home ground",
    title: "Farmhouse Events",
    metaTitle: "Farmhouse Event Management in Lahore | Anayat Events",
    metaDescription:
      "Farmhouse event management in Lahore — Bedian, Raiwind Road and Green Acres estates. Full production, power, kitchens, decor and guest logistics.",
    hero: "ae-25",
    lede: "We are based on a farmhouse. We know exactly what these estates hide.",
    body: [
      "Anayat Events works out of The Palms 7 Farmhouse in Green Acres. Farmhouse weddings are not an occasional project for us — they are the ground we stand on every day.",
      "We know which estates have real power and which have a generator that dies at eleven. Which lawns drain and which turn to mud after an hour of rain. Where the guest cars actually fit once two hundred families arrive at the same time.",
      "That knowledge is the whole service. The florals are the easy part.",
    ],
    inclusions: [
      {
        title: "Estate selection",
        body: "Honest guidance on which farmhouse actually suits your guest count, season and budget.",
      },
      {
        title: "Infrastructure build",
        body: "Power distribution, lighting, sanitation, kitchen and shelter planned as one system.",
      },
      {
        title: "Parking & arrival",
        body: "Valet flow, drop-off sequencing and marshalled parking for peak arrival.",
      },
      {
        title: "Landscape lighting",
        body: "Tree uplighting, pathway lanterns and gate design that make the estate itself part of the set.",
      },
    ],
    gallery: ["ae-25", "ae-26", "ae-10", "ae-11", "ae-19"],
    faqs: [
      {
        q: "Do you have preferred farmhouse venues?",
        a: "We work across the Bedian, Raiwind Road and Green Acres belts and will recommend by fit, not by commission.",
      },
      {
        q: "Can you handle two hundred cars arriving at once?",
        a: "Yes — marshalled parking, a staged drop-off and a valet team are standard on farmhouse commissions.",
      },
      {
        q: "What about mosquitoes and winter cold?",
        a: "Fogging before guest arrival, and patio heaters or covered zones planned into every winter lawn function.",
      },
    ],
    testimonial: "t-13",
    related: ["destination-weddings", "outdoor-catering", "venue-management", "luxury-weddings"],
  },
  {
    slug: "stage-decoration",
    name: "Stage Decoration",
    navLabel: "Stage Decoration",
    family: "Design & Production",
    eyebrow: "The photographed wall",
    title: "Stage Decoration",
    metaTitle: "Wedding Stage Decoration in Lahore | Anayat Events",
    metaDescription:
      "Wedding stage decoration in Lahore — bespoke fabricated backdrops, floral walls, crystal installations and lighting designed for photography.",
    hero: "ae-13",
    lede: "Ninety per cent of the photographs taken all night are taken in front of this one wall.",
    body: [
      "The stage is the most photographed object of the entire wedding, and the most commonly ruined by three mistakes: it is too tall for the room, too flat under the lighting, and too busy behind the couple.",
      "We draw stages to the room's elevation, build them with real depth so light has something to fall across, and keep the centre calm so the couple reads clearly in every frame.",
      "Fabrication happens in our workshop — arches, colonnades, mirror screens, crystal curtains, floral walls — and every stage is lit and photographed before it leaves.",
    ],
    inclusions: [
      {
        title: "Elevation drawings",
        body: "Scaled drawings of your stage against the actual room height and camera positions.",
      },
      {
        title: "Workshop fabrication",
        body: "Frames, arches and screens built and finished in-house rather than pulled from stock.",
      },
      {
        title: "Photographic lighting",
        body: "Key, fill and separation lighting tested against skin tones before the event.",
      },
      {
        title: "Seating design",
        body: "Couple seating chosen for posture and proportion, not only for silhouette.",
      },
    ],
    gallery: ["ae-13", "ae-05", "ae-08", "ae-01", "ae-20"],
    faqs: [
      {
        q: "How early is the stage built on the day?",
        a: "Structural build begins the previous evening or at dawn; fresh florals go on within four hours of guest arrival.",
      },
      {
        q: "Can you match a reference image we like?",
        a: "We will take the idea and redraw it for your room and palette. We do not reproduce another family's wedding verbatim.",
      },
      {
        q: "Do you coordinate with our photographer?",
        a: "Yes — we share the lighting plot in advance so the team knows exactly what they are shooting into.",
      },
    ],
    testimonial: "t-14",
    related: ["floral-design", "luxury-weddings", "mehndi-planning", "venue-management"],
  },
  {
    slug: "floral-design",
    name: "Floral Design",
    navLabel: "Floral Design",
    family: "Design & Production",
    eyebrow: "Fresh, never faux",
    title: "Floral Design",
    metaTitle: "Wedding Floral Design in Lahore | Anayat Events & Catering",
    metaDescription:
      "Wedding floral design in Lahore — fresh seasonal and imported blooms, installations, table work and a floral schedule cut for each function.",
    hero: "ae-14",
    lede: "Cut that morning, conditioned in cold storage, installed hours before your guests arrive.",
    body: [
      "Flowers are the one element of a wedding with a shelf life measured in hours. Everything about our floral process is built around that fact.",
      "We specify by variety and stem count rather than by vague description, buy fresh for each function of the week rather than rotating one order across three nights, and condition everything in cold storage before it is touched.",
      "Installations, arch work, hanging gardens, aisle runners, table arrangements and the couple's personal flowers all come from the same studio, so nothing clashes.",
    ],
    inclusions: [
      {
        title: "Specified schedule",
        body: "A written floral schedule by variety, colour and stem count for every function.",
      },
      {
        title: "Cold conditioning",
        body: "Every stem conditioned in temperature-controlled storage before installation.",
      },
      {
        title: "Installation work",
        body: "Hanging gardens, arches, walls and ceiling florals rigged by our own installation crew.",
      },
      {
        title: "Personal florals",
        body: "Bouquets, buttonholes and family florals designed to match the room, not approximate it.",
      },
    ],
    gallery: ["ae-14", "ae-15", "ae-01", "ae-12", "ae-24"],
    faqs: [
      {
        q: "Do you ever use artificial flowers?",
        a: "Only for structural greenery at height where nobody can reach it. Everything at eye level is fresh.",
      },
      {
        q: "Which flowers are realistic in Lahore summer?",
        a: "Orchids, anthurium, carnation, tuberose and heat-tolerant greenery hold beautifully. We steer away from peony and hydrangea outdoors in June.",
      },
      {
        q: "Can you match a specific colour?",
        a: "We match to a physical swatch rather than a screen — screens lie about colour, fabric does not.",
      },
    ],
    testimonial: "t-15",
    related: ["stage-decoration", "nikah-planning", "luxury-weddings", "wedding-planning"],
  },
  {
    slug: "venue-management",
    name: "Venue Management",
    navLabel: "Venue Management",
    family: "Design & Production",
    eyebrow: "On-site command",
    title: "Venue Management",
    metaTitle: "Event Venue Management in Lahore | Anayat Events",
    metaDescription:
      "Event venue management in Lahore — venue sourcing, contracts, load-in scheduling, parking, security and on-site command from dawn to clear-down.",
    hero: "ae-26",
    lede: "Somebody has to stand at the gate from six in the morning. It should not be your brother.",
    body: [
      "Venue management is the unglamorous spine of an event. Load-in windows, supplier arrival order, power distribution, security briefing, parking marshals, guest flow, clear-down and the final walk-through with the venue owner.",
      "We take that entire burden, including venue sourcing and contract negotiation if you have not booked yet, and place a production manager on site from first load-in to final key handover.",
      "Families notice it as an absence: nobody from the family had to solve anything.",
    ],
    inclusions: [
      {
        title: "Venue sourcing",
        body: "Shortlists matched to guest count, season and budget, with the honest drawbacks stated.",
      },
      {
        title: "Load-in schedule",
        body: "A timed supplier arrival order so twelve vans do not reach one gate at once.",
      },
      {
        title: "Security & parking",
        body: "Briefed security, marshalled parking and a controlled guest entry point.",
      },
      {
        title: "Clear-down",
        body: "Full strike, waste removal and venue handover, usually completed the same night.",
      },
    ],
    gallery: ["ae-26", "ae-25", "ae-22", "ae-10", "ae-03"],
    faqs: [
      {
        q: "Can you manage a venue we booked ourselves?",
        a: "Yes. We take over operational coordination from the point of appointment, including your existing contract terms.",
      },
      {
        q: "When does your team arrive on the day?",
        a: "Production is on site at first load-in, typically dawn, and remains until the venue is formally handed back.",
      },
      {
        q: "Do you handle guest parking?",
        a: "Marshalled parking, valet and a staged drop-off sequence are standard on all managed venues.",
      },
    ],
    testimonial: "t-16",
    related: ["farmhouse-events", "corporate-events", "destination-weddings", "indoor-catering"],
  },
  {
    slug: "private-events",
    name: "Private Events",
    navLabel: "Private Events",
    family: "Celebrations",
    eyebrow: "By invitation",
    title: "Private Events",
    metaTitle: "Private Event Planning in Lahore | Anayat Events & Catering",
    metaDescription:
      "Private event planning in Lahore — anniversaries, engagements, baby showers, intimate dinners and family gatherings designed with complete discretion.",
    hero: "ae-19",
    lede: "Anniversaries, engagements, baby showers and dinners for thirty that deserve the same care as a wedding for eight hundred.",
    body: [
      "Small events are harder, not easier. With thirty guests there is nowhere to hide a weak dish, a wilting arrangement or a server who does not know the menu.",
      "We plan anniversaries, engagements, baby showers, graduation dinners and family gatherings at homes, farmhouses and private dining rooms — with a smaller crew, a tighter menu and total discretion.",
      "No signage, no social posting, no photographs shared without written permission. Some of our best work will never appear on this website.",
    ],
    inclusions: [
      {
        title: "Intimate design",
        body: "Table-level design where every place setting is composed rather than repeated.",
      },
      {
        title: "Chef's menu",
        body: "A short, precise menu developed for the specific guests attending.",
      },
      {
        title: "Discretion",
        body: "No branding on site and nothing published without your explicit written consent.",
      },
      {
        title: "Home-friendly crew",
        body: "A compact team trained to work quietly inside a private residence.",
      },
    ],
    gallery: ["ae-19", "ae-23", "ae-06", "ae-09", "ae-15"],
    faqs: [
      {
        q: "What is your minimum guest count?",
        a: "We take private commissions from around twenty-five guests upward.",
      },
      {
        q: "Will our event appear on your social media?",
        a: "Never without written permission. Discretion is the default, not an upgrade.",
      },
      {
        q: "Do you plan anniversaries and baby showers?",
        a: "Regularly — along with engagements, milestone birthdays and family reunions.",
      },
    ],
    testimonial: "t-17",
    related: ["birthday-events", "nikah-planning", "luxury-catering", "corporate-events"],
  },
];

export const serviceFamilies = [
  "Weddings",
  "Celebrations",
  "Catering",
  "Design & Production",
] as const;

const serviceMap = new Map(services.map((s) => [s.slug, s]));

export function getService(slug: string): Service | undefined {
  return serviceMap.get(slug);
}
