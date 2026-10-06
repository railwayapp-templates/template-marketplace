# Deploy Typesense Monitoring on Railway

health, metrics, and ops hooks on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-monitoring)

## About

Typesense Monitoring is the Typesense OSS template set up to be watched: `/health` for Railway's deploy check, `/metrics.json` and `/stats.json` for memory and latency. It runs the official `typesense/typesense:30.2` image on port 8108 with a `/data` volume, `TYPESENSE_API_KEY`, and `--enable-cors`.

You can spin up Typesense on Railway and immediately hit three endpoints that tell you how the node is breathing: `/health`, `/metrics.json`, and `/stats.json`. Typesense is C++ and in-memory, so RAM is the number to watch.

Point Railway's health check at `/health`. Real monitoring means pulling `/metrics.json` and `/stats.json` on a schedule, storing them, and alerting on drift.

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

[View on Railway →](https://railway.com/deploy/typesense-monitoring)
