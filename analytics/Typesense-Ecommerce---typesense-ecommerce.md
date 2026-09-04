# Deploy Typesense Ecommerce on Railway

product search, facets, and merchandising

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-ecommerce)

## About

Typesense Ecommerce is a self-hosted, typo-tolerant product search stack you can deploy on Railway in one click. It runs the official Typesense Docker image with a persistent volume, so catalog search, facets, synonyms, and merchandising rules all live on infrastructure you own with no per-search billing.

Typesense Ecommerce is a self-hosted product search layer built on the Typesense open-source instant search engine. It provides typo-tolerant catalog search, faceted navigation, synonyms, and merchandising controls (pinned results, overrides). Typesense is GPL-3.0 licensed, so the entire stack runs in your infrastructure with no per-search or record-based billing.

On Railway, the template deploys the official `typesense/typesense:30.2` Docker image with a persistent volume at `/data`. The container listens on API port 8108 and starts with `--data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors`. The `TYPESENSE_API_KEY` is mandatory and authenticates all calls. CORS allows browser-based InstantSearch clients to query directly.

The template is minimal: one service, one volume, one secret. You bring the product feed, schema, and frontend UI. Railway provides compute, disk, networking, and deployment.

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

[View on Railway →](https://railway.com/deploy/typesense-ecommerce)
