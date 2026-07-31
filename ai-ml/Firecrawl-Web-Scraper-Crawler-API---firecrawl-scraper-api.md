# Deploy Firecrawl — Web Scraper & Crawler API on Railway

Self-host Firecrawl — scrape & crawl any site to clean Markdown

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/firecrawl-scraper-api)

## About

Firecrawl is an open-source web scraping and crawling API that turns any website into clean, LLM-ready Markdown or structured JSON — a self-hosted alternative to Apify and Scrapy. Point it at a URL and it renders JavaScript, follows links, strips clutter, and returns content ready for a RAG pipeline or AI agent. This template deploys the full five-service Firecrawl stack, correctly wired, so the multi-service setup that trips up most self-hosters just works.

---

Firecrawl is powerful, but self-hosting it means running a coordinated five-service stack — and two specifics decide whether it holds up under real load.

**It's a five-service architecture, and the pieces are specific.** The API orchestrates jobs, Playwright renders pages, NUQ Postgres holds the job queue, Redis handles caching and rate limits, and RabbitMQ brokers async crawl messages. The Postgres piece matters: Firecrawl uses `ghcr.io/firecrawl/nuq-postgres` with a pg_cron schema, not a stock Postgres image. This template wires all five correctly, which is the entire difficulty of self-hosting Firecrawl.

**Playwright is the memory hog — plan for 8 GB+ under load.** Headless Chromium is by far the most memory-intensive component. 4 GB may hold for light use, but under sustained crawl load it's insufficient and the Playwright service gets OOM-killed mid-crawl. Budget 8 GB or more for production crawling, and scale the Playwright service's memory first.

**The Supabase auth warning is normal, not a bug.** Self-hosted Firecrawl runs with `USE_DB_AUTHENTICATION=false` and logs a warning about missing Supabase auth. This is expected on self-hosted instances — scraping works fully without it. Don't chase that warning; it's not an error.

**Optional AI extraction needs an LLM key.** Basic scrape and crawl need no AI. The LLM-powered "extract" format (pull structured data by schema) only activates when you set `OPENAI_API_KEY` (or point `OPENAI_BASE_URL` at a compatible endpoint, including local Ollama). Leave it unset for pure scraping.

Typical cost: **~$15–25/month** on Railway across the five services, more if you scale Playwright's memory for heavy crawling. Firecrawl is open source; Apify and similar SaaS crawlers bill per usage.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| RabbitMQ | `rabbitmq:3-alpine` | Database |
| NUQ-Postgres | `ghcr.io/firecrawl/nuq-postgres` | Database |
| Firecrawl Playwright | `ghcr.io/firecrawl/playwright-service` | Web service |
| Firecrawl API | `ghcr.io/firecrawl/firecrawl` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `RABBITMQ_PORT` | RabbitMQ | 5672 | - |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | - |
| `POSTGRES_DB` | NUQ-Postgres | postgres | - |
| `POSTGRES_PORT` | NUQ-Postgres | 5432 | - |
| `POSTGRES_USER` | NUQ-Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | NUQ-Postgres | (secret) | - |
| `PORT` | Firecrawl Playwright | 3000 | - |
| `HOST` | Firecrawl API | 0.0.0.0 | - |
| `PORT` | Firecrawl API | 3002 | - |
| `LOGGING_LEVEL` | Firecrawl API | INFO | - |
| `OPENAI_API_KEY` | Firecrawl API | (secret) | OpenAI API authentication key |
| `NUM_WORKERS_PER_QUEUE` | Firecrawl API | 8 | - |
| `USE_DB_AUTHENTICATION` | Firecrawl API | false | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/firecrawl-scraper-api)
