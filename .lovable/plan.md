
# Safi Ur Rehman — Personal Brand Site

A dark, editorial, agency-feeling site. Typography carries weight, one vivid orange accent appears with restraint, motion is purposeful, and a procedural Three.js scene anchors the hero.

## Visual System

- **Palette:** deep black `#0A0A0A` background, off-white `#F5F2EC` text, mid grey `#6B6B6B`, single accent orange `#FF5B1F`.
- **Typography:** display = Fraunces (or Instrument Serif) for dramatic italic moments + Inter Tight for body. Big bold display sizes (clamp to 12rem on desktop), tight tracking, dramatic line breaks.
- **Motion:** Framer Motion for scroll reveals, GSAP-style mask sweeps on section transitions, cursor-reactive 3D, subtle hover micro-interactions only where meaningful.
- **Layout:** generous negative space, asymmetric editorial grids, no card-grid portfolio clichés.

## Three.js Hero Element

Procedural scene: a slowly-rotating distorted sphere (custom shader with noise) in matte black with subtle orange rim light, reacting to cursor position. Falls back to a static CSS gradient orb if WebGL fails. Lives behind/intersecting the name typography so it feels composed, not pasted.

## Pages & Routes

```text
/                     Landing
/work/arc             ARC case study
/work/inotes          iNotes case study
/work/dailypulse      DailyPulse case study
```

### Landing sections (single scroll)

1. **Hero** — Three.js scene + oversized "Safi Ur Rehman" with role fragment ("Full-stack developer. Lahore.") set as a quiet sub-statement.
2. **Intro statement** — one or two short sentences. Editorial pull-quote treatment.
3. **Selected Work** — three projects, full-bleed, one per scroll viewport. Each: large visual/screenshot, project name in display type, single line, subtle "→ case study" link. No buttons, no badges.
4. **Labs** — three small cards (Discord Bot, API Testing Suite, Currently Exploring). Honest status labels. "Currently Exploring" card has a soft pulse / live feel.
5. **Background** — internship + education as two short editorial blocks, not a timeline.
6. **Contact** — oversized email as the primary statement. LinkedIn + GitHub as quiet secondary links.

### Case study pages (editorial)

Magazine layout, not README. Sections: hero (project name + one-line), context, what I built, what was hard, what I learned, stack, links (live + GitHub). I'll draft the long-form copy in Safi's voice based on the brief.

## Tech & Implementation

- TanStack Start routes under `src/routes/`: `index.tsx`, `work.$slug.tsx` (or three individual files).
- Add packages: `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `@fontsource-variable/fraunces`, `@fontsource-variable/inter-tight`.
- Project data in `src/lib/projects.ts` (slug, title, tagline, hero image prompt, live, github, long-form sections).
- Hero scene in `src/components/HeroScene.tsx` with `Suspense` + error boundary fallback.
- All colors via tokens in `src/styles.css` (`--background`, `--foreground`, `--accent`, `--muted`).
- Per-route `head()` metadata (title, description, og tags). og:image on case study leaves only.
- Real project screenshots via `imagegen` (editorial mockups of each app, not generic device frames).

## Performance & Responsive

- Lazy-load Three.js scene; ship a CSS placeholder on first paint.
- Mobile: scale display type down aggressively, swap full-bleed work sections to stacked editorial blocks, keep all motion but reduce parallax magnitude.
- Respect `prefers-reduced-motion` — disable parallax and shader animation, keep fades.

## Out of Scope (v1)

- No CMS, no contact form (mailto only), no blog, no analytics dashboard.
- Discord bot card links to GitHub or shows "demo coming" — no video URL yet.

## Open Decisions I'll Make While Building

- Exact display font (Fraunces vs Instrument Serif vs PP Editorial-style alternative) — picked on first render.
- Whether case studies are one dynamic route `work.$slug.tsx` with data file (preferred) or three separate route files.
