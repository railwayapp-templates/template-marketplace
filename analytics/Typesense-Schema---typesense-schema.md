# Deploy Typesense Schema on Railway

collections, fields, and locale config

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-schema)

## About

Typesense Schema provides configurable collections, fields, and locale-aware search for fast, typo-tolerant applications on Railway.

Typesense Schema is the configuration layer of Typesense, an open-source, typo-tolerant instant search engine. On Railway, you run the official `typesense/typesense:30.2` image with a persistent `/data` volume, control schema via REST API on port 8108, and avoid per-search fees because Typesense is GPL-3.0.

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

[View on Railway →](https://railway.com/deploy/typesense-schema)
