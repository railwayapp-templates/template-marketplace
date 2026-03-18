# Deploy RSSHub [Updated Mar ’26] on Railway

RSSHub [Mar ’26] (Create RSS feeds from Social Media Sites) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rsshub)

## About

RSSHub is a free, open-source RSS feed generator available on [RSSHub GitHub](https://github.com/DIYgod/RSSHub). It allows you to convert almost any website into a customizable RSS feed, even sites that don’t officially support RSS. With RSSHub, you gain a powerful way to follow updates from YouTube, Twitter, Telegram, blogs, forums, and more, all from a single place. Thanks to its vibrant developer community, RSSHub constantly adds new rules and routes through the companion project **RSSHub Radar**, making it one of the most flexible RSS feed solutions available today.

You can **self host RSSHub docker** to run your own RSS feed generator without depending on any third-party. By hosting RSSHub yourself, you can avoid rate limits, unlock advanced customization, and fully control the refresh speed and caching of your feeds. Railway makes this process extremely simple: instead of manually configuring servers, Nginx, and DockerHub images, you can spin up a managed deployment in just a few clicks.

RSSHub is written in Node.js and distributed as a Docker image on **RSSHub DockerHub**, making it easy to deploy on platforms like Railway with minimal setup. Whether you want to track YouTube channels, Telegram groups, or custom APIs, self hosting RSSHub ensures reliability and privacy, tailored to your needs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| diygod/rsshub:chromium-bundled | `diygod/rsshub:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | diygod/rsshub:chromium-bundled | 1200 | - |
| `NODE_ENV` | diygod/rsshub:chromium-bundled | production | - |
| `CACHE_TYPE` | diygod/rsshub:chromium-bundled | redis | - |
| `CACHE_EXPIRE` | diygod/rsshub:chromium-bundled | 1800                   = | - |
| `CACHE_CONTENT_EXPIRE` | diygod/rsshub:chromium-bundled | 14400 | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/deploy/rsshub)
