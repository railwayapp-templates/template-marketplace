# Deploy Typesense Semantic Search on Railway

semantic + keyword hybrid search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-semantic-search)

## About

Deploy Typesense on Railway for semantic + keyword hybrid search — query by meaning and text in one collection without a separate vector DB bill.

Typesense Semantic Search is a self-hosted, open-source instant search engine that combines keyword matching with vector-based semantic retrieval. Built on the Typesense engine (GPL-3.0), it delivers hybrid search: exact keyword hits plus meaning-aware results from embeddings. Railway provides a managed container platform where you can deploy the official `typesense/typesense:30.2` Docker image with a persistent volume, environment variables, and automatic health checks. This template is designed for developers who need fast, typo-tolerant, and semantically relevant search without relying on a SaaS vendor. You control the data, the API key, and the infrastructure. Railway handles the orchestration, scaling, and networking, so you can focus on building search experiences.

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

[View on Railway →](https://railway.com/deploy/typesense-semantic-search)
