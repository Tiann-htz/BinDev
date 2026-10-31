// Pricing content. Numbers here are the source of truth for the pricing page.
export const websiteTiers = [
  {
    name: "Starter Website",
    price: "$175",
    final: true,
    description: "Final price. Up to 3 pages, template-based design, mobile-friendly, contact form, 1 round of revisions, about 1 week. Hosting, domain, and extra pages are extra.",
  },
  {
    name: "Business Website",
    price: "from $450",
    final: false,
    recommended: true,
    description: "Suggested starting price. Custom design, up to 8 pages, SEO basics, booking or inquiry form, analytics, 2 revision rounds, 2 to 4 weeks.",
  },
];

export const customTiers = [
  {
    name: "Web apps",
    price: "Custom quote",
    final: false,
    description: "Booking, inventory, client and tenant portals, billing, dashboards. Milestone payments. Add-ons: GCash, Maya, and card checkout, email notifications, role-based access.",
  },
  {
    name: "Custom software and systems",
    price: "Custom quote",
    final: false,
    description: "Larger multi-user systems for schools, clinics, rentals, retail, and offices: admin and user portals, reports, data import.",
  },
];

export const carePlan = {
  name: "Care Plan",
  price: "$40 to $120 per month",
  final: false,
  description: "Suggested range. Hosting management, updates, backups, small changes, and priority support.",
};

export const pricingFaqs = [
  {
    q: "What is included in the price?",
    a: "Everything listed for the tier. Hosting, domain names, and extra features are quoted separately.",
  },
  {
    q: "How many revisions do I get?",
    a: "Starter includes 1 round, Business includes 2 rounds. Extra rounds can be added.",
  },
  {
    q: "Is there a deposit for custom projects?",
    a: "Yes, a suggested 50% deposit before work starts, with the rest on delivery.",
  },
  {
    q: "Can I pay in PHP or GCash?",
    a: "Yes, local clients can pay in PHP via GCash or bank transfer.",
  },
];
