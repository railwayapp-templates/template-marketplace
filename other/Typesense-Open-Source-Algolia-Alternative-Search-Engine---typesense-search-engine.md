# Deploy Typesense | Open Source Algolia Alternative Search Engine on Railway

Self Host Typesense. Typo-tolerant, vector search, faceted navigation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-search-engine)

## About

Deploy Typesense on Railway to get a lightning-fast, typo-tolerant search engine running in minutes. Self-host Typesense as an open-source alternative to Algolia and Elasticsearch with sub-50ms search responses, built-in typo tolerance, and vector search capabilities — no JVM tuning or cluster management required.

This Railway template deploys a single Typesense service backed by a persistent volume for index storage. CORS is enabled by default, and the thread pool is tuned for Railway's container environment.

Typesense is an open-source, typo-tolerant search engine built in C++ for maximum performance. It serves as a drop-in alternative to Algolia (with open-source pricing) and a simpler alternative to Elasticsearch (without JVM complexity).

- **Instant search-as-you-type** with automatic typo tolerance
- **Vector search and hybrid search** for semantic/AI-powered queries
- **Faceted navigation** with filtering, sorting, and grouping
- **Geo-search** for location-based results
- **Built-in rate limiting** and API key scoping
- **Raft-based clustering** for high availability
- **25.6k+ GitHub stars** — active community and development

Typesense uses embedded RocksDB for storage — no external database required. It runs as a single self-contained binary, making it straightforward to operate.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Typesense | `typesense/typesense:29.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TYPESENSE_API_KEY` | (secret) | Admin API authentication key |
| `TYPESENSE_DATA_DIR` | /data | Persistent data directory path |
| `TYPESENSE_ENABLE_CORS` | true | Enable cross-origin requests |
| `TYPESENSE_THREAD_POOL_SIZE` | 8 | Worker thread pool size |
| `TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD` | 4 | Parallel collection loading |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/typesense-search-engine)
