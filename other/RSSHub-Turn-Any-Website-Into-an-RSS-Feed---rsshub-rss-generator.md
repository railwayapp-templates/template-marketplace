# Deploy RSSHub — Turn Any Website Into an RSS Feed on Railway

Self-host RSSHub: turn any site into RSS. No rate limits.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rsshub-rss-generator)

## About

![RSSHub RSS feed generator](https://res.cloudinary.com/dh2nt6hgh/image/upload/v1759517074/self_hosted_rsshub_docker_ssfhmx.jpg)

RSSHub is the open-source RSS feed generator with **41k+ GitHub stars** that makes everything
RSSible — turn YouTube channels, Reddit threads, Telegram groups, Twitter/X accounts, GitHub
releases, Bilibili, Weibo, and 1,000+ other sources into clean RSS feeds, even when the site
dropped native RSS years ago. Maintained by DIYgod and 800+ contributors, with new routes added
constantly and a companion browser extension (RSSHub Radar) that detects feeds on any page.

The public rsshub.app instance is rate-limited to ~200 requests/IP/hour and logs your requests.
Self-hosting on Railway removes the rate limits, keeps your reading private, and lets you tune
cache TTLs to your usage — for ~$5/month flat.

---

RSSHub is a route-driven feed generator: each route is a small module that knows how to extract
content from one site and normalize it into a standard feed. Running it well means a Node.js
runtime, Redis for caching (so you don't get rate-limited by the sites you pull from), and a
public HTTPS endpoint your reader can reach. The public instance handles this for everyone —
which is why it's rate-limited and shared.

Railway runs your own private instance. This template wires RSSHub to a managed Redis over
private networking with automatic HTTPS, so your feeds refresh on your schedule with no shared
rate limits and no third party logging what you read.

> **Image choice:** the `diygod/rsshub:chromium-bundled` image (~1 GB) includes a headless
> Chromium for JavaScript-rendered sources and is the most compatible option. If you only pull
> static sources, the base `diygod/rsshub` image uses far less memory — swap it in service
> settings to cut RAM.

Typical cost: **~$5/month** on Railway's Hobby plan for RSSHub and Redis. RSSHub itself is free
and open source; you only pay compute.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| RSSHub | `diygod/rsshub:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | RSSHub | 1200 | - |
| `NODE_ENV` | RSSHub | production | - |
| `CACHE_TYPE` | RSSHub | redis | - |
| `CACHE_EXPIRE` | RSSHub | 1800 | - |
| `CACHE_CONTENT_EXPIRE` | RSSHub | 14400 | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/rsshub-rss-generator)
