import { Bricolage_Grotesque, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SignalCursor from "@/components/ui/SignalCursor";
import AmbientBackground from "@/components/ui/AmbientBackground";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Intro from "@/components/ui/Intro";
import GlobalGlow from "@/components/ui/GlobalGlow";
import { site } from "@/data/site";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteTitle = "BinDev | Web Apps, Websites & Custom Software";
const siteDescription =
  "BinDev builds websites, web apps, and custom software for small businesses. Book a free call.";

export const metadata = {
  // Makes share links and the sitemap use the full web address
  metadataBase: new URL(site.url),
  // Pages set a short title (for example "Pricing"), the template adds "| BinDev"
  title: { default: siteTitle, template: "%s | BinDev" },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: siteTitle,
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

// Tells Google who BinDev is (shown in some search results)
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo.jpg`,
  description: siteDescription,
};

export const viewport = {
  // Both themes are supported. ThemeToggle keeps the browser bar color in sync.
  colorScheme: "dark light",
  themeColor: "#0B0F14",
};

// Runs before the page is painted: applies the saved theme (dark by default),
// so the page never flashes the wrong colors. Keep in sync with ThemeToggle.js.
const themeScript = `(function(){try{var t=localStorage.getItem("bindev-theme");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark");}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} ${jakarta.variable} ${jetbrains.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AmbientBackground />
        <Intro />
        <GlobalGlow />
        <SignalCursor />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <SmoothScroll>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </SmoothScroll>
        <ScrollProgress />
        <Analytics />
      </body>
    </html>
  );
}
