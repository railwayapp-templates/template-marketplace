# Deploy Qdrant on Railway

Open-source vector database for AI, RAG and semantic search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/i1tz3T)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Qdrant | `qdrant/qdrant:v1.19.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 6333 |
| `QDRANT__SERVICE__API_KEY` | (secret) |
| `QDRANT__SERVICE__READ_ONLY_API_KEY` | (secret) |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/qdrant/storage`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/i1tz3T)
