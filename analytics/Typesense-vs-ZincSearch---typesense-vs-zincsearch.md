# Deploy Typesense vs ZincSearch on Railway

Typesense vs ZincSearch for logs and apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-vs-zincsearch)

## About

This listing is Typesense OSS on Railway for the moment you realize ZincSearch was built for logs and your users are typing product names. Same tiny-footprint spirit, but with typo tolerance, facets, and an InstantSearch-ready API.

Run the official `typesense/typesense:30.2` image as a single service, attach a volume to `/data`, expose port `8108`. No sidecars or external database. Typesense keeps everything in RAM, so memory sizing is the main tuning decision.

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

[View on Railway →](https://railway.com/deploy/typesense-vs-zincsearch)
