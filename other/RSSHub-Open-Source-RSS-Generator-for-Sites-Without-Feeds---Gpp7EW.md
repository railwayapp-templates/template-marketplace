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
| RSSHub | `ghcr.io/diygod/rsshub:chromium-bundled` | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | RSSHub | production | Node environment |
| `REDIS_URL` | RSSHub | - | Redis URL |
| `CACHE_TYPE` | RSSHub | redis | Cache Type |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/bitnami`

**Category:** Other

[View on Railway →](https://railway.com/deploy/Gpp7EW)
