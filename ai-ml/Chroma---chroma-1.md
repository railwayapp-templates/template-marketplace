# Deploy Chroma on Railway

Chroma vector database for AI apps - embeddings, RAG & semantic search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chroma-1)

## About

Chroma runs as a single container on Railway from the official `ghcr.io/chroma-core/chroma` image (pinned to v1.5.9). Vector data persists on a Railway volume mounted at `/data` (the image's baked-in `/config.yaml` sets `persist_path: "/data"`). The server listens on port 8000 and exposes a REST API. Railway healthchecks `/api/v2/heartbeat` before routing traffic.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chroma | `ghcr.io/chroma-core/chroma:1.5.9` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | HTTP API port. The official image listens on 8000 via its baked-in /config.yaml; Railway maps the public domain to this port. |
| `IS_PERSISTENT` | TRUE | Persist the embedded database to the /data Railway volume. Keep TRUE so collections survive restarts and redeploys. |
| `ANONYMIZED_TELEMETRY` | FALSE | Disable anonymous product telemetry. |

## Configuration

- **Healthcheck:** `/api/v2/heartbeat`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/chroma-1)
