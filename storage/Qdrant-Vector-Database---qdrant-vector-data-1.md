# Deploy Qdrant Vector Database on Railway

Qdrant v1.18.3 vector database for RAG, API key auth, volume storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qdrant-vector-data-1)

## About

Qdrant is an open-source, high-performance vector database written in Rust for similarity search and retrieval-augmented generation (RAG). Store embeddings, filter on payloads, and run sub-millisecond nearest-neighbor search behind a REST + gRPC API — a self-hosted alternative to Pinecone and Weaviate.

This template runs the official `qdrant/qdrant` image wired for Railway. Qdrant serves its REST API on port 6333 and gRPC on 6334; the template sets `PORT=6333` so Railway's proxy targets the REST port and exposes it over HTTPS. Collections and the vector index live on an attached volume at `/qdrant/storage`, so your data survives redeploys. Every data route is protected by the `QDRANT__SERVICE__API_KEY` bearer token auto-generated at deploy — only `/healthz`, `/livez`, and `/readyz` stay open so Railway can healthcheck the service. A built-in web dashboard is available at `/dashboard`. Qdrant is memory-resident: RAM and disk scale with the number and dimensionality of your vectors, so size the service to your dataset.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| qdrant | `qdrant/qdrant:v1.18.3` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `QDRANT__SERVICE__API_KEY` | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/qdrant/storage`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/qdrant-vector-data-1)
