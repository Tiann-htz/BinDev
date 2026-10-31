# BinDev Website — Build Plan & Status

> Source of truth. After every applied change, update **Current status** and **Status log** below.

## Current status
- **Done:** 0.1 Project installed, 0.2 Logo saved, 0.3 Folders created, 1.1 Theme tokens, 1.2 Button + Container, 1.3 Navbar, 1.4 Footer, 1.5 Hero, 1.6 ServiceCards, 1.7 FeaturedProjects, 1.8 Process, 1.9 FinalCTA, 1.10 InquiryForm, 1.11 BookingEmbed, 2.1 Services (overview + 3 pages), 2.2 Pricing, 2.3 About, 2.4 Work (Phase 2 complete), 3.1 SEO + analytics
- **In progress:** none
- **Deployed:** https://bindev.vercel.app (Vercel, auto-redeploys on every push to `main`). Repo: https://github.com/Tiann-htz/BinDev. We work directly on `main` (git pull before editing, git push after).
- **Deferred on purpose:** 1.12 `api/inquiry/route.js` (database + email). We build all pages and animations first, then do the backend at the end. Until then the Contact form does NOT send anything.
- **Next:** 3.1b Animation and transition polish pass. Then 1.12 backend (deferred, needed before real customers use the Contact form), 3.2 testing, 3.3 domain.

## Brand (from logo)
- Cyan accent: `#03DEFE`
- Navy (text / dark sections): `#080E1C`
- White: `#FFFFFF` (used for text on navy)
- Contrast note: cyan on white is hard to read as text. Use cyan for buttons/highlights (with navy text), and a darker cyan `#0891B2` for text links.
- Logo file: `public/logo.jpg` (current dark-bg version, final for now). A white-bg version will be made later and swapped in.
- Theme decision (2026-10-31): the WHOLE site is navy with white text (Navbar, Hero, sections, Footer, body). No light theme. New sections: navy background, white text, cyan for buttons and highlights.

## Folder structure
```
src/
  app/                      <- routes only, keep thin (each page just assembles sections)
    layout.js
    page.js                 Home
    services/page.js
    work/page.js
    pricing/page.js
    about/page.js
    contact/page.js
    api/inquiry/route.js
  components/
    layout/                 Navbar.js, Footer.js
    ui/                     Button.js, Container.js, Modal.js, Card.js
    sections/
      home/                 Hero.js, ServiceCards.js, FeaturedProjects.js, Process.js, FinalCTA.js
      services/
      about/
      contact/              InquiryForm.js, BookingEmbed.js
  data/                     services.js, projects.js, process.js (content lives here, not in components)
  lib/                      helpers (validation, email, db)
content/                    markdown case studies / blog (later)
```
Do NOT create `src/pages/`. Next.js treats it as the old Pages Router and it will conflict with `app/`.

## Steps (small on purpose, one step = one sitting)

### Phase 0 — Setup
- [x] 0.1 Install project
- [x] 0.2 Save the current logo (dark bg) as `public/logo.jpg`
- [x] 0.3 Create the folders above (empty placeholders)

### Phase 1 — Week 1 foundation
- [x] 1.1 Theme tokens (colors, fonts) in `globals.css` + `layout.js`, white background
- [x] 1.2 `ui/Button.js` + `ui/Container.js`
- [x] 1.3 `layout/Navbar.js` (navy bar so the dark-bg logo blends in)
- [x] 1.4 `layout/Footer.js` (navy as well)
- [x] 1.5 Home: `Hero.js`
- [x] 1.6 Home: `ServiceCards.js` (+ `data/services.js`)
- [x] 1.7 Home: `FeaturedProjects.js` (+ `data/projects.js`)
- [x] 1.8 Home: `Process.js`
- [x] 1.9 Home: `FinalCTA.js`
- [x] 1.10 Contact page: `InquiryForm.js` (UI only)
- [x] 1.11 Contact page: `BookingEmbed.js`
- [ ] 1.12 `api/inquiry/route.js`: save to DB + email alert to team (DEFERRED: do after Phase 2 and the animation pass 3.1b)

### Phase 2 — Week 2 pages
- [x] 2.1 Services overview + 3 service pages
- [x] 2.2 Pricing page
- [x] 2.3 About page
- [x] 2.4 Work page + case study template + 2 case studies (Quest2Go + 2 samples)

### Phase 3 — Week 3 launch
- [x] 3.1 SEO (titles, descriptions, sitemap) + analytics (Vercel Analytics)
- [ ] 3.1b Animation and transition polish pass (scroll reveals, hover, page transitions). Do it AFTER all pages are built, as one step, so the two of us do not conflict while editing the same files
- [ ] 3.2 Performance check, test on phone and desktop
- [ ] 3.3 Deploy to Vercel + domain

### After launch
- [ ] Project estimator
- [ ] Blog
- [ ] Testimonials

## Status log
- 2026-10-31: Project created with create-next-app. Plan, folder structure and brand colors defined.
- 2026-10-31: Decision: use the current dark-bg logo for now (white-bg version to be made later). Navbar and Footer will be navy bars so the logo blends in.
- 2026-10-31: Done 0.2 (logo saved at `public/logo.jpg`) and 0.3 (folders created, still empty).
- 2026-10-31: Fixed broken Next SWC binary (reinstalled). Dev server now runs on port 3001 (`npm run dev`), because port 3000 is used by the VS Code MCP extension.
- 2026-10-31: Done 1.1 Theme tokens: brand colors (`brand`, `brand-dark`, `navy`) in `globals.css`, dark mode removed, font hooked to `--font-sans`, site title and description set in `layout.js`.
- 2026-10-31: Done 1.2 `ui/Button.js` (variants: primary, outline, dark, light; sizes: md, lg; `href` makes it a link) and `ui/Container.js` (max-w-6xl, responsive padding). Not used on any page yet.
- 2026-10-31: Done 1.3 `layout/Navbar.js` (sticky navy bar, cropped logo, links: Services/Work/Pricing/About, "Book a free call" button, mobile menu). Added to `app/layout.js` so it shows on every page. Links lead to pages that don't exist yet (404 until Phase 2).
- 2026-10-31: Done 1.4 `layout/Footer.js` (navy; "Have a project in mind?" + Book a free call button, logo, link columns, copyright 2026 hardcoded on purpose). Added to `app/layout.js`; page content is wrapped in `flex-1` so the footer sits at the bottom. Note: Home `FinalCTA` (1.9) may overlap with the footer CTA, decide then.
- 2026-10-31: Done 1.5 Home `Hero.js` (badge, headline, short intro, "Book a free call" + "See our services" buttons, "$175" line, soft cyan glow). Replaced the starter `app/page.js`, which now only assembles sections. Headline is a placeholder default: "We build websites and web apps that help your business grow." Can be changed anytime.
- 2026-10-31: Decision change: the whole site uses ONE navy theme (Navbar, Hero, Footer and page body all #080E1C, white text), no light/white theme. Updated globals.css (--background navy, --foreground white, color-scheme: dark), layout.js (iewport.colorScheme = dark) and rewrote Hero.js (navy bg, white text, cyan badge text, secondary button uses the light variant). This fixes the unreadable Hero (navy text on a dark background). New sections must use white text on navy.
- 2026-10-31: Done 1.6 Home `ServiceCards.js` + `data/services.js` (3 cards: Websites from $175, Web apps, Custom software; navy theme, cyan icons, text lives in the data file). Added to `app/page.js` after Hero. Cards link to `/services` (404 until Phase 2).
- 2026-10-31: Done 1.7 Home `FeaturedProjects.js` + `data/projects.js` (Quest2Go Research Platform + Sample Project 1 and 2 as placeholders). Added to `app/page.js` after ServiceCards. TODO: Quest2Go screenshot (`image`) and live link (`url`) in `data/projects.js`; replace the two samples with real projects. `/work` button 404s until Phase 2.
- 2026-10-31: Done 1.8 Home `Process.js` + `data/process.js` (4 steps: Free call, Plan and quote, Build, Launch and support). Export is named `processSteps` on purpose, to avoid clashing with the Node global `process`. Added to `app/page.js` after FeaturedProjects.
- 2026-10-31: Done 1.9 Home `FinalCTA.js` (centered "Have a project in mind?" + Book a free call button, cyan glow). Decision: the CTA block was REMOVED from `Footer.js` (Footer now only has logo, link columns, copyright, with a top border). So the CTA only shows on Home. Other pages (Services, Pricing, About, Work) need their own CTA section later; reuse `FinalCTA` for that.
- 2026-10-31: Done 1.10 Contact page UI: `app/contact/page.js` + `components/sections/contact/InquiryForm.js` (fields: Name, Email, Phone optional, Service dropdown from `data/services.js` + Not sure yet, Message; validation with error messages; success state). UI ONLY: it does NOT send or save anything yet. Step 1.12 must POST the values to `/api/inquiry`. Until 1.12 is done, do not promote the Contact page to real customers.
- 2026-10-31: Done 1.11 Contact page `BookingEmbed.js` + `data/site.js`. It shows an iframe of the booking link (Calendly or Cal.com) under the form. `bookingUrl` in `data/site.js` is EMPTY for now: the section is hidden on the live site and shows a dev hint only on localhost. TODO: paste the real booking link into `data/site.js`.

- 2026-10-31: Pushed the project to GitHub (main) and deployed on Vercel: https://bindev.vercel.app. Collaborator has access. Workflow: git pull, edit, git add ., git commit, git push, directly on main.
- 2026-10-31: Decision: skip 1.12 (backend/database/email) for now. Finish all pages and the animation + responsiveness pass first.
- 2026-10-31: Done 2.1 Services. Routes: `/services` (overview, `sections/services/ServiceList.js`) and `/services/[slug]` (`app/services/[slug]/page.js` + `sections/services/ServiceDetail.js`, built from `data/services.js`, slugs: websites, web-apps, custom-software; unknown slug gives 404). New reusable parts: `ui/PageHeader.js` (use for Pricing, About, Work), `ui/ServiceIcon.js`, `ui/CheckList.js`. `data/services.js` now also holds `headline`, `intro`, `included`, `goodFor`, and `href` (Home cards, Footer and Navbar links now work). `ServiceCards.js` now uses `ServiceIcon`. Each service page ends with `FinalCTA`. NOTE: the wording of included/goodFor lists is a draft written by Claude, review it.
- 2026-10-31: Done 2.2 Pricing. Route `/pricing` (`app/pricing/page.js`) with `sections/pricing/PricingCards.js` (3 cards, one per service; title, icon and checklist come from `data/services.js`, price comes from `data/pricing.js`) and `sections/pricing/PricingFAQ.js` ("What changes the price" + 4 questions using native details/summary, no JS). Ends with `FinalCTA`. Only real price: Websites from $175. Web apps and Custom software show "Custom quote" (priced per project). TODO: confirm prices, add real numbers or packages in `data/pricing.js` if wanted; review the FAQ wording (drafted by Claude).
- 2026-10-31: Done 2.3 About. Route `/about` (`app/about/page.js`) with `sections/about/AboutMission.js` (mission: help businesses and teams make their work easier and faster by improving the flow) and `sections/about/TeamGrid.js` (team photo + 5 member cards with initials avatars). Team data lives in `data/team.js`: Jeff Harell Climaco (CEO), Christian Carl Paete and Robert John Aguio (Full Stack Developers), Aizel Apares (UI/UX Designer), Loren May Florentino (HR). Described as a "small team" with no headcount number. Ends with `FinalCTA`. TODO: replace the placeholder `public/team-placeholder.svg` with the real team photo (set `teamPhoto.src` in `data/team.js`); optional per-member photos later. The mission wording is a draft written by Claude, review it.
- 2026-10-31: Done 2.4 Work. Routes: `/work` (`app/work/page.js` + `sections/work/WorkGrid.js`) and `/work/[slug]` (`app/work/[slug]/page.js` + `sections/work/CaseStudy.js`, built from `data/projects.js`; unknown slug gives 404). Case study layout: 01 Client and goal, 02 The problem, 03 What we built (+ stack), 04 The result, 05 Screenshots, then `FinalCTA`. New shared parts: `ui/ProjectCard.js` (used by Home and Work, has a "Sample" badge and "Read case study" link) and `ui/ProjectImage.js`. `home/FeaturedProjects.js` was rewritten to use `ProjectCard` (cards now link to the case study). `data/projects.js` now has case study fields (client, goal, problem, built, result, screenshots, isSample). Projects: Quest2Go (real) + 2 SAMPLES (`sample-business-website`, `sample-inventory-system`, marked isSample). Placeholder screenshots: `public/projects/placeholder-desktop.svg` and `placeholder-mobile.svg`. TODO: Quest2Go problem/built/result are a DRAFT written by Claude, replace with the real story and real numbers; add real screenshots (set `image` and `screenshots`) and the live `url`; replace the 2 samples with real projects (or delete them) before promoting the site. Phase 2 is complete.
- 2026-10-31: Done 3.1 SEO + analytics. `app/layout.js` now has `metadataBase` (from `site.url` in `data/site.js`, currently https://bindev.vercel.app), default title/description, Open Graph + Twitter card tags, Organization JSON-LD, and `<Analytics />` from `@vercel/analytics/next` (package installed). New files: `app/sitemap.js` (built from `data/services.js` + `data/projects.js`, leaves out sample projects), `app/robots.js`, `app/opengraph-image.js` (generated share image: navy, "BinDev", tagline, button). Sample case study pages are `noindex` via `generateMetadata` in `app/work/[slug]/page.js`. Every page already had its own title and description. TODO (Tiiaan): in the Vercel dashboard open the project, go to Analytics and click Enable (analytics records nothing until then, and only on the live site, not on localhost). When we get a custom domain, change `site.url` in `data/site.js`. After deploying, check https://bindev.vercel.app/sitemap.xml and test a link in the Facebook Sharing Debugger. Optional later: Google Search Console (submit the sitemap).
