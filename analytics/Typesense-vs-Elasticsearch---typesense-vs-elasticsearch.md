# Deploy Typesense vs Elasticsearch on Railway

Typesense as an easier Elasticsearch alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-vs-elasticsearch)

## About

This listing hosts Typesense as an Elasticsearch alternative: one official typesense/typesense:30.2 container on port 8108, no JVM cluster, with a /data volume and TYPESENSE_API_KEY.

Typesense is an open-source, in-memory search engine built for instant, typo-tolerant search experiences. This Railway template deploys the official Typesense Docker image as a single-node search service, giving you a production-ready alternative to Elasticsearch without the cluster management overhead.

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

[View on Railway →](https://railway.com/deploy/typesense-vs-elasticsearch)
