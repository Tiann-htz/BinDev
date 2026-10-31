# BinDev Website — Build Plan & Status

> Source of truth. After every applied change, update **Current status** and **Status log** below.

## Current status
- **Done:** Housekeeping, 0.1-0.3, 1.1-1.11, 1.12 (skeleton only), 2.1-2.4, 3.1 SEO + analytics, 3.1b motion
- **In progress:** none
- **Next:** 3.2 Performance check on phone and desktop. Still open: 1.12 backend (database + email), confirm prices, real screenshots and live links, real team photo

## Brand (current code)
- Theme: one dark theme only.
- Graphite ground: `#0B0F14`; surface `#121821`; hairline `#1F2530`.
- Text: `#EAEFF7` primary, `#9BA6B5` muted.
- Accent "signal": `#B8FF3D` (primary CTA, active states, one indicator per vviewport only).
- Fonts: Bricolage Grotesque (display), Plus Jakarta Sans (body), JetBrains Mono (eyebrows, prices, figures).
- Logo file: `public/logo.jpg` (dark bg). It sits on a dark surface (navbar/footer).

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
- [ ] 1.12 `api/inquiry/route.js`: save to DB + email alert to team (skeleton done: validation, honeypot, rate limit. DB insert + email still TODO, the form shows success but saves nothing yet)

### Phase 2 — Week 2 pages
- [x] 2.1 Services overview + 3 service pages
- [x] 2.2 Pricing page
- [x] 2.3 About page
- [x] 2.4 Work page + case study template + 2 case studies

### Phase 3 — Week 3 launch
- [x] 3.1 SEO (titles, descriptions, sitemap) + analytics
- [x] 3.1b Motion / animation pass (Reji: `ui/Reveal.js` + motion-system.html)
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
- 2026-10-31: Decision change: the whole site uses ONE navy theme (Navbar, Hero, Footer and page body all #080E1C, white text), no light/white theme. Updated globals.css (--background navy, --foreground white, color-scheme: dark), layout.js (vviewport.colorScheme = dark) and rewrote Hero.js (navy bg, white text, cyan badge text, secondary button uses the light variant). This fixes the unreadable Hero (navy text on a dark background). New sections must use white text on navy.
- 2026-10-31: Done 1.6 Home `ServiceCards.js` + `data/services.js` (3 cards: Websites from $175, Web apps, Custom software; navy theme, cyan icons, text lives in the data file). Added to `app/page.js` after Hero. Cards link to `/services` (404 until Phase 2).
- 2026-10-31: Done 1.7 Home `FeaturedProjects.js` + `data/projects.js` (Quest2Go Research Platform + Sample Project 1 and 2 as placeholders). Added to `app/page.js` after ServiceCards. TODO: Quest2Go screenshot (`image`) and live link (`url`) in `data/projects.js`; replace the two samples with real projects. `/work` button 404s until Phase 2.
- 2026-10-31: Done 1.8 Home `Process.js` + `data/process.js` (4 steps: Free call, Plan and quote, Build, Launch and support). Export is named `processSteps` on purpose, to avoid clashing with the Node global `process`. Added to `app/page.js` after FeaturedProjects.
- 2026-10-31: Done 1.9 Home `FinalCTA.js` (centered "Have a project in mind?" + Book a free call button, cyan glow). Decision: the CTA block was REMOVED from `Footer.js` (Footer now only has logo, link columns, copyright, with a top border). So the CTA only shows on Home. Other pages (Services, Pricing, About, Work) need their own CTA section later; reuse `FinalCTA` for that.
- 2026-10-31: Housekeeping done: PLAN brand updated to graphite + signal, README replaced, gitignore completed, package name changed to bindev, sample projects hidden and FeaturedProjects now shows only real projects (currently Quest2Go).
- 2026-10-31: Done 1.10 Contact page (UI only): `/contact` route, `InquiryForm` (validation, honeypot, success state, accessible focus) and options data in `src/data/inquiry.js`. Validation helper in `src/lib/validation.js`. No backend yet.
- 2026-10-31: Done 1.11 BookingEmbed: env-driven (`NEXT_PUBLIC_BOOKING_URL`) with friendly fallback plus optional email link (`NEXT_PUBLIC_CONTACT_EMAIL`). Added `.env.example`.
- 2026-10-31: Done 1.12 inquiry API skeleton: `/api/inquiry` validates, rejects honeypot and rate-limits; DB insert and Resend email are TODO (skeleton only, no new dependencies). Form now posts to it.
- 2026-10-31: Done 2.1 Services overview and 3 service pages: `/services`, `/services/websites`, `/services/web-apps`, `/services/custom-software`. Home ServiceCards now link to specific pages. Content in `src/data/serviceDetails.js`.
- 2026-10-31: Done 2.2 Pricing page: `/pricing` with suggested prices (Starter $175 final, Business from $450 suggested, custom quotes, Care Plan $40-120 suggested), signal rail on recommended tier, and FAQ. Prices live in `src/data/pricing.js`.
- 2026-10-31: Done 2.3 About page: `/about` with story, values, team (published only; placeholder hidden), and FAQ. Team data in `src/data/team.js`.
- 2026-10-31: INTEGRATION (branch `integrate`, base = Reji's `rj-main`; Chris chose Reji's version). Kept Reji's graphite + signal theme, motion, API skeleton and content pages. Ported from Chris's `chris-work` branch: Work pages (`/work`, `/work/[slug]` built from Reji's honest `data/projectDetails.js`: Quest2Go, RJ BoardHouse; sample case studies were NOT ported), `sections/work/WorkGrid.js` and `CaseStudy.js`, Home FeaturedProjects now links to the case study. SEO: `data/site.js` (url from `NEXT_PUBLIC_SITE_URL`, fallback https://bindev.vercel.app), `layout.js` (metadataBase, title template `%s | BinDev`, Open Graph, Twitter, Organization JSON-LD, `<Analytics />`), `app/sitemap.js` (from services + projectDetails), `app/robots.js`, `app/opengraph-image.js` (restyled to graphite + lime), favicon. `@vercel/analytics` added. Fixed the eslint error in `ui/Reveal.js` (reduced motion is now CSS-only with `motion-reduce:` classes).
- 2026-10-31: TODO for Chris: enable Analytics in the Vercel dashboard (nothing is recorded until then); confirm the "suggested" prices in `data/pricing.js` (Business from $450, Care Plan $40-120) and the budget ranges in `data/inquiry.js`; add real screenshots and live links in `data/projects.js` and `data/projectDetails.js`; real team photo; do 1.12 (database + email) before promoting the Contact page to customers.