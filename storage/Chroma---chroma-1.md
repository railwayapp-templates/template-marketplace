# Deploy Chroma on Railway

Open-source vector database with persistent volume, private-only by default

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chroma-1)

## About

Chroma is the open-source, AI-native vector database. It stores embeddings alongside documents and metadata and serves fast similarity search, full-text search, and metadata filtering over a simple HTTP API with first-class Python and JavaScript clients. Chroma is the retrieval layer behind RAG pipelines, semantic search, and AI agent memory.

Hosting Chroma means running a stateful server that keeps its SQLite metadata database and HNSW index files on persistent disk. This template wraps the official `chromadb/chroma:1.5.9` image (the Rust server) so it runs cleanly on Railway: it pins the listen port to Railway's `PORT`, binds IPv6 dual-stack so your other Railway services can reach it over private networking, mounts a persistent volume at `/data` so collections survive redeploys, and uses `/api/v2/heartbeat` for health checks. Chroma 1.x has no built-in authentication, so this template ships **private-only** (no public domain): your other Railway services reach it at `chroma.railway.internal:8000`. Chroma is self-contained: no external database, cache, or GPU is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Chroma | `chromadb/chroma:1.5.9` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Port Railway's healthcheck and edge proxy probe. Must equal CHROMA_PORT, or the healthcheck fails with 'service unavailable'. |
| `CHROMA_PORT` | 8000 | Port the Chroma HTTP server listens on. Keep equal to PORT and the public domain target port (8000). |
| `CHROMA_ALLOW_RESET` | false | Set to true to enable the destructive POST /api/v2/reset endpoint. Leave false in production. Never set any CHROMA_* variable to an empty value; the server refuses to start. |
| `CHROMA_PERSIST_PATH` | /data | Directory for the SQLite metadata DB and HNSW index files. Must match the volume mount path (/data). |
| `CHROMA_LISTEN_ADDRESS` | :: | Bind address. '::' binds IPv6 dual-stack so other Railway services can reach Chroma over private networking (chroma.railway.internal). The upstream default 0.0.0.0 is IPv4-only and is unreachable from *.railway.internal. |

## Configuration

- **Healthcheck:** `/api/v2/heartbeat`
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/chroma-1)
