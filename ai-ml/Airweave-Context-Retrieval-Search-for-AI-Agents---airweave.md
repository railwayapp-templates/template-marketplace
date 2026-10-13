# Deploy Airweave | Context Retrieval & Search for AI Agents on Railway

Sync 50+ apps into one search layer your AI agents can query

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/airweave)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/airweave?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=airweave)

[Airweave](https://airweave.ai/) is the open-source context retrieval layer for AI agents. Connect Notion, Slack, GitHub, Google Drive, Gmail, Jira, Linear, HubSpot, Salesforce, databases and 50+ other apps; Airweave syncs them into collections and exposes one search API (instant, classic and agentic tiers) that agents, RAG pipelines and MCP clients can query. This template runs the full self-hosted stack: API, sync worker, Temporal, the Vespa search engine, Svix webhooks, Postgres and Redis, behind a password-protected gateway.

The stack is eight services:

- **Airweave** (public): Caddy serving Airweave's web app and proxying `/api` to the backend. It holds the only public domain and the lock (see below).
- **Backend**: the official `airweave-backend` image (pinned to v0.9.73), FastAPI. Runs the database migrations on every boot before Railway's health check passes.
- **Worker**: the same image running the Temporal worker that executes syncs: it pulls data from your sources, chunks and embeds it and writes it to Vespa. Raw sync data goes to its volume.
- **Temporal**: `temporalio/auto-setup`, on the same Postgres (it creates its own `temporal` and `temporal_visibility` databases). The start command registers Airweave's `SyncId` search attribute, which scheduled syncs need.
- **Vespa**: single-node Vespa 8, Airweave's hybrid (vector + BM25) search index. It deploys Airweave's schemas itself on every boot, so no init container is needed.
- **Svix**: the open-source webhook server Airweave uses to deliver sync events to your endpoints.
- **Postgres 16** and **Redis 8**, private network only.

**Airweave has no login of its own when self-hosted.** Its built-in auth needs an Auth0 tenant; without one (`AUTH_ENABLED=false`, upstream's self-host default) every API call acts as the admin. So nothing but the gateway is public, and the gateway requires either:

- **HTTP basic auth** for the browser: user `admin`, password `AIRWEAVE_PASSWORD` (generated), or
- **an `X-API-Key` header** for scripts, SDKs and MCP: the generated `AIRWEAVE_API_KEY`.

Both are on the Airweave service's Variables tab. API keys created inside the Airweave web app are not checked in this mode; use `AIRWEAVE_API_KEY`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Airweave | [nomideusz/airweave-railway](https://github.com/nomideusz/airweave-railway) (root: /gateway) | Web service |
| Svix | `svix/svix-server:v1.101.0` | Worker |
| Temporal | `temporalio/auto-setup:1.29.7` | Worker |
| Vespa | [nomideusz/airweave-railway](https://github.com/nomideusz/airweave-railway) (root: /vespa) | Database |
| Redis | `redis:8.10.2-alpine` | Database |
| Worker | `ghcr.io/airweave-ai/airweave-backend:v0.9.73` | Database |
| Backend | `ghcr.io/airweave-ai/airweave-backend:v0.9.73` | Worker |
| Postgres | `postgres:16.15` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Airweave | 8080 | Port the gateway listens on - leave as is |
| `AIRWEAVE_API_KEY` | Airweave | (secret) | Auto-generated API key: send it as the X-API-Key header (SDKs, MCP, curl) to reach /api without the password |
| `BACKEND_UPSTREAM` | Airweave | - | Airweave API on the private network |
| `AIRWEAVE_PASSWORD` | Airweave | (secret) | Auto-generated password for the Airweave web app (HTTP basic auth) |
| `AIRWEAVE_USERNAME` | Airweave | (secret) | Username for signing in to the Airweave web app |
| `WAIT_FOR` | Svix | true | Wait for Postgres and Redis before starting |
| `SVIX_DB_DSN` | Svix | - | Svix database (created by Postgres on first boot) |
| `SVIX_REDIS_DSN` | Svix | - | Redis for Svix's delivery queue |
| `SVIX_CACHE_TYPE` | Svix | none | Upstream's setting: the memory cache delivers to stale endpoint lists |
| `SVIX_JWT_SECRET` | Svix | (secret) | Auto-generated secret for the Svix API (shared with the Backend) |
| `SVIX_QUEUE_TYPE` | Svix | redis | Delivery queue backend |
| `DB` | Temporal | postgres12 | Temporal persistence driver for Postgres |
| `PORT` | Temporal | 7243 | Temporal frontend HTTP API port, used by Railway's health check - leave as is |
| `DB_PORT` | Temporal | 5432 | Postgres port |
| `BIND_ON_IP` | Temporal | :: | Listen on IPv6 and IPv4 for Railway's private network |
| `POSTGRES_PWD` | Temporal | - | Postgres password |
| `POSTGRES_USER` | Temporal | (secret) | Postgres user |
| `POSTGRES_SEEDS` | Temporal | - | Postgres host (Temporal creates its own temporal and temporal_visibility databases) |
| `TEMPORAL_ADDRESS` | Temporal | 127.0.0.1:7233 | Address the setup CLI uses inside the container |
| `TEMPORAL_BROADCAST_ADDRESS` | Temporal | 127.0.0.1 | Single node: cluster members find each other on loopback |
| `SKIP_ADD_CUSTOM_SEARCH_ATTRIBUTES` | Temporal | true | Skip Temporal's sample search attributes; Airweave's SyncId is registered by the start command |
| `PORT` | Vespa | 8081 | Vespa query and document API port, used by Railway's health check - leave as is |
| `EMBEDDING_DIMENSIONS` | Vespa | 1024 | Vector size of the search schema: 1024 for mistral_embed, 1536 for openai_text_embedding_3_small, 3072 for _large. Set before the first deploy; fixed afterwards |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `PORT` | Worker | 8888 | Worker health endpoint port, used by Railway's health check - leave as is |
| `SVIX_URL` | Worker | - | Same as the Backend service |
| `VESPA_URL` | Worker | - | Same as the Backend service |
| `REDIS_HOST` | Worker | - | Same as the Backend service |
| `REDIS_PORT` | Worker | - | Same as the Backend service |
| `VESPA_PORT` | Worker | - | Same as the Backend service |
| `ENVIRONMENT` | Worker | - | Same as the Backend service |
| `POSTGRES_DB` | Worker | - | Same as the Backend service |
| `API_FULL_URL` | Worker | - | Same as the Backend service |
| `APP_FULL_URL` | Worker | - | Same as the Backend service |
| `AUTH_ENABLED` | Worker | - | Same as the Backend service |
| `STATE_SECRET` | Worker | (secret) | Same as the Backend service |
| `STORAGE_PATH` | Worker | - | Same as the Backend service |
| `POSTGRES_HOST` | Worker | - | Same as the Backend service |
| `POSTGRES_PORT` | Worker | - | Same as the Backend service |
| `POSTGRES_USER` | Worker | (secret) | Same as the Backend service |
| `TEMPORAL_HOST` | Worker | - | Same as the Backend service |
| `TEMPORAL_PORT` | Worker | - | Same as the Backend service |
| `DENSE_EMBEDDER` | Worker | - | Same as the Backend service |
| `ENCRYPTION_KEY` | Worker | - | Same as the Backend service |
| `OPENAI_API_KEY` | Worker | (secret) | Same as the Backend service |
| `REDIS_PASSWORD` | Worker | (secret) | Same as the Backend service |
| `FIRST_SUPERUSER` | Worker | - | Same as the Backend service |
| `MISTRAL_API_KEY` | Worker | (secret) | Same as the Backend service |
| `SPARSE_EMBEDDER` | Worker | - | Same as the Backend service |
| `STORAGE_BACKEND` | Worker | - | Same as the Backend service |
| `SVIX_JWT_SECRET` | Worker | (secret) | Same as the Backend service |
| `TOGETHER_API_KEY` | Worker | (secret) | Same as the Backend service |
| `ANALYTICS_ENABLED` | Worker | - | Same as the Backend service |
| `ANTHROPIC_API_KEY` | Worker | (secret) | Same as the Backend service |
| `POSTGRES_PASSWORD` | Worker | (secret) | Same as the Backend service |
| `LLM_FALLBACK_CHAIN` | Worker | - | Same as the Backend service |
| `EMBEDDING_DIMENSIONS` | Worker | - | Same as the Backend service |
| `FIRST_SUPERUSER_PASSWORD` | Worker | (secret) | Same as the Backend service |
| `PORT` | Backend | 8001 | Port the API listens on - leave as is |
| `SVIX_URL` | Backend | - | Svix webhook server on the private network |
| `VESPA_URL` | Backend | - | Vespa search index on the private network |
| `REDIS_HOST` | Backend | - | Redis on the private network |
| `REDIS_PORT` | Backend | 6379 | Redis port |
| `VESPA_PORT` | Backend | 8081 | Vespa query and document API port |
| `ENVIRONMENT` | Backend | self-hosted | Airweave's self-hosted mode: bring-your-own OAuth apps for OAuth sources, local file storage |
| `POSTGRES_DB` | Backend | - | Database name |
| `API_FULL_URL` | Backend | - | Public API URL (OAuth callbacks, links) - change the domain if you add a custom one |
| `APP_FULL_URL` | Backend | - | Public app URL - change the domain if you add a custom one |
| `AUTH_ENABLED` | Backend | false | Airweave's own login needs an Auth0 tenant; off here, the Airweave gateway's password and API key protect the API instead |
| `STATE_SECRET` | Backend | (secret) | Signs OAuth state tokens when connecting sources |
| `STORAGE_PATH` | Backend | /data/airweave-storage | Where raw sync data lives (the Worker's volume) |
| `POSTGRES_HOST` | Backend | - | Postgres on the private network |
| `POSTGRES_PORT` | Backend | 5432 | Postgres port |
| `POSTGRES_USER` | Backend | (secret) | Database user |
| `TEMPORAL_HOST` | Backend | - | Temporal (sync orchestration) on the private network |
| `TEMPORAL_PORT` | Backend | 7233 | Temporal gRPC port |
| `DENSE_EMBEDDER` | Backend | mistral_embed | Embedding model: mistral_embed (1024 dims), openai_text_embedding_3_small (1536) or openai_text_embedding_3_large (3072). Fixed after the first sync |
| `ENCRYPTION_KEY` | Backend | - | Fernet key that encrypts stored source credentials. BACK IT UP - changing it makes every connected source unreadable |
| `OPENAI_API_KEY` | Backend | (secret) | Optional: OpenAI key, only if you switch DENSE_EMBEDDER to an OpenAI model before the first deploy |
| `REDIS_PASSWORD` | Backend | (secret) | Redis password |
| `FIRST_SUPERUSER` | Backend | admin@example.org | Email of the built-in admin account all requests act as (shown in the app; any valid address) |
| `MISTRAL_API_KEY` | Backend | (secret) | Mistral API key (required): embeddings (mistral-embed), OCR of PDFs and images, and the classic/agentic search LLM. Get one at console.mistral.ai |
| `SPARSE_EMBEDDER` | Backend | fastembed_bm25 | Keyword (BM25) embedder, runs locally |
| `STORAGE_BACKEND` | Backend | filesystem | Raw sync data is written by the Worker to its volume |
| `SVIX_JWT_SECRET` | Backend | (secret) | Shared secret for the Svix API |
| `TOGETHER_API_KEY` | Backend | (secret) | Optional: Together AI key, fallback LLM for classic and agentic search |
| `ANALYTICS_ENABLED` | Backend | false | Send anonymous usage analytics to Airweave's PostHog - off by default |
| `ANTHROPIC_API_KEY` | Backend | (secret) | Optional: Anthropic key, fallback LLM for classic and agentic search |
| `POSTGRES_PASSWORD` | Backend | (secret) | Database password |
| `LLM_FALLBACK_CHAIN` | Backend | mistral:mistral-large,anthropic:claude-sonnet-4.6,together:zai-glm-5 | Search LLM chain (classic/agentic tiers); entries without an API key are skipped |
| `EMBEDDING_DIMENSIONS` | Backend | - | Embedding size, set on the Vespa service so the search schema matches |
| `FIRST_SUPERUSER_PASSWORD` | Backend | (secret) | Auto-generated password of the built-in admin record (required by Airweave, not used to sign in) |
| `POSTGRES_DB` | Postgres | airweave | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/bash -c "(until temporal operator search-attribute list --namespace default 2>/dev/null | grep -qw SyncId; do sleep 5; temporal operator search-attribute create --namespace default --name SyncId --type Keyword >/dev/null 2>&1; done; echo SyncId search attribute registered) & exec /etc/temporal/entrypoint.sh autosetup"`
- **Healthcheck:** `/api/v1/system-info`
- **Healthcheck:** `/state/v1/health`
- **Volume:** `/opt/vespa/var`
- **Start command:** `/bin/sh -c "chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --appendonly yes"`
- **Volume:** `/data`
- **Start command:** `python -m airweave.domains.temporal.worker`
- **Healthcheck:** `/health`
- **Start command:** `uvicorn airweave.main:app --host 0.0.0.0 --port 8001`
- **Healthcheck:** `/health/ready`
- **Start command:** `/bin/sh -c "echo 'CREATE DATABASE svix;' > /docker-entrypoint-initdb.d/10-svix.sql && exec docker-entrypoint.sh postgres -c max_connections=200"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/airweave)
