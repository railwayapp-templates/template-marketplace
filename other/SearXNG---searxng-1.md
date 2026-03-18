# Deploy SearXNG on Railway

Privacy-respecting meta-search engine. No tracking, no data storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/searxng-1)

## About

SearXNG is a free, open-source, privacy-respecting meta-search engine that aggregates results from over 70 search services without tracking users or storing search history.

Hosting SearXNG gives you a private search engine under your own control. Because SearXNG proxies queries to upstream search engines, it requires no database and holds no persistent state — making it one of the lightest services to run. The main operational concern is keeping the secret key consistent across redeployments (so existing sessions stay valid) and optionally restricting admin access with a password. Railway handles TLS termination, health checking via `/healthz`, and automatic restarts on failure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-searxng | [c-treinta/railway-searxng](https://github.com/c-treinta/railway-searxng) (root: /app) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SEARXNG_SECRET_KEY` | (secret) | Cryptographic secret for session signing |
| `SEARXNG_ADMIN_PASSWORD` | (secret) | Password for admin preferences panel |

## Configuration

- **Healthcheck:** `/heathz`

**Category:** Other · **Languages:** Makefile, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/searxng-1)
