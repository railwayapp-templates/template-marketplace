# Deploy Typesense Marketplace on Railway

search listings, sellers, and SKUs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-marketplace)

## About

Typesense Marketplace runs Typesense on Railway as a single container with a persistent `/data` volume, `TYPESENSE_API_KEY`, and `--enable-cors` on port 8108 — so listing search, seller filters, and SKU autocomplete stay under your control without per-query SaaS bills.

A buyer types a partial SKU, waits three seconds, and leaves. Typesense keeps that from happening. The self-hosted Typesense template on Railway runs the official Docker image with a persistent volume, API key, and health checks on port 8108. It’s the cleanest path for a small marketplace team.

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

[View on Railway →](https://railway.com/deploy/typesense-marketplace)
