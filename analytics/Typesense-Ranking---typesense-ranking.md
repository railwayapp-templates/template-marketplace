# Deploy Typesense Ranking on Railway

ranking, weights, and sort_by

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-ranking)

## About

A search box where the first result decides whether someone stays or bounces. That’s ranking’s job. Typesense gives you Algolia-grade relevance controls—field weights, `sort_by`, pinned hits, overrides—under GPL-3.0, and Railway runs the official image on a persistent volume with CORS ready. You pay for compute and storage, not per-search invoices.

Typesense is a GPL-3.0 open-source search engine built for instant, typo-tolerant search. The ranking features are first-class: field weights, explicit sorting, pinned documents, and query overrides. The official image `typesense/typesense:30.2` is self-contained—no sidecars, no database. Railway lets you deploy that image with a volume at `/data`, an API key env var, and a health endpoint on `8108/health`. Add `--enable-cors` for browser clients.

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

[View on Railway →](https://railway.com/deploy/typesense-ranking)
