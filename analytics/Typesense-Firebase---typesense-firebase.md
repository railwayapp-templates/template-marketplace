# Deploy Typesense Firebase on Railway

sync Firestore into Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-firebase)

## About

Sync

Typesense Firebase pairs the GPL-3.0 Typesense search engine with Firestore as the source of truth. You run the official `typesense/typesense:30.2` Docker image on Railway, attach a persistent volume at `/data`, and sync Firestore document changes into Typesense via a worker or Cloud Function. The container listens on API port 8108 and requires `TYPESENSE_API_KEY` for all writes and queries. Typesense is in-memory, so RAM holds the active index while the volume stores snapshots for restart persistence. This gives typo-tolerant, faceted, full-text search over Firestore collections with sub-50ms latency, all on infrastructure you control.

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

[View on Railway →](https://railway.com/deploy/typesense-firebase)
