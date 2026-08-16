# Deploy Firecrawl on Railway

Turn any website into LLM-ready Markdown with self-hosted Firecrawl

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/firecrawl-railway)

## About

Firecrawl is an open-source web data API that turns any URL into clean, LLM-ready Markdown or structured JSON. It handles the parts of web scraping that usually eat an afternoon — JavaScript rendering, sitemap discovery, following links to a depth limit, stripping navigation and ads, respecting `robots.txt`, and returning page metadata with the content. Teams building RAG systems, AI agents and competitor monitoring use it as the ingestion layer in front of a vector database; it is the self-hostable alternative to Apify, Bright Data and Diffbot.

Self-host Firecrawl on Railway with the production topology already wired together: the REST API, five worker roles pulling jobs off a Postgres-backed queue, a headless Chromium renderer, RabbitMQ for job-completion notifications, and Redis for rate limiting. Because a self-hosted Firecrawl accepts any bearer token, this template does not expose the API directly — a Caddy gateway holds the only public domain, checks every request against an API key you control, and forwards it over the private network. Deploy Firecrawl and you get a working `https://` endpoint with an API key, not a checklist of hardening tasks.

![Firecrawl Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786826407/538af215-d523-4450-a770-19d804e9ab33.png)

Firecrawl closes the gap between "a web page exists" and "a language model can read it". Point it at a URL and it fetches the page, renders JavaScript when needed, converts the DOM to Markdown and returns metadata such as HTTP status, title and canonical URL. Point it at a domain and it walks the sitemap and links, returning the same output per page. Teams self-host it when volume makes a metered SaaS expensive, when content is too sensitive for a third party, or to keep the crawler beside the vector database it feeds.

Key capabilities:

- **Scrape** a URL to Markdown, HTML, links, screenshots or structured JSON
- **Crawl** a site with depth, path and page-count limits, honouring `robots.txt`
- **Map** a domain to its discoverable URLs in one fast call
- **Batch scrape** many URLs in one job, with webhooks when it finishes
- **Extract** schema-defined fields; PDFs and DOCX parse automatically

The template splits Firecrawl's processes into separate services rather than one container. **api** answers HTTP and enqueues work; **nuq-worker** performs the scrapes; **worker** orchestrates crawls; **nuq-prefetch-worker** feeds jobs to workers and **nuq-reconciler-worker** returns abandoned ones to the queue; **extract-worker** handles schema extraction; **playwright-service** runs Chromium. **nuq-postgres** is the queue itself — Firecrawl's own PostgreSQL image with `pg_cron` and the queue schema baked in, so a plain Postgres cannot replace it. **RabbitMQ** carries completion notifications and **Redis** backs rate limiting.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nuq-worker | `ghcr.io/firecrawl/firecrawl:latest` | Worker |
| rabbitmq | `rabbitmq:3-management` | Database |
| extract-worker | `ghcr.io/firecrawl/firecrawl:latest` | Worker |
| api | `ghcr.io/firecrawl/firecrawl:latest` | Worker |
| Redis | `redis:8.2` | Database |
| nuq-prefetch-worker | `ghcr.io/firecrawl/firecrawl:latest` | Worker |
| nuq-reconciler-worker | `ghcr.io/firecrawl/firecrawl:latest` | Worker |
| playwright-service | `ghcr.io/firecrawl/playwright-service:latest` | Worker |
| worker | `ghcr.io/firecrawl/firecrawl:latest` | Worker |
| gateway | [gridalpha/firecrawl-railway](https://github.com/gridalpha/firecrawl-railway) | Web service |
| nuq-postgres | `ghcr.io/firecrawl/nuq-postgres:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ENV` | nuq-worker | local | Sizes worker processes to the container |
| `PORT` | nuq-worker | 3006 | Health check port |
| `REDIS_URL` | nuq-worker | - | Cache and queue helper store |
| `BLOCK_MEDIA` | nuq-worker | true | Skip images and video |
| `POSTGRES_DB` | nuq-worker | postgres | Queue database name |
| `NODE_OPTIONS` | nuq-worker | --max-old-space-size=1536 | Node heap ceiling |
| `LOGGING_LEVEL` | nuq-worker | INFO | Log verbosity |
| `POSTGRES_HOST` | nuq-worker | - | Queue database host |
| `POSTGRES_PORT` | nuq-worker | 5432 | Queue database port |
| `POSTGRES_USER` | nuq-worker | (secret) | Queue database user |
| `NUQ_WORKER_PORT` | nuq-worker | 3006 | Scrape worker HTTP port |
| `NUQ_DATABASE_URL` | nuq-worker | - | Job queue connection |
| `NUQ_RABBITMQ_URL` | nuq-worker | - | Job completion broker |
| `BROWSER_POOL_SIZE` | nuq-worker | 5 | Browser instances available |
| `POSTGRES_PASSWORD` | nuq-worker | (secret) | Queue database password |
| `MAX_CONCURRENT_JOBS` | nuq-worker | 5 | Concurrent crawl jobs |
| `REDIS_RATE_LIMIT_URL` | nuq-worker | - | Rate limiter store |
| `USE_DB_AUTHENTICATION` | nuq-worker | false | Matches the API setting |
| `NUQ_DATABASE_URL_LISTEN` | nuq-worker | - | Queue notification connection |
| `CRAWL_CONCURRENT_REQUESTS` | nuq-worker | 10 | Parallel page fetches per crawl |
| `PLAYWRIGHT_MICROSERVICE_URL` | nuq-worker | - | Renderer endpoint |
| `RABBITMQ_NODENAME` | rabbitmq | rabbit@localhost | Stable node name across deploys |
| `RABBITMQ_DEFAULT_PASS` | rabbitmq | - | Broker password |
| `RABBITMQ_DEFAULT_USER` | rabbitmq | (secret) | Broker user |
| `ENV` | extract-worker | local | Sizes worker processes to the container |
| `PORT` | extract-worker | 3004 | Health check port |
| `REDIS_URL` | extract-worker | - | Cache and queue helper store |
| `BLOCK_MEDIA` | extract-worker | true | Skip images and video |
| `POSTGRES_DB` | extract-worker | postgres | Queue database name |
| `NODE_OPTIONS` | extract-worker | --max-old-space-size=1536 | Node heap ceiling |
| `LOGGING_LEVEL` | extract-worker | INFO | Log verbosity |
| `POSTGRES_HOST` | extract-worker | - | Queue database host |
| `POSTGRES_PORT` | extract-worker | 5432 | Queue database port |
| `POSTGRES_USER` | extract-worker | (secret) | Queue database user |
| `NUQ_DATABASE_URL` | extract-worker | - | Job queue connection |
| `NUQ_RABBITMQ_URL` | extract-worker | - | Job completion broker |
| `POSTGRES_PASSWORD` | extract-worker | (secret) | Queue database password |
| `EXTRACT_WORKER_PORT` | extract-worker | 3004 | Extraction worker HTTP port |
| `REDIS_RATE_LIMIT_URL` | extract-worker | - | Rate limiter store |
| `USE_DB_AUTHENTICATION` | extract-worker | false | Matches the API setting |
| `NUQ_DATABASE_URL_LISTEN` | extract-worker | - | Queue notification connection |
| `PLAYWRIGHT_MICROSERVICE_URL` | extract-worker | - | Renderer endpoint |
| `ENV` | api | local | Sizes API workers to the container |
| `HOST` | api | 0.0.0.0 | Bind address |
| `PORT` | api | 3002 | API listening port |
| `REDIS_URL` | api | - | Cache and queue helper store |
| `BLOCK_MEDIA` | api | true | Skip images and video |
| `POSTGRES_DB` | api | postgres | Queue database name |
| `NODE_OPTIONS` | api | --max-old-space-size=2048 | Node heap ceiling |
| `LOGGING_LEVEL` | api | INFO | Log verbosity |
| `POSTGRES_HOST` | api | - | Queue database host |
| `POSTGRES_PORT` | api | 5432 | Queue database port |
| `POSTGRES_USER` | api | (secret) | Queue database user |
| `NUQ_DATABASE_URL` | api | - | Job queue connection |
| `NUQ_RABBITMQ_URL` | api | - | Job completion broker |
| `BROWSER_POOL_SIZE` | api | 5 | Browser instances available |
| `POSTGRES_PASSWORD` | api | (secret) | Queue database password |
| `EXPRESS_TRUST_PROXY` | api | 2 | Proxy hops in front of the API |
| `MAX_CONCURRENT_JOBS` | api | 5 | Concurrent crawl jobs |
| `REDIS_RATE_LIMIT_URL` | api | - | Rate limiter store |
| `USE_DB_AUTHENTICATION` | api | false | Firecrawl's own auth needs Supabase |
| `NUQ_DATABASE_URL_LISTEN` | api | - | Queue notification connection |
| `CRAWL_CONCURRENT_REQUESTS` | api | 10 | Parallel page fetches per crawl |
| `PLAYWRIGHT_MICROSERVICE_URL` | api | - | Renderer endpoint |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `ENV` | nuq-prefetch-worker | local | Sizes worker processes to the container |
| `PORT` | nuq-prefetch-worker | 3007 | Health check port |
| `REDIS_URL` | nuq-prefetch-worker | - | Cache and queue helper store |
| `BLOCK_MEDIA` | nuq-prefetch-worker | true | Skip images and video |
| `POSTGRES_DB` | nuq-prefetch-worker | postgres | Queue database name |
| `NODE_OPTIONS` | nuq-prefetch-worker | --max-old-space-size=1024 | Node heap ceiling |
| `LOGGING_LEVEL` | nuq-prefetch-worker | INFO | Log verbosity |
| `POSTGRES_HOST` | nuq-prefetch-worker | - | Queue database host |
| `POSTGRES_PORT` | nuq-prefetch-worker | 5432 | Queue database port |
| `POSTGRES_USER` | nuq-prefetch-worker | (secret) | Queue database user |
| `NUQ_DATABASE_URL` | nuq-prefetch-worker | - | Job queue connection |
| `NUQ_RABBITMQ_URL` | nuq-prefetch-worker | - | Job completion broker |
| `POSTGRES_PASSWORD` | nuq-prefetch-worker | (secret) | Queue database password |
| `REDIS_RATE_LIMIT_URL` | nuq-prefetch-worker | - | Rate limiter store |
| `NUQ_PREFETCH_REPLICAS` | nuq-prefetch-worker | 1 | Prefetch is a singleton role |
| `USE_DB_AUTHENTICATION` | nuq-prefetch-worker | false | Matches the API setting |
| `NUQ_DATABASE_URL_LISTEN` | nuq-prefetch-worker | - | Queue notification connection |
| `NUQ_PREFETCH_WORKER_PORT` | nuq-prefetch-worker | 3007 | Prefetch worker HTTP port |
| `PLAYWRIGHT_MICROSERVICE_URL` | nuq-prefetch-worker | - | Renderer endpoint |
| `ENV` | nuq-reconciler-worker | local | Sizes worker processes to the container |
| `PORT` | nuq-reconciler-worker | 3008 | Health check port |
| `REDIS_URL` | nuq-reconciler-worker | - | Cache and queue helper store |
| `BLOCK_MEDIA` | nuq-reconciler-worker | true | Skip images and video |
| `POSTGRES_DB` | nuq-reconciler-worker | postgres | Queue database name |
| `NODE_OPTIONS` | nuq-reconciler-worker | --max-old-space-size=1024 | Node heap ceiling |
| `LOGGING_LEVEL` | nuq-reconciler-worker | INFO | Log verbosity |
| `POSTGRES_HOST` | nuq-reconciler-worker | - | Queue database host |
| `POSTGRES_PORT` | nuq-reconciler-worker | 5432 | Queue database port |
| `POSTGRES_USER` | nuq-reconciler-worker | (secret) | Queue database user |
| `NUQ_DATABASE_URL` | nuq-reconciler-worker | - | Job queue connection |
| `NUQ_RABBITMQ_URL` | nuq-reconciler-worker | - | Job completion broker |
| `POSTGRES_PASSWORD` | nuq-reconciler-worker | (secret) | Queue database password |
| `REDIS_RATE_LIMIT_URL` | nuq-reconciler-worker | - | Rate limiter store |
| `USE_DB_AUTHENTICATION` | nuq-reconciler-worker | false | Matches the API setting |
| `NUQ_DATABASE_URL_LISTEN` | nuq-reconciler-worker | - | Queue notification connection |
| `NUQ_RECONCILER_WORKER_PORT` | nuq-reconciler-worker | 3008 | Reconciler worker HTTP port |
| `PLAYWRIGHT_MICROSERVICE_URL` | nuq-reconciler-worker | - | Renderer endpoint |
| `PORT` | playwright-service | 3000 | Renderer listening port |
| `BLOCK_MEDIA` | playwright-service | true | Skip images and video |
| `MAX_CONCURRENT_PAGES` | playwright-service | 10 | Parallel browser pages |
| `ENV` | worker | local | Sizes worker processes to the container |
| `PORT` | worker | 3005 | Health check port |
| `REDIS_URL` | worker | - | Cache and queue helper store |
| `BLOCK_MEDIA` | worker | true | Skip images and video |
| `POSTGRES_DB` | worker | postgres | Queue database name |
| `WORKER_PORT` | worker | 3005 | Worker HTTP port |
| `NODE_OPTIONS` | worker | --max-old-space-size=1536 | Node heap ceiling |
| `LOGGING_LEVEL` | worker | INFO | Log verbosity |
| `POSTGRES_HOST` | worker | - | Queue database host |
| `POSTGRES_PORT` | worker | 5432 | Queue database port |
| `POSTGRES_USER` | worker | (secret) | Queue database user |
| `NUQ_DATABASE_URL` | worker | - | Job queue connection |
| `NUQ_RABBITMQ_URL` | worker | - | Job completion broker |
| `BROWSER_POOL_SIZE` | worker | 5 | Browser instances available |
| `POSTGRES_PASSWORD` | worker | (secret) | Queue database password |
| `MAX_CONCURRENT_JOBS` | worker | 5 | Concurrent crawl jobs |
| `REDIS_RATE_LIMIT_URL` | worker | - | Rate limiter store |
| `USE_DB_AUTHENTICATION` | worker | false | Matches the API setting |
| `NUQ_DATABASE_URL_LISTEN` | worker | - | Queue notification connection |
| `CRAWL_CONCURRENT_REQUESTS` | worker | 10 | Parallel page fetches per crawl |
| `PLAYWRIGHT_MICROSERVICE_URL` | worker | - | Renderer endpoint |
| `PORT` | gateway | 8080 | Gateway listening port |
| `FIRECRAWL_API_KEY` | gateway | (secret) | Bearer token clients must send |
| `FIRECRAWL_API_URL` | gateway | - | Private address of the API service |
| `POSTGRES_DB` | nuq-postgres | postgres | Queue database name |
| `POSTGRES_USER` | nuq-postgres | (secret) | Queue database user |
| `POSTGRES_PASSWORD` | nuq-postgres | (secret) | Queue database password |

## Configuration

- **Start command:** `node dist/src/services/worker/nuq-worker.js`
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/rabbitmq`
- **Start command:** `node dist/src/services/extract-worker.js`
- **Start command:** `node dist/src/index.js`
- **Healthcheck:** `/v0/health/readiness`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `node dist/src/services/worker/nuq-prefetch-worker.js`
- **Start command:** `node dist/src/services/worker/nuq-reconciler-worker.js`
- **Start command:** `node dist/src/services/queue-worker.js`
- **Healthcheck:** `/liveness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/firecrawl-railway)
