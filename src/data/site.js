// Site-wide settings. Edit here, not in the components.
export const site = {
  name: "BinDev",
  // Live address of the site, used for share links, the sitemap and Google.
  // When you get your own domain, set NEXT_PUBLIC_SITE_URL in Vercel
  // (Settings > Environment Variables) or change the fallback below.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://bindev.vercel.app").replace(
    /\/$/,
    ""
  ),
};
