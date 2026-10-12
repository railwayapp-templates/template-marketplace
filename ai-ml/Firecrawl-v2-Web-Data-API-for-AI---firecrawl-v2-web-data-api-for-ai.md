# Deploy Firecrawl v2 Web Data API for AI on Railway

Turn websites into clean markdown and JSON for LLMs. Self-hosted workers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/firecrawl-v2-web-data-api-for-ai)

## About

Firecrawl is an open-source API that turns websites into clean markdown, HTML, screenshots or structured JSON for LLM applications. This community template deploys the self-hosted Firecrawl stack on Railway with separate workers, a headless Chromium renderer, its queue databases and an API-key gateway in front.

Self-hosted Firecrawl is more than one API container. Scrape and crawl requests are queued, executed by worker processes that fetch pages directly or through a Playwright/Chromium service, converted to markdown, and tracked in Redis and a dedicated Postgres queue (NuQ) with RabbitMQ notifications. Without its cloud authentication backend, a self-hosted instance also accepts requests from anyone who knows the URL. This template runs the official Firecrawl images with the API, orchestration workers and scrape executors as separate Railway services, keeps all databases on the private network, and adds a small gateway that only forwards requests carrying your generated API key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| playwright-service | `ghcr.io/firecrawl/playwright-service:latest@sha256:717699bf8a61d94451926c810d19ca1d36278192907e307bf5229a558b08fcc6` | Worker |
| Redis | `redis:8.2` | Database |
| nuq-postgres | `ghcr.io/firecrawl/nuq-postgres:latest@sha256:9b638af78d99873bc0ba2b57c9cbcd01df6ce96efeaa72d36cfbe0f76521e8fc` | Database |
| firecrawl-api | `ghcr.io/firecrawl/firecrawl:2.11.504` | Worker |
| firecrawl | [baranberkay96/firecrawl-railway](https://github.com/baranberkay96/firecrawl-railway) (branch: main) (root: /services/gateway) | Web service |
| firecrawl-worker | [baranberkay96/firecrawl-railway](https://github.com/baranberkay96/firecrawl-railway) (branch: main) (root: /services/firecrawl-workers) | Worker |
| RabbitMQ | `rabbitmq:4.3.6-alpine` | Database |
| firecrawl-nuq-worker | [baranberkay96/firecrawl-railway](https://github.com/baranberkay96/firecrawl-railway) (branch: main) (root: /services/firecrawl-workers) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | playwright-service | 3000 | HTTP port of the Playwright scrape service (private). |
| `BLOCK_MEDIA` | playwright-service | false | Set true to block images/video downloads (less bandwidth, faster pages). |
| `PROXY_SERVER` | playwright-service | - | Optional outbound proxy (shared with firecrawl-api). |
| `PROXY_PASSWORD` | playwright-service | (secret) | Optional proxy password. |
| `PROXY_USERNAME` | playwright-service | (secret) | Optional proxy username. |
| `ALLOW_LOCAL_WEBHOOKS` | playwright-service | false | Keep false so pages cannot be pointed at private addresses. |
| `MAX_CONCURRENT_PAGES` | playwright-service | - | Concurrent browser pages; follows CRAWL_CONCURRENT_REQUESTS like upstream. |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `POSTGRES_DB` | nuq-postgres | postgres | Must stay 'postgres': the image configures cron.database_name = 'postgres' and installs the NuQ schema there. |
| `POSTGRES_USER` | nuq-postgres | (secret) | Superuser created on first boot (pg_cron jobs run in the postgres database). |
| `POSTGRES_PASSWORD` | nuq-postgres | (secret) | Database password, generated. |
| `ENV` | firecrawl-api | local | Self-hosted mode (same value as the upstream docker-compose). |
| `HOST` | firecrawl-api | :: | Bind address; :: accepts IPv4 and IPv6 from the gateway. |
| `PORT` | firecrawl-api | 3002 | API port (private). |
| `REDIS_URL` | firecrawl-api | - | Redis for BullMQ queues and crawl state. |
| `MODEL_NAME` | firecrawl-api | - | Optional. Model used for extraction (e.g. gpt-4o-mini). |
| `PROXY_SERVER` | firecrawl-api | - | Optional. Outbound HTTP proxy for fetches (http://host:port). |
| `BULL_AUTH_KEY` | firecrawl-api | (secret) | Secret path segment for the queue dashboard: /admin/<BULL_AUTH_KEY>/queues. |
| `LOGGING_LEVEL` | firecrawl-api | INFO | Log level. |
| `OPENAI_API_KEY` | firecrawl-api | (secret) | Optional. Enables LLM features (JSON/extract formats, /extract). Leave empty to disable. |
| `PROXY_PASSWORD` | firecrawl-api | (secret) | Optional. Proxy password. |
| `PROXY_USERNAME` | firecrawl-api | (secret) | Optional. Proxy username. |
| `OLLAMA_BASE_URL` | firecrawl-api | - | Optional (experimental upstream). Ollama API base URL instead of OpenAI. |
| `OPENAI_BASE_URL` | firecrawl-api | - | Optional. OpenAI-compatible base URL (e.g. a LiteLLM gateway). |
| `NUQ_DATABASE_URL` | firecrawl-api | - | NuQ job queue database (nuq-postgres, private network). |
| `NUQ_RABBITMQ_URL` | firecrawl-api | - | RabbitMQ used by NuQ to wake workers when jobs arrive. |
| `SEARXNG_ENDPOINT` | firecrawl-api | - | Optional. SearXNG instance (JSON enabled) for /search instead of direct Google. |
| `BROWSER_POOL_SIZE` | firecrawl-api | 5 | Browser pool size (upstream default). |
| `MAX_CONCURRENT_JOBS` | firecrawl-api | 5 | Max concurrent jobs per team (upstream default). |
| `MODEL_EMBEDDING_NAME` | firecrawl-api | - | Optional. Embedding model name. |
| `REDIS_RATE_LIMIT_URL` | firecrawl-api | - | Redis for rate limiting. |
| `NUM_WORKERS_PER_QUEUE` | firecrawl-api | 8 | BullMQ concurrency per queue (upstream default). |
| `USE_DB_AUTHENTICATION` | firecrawl-api | false | Supabase auth is not available for self-hosting; the firecrawl gateway enforces the API key instead. |
| `NUQ_DATABASE_URL_LISTEN` | firecrawl-api | - | Direct connection used for LISTEN/NOTIFY (same database). |
| `CRAWL_CONCURRENT_REQUESTS` | firecrawl-api | 10 | Concurrent requests per crawl (upstream default). |
| `PLAYWRIGHT_MICROSERVICE_URL` | firecrawl-api | - | Browser rendering service (private network). |
| `PORT` | firecrawl | 8080 | Gateway listen port (public domain target). |
| `FIRECRAWL_API_KEY` | firecrawl | (secret) | API key clients must send as 'Authorization: Bearer <key>'. Use it as the SDK api_key. |
| `FIRECRAWL_UPSTREAM` | firecrawl | - | Private address of firecrawl-api. |
| `ENV` | firecrawl-worker | local | Self-hosted mode (same value as the upstream docker-compose). |
| `PORT` | firecrawl-worker | 3005 | Liveness port of the queue-worker (Railway healthcheck). |
| `REDIS_URL` | firecrawl-worker | - | Redis for BullMQ queues and crawl state. |
| `MODEL_NAME` | firecrawl-worker | - | Shared with firecrawl-api (MODEL_NAME). |
| `WORKER_PORT` | firecrawl-worker | 3005 | queue-worker liveness port. |
| `PROXY_SERVER` | firecrawl-worker | - | Shared with firecrawl-api (PROXY_SERVER). |
| `BULL_AUTH_KEY` | firecrawl-worker | (secret) | Shared with firecrawl-api (BULL_AUTH_KEY). |
| `IS_KUBERNETES` | firecrawl-worker | true | Use container (cgroup v2) CPU/RAM figures for job back-pressure instead of host-wide numbers. |
| `LOGGING_LEVEL` | firecrawl-worker | INFO | Log level. |
| `OPENAI_API_KEY` | firecrawl-worker | (secret) | Shared with firecrawl-api (OPENAI_API_KEY). |
| `PROXY_PASSWORD` | firecrawl-worker | (secret) | Shared with firecrawl-api (PROXY_PASSWORD). |
| `PROXY_USERNAME` | firecrawl-worker | (secret) | Shared with firecrawl-api (PROXY_USERNAME). |
| `OLLAMA_BASE_URL` | firecrawl-worker | - | Shared with firecrawl-api (OLLAMA_BASE_URL). |
| `OPENAI_BASE_URL` | firecrawl-worker | - | Shared with firecrawl-api (OPENAI_BASE_URL). |
| `NUQ_DATABASE_URL` | firecrawl-worker | - | NuQ job queue database (nuq-postgres, private network). |
| `NUQ_RABBITMQ_URL` | firecrawl-worker | - | RabbitMQ used by NuQ to wake workers when jobs arrive. |
| `SEARXNG_ENDPOINT` | firecrawl-worker | - | Shared with firecrawl-api (SEARXNG_ENDPOINT). |
| `BROWSER_POOL_SIZE` | firecrawl-worker | - | Shared with firecrawl-api (BROWSER_POOL_SIZE). |
| `EXTRACT_WORKER_PORT` | firecrawl-worker | 3004 | extract-worker health port. |
| `MAX_CONCURRENT_JOBS` | firecrawl-worker | - | Shared with firecrawl-api (MAX_CONCURRENT_JOBS). |
| `MODEL_EMBEDDING_NAME` | firecrawl-worker | - | Shared with firecrawl-api (MODEL_EMBEDDING_NAME). |
| `REDIS_RATE_LIMIT_URL` | firecrawl-worker | - | Redis for rate limiting. |
| `FIRECRAWL_WORKER_ROLE` | firecrawl-worker | worker | Process group run by services/firecrawl-workers/railway-workers.sh: queue-worker, extract-worker, NuQ prefetch and reconciler. |
| `NUM_WORKERS_PER_QUEUE` | firecrawl-worker | - | Shared with firecrawl-api (NUM_WORKERS_PER_QUEUE). |
| `USE_DB_AUTHENTICATION` | firecrawl-worker | false | Supabase auth is not available for self-hosting; the firecrawl gateway enforces the API key instead. |
| `NUQ_DATABASE_URL_LISTEN` | firecrawl-worker | - | Direct connection used for LISTEN/NOTIFY (same database). |
| `NUQ_PREFETCH_WORKER_PORT` | firecrawl-worker | 3011 | NuQ prefetch worker health port. |
| `CRAWL_CONCURRENT_REQUESTS` | firecrawl-worker | - | Shared with firecrawl-api (CRAWL_CONCURRENT_REQUESTS). |
| `NUQ_RECONCILER_WORKER_PORT` | firecrawl-worker | 3012 | NuQ reconciler health port. |
| `PLAYWRIGHT_MICROSERVICE_URL` | firecrawl-worker | - | Browser rendering service (private network). |
| `RABBITMQ_DEFAULT_PASS` | RabbitMQ | - | RabbitMQ password, generated. |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | RabbitMQ user for NuQ. |
| `ENV` | firecrawl-nuq-worker | local | Self-hosted mode (same value as the upstream docker-compose). |
| `PORT` | firecrawl-nuq-worker | 3006 | Health port of the first executor (Railway healthcheck). |
| `REDIS_URL` | firecrawl-nuq-worker | - | Redis for BullMQ queues and crawl state. |
| `MODEL_NAME` | firecrawl-nuq-worker | - | Shared with firecrawl-api (MODEL_NAME). |
| `PROXY_SERVER` | firecrawl-nuq-worker | - | Shared with firecrawl-api (PROXY_SERVER). |
| `BULL_AUTH_KEY` | firecrawl-nuq-worker | (secret) | Shared with firecrawl-api (BULL_AUTH_KEY). |
| `LOGGING_LEVEL` | firecrawl-nuq-worker | INFO | Log level. |
| `OPENAI_API_KEY` | firecrawl-nuq-worker | (secret) | Shared with firecrawl-api (OPENAI_API_KEY). |
| `PROXY_PASSWORD` | firecrawl-nuq-worker | (secret) | Shared with firecrawl-api (PROXY_PASSWORD). |
| `PROXY_USERNAME` | firecrawl-nuq-worker | (secret) | Shared with firecrawl-api (PROXY_USERNAME). |
| `OLLAMA_BASE_URL` | firecrawl-nuq-worker | - | Shared with firecrawl-api (OLLAMA_BASE_URL). |
| `OPENAI_BASE_URL` | firecrawl-nuq-worker | - | Shared with firecrawl-api (OPENAI_BASE_URL). |
| `NUQ_DATABASE_URL` | firecrawl-nuq-worker | - | NuQ job queue database (nuq-postgres, private network). |
| `NUQ_RABBITMQ_URL` | firecrawl-nuq-worker | - | RabbitMQ used by NuQ to wake workers when jobs arrive. |
| `NUQ_WORKER_COUNT` | firecrawl-nuq-worker | 5 | Scrape executor processes in this container (upstream harness default 5). Each handles one job at a time. |
| `SEARXNG_ENDPOINT` | firecrawl-nuq-worker | - | Shared with firecrawl-api (SEARXNG_ENDPOINT). |
| `BROWSER_POOL_SIZE` | firecrawl-nuq-worker | - | Shared with firecrawl-api (BROWSER_POOL_SIZE). |
| `MAX_CONCURRENT_JOBS` | firecrawl-nuq-worker | - | Shared with firecrawl-api (MAX_CONCURRENT_JOBS). |
| `MODEL_EMBEDDING_NAME` | firecrawl-nuq-worker | - | Shared with firecrawl-api (MODEL_EMBEDDING_NAME). |
| `REDIS_RATE_LIMIT_URL` | firecrawl-nuq-worker | - | Redis for rate limiting. |
| `FIRECRAWL_WORKER_ROLE` | firecrawl-nuq-worker | nuq-worker | Runs NUQ_WORKER_COUNT scrape-executor processes (services/firecrawl-workers/railway-workers.sh). |
| `NUM_WORKERS_PER_QUEUE` | firecrawl-nuq-worker | - | Shared with firecrawl-api (NUM_WORKERS_PER_QUEUE). |
| `NUQ_WORKER_START_PORT` | firecrawl-nuq-worker | 3006 | First health port; process i listens on start+i. |
| `USE_DB_AUTHENTICATION` | firecrawl-nuq-worker | false | Supabase auth is not available for self-hosting; the firecrawl gateway enforces the API key instead. |
| `NUQ_DATABASE_URL_LISTEN` | firecrawl-nuq-worker | - | Direct connection used for LISTEN/NOTIFY (same database). |
| `CRAWL_CONCURRENT_REQUESTS` | firecrawl-nuq-worker | - | Shared with firecrawl-api (CRAWL_CONCURRENT_REQUESTS). |
| `PLAYWRIGHT_MICROSERVICE_URL` | firecrawl-nuq-worker | - | Browser rendering service (private network). |

## Configuration

- **Healthcheck:** `/health`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh postgres -c max_wal_size=1GB -c min_wal_size=128MB -c wal_buffers=16MB`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node dist/src/index.js`
- **Healthcheck:** `/v0/health/readiness`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/liveness`

**Category:** AI/ML · **Tags:** firecrawl, web-scraping, crawler, markdown, llm · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/firecrawl-v2-web-data-api-for-ai)
