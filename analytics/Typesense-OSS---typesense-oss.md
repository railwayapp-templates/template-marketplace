# Deploy Typesense OSS on Railway

Typesense (Open-Source Instant Search Engine & Algolia Alternative)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-oss)

## About

Typesense is an open-source search engine written in C++ that returns results in milliseconds and tolerates typos out of the box. It keeps the index in memory, ships a clean REST API, and covers keyword, vector, hybrid, faceted, and geo search in one binary. This template runs the official `typesense/typesense` Docker image so you can self host Typesense as an Algolia alternative.

Self hosting Typesense keeps your documents, queries, and API keys on infrastructure you own, with no per-search billing and no record ceiling. It is one process with one data directory, so there is no JVM to tune and no cluster coordinator to babysit. On Railway the image pull, TLS, domain, healthcheck, restarts, and a persistent volume for `/data` are handled for you.

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

[View on Railway →](https://railway.com/deploy/typesense-oss)
