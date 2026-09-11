# Deploy Firecrawl on Railway

Firecrawl web scraping API with Playwright, Redis, RabbitMQ, and Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/firecrawl-2)

## About

Firecrawl is the open-source web scraping and crawling API behind firecrawl.dev. Give it a URL and it returns clean markdown, HTML, links, page metadata, or LLM-extracted JSON, with a job queue for whole-site crawls. It is the data-ingestion layer for RAG pipelines, agents, and search indexes.

Self-hosting Firecrawl means running its API and background workers next to four supporting services: a Playwright (headless Chromium) renderer, Redis, RabbitMQ, and a Postgres database with `pg_cron` that holds the NuQ job queue. This template deploys the same five services as the official `docker-compose.yaml`: the pinned `ghcr.io/firecrawl/firecrawl:2.11.322` image runs the API and all workers through the upstream harness, and the official `playwright-service` and `nuq-postgres` images are used as-is. Every connection string is wired over Railway's private IPv6 network with explicit ports, passwords are generated at deploy time, the API binds dual-stack so healthchecks pass, and Redis and Postgres get volumes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Firecrawl | `ghcr.io/firecrawl/firecrawl:2.11.322` | Web service |
| RabbitMQ | `rabbitmq:3-management` | Database |
| Redis | `redis:7-alpine` | Database |
| Playwright | `ghcr.io/firecrawl/playwright-service:latest` | Worker |
| Postgres | `ghcr.io/firecrawl/nuq-postgres:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ENV` | Firecrawl | production | Runtime environment label. 'production' disables colorized log output; it does not change scraping behaviour. |
| `HOST` | Firecrawl | :: | Bind address for the API. '::' is dual-stack (IPv4 + IPv6) so Railway's IPv6 private network and healthcheck can reach it. Upstream compose uses 0.0.0.0, which is IPv4-only. |
| `PORT` | Firecrawl | 3002 | API listen port. Railway's healthcheck and edge proxy probe $PORT, so keep it equal to the port the API binds (upstream default 3002). |
| `REDIS_URL` | Firecrawl | - | Redis connection string for caching, locks, and job bookkeeping (redis://default:<password>@<private-domain>:6379). |
| `MODEL_NAME` | Firecrawl | - | Optional. Model name to use with OPENAI_API_KEY / OPENAI_BASE_URL for LLM features. |
| `REDIS_HOST` | Firecrawl | - | Private hostname of the Redis service (used by the start command to wait for Redis before booting). |
| `POSTGRES_DB` | Firecrawl | - | Postgres database name. Must stay 'postgres' because the bundled pg_cron config targets that database. |
| `BULL_AUTH_KEY` | Firecrawl | (secret) | Secret path segment that enables the admin routes, e.g. GET /admin/<BULL_AUTH_KEY>/redis-health and /admin/<BULL_AUTH_KEY>/nuq-metrics. Keep it private. |
| `LOGGING_LEVEL` | Firecrawl | INFO | Log verbosity: NONE, ERROR, WARN, INFO, DEBUG, or TRACE. |
| `POSTGRES_HOST` | Firecrawl | - | Private hostname of the NuQ Postgres service. The harness builds NUQ_DATABASE_URL from POSTGRES_HOST/PORT/USER/PASSWORD/DB (docker-compose contract). |
| `POSTGRES_PORT` | Firecrawl | 5432 | Postgres port on the private network. |
| `POSTGRES_USER` | Firecrawl | (secret) | Postgres user (mirrors the Postgres service). |
| `RABBITMQ_HOST` | Firecrawl | - | Private hostname of the RabbitMQ service (used by the start command to wait for RabbitMQ before booting). |
| `OPENAI_API_KEY` | Firecrawl | (secret) | Optional. Needed only for LLM features (/v1/extract, json format, LLM-based summaries). /scrape, /crawl, /map work without it. |
| `OPENAI_BASE_URL` | Firecrawl | - | Optional. OpenAI-compatible endpoint (e.g. an Ollama or LiteLLM proxy on the private network) for LLM features. |
| `NUQ_RABBITMQ_URL` | Firecrawl | - | AMQP URL for the NuQ job-notification broker (amqp://<user>:<password>@<private-domain>:5672). |
| `NUQ_WORKER_COUNT` | Firecrawl | 5 | Number of nuq-worker processes the harness starts inside this service (upstream default 5). Lower it (e.g. 2) to reduce memory; each worker is a separate Node process. |
| `SEARXNG_ENDPOINT` | Firecrawl | - | Optional. Base URL of a SearXNG instance (JSON format enabled) to power /v1/search, e.g. http://searxng.railway.internal:8080. |
| `POSTGRES_PASSWORD` | Firecrawl | (secret) | Postgres password (mirrors the Postgres service). |
| `MAX_CONCURRENT_JOBS` | Firecrawl | 5 | Maximum simultaneous crawl jobs (upstream default 5). |
| `REDIS_RATE_LIMIT_URL` | Firecrawl | - | Redis connection string for rate limiting. Upstream compose points it at the same Redis as REDIS_URL. |
| `NUM_WORKERS_PER_QUEUE` | Firecrawl | 8 | Parallel jobs per queue worker (upstream default 8). |
| `USE_DB_AUTHENTICATION` | Firecrawl | false | false = self-hosted mode: no API key or Authorization header is required and no Supabase is needed. Setting true requires a full Supabase auth/database setup that is not part of this template. |
| `CRAWL_CONCURRENT_REQUESTS` | Firecrawl | 10 | Concurrent page requests per crawl (upstream default 10). |
| `PLAYWRIGHT_MICROSERVICE_URL` | Firecrawl | - | Full URL of the Playwright service's POST /scrape endpoint over the private network (must include the port and the /scrape path). |
| `RABBITMQ_NODENAME` | RabbitMQ | rabbit@localhost | Fixed Erlang node name so the broker's data directory stays valid if you later attach a volume (Railway container hostnames change on every deploy). |
| `RABBITMQ_PRIVATE_URL` | RabbitMQ | - | Private-network AMQP URL (IPv6, includes port). Referenced by the Firecrawl service as NUQ_RABBITMQ_URL. |
| `RABBITMQ_DEFAULT_PASS` | RabbitMQ | - | Generated AMQP password. |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | AMQP username created on first boot (the built-in guest user is loopback-only in RabbitMQ). |
| `REDIS_URL` | Redis | - | Private-network connection string (IPv6, includes port). Referenced by the Firecrawl service. |
| `REDIS_PASSWORD` | Redis | (secret) | Generated Redis password (passed to redis-server --requirepass by the start command). |
| `PORT` | Playwright | 3000 | Listen port of the Playwright scrape service. Railway's healthcheck probes $PORT; the API reaches it at http://<private-domain>:3000/scrape. |
| `BLOCK_MEDIA` | Playwright | false | Set to true to block images, fonts, and media during rendering to save bandwidth. |
| `MAX_CONCURRENT_PAGES` | Playwright | 10 | Maximum Chromium pages open at once (upstream sets it to CRAWL_CONCURRENT_REQUESTS, default 10). Lower it to reduce memory. |
| `POSTGRES_DB` | Postgres | postgres | Database name. Must stay 'postgres': the image bakes cron.database_name = 'postgres' for pg_cron and runs the NuQ schema (nuq.sql) into it on first boot. |
| `DATABASE_URL` | Postgres | - | Private-network connection string (IPv6, includes port). Equivalent to what the Firecrawl harness builds as NUQ_DATABASE_URL. |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password. |

## Configuration

- **Start command:** `bash -c 'for t in "$POSTGRES_HOST:5432" "$RABBITMQ_HOST:5672" "$REDIS_HOST:6379"; do h="${t%:*}"; p="${t##*:}"; n=0; until (exec 3<>"/dev/tcp/$h/$p") 2>/dev/null; do n=$((n+1)); if [ "$n" -ge 150 ]; then echo "gave up waiting for $t"; break; fi; echo "waiting for $t"; sleep 2; done; done; exec node dist/src/harness.js --start-docker'`
- **Healthcheck:** `/v0/health/readiness`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --save 60 1 --dir /data --bind :: 0.0.0.0'`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/firecrawl-2)
