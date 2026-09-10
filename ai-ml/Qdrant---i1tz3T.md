# Deploy Qdrant on Railway

Open-source vector database for AI, RAG and semantic search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/i1tz3T)

## About

Qdrant is an open-source, high-performance vector database built for AI applications, semantic search, Retrieval-Augmented Generation (RAG), recommendation systems, and AI agents.

Hosting Qdrant on Railway provides a simple way to deploy your own self-hosted vector database without managing servers or complex infrastructure.

This template uses the official `qdrant/qdrant` Docker image with persistent storage mounted at `/qdrant/storage`.

Qdrant provides vector similarity search, filtering, payloads, REST API, gRPC, and a built-in Web UI.

This template is designed as a simple single-node deployment that can be scaled vertically as your workload grows.

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
