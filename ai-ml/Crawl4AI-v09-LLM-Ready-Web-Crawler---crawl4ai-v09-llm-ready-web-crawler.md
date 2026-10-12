# Deploy Crawl4AI v0.9 LLM-Ready Web Crawler on Railway

Turn websites into clean markdown for LLMs with a headless browser.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/crawl4ai-v09-llm-ready-web-crawler)

## About

Crawl4AI turns web pages into clean Markdown and structured data for LLMs, RAG pipelines and AI agents. This template runs the Crawl4AI 0.9 server with headless Chromium, a token-protected REST API, an MCP endpoint, the browser playground and monitoring dashboard, plus Redis for background job results.

The Crawl4AI server is a FastAPI app that drives a pool of headless Chromium browsers. Hosting it well means enough memory and shared memory for the browsers, authentication from the first request, a stable signing key for tokens, and somewhere durable for async job results. This community template builds on the official `unclecode/crawl4ai` image pinned by version and digest, generates the API token and signing key, gives Chromium 1 GiB of `/dev/shm`, checks `/health` before routing traffic, and stores job status and results in a Railway Redis so they survive redeploys. Browser pool size, idle timeout, memory guard, job workers and rate limit are adjustable through variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Crawl4AI | [baranberkay96/crawl4ai-railway](https://github.com/baranberkay96/crawl4ai-railway) (branch: main) (root: /services/crawl4ai) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `PORT` | Crawl4AI | 11235 | Port the Crawl4AI server listens on (gunicorn on all IPv4/IPv6 interfaces). Railway routes the domain and healthcheck here. |
| `REDIS_HOST` | Crawl4AI | - | Redis for job status/results and monitor stats (private network). Set to localhost to use the bundled in-container Redis instead. |
| `REDIS_PORT` | Crawl4AI | - | Redis port. |
| `SECRET_KEY` | Crawl4AI | (secret) | Signs JWTs: the internal MCP tool calls and the short-lived client tokens issued by POST /token. Keep it stable; at least 32 characters. |
| `LLM_PROVIDER` | Crawl4AI | - | Optional default model for LLM extraction in LiteLLM provider/model form, e.g. anthropic/{model}. Empty = upstream default openai/gpt-4o-mini. |
| `GEMINI_API_KEY` | Crawl4AI | (secret) | Optional. For gemini/* models; also set LLM_PROVIDER. |
| `OPENAI_API_KEY` | Crawl4AI | (secret) | Optional. Enables LLM extraction (/llm, /llm/job, LLM strategies) with OpenAI models. Plain crawling needs no key. |
| `REDIS_PASSWORD` | Crawl4AI | (secret) | Redis password (also protects the bundled loopback Redis). |
| `REDIS_TASK_TTL` | Crawl4AI | 3600 | Seconds that /crawl/job and /llm/job results stay retrievable in Redis. |
| `ANTHROPIC_API_KEY` | Crawl4AI | (secret) | Optional. For anthropic/* models; also set LLM_PROVIDER. |
| `CRAWL4AI_API_TOKEN` | Crawl4AI | (secret) | Operator token for every endpoint except /health and the UI shells. Send it as 'Authorization: Bearer ...'. Without it the server only listens on loopback. |
| `CRAWL4AI_MAX_PAGES` | Crawl4AI | 40 | Global cap on browser pages open at the same time (upstream default 40). Lower it to bound RAM; each page needs roughly 50-150 MB. |
| `CRAWL4AI_RATE_LIMIT` | Crawl4AI | 1000/minute | API rate limit per client address, e.g. 1000/minute (upstream default). |
| `CRAWL4AI_JOB_WORKERS` | Crawl4AI | 4 | Concurrent background workers for /crawl/job and /llm/job (upstream default 4). |
| `CRAWL4AI_CORS_ORIGINS` | Crawl4AI | - | Optional comma-separated browser origins allowed to call the API directly (CORS is deny-by-default). |
| `CRAWL4AI_BROWSER_IDLE_TTL` | Crawl4AI | 300 | Seconds before an idle pooled browser is closed (upstream default 300). Lower values return RAM sooner after bursts. |
| `CRAWL4AI_MEMORY_THRESHOLD` | Crawl4AI | 95 | Container memory percent (cgroup-aware) above which no new browsers are started (upstream default 95). |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Tags:** crawl4ai, crawler, scraper, markdown, llm · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/crawl4ai-v09-llm-ready-web-crawler)
