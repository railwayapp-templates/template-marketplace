# Deploy Typesense Embeddings on Railway

store and query embeddings in Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-embeddings)

## About

Deploy Typesense on Railway to store and query embeddings alongside keyword search — hybrid retrieval for RAG, semantic product search, and recommendations without a separate vector database.

Typesense Embeddings is a self-hosted, open-source instant search engine that stores and queries vector embeddings alongside keyword indexes. Built on the Typesense core (GPL-3.0), it enables hybrid retrieval: exact keyword matching combined with semantic vector similarity in one lightweight binary. Railway provides a managed container platform where you can deploy the official `typesense/typesense:30.2` Docker image, attach a persistent volume for `/data`, and expose the API on port `8108`. No separate vector database is required—Typesense Embeddings handles both inverted indexes and HNSW vector graphs in one process, ideal for RAG pipelines, semantic product search, and AI-powered autocomplete.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typesense-railway | [Shinyduo/typesense-railway](https://github.com/Shinyduo/typesense-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | PORT |
| `TYPESENSE_URL` | - | TYPESENSE_URL |
| `TYPESENSE_API_KEY` | (secret) | TYPESENSE_API_KEY |
| `TYPESENSE_DATA_DIR` | - | TYPESENSE_DATA_DIR |
| `TYPESENSE_PUBLIC_URL` | - | TYPESENSE_PUBLIC_URL |
| `TYPESENSE_THREAD_POOL_SIZE` | 64 | TYPESENSE_THREAD_POOL_SIZE |
| `TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD` | 32 | TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/typesense-embeddings)
