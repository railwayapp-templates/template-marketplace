# Deploy piqo-selfhost on Railway

Web analytics, self-hosted and truly yours.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/piqo-selfhost)

## About

Piqo Analytics is privacy-first web analytics you run on your own server. It ships as one container with SQLite inside, so there is no external database to manage. You get the same dashboard as piqo.app: realtime visitors, traffic sources, revenue attribution for Stripe, Paddle, Polar, Lemon Squeezy, Dodo and Creem, signups from Firebase, Supabase and Clerk, Google Search Console and Bing data, funnels, goals, AI-assistant traffic, Ask AI and an MCP server. One install tracks unlimited sites.

This template deploys a single service from the `ghcr.io/mddanishyusuf/piqo-selfhost:0` image with a persistent volume mounted at `/app/data`, which holds the SQLite database, nightly backups and the optional GeoLite2 database. Railway generates `AUTH_SECRET` and sets `APP_URL` from your public domain, so there is nothing to build and no configuration to write. Deploy takes about a minute.

After deploying, open your domain, create the owner account on `/setup`, and paste your license key on `/activate` (or set `PIQO_LICENSE_KEY` before deploying to skip that screen). Add a site, drop the sub-1KB script tag on it, and visitors show up live. To update, redeploy the service: Railway pulls the latest 0.x image and migrations run on boot while your data stays on the volume. To use a custom domain, add it under Settings → Networking and set `APP_URL` to match before activating, since the license registers the hostname as your install.

A license is a one-time purchase from [piqo.app/self-hosted](https://piqo.app/self-hosted) with no renewals and updates included.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mddanishyusuf/piqo-selfhost:1 | `ghcr.io/mddanishyusuf/piqo-selfhost:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `SMTP_URL` | (optional) |
| `EMAIL_FROM` | (optional) |
| `AUTH_SECRET` | (secret) |
| `ANTHROPIC_API_KEY` | (secret) |
| `MAXMIND_LICENSE_KEY` | (optional) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/piqo-selfhost)
