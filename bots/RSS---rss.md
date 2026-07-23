# Deploy RSS on Railway

Create custom RSS feeds from any site or social media network.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rss)

## About

RSSHub is an open-source RSS feed generator that converts thousands of websites, APIs, and online services into customizable RSS feeds. Whether you're following YouTube channels, Reddit communities, social media, blogs, or sites without native RSS support, RSSHub gives you complete control over how you collect and consume information.

Hosting RSSHub on Railway provides a managed environment for running your own RSS feed generation service without maintaining servers or container infrastructure. This template deploys RSSHub together with Redis for high-performance caching and Browserless for rendering JavaScript-heavy websites that require a headless browser. Railway automatically provisions networking, HTTPS, and service-to-service communication, allowing RSSHub to securely access its dependencies. Preconfigured environment variables help simplify setup while supporting browser rendering, CORS configuration, and bot protection. As feed requests grow, Railway allows you to scale your deployment while Redis reduces load by caching generated feeds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RSSHub | `ghcr.io/diygod/rsshub:latest` | Web service |
| Browserless | `browserless/chrome:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | RSSHub | 1200 | - |
| `NODE_ENV` | RSSHub | production | Production |
| `CACHE_TYPE` | RSSHub | redis | Using Redis as Cache |
| `ALLOW_ORIGIN` | RSSHub | * | Avoid CORS errors |
| `CACHE_EXPIRE` | RSSHub | "1800 | - |
| `DISALLOW_ROBOT` | RSSHub | true | Prevent indexing by search engine |
| `REQUEST_TIMEOUT` | RSSHub | 6000 | Extend request time to avoid bad HTTP code |
| `CACHE_CONTENT_EXPIRE` | RSSHub | 14400 | - |
| `ALLOW_USER_HOTLINK_TEMPLATE` | RSSHub | true | Enable Image Hotlink feature |
| `DEBUG` | Browserless | -* | Suppress excessive logging |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Healthcheck:** `healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/rss)
