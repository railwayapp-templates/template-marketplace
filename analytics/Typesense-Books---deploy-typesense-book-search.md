# Deploy Typesense Books on Railway

Bookstore and library catalog search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-typesense-book-search)

## About

Typesense Books is a self-hosted catalog search for bookstores and libraries: typo-tolerant title and author lookup, exact ISBN matches, and genre and format facets, on the official Typesense image.

A patron types "mistry of the rose code" and finds *The Mystery of the Rose Code* in 40 ms.

Use `typesense/typesense:30.2`, mount a volume at `/data`, set an API key, start with `--data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors`.

Railway manages the container - no VM patching. Define the service, attach volume, set env vars. Restarts don't wipe `/data`.

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

[View on Railway →](https://railway.com/deploy/deploy-typesense-book-search)
