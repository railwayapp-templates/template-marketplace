# Deploy Typesense Geo Search on Railway

lat/long radius and sort with Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-geo-search)

## About

Deploy Typesense on Railway for lat/long radius filters, geo sort, and location-aware product or store search — without Algolia per-search billing.

Typesense Geo Search is a self-hosted instant search engine with native geospatial filtering and sorting. Deploy the official Docker image `typesense/typesense:30.2` on Railway, set an API key, enable CORS, and mount a volume at `/data`. Railway handles networking, TLS, and scaling. Typesense is GPL-3.0 licensed, so you pay only for Railway compute and storage—no per-search fees.

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

[View on Railway →](https://railway.com/deploy/typesense-geo-search)
