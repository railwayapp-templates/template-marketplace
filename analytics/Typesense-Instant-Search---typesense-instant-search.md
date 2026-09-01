# Deploy Typesense Instant Search on Railway

as-you-type instant search with Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-instant-search)

## About

Typesense is an open-source, typo-tolerant search engine built for as-you-type instant search. Paired with InstantSearch.js, it delivers sub-50ms results and is a strong Algolia alternative. This guide covers Railway deployment, self-hosting, pricing, and comparisons.

Typesense Instant Search combines the GPL-3.0 Typesense server with an InstantSearch.js frontend. Railway runs the official `typesense/typesense:30.2` Docker image on port 8108 with a persistent volume. You control data, latency, and cost without vendor lock-in.

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

[View on Railway →](https://railway.com/deploy/typesense-instant-search)
