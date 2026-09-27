# Deploy Hono + WebDecoy Bot Detection on Railway

Hono app on Node with WebDecoy bot and AI-scraper detection

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hono-webdecoy-bot-detection)

## About

A Hono app on Node with WebDecoy bot detection already wired in. WebDecoy records the scrapers, AI crawlers, and automated tools hitting your routes, flags crawlers that fake their identity, and plants a hidden honeytoken link that only bots follow. Deploy it as a starting point, or copy the middleware in `server.js` into your own app.

The template is a single Node.js service (`@hono/node-server`) built from a public GitHub repo, with a `/health` route for Railway's healthcheck. It needs one variable: `WEBDECOY_API_KEY`, which you create for free at app.webdecoy.com under Settings, API Keys. The middleware starts in monitor mode, so detections are recorded and every request is still served; the verdict is on `c.get('webdecoy')`. Railway's `X-Forwarded-For` holds the client address followed by its own edge address, so the middleware trusts two hops rather than one. Without a key the app still runs, with local rules only.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-hono-starter | [WebDecoy/railway-hono-starter](https://github.com/WebDecoy/railway-hono-starter) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `WEBDECOY_API_KEY` | (secret) | Your WebDecoy API key. Create one at app.webdecoy.com under Settings > API Keys (free account). |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** JavaScript, HTML

[View on Railway →](https://railway.com/deploy/hono-webdecoy-bot-detection)
