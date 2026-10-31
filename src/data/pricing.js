// Content for the Pricing page. Edit the text and prices here.
// `slug` must match a service in data/services.js (it provides the title,
// icon, and the "what you get" list).
export const pricing = [
  {
    slug: "websites",
    priceLabel: "Starting at",
    price: "$175",
    blurb: "For a simple website that gets your business online.",
  },
  {
    slug: "web-apps",
    priceLabel: "Priced per project",
    price: "Custom quote",
    blurb: "For online tools like booking, dashboards, and customer portals.",
  },
  {
    slug: "custom-software",
    priceLabel: "Priced per project",
    price: "Custom quote",
    blurb: "For a system made around how your business works.",
  },
];

// What changes the price
export const priceFactors = [
  "How many pages or screens you need",
  "Features like login, booking, or online forms",
  "How much custom design you want",
  "How soon you need it",
];

export const faqs = [
  {
    question: "Is the first call really free?",
    answer:
      "Yes. We talk about your project and answer your questions. There is no pressure to hire us.",
  },
  {
    question: "How do I get a price for my project?",
    answer:
      "Book a free call and tell us what you need. After that we send you a simple plan with the price and timeline, and you approve it before we start.",
  },
  {
    question: "Do I need to know anything technical?",
    answer:
      "No. We explain everything in simple words and handle the technical parts for you.",
  },
  {
    question: "Which service is right for me?",
    answer:
      "If you just need to be found online, start with a website. If you need something that does work for you, like bookings or reports, that is a web app. Not sure? Ask us on the free call.",
  },
];
