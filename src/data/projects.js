// Content for the Work page, the case study pages (/work/[slug]) and the
// featured projects on the Home page. Edit the text here.
//
// image:       card image on Home and Work (path inside /public). null shows a text placeholder.
// url:         live site link. null hides the "Visit site" button.
// isSample:    true shows a "Sample" badge. Remove it (or delete the project) once you have a real one.
// screenshots: list of { src, alt } shown on the case study page.
//
// TODO (Quest2Go): the problem, built and result texts are a DRAFT written by Claude.
// Replace them with the real story, real numbers, real screenshots and the live link.
// TODO (samples): replace "sample-1" and "sample-2" with real projects.

const desktopShot = "/projects/placeholder-desktop.svg";
const mobileShot = "/projects/placeholder-mobile.svg";

export const projects = [
  {
    slug: "quest2go",
    category: "Web system",
    title: "Quest2Go Research Platform",
    description:
      "A Davao City platform for unpublished research studies. Students, teachers, and researchers can search and request academic research, with dashboards and a mobile-friendly design.",
    stack: ["Next.js", "phpMyAdmin", "SQL"],
    image: desktopShot, // TODO: real screenshot, e.g. "/projects/quest2go.jpg"
    url: null, // TODO: add the live site link
    isSample: false,
    client: "Quest2Go, Davao City",
    goal: "Make unpublished research studies easy to find and request in one place.",
    problem:
      "Unpublished research studies are hard to find. Students, teachers, and researchers often do not know what has already been studied, and getting a copy means asking around.",
    built: [
      "A searchable library of unpublished research studies",
      "A request flow so users can ask for the study they need",
      "Dashboards for the different kinds of users",
      "A mobile-friendly design that works on phones and desktops",
    ],
    result: [
      "Research studies now live in one searchable place.",
      "Students, teachers, and researchers can request what they need online.",
      "The platform works smoothly on both phones and laptops.",
    ],
    screenshots: [
      { src: desktopShot, alt: "Quest2Go home page (placeholder)" },
      { src: desktopShot, alt: "Quest2Go research search (placeholder)" },
      { src: mobileShot, alt: "Quest2Go on mobile (placeholder)" },
    ],
  },
  {
    slug: "sample-business-website",
    category: "Website",
    title: "Sample Business Website",
    description:
      "An example of a simple, fast website for a small local business, with service pages and an inquiry form.",
    stack: ["Next.js", "Tailwind CSS"],
    image: desktopShot,
    url: null,
    isSample: true,
    client: "A local small business (sample)",
    goal: "Get a clean website that shows their services and brings in inquiries.",
    problem:
      "The business had no website, so customers could only find them through social media and word of mouth.",
    built: [
      "A fast, mobile-friendly website",
      "Pages for services, about, and contact",
      "An inquiry form so customers can reach the owner",
      "Basic SEO so the business can be found on search engines",
    ],
    result: [
      "The business now has a professional presence online.",
      "Customers can read about services and send inquiries any time.",
    ],
    screenshots: [
      { src: desktopShot, alt: "Sample website home page (placeholder)" },
      { src: desktopShot, alt: "Sample website services page (placeholder)" },
      { src: mobileShot, alt: "Sample website on mobile (placeholder)" },
    ],
  },
  {
    slug: "sample-inventory-system",
    category: "Web app",
    title: "Sample Inventory System",
    description:
      "An example of a web app that replaces paper and spreadsheet tracking with one simple system.",
    stack: ["React", "Node.js", "SQL"],
    image: desktopShot,
    url: null,
    isSample: true,
    client: "A growing shop (sample)",
    goal: "Replace paper and spreadsheets with one system for stock and sales.",
    problem:
      "Stock and sales were tracked by hand, which was slow and led to mistakes.",
    built: [
      "A web app to track products and stock levels",
      "Sales records with simple reports",
      "Login with different access for the owner and staff",
    ],
    result: [
      "Less manual work and fewer mistakes.",
      "The owner can see stock and sales in one place.",
    ],
    screenshots: [
      { src: desktopShot, alt: "Sample dashboard (placeholder)" },
      { src: desktopShot, alt: "Sample stock list (placeholder)" },
      { src: mobileShot, alt: "Sample app on mobile (placeholder)" },
    ],
  },
];
