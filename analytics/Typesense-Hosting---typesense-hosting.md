# Deploy Typesense Hosting on Railway

host Typesense on Railway without Cloud

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-hosting)

## About

If you are hunting the cheapest Typesense host for a side project, start here: one `typesense/typesense:30.2` container on Railway, volume at `/data`, API on 8108, `TYPESENSE_API_KEY`, `--enable-cors`. You pay Railway RAM and disk instead of Typesense Cloud hourly — fine for staging and catalogs that fit in a small node, not a substitute for multi-region managed HA.

Typesense is a GPL-3.0 in-memory search engine that runs as a single Docker container. It speaks JSON, gives typo-tolerant faceted search, and has no per-request invoice. On Railway, you point `typesense/typesense:30.2` at a volume, set one API key, and it runs. Railway charges for compute and volume, not per query, so small deployments stay cheap. Size RAM to your dataset: Typesense keeps indexes in memory, and a 512 MB service will OOM on a 2 GB index.

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

[View on Railway →](https://railway.com/deploy/typesense-hosting)
