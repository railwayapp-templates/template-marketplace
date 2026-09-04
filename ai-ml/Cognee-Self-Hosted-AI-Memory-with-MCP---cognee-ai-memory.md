# Deploy Cognee — Self-Hosted AI Memory with MCP on Railway

Self-host Cognee — persistent agent memory over MCP, knowledge graph

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cognee-ai-memory)

## About

Cognee is an open-source AI memory platform that gives your AI agents persistent, long-term memory across sessions — a self-hosted knowledge-graph engine that goes beyond vector search to map relationships between your data. It ingests documents, builds a knowledge graph plus embeddings, and serves memory to agents through an API and a Model Context Protocol (MCP) server, so tools like Claude Code, Cursor, and OpenCode remember context across conversations. This template deploys the Cognee API, the MCP server in SSE mode, and managed Postgres with pgvector — pre-wired — so your agents have durable memory in minutes.

---

Cognee is a multi-service memory platform, and a couple of configuration specifics make it store durably and connect to your agents — both handled here.

**The MCP server is the standout — persistent memory for your AI tools.** Cognee ships a dedicated MCP server (`cognee/cognee-mcp`) alongside the API, exposed here in SSE mode so AI coding assistants and agents — Claude Code, Cursor, OpenCode, and other MCP clients — connect and gain memory that persists across sessions. Point your client at the MCP endpoint and your agent can store, structure, and retrieve context without bespoke integration — the reason to run Cognee as a service rather than a library.

**Set the storage providers to Postgres and pgvector — or it uses ephemeral defaults.** This is the key configuration point: Cognee defaults to local SQLite and LanceDB/kuzu stores, which aren't durable on a PaaS. This template sets `DB_PROVIDER=postgres` and `VECTOR_DB_PROVIDER=pgvector` with the connection details, so relational data and vector embeddings persist in managed PostgreSQL instead of vanishing on redeploy. This is what makes the memory durable.

**Knowledge graphs, not just vectors.** Where a vector database stops at similarity search, Cognee's Cognify pipeline extracts entities and relationships into a knowledge graph, so agents reason across connected information — following relationships between data points, not just finding nearby chunks. This graph-plus-vector approach sets Cognee apart from a plain vector store, and pgvector backs both in one database.

**Bring your own LLM and embedding keys.** Cognee is model-agnostic — set `LLM_API_KEY` (OpenRouter, OpenAI, Anthropic, Gemini, or Ollama) for the LLM that powers extraction, and optionally a separate embedding key; by default the same provider handles both. The API backend stays private on the internal network while the MCP server is public for client access, so for production set `REQUIRE_AUTHENTICATION=true` for JWT auth and restrict `CORS_ALLOWED_ORIGINS` to your domains.

Typical cost: **~$10–20/month** on Railway for the three services, plus your LLM provider usage for ingestion and processing. Cognee is open source and free to self-host.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| cognee-api | [RockinPaul/cognee_railway_template](https://github.com/RockinPaul/cognee_railway_template) | Worker |
| cognee-mcp | [RockinPaul/cognee_railway_template](https://github.com/RockinPaul/cognee_railway_template) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `HOST` | cognee-api | 0.0.0.0 | HOST |
| `DB_HOST` | cognee-api | - | DB HOST |
| `DB_NAME` | cognee-api | - | Database name used by Cognee relational storage |
| `DB_PORT` | cognee-api | - | Port for the relational Postgres connection |
| `LLM_MODEL` | cognee-api | openrouter/openai/gpt-4o-mini | Reliable default OpenRouter model for Cognify extraction, summarization, and responses. Gemma can still be used as an advanced override. |
| `DB_PASSWORD` | cognee-api | (secret) | Password for the relational Postgres connection |
| `DB_PROVIDER` | cognee-api | postgres | DB PROVIDER |
| `DB_USERNAME` | cognee-api | (secret) | DB USERNAME |
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
| `API_URL` | cognee-mcp | - | Internal Cognee backend URL used by the MCP service in API mode |
| `TRANSPORT_MODE` | cognee-mcp | sse | Cognee MCP transport for remote clients. In production API mode, SSE exposes the server at /sse. |
| `MCP_ALLOWED_HOSTS` | cognee-mcp | - | Comma-separated public hosts allowed by MCP transport security for SSE access |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Python, Shell, Dockerfile, Mako

[View on Railway →](https://railway.com/deploy/cognee-ai-memory)
