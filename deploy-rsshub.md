# Deploy RSSHub | Convert any website to RSS on Railway

1-Click Deploy RSSHub - Self-Hosted RSS Feeds for YouTube, GitHub & More

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/deploy-rsshub)

## About

Deploy a fully self-hosted, open-source RSS feed generator on Railway in one click. This template provisions RSSHub (`diygod/rsshub:chromium-bundled`) backed by Redis for caching — everything pre-wired, no manual config required.

---

![RSSHub Railway Deployment](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773080172/RSSHUB_lnl0gl.png)

RSSHub is an open-source RSS feed aggregator and generator with 41,000+ GitHub stars. Its core job: turn anything on the internet into an RSS feed — YouTube channels, Reddit threads, Telegram groups, Twitter/X accounts, GitHub releases, and thousands more sources that dropped native RSS support years ago.

This Railway template runs two services:
- **RSSHub** (`diygod/rsshub:chromium-bundled`) — includes a bundled Chromium for scraping JavaScript-rendered pages
- **Redis** — caches feed responses so repeated requests don't hammer source sites

Self-hosting gives you full control: no rate limits from public instances, no third-party logging your reading habits, and configurable cache TTLs.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| RSSHub | `diygod/rsshub:chromium-bundled` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Internal hostname for Redis service |
| `REDISPORT` | Redis | 6379 | Default Redis server port |
| `REDISUSER` | Redis | default | Redis authentication username |
| `REDIS_URL` | Redis | - | Internal Redis connection URI |
| `REDISPASSWORD` | Redis | (secret) | Redis password alias variable |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | External Redis connection string |
| `PORT` | RSSHub | 1200 | HTTP server listening port |
| `NODE_ENV` | RSSHub | production | Run Node.js in production mode |
| `REDIS_URL` | RSSHub | - | Redis connection string for caching |
| `CACHE_TYPE` | RSSHub | redis | Use Redis as cache backend |
| `CACHE_EXPIRE` | RSSHub | 1800 | Metadata cache expiration time seconds |
| `CACHE_CONTENT_EXPIRE` | RSSHub | 14400 | Content cache expiration time seconds |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/deploy-rsshub)
