# Deploy Typesense Analytics on Railway

query logs and search analytics hooks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-analytics)

## About

Typesense Analytics on this Railway listing is official typesense/typesense:30.2 on port 8108 with a /data volume, TYPESENSE_API_KEY, and --enable-cors, so InstantSearch clients can query the node.

Typesense logs every query string, zero-result miss, and popularity signal directly inside the server. No sidecar, no separate analytics database. Host on Railway with the official `typesense/typesense:30.2` image, a persistent volume at `/data`, and port 8108 for the API. Because Typesense is in-memory, analytics endpoints read from RAM-resident collections — query counters return in milliseconds.

This is GPL-3.0 Typesense, not a hosted API. Query logs stay on your volume. For e-commerce or content sites where search terms are sensitive, that's why you skipped SaaS.

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

[View on Railway →](https://railway.com/deploy/typesense-analytics)
