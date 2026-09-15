# Deploy Typesense Site Search on Railway

self-hosted site search for your domain

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-site-search)

## About

Typesense Site Search gives you a self-hosted, typo-tolerant full-text search engine for your domain without shipping your index or query logs to a third-party SaaS. Deploy the official `typesense/typesense:30.2` Docker image on Railway, point a crawler or indexer at your pages, and serve instant search-as-you-type results from your own infrastructure. This Railway template runs the open-source Typesense engine on a persistent `/data` volume, exposes the REST API on port 8108, and enables CORS so browser-side InstantSearch clients can query your site index directly. Because Typesense is in-memory and schema-flexible, you can index product pages, documentation, blog posts, or any HTML/JSON content your domain publishes, then tune typo tolerance, ranking, and faceting without paying per search request.

This deployment targets the GPL-3.0 Typesense engine configured specifically for site search workloads. Railway provisions a container from the official `typesense/typesense:30.2` image, attaches a persistent volume at `/data`, and starts the daemon with `--data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors`. The API key is mandatory: Typesense refuses to boot without it, and losing the key means you cannot authenticate administrative operations against an existing data directory. Railway's volume persists the on-disk snapshot, so restarting or scaling the service does not wipe your indexed pages. Health checks hit port 8108, the same port used by the Typesense REST API for indexing, searching, and managing collections. You connect your own crawler, upload JSON documents, or use one of the official Typesense scrapers to populate the index.

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

[View on Railway →](https://railway.com/deploy/typesense-site-search)
