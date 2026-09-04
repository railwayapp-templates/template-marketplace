# Deploy Typesense Shopify on Railway

self-hosted search for Shopify catalogs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-shopify)

## About

Run your own Typesense node on Railway to power fast, typo-tolerant, faceted product search for a Shopify storefront without per-search SaaS fees.

This Railway template deploys Typesense as a single-node search API for Shopify storefronts. You keep full control of index data, API keys, and query latency without Algolia's per-request pricing. The GPL-3.0 license means you can inspect, modify, and run the search engine on your own infrastructure.

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

[View on Railway →](https://railway.com/deploy/typesense-shopify)
