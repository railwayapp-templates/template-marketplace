# Deploy AutoMem - AI Memory Service on Railway

Graph-vector memory service for AI assistants: https://automem.ai/

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/automem-ai-memory-service)

## About

# Deploy AutoMem - AI Memory Service on Railway

AutoMem is a graph-vector hybrid memory service that gives AI agents persistent, human-like long-term memory. It combines FalkorDB (graph) and Qdrant (vector) for sub-second hybrid recall with semantic search, temporal awareness, and 11 typed relationship edges. 

Neuroscience-inspired consolidation cycles automatically strengthen important memories and fade noise — like human sleep. Built on principles from HippoRAG 2, A-MEM, MELODI, and ReadAgent research.

## About Deploying AutoMem

This template deploys four services with one click:

- **memory-service** — Core AutoMem Flask API with background enrichment workers for entity extraction, pattern detection, and relationship building
- **falkordb** — Redis-compatible graph database with persistent volume for durable storage
- **qdrant** — Vector database for semantic search and similarity detection
- **mcp-sse-server** — Remote MCP bridge (Streamable HTTP + SSE) that connects cloud AI platforms like ChatGPT, Claude.ai, and ElevenLabs to your memories over HTTPS

After deployment, connect your local AI tools (Cursor, Claude Desktop, Claude Code) via the official MCP bridge package (`@verygoodplugins/mcp-automem`). The API handles concurrent writes with automatic retry logic, graceful degradation, and health monitoring endpoints. Typical cost: ~$0.50-1/month on Railway.

## Common Use Cases

- **Cross-Platform AI Memory** — Give ChatGPT, Claude, Cursor, Claude Code, Warp Terminal, OpenAI Codex, and GitHub Copilot a shared memory that persists across sessions and tools
- **Context-Aware Development** — IDEs and coding agents that recall architectural decisions, bug patterns, debugging history, and team conventions
- **Knowledge Graph Construction** — Automatically build interconnected knowledge bases from unstructured text with entity extraction, typed relationships, and clustering
- **Research & Documentation** — Organize knowledge with Zettelkasten-inspired principles, automatic pattern detection, and temporal relationships

## Dependencies

- **FalkorDB** (included in template) — Graph database for canonical memory storage, relationships, and consolidation
- **Qdrant** (included in template) — Vector database for semantic search and similarity detection
- **Embedding Provider** — Voyage AI is the default (API key required). Also supports OpenAI, FastEmbed (local, no API key), and a placeholder fallback for testing

### Resources

- [AutoMem GitHub Repository](https://github.com/verygoodplugins/automem) — Source code and deployment configs
- [MCP Bridge Package](https://www.npmjs.com/package/@verygoodplugins/mcp-automem) — Official MCP integration for Claude Desktop, Cursor, Claude Code, Warp, OpenAI Codex, and more
- [Documentation](https://automem.ai/docs) — Setup guides and API reference
- [Discord](https://automem.ai/discord) — Community chat and support
- [automem.ai](https://automem.ai) — Official website

## Why Deploy AutoMem on Railway?

Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it. By deploying AutoMem on Railway, you get a production-ready memory service with persistent storage, private networking between services, and HTTPS endpoints for cloud AI platforms — all for under $1/month.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| qdrant | `qdrant/qdrant` | Worker |
| memory-service | [verygoodplugins/automem](https://github.com/verygoodplugins/automem) | Web service |
| falkordb | `falkordb/falkordb:latest` | Web service |
| mcp-sse-server | [verygoodplugins/automem](https://github.com/verygoodplugins/automem) (root: /mcp-sse-server) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | qdrant | 6333 | Qdrant HTTP API port. |
| `QDRANT__SERVICE__HOST` | qdrant | :: | Required on Railway. Enables dual-stack IPv6/IPv4 binding for internal networking. |
| `PORT` | memory-service | 8001 | API port. Required so internal services like mcp-sse-server can connect reliably. |
| `QDRANT_URL` | memory-service | - | Optional override for Qdrant Cloud. Leave blank to use the in-project qdrant service instead. |
| `QDRANT_HOST` | memory-service | - | Internal hostname for the in-project Qdrant service. |
| `QDRANT_PORT` | memory-service | 6333 | Qdrant port for internal networking. |
| `VECTOR_SIZE` | memory-service | 1024 | Default embedding dimension. Matches voyage-4 and the current recommended default. |
| `VOYAGE_MODEL` | memory-service | voyage-4 | Voyage embedding model. voyage-4 with VECTOR_SIZE=1024 is the current recommended default. |
| `FALKORDB_HOST` | memory-service | - | Internal hostname for the FalkorDB service. |
| `FALKORDB_PORT` | memory-service | 6379 | FalkorDB port. |
| `FALKORDB_GRAPH` | memory-service | memories | Graph name used for memory storage. |
| `OPENAI_API_KEY` | memory-service | (secret) | Optional OpenAI key for embeddings and classification. Required unless you use Voyage or another provider. |
| `QDRANT_API_KEY` | memory-service | (secret) | Optional Qdrant API key. Only needed for Qdrant Cloud or protected external Qdrant. |
| `VOYAGE_API_KEY` | memory-service | (secret) | Optional Voyage API key. If set, EMBEDDING_PROVIDER=auto will prefer Voyage. |
| `ADMIN_API_TOKEN` | memory-service | (secret) | Admin token for /enrichment and /admin endpoints. |
| `EMBEDDING_MODEL` | memory-service | text-embedding-3-small | OpenAI embedding model used when OpenAI is selected. Use text-embedding-3-large for 3072d. |
| `OPENAI_BASE_URL` | memory-service | - | Optional custom OpenAI-compatible endpoint (OpenRouter, LiteLLM, vLLM, Azure, etc.). |
| `GRAPH_VIEWER_URL` | memory-service | - | Optional standalone graph-viewer URL. Leave blank unless you deploy the public viewer service (https://github.com/verygoodplugins/automem-graph-viewer). |
| `AUTOMEM_API_TOKEN` | memory-service | (secret) | API token for memory operations. Use in MCP clients and direct API calls. |
| `FALKORDB_PASSWORD` | memory-service | (secret) | Password pulled from the FalkorDB service. |
| `QDRANT_COLLECTION` | memory-service | memories | Qdrant collection name for embeddings. |
| `EMBEDDING_PROVIDER` | memory-service | auto | Default provider strategy. Prefers Voyage if VOYAGE_API_KEY is set, then OpenAI, then local fallbacks. |
| `ENABLE_GRAPH_VIEWER` | memory-service | true | Keep /viewer compatibility routes enabled on the API. |
| `CLASSIFICATION_MODEL` | memory-service | gpt-5.4-mini | Default classification model for memory typing. Cheap and aligned with current code defaults. |
| `VECTOR_SIZE_AUTODETECT` | memory-service | true | Safely adopt an existing Qdrant collection dimension instead of failing on mismatch. |
| `VIEWER_ALLOWED_ORIGINS` | memory-service | - | Optional comma-separated CORS allowlist for the standalone graph-viewer. |
| `PORT` | falkordb | 6379 | Service port exposed by Railway for FalkorDB. |
| `REDIS_ARGS` | falkordb | --save 60 1 --appendonly yes --appendfsync everysec | Persistence settings: snapshot + append-only log. |
| `FALKOR_PORT` | falkordb | 6379 | FalkorDB Redis protocol port. |
| `FALKOR_PASSWORD` | falkordb | (secret) | Auto-generated password for FalkorDB access. |
| `FALKOR_USERNAME` | falkordb | (secret) | Default FalkorDB username. |
| `PORT` | mcp-sse-server | 8080 | MCP bridge port. |
| `AUTOMEM_API_URL` | mcp-sse-server | - | Internal URL for the AutoMem API service. |
| `AUTOMEM_API_TOKEN` | mcp-sse-server | (secret) | Reuse the main API token from memory-service. |
| `HEALTH_TIMEOUT_MS` | mcp-sse-server | 5000 | Timeout for health probes against the AutoMem API. |
| `UPSTREAM_TIMEOUT_MS` | mcp-sse-server | 15000 | Timeout for upstream AutoMem API calls. |
| `UPSTREAM_MAX_RETRIES` | mcp-sse-server | 2 | Retry count for transient upstream failures. |
| `HEALTH_PROBE_INTERVAL_MS` | mcp-sse-server | 30000 | Background health probe interval in milliseconds. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/falkordb/data`

**Category:** AI/ML · **Languages:** Python, JavaScript, Shell, Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/automem-ai-memory-service)
