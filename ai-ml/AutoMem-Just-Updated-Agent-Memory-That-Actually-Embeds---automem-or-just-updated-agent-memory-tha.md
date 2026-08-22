# Deploy AutoMem | (Just Updated) Agent Memory That Actually Embeds on Railway

Agent memory that really embeds: model baked in, graph password enforced

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/automem-or-just-updated-agent-memory-tha)

## About

AutoMem is a self-hosted memory service for AI coding agents — Claude Code, Codex CLI, Cursor,
Cline. It stores what your agents learn as a knowledge graph (FalkorDB) plus a vector index
(Qdrant), and serves recall over a REST API and an MCP bridge, so an agent can remember decisions,
preferences and project facts across sessions and across tools.

This template runs four services: the AutoMem API, the FalkorDB graph store on a volume, Qdrant on
a volume, and the MCP bridge your agent connects to. Two things about a hosted AutoMem are easy to
get wrong, and this packaging fixes both.

**Embeddings.** With no hosted embedding key, AutoMem falls back to a local model —
`BAAI/bge-large-en-v1.5`, about 1.2 GB — which the stock image downloads at container start into a
path that is not on a volume, so the download repeats on every deploy. If that download fails,
AutoMem's provider chain falls through one more step to a placeholder provider that returns
`random.Random(sha256(text))` vectors: stores succeed, recalls succeed, `/health` reports
`healthy`, and the results are noise. This image bakes the model in at build time (outside any
mount, so the volume cannot hide it) and pins the provider to the local model, which raises rather
than degrading silently. Boot measured 3.9 seconds to "ready" instead of ~35 seconds of download.

**Graph authentication.** The FalkorDB image does not read `FALKOR_PASSWORD`; only `REDIS_ARGS`
reaches `redis-server`. A template that generates a password and passes it to the API still boots
a graph database that logs "Redis does not require authentication" and answers any client that can
reach it. This image appends `--requirepass` itself and refuses to boot without a password. It
also disables the bundled Next.js graph browser, which upstream starts by default.

Everything is pinned — AutoMem 0.16.1, FalkorDB v4.20.4, Qdrant v1.19.0 — and the deploy form asks
for nothing: tokens and the graph password are generated per deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| qdrant | `qdrant/qdrant:v1.19.0` | Database |
| falkordb | `ghcr.io/bon5co/automem-railway-falkordb:v4.20.4` | Database |
| mcp-automem | `ghcr.io/verygoodplugins/mcp-automem:0.16.1` | Web service |
| automem | `ghcr.io/bon5co/automem-railway:0.16.1` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `FALKOR_PASSWORD` | falkordb | (secret) |
| `AUTOMEM_API_TOKEN` | mcp-automem | (secret) |
| `ADMIN_API_TOKEN` | automem | (secret) |
| `AUTOMEM_API_TOKEN` | automem | (secret) |
| `FALKORDB_PASSWORD` | automem | (secret) |

## Configuration

- **Volume:** `/qdrant/storage`
- **Volume:** `/var/lib/falkordb/data`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/automem-or-just-updated-agent-memory-tha)
