# Deploy LightCrawl with Redis on Railway

Scalable LightCrawl with Redis backend for distributed queue-based crawling

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lightcrawl-with-redis)

## About

This template deploys **LightCrawl with Redis**, enabling queue-based distributed crawling and horizontal scaling. It acts as a highly scalable, self-hostable Web scraping API and Model Context Protocol (MCP) server that converts any web page into clean Markdown.

Deploying this scalable setup on Railway takes less than a minute. Railway automatically provisions:
1. **LightCrawl Application**: A container built from the Dockerfile, containing Chromium for stealth crawling.
2. **Redis Database**: Used as a distributed queue and state backend for crawling tasks.

The template automatically links the Redis service to the LightCrawl container via the `REDIS_URL` environment variable. Upon startup, LightCrawl detects this variable and spins up background distributed workers. You can horizontally scale the application service to handle massive parallel scraping workloads.

You only need to configure basic variables: specifying `PORT`, setting `NODE_ENV` to production, and setting `API_KEY` (which Railway can generate automatically) to secure your endpoints.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| LightCrawl | [yosuke1024/LightCrawl](https://github.com/yosuke1024/LightCrawl) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | LightCrawl | 3000 | - |
| `API_KEY` | LightCrawl | (secret) | Enter a secure custom API key to protect your scraper endpoint. (e.g. your-secret-token)  |
| `NODE_ENV` | LightCrawl | production | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/lightcrawl-with-redis)
