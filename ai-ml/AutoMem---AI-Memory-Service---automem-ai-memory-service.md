# Deploy AutoMem - AI Memory Service on Railway

Graph-vector memory service for AI assistants: https://automem.ai/

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/automem-ai-memory-service)

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
| AutoMem | [verygoodplugins/automem](https://github.com/verygoodplugins/automem) | Web service |
| FalkorDB | `falkordb/falkordb:latest` | Web service |
| SSE Service | [verygoodplugins/automem](https://github.com/verygoodplugins/automem) (root: /mcp-sse-server) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | AutoMem | 8001 | API port (required for SSE Service to connect) |
| `QDRANT_URL` | AutoMem | - | Qdrant Cloud URL. Get free tier at cloud.qdrant.io |
| `VECTOR_SIZE` | AutoMem | 3072 | Must match embedding model: 3072 for large, 768 for small |
| `FALKORDB_HOST` | AutoMem | - | Internal hostname for FalkorDB service |
| `FALKORDB_PORT` | AutoMem | 6379 | FalkorDB port |
| `FALKORDB_GRAPH` | AutoMem | memories | Graph name for storing memories |
| `OPENAI_API_KEY` | AutoMem | (secret) | Required for embeddings and classification. Get from platform.openai.com |
| `QDRANT_API_KEY` | AutoMem | (secret) | Qdrant API key from your cluster dashboard |
| `ADMIN_API_TOKEN` | AutoMem | (secret) | Admin token for /enrichment and /admin endpoints |
| `EMBEDDING_MODEL` | AutoMem | text-embedding-3-large | OpenAI embedding model. Use text-embedding-3-small for lower cost. |
| `AUTOMEM_API_TOKEN` | AutoMem | (secret) | API token for memory operations. Use in your MCP clients. |
| `FALKORDB_PASSWORD` | AutoMem | (secret) | Password from FalkorDB service |
| `CLASSIFICATION_MODEL` | AutoMem | gpt-5.2 | LLM for memory classification. Use gpt-4.1-mini to reduce costs. |
| `REDIS_ARGS` | FalkorDB | --save 60 1 --appendonly yes --appendfsync everysec | Persist data to disk every 60s and on every write |
| `FALKOR_PORT` | FalkorDB | 6379 | FalkorDB port (Redis protocol) |
| `FALKOR_PASSWORD` | FalkorDB | (secret) | Auto-generated password for FalkorDB access |
| `PORT` | SSE Service | 8080 | SSE server port |
| `AUTOMEM_ENDPOINT` | SSE Service | - | Internal URL to AutoMem API |
| `AUTOMEM_API_TOKEN` | SSE Service | (secret) | API token from AutoMem service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/falkordb/data`

**Category:** AI/ML · **Languages:** Python, JavaScript, Shell, Makefile, Dockerfile

[View on Railway →](https://railway.com/template/automem-ai-memory-service)
