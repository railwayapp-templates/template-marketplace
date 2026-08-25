# Deploy Atomic on Railway

Self-host Atomic knowledge, APIs, WebSockets, and MCP with persistent data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/atomic-on-railway)

## About

Atomic is a self-hosted personal knowledge base for Markdown notes, semantic
connections, search, graph exploration, APIs, WebSockets, and MCP. This
template deploys Atomic `v1.45.0` from an immutable upstream image.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| atomic | [l4time/railway-atomic-template](https://github.com/l4time/railway-atomic-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8081 |
| `ATOMIC_SETUP_TOKEN` | (secret) |
| `ATOMIC_SQLITE_CACHE_KB` | 16000 |
| `ATOMIC_SQLITE_READ_CACHE_KB` | 2000 |
| `ATOMIC_SERVER_READ_POOL_SIZE` | 2 |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/atomic-on-railway)
