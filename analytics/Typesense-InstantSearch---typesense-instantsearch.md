# Deploy Typesense InstantSearch on Railway

InstantSearch.js with a Typesense adapter

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-instantsearch)

## About

Deploy Typesense on Railway as the backend for InstantSearch.js — typo-tolerant as-you-type UI with the official Typesense adapter, no per-search Algolia bill.

Typesense InstantSearch combines the Typesense search engine with InstantSearch.js via the official `typesense-instantsearch-adapter`. Typesense is a GPL-3.0, in-memory, typo-tolerant engine in C++ returning results under 50ms. On Railway, you run the Typesense Docker container with a persistent `/data` volume, exposing REST API on port 8108, and serve an InstantSearch.js frontend that talks to it. No Algolia account, no per-request billing, no data leaves your project. Railway handles orchestration, volume, health checks, and scaling; you control index, API key, and UI.

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

[View on Railway →](https://railway.com/deploy/typesense-instantsearch)
