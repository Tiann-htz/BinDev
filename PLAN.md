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
- 2026-10-31: TODO for Chris: confirm the "suggested" prices in `data/pricing.js` (Business from $450, Care Plan $40-120) and the budget ranges in `data/inquiry.js`; add real screenshots and live links in `data/projects.js` and `data/projectDetails.js`; real team photo; do 1.12 (database + email) before promoting the Contact page to customers.
- 2026-10-31: Merged `integrate` into `main` (fast-forward, no Pull Request) and pushed; Vercel deployed to https://bindev.vercel.app. Checked live: all 11 pages plus robots.txt, sitemap.xml and the share image return 200; new graphite + lime theme is live; Organization JSON-LD present; Vercel Analytics script returns 200 (Chris enabled Analytics in the Vercel dashboard). `rj-main` is now an ancestor of `main`, so Reji should `git checkout main` and `git pull`, and work from `main` from now on. The old branches `integrate` and `chris-work` can be deleted. Known gap: the Contact page (`InquiryForm`, `BookingEmbed`) does not use `Reveal` yet. LIVE WARNING: `/pricing` shows Reji's "suggested" prices (Business from $450, Care Plan $40-120) and the Contact form saves nothing yet (1.12).
- 2026-11-01: Restored 8 files that were deleted by an accidental Ctrl+Z (layout.js, work/[slug]/page.js, Navbar.js, Footer.js, FeaturedProjects.js, data/site.js, logo1.jpg, textlogo.jpg) from `main` with `git restore`. Tip: commit after every good change so anything lost can be restored.
- 2026-11-01: New logo in Header and Footer. Header: mark (left) + BinDev wordmark right next to it (mark `h-9`, wordmark `h-5`, `gap-2.5`). Footer: mark on top, wordmark below (mark `h-14`, wordmark `h-6`, `gap-3`). They use trimmed, resized copies in `public/brand/logo-mark.png` and `public/brand/logo-wordmark.png`, made from the originals `public/logo1.png` and `public/textlogo.png` (transparent padding cropped away so the two sit evenly; originals are kept as the source files). To change the size or the gap, edit those classes in `components/layout/Navbar.js` and `Footer.js`. If the logo files are replaced again, the trimmed copies must be regenerated. `public/logo.jpg` is still used for the Google JSON-LD logo in `layout.js`.
- 2026-11-01: Dark / light theme switch. Sun/moon round button (`components/ui/ThemeToggle.js`) in the Header, right side, before the "Book a free call" button (on phones it sits next to the menu button). Dark is the default; the choice is saved in localStorage (`bindev-theme`) and applied by a tiny script in `<head>` (`app/layout.js`) before the page paints, so there is no flash. How it works: `<html data-theme="light|dark">`; all colors are tokens in `app/globals.css` (`:root` = dark, `:root[data-theme="light"]` = light). Light palette: bg #F6F8FA, text #0B0F14, cards #FFFFFF, borders #DCE2E9, muted #4B5666, accent #4D7C0F (a deeper green, because the lime #B8FF3D is not readable on white; button text is white). Contrast checked: all text 4.69:1 or better. The logo PNGs are darkened in light mode with the CSS class `logo-adapt` (a filter, adjust in globals.css). RULE for everyone: never hardcode colors in components (no `text-white`, `bg-white`, hex or rgba); use the tokens (`bg-background`, `bg-surface`, `text-foreground`, `text-muted`, `border-hair`, `text-signal`, `bg-signal`) or `color-mix(in_srgb,var(--signal)_15%,transparent)` for glows. Replaced the leftover hardcoded colors in Hero, FeaturedProjects (chips), FinalCTA, ServiceCards, Button. `app/opengraph-image.js` stays dark on purpose (share image). Production build passes (19 pages).
- 2026-11-01: Layout fixes. (1) Home "What we can build" cards were all squeezed into 1 column each (180px) on desktop: the `span` classes were computed in `ServiceCards.js` but never added to the card `className` (bug from the original code). Fixed by adding `${span}`. The bento layout now starts at `lg` (1024px): phone = 1 column, tablet (md) = 2 columns with the first card full width, desktop = 6-column bento (first card 4 columns + 2 stacked cards). Card footer text no longer wraps badly (`flex-wrap`, `whitespace-nowrap`). `/services` overview cards: 3 columns only from `lg`. (2) Gap above the Hero: the header was a normal block (`mt-6`) so the Hero started 80px lower and its grid/glow was cut, leaving an empty strip. Now the header is exactly 80px tall (`h-20 pt-6`, in `Navbar.js`) and the Hero pulls itself up by the same 80px (`-mt-20`) and adds 80px to its top padding (`pt-40 sm:pt-48 lg:pt-56`), so its background reaches the very top. If the header height ever changes, change the Hero too. Only the Hero has a decorative background; other pages start with a plain `bg-background` section below the header.
- 2026-11-01: Real-browser layout check (headless Chrome via puppeteer-core, NOT in the repo, kept in the Windows temp folder `bindev-measure/measure.mjs`): 8 pages x 5 widths (375, 768, 1024, 1440, 1920) x 2 themes = 80 checks. It looks for horizontal scroll, elements sticking out of the screen, text spilling out of cards, wrong theme colors, header height, Hero gap, service card layout, plus click tests (theme switch works, is saved, survives reload; phone menu fits). Result: 0 problems. This test is what found the missing `${span}` bug. RULES: (a) after changing a layout, test at 375, 768, 1024 and 1440px; (b) when a Tailwind class is computed in a variable, make sure the variable is really used in `className`; (c) in dev, if new classes do not show, hard refresh (Ctrl+Shift+R).
- 2026-11-01: Hero is now a full-screen section (`min-h-[100svh]`, content centered, `Hero.js`) so "What we can build" starts below the first screen on every device (checked: 1920x1080, 1440x900, 1366x768, 1280x600, 768x1024, 390x844, 375x667). Headline is bigger (`text-5xl sm:text-6xl lg:text-7xl`, `max-w-4xl`) and the intro text one step larger. The Services section got a small mono label "Services" above its title (`ServiceCards.js`) so it reads as its own section. The Hero still pulls itself up by 80px under the header (`-mt-20`), see the header note above.
- 2026-11-01: Services cards: 3 equal cards side by side from 1024px, 1 column below (`ServiceCards.js`). Test copy `measure-cards.mjs` expects this.
- 2026-11-01: Contact page: 2 columns from 1024px (left = intro + Book a call, right = form), 1 column below. The "Have a project in mind?" CTA was removed from Contact only.
- 2026-11-01: Contact form errors show ONLY after the visitor clicks "Send message": one error at a time (first missing field, in form order) and the cursor jumps to it. Nothing pops up while filling out. Error text is red (new `--danger` color in `globals.css`). Logic is in `InquiryForm.js`.
- 2026-11-01: Quest2Go screenshots (8 PNGs in `public/work`) now fade in and out on Home (Featured work card) and on `/work/quest2go`. Same boxes as before (16:10 on Home, about 2:1 on the case study). New `components/ui/ImageFader.js`; the list and order are in `data/quest2goImages.js`. Pauses on hover, off-screen and with reduce-motion. Live site link is still missing.
