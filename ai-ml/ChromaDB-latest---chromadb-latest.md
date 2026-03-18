# Deploy ChromaDB (latest) on Railway

vector, full-text, regex, and metadata search.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chromadb-latest)

## About

ChromaDB is an open-source vector database designed specifically for AI applications. It excels at storing and querying unstructured data by converting it into high-dimensional embeddings. This allows developers to implement semantic search, long-term memory for LLMs, and Retrieval-Augmented Generation (RAG) with a simple, developer-friendly API.

Hosting ChromaDB involves setting up a server instance that runs the Chroma service, typically via a Docker container. Unlike a local ephemeral database, a hosted deployment ensures that your vector embeddings are persistent and accessible over the network via an HTTP API. On a platform like Railway, this process involves deploying the official Chroma image, configuring a persistent volume to store the underlying database files, and setting up environment variables for security. By containerizing Chroma, you ensure that the database environment remains consistent across development and production, allowing for seamless integration with AI agents or full-stack web applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ChromaDB | `chromadb/chroma:latest` | Database |
| chromadb-proxy | [bon5co/chromadb-railway-template](https://github.com/bon5co/chromadb-railway-template) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | ChromaDB | 8000 |
| `IS_PERSISTENT` | ChromaDB | True |
| `CHROMA_WORKERS` | ChromaDB | 8 |
| `CHROMA_HOST_ADDR` | ChromaDB | :: |
| `CHROMA_TIMEOUT_KEEP_ALIVE` | ChromaDB | 30 |
| `CHROMA_RAILWAY_PRIVATE_DOMAIN` | chromadb-proxy | chromadb |

## Configuration

- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/chromadb-latest)
