# Deploy Qdrant (VectorDB) on Railway

Qdrant vector database with persistent storage for AI/RAG

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qdrant-vectordb)

## About

Qdrant is an open-source, high-performance vector search engine and database written in Rust. It stores embeddings with their JSON payloads and serves fast, filterable similarity search over REST and gRPC APIs, making it the retrieval backbone for RAG pipelines, semantic search, recommendations, and AI agent memory.

Hosting Qdrant means running a stateful database that keeps your vector collections, HNSW indexes, and payloads on persistent disk. Self-managing it normally involves provisioning storage, exposing the HTTP and dashboard port, enabling API key authentication, and tuning memory for your embedding dimensions and collection size. This template wraps the official `qdrant/qdrant` Docker image so it runs cleanly on Railway: it binds Qdrant's HTTP service to the platform port, mounts a persistent volume at `/qdrant/storage` so data survives redeploys and restarts, exposes the `/healthz` endpoint for health checks, and auto-generates an optional API key. Qdrant is self-contained, so no external database or cache is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Qdrant | `qdrant/qdrant:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 6333 | Port Railway's healthcheck and edge proxy probe. Must equal QDRANT__SERVICE__HTTP_PORT, or the healthcheck fails with 'service unavailable'. |
| `QDRANT__SERVICE__HOST` | :: | Bind address. '::' binds IPv6 (dual-stack) so Railway's healthcheck and private networking can reach Qdrant; the default 0.0.0.0 is IPv4-only and fails the healthcheck. |
| `QDRANT__SERVICE__API_KEY` | (secret) | API key for authenticated access; leave blank to disable auth |
| `QDRANT__SERVICE__HTTP_PORT` | 6333 | HTTP REST + dashboard port; must match the public domain target port |
| `QDRANT__STORAGE__STORAGE_PATH` | /qdrant/storage | Persistent storage directory for collections and indexes |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/qdrant/storage`

**Category:** Other

[View on Railway →](https://railway.com/deploy/qdrant-vectordb)
