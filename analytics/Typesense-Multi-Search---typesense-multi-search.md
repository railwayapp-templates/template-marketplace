# Deploy Typesense Multi-Search on Railway

federated multi_search across collections

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-multi-search)

## About

A single POST to `/multi_search` pulls product cards, docs, and help-center hits into one response—no N+1 calls. Each item in the `searches` array has its own `collection`, `query_by`, `filter_by`, `sort_by`, and pagination, so you tune relevance per collection. Run the official `typesense/typesense:30.2` image with `--data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors`, expose port 8108, and persist `/data` on a volume. Never lose `TYPESENSE_API_KEY`; it gates admin and search-only key creation. Scope a search-only key to `products`, `docs`, `help` and browsers can call `multi_search` directly.

Typesense is GPL-3.0 open source, in-memory, writes snapshots to `/data`. The Railway template uses `typesense/typesense:30.2`, port 8108, a persistent volume at `/data`, and requires `TYPESENSE_API_KEY`. Add `--enable-cors` for browser clients. No separate DB, proxy, or queue—one container is the engine. Health check on 8108 waits for memory-mapped recovery before accepting queries.

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

[View on Railway →](https://railway.com/deploy/typesense-multi-search)
