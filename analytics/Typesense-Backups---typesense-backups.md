# Deploy Typesense Backups on Railway

snapshot and restore Typesense data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-backups)

## About

Self-host Typesense Backups on Railway.

Typesense Backups is a pattern for running the open-source instant search engine Typesense with snapshot-based disaster recovery on Railway. Use the official image `typesense/typesense:30.2`, mount a persistent volume at `/data`, and set `TYPESENSE_API_KEY` (required). The container runs with `--data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors` and exposes API port `8108`. Because Typesense is GPL-3.0, you avoid Algolia's SaaS-only per-search pricing. Railway volumes make restores simple: replace `/data` contents and restart.

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

[View on Railway →](https://railway.com/deploy/typesense-backups)
