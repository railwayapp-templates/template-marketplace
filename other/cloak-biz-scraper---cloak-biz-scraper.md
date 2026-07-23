# Deploy cloak-biz-scraper on Railway

Anti-detection browser in the cloud for your AI assistant

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloak-biz-scraper)

## About

A cloaked cloud browser your AI assistant can drive — patched Chromium that slips past anti-bot detection, running behind your own residential proxy. On top of it are built-in tasks that scrape BizBuySell search results and archive listings into your Notion. Your server, your data: one-click deploy, everything else configured in a web UI — no terminal.

1. **Deploy.** Click to deloy. Railway generates your `APP_SECRET` for you and
   builds the server (~3 minutes).
2. **Turn on Serverless.** Railway → your service → **Settings** → enable **Serverless**,
   so it sleeps when idle. Skipping it costs roughly **$8–9/month** for a server doing
   nothing.
3. **Copy `APP_SECRET`.** Railway → your service → **Variables**. This is your dashboard
   password — there's no other account to make.
4. **Open your server's URL and log in** with `APP_SECRET`.
5. **Fill in Settings** (each page tests itself and shows what it found):
   - **CloakBrowser licence** — optional; blank runs the free public build (fewer bypasses).
   - **Evomi proxy** — optional, but listing sites block non-residential IPs, so add one
     before scraping them.
   - **Notion** — optional; needed only to save listings into a database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cloak-biz-scraper | [thisnick/cloak-biz-scraper](https://github.com/thisnick/cloak-biz-scraper) (branch: release) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `APP_SECRET` | (secret) | Secret value for app authentication |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, HTML, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/cloak-biz-scraper)
