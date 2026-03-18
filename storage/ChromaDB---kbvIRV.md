# Deploy ChromaDB on Railway

The AI-native embedding database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/kbvIRV)

## About

ChromaDB is the AI-native open-source embedding database that makes it easy to build AI applications with embeddings. ChromaDB is designed to be easy, fast and effecient and is optimized for managing high-dimensional vector data with built-in distance functions and metadata filtering.

Hosting ChromaDB provides you with a powerful embedding database which is capable of handling vector-data, similarity searches and metadata filtering at scale. ChromaDB excels at semantic search, similarity matching and retrieval-agumented generation (RAG) workflows.

ChromaDB deployments on Railway benefit from scalable CPU, RAM and storage while supporting enterprise-grade network security through built-in token authentication and Railway's secure private network features. Railway provides automated deployment and comprehensive logging to support your AI application operations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Chroma | `chromadb/chroma:1.4.0` | Database |
| Auth Proxy | [FraglyG/CaddyAuthProxy](https://github.com/FraglyG/CaddyAuthProxy) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Chroma | 8000 | - |
| `IS_PERSISTENT` | Chroma | True | - |
| `CHROMA_WORKERS` | Chroma | 1 | - |
| `CHROMA_HOST_ADDR` | Chroma | :: | - |
| `CHROMA_TIMEOUT_KEEP_ALIVE` | Chroma | 30 | - |
| `PORT` | Auth Proxy | 80 | - |
| `API_KEY` | Auth Proxy | (secret) | The Bearer token to use in Authorization header |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/kbvIRV)
