import { site } from "@/data/site";

// Tells search engines they may read the whole site, and where the sitemap is.
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
