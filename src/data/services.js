// Content for the services. Edit the text here, not in the components.
// Used by: Home service cards, /services overview, /services/[slug] pages,
// and the Contact form dropdown.
//
// icon: must match a key in components/ui/ServiceIcon.js (website, app, custom)
// slug: becomes the page address, e.g. /services/websites
export const services = [
  {
    slug: "websites",
    icon: "website",
    title: "Websites",
    description:
      "Clean, fast websites that look good on any phone or computer and help customers find and contact you.",
    note: "Starting at $175",
    href: "/services/websites",
    // Detail page
    headline: "A website that makes your business easy to find and trust.",
    intro:
      "Most customers look you up online before they call. We build a simple, good-looking website so they find you, trust you, and get in touch.",
    included: [
      "Design that looks good on phones and computers",
      "Fast-loading pages",
      "A contact form so customers can reach you",
      "Basic setup so people can find you on Google",
      "Help with your domain and going live",
    ],
    goodFor: [
      "Small shops and local businesses",
      "Freelancers and professionals",
      "Anyone who needs an online presence",
    ],
  },
  {
    slug: "web-apps",
    icon: "app",
    title: "Web apps",
    description:
      "Online tools for your business, like booking, dashboards, and customer portals, built to be simple to use.",
    note: "Priced per project",
    href: "/services/web-apps",
    headline: "Online tools that save you time and keep things organized.",
    intro:
      "A web app is a website that does work for you, like taking bookings, tracking orders, or showing reports. We build it simple, so your team and your customers can use it without training.",
    included: [
      "Booking, ordering, or request systems",
      "Login for customers or staff",
      "Dashboards and reports",
      "Works on phone and computer",
      "Hosted and set up for you",
    ],
    goodFor: [
      "Businesses that take bookings or orders",
      "Schools and organizations",
      "Teams that need a simple internal tool",
    ],
  },
  {
    slug: "custom-software",
    icon: "custom",
    title: "Custom software",
    description:
      "A system made just for how you work, so you can stop fighting spreadsheets and tools that don't fit.",
    note: "Priced per project",
    href: "/services/custom-software",
    headline: "Software made around how your business actually works.",
    intro:
      "When ready-made tools do not fit, we build a system just for you. We start by learning how you work, then build only what you need.",
    included: [
      "We learn how your business works first",
      "Built around your process, not the other way around",
      "Connects with tools you already use",
      "Training so your team can use it",
      "Support after launch",
    ],
    goodFor: [
      "Businesses that run on spreadsheets",
      "Teams with a lot of repeated manual work",
      "Ideas that off-the-shelf tools cannot do",
    ],
  },
];
