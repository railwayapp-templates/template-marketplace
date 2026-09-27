# Deploy Angular SSR + WebDecoy Bot Detection on Railway

Angular SSR app with WebDecoy bot and AI-scraper detection

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/angular-ssr-webdecoy-bot-detection)

## About

An Angular 22 app rendered on the server, with WebDecoy bot detection already wired into the Express server the Angular CLI generates. WebDecoy records the scrapers, AI crawlers, and automated tools requesting your pages, flags crawlers that fake their identity, and injects a hidden honeytoken link that only bots follow, including into streamed renders. Deploy it as a starting point, or copy what `src/server.ts` does into your own app.

The template is a single Node.js service built from a public GitHub repo: Railway runs `ng build` and then the SSR server, with a `/health` route for Railway's healthcheck. It needs one variable: `WEBDECOY_API_KEY`, which you create for free at app.webdecoy.com under Settings, API Keys. The middleware starts in monitor mode, so detections are recorded and every request is still served. Railway's `X-Forwarded-For` holds the client address followed by its own edge address, so the server trusts two hops rather than one. Angular's host check is set up for Railway domains; if you add a custom domain, list it in the optional `NG_ALLOWED_HOSTS` variable. Without a key the app still runs, with local rules only.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-angular-ssr-starter | [WebDecoy/railway-angular-ssr-starter](https://github.com/WebDecoy/railway-angular-ssr-starter) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NG_ALLOWED_HOSTS` | - | Only for a custom domain: comma-separated hosts Angular may render for, e.g. example.com,www.example.com. Railway domains already work. |
| `WEBDECOY_API_KEY` | (secret) | Your WebDecoy API key. Create one at app.webdecoy.com under Settings > API Keys (free account). |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, HTML, CSS

[View on Railway →](https://railway.com/deploy/angular-ssr-webdecoy-bot-detection)
