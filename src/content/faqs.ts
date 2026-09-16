export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqTopic {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  lede: string;
  items: FaqItem[];
}

export const faqTopics: FaqTopic[] = [
  {
    slug: "planning-process",
    name: "Planning & Process",
    metaTitle: "Event Planning Process FAQs | Anayat Events Lahore",
    metaDescription:
      "How planning works at Anayat Events Lahore — lead times, proposals, revisions, who you deal with and what happens in the weeks before your event.",
    lede: "How we work, from the first message to the final clear-down.",
    items: [
      {
        q: "How far in advance should we contact you?",
        a: "Six to nine months for a full winter wedding week in Lahore. Single functions can be delivered in six to eight weeks, and we have done less, but floral and crew availability narrows sharply inside three months.",
      },
      {
        q: "Who will we actually be dealing with?",
        a: "A named lead planner from the first conversation to the last night. Not a rotating account desk. On larger commissions they are supported by a designer and a production manager, both introduced by name.",
      },
      {
        q: "What does the proposal include?",
        a: "Floor plans, elevation sketches, palette direction, floral schedule, menu direction and an itemised investment range. One full revision round is included as standard.",
      },
      {
        q: "How many changes can we make after signing?",
        a: "Design changes are comfortable up to four weeks out. After that, fabricated elements are already in production and changes carry real cost — we will always tell you the number before you decide.",
      },
      {
        q: "Do you work with families who have already booked a venue?",
        a: "Frequently. We survey the venue, measure the elevations and design specifically for that room, including venues we have never worked in before.",
      },
      {
        q: "Can we hire you for coordination only?",
        a: "Yes — day-of and week-of coordination is available for families who have designed the event themselves but want a professional crew running it.",
      },
    ],
  },
  {
    slug: "pricing-payments",
    name: "Pricing & Payments",
    metaTitle: "Event Pricing & Payment FAQs | Anayat Events Lahore",
    metaDescription:
      "Straight answers on event pricing in Lahore — what drives cost, deposits, payment schedules, hidden charges and how we quote honestly.",
    lede: "The part most companies keep vague. We would rather not.",
    items: [
      {
        q: "What drives the cost of an event most?",
        a: "Guest count first, then function count, then fresh floral volume. Decor complexity matters less than people assume; feeding and seating four hundred people is what moves the number.",
      },
      {
        q: "Will you tell us if our budget is unrealistic?",
        a: "Yes, in the first conversation. Taking a commission we cannot deliver properly at your number helps nobody, and it is the fastest way to ruin a wedding.",
      },
      {
        q: "What is the payment schedule?",
        a: "A booking deposit to hold the date and crew, a production instalment when fabrication and floral ordering begin, and the balance before the event. The exact split is written into your contract.",
      },
      {
        q: "Are there charges that appear later?",
        a: "Not from us. Overtime beyond the contracted hours and guest counts that rise after the final headcount are the only two variables, and both are stated in writing beforehand.",
      },
      {
        q: "Do you take commissions from venues or suppliers?",
        a: "We recommend by fit. Where a supplier margin exists it is disclosed in the quotation rather than buried in a bundled line.",
      },
      {
        q: "Is the deposit refundable?",
        a: "The booking deposit holds a date and crew that we then decline to others, so it is non-refundable — but it is transferable to a rescheduled date subject to availability.",
      },
    ],
  },
  {
    slug: "catering-menus",
    name: "Catering & Menus",
    metaTitle: "Catering & Menu FAQs | Anayat Events Lahore",
    metaDescription:
      "Catering FAQs from Anayat Events Lahore — tastings, halal sourcing, dietary requirements, service ratios and how food stays hot at scale.",
    lede: "The kitchen is in-house, so these answers are ours to give.",
    items: [
      {
        q: "Is a tasting included?",
        a: "A tasting for up to six people is included above our standard guest minimum, and available at cost below it. It runs in the same kitchen that will cook on your night.",
      },
      {
        q: "Is all meat halal?",
        a: "Yes, halal-sourced from named suppliers, with sourcing documentation available on request.",
      },
      {
        q: "How do you handle allergies and dietary needs?",
        a: "Tracked by guest name rather than as a general count, with separate preparation, utensils and a captain briefed on which table each plate goes to.",
      },
      {
        q: "How do you keep food hot for a thousand guests?",
        a: "Zoned service points with independent passes, short batch cooking and insulated transport. Distance from the kitchen never decides who eats last.",
      },
      {
        q: "Can we request a specific family recipe?",
        a: "Often, yes. Bring it to the tasting and our chefs will work it up at scale — some of the best dishes we serve came from a grandmother's instruction.",
      },
      {
        q: "Do you provide crockery, linen and glassware?",
        a: "All included, in a palette chosen with your design rather than whatever the hire company had left.",
      },
    ],
  },
  {
    slug: "venues-logistics",
    name: "Venues & Logistics",
    metaTitle: "Venue & Event Logistics FAQs | Anayat Events Lahore",
    metaDescription:
      "Venue and logistics FAQs for Lahore events — farmhouse power, weather contingency, parking, security clearance, load-in windows and clear-down.",
    lede: "The unglamorous half, which is where events are actually won.",
    items: [
      {
        q: "What happens if it rains?",
        a: "Every outdoor function carries a drawn and costed covered alternative, with a decision cut-off time agreed weeks in advance. We do not improvise this on the night.",
      },
      {
        q: "Do farmhouses have enough power?",
        a: "Rarely for a full event. We bring independent generator capacity as standard and keep kitchen load on a separate circuit from event lighting.",
      },
      {
        q: "Do you handle parking and security?",
        a: "Marshalled parking, valet, a staged drop-off and a briefed security team are standard on managed venues.",
      },
      {
        q: "When does your crew arrive and leave?",
        a: "Production is on site from first load-in, usually dawn, and stays until the venue is formally handed back — normally the same night.",
      },
      {
        q: "Can you get clearance for Cantt and DHA venues?",
        a: "Yes. Personnel and vehicle documentation is submitted well ahead of the load-in date as part of the standard process.",
      },
      {
        q: "Do you clean up afterwards?",
        a: "Full strike, waste removal and venue handover are included in every contract. You should never receive a call from a venue owner the next morning.",
      },
    ],
  },
];

export const topFaqs: FaqItem[] = [
  faqTopics[0].items[0],
  faqTopics[1].items[0],
  faqTopics[2].items[0],
  faqTopics[3].items[0],
  faqTopics[0].items[1],
  faqTopics[1].items[3],
];

/**
 * Homepage questions.
 *
 * These are the "choosing a planner in Lahore" questions people ask before
 * they know what they want — deliberately written so they do not repeat any
 * question already owned by a topic, service or area page. The ledger in
 * entity-graph.ts gives the homepage first claim, so this is the only page on
 * the site that marks them up.
 */
export const homeFaqs: FaqItem[] = [
  {
    q: "What does an event planner in Lahore actually do?",
    a: "On a full commission: budget architecture, venue strategy, design and floral direction, lighting, catering, vendor contracts, guest logistics and a minute-by-minute run-of-show for each function. The design is the visible part. The coordination is the part that decides whether the evening runs.",
  },
  {
    q: "Which areas of Lahore do you cover?",
    a: "The whole city and the farmhouse belt around it — DHA, Bahria Town, Gulberg, Model Town, Johar Town, Wapda Town, Valencia, Cantt and Askari, Green Acres, and the Raiwind, Bedian, Ferozepur and Canal Road corridors. We work from one base at Green Acres and travel out; there are no branch offices.",
  },
  {
    q: "Do you handle decoration and catering together, or separately?",
    a: "Together, and we prefer to. Decor, florals, lighting and the kitchen are all in-house, which means one contract, one accountable line and no morning where two suppliers discover each other's plans on your lawn. Families do book decor or catering alone, and that is fine.",
  },
  {
    q: "Can you manage a full wedding week — mehndi, barat and walima?",
    a: "Yes, and it is the most common way we are booked. Running the week as one commission is also cheaper than three separate ones: the same stage structure, lighting rig and crew get re-dressed between functions rather than built from scratch each time.",
  },
  {
    q: "How much does a wedding planner in Lahore cost?",
    a: "It is set by guest count, number of functions, venue and the scale of the build, so there is no single figure worth quoting. What we will do on a first call is tell you honestly what is achievable at the number you have in mind — including when the answer is that it is not enough for what you are describing.",
  },
  {
    q: "How do we book Anayat Events & Catering?",
    a: "Send your date, rough guest count and which functions you are planning, by WhatsApp, phone or email. A planner — not a form queue — reads it and replies within twelve working hours, usually with a first call or a visit to the farmhouse.",
  },
];

export const allFaqs: FaqItem[] = faqTopics.flatMap((t) => t.items);

const topicMap = new Map(faqTopics.map((t) => [t.slug, t]));

export function getFaqTopic(slug: string) {
  return topicMap.get(slug);
}
