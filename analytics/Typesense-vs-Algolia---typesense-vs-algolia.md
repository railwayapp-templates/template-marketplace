# Deploy Typesense vs Algolia on Railway

self-hosted Typesense as an Algolia alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-vs-algolia)

## About

Typesense vs Algolia is this Railway listing: official typesense/typesense:30.2 on port 8108 with a /data volume, so you self-host instant search instead of paying Algolia per request and per record.

Typesense is a fast, typo-tolerant, open-source search engine built for instant search experiences. Unlike Algolia, which locks you into a proprietary SaaS with per-search-request billing, Typesense ships as a single Docker container you can run anywhere. The official image typesense/typesense:30.

Algolia is the default choice for many developers because it works out of the box, but the pricing model is punishing at scale. Algolia Grow charges you for every search request and every record stored, which means your bill grows linearly with traffic even if your infrastructure is idle.

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

[View on Railway →](https://railway.com/deploy/typesense-vs-algolia)
