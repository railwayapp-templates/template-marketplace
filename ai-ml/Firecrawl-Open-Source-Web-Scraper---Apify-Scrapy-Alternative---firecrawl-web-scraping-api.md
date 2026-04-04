# Deploy Firecrawl | Open-Source Web Scraper - Apify, Scrapy Alternative on Railway

Self-host Firecrawl on Railway. Scrape/Crawl website to .md, LLM extraction

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/firecrawl-web-scraping-api)

## About

Self-host Firecrawl on Railway — the open-source web scraping API that turns any website into clean, AI-ready markdown. Firecrawl handles JavaScript rendering, crawling, structured extraction, and site mapping so your AI pipelines always get usable data, not raw HTML soup.

This template deploys the full Firecrawl stack from scratch: `firecrawl-api` (the REST API), `firecrawl-playwright` (headless Chromium for JS rendering), `nuq-postgres` (the NUQ job-queue database), Redis (caching and rate-limiting), and RabbitMQ (async job brokering) — all pre-wired with internal Railway networking.

![Firecrawl Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1775236866/Firecrawl_railway_architecture_bbi1cd.png)

Firecrawl is an open-source (AGPL-3.0) web-to-markdown API built by Mendable AI. It solves one of the hardest problems in AI engineering — reliably getting clean, structured content from the web — by combining a headless browser, async job queuing, and LLM-friendly output formats.

**Key capabilities:**
- **Scrape** — converts any URL to markdown, HTML, screenshots, or raw text
- **Crawl** — discovers and processes all pages of a website automatically
- **Map** — returns all URLs on a site without downloading page content
- **Extract** — uses an LLM to pull structured JSON from pages via a natural-language prompt
- **JS rendering** — Playwright-powered Chromium handles SPAs and dynamic pages
- **PDF support** — parses web-hosted PDFs and document files

This is a multi-service deployment: `firecrawl-api` orchestrates jobs, `firecrawl-playwright` handles browser rendering, `nuq-postgres` stores the job queue, Redis handles caching and rate limiting, and RabbitMQ brokers async crawl messages between workers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Firecrawl Playwright | `ghcr.io/firecrawl/playwright-service:latest` | Worker |
| Firecrawl API | `ghcr.io/firecrawl/firecrawl:latest` | Web service |
| NUQ-Postgres | `ghcr.io/firecrawl/nuq-postgres:latest` | Database |
| RabbitMQ | `rabbitmq:3-alpine` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Firecrawl Playwright | 3000 | HTTP server listening port |
| `HOST` | Firecrawl API | 0.0.0.0 | Bind address for service |
| `PORT` | Firecrawl API | 3002 | HTTP server listening port |
| `REDIS_URL` | Firecrawl API | - | Redis connection string |
| `RABBITMQ_URL` | Firecrawl API | - | RabbitMQ connection string |
| `LOGGING_LEVEL` | Firecrawl API | INFO | Application logging level |
| `OPENAI_API_KEY` | Firecrawl API | (secret) | OpenAI API authentication key |
| `NUQ_DATABASE_URL` | Firecrawl API | - | NUQ Postgres connection string |
| `NUQ_RABBITMQ_URL` | Firecrawl API | - | RabbitMQ for NUQ workers |
| `REDIS_RATE_LIMIT_URL` | Firecrawl API | - | Redis for rate limiting |
| `NUM_WORKERS_PER_QUEUE` | Firecrawl API | 8 | Workers per queue processing |
| `USE_DB_AUTHENTICATION` | Firecrawl API | false | Enable database authentication flag |
| `PLAYWRIGHT_MICROSERVICE_URL` | Firecrawl API | - | Playwright scraping service endpoint |
| `POSTGRES_DB` | NUQ-Postgres | postgres | Default database name |
| `POSTGRES_PORT` | NUQ-Postgres | 5432 | Postgres service port |
| `POSTGRES_USER` | NUQ-Postgres | (secret) | Default Postgres username |
| `POSTGRES_PASSWORD` | NUQ-Postgres | (secret) | Postgres user password credential |
| `RABBITMQ_PORT` | RabbitMQ | 5672 | RabbitMQ service port |
| `RABBITMQ_DEFAULT_PASS` | RabbitMQ | - | Default user password credential |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | Default username for authentication |
| `REDISHOST` | Redis | - | Redis internal hostname |
| `REDISPORT` | Redis | 6379 | Redis service port |
| `REDISUSER` | Redis | default | Redis default username |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password reference |
| `REDIS_PASSWORD` | Redis | (secret) | Redis authentication password |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/firecrawl-web-scraping-api)
