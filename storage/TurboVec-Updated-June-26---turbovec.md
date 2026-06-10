# Deploy TurboVec [Updated June '26] on Railway

TurboVec [June '26] (Compressed Vector Search & Embedding API) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/turbovec)

## About

TurboVec is a high-performance, open-source vector search engine written in Rust that compresses embeddings using Google Research's TurboQuant algorithm. It shrinks a 31 GB corpus of 10 million float32 documents to roughly 4 GB while searching faster than FAISS. This template wraps the TurboVec library in a REST API so you can self host it as a vector database for retrieval, RAG, and semantic search.

Self hosting TurboVec means your embeddings, indexes, and search traffic stay entirely on infrastructure you control, with no data leaving your VPC and no per-query fees. Because TurboVec ships as an embedded library rather than a server, this template adds a lightweight FastAPI HTTP layer exposing add, search, and delete endpoints. With Railway, the container build, networking, public domain, healthchecks, and a persistent volume for the index are handled automatically on each deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| turbovec | [Shinyduo/turbovec](https://github.com/Shinyduo/turbovec) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/turbovec)
