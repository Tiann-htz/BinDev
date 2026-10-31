# BinDev Website — Build Plan & Status

> Source of truth. After every applied change, update **Current status** and **Status log** below.

## Current status
- **Done:** 0.1 Project installed, 0.2 Logo saved, 0.3 Folders created, 1.1 Theme tokens, 1.2 Button + Container, 1.3 Navbar, 1.4 Footer, 1.5 Hero, 1.6 ServiceCards, 1.7 FeaturedProjects, 1.8 Process, 1.9 FinalCTA
- **In progress:** none
- **Next:** 1.10 Contact page `InquiryForm.js` (UI only)

## Brand (from logo)
- Cyan accent: `#03DEFE`
- Navy (text / dark sections): `#080E1C`
- White: `#FFFFFF` (page background for now)
- Contrast note: cyan on white is hard to read as text. Use cyan for buttons/highlights (with navy text), and a darker cyan `#0891B2` for text links.
- Logo file: `public/logo.jpg` (current dark-bg version, final for now). A white-bg version will be made later and swapped in.
- Because the logo has a dark background, it always sits on a navy surface (Navbar, Footer, or a navy card). The page body stays white.

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
- [ ] 1.10 Contact page: `InquiryForm.js` (UI only)
- [ ] 1.11 Contact page: `BookingEmbed.js`
- [ ] 1.12 `api/inquiry/route.js`: save to DB + email alert to team

### Phase 2 — Week 2 pages
- [ ] 2.1 Services overview + 3 service pages
- [ ] 2.2 Pricing page
- [ ] 2.3 About page
- [ ] 2.4 Work page + case study template + 2 case studies

### Phase 3 — Week 3 launch
- [ ] 3.1 SEO (titles, descriptions, sitemap) + analytics
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
