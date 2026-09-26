# Deploy Hindsight Memory Server on Railway

Long-term memory for AI agents over MCP and REST, with auth and pgvector

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hindsight-agent-memory-secure-slim)

## About

[Hindsight](https://github.com/vectorize-io/hindsight) is an open-source (MIT) memory server for AI agents. Your agent sends it things worth remembering and asks it questions later. Hindsight uses an LLM to pull facts and entities out of what you store, and searches them with embeddings in Postgres.

I wanted Hindsight with auth on from the first deploy and the memories on a volume, and I didn't want to pull a 9 GB image, so I put this template together. The API needs a key on every request, the web UI has its own password, and Postgres with pgvector keeps its data on a Railway volume.

You need one thing to deploy it: an OpenAI API key. It covers both the LLM and the embeddings. OpenRouter also works, and the setup is further down.

On a fresh deploy the whole stack idled at about 570 MB of RAM in my tests (API 371 MB, Postgres 135 MB, UI 65 MB), and the deploy finished in about 80 seconds. I'd run it on the Hobby plan.

The template runs three services:

- `hindsight-api` is the REST API and MCP server (slim image, pinned to 0.10.1)
- `hindsight-ui` is the web UI, which Hindsight calls the control plane
- `Postgres` runs `pgvector/pgvector:pg17` with a volume

The API runs its migrations on boot and creates the pgvector extension itself. Railway's healthcheck hits `/health`, which only returns 200 once the database is connected, so traffic doesn't reach a deploy that isn't ready. The UI talks to the API over the private network with the same key, so you never paste the API key into a browser.

When the deploy is done, copy `HINDSIGHT_API_TENANT_API_KEY` from the Variables tab of hindsight-api. That's your API key. The UI password is `HINDSIGHT_CP_ACCESS_KEY` on hindsight-ui.

Then check that the API answers:

```bash
curl https://YOUR-API-DOMAIN/v1/default/banks \
  -H "Authorization: Bearer YOUR_API_KEY"
```

You should get `{"banks":[],"total":0,...}` back. Without the header it returns 401.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg17` | Database |
| hindsight-api | `ghcr.io/vectorize-io/hindsight-api:0.10.1-slim` | Web service |
| hindsight-ui | `ghcr.io/vectorize-io/hindsight-control-plane:0.10.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | hindsight | Database name |
| `DATABASE_URL` | Postgres | - | Private connection string used by Hindsight |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password (generated) |
| `PORT` | hindsight-api | 8888 | Port Railway routes to |
| `HINDSIGHT_API_HOST` | hindsight-api | 0.0.0.0 | Listen address (Railway private networks are dual-stack since Oct 2025) |
| `HINDSIGHT_API_PORT` | hindsight-api | 8888 | API port |
| `HINDSIGHT_API_WORKER_ID` | hindsight-api | hindsight-railway | Stable worker id so in-flight tasks survive restarts |
| `HINDSIGHT_API_LLM_API_KEY` | hindsight-api | (secret) | API key for the LLM provider. With openai it also powers embeddings. |
| `HINDSIGHT_API_DATABASE_URL` | hindsight-api | - | pgvector Postgres (private network) |
| `HINDSIGHT_API_LLM_PROVIDER` | hindsight-api | openai | LLM provider: openai, anthropic, gemini, groq, deepseek, openrouter, ... (see Hindsight docs) |
| `HINDSIGHT_API_TENANT_API_KEY` | hindsight-api | (secret) | Your API key. Send it as Authorization: Bearer <key> |
| `HINDSIGHT_API_TENANT_EXTENSION` | hindsight-api | hindsight_api.extensions.builtin.tenant:ApiKeyTenantExtension | Require an API key on every request |
| `HINDSIGHT_API_RERANKER_PROVIDER` | hindsight-api | rrf | Reranker: rrf needs no model or key; cohere / tei / openrouter also supported |
| `HINDSIGHT_API_EMBEDDINGS_PROVIDER` | hindsight-api | openai | Embeddings provider (openai reuses the LLM key; set HINDSIGHT_API_EMBEDDINGS_API_KEY if your LLM is not OpenAI) |
| `HINDSIGHT_API_MIGRATION_DATABASE_URL` | hindsight-api | - | Connection used for migrations; fails fast if Postgres is restarting |
| `PORT` | hindsight-ui | 9999 | Port Railway routes to |
| `HINDSIGHT_CP_HOSTNAME` | hindsight-ui | 0.0.0.0 | Listen address |
| `HINDSIGHT_CP_ACCESS_KEY` | hindsight-ui | - | Password for the web UI |
| `HINDSIGHT_CP_DATAPLANE_API_KEY` | hindsight-ui | (secret) | API key the UI uses to talk to the API |
| `HINDSIGHT_CP_DATAPLANE_API_URL` | hindsight-ui | - | Hindsight API over the private network |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Tags:** ai, agents, memory, rag, mcp, pgvector

[View on Railway →](https://railway.com/deploy/hindsight-agent-memory-secure-slim)
