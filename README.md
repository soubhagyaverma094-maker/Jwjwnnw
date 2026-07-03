# AI Video Generation Tool

A Next.js app that generates short videos from text prompts using [Replicate](https://replicate.com).

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and set your Replicate API token:

   ```bash
   cp .env.example .env.local
   ```

   Get a token from https://replicate.com/account/api-tokens. `REPLICATE_MODEL` defaults to
   `minimax/video-01` but can be swapped for any text-to-video model on Replicate
   (e.g. `kwaivgi/kling-v1.6-standard`, `luma/ray-flash-2-720p`).

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000, enter a prompt, and generate a video.

## How it works

- `src/app/page.tsx` — prompt form and video preview UI.
- `src/app/api/generate/route.ts` — server route that calls the Replicate API with the
  submitted prompt and returns the resulting video URL.
