# Deploy Typesense vs Pinecone on Railway

Typesense vector search instead of Pinecone

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-vs-pinecone)

## About

Typesense vs Pinecone is a self-hosted deployment of the Typesense open-source search engine, positioned as a hybrid keyword + vector search alternative to Pinecone's managed vector database. Typesense is GPL-3.0 licensed, in-memory, and combines full-text keyword search with built-in vector similarity search in a single Docker container.

This Railway template deploys the official `typesense/typesense:30.2` Docker image with a persistent `/data` volume, an API key environment variable, and CORS enabled. The container starts with `--data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors`, so index data survives restarts, the API is protected, and frontend clients can query directly.

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

[View on Railway →](https://railway.com/deploy/typesense-vs-pinecone)
