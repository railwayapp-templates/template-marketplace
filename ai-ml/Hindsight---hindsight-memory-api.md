# Deploy Hindsight on Railway

Open-source long-term memory.Retain/Recall/Reflect memory API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hindsight-memory-api)

## About

Hindsight is an open-source agent memory platform from Vectorize that gives AI agents durable, long-term memory instead of a short context window. Where a plain vector store only recalls past conversation snippets, Hindsight extracts facts, tracks entities and time, and forms "mental models" so an agent actually learns from what it has seen. It exposes three operations — Retain, Recall and Reflect — over a REST API, an MCP endpoint and Python/Node SDKs, and it has posted state-of-the-art scores on the LongMemEval benchmark. Teams use it to personalise chatbots, support agents, and autonomous "AI employees" that carry knowledge across sessions.

Deploy Hindsight on Railway and the full production topology is wired up in one click: the Hindsight API, a dedicated background worker, the Control Plane web UI, and a PostgreSQL database with pgvector. The API stores and retrieves memories, the worker handles extraction and consolidation off a Postgres-backed queue, and the Control Plane lets you explore memory banks, run recall queries and inspect the knowledge graph. It ships ready to self-host Hindsight with API-key authentication switched on, so nothing is left open.

![Hindsight Railway architecture](https://hindsight.vectorize.io/img/blog/fastest-growing-oss-ai-memory.png)

Hindsight is a memory engine that sits between your agent and its language model. Retain extracts structured facts, resolves entities and builds temporal, semantic and causal links; Recall fuses four strategies (semantic vectors, BM25 keyword, graph traversal and time filtering) with a cross-encoder reranker; Reflect analyses stored memories to form new observations and mental models. All state lives in PostgreSQL, so the API and worker stay stateless and scale horizontally.

Key features:

- Retain / Recall / Reflect API with Python, Node.js, CLI and MCP clients
- Biomimetic memory model: world facts, experiences and learned mental models
- Hybrid retrieval — semantic + keyword + graph + temporal, with reranking
- Multi-provider LLM support (OpenAI, Anthropic, Gemini, Groq, Ollama and more)
- Bundled local embedding and reranking models — no external ML services required
- Control Plane UI to browse banks, entities, documents and recall traces

This template runs four Railway services. **Hindsight API** serves the public REST/MCP endpoints. **Hindsight Worker** runs the same image with the `hindsight-worker` command and processes retain, consolidation and maintenance jobs from a Postgres task queue. **Hindsight Control Plane** is the dashboard, talking to the API over the private network. **PostgreSQL** with pgvector stores every memory, embedding and link; its schema and extensions are created automatically on first boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hindsight-api | `ghcr.io/vectorize-io/hindsight-api:0.9.1` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| hindsight-control-plane | `ghcr.io/vectorize-io/hindsight-control-plane:0.9.1` | Web service |
| hindsight-worker | `ghcr.io/vectorize-io/hindsight-api:0.9.1` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | hindsight-api | 8888 | Health-check port selector |
| `HINDSIGHT_API_PORT` | hindsight-api | 8888 | API HTTP listen port |
| `HINDSIGHT_API_LOG_LEVEL` | hindsight-api | info | Log verbosity |
| `HINDSIGHT_API_DATABASE_URL` | hindsight-api | - | PostgreSQL connection string |
| `HINDSIGHT_API_LLM_PROVIDER` | hindsight-api | none | LLM provider; none = semantic store |
| `HINDSIGHT_API_TENANT_API_KEY` | hindsight-api | (secret) | Bearer key for REST and MCP |
| `HINDSIGHT_API_WORKER_ENABLED` | hindsight-api | false | Dedicated worker owns background tasks |
| `HINDSIGHT_API_TENANT_EXTENSION` | hindsight-api | hindsight_api.extensions.builtin.tenant:ApiKeyTenantExtension | Enable API-key auth |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | hindsight-control-plane | 9999 | Health-check port selector |
| `HINDSIGHT_CP_PORT` | hindsight-control-plane | 9999 | Control Plane HTTP port |
| `HINDSIGHT_CP_HOSTNAME` | hindsight-control-plane | 0.0.0.0 | Bind address |
| `HINDSIGHT_CP_ACCESS_KEY` | hindsight-control-plane | - | Dashboard login password |
| `HINDSIGHT_CP_DATAPLANE_API_KEY` | hindsight-control-plane | (secret) | API key the UI sends |
| `HINDSIGHT_CP_DATAPLANE_API_URL` | hindsight-control-plane | http://hindsight-api.railway.internal:8888 | Private API URL |
| `PORT` | hindsight-worker | 8889 | Health-check port selector |
| `HINDSIGHT_API_LOG_LEVEL` | hindsight-worker | info | Log verbosity |
| `HINDSIGHT_API_WORKER_ID` | hindsight-worker | hindsight-worker | Stable worker identity across restarts |
| `HINDSIGHT_API_DATABASE_URL` | hindsight-worker | - | PostgreSQL connection string |
| `HINDSIGHT_API_LLM_PROVIDER` | hindsight-worker | none | LLM provider; none = semantic store |
| `HINDSIGHT_API_WORKER_HTTP_PORT` | hindsight-worker | 8889 | Worker health/metrics port |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Start command:** `hindsight-worker`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hindsight-memory-api)
