# Deploy Firecrawl [Updated May ’26] on Railway

Firecrawl [May ’26] (Data Extraction| Apify & Scrapy alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/firecrawl)

## About

Firecrawl is a free, open-source web crawling and scraping platform available on GitHub. It offers developers and businesses the ability to collect structured data from websites in a scalable and automated way. Firecrawl is designed to be flexible, with support for APIs, integrations, and workflows using automation tools like **n8n**. By self hosting Firecrawl or using a managed hosting service, you gain control over your web crawling operations, data pipelines, and scaling without relying on third-party scraping services.

You can **self host Firecrawl** to keep all your crawling operations and data pipelines under your control, with no third-party limitations. With Firecrawl, you benefit from powerful web scraping features, REST APIs, and integration possibilities with platforms like **n8n firecrawl** for workflow automation. Railway makes this process extremely simple by offering a one-click deploy option, so you don’t have to worry about manual setup, scaling, or server maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker | `bonkboykz/firecrawl:latest` | Worker |
| api | `bonkboykz/firecrawl:latest` | Web service |
| playwright | `bonkboykz/firecrawl-playwright-ts:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| bonkboykz/nuq-postgres:latest | `bonkboykz/nuq-postgres:latest` | Database |
| extract-worker | `bonkboykz/firecrawl:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | worker | 0.0.0.0 | - |
| `PORT` | worker | 3002 | - |
| `BULL_AUTH_KEY` | worker | (secret) | - |
| `OPENAI_API_KEY` | worker | (secret) | - |
| `HOST` | api | 0.0.0.0 | - |
| `PORT` | api | 3002 | - |
| `BULL_AUTH_KEY` | api | (secret) | - |
| `OPENAI_API_KEY` | api | (secret) | - |
| `NUM_WORKERS_PER_QUEUE` | api | 8 | - |
| `USE_DB_AUTHENTICATION` | api | false | - |
| `PORT` | playwright | 3003 | - |
| `PROXY_PASSWORD` | playwright | (secret) | - |
| `PROXY_USERNAME` | playwright | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | bonkboykz/nuq-postgres:latest | railway | - |
| `POSTGRES_USER` | bonkboykz/nuq-postgres:latest | (secret) | - |
| `POSTGRES_PASSWORD` | bonkboykz/nuq-postgres:latest | (secret) | - |
| `HOST` | extract-worker | 0.0.0.0 | - |
| `PORT` | extract-worker | 3002 | - |
| `BULL_AUTH_KEY` | extract-worker | (secret) | - |
| `OPENAI_API_KEY` | extract-worker | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/firecrawl)
