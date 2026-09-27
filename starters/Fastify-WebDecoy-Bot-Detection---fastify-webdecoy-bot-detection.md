# Deploy Fastify + WebDecoy Bot Detection on Railway

Fastify app with WebDecoy bot and AI-scraper detection on every route

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastify-webdecoy-bot-detection)

## About

A Fastify 5 app with WebDecoy bot detection already wired in. WebDecoy records the scrapers, AI crawlers, and automated tools hitting your routes, flags crawlers that fake their identity, and plants a hidden honeytoken link that only bots follow. Deploy it as a starting point, or copy the plugin registration in `server.js` into your own app.

The template is a single Node.js service built from a public GitHub repo, with a `/health` route for Railway's healthcheck. It needs one variable: `WEBDECOY_API_KEY`, which you create for free at app.webdecoy.com under Settings, API Keys. The plugin starts in monitor mode, so detections are recorded and every request is still served. Railway's `X-Forwarded-For` holds the client address followed by its own edge address, so the plugin trusts two hops rather than one. Without a key the app still runs, with local rules only.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-fastify-starter | [WebDecoy/railway-fastify-starter](https://github.com/WebDecoy/railway-fastify-starter) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `WEBDECOY_API_KEY` | (secret) | Your WebDecoy API key. Create one at app.webdecoy.com under Settings > API Keys (free account). |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** JavaScript, HTML

[View on Railway →](https://railway.com/deploy/fastify-webdecoy-bot-detection)
