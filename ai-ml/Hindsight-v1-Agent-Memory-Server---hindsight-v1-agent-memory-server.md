# Deploy Hindsight v1 Agent Memory Server on Railway

Long-term memory API and dashboard for AI agents, on Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hindsight-v1-agent-memory-server)

## About

Hindsight, built by Vectorize under the MIT license, gives AI agents a long-term memory they can write to and query across sessions. Memories live in Postgres with pgvector and come back through semantic, keyword, graph and time-aware search with reranking. This template deploys the Hindsight API, a background worker, the web Control Plane and Postgres.

Hindsight 1.0 runs as a FastAPI service with REST and MCP endpoints, an optional pool of workers that process background operations from a Postgres-backed queue, and a Next.js Control Plane for browsing banks, memories, entities and operations. It needs PostgreSQL with the `vector` extension, database migrations before each upgrade, an embedding model, a reranker and, for its full feature set, an LLM. This community template uses the official 1.0.0 images, runs migrations in a pre-deploy step, turns on API key authentication for REST and MCP, protects the Control Plane with an access key, and runs embeddings and reranking on CPU inside the image, so it works without any external key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hindsight Worker | `ghcr.io/vectorize-io/hindsight-api:1.0.0` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Hindsight API | `ghcr.io/vectorize-io/hindsight-api:1.0.0` | Web service |
| Hindsight Control Plane | `ghcr.io/vectorize-io/hindsight-control-plane:1.0.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Hindsight Worker | 8889 | Port of the worker's health/metrics server; Railway's healthcheck probes it. Keep equal to HINDSIGHT_API_WORKER_HTTP_PORT. |
| `HF_HUB_OFFLINE` | Hindsight Worker | - | Follows the API's setting. |
| `HINDSIGHT_API_LLM_MODEL` | Hindsight Worker | - | Follows the API's LLM model. |
| `HINDSIGHT_API_LOG_LEVEL` | Hindsight Worker | - | Follows the API's log level. |
| `HINDSIGHT_API_WORKER_ID` | Hindsight Worker | hindsight-worker-1 | Stable worker identity, so tasks claimed before a restart are recovered by the same worker. Must be unique per worker service. |
| `HINDSIGHT_API_LLM_API_KEY` | Hindsight Worker | (secret) | Follows the API's LLM key. Set it on the Hindsight API service. |
| `HINDSIGHT_API_DATABASE_URL` | Hindsight Worker | - | Same pgvector Postgres as the API (private network). |
| `HINDSIGHT_API_LLM_BASE_URL` | Hindsight Worker | - | Follows the API's LLM base URL. |
| `HINDSIGHT_API_LLM_PROVIDER` | Hindsight Worker | - | Follows the API's LLM provider. Change it on the Hindsight API service. |
| `HINDSIGHT_API_TENANT_API_KEY` | Hindsight Worker | (secret) | Same API key as the API (required by the tenant extension). |
| `HINDSIGHT_API_DB_POOL_MAX_SIZE` | Hindsight Worker | 30 | Max Postgres connections for the worker. |
| `HINDSIGHT_API_TENANT_EXTENSION` | Hindsight Worker | - | Same tenant (auth) extension as the API. |
| `HINDSIGHT_API_WORKER_HTTP_PORT` | Hindsight Worker | 8889 | Worker health (/health) and Prometheus (/metrics) port. Private only. |
| `HINDSIGHT_API_WORKER_MAX_SLOTS` | Hindsight Worker | 10 | Max background tasks this worker runs at once (upstream default). |
| `HINDSIGHT_API_RERANKER_PROVIDER` | Hindsight Worker | - | Follows the API's reranker provider. |
| `HINDSIGHT_API_EMBEDDINGS_PROVIDER` | Hindsight Worker | - | Must match the API's embedding provider. |
| `HINDSIGHT_API_MIGRATION_DATABASE_URL` | Hindsight Worker | - | Migration connection (the worker checks the schema on start; concurrent migrations are serialized by an advisory lock). |
| `HINDSIGHT_API_OPERATION_RETENTION_DAYS` | Hindsight Worker | - | Follows the API's operation retention. |
| `HINDSIGHT_API_DB_MAX_PARALLEL_WORKERS_PER_GATHER` | Hindsight Worker | 0 | Run bulk maintenance queries serially so the worker does not compete with API recall queries for Postgres CPU (upstream recommendation for worker processes). |
| `POSTGRES_DB` | Postgres | hindsight | Database created on first boot; holds all Hindsight tables. Migrations create the vector (pgvector, bundled in this image), pg_trgm and btree_gin extensions. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres over the private network. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser (Hindsight's migrations create extensions, which needs superuser). |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to Postgres, generated at deploy. |
| `PORT` | Hindsight API | 8888 | Port Railway routes the public domain and the healthcheck to. Keep equal to HINDSIGHT_API_PORT. |
| `HF_HUB_OFFLINE` | Hindsight API | 1 | Load the baked-in local models without contacting Hugging Face at boot. Set 0 only if you switch to a local model that is not in the image. |
| `HINDSIGHT_API_HOST` | Hindsight API | 0.0.0.0 | Bind address. 0.0.0.0 because single-process uvicorn on :: is IPv6-only and Railway's healthcheck uses IPv4. |
| `HINDSIGHT_API_PORT` | Hindsight API | 8888 | Port the Hindsight API (uvicorn) listens on. |
| `HINDSIGHT_API_LLM_MODEL` | Hindsight API | - | Optional model name. Empty = the provider's default in Hindsight (gpt-5-mini for openai). |
| `HINDSIGHT_API_LOG_LEVEL` | Hindsight API | info | Log level: debug, info, warning, error. |
| `HINDSIGHT_API_LLM_API_KEY` | Hindsight API | (secret) | Optional. API key for the LLM provider. Empty = storage and semantic recall only (no fact extraction, no reflect). Add it later and redeploy to enable everything. |
| `HINDSIGHT_API_MCP_ENABLED` | Hindsight API | true | Serve the MCP endpoint at /mcp/{bank_id}/ (same API key). |
| `HINDSIGHT_API_DATABASE_URL` | Hindsight API | - | pgvector Postgres over the private network. |
| `HINDSIGHT_API_LLM_BASE_URL` | Hindsight API | - | Optional custom endpoint for OpenAI-compatible gateways or self-hosted models (LiteLLM, vLLM, Ollama). Empty = provider default. |
| `HINDSIGHT_API_LLM_PROVIDER` | Hindsight API | openai | LLM for fact extraction, consolidation and reflect: openai, anthropic, gemini, groq, openrouter, deepseek, ollama, litellm, ... With openai and no key the API starts in no-LLM mode. |
| `HINDSIGHT_API_TENANT_API_KEY` | Hindsight API | (secret) | Your API key, generated at deploy. Clients send it as 'Authorization: Bearer {key}' (REST, MCP and SDKs). |
| `HINDSIGHT_API_WORKER_ENABLED` | Hindsight API | false | false = background operations (async retain, consolidation, mental models) run in the Hindsight Worker service, not in the API. |
| `HINDSIGHT_API_DB_POOL_MAX_SIZE` | Hindsight API | 40 | Max Postgres connections for the API (upstream default 100). Keeps API + worker under Postgres' default max_connections of 100. |
| `HINDSIGHT_API_TENANT_EXTENSION` | Hindsight API | hindsight_api.extensions.builtin.tenant:ApiKeyTenantExtension | Turns on API key authentication for every REST and MCP request. Do not remove: the API is public. |
| `HINDSIGHT_API_RERANKER_PROVIDER` | Hindsight API | local | local = cross-encoder/ms-marco-MiniLM-L-6-v2 baked into the image (CPU). rrf skips reranking; cohere, tei, openrouter etc. use a remote service. |
| `HINDSIGHT_API_EMBEDDINGS_PROVIDER` | Hindsight API | local | local = BAAI/bge-small-en-v1.5 baked into the image, runs on CPU, no key needed. Fix this before storing memories: changing the embedding size later needs an empty database. |
| `HINDSIGHT_API_MIGRATION_DATABASE_URL` | Hindsight API | - | Connection used by migrations (pre-deploy step); the timeout makes retries fast while Postgres is starting. |
| `HINDSIGHT_API_OPERATION_RETENTION_DAYS` | Hindsight API | 30 | Delete finished operation records (including their payloads) after this many days. 0 = keep forever (upstream default). |
| `PORT` | Hindsight Control Plane | 9999 | Port Railway routes the public domain and the healthcheck to. Keep equal to HINDSIGHT_CP_PORT. |
| `HINDSIGHT_CP_PORT` | Hindsight Control Plane | 9999 | Port the Control Plane (Next.js) listens on. |
| `HINDSIGHT_CP_HOSTNAME` | Hindsight Control Plane | 0.0.0.0 | Bind address of the Control Plane. |
| `HINDSIGHT_CP_ACCESS_KEY` | Hindsight Control Plane | - | Login key for the web UI, generated at deploy. Copy it from this service's Variables tab. |
| `HINDSIGHT_CP_DATAPLANE_API_KEY` | Hindsight Control Plane | (secret) | API key the Control Plane sends to the API. It never reaches the browser. |
| `HINDSIGHT_CP_DATAPLANE_API_URL` | Hindsight Control Plane | - | Hindsight API over the private network (server-side calls only). |

## Configuration

- **Start command:** `/bin/sh -c 'case "$HINDSIGHT_API_LLM_PROVIDER" in ""|openai) if [ -z "$HINDSIGHT_API_LLM_API_KEY" ] && [ -z "$HINDSIGHT_API_LLM_BASE_URL" ]; then echo "No LLM API key set: starting with HINDSIGHT_API_LLM_PROVIDER=none (storage and recall only, no fact extraction or reflect)"; export HINDSIGHT_API_LLM_PROVIDER=none; fi;; esac; exec hindsight-worker'`
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'case "$HINDSIGHT_API_LLM_PROVIDER" in ""|openai) if [ -z "$HINDSIGHT_API_LLM_API_KEY" ] && [ -z "$HINDSIGHT_API_LLM_BASE_URL" ]; then echo "No LLM API key set: starting with HINDSIGHT_API_LLM_PROVIDER=none (storage and recall only, no fact extraction or reflect)"; export HINDSIGHT_API_LLM_PROVIDER=none; fi;; esac; exec /app/start-all.sh'`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/health`

**Category:** AI/ML · **Tags:** hindsight, memory, ai-agents, mcp, llm

[View on Railway →](https://railway.com/deploy/hindsight-v1-agent-memory-server)
