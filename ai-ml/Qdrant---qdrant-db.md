# Deploy Qdrant on Railway

Vector database for AI search, embeddings, RAG, and semantic retrieval.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qdrant-db)

## About

Qdrant is a high-performance vector database built for semantic search, embeddings, recommendation systems, Retrieval-Augmented Generation (RAG), and other AI workloads. It provides REST and gRPC APIs, persistent vector storage, filtering, authentication controls, and a built-in Web Dashboard for managing collections and exploring data.

Hosting Qdrant on Railway gives you a self-hosted vector database that can run alongside AI agents, backend services, embedding pipelines, and RAG applications.

This template uses the official Qdrant Docker image and stores vector data in persistent Railway storage. The REST API and Web Dashboard are available through port `6333`, while gRPC is available on port `6334` for applications that prefer a higher-performance protocol.

The template also enables API-key authentication by default, including separate administrator and read-only credentials. Qdrant supports JWT-based granular access control when more advanced collection-level permissions are required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| qdrant/qdrant:latest | `qdrant/qdrant:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 6333 | REST API and Web Dashboard port used by Qdrant |
| `QDRANT__LOG_LEVEL` | INFO | Application log level |
| `QDRANT__SERVICE__API_KEY` | (secret) | Admin API key required for authenticated requests |
| `QDRANT__SERVICE__JWT_RBAC` | false | Enable JWT-based granular access control |
| `QDRANT__SERVICE__GRPC_PORT` | 6334 | gRPC API port |
| `QDRANT__SERVICE__HTTP_PORT` | 6333 | HTTP REST API port |
| `QDRANT__SERVICE__READ_ONLY_API_KEY` | (secret) | Read-only API key for limited access |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/qdrant/storage`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/qdrant-db)
