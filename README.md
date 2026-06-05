# Tanmay Devrani — Portfolio

My personal portfolio site. Shows my work, experience, and has a built-in admin dashboard to manage content without touching code.

**Live:** https://tanmaydevrani.vercel.app

---

## Features

- GSAP scroll animations — hero entrance, parallax, scroll-triggered counters
- 3D tilt effect on the profile photo (CSS `perspective` + GSAP)
- Light/dark theme via Redux, synced to `localStorage`
- i18n support out of the box (English, German, French, Spanish, Japanese)
- Contact form with honeypot spam protection
- Password-protected `/admin` panel to manage projects, experience, and site copy — no backend required, everything lives in `localStorage`
- Mobile bottom tab bar + floating desktop nav
- Skeleton loaders while data loads
- Category filter on the projects page

## Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS 4 + Bootstrap 5 (nav/tabs) + CSS custom properties |
| State | Redux Toolkit |
| Routing | react-router-dom v7 |
| Forms | react-hook-form + Zod |
| Animations | GSAP 3 + ScrollTrigger |
| i18n | react-i18next |
| Deployment | Vercel |

## Getting started

```sh
git clone https://github.com/tanmaydevrani/tanmay-portfolio.git
cd tanmay-portfolio

cp .env.example .env   # then fill in your values

npm install
npm run dev
```

### Environment variables

| Variable | What it's for |
|---|---|
| `VITE_ADMIN_USERNAME` | Username for the admin panel |
| `VITE_ADMIN_PASSWORD` | Password for the admin panel |
| `VITE_IMGBB_API_KEY` | Free image hosting for project uploads — get one at [imgbb.com](https://imgbb.com) |

The app runs fine without the imgBB key — image upload in the admin just won't work.

## Admin panel

Hit `/admin` in the browser. After logging in you can:

- Add / edit / delete projects (with image upload)
- Edit work experience entries
- Update bio, skills, and education on the About page
- Change site-wide settings (name, tagline, resume URL, social links)
- Read contact messages submitted through the form

Content is stored in `localStorage` so there's no backend to spin up. The storage layer is isolated in `src/lib/storage.js` — swapping it for an API or a real DB later is just a matter of replacing those functions.

## Project structure

```
src/
├── admin/          # admin pages (Dashboard, Projects, Experience, etc.)
├── components/     # shared UI (Header, Footer, Cards, ContactForm, etc.)
├── data/           # defaultContent.js — seed data when localStorage is empty
├── features/       # Redux slices (theme)
├── hooks/          # useAuth, useFirestore (thin wrapper around storage reads)
├── i18n/           # translation files per locale
├── lib/            # storage.js (CRUD helpers), adminAuth.js
├── pages/          # public pages (Home, About, Experience, Projects, Contact)
└── store/          # Redux store setup
```

## Scripts

```sh
npm run dev       # start dev server
npm run build     # production build → dist/
npm run preview   # preview the production build locally
npm run lint      # ESLint
```

## Notes

- Admin auth is client-side only — credentials live in env vars, not a server. Fine for a personal site, but don't store anything sensitive in the admin.
- The `useFirestore` hook name is a holdover from an earlier Appwrite/Firestore integration. It now wraps the localStorage storage layer.
- Fonts load from the system font stack (`-apple-system`, `BlinkMacSystemFont`, etc.) — no external font requests.

---

Made by [Tanmay Devrani](https://github.com/tanmaydevrani)
