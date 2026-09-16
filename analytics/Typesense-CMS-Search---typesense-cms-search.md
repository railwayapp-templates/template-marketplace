# Deploy Typesense CMS Search on Railway

search WordPress, Ghost, or headless CMS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-cms-search)

## About

Typesense CMS Search.

Typesense CMS Search is a self-hosted, open-source (GPL-3.0) instant search engine for indexing WordPress, Ghost, or headless CMS content. Deploy the official `typesense/typesense:30.2` Docker image on Railway with a persistent `/data` volume and API key. Railway manages orchestration, networking, scaling, and TLS. You get Algolia-grade typo-tolerant, faceted search without SaaS lock-in.

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

[View on Railway →](https://railway.com/deploy/typesense-cms-search)
