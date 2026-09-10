export const site = {
  name: "Anayat Events & Catering",
  legalName: "Anayat Events & Catering | Event Management Lahore",
  short: "Anayat Events",
  tagline: "You Think. We Do.",
  category: "Event management company",
  description:
    "Anayat Events & Catering is a luxury event management and catering house in Lahore, designing weddings, celebrations and corporate occasions with an unhurried, editorial hand.",
  rating: { value: "5.0", count: 62 },
  address: {
    street: "The Palms 7 Farmhouse, Green Acres Extension",
    locality: "Lahore",
    region: "Punjab",
    postalCode: "54000",
    country: "PK",
    full: "The Palms 7 Farmhouse, Green Acres Extension, Lahore 54000, Pakistan",
  },
  // Contact details taken from the business's own published listings (Instagram
  // @anayat_events_catering). No email is published, so the site never shows one.
  contacts: [
    { name: "Mian Saif", display: "0321 416 9707", tel: "tel:+923214169707", whatsapp: "https://wa.me/923214169707" },
    { name: "Mian Asif", display: "0321 033 3224", tel: "tel:+923210333224", whatsapp: "https://wa.me/923210333224" },
  ],
  phoneDisplay: "0321 416 9707",
  phoneHref: "tel:+923214169707",
  phoneE164: "+92 321 4169707",
  whatsappDisplay: "0321 033 3224",
  whatsappHref: "https://wa.me/923210333224",
  instagram: "https://www.instagram.com/anayat_events_catering/",
  /** No email is published on the GMB listing yet. Set it here and the
   *  proposal modal instantly gains a mailto: submission route. */
  email: "" as string,

  hours: "Open daily, 12:00 PM – 10:00 PM",
  hoursSchema: ["Mo-Su 12:00-22:00"],
  geo: { lat: 31.4037716, lng: 74.241375 },
  /** Canonical Google Business Profile link (opens the verified listing). */
  mapsUrl: "https://maps.app.goo.gl/Ss3oQGNPi72YhEu39",
  /** Direct "write a review" deep link for the Google Business Profile. */
  reviewUrl: "https://g.page/r/CSTvh8Mt67BeEBM/review",
  facebook: "https://www.facebook.com/anayatevents",
  mapEmbed:
    "https://www.google.com/maps?q=Green+Acres+Extension+Lahore+54000&output=embed",
  /** Google Maps directions deep link to the studio, from the user's location. */
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("The Palms 7 Farmhouse, Green Acres Extension, Lahore 54000, Pakistan"),
  founded: "2016",
  serviceArea: "Lahore and surrounding Punjab",
  /** Named neighbourhoods served — used verbatim in LocalBusiness areaServed. */
  areaServedList: [
    "DHA Lahore",
    "Bahria Town Lahore",
    "Gulberg Lahore",
    "Johar Town Lahore",
    "Model Town Lahore",
    "Cantt & Askari Lahore",
    "Green Acres Lahore",
  ],
  responseTime: "Within 12 working hours",
};


export const consultationSteps = [
  {
    step: "01",
    title: "The Enquiry",
    body: "Share your date, guest count and the feeling you want the evening to leave behind. A single planner reads every enquiry — never a queue, never a form robot.",
  },
  {
    step: "02",
    title: "The Conversation",
    body: "We meet at the farmhouse or over a call. We listen more than we present. By the end we know your families, your constraints and your non-negotiables.",
  },
  {
    step: "03",
    title: "The Proposal",
    body: "A designed document: floor plans, elevation sketches, palette, floral schedule, menu direction and a transparent investment range. One revision round is included as standard.",
  },
  {
    step: "04",
    title: "The Build",
    body: "Production begins weeks out. Fabrication, florals, lighting design, kitchen trials. You receive a weekly note; nothing is a surprise on the day.",
  },
  {
    step: "05",
    title: "The Evening",
    body: "A full crew on site from dawn. You arrive as a guest at your own celebration — which is the only measure of a plan that worked.",
  },
];

export const stats = [
  { value: "5.0", label: "Google rating", sub: "62 verified reviews" },
  { value: "500+", label: "Celebrations delivered", sub: "Since 2016" },
  { value: "11", label: "Service areas", sub: "Across Lahore" },
  { value: "40+", label: "In-house crew", sub: "Design, floral, kitchen" },
];
