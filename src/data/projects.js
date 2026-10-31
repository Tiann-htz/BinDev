// Content for the featured projects on the Home page. Edit the text here.
//
// image: path inside /public (example: "/projects/quest2go.jpg"). Leave null to
//        show a placeholder until you have a screenshot.
// url:   live site link. Leave null to hide the "Visit site" button.
export const projects = [
  {
    slug: "quest2go",
    featured: true,
    category: "Web system",
    title: "Quest2Go Research Platform",
    description:
      "A Davao City platform for unpublished research studies. Students, teachers, and researchers can search and request academic research, with dashboards and a mobile-friendly design.",
    stack: ["Next.js", "phpMyAdmin", "SQL"],
    image: null, // TODO: add screenshot, e.g. "/projects/quest2go.jpg"
    url: null, // TODO: add the live site link
  },
  // Hidden on the live site until real projects replace them.
  {
    slug: "sample-1",
    featured: false,
    category: "Website",
    title: "Sample Project 1",
    description:
      "Sample description. Replace this with a short summary of the problem, what we built, and the result for the client.",
    stack: ["Next.js", "Tailwind CSS"],
    image: null,
    url: null,
  },
  {
    slug: "sample-2",
    featured: false,
    category: "Web app",
    title: "Sample Project 2",
    description:
      "Sample description. Replace this with a short summary of the problem, what we built, and the result for the client.",
    stack: ["React", "Node.js", "SQL"],
    image: null,
    url: null,
  },
];
