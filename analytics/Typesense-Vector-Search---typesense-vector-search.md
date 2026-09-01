# Deploy Typesense Vector Search on Railway

built-in vector search on Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-vector-search)

## About

This listing hosts Typesense with built-in vector search: official typesense/typesense:30.2 on port 8108, a /data volume, TYPESENSE_API_KEY, and --enable-cors.

Typesense is an open-source, typo-tolerant search engine with native vector search in the 30.x release. On Railway, deploy the official `typesense/typesense:30.2` image, expose API port 8108, and persist all indexes and vectors to a mounted `/data` volume. Typesense is GPL-3.0 licensed, so you are never locked into a SaaS contract.

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

[View on Railway →](https://railway.com/deploy/typesense-vector-search)
