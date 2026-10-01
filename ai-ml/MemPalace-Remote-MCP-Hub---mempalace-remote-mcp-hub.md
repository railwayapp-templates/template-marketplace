# Deploy MemPalace Remote MCP Hub on Railway

Shared AI memory over MCP: token auth, local embeddings, no API keys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mempalace-remote-mcp-hub)

## About

MemPalace is an open source AI memory system. Agents file what matters into a "palace" of wings, rooms and drawers, store it verbatim, and recall it later with semantic search and a temporal knowledge graph. This template runs it as a remote MCP server so every agent and teammate shares one memory over HTTPS.

Hosting MemPalace is a single container. This template runs the official `ghcr.io/mempalace/mempalace:3.10.0` image with upstream's own network server command, `mempalace serve --host 0.0.0.0 --port 8765`, and a Railway volume at `/data` that holds the ChromaDB palace, the knowledge graph, the write ahead log and the cached embedding model. A bearer token is generated at deploy and required on every route except `/healthz`; without it the server refuses to start, so the memory store is never open to the internet. `PORT` is pinned to 8765 so the Railway healthcheck hits `/healthz`, `RAILWAY_RUN_UID=0` lets the non root image write the root owned volume, and the idle watchdog that upstream uses to reap desktop sessions is turned off so the server stays up.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MemPalace | `ghcr.io/mempalace/mempalace:3.10.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8765 | Port Railway's healthcheck and edge proxy probe. Must equal the --port in the start command (8765). |
| `ANONYMIZED_TELEMETRY` | False | Optional. ChromaDB client setting. False opts the embedded ChromaDB out of anonymous usage telemetry. MemPalace itself sends no telemetry. |
| `MEMPALACE_CONFIG_DIR` | /data/.mempalace | Config directory on the /data volume. Holds config.json, the palace (palace/), the knowledge graph, the write-ahead log and server state. HOME=/data in the image, so the embedding model cache also lands on the volume (/data/.cache). |
| `MEMPALACE_EAGER_WARMUP` | 1 | Optional. Load the embedder and index in the background after a restart so the first tool call is not slow. Does nothing on a fresh, empty palace. |
| `MEMPALACE_MCP_HTTP_TOKEN` | (secret) | Bearer token every MCP client must send as 'Authorization: Bearer <token>'. Required: the server refuses to start on a 0.0.0.0 bind without it. Only /healthz is reachable without it. Rotating it disconnects every client until they are updated. |
| `MEMPALACE_MCP_IDLE_HOURS` | 0 | 0 disables the idle watchdog. Upstream defaults to 8 hours and then exits with status 0, which an ON_FAILURE restart policy does not restart, so the server would silently stay down. Keep 0. |
| `MEMPALACE_EMBEDDING_MODEL` | minilm | Optional. Local embedding model, no API key needed. minilm (default, English, ~80 MB download on first write) or embeddinggemma (multilingual, ~300 MB). Choose before the first write: switching later needs 'mempalace repair rebuild-index'. |
| `MEMPALACE_EMBEDDING_DEVICE` | cpu | Optional. ONNX Runtime device. Railway has no GPU, so cpu skips accelerator probing. |

## Configuration

- **Start command:** `docker-entrypoint.sh serve --host 0.0.0.0 --port 8765`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/mempalace-remote-mcp-hub)
