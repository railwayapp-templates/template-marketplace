# Deploy RSSHub | Open Source RSS Generator for Sites Without Feeds on Railway

Turn any site into an RSS feed — 1000+ routes, Redis-cached

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Gpp7EW)

## About

RSSHub generates RSS feeds for sites that never offered one. Over a thousand routes cover social networks, news outlets, forums, package registries, video platforms and government notice boards — anything with a page but no feed becomes something your reader can subscribe to.

RSSHub with Redis caching on a persistent volume. The image is the Chromium-bundled build, which matters more than it sounds: a large share of RSSHub's routes render JavaScript pages in a headless browser, and the slim image simply fails on those routes.

Redis is what keeps the deployment polite. Without a shared cache every reader poll re-fetches the upstream site, which is slow for you and looks like scraping to them.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RSSHub | `ghcr.io/diygod/rsshub:chromium-bundled-2026-08-10` | Web service |
| Redis | `redis:8.10.0-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | RSSHub | production | Node environment |
| `REDIS_URL` | RSSHub | - | Redis URL |
| `CACHE_TYPE` | RSSHub | redis | Cache Type |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'exec redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data --bind 0.0.0.0 ::'`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/Gpp7EW)
