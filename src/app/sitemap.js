import { site } from "@/data/site";
import { services } from "@/data/services";
import { projectDetails } from "@/data/projectDetails";

// Lists every public page so Google can find them. Service and case study
// pages are added automatically from data/services.js and
// data/projectDetails.js, so new ones are included without editing this file.
export default function sitemap() {
  const pages = ["", "/services", "/work", "/pricing", "/about", "/contact"];

  const serviceUrls = services.map((service) => `/services/${service.slug}`);
  const projectUrls = projectDetails.map((project) => `/work/${project.slug}`);

  return [...pages, ...serviceUrls, ...projectUrls].map((path) => ({
    url: `${site.url}${path}`,
  }));
}
