# Deploy Typesense Docs Search on Railway

search docs, blogs, and help centers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-docs-search)

## About

Search.

Typesense Docs Search is a self-hosted instant search deployment purpose-built for documentation sites, developer blogs, help centers, and knowledge bases. It runs the official `typesense/typesense:30.2` image inside a Docker container on Railway, exposing the API on port 8108 and persisting the entire search index to a Railway volume mounted at `/data`. You control the `TYPESENSE_API_KEY`, you own the data, and you pay only for the compute and storage your search node actually consumes. Because Typesense is GPL-3.0 licensed open-source software, there is no per-search-request meter, no record-count tier, and no vendor lock-in. The container starts with `--data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors`, which means browser-based InstantSearch clients can query it directly from your docs frontend. Health checks hit port 8108, and the volume keeps your index intact across restarts and redeploys. For teams that already run documentation on Docusaurus, Nextra, MkDocs, Hugo, or VitePress, this template removes the last managed-service dependency from the stack.

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

[View on Railway →](https://railway.com/deploy/typesense-docs-search)
