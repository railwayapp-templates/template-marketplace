# Deploy Typesense Autocomplete on Railway

typo-tolerant autocomplete with Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-autocomplete)

## About

Typesense Autocomplete is a self-hosted, open-source search engine for typo-tolerant, as-you-type suggestions. Deploying on Railway gives you a dedicated, low-latency backend for instant search in e-commerce, docs, and address lookups. Unlike SaaS-only Algolia, Typesense offers full data control, predictable costs, and the same engine in dev and production.

Typesense is GPL-3.0 licensed, free to self-host with no per-search or per-record fees. The official Docker image `typesense/typesense:30.2` is lightweight, starts fast, and exposes REST API on port 8108. Railway’s template sets up a persistent volume at `/data`, an API key env var, and CORS for browser clients. Railway manages infrastructure, avoiding VPS setup, reverse proxies, and manual disk resizing.

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

[View on Railway →](https://railway.com/deploy/typesense-autocomplete)
