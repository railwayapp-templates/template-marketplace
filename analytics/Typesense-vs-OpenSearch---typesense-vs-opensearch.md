# Deploy Typesense vs OpenSearch on Railway

Typesense as a lighter OpenSearch path

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-vs-opensearch)

## About

OpenSearch is fine when you already staff a Lucene cluster — JVM heaps, shard allocation, and a DSL that looks like Elasticsearch. Most product and docs search teams do not need that. This listing is Typesense OSS on Railway as a lighter OpenSearch path: typo-tolerant HTTP search on port 8108, one binary, no cluster state machine to babysit for typical app catalogs.

Pull `typesense/typesense:30.2`, attach a volume at `/data`, set one env var, and the API listens on 8108. No JVM or Lucene segments; Typesense is GPL-3.0, in-memory, snapshots to disk.

The catch is RAM: size it to your dataset. Losing the volume or API key means data loss or lockout. Railway persistent volumes make data straightforward.

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

[View on Railway →](https://railway.com/deploy/typesense-vs-opensearch)
