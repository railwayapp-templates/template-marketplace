# Deploy Self-Hosted Search on Railway

self-hosted instant search engine

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/self-hosted-search)

## About

Under the hood this is Typesense pinned to typesense/typesense:30.2 — the official Docker image, never "latest." It listens on 8108, keeps its index on a volume at /data, and expects one secret: TYPESENSE_API_KEY. Size RAM to your dataset and you have an in-memory, typo-tolerant search engine a browser can hit directly, CORS enabled.

Typesense is the GPL-3.0 open-source search engine behind a lot of "I typed three letters and it just knew" moments. This template runs the official image with the flags that matter: --data-dir /data so the index lands on a persistent volume, --api-key=$TYPESENSE_API_KEY so the node refuses anonymous writes, and --enable-cors so InstantSearch in the browser can reach it without a proxy shim. That last flag trips up plenty of first deployments — CORS errors in the console while the server is actually healthy on 8108.

The tradeoff: Typesense is in-memory. Every document lives in RAM, with snapshots written to /data on the volume. Queries feel instant, but RAM is your real budget, not disk. A 1 GB index wants roughly 1 GB of RAM plus headroom. On Railway you can start small and scale vertically as the catalog grows.

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

[View on Railway →](https://railway.com/deploy/self-hosted-search)
