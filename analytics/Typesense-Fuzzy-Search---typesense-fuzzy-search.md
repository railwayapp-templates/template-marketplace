# Deploy Typesense Fuzzy Search on Railway

typo-tolerant fuzzy search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-fuzzy-search)

## About

Typesense Fuzzy Search catches “wireless headphons” and still returns the right wireless headphones. Run it as one Docker container on Railway with a persistent volume, an API key, and port 8108.

The official image `typesense/typesense:30.2` is a single binary handling indexing, query parsing, typo correction, and API serving on port 8108.

But self-hosted means you are operations. Typesense keeps the entire index in memory, so you decide RAM. You handle snapshots and backups of `/data`.

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

[View on Railway →](https://railway.com/deploy/typesense-fuzzy-search)
