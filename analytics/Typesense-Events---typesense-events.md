# Deploy Typesense Events on Railway

Event discovery search with geo and time filters

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-events)

## About

Someone opens your events app on a Friday at 6pm and types "jazz near me tonight". They want shows within a few kilometres, starting in the next three hours, under a price they set, sorted by start time. This template runs Typesense OSS on Railway so that query comes back from a node you own, with no per-search bill.

Running event discovery on Railway gives you instant search without per-query meters. The official `typesense/typesense:30.2` image, a volume at `/data`, and one `TYPESENSE_API_KEY` variable are all you need. There's no separate search appliance, just one container on port 8108 with geo radius, numeric time range filters, and facets. Pin the image, mount the volume, and keep the key in Railway Variables; those three habits prevent most late-night support threads.

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

[View on Railway →](https://railway.com/deploy/typesense-events)
