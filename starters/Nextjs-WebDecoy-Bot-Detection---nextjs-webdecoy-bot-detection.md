# Deploy Next.js + WebDecoy Bot Detection on Railway

Next.js app with WebDecoy bot and AI-scraper detection in proxy.ts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextjs-webdecoy-bot-detection)

## About

A Next.js 16 app with WebDecoy bot detection already wired in. WebDecoy records the scrapers, AI crawlers, and automated tools hitting your routes, flags crawlers that fake their identity, and plants a hidden honeytoken link that only bots follow. Deploy it as a starting point, or copy `proxy.ts` and the link in `app/layout.tsx` into your own app.

The template is a single Next.js service built from a public GitHub repo and started with `next start`, with a `/health` route for Railway's healthcheck. It needs one variable: `WEBDECOY_API_KEY`, which you create for free at app.webdecoy.com under Settings, API Keys. Detection runs in `proxy.ts` (Next 16's name for middleware) in monitor mode, so detections are recorded and every request is still served. Railway's `X-Forwarded-For` holds the client address followed by its own edge address, so the proxy trusts two hops rather than the default one. Without a key the app still runs, with local rules only.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-nextjs-starter | [WebDecoy/railway-nextjs-starter](https://github.com/WebDecoy/railway-nextjs-starter) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `WEBDECOY_API_KEY` | (secret) | Your WebDecoy API key. Create one at app.webdecoy.com under Settings > API Keys (free account). |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/nextjs-webdecoy-bot-detection)
