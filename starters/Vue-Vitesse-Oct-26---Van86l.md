# Deploy Vue Vitesse [Oct 26] on Railway

🏕 Opinionated Vite + Vue starter (Oct 2026)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Van86l)

## About

Opinionated Vite + Vue starter, synced with [antfu-collective/vitesse](https://github.com/antfu-collective/vitesse) at `a878526` (6 Oct 2026). One click builds the static site and serves it with Caddy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Van86l?referralCode=2Sbs5r)

<p align="center">
  <img width="600" alt="Vitesse - Opinionated Vite Starter Template" src="https://user-images.githubusercontent.com/11247099/154486817-f86b8f20-5463-4122-b6e9-930622e757f2.png">
</p>

Railpack installs Node 24, pnpm 10.30.2, and Caddy 2.11.7, then runs `pnpm build`. [vite-ssg](https://github.com/antfu/vite-ssg) writes the site to `dist`. Caddy listens on Railway's `$PORT` and serves those files.

- Pre-rendered routes such as `/about` are served from their `.html` files
- Unknown paths fall back to `index.html` for client-side routing
- `GET /health` returns `ok`

Requires Node.js 22.22.2+, 24.15.0+, or 26+. This snapshot includes Vite 8, Vue Router 5, beasties, and the Cypress install fix for a warm pnpm cache.

&gt; **Note**: This template is created during the early transition of Vue 3 and Vite. At this moment, if you are seeking for better Vue developer experience and more consistent maintenance, we recommend using [Nuxt](https://nuxt.com) instead (it also works perfectly with SPA or SSG as needed). This template still serves as a reference, but expect slower updates.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vitesse-railway | [marco-quintella/vitesse-railway](https://github.com/marco-quintella/vitesse-railway) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, Vue, HTML, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/Van86l)
