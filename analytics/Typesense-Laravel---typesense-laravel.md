# Deploy Typesense Laravel on Railway

Laravel Scout Typesense driver

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-laravel)

## About

Self-host Typesense Laravel on Railway.

Typesense Laravel combines the open-source Typesense instant search engine with the official Laravel Scout driver. Deploy the `typesense/typesense:30.2` Docker image on Railway, mount a volume at `/data`, set a required API key, enable CORS, and expose port 8108. Railway manages infrastructure, scaling, and networking, giving you a self-hosted, GPL-3.0 search backend that works with Laravel Scout.

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

[View on Railway →](https://railway.com/deploy/typesense-laravel)
