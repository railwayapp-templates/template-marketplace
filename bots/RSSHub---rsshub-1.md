# Deploy RSSHub on Railway

Self-hosted RSS generator for YouTube, Twitter, Telegram & 1000+ sites

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rsshub-1)

## About

RSSHub is a free, open-source RSS feed generator that can turn almost any website, social media platform, or API into a customizable RSS feed. With thousands of built-in routes, it powers millions of feeds daily and is used by developers and power users worldwide.

![RSSHub](https://opengraph.githubassets.com/027231e34679f13d043884e2d69bd69e052e500e3bf7b5b03c72101eda21b724/diygod/rsshub)

Self-hosting RSSHub gives you full control over feed generation, refresh rates, and privacy — without depending on public instances that often have rate limits. The official Docker image (`diygod/rsshub:chromium-bundled`) makes deployment straightforward. On Railway, you get a complete setup with Redis caching in just a few clicks. No manual server management, Docker configuration, or Nginx setup required. Just deploy and start generating feeds instantly.

![RSSHub](https://imgur.com/maoQqSo.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RSSHub | `diygod/rsshub:chromium-bundled` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | RSSHub | 1200 | - |
| `CACHE_TYPE` | RSSHub | redis | - |
| `DISABLE_CACHE` | RSSHub | false | - |
| `ALLOW_USER_HOTLINK` | RSSHub | true | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379

**Category:** Bots

[View on Railway →](https://railway.com/deploy/rsshub-1)
