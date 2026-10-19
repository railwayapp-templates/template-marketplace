# Deploy Firecrawl | Self-Hosted Web Scraping & Crawling API for AI on Railway

Turn websites into LLM-ready markdown: scrape, crawl, map, search. API key.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/firecrawl-self-hosted)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/firecrawl-self-hosted?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=firecrawl-self-hosted)

[Firecrawl](https://firecrawl.dev) turns websites into clean, LLM-ready markdown or structured data. Give it a URL and it scrapes one page, crawls a whole site, maps every link, or searches the web and scrapes the results. JavaScript-heavy pages are rendered in a headless browser. This template runs the open-source Firecrawl (AGPL-3.0) on your own Railway project, so there are no credits or per-page fees.

This template runs Firecrawl's official images at pinned versions, with an API key in front:

| Service | What it does |
|---|---|
| **Firecrawl** | The public endpoint. A small Caddy gateway that checks your API key and passes requests on. |
| **API** | Firecrawl 2.11.538: the API plus its scrape, crawl and extract workers, in one container. |
| **Playwright** | Firecrawl's headless Chromium service for pages that need JavaScript. |
| **Postgres** | Firecrawl's job queue (NuQ), PostgreSQL 17 with pg_cron, on a volume. |
| **Redis** | Crawl state and rate limits, on a volume. |
| **RabbitMQ** | Job notifications between the API and the workers. |

What it adds over the plain Docker Compose setup:

- **An API key.** Self-hosted Firecrawl has no authentication, so anyone who finds the URL could scrape through your server. Here every request needs `Authorization: Bearer `, the header every Firecrawl SDK, the MCP server and the n8n node already send. Requests without it get a 401.
- **Pinned official images.** The API, Playwright and Postgres images come from Firecrawl's own registry at fixed versions (Playwright and Postgres by digest, as they only publish `latest`), so a redeploy never picks up an untested build.
- **Clean startup order.** The API waits for Postgres, RabbitMQ and Redis before starting its workers. Without that, a worker that starts first crashes the whole container.
- **Memory you can tune.** `NUQ_WORKER_COUNT` sets how many pages are scraped in parallel. Each worker uses about 400 MB, and the default of 3 (upstream runs 5) saves roughly 800 MB.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| API | `ghcr.io/firecrawl/firecrawl:2.11.538` | Worker |
| Redis | `redis:8.10.2-alpine` | Database |
| Postgres | `ghcr.io/firecrawl/nuq-postgres@sha256:9b638af78d99873bc0ba2b57c9cbcd01df6ce96efeaa72d36cfbe0f76521e8fc` | Database |
| Firecrawl | [two-workspaces/firecrawl](https://github.com/two-workspaces/firecrawl) | Web service |
| RabbitMQ | `rabbitmq:4.1.8-alpine` | Database |
| Playwright | `ghcr.io/firecrawl/playwright-service@sha256:717699bf8a61d94451926c810d19ca1d36278192907e307bf5229a558b08fcc6` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ENV` | API | local | Self-hosted mode. |
| `HOST` | API | :: | Listen on all interfaces (IPv4 and IPv6) for Railway's private network. |
| `PORT` | API | 3002 | API port inside the private network. Leave as is. |
| `WAIT_FOR` | API | - | Services the API waits for before starting its workers. |
| `REDIS_URL` | API | - | Redis for crawl state and rate limits. |
| `MODEL_NAME` | API | - | Optional. Model for extract/JSON, for example gpt-5-mini. |
| `POSTGRES_DB` | API | - | Job queue database name. |
| `PROXY_SERVER` | API | - | Optional. Proxy for all fetches, for example http://proxy.example.com:8080. |
| `BULL_AUTH_KEY` | API | (secret) | Key in the queue dashboard URL: https://<your domain>/admin/<BULL_AUTH_KEY>/queues |
| `POSTGRES_HOST` | API | - | Job queue database host. |
| `POSTGRES_PORT` | API | 5432 | Job queue database port. |
| `POSTGRES_USER` | API | (secret) | Job queue database user. |
| `OPENAI_API_KEY` | API | (secret) | Optional. Enables extract, JSON and summary formats. Any OpenAI-compatible API works with OPENAI_BASE_URL. |
| `PROXY_PASSWORD` | API | (secret) | Optional. Proxy password. |
| `PROXY_USERNAME` | API | (secret) | Optional. Proxy username. |
| `OPENAI_BASE_URL` | API | - | Optional. OpenAI-compatible endpoint (OpenRouter, a LiteLLM gateway, ...). |
| `NUQ_RABBITMQ_URL` | API | - | RabbitMQ for job notifications. |
| `NUQ_WORKER_COUNT` | API | 3 | Scrape workers, each runs one page at a time (~400 MB each). Raise for more parallel scraping, lower to save memory. |
| `SEARXNG_ENDPOINT` | API | - | Optional. Your SearXNG URL for /search. Without it Firecrawl uses its built-in search. |
| `POSTGRES_PASSWORD` | API | (secret) | Job queue database password. |
| `REDIS_RATE_LIMIT_URL` | API | - | Redis for rate limits. |
| `USE_DB_AUTHENTICATION` | API | false | Self-hosted mode: no Supabase. The Firecrawl gateway checks the API key instead. |
| `PLAYWRIGHT_MICROSERVICE_URL` | API | - | Headless browser service for JavaScript-heavy pages. |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `POSTGRES_DB` | Postgres | postgres | Must stay postgres: pg_cron runs the queue's cleanup jobs in this database. |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `PORT` | Firecrawl | 8080 | Gateway port. Leave as is. |
| `BULL_AUTH_KEY` | Firecrawl | (secret) | Queue dashboard key, from the API service. |
| `FIRECRAWL_API_KEY` | Firecrawl | (secret) | Your API key. Send it as Authorization: Bearer <key>, the way every Firecrawl SDK, the MCP server and the n8n node do. |
| `FIRECRAWL_UPSTREAM` | Firecrawl | - | Firecrawl API on the private network. |
| `RABBITMQ_DEFAULT_PASS` | RabbitMQ | - | Auto-generated RabbitMQ password |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | RabbitMQ user |
| `PORT` | Playwright | 3000 | Browser service port. Leave as is. |
| `BLOCK_MEDIA` | Playwright | true | Skip images, video and fonts while rendering. Faster and lighter. |
| `PROXY_SERVER` | Playwright | - | Proxy, from the API service. |
| `PROXY_PASSWORD` | Playwright | (secret) | Proxy password, from the API service. |
| `PROXY_USERNAME` | Playwright | (secret) | Proxy username, from the API service. |
| `MAX_CONCURRENT_PAGES` | Playwright | 10 | Browser pages open at once. |

## Configuration

- **Start command:** `/bin/sh -c 'node -e "const n=require(\"net\");const w=a=>new Promise(r=>{const t=()=>{const i=a.lastIndexOf(\":\");const s=n.connect(+a.slice(i+1),a.slice(0,i));s.on(\"connect\",()=>{s.end();r()});s.on(\"error\",()=>{s.destroy();setTimeout(t,2000)})};t()});Promise.all(process.env.WAIT_FOR.split(\" \").map(w)).then(()=>process.exit(0))" && exec node dist/src/harness.js --start-docker'`
- **Healthcheck:** `/v0/health/liveness`
- **Start command:** `/bin/sh -c "rm -rf /data/lost+found && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --maxmemory-policy noeviction --appendonly yes --dir /data"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/railway-health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/firecrawl-self-hosted)
