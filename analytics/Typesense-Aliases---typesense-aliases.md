# Deploy Typesense Aliases on Railway

collection aliases for zero-downtime reindex

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-aliases)

## About

Typesense aliases are the quiet trick that makes reindexing boring again: index into a new collection, flip an alias, and your clients never notice. On Railway, you run the official `typesense/typesense:30.2` image, attach a persistent volume, and the alias swap becomes a single `PUT` call with zero downtime. This guide covers why that matters, how to set it up, and what it costs.

A collection alias points a stable name like `products` at any underlying collection. Reindex into `products_v2`, swap the alias, and the old collection stays for rollback until you delete it. No client redeploy, no DNS change, no double-write window.

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

[View on Railway →](https://railway.com/deploy/typesense-aliases)
