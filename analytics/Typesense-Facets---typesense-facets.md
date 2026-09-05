# Deploy Typesense Facets on Railway

faceted filters on Typesense collections

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-facets)

## About

Deploy Typesense on Railway for fast, typo-tolerant faceted search — filter and facet ecommerce or SaaS catalogs without Algolia per-search billing.

Typesense is a blazing-fast, open-source search engine built for instant, typo-tolerant, and faceted search. This Railway template focuses on **faceted search**—filtering and refining products or content using structured attributes like color, size, brand, or price. Deploying Typesense on Railway gives you a self-hosted, GPL-3.0 licensed backend with no per-search fees.

The official Docker image `typesense/typesense:30.2` runs as a single container, exposing the API on port `8108`. Railway handles infrastructure, persistent volumes, and scaling. The template includes a persistent `/data` volume and requires a `TYPESENSE_API_KEY` environment variable. CORS is enabled in the start command for browser-based InstantSearch clients.

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

[View on Railway →](https://railway.com/deploy/typesense-facets)
