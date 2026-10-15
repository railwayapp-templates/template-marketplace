# Deploy Typesense Courses on Railway

course catalog search with Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-courses)

## About

A course catalog lives or dies on the search box: a student types half a title, picks a level, and expects the right section before the bell. This template runs Typesense OSS on Railway so your LMS or edtech app gets that search on a node you own.

Course search is messy: typos like "clculus," "Calculus II" vs "Calculus 2," accented instructor names, multiple schools in one LMS. Typesense solves this with typo tolerance, facets (level, price, instructor, language), numeric sorting, and scoped keys per tenant. It's a single GPL-3.0 binary that holds the index in RAM.

On Railway, you run the official `typesense/typesense:30.2` image, mount a volume at `/data`, set `TYPESENSE_API_KEY`, expose port 8108, and pass `--enable-cors` for browser clients. Railway handles the container, health check on 8108, and volume persistence. No per-search billing—just your own node.

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

[View on Railway →](https://railway.com/deploy/typesense-courses)
