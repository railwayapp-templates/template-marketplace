# Deploy Express + WebDecoy Bot Detection on Railway

Express app with WebDecoy bot and AI-scraper detection on every route

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/express-webdecoy-bot-detection)

## About

The template is a single Node.js service built from a public GitHub repo, with a `/health` route for Railway's healthcheck. It needs one variable: `WEBDECOY_API_KEY`, which you create for free at app.webdecoy.com under Settings, API Keys. The middleware starts in monitor mode, so detections are recorded and every request is still served. It reads the real visitor IP from Railway's proxy headers: Railway's `X-Forwarded-For` holds the client address followed by its own edge address, so the app trusts two hops rather than one. Without a key the app still runs, with local rules only.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-express-starter | [WebDecoy/railway-express-starter](https://github.com/WebDecoy/railway-express-starter) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `WEBDECOY_API_KEY` | (secret) | Your WebDecoy API key. Create one at app.webdecoy.com under Settings > API Keys (free account). |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** JavaScript, HTML

[View on Railway →](https://railway.com/deploy/express-webdecoy-bot-detection)
