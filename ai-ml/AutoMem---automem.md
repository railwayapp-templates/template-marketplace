# Deploy AutoMem on Railway

Long-term memory for AI assistants that recalls past decisions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/automem)

## About

AutoMem is an open-source long-term memory service for AI assistants. Chat tools forget everything between sessions, and retrieval-augmented search returns documents that merely look similar to your question. AutoMem stores each memory as a graph node with typed relationships, and as an embedding in a vector database, so "why did we choose PostgreSQL?" returns the decision plus the rejected alternatives and the principle behind it. It is MIT-licensed, for teams wanting one memory shared across Claude, Cursor, ChatGPT and Copilot.

Self-host AutoMem on Railway and this template wires up the whole stack: the `automem` REST API, a `falkordb` graph database holding the canonical record, a `qdrant` vector database for semantic recall, an `automem-graph-viewer` UI, and an `mcp-automem` bridge exposing your memories to cloud AI platforms over HTTPS. Both databases stay on the private network with persistent volumes; only the API, viewer and bridge get public domains. Every secret is generated at deploy time, so you can run AutoMem on Railway without editing a single variable first.

![Diagram of the AutoMem, MCP bridge, viewer, FalkorDB and Qdrant services](https://res.cloudinary.com/rroe4rtk/image/upload/v1787220037/automem-architecture.png)

AutoMem gives an AI assistant durable, queryable context that survives the end of a conversation. Self-hosting matters here: the data is a running record of your decisions, preferences and working relationships, and running it yourself removes per-memory pricing.

Key capabilities:

- **Graph plus vector storage** — 11 authorable relationship types (`LEADS_TO`, `PREFERS_OVER`, `EXEMPLIFIES`, `CONTRADICTS` and more) alongside embeddings
- **Hybrid recall** — ranked by semantic similarity, graph traversal, recency, tags and importance
- **Multi-hop bridge discovery** — surfaces the memory connecting two results even when it shares no keywords with your query
- **Memory consolidation** — daily decay, weekly creative linking, monthly clustering
- **No API keys needed** — embeddings are generated locally by default

The Railway architecture splits along those lines. `falkordb` is the source of truth; if it is unavailable the API returns 503. `qdrant` holds one embedding per memory and powers semantic search, and if it goes down recall degrades to graph-only rather than failing. The `automem` API owns all reads and writes plus the enrichment and consolidation workers, and `automem-graph-viewer` is a static front end that calls the API from your browser.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| falkordb | `falkordb/falkordb:v4.20.3` | Database |
| qdrant | `qdrant/qdrant:v1.11.3` | Database |
| mcp-automem | `ghcr.io/verygoodplugins/mcp-automem:stable` | Web service |
| automem-graph-viewer | `ghcr.io/verygoodplugins/automem-graph-viewer:stable` | Web service |
| automem | `ghcr.io/verygoodplugins/automem:stable` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BROWSER` | falkordb | 0 | Disables bundled unauthenticated graph browser |
| `REDIS_ARGS` | falkordb | - | Auth and persistence flags |
| `FALKORDB_ARGS` | falkordb | MAX_QUEUED_QUERIES 25 TIMEOUT_DEFAULT 1000 RESULTSET_SIZE 10000 THREAD_COUNT 8 OMP_THREAD_COUNT 8 | Query limits and thread caps |
| `FALKORDB_PASSWORD` | falkordb | (secret) | Graph database password |
| `QDRANT__SERVICE__HOST` | qdrant | :: | Dual-stack bind, required for private networking |
| `QDRANT__SERVICE__API_KEY` | qdrant | (secret) | API key required on every request |
| `PORT` | mcp-automem | 8080 | HTTP port the bridge binds |
| `AUTOMEM_API_URL` | mcp-automem | - | Private API address the bridge proxies |
| `PORT` | automem-graph-viewer | 3000 | HTTP port the viewer binds |
| `PORT` | automem | 8001 | HTTP port the API binds |
| `QDRANT_HOST` | automem | - | Private vector database host |
| `QDRANT_PORT` | automem | 6333 | Vector database REST port |
| `VECTOR_SIZE` | automem | 768 | Embedding dimension, matches local model |
| `FALKORDB_HOST` | automem | - | Private graph database host |
| `FALKORDB_PORT` | automem | 6379 | Graph database port |
| `FALKORDB_GRAPH` | automem | memories | Graph name inside FalkorDB |
| `QDRANT_API_KEY` | automem | (secret) | Vector database API key |
| `ADMIN_API_TOKEN` | automem | (secret) | Extra token for admin routes |
| `GRAPH_VIEWER_URL` | automem | - | Standalone viewer public URL |
| `AUTOMEM_API_TOKEN` | automem | (secret) | Bearer token for all API routes |
| `FALKORDB_PASSWORD` | automem | (secret) | Graph database password |
| `QDRANT_COLLECTION` | automem | memories | Vector collection name |
| `AUTOMEM_MODELS_DIR` | automem | /data/models | Model cache path on the volume |
| `EMBEDDING_PROVIDER` | automem | local | Local FastEmbed model, no API key |
| `ENABLE_GRAPH_VIEWER` | automem | true | Serves the /viewer entrypoint route |
| `VIEWER_ALLOWED_ORIGINS` | automem | - | Browser origins allowed to call API |

## Configuration

- **Volume:** `/var/lib/falkordb/data`
- **Volume:** `/qdrant/storage`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/automem)
