import { site } from "@/data/site";
import { services } from "@/data/services";
import { projects } from "@/data/projects";

// Lists every public page so Google can find them. Built automatically from
// data/services.js and data/projects.js, so new services and projects are
// included without editing this file. Sample projects are left out.
export default function sitemap() {
  const pages = ["", "/services", "/work", "/pricing", "/about", "/contact"];

  const serviceUrls = services.map((service) => `/services/${service.slug}`);

  const projectUrls = projects
    .filter((project) => !project.isSample)
    .map((project) => `/work/${project.slug}`);

  return [...pages, ...serviceUrls, ...projectUrls].map((path) => ({
    url: `${site.url}${path}`,
  }));
}
