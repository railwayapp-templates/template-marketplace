# Deploy ChromaDB 0.6.3 on Railway

The AI-native embedding database (Legacy)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chromadb-063)

## About

ChromaDB is the AI-native open-source embedding database that makes it easy to build AI applications with embeddings. ChromaDB is designed to be easy, fast and effecient and is optimized for managing high-dimensional vector data with built-in distance functions and metadata filtering.

Hosting ChromaDB provides you with a powerful embedding database which is capable of handling vector-data, similarity searches and metadata filtering at scale. ChromaDB excels at semantic search, similarity matching and retrieval-agumented generation (RAG) workflows.

ChromaDB deployments on Railway benefit from scalable CPU, RAM and storage while supporting enterprise-grade network security through built-in token authentication and Railway's secure private network features. Railway provides automated deployment and comprehensive logging to support your AI application operations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Chroma | `ghcr.io/chroma-core/chroma:0.6.3` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | - |
| `IS_PERSISTENT` | True | - |
| `CHROMA_WORKERS` | 1 | - |
| `CHROMA_HOST_ADDR` | 0.0.0.0 | `0.0.0.0` for public network and `::` for private network |
| `ANONYMIZED_TELEMETRY` | False | - |
| `CHROMA_TIMEOUT_KEEP_ALIVE` | 30 | - |
| `CHROMA_SERVER_AUTHN_PROVIDER` | chromadb.auth.token_authn.TokenAuthenticationServerProvider | Chroma authentication provider |
| `CHROMA_SERVER_AUTHN_CREDENTIALS` | (secret) | Your chroma authentication token |
| `CHROMA_AUTH_TOKEN_TRANSPORT_HEADER` | (secret) | Custom header for Chroma Token, Authorization is default |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/chroma/chroma`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/chromadb-063)
