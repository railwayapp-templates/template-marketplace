# Deploy Typesense Collections on Railway

multi-collection Typesense search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-collections)

## About

When product records, help docs, and user accounts need different field types and relevance tuning, one flat index gets messy. Typesense Collections solves that with separate collections plus one `/multi_search` endpoint that fans out across them in a single HTTP request. You avoid field-weight gymnastics and get clean schemas per dataset.

This template runs one Typesense node from `typesense/typesense:30.2`. You get an attached Railway volume for `/data`, an env var for `TYPESENSE_API_KEY`, and port `8108`. The server keeps everything in RAM, so you size memory to the combined dataset, not one index. Railway handles the container, volume, and network; you define schemas, aliases, and query logic. Snapshots land on the volume automatically, which makes restarts survivable.

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

[View on Railway →](https://railway.com/deploy/typesense-collections)
