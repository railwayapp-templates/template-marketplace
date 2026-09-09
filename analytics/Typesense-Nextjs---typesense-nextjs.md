# Deploy Typesense Next.js on Railway

instant search in a Next.js app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-nextjs)

## About

Typesense Next.js on this Railway listing is official typesense/typesense:30.2 on port 8108 with a /data volume, TYPESENSE_API_KEY, and --enable-cors, so InstantSearch clients can query the node.

Typesense Next.js pairs the GPL-3.0 Typesense search engine with a Next.js App Router frontend. Typesense is an in-memory, typo-tolerant search server that serves sub-50ms queries on port 8108. The Next.js layer uses the official `typesense-instantsearch-adapter` to bridge Typesense to Algolia's open-source InstantSearch UI. On Railway, deploy the Typesense Docker image with a persistent volume at `/data`, then point Next.js at the internal hostname. You own the index, query path, and infrastructure—no per-search fees, no vendor lock-in.

Railway handles ops: the container starts with `--data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors`, the volume survives restarts, and the health check on 8108 keeps the service stable. Next.js runs as a separate Railway service on the private network. This template suits teams wanting Algolia-grade UX without SaaS billing.

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

[View on Railway →](https://railway.com/deploy/typesense-nextjs)
