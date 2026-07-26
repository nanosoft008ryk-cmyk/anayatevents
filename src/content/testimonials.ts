export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  event: string;
  area: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t-01",
    quote:
      "We handed over a date and a guest list and got back an entire week that ran itself. Not one relative had to solve anything, which in our family is close to a miracle.",
    name: "Hassan & Zoya",
    event: "Full wedding week",
    area: "Bedian Road",
  },
  {
    id: "t-02",
    quote:
      "The stage was built and lit in their workshop before we ever saw it at the venue. We knew exactly what we were getting, and it was better in the room than in the drawings.",
    name: "The Sheikh Family",
    event: "Luxury barat",
    area: "Bahria Town",
  },
  {
    id: "t-03",
    quote:
      "Three hours out of Lahore, no kitchen, no power. They built all of it and the food came out hotter than at our hotel walima.",
    name: "Ayesha R.",
    event: "Destination wedding",
    area: "Outside Lahore",
  },
  {
    id: "t-04",
    quote:
      "The mehndi was chaos in the best way, and somehow the marigold was still fresh at one in the morning.",
    name: "Mahnoor & family",
    event: "Mehndi",
    area: "DHA Phase 6",
  },
  {
    id: "t-05",
    quote:
      "Eight hundred guests and every table was served within minutes of each other. My father still talks about that more than the decor.",
    name: "Bilal A.",
    event: "Walima",
    area: "Gulberg",
  },
  {
    id: "t-06",
    quote:
      "We wanted a quiet nikah at home. They designed one wall, lit it properly and left everything else alone. Perfect judgement.",
    name: "Sara & Usman",
    event: "Nikah at home",
    area: "DHA Phase 5",
  },
  {
    id: "t-07",
    quote:
      "Our annual dinner had six speakers, a video package and a two-hour dinner service. Everything hit its cue. Procurement liked the single invoice too.",
    name: "Head of Marketing",
    event: "Corporate annual dinner",
    area: "Gulberg",
  },
  {
    id: "t-08",
    quote:
      "A first birthday on a lawn in April with shade, soft flooring and food the adults actually wanted to eat. They thought about things I hadn't.",
    name: "Fatima K.",
    event: "First birthday",
    area: "Model Town",
  },
  {
    id: "t-09",
    quote:
      "We did the tasting in the same kitchen that cooked on the night. That is why the food on the night tasted like the tasting.",
    name: "Nadia & Kamran",
    event: "Wedding catering",
    area: "Green Acres",
  },
  {
    id: "t-10",
    quote:
      "The live grill was the centre of the whole evening. People kept going back. Not one queue all night.",
    name: "Imran S.",
    event: "Mehndi with live BBQ",
    area: "Raiwind Road",
  },
  {
    id: "t-11",
    quote:
      "An open lawn with nothing on it became a full dining room. I never once saw how it was done, which I suppose is the point.",
    name: "The Malik Family",
    event: "Outdoor catering",
    area: "Bedian Road",
  },
  {
    id: "t-12",
    quote:
      "Our hall had one narrow kitchen door and they planned the entire service around it. The far tables ate at the same time as the front.",
    name: "Rabia N.",
    event: "Hall reception",
    area: "Johar Town",
  },
  {
    id: "t-13",
    quote:
      "They knew which farmhouse would flood and told us before we booked. That single sentence saved our wedding.",
    name: "Zainab & Ahmed",
    event: "Farmhouse wedding",
    area: "Bedian Road",
  },
  {
    id: "t-14",
    quote:
      "Every photograph we have from the night looks composed. The photographer said it was the lighting plot, not him.",
    name: "Hira M.",
    event: "Barat stage",
    area: "Bahria Town",
  },
  {
    id: "t-15",
    quote:
      "Fresh flowers for each of the four functions, not the same order moved around. You could smell the difference.",
    name: "The Qureshi Family",
    event: "Wedding florals",
    area: "DHA Lahore",
  },
  {
    id: "t-16",
    quote:
      "Their production manager was at the gate at six in the morning and still standing there at two. We did nothing but attend.",
    name: "Omar T.",
    event: "Venue management",
    area: "Raiwind Road",
  },
  {
    id: "t-17",
    quote:
      "Thirty guests, a private dinner, nothing posted anywhere. Discretion was never something we had to ask for twice.",
    name: "Private client",
    event: "Anniversary dinner",
    area: "Cantt",
  },
];

const map = new Map(testimonials.map((t) => [t.id, t]));

export function getTestimonial(id: string) {
  return map.get(id);
}
