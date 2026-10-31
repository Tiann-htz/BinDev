# BinDev

Websites, web apps, and custom software for small businesses. Brand pitch: "We build the systems businesses run on, from the first page to the last line of the backend."

- Home base: Davao City, Philippines, serving clients anywhere (remote).
- Contact: see the contact page on the live site.

## Run locally

npm install
npm run dev

Dev server runs on http://localhost:3001 (port 3000 is used by another tool).

Production build:

npm run build
npm run start

## Environment variables

Copy .env.example to .env.local and fill in the values. Do not commit .env.local.

See .env.example for the full list (analytics, booking embed, contact inquiry DB/email).

## Folder structure

src/app/        routes (thin, assemble sections only)
src/components/  layout, ui, sections
src/data/        all content
src/lib/         helpers (validation, email, db) - to be added
public/          static assets

## Deploy

Warning: Vercel's free Hobby plan is personal, non-commercial use only. A company site needs Vercel Pro ($20/user/month) or another host whose free tier allows commercial use. Do not deploy to Hobby.

Set env vars in the host, connect the domain, and test the contact form in production.