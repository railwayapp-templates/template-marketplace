# Deploy Typesense Autocomplete.js on Railway

Algolia Autocomplete.js with Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-autocompletejs)

## About

I spent a Friday wiring Algolia’s Autocomplete.js front-end to a self-hosted Typesense cluster because I didn’t want per-search billing on a hobby project. The adapter is about 40 lines of JavaScript, but the real gotcha is the search-only API key that must never leave your browser bundle. Get that wrong and you’ve exposed the admin key that can drop every collection. On Railway, I run the Typesense container with a persistent volume, pass one environment variable for the API key, and the whole autocomplete stack costs less than a pizza.

You’re not hosting a static plugin. You’re hosting a full search engine behind a drop-in autocomplete UI that mimics the Algolia Autocomplete API. The Railway container runs the Typesense server image — not just a front-end bundle — and the autocomplete adapter talks to it over HTTP on port 8108. You get as-you-type suggestions, keyboard navigation, and plugin hooks like recent searches, all against your own index.

Railway fits because the Typesense container needs a long-lived disk for `/data` and a stable internal network name for your front-end. Railway gives both without a load balancer or VPC. The self-hosted Typesense template assumes you know the API key is not optional. Lose it and you lose access to your index. On Railway, the key lives in service variables, and the volume keeps on-disk state across restarts.

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

[View on Railway →](https://railway.com/deploy/typesense-autocompletejs)
