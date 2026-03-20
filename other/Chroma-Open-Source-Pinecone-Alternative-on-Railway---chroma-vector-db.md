# Deploy Chroma | Open Source Pinecone Alternative on Railway on Railway

Self Host Chroma: AI vector database for RAG, semantic search, AI apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chroma-vector-db)

## About

Chroma is an open-source, AI-native vector database built for storing, querying, and retrieving high-dimensional embeddings — the backbone of RAG pipelines, semantic search, and LLM memory systems. It is the default vector store in LangChain tutorials, natively integrated with LlamaIndex and Haystack, and downloaded over 11 million times a month. 

Self-host Chroma on Railway with one click: the template deploys the official `chromadb/chroma` Docker image with a persistent volume pre-wired, token authentication enabled, and a public HTTPS endpoint ready to connect from any client.

Chroma gives AI applications a purpose-built retrieval layer. Unlike general-purpose databases with vector add-ons, Chroma is designed from the ground up around embedding operations — store, query, filter, and update vectors with a four-function API that works identically in development and production.

Key features:
- **Hybrid search** — combines dense vector similarity with BM25 full-text ranking and regex filtering in a single query
- **Metadata filtering** — filter collections by any structured attribute alongside semantic similarity
- **Multi-modal** — store embeddings from text, images, audio, or any model output
- **Three official SDKs** — Python, JavaScript/TypeScript; community clients for Rust, Java, PHP, Dart
- **First-class LangChain / LlamaIndex integration** — drop-in vector store for any RAG framework
- **Apache 2.0 licensed** — fully open source, no usage restrictions

On Railway, Chroma runs as a single Docker service. Embeddings are persisted to a mounted volume at `/data`, surviving restarts and redeployments without data loss.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Chroma | `chromadb/chroma:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | HTTP server listening port |
| `CHROMA_HOST` | 0.0.0.0 | Bind server to all interfaces |
| `CHROMA_SERVER_AUTHN_PROVIDER` | chromadb.auth.token_authn.TokenAuthenticationServerProvider | Authentication provider implementation class |
| `CHROMA_SERVER_AUTHN_CREDENTIALS` | (secret) | Token credentials for authentication |
| `CHROMA_SERVER_CORS_ALLOW_ORIGINS` | ["*"] | Allowed origins for CORS requests |

## Configuration

- **Healthcheck:** `/api/v2/heartbeat`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/chroma-vector-db)
