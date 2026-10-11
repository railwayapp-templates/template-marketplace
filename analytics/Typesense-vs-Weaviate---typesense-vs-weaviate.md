# Deploy Typesense vs Weaviate on Railway

hybrid search without a vector-only stack

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-vs-weaviate)

## About

The first time a user types "cotton socks black" and gets zero results, you learn vector similarity alone doesn't save you. Embeddings capture meaning, but not that "socks" and "sock" are the same SKU, or that "blk" is a daily typo.

Typesense is GPL-3.0, RAM-resident, typo-tolerant, faceted, and vector-aware. Weaviate is BSD-3-Clause, vector-native, GraphQL. In production, Typesense treats exact, fuzzy, filtered, and vector results as one query. Weaviate wants a reranker in front.

Self-hosting Typesense is the quiet alternative to Algolia's per-request billing. GPL-3.0; running the official image is fine, modifying and redistributing means share changes.

On Railway, deploy one service with a persistent volume. No sidecar, reranker, or separate vector DB plus search engine plus proxy. Typesense holds inverted index, vector index, and HTTP API in one process. That's the template's pitch: hybrid search without hybrid infrastructure.

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

[View on Railway →](https://railway.com/deploy/typesense-vs-weaviate)
