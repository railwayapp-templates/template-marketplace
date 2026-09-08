# Deploy Cognee AI Memory Platform with MCP on Railway

Cognee 1.5.4 API, MCP over Streamable HTTP, and Postgres + pgvector

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cognee-ai-memory-p-1)

## About

Cognee AI Memory Platform with MCP combines a private Cognee backend, durable Postgres + pgvector storage, and a public MCP service so AI tools can store, structure, and retrieve memory across sessions. The template runs the upstream cognee 1.5.4 images with OpenRouter-backed models and exposes the MCP server over Streamable HTTP for client integrations. It is a single-user deployment: the MCP endpoint is public and unauthenticated by design, so treat its URL like a secret.

Hosting this template deploys three connected services: `cognee-api` as the private backend, `cognee-mcp` as the public MCP layer, and PostgreSQL as the shared relational, graph, and vector store. Railway handles provisioning, private networking, and runtime configuration, while the template wires the MCP service to the backend over the internal network. The result is a single-user memory stack that supports ingestion, Cognify processing, search, and MCP tool access from clients like OpenCode and Claude Code. You only need to provide an OpenRouter API key; embeddings reuse it unless you set a separate `EMBEDDING_API_KEY`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cognee-mcp | [RockinPaul/cognee_railway_template](https://github.com/RockinPaul/cognee_railway_template) (branch: main) | Web service |
| cognee-api | [RockinPaul/cognee_railway_template](https://github.com/RockinPaul/cognee_railway_template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | cognee-mcp | 8080 | Port the MCP server listens on. Must match the public networking target port (8080). |
| `API_URL` | cognee-mcp | - | Internal Cognee backend URL used by the MCP service in API mode |
| `TRANSPORT_MODE` | cognee-mcp | http | Cognee MCP transport for remote clients. In production API mode, exposes the server at /mcp. |
| `MCP_DISABLE_DNS_REBINDING_PROTECTION` | cognee-mcp | true | Required on Railway, whose healthcheck probes from an internal address. |
| `ENV` | cognee-api | prod | Application environment label used by the backend service |
| `PORT` | cognee-api | 8080 | Port for the backend API service |
| `DB_HOST` | cognee-api | - | Private Railway hostname for the relational Postgres connection |
| `DB_NAME` | cognee-api | - | Database name used by Cognee relational storage |
| `DB_PORT` | cognee-api | - | Port for the relational Postgres connection |
| `LLM_MODEL` | cognee-api | openrouter/openai/gpt-4o-mini | Reliable default OpenRouter model for Cognify extraction, summarization, and responses. Gemma can still be used as an advanced override. |
| `DB_PASSWORD` | cognee-api | (secret) | Password for the relational Postgres connection |
| `DB_PROVIDER` | cognee-api | postgres | Database provider |
| `DB_USERNAME` | cognee-api | (secret) | Username for the relational Postgres connection |
| `LLM_API_KEY` | cognee-api | (secret) | Your OpenRouter API key. Cognee uses it for the OpenRouter LLM and, by default, for embeddings too. |
| `LLM_ENDPOINT` | cognee-api | https://openrouter.ai/api/v1 | OpenRouter OpenAI-compatible API base URL for chat/completions |
| `LLM_PROVIDER` | cognee-api | custom | Cognee LLM provider for OpenRouter's OpenAI-compatible API |
| `VECTOR_DB_URL` | cognee-api | - | Connection URL for pgvector-backed vector storage |
| `VECTOR_DB_HOST` | cognee-api | - | Private Railway hostname for the pgvector connection |
| `VECTOR_DB_NAME` | cognee-api | - | Postgres database for pgvector storage. Same database as DB_NAME. |
| `VECTOR_DB_PORT` | cognee-api | - | Port for the pgvector connection |
| `EMBEDDING_MODEL` | cognee-api | openrouter/openai/text-embedding-3-large | OpenRouter embedding model. 3072 dimensions. Changing it later invalidates stored vectors. |
| `EMBEDDING_API_KEY` | cognee-api | (secret) | OpenRouter key for embeddings. Defaults to your LLM key; override only if you use a separate key. |
| `EMBEDDING_ENDPOINT` | cognee-api | https://openrouter.ai/api/v1 | OpenRouter OpenAI-compatible API base URL for embeddings |
| `EMBEDDING_PROVIDER` | cognee-api | litellm | Embedding provider for semantic indexing |
| `GRAPH_DATABASE_URL` | cognee-api | - | Postgres connection string for graph persistence in single-user mode |
| `VECTOR_DB_PASSWORD` | cognee-api | (secret) | Password for the pgvector connection |
| `VECTOR_DB_PROVIDER` | cognee-api | pgvector | Vector database provider |
| `VECTOR_DB_USERNAME` | cognee-api | (secret) | Username for the pgvector connection |
| `GRAPH_DATABASE_HOST` | cognee-api | - | Private Railway hostname for the graph Postgres connection |
| `GRAPH_DATABASE_NAME` | cognee-api | - | Postgres database for graph storage. Same database as DB_NAME. |
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

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/cognee-ai-memory-p-1)
