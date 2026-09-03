# Deploy Typesense Self Host vs Cloud on Railway

self-host Typesense instead of Typesense Cloud

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-self-host-vs-cloud)

## About

Typesense Self Host vs Cloud is a self-hosted deployment of the Typesense open-source instant search engine on Railway, offered as a lower-cost alternative to Typesense Cloud's hourly RAM and vCPU billing.

Typesense is an open-source, typo-tolerant instant search engine built for speed. It indexes JSON documents in memory and returns sub-50ms responses. The self-hosted template on Railway runs the official `typesense/typesense:30.2` image with `--data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors`. The `/data` directory is mounted to a Railway volume so collections survive restarts. Typesense is GPL-3.0 licensed, so you can run it on your own infrastructure without per-search fees or record caps. Railway handles orchestration, networking, and volume management; you handle the API key, schema, and index sizing. This model suits teams that want predictable costs, data residency control, or to run search alongside the rest of their stack.

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

[View on Railway →](https://railway.com/deploy/typesense-self-host-vs-cloud)
