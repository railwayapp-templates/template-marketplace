# Deploy Typesense Vue on Railway

Vue InstantSearch on Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-vue)

## About

Hosted Typesense for Vue apps.

Typesense Vue is the official Vue adapter for Typesense, an open-source, typo-tolerant instant search engine. The adapter runs in the browser, but you need a Typesense server backend. Railway’s self-hosted Typesense template deploys the server with persistent storage, health checks, and a public endpoint so your Vue InstantSearch UI can query it instantly.

Typesense stores data in memory, supports faceting, filtering, geosearch, and exposes a REST API. The Vue adapter wraps InstantSearch.js, giving you components like `` and `` that bind directly to your Typesense collection.

On Railway, you deploy the official `typesense/typesense:30.2` Docker image. The template pre-configures the API key, CORS, and a persistent volume for `/data`. Point your Vue app to the Railway URL and start searching.

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

[View on Railway →](https://railway.com/deploy/typesense-vue)
