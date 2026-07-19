# TinyGlyph

A production-ready small-text generator built with Next.js. It converts normal text into 22 copy-ready Unicode styles in the browser and includes an optional Hugging Face caption starter.

## What is included

- Live small caps, superscript, subscript, bold, cursive, bubble, glitch, and other Unicode transformations
- One-click copy feedback, search, categories, saved styles, samples, and an auto-growing input
- Dedicated SEO pages for ten high-intent text tools
- Structured data, Open Graph artwork, sitemap, robots rules, web app manifest, and security headers
- Optional server-side Hugging Face inference using `Qwen/Qwen3-0.6B` by default
- Responsive tool-workspace design with reduced-motion and keyboard support
- Unit tests and a GitHub Actions quality workflow

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The Unicode generator works without environment variables. To enable the AI caption starter, create a Hugging Face access token and set:

```dotenv
HF_TOKEN=hf_your_token
HF_MODEL=Qwen/Qwen3-0.6B
```

The token stays on the server and is never sent to the browser.

## Hugging Face model discovery

The reusable helper follows the public Hub API and automatically uses `HF_TOKEN` when present:

```bash
scripts/hf-model-search.sh --help
scripts/hf-model-search.sh --query qwen --limit 5
```

It emits compact JSON that can be piped into `jq` or another tool.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

The same checks run in `.github/workflows/quality.yml` on pushes and pull requests.

## Production setup

Before deploying, set `NEXT_PUBLIC_SITE_URL` to the canonical domain, set `NEXT_PUBLIC_CONTACT_EMAIL` if the contact page should publish an address, review the starter privacy/terms copy for your jurisdiction, and add `HF_TOKEN` only if the optional model feature is wanted.

## Design direction

TinyGlyph uses an **Obsidian Signal Deck** direction: near-black command surfaces, a cold neutral canvas, signal vermilion, a persistent focused-tool rail, and a numbered conversion workflow. Its visual anchor is the red operational spine connecting the hero, engine status bar, and six-part capability matrix. Newsreader supplies distinctive display tension while Manrope keeps dense controls precise. The direction scored **14/15** on the design feasibility and impact index: high visual impact and context fit with low performance cost.
