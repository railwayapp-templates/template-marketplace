# Deploy firecrawl on Railway

firecrawl api server + worker without auth, works with dify

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/AIaBEM)

## About

# 🔥 Firecrawl

Crawl and convert any website into LLM-ready markdown or structured data. Built by [Mendable.ai](https://mendable.ai?ref=gfirecrawl) and the Firecrawl community. Includes powerful scraping, crawling and data extraction capabilities.

_This repository is in its early development stages. We are still merging custom modules in the mono repo. It's not completely yet ready for full self-host deployment, but you can already run it locally._

## What is Firecrawl?

[Firecrawl](https://firecrawl.dev?ref=github) is an API service that takes a URL, crawls it, and converts it into clean markdown or structured data. We crawl all accessible subpages and give you clean data for each. No sitemap required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker | `bonkboykz/firecrawl:latest` | Worker |
| extract-worker | `bonkboykz/firecrawl:latest` | Worker |
| Redis | `bitnami/redis:7.2.5` | Database |
| api | `bonkboykz/firecrawl:latest` | Web service |
| playwright | `bonkboykz/firecrawl-playwright-ts:latest` | Worker |
| nuq-postgres | `bonkboykz/nuq-postgres:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | worker | 0.0.0.0 | - |
| `PORT` | worker | 3002 | - |
| `BULL_AUTH_KEY` | worker | (secret) | - |
| `OPENAI_API_KEY` | worker | (secret) | - |
| `HOST` | extract-worker | 0.0.0.0 | - |
| `PORT` | extract-worker | 3002 | - |
| `BULL_AUTH_KEY` | extract-worker | (secret) | - |
| `OPENAI_API_KEY` | extract-worker | (secret) | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `HOST` | api | 0.0.0.0 | - |
| `PORT` | api | 3002 | - |
| `BULL_AUTH_KEY` | api | (secret) | - |
| `OPENAI_API_KEY` | api | (secret) | - |
| `NUM_WORKERS_PER_QUEUE` | api | 8 | - |
| `USE_DB_AUTHENTICATION` | api | false | - |
| `PORT` | playwright | 3003 | - |
| `PROXY_PASSWORD` | playwright | (secret) | - |
| `PROXY_USERNAME` | playwright | (secret) | - |
| `POSTGRES_DB` | nuq-postgres | railway | - |
| `POSTGRES_USER` | nuq-postgres | (secret) | - |
| `POSTGRES_PASSWORD` | nuq-postgres | (secret) | - |

## Configuration

- **Start command:** `npm run worker:production`
- **Start command:** `pnpm nuq-worker:production`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `pnpm server:production:nobuild`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/AIaBEM)
