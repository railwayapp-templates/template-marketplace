# Deploy Cognee AI Memory Platform with MCP on Railway

Cognee backend API, MCP in API/SSE mode, and managed Postgres + pgvector

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cognee-ai-memory-p-1)

## About

Cognee AI Memory Platform with MCP combines a private Cognee backend, durable Postgres + pgvector storage, and a public MCP service so AI tools can store, structure, and retrieve memory across sessions. This template is set up for a production-style Railway deployment with OpenRouter-backed models and an MCP SSE endpoint for client integrations.

Hosting this template deploys three connected services: `cognee-api` as the private backend, `cognee-mcp` as the public MCP layer, and PostgreSQL as the shared relational, graph, and vector store. Railway handles service provisioning, networking, and runtime configuration, while the template wires the backend and MCP service together over internal networking. The result is a single-user-ready memory stack that supports ingestion, Cognify processing, search, and MCP-based tool access from clients like OpenCode. You only need to provide your LLM credentials and optionally a separate embedding key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cognee-mcp | [RockinPaul/cognee_railway_template](https://github.com/RockinPaul/cognee_railway_template) (branch: main) | Worker |
| cognee-api | [RockinPaul/cognee_railway_template](https://github.com/RockinPaul/cognee_railway_template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `API_URL` | cognee-mcp | - | Internal Cognee backend URL used by the MCP service in API mode |
| `TRANSPORT_MODE` | cognee-mcp | sse | Cognee MCP transport for remote clients. In production API mode, SSE exposes the server at /sse. |
| `MCP_ALLOWED_HOSTS` | cognee-mcp | - | Comma-separated public hosts allowed by MCP transport security for SSE access |
| `HOST` | cognee-api | 0.0.0.0 | Bind address for the backend API service |
| `DB_HOST` | cognee-api | - | Private Railway hostname for the relational Postgres connection |
| `DB_NAME` | cognee-api | - | Database name used by Cognee relational storage |
| `DB_PORT` | cognee-api | - | Port for the relational Postgres connection |
| `LLM_MODEL` | cognee-api | openrouter/openai/gpt-4o-mini | Reliable default OpenRouter model for Cognify extraction, summarization, and responses. Gemma can still be used as an advanced override. |
| `DB_PASSWORD` | cognee-api | (secret) | Password for the relational Postgres connection |
| `DB_PROVIDER` | cognee-api | postgres | Database provider |
| `DB_USERNAME` | cognee-api | (secret) | Username for the relational Postgres connection |
| `ENVIRONMENT` | cognee-api | prod | Application environment label used by the backend service |
| `LLM_API_KEY` | cognee-api | (secret) | Your OpenRouter API key. Cognee uses it for the OpenRouter LLM and, by default, for embeddings too. |
| `LLM_ENDPOINT` | cognee-api | https://openrouter.ai/api/v1 | OpenRouter OpenAI-compatible API base URL for chat/completions |
| `LLM_PROVIDER` | cognee-api | custom | Cognee LLM provider for OpenRouter's OpenAI-compatible API |
| `VECTOR_DB_URL` | cognee-api | - | Connection URL for pgvector-backed vector storage |
| `VECTOR_DB_HOST` | cognee-api | - | Private Railway hostname for the pgvector connection |
| `VECTOR_DB_PORT` | cognee-api | - | Port for the pgvector connection |
| `EMBEDDING_MODEL` | cognee-api | openrouter/google/gemini-embedding-2-preview | OpenRouter embedding model for semantic indexing |
| `EMBEDDING_API_KEY` | cognee-api | (secret) | Optional separate OpenRouter API key for embeddings. Leave empty to reuse LLM_API_KEY. |
| `EMBEDDING_ENDPOINT` | cognee-api | https://openrouter.ai/api/v1 | OpenRouter OpenAI-compatible API base URL for embeddings |
| `EMBEDDING_PROVIDER` | cognee-api | litellm | Embedding provider for semantic indexing |
| `GRAPH_DATABASE_URL` | cognee-api | - | Postgres connection string for graph persistence in single-user mode |
| `VECTOR_DB_PASSWORD` | cognee-api | (secret) | Password for the pgvector connection |
| `VECTOR_DB_PROVIDER` | cognee-api | pgvector | Vector database provider |
| `VECTOR_DB_USERNAME` | cognee-api | (secret) | Username for the pgvector connection |
| `GRAPH_DATABASE_HOST` | cognee-api | - | Private Railway hostname for the graph Postgres connection |
| `GRAPH_DATABASE_PORT` | cognee-api | - | Port for graph persistence in Postgres |
| `LLM_INSTRUCTOR_MODE` | cognee-api | json_schema_mode | Structured-output mode for the OpenRouter-backed LLM adapter |
| `CORS_ALLOWED_ORIGINS` | cognee-api | * | Comma-separated allowed CORS origins |
| `EMBEDDING_DIMENSIONS` | cognee-api | 3072 | Embedding vector dimensions for Gemini Embedding 2 Preview |
| `REQUIRE_AUTHENTICATION` | cognee-api | false | Disable API auth for a single-user MCP-backed deployment |
| `GRAPH_DATABASE_PASSWORD` | cognee-api | (secret) | Password for the graph Postgres connection |
| `GRAPH_DATABASE_PROVIDER` | cognee-api | postgres | Graph database provider for single-user deployments |
| `GRAPH_DATABASE_USERNAME` | cognee-api | (secret) | Username for the graph Postgres connection |
| `ENABLE_BACKEND_ACCESS_CONTROL` | cognee-api | false | Disable multi-user dataset isolation for a simpler single-user memory deployment |
| `VECTOR_DATASET_DATABASE_HANDLER` | cognee-api | pgvector | Dataset handler aligned with the pgvector backend |
| `POSTGRES_DB` | Postgres | railway | Database name initialized by the Postgres service on first boot. |
| `DATABASE_URL` | Postgres | - | Private/internal PostgreSQL connection URL for service-to-service traffic inside Railway. |
| `POSTGRES_USER` | Postgres | (secret) | Primary PostgreSQL user created during service initialization. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Initial password for the PostgreSQL user, typically generated as a Railway secret. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public PostgreSQL connection URL using Railway's TCP proxy, intended for access from outside Railway. |

## Configuration

- **Healthcheck:** ` /health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Python, Shell, Dockerfile, Mako

[View on Railway →](https://railway.com/deploy/cognee-ai-memory-p-1)
