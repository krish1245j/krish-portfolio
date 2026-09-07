# Krish Kumar — Portfolio

A premium, animated developer portfolio for Krish Kumar (MERN Stack Developer / Backend Developer / BCA Student), built with React, Tailwind CSS v4, and Framer Motion.

## Stack

- **Vite** — build tool and dev server
- **React 19**
- **Tailwind CSS v4** (via `@tailwindcss/vite`, CSS-first theme config — see `src/index.css`)
- **Framer Motion** — entrance animations, scroll-linked reveals, layout transitions
- **lucide-react** — icon set (GitHub icon was dropped from lucide for trademark reasons, so a custom inline SVG is used instead: `src/components/icons/GithubIcon.jsx`)

No Three.js, GSAP, or Lenis — the brief allowed them, but Framer Motion plus native scroll covers everything this site needs without the extra bundle weight or a smooth-scroll library fighting the browser's own scrolling.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
npm run lint       # oxlint
```

## Project structure

```
src/
  components/        # Nav, CustomCursor, ScrollProgress, Loader, ProjectCard, icons/
  sections/           # One file per page section (Hero, About, Skills, Projects, ...)
  data/               # profile.js, projects.js, skills.js — all real resume content,
                       # kept separate from UI so it's easy to update without touching JSX
  hooks/              # useReducedMotion, useActiveSection, useCountUp
  index.css           # design tokens (colors, fonts, easing) via Tailwind v4 @theme
```

## Before you deploy — things to fill in

The brief didn't include live deployment URLs, so these are left as clearly marked
placeholders in `src/data/projects.js` (`liveUrl: null` renders a "Live link coming soon"
badge instead of a broken link):

- AI Resume Analyzer — live URL
- Full Stack E-Commerce Platform — live URL
- Advanced Banking Transaction System — live URL

Just add the URL string to the relevant project's `liveUrl` field once each one is deployed.

The resume PDF is served from `public/Krish_Kumar_Resume.pdf` and downloaded via the
"Resume" buttons in the Hero and Contact sections.

## Design notes

- **Palette**: near-black charcoal (`#0A0B0D`) base, off-white text, one amber/copper
  accent (`#E8A33D`) — chosen to read as "circuit board / solder," not the more common
  neon-green-on-black or terracotta-on-cream AI-portfolio defaults.
- **Type**: Space Grotesk for display headings, Inter for body copy, JetBrains Mono used
  only where it's functionally meaningful (the architecture diagram, the terminal-style
  line in Contact) rather than as decoration.
- **Motion**: one orchestrated entrance sequence in the Hero, scroll-linked reveals in
  Projects and Architecture, and small purposeful micro-interactions elsewhere (magnetic
  contact buttons, skill hover relations, nav active-state indicator). `prefers-reduced-motion`
  is respected globally — the loader is skipped entirely and CSS/JS animation durations
  collapse to near-zero.
- **Accessibility**: semantic sectioning, visible focus rings, ARIA label on the hero's
  SVG diagram, keyboard-operable skill chips, reduced-motion support throughout.
- **Custom cursor**: only mounts on fine-pointer/hover-capable devices; does nothing on
  touch, so there's no wasted CPU on mobile.

## Content policy

Every fact on this site — projects, skills, achievements, education — comes directly from
the resume supplied. Nothing was invented: no fake companies, clients, testimonials,
metrics, or job history.
