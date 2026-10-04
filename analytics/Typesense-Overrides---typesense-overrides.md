# Deploy Typesense Overrides on Railway

curate and pin hits with overrides

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-overrides)

## About

Typesense Overrides is the merchandising layer that lets you pin exact hits, exclude duds, and bend ranking for specific queries without touching your index. On Railway, it runs as part of the official Typesense Docker image with a persistent `/data` volume, so rules survive redeploys. This guide covers the why, the how, and the real cost of running query-level curation yourself.

Typesense Overrides is a first-class feature inside the GPL-3.0 Typesense engine, not a separate service. You define rules per collection: pin documents to exact positions, exclude others, or apply query-specific ranking tweaks. Each override is a JSON object pushed through the REST API on port 8108. On Railway, run `typesense/typesense:30.2` and mount a volume at `/data`. Overrides live there next to your collections, so redeploys don't wipe curation rules.

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

[View on Railway →](https://railway.com/deploy/typesense-overrides)
