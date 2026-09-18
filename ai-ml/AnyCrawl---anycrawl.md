# Deploy AnyCrawl on Railway

Self-hosted scrape/crawl/SERP API that turns sites into LLM-ready data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/anycrawl)

## About

AnyCrawl is an open-source, self-hosted scrape / crawl / SERP API that turns websites into LLM-ready data and
extracts structured search results — a MIT-licensed alternative to hosted crawling APIs. This template deploys
AnyCrawl with API-key authentication on and a working key generated for you. It is a community-maintained template
and is not affiliated with the AnyCrawl project.

AnyCrawl is a small microservice set: an HTTP API plus per-engine scrape workers that communicate through Redis (a
job queue) and PostgreSQL (state and results). It requires API-key authentication — keys are database rows, and
exposing the API without a key on a public URL would let anyone crawl the web on your bill.

This template runs AnyCrawl on Railway with a bundled private PostgreSQL and Redis, a static-HTML (cheerio) worker
and a JavaScript-rendering (playwright) worker, and it generates an API key and seeds it into the database at
start-up — so you get a known, working key from the service's variables instead of one printed to the logs. Only
the API is public; the workers, database and cache stay on the private network. Every image is official and pinned
by digest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| scrape-playwright | `ghcr.io/any4ai/anycrawl-scrape-playwright:v1.0.0` | Worker |
| redis | `redis:7-alpine` | Database |
| postgres | `postgres:16-alpine` | Database |
| scrape-cheerio | `ghcr.io/any4ai/anycrawl-scrape-cheerio:v1.0.0` | Worker |
| api | `ghcr.io/youssefsiam38/anycrawl-railway:1.0.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | scrape-playwright | production | - |
| `MIGRATE_DATABASE` | scrape-playwright | false | - |
| `ANYCRAWL_HEADLESS` | scrape-playwright | true | - |
| `ANYCRAWL_API_DB_TYPE` | scrape-playwright | postgresql | - |
| `ANYCRAWL_IGNORE_SSL_ERROR` | scrape-playwright | true | - |
| `ANYCRAWL_CRAWLEE_STORAGE_DIR` | scrape-playwright | /tmp/anycrawl-crawlee-storage/playwright | - |
| `POSTGRES_DB` | postgres | anycrawl | - |
| `POSTGRES_USER` | postgres | (secret) | - |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password, generated. |
| `NODE_ENV` | scrape-cheerio | production | - |
| `MIGRATE_DATABASE` | scrape-cheerio | false | - |
| `ANYCRAWL_HEADLESS` | scrape-cheerio | true | - |
| `ANYCRAWL_API_DB_TYPE` | scrape-cheerio | postgresql | - |
| `ANYCRAWL_IGNORE_SSL_ERROR` | scrape-cheerio | true | - |
| `ANYCRAWL_CRAWLEE_STORAGE_DIR` | scrape-cheerio | /tmp/anycrawl-crawlee-storage/cheerio | - |
| `PORT` | api | 8080 | Port Railway routes traffic and health checks to; keep it equal to ANYCRAWL_API_PORT (8080). |
| `NODE_ENV` | api | production | - |
| `ANYCRAWL_API_KEY` | api | (secret) | Bearer token for the crawl API, generated. Copy it to call the API (Authorization: Bearer <key>). |
| `MIGRATE_DATABASE` | api | true | - |
| `ANYCRAWL_API_PORT` | api | 8080 | - |
| `ANYCRAWL_HEADLESS` | api | true | - |
| `ANYCRAWL_REDIS_URL` | api | - | Internal Redis URL used as the job queue between the API and the scrape workers. |
| `ANYCRAWL_API_DB_TYPE` | api | postgresql | - |
| `ANYCRAWL_API_AUTH_ENABLED` | api | true | true requires the API key on every request; do not disable on a public URL. |
| `ANYCRAWL_API_DB_CONNECTION` | api | - | PostgreSQL connection string the API and workers read. |
| `ANYCRAWL_API_CREDITS_ENABLED` | api | true | - |

## Configuration

- **Start command:** `redis-server --appendonly yes --protected-mode no`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/anycrawl)
