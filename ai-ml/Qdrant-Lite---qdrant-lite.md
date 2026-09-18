# Deploy Qdrant Lite on Railway

Deploy Qdrant vector database with persistent storage and web dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qdrant-lite)

## About

Qdrant runs as a single container on Railway. Vector data persists on a Railway volume at `/qdrant/storage`. The server listens on port 6333 (REST API) and 6334 (gRPC API).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| qdrant-lite | `qdrant/qdrant:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 6333 | REST API port. Railway maps this to the public domain. |
| `QDRANT__LOG_LEVEL` | INFO | Logging level. Options: TRACE, DEBUG, INFO, WARN, ERROR. |
| `QDRANT__SERVICE__HOST` | 0.0.0.0 | Bind address for the Qdrant server. |
| `QDRANT__SERVICE__API_KEY` | (secret) | API key for authentication. Auto-generated 32-char secret per deployment. Sent by clients as the api-key header. |
| `QDRANT__SERVICE__GRPC_PORT` | 6334 | gRPC API port. |
| `QDRANT__SERVICE__HTTP_PORT` | 6333 | REST API port. |
| `QDRANT__STORAGE__STORAGE_PATH` | /qdrant/storage | Path to store vector data on the volume. |
| `QDRANT__STORAGE__SNAPSHOT_PATH` | /qdrant/storage/snapshots | Path to store snapshots. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/qdrant/storage`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/qdrant-lite)
