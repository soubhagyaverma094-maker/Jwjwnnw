# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A Next.js 14 (App Router) app that started as an AI video generation tool and now also hosts a
separate marketing landing page, both served from the same app:

- `/` — text-to-video generator UI that calls Replicate.
- `/coffee` — "Ember & Oak" coffee brand landing page with a scroll-driven 3D animation.

These two routes are unrelated products sharing one Next.js project; treat them as independent
features when making changes — don't assume changes to one should affect the other.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:3000
npm run build     # production build
npm run start     # run the production build
npm run lint      # next lint (eslint-config-next)
```

There is no test suite configured in this repo.

### Environment setup

Copy `.env.example` to `.env.local` and set:

- `REPLICATE_API_TOKEN` — required for `/api/generate` to work (get one from
  https://replicate.com/account/api-tokens).
- `REPLICATE_MODEL` — defaults to `minimax/video-01`; can be swapped for any text-to-video model
  on Replicate (e.g. `kwaivgi/kling-v1.6-standard`, `luma/ray-flash-2-720p`).

## Architecture

### Video generation (`/`)

- `src/app/page.tsx` — client component with the prompt form and video preview/download UI.
- `src/app/api/generate/route.ts` — Node runtime API route (`runtime = "nodejs"`,
  `maxDuration = 300`) that validates the prompt (non-empty, ≤1000 chars), calls
  `replicate.run(model, { input: { prompt } })`, and normalizes the model output (string, array,
  or an object with a `.url()` method) into a single `videoUrl` via `extractVideoUrl`. All errors
  are returned as JSON `{ error }` with appropriate status codes rather than thrown to the client.

### Coffee landing page (`/coffee`)

Routed under `src/app/coffee/`, with its own `layout.tsx` that loads Google fonts
(`Playfair_Display` as `--font-display`, `Manrope` as `--font-body`) independently of the root
layout — the two routes do not share typography or metadata.

`components/CoffeeSite.tsx` composes the page as a fixed stack of sections: `Navbar`, `Hero`,
`Story`, `ScrollShowcase`, `Menu`, `Footer`.

The centerpiece is `ScrollShowcase.tsx` + `CupScene.tsx`, a scroll-driven 3D animation:

- `ScrollShowcase` creates a tall (`h-[400vh]`) section with a `sticky` inner viewport. It tracks
  scroll progress through that section with Framer Motion's `useScroll`, mirrors it into a plain
  `useRef` (`progressRef`, not React state) via `useMotionValueEvent` to avoid re-rendering the
  Three.js scene on every scroll tick, and fades in/out four `STAGES` captions based on
  scroll-progress ranges using `useTransform`.
- `CupScene` (dynamically imported with `ssr: false`, since `@react-three/fiber`/Three.js is
  client-only) renders a `@react-three/fiber` `<Canvas>` with a rotating coffee cup, animated
  liquid fill, and steam, all driven inside `useFrame` by reading `progressRef.current` each
  frame — not by React props — so the 3D scene stays in sync with scroll without triggering
  React re-renders.

When touching this animation, keep the progress-via-ref pattern: don't lift `scrollYProgress`
into component state, and don't move the Three.js scene out of a dynamically-imported,
`ssr: false` client component.

### Styling

Tailwind CSS. The coffee route uses a bespoke `espresso`/`cream`/`gold` color palette and
`marquee`/`float` keyframe animations defined in `tailwind.config.ts` — these are specific to the
coffee brand, not general design tokens for the rest of the app. Path alias `@/*` resolves to
`src/*` (see `tsconfig.json`).
