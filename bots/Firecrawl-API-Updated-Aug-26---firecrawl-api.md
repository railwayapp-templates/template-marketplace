# Deploy Firecrawl API [Updated Aug '26] on Railway

Firecrawl [Aug '26] (Web Scraping & Crawling API for LLMs) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/firecrawl-api)

## About

Firecrawl is the open-source API that turns any website into clean markdown, HTML, or structured data, built specifically to feed LLMs real web content instead of stale training data. Scrape a single page, crawl an entire site, or extract structured data, JavaScript rendering included.

Firecrawl Cloud's Standard plan runs about $83/month for 100,000 credits, and those credits don't roll over between billing cycles, unused ones just expire. Structured extraction is billed separately on top of that, often pushing a real Standard-plus-extraction setup to $172-188/month minimum. Self-hosted Firecrawl on Railway costs a flat infrastructure fee no matter how many pages you scrape or how much you extract.

The bigger reason to self-host a scraping tool specifically isn't only the pricing curve. Every URL you scrape, every page of content you pull, passes through whoever's running the API. For competitive research, internal tooling, or anything touching data you'd rather not hand to a third party, self-hosting keeps that traffic entirely on infrastructure you control.

It's worth being direct about something most Firecrawl templates on Railway get wrong: the most popular existing one uses unofficial, third-party rebuilt images instead of Firecrawl's own, and skips RabbitMQ entirely, despite the current API container hard-depending on it to even start. That combination is the most likely explanation for that template's real-world 75% deploy success rate, not a coin-flip, a specific, fixable gap. This template uses Firecrawl's own official images from `ghcr.io/firecrawl/*` and every service its current docker-compose actually specifies.

This isn't a small or unproven project either. Firecrawl has real traction in the AI development community, one of the default answers to "how do I get clean web content into my LLM pipeline," with official SDKs and framework integrations across the LangChain/LlamaIndex ecosystem. A scraping tool with real momentum keeps working as target sites change their anti-bot patterns, a smaller project can fall behind.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| observant-dream | [shruti060701/firecrawl-railway](https://github.com/shruti060701/firecrawl-railway) | Worker |
| poetic-wonder | [shruti060701/firecrawl-railway](https://github.com/shruti060701/firecrawl-railway) | Worker |
| independent-cat | [shruti060701/firecrawl-railway](https://github.com/shruti060701/firecrawl-railway) | Database |
| firecrawl-railway | [shruti060701/firecrawl-railway](https://github.com/shruti060701/firecrawl-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Internal hostname. |
| `REDISPORT` | Redis | 6379 | Port Redis listens on internally. Confirmed live, already filled in. |
| `REDISUSER` | Redis | default | Redis username.  |
| `REDIS_URL` | Redis | - | Standard internal connection string, confirmed live and referenced directly by `firecrawl-railway`'s `REDIS_URL`/`REDIS_RATE_LIMIT_URL` above. |
| `REDISPASSWORD` | Redis | (secret) | Auto-generated password. |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated password. |
| `REDIS_PUBLIC_URL` | Redis | - | Public/external connection string. Confirmed live this shows as incomplete (`redis://default:<password>@:`) until a TCP Proxy is added under Settings → Networking, same pattern already documented for this project's pgvector template. Not needed for this template's own internal use. |
| `PORT` | poetic-wonder | 3000 | Internal port the Playwright rendering service listens on. No public domain needed, confirmed live: this service has no `RAILWAY_PUBLIC_DOMAIN` variable at all, only `firecrawl-railway` connects to it over the private network. |
| `POSTGRES_DB` | independent-cat | postgres | **Must be exactly `postgres`**, same pg_cron constraint as above. Must match `firecrawl-railway`'s own `POSTGRES_DB` exactly, confirmed matching live. |
| `POSTGRES_USER` | independent-cat | (secret) | Must match `firecrawl-railway`'s own `POSTGRES_USER` exactly, confirmed matching live. |
| `POSTGRES_PASSWORD` | independent-cat | (secret) | Must match exactly, not independently generated, or the API can't connect. Confirmed matching live. |
| `HOST` | firecrawl-railway | 0.0.0.0 | Binds the server to all network interfaces so Railway's edge can route to it. |
| `PORT` | firecrawl-railway | 3002 | Port Railway routes external traffic to. Must be an explicit Railway variable, this project has confirmed the hard way on multiple prior templates that a Dockerfile-only default alone doesn't reliably get picked up by Railway's edge routing.  |
| `REDIS_URL` | firecrawl-railway | - | Redis connection string for the job queue and cache. Confirmed live: resolves to `redis://default:<password>@redis.railway.internal:6379`. |
| `POSTGRES_DB` | firecrawl-railway | postgres | Database name. **Must be exactly `postgres`, confirmed via a real deploy crash: `pg_cron` is hardcoded to only work in a database literally named `postgres`** (`cron.database_name = 'postgres'` baked into the image), using any other name silently aborts the entire nuq schema init script, not just the pg_cron extension. Must match the postgres service's own `POSTGRES_DB` exactly. |
| `BULL_AUTH_KEY` | firecrawl-railway | (secret) | Secures the Bull queue admin dashboard at `/admin/<key>/queues`. Confirmed live and working via a real request returning `200`. Firecrawl's own docs explicitly warn against leaving this at its documented default (`CHANGEME`) on any publicly-reachable deployment. |
| `POSTGRES_HOST` | firecrawl-railway | - | Internal hostname for the dedicated nuq-postgres queue backend. Confirmed live: resolves to `independent-cat.railway.internal`. |
| `POSTGRES_PORT` | firecrawl-railway | 5432 | Port the dedicated Postgres listens on. |
| `POSTGRES_USER` | firecrawl-railway | (secret) | Username for the dedicated Postgres. Must match the postgres service's own `POSTGRES_USER` exactly, confirmed matching live on both services. |
| `NUQ_RABBITMQ_URL` | firecrawl-railway | - | RabbitMQ connection string. Confirmed live: resolves to `amqp://observant-dream.railway.internal:5672`. **Critical, confirmed via Firecrawl's own docker-compose: the API container hard-depends on this being reachable to start at all.** |
| `POSTGRES_PASSWORD` | firecrawl-railway | (secret) | Password for the dedicated Postgres. |
| `REDIS_RATE_LIMIT_URL` | firecrawl-railway | - | Same Redis instance, used specifically for rate limiting. |
| `USE_DB_AUTHENTICATION` | firecrawl-railway | false | Whether Supabase-based API authentication is enabled. **Confirmed via Firecrawl's own official docs that this is currently not configurable for self-hosted instances at all**, do not imply it can be turned on. |
| `PLAYWRIGHT_MICROSERVICE_URL` | firecrawl-railway | - | Internal URL of the Playwright rendering service. Confirmed live: resolves to `http://poetic-wonder.railway.internal:3000/scrape`. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/firecrawl-api)
