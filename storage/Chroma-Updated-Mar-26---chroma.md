# Deploy Chroma [Updated Mar ’26] on Railway

Chroma [Mar ’26] (Store, Search & Manage AI Embeddings Fast) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chroma)

## About

Chroma is an open-source **AI-native vector database** that helps developers store, manage, and query embeddings for machine learning and AI applications. It is the backbone of retrieval-augmented generation (RAG) systems, semantic search, recommendation engines, and knowledge bases.

When you **self-host Chroma** on Railway, you maintain full ownership and control over your embeddings and data. This is especially beneficial for teams building AI systems that require **data privacy, security, and performance optimization**.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chroma-core/chroma | `chromadb/chroma:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CHROMA_HOST` | 0.0.0.0 | - |
| `CHROMA_PORT` | 8000 | - |
| `OPENAI_API_KEY` | (secret) | your-openai-api-key-here |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/index_data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/chroma)
