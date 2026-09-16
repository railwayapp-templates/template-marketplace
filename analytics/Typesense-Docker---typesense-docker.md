# Deploy Typesense Docker on Railway

official Typesense image on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-docker)

## About

Search

Typesense Docker is the official containerized distribution of the open-source, typo-tolerant instant search engine. Railway runs the pinned `typesense/typesense:30.2` image, attaches a persistent volume to `/data`, and exposes the API on port 8108. The container starts with `--data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors`, giving you full self-hosting under GPL-3.0 without per-search fees. Railway handles process supervision, logging, and scaling while you keep complete control of the index and data.

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

[View on Railway →](https://railway.com/deploy/typesense-docker)
