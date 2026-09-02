# Deploy Typesense vs Meilisearch on Railway

self-hosted Typesense vs Meilisearch

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-vs-meilisearch)

## About

Typesense vs Meilisearch on this Railway listing is official typesense/typesense:30.2 on port 8108 with a /data volume, TYPESENSE_API_KEY, and --enable-cors, so InstantSearch clients can query the node.

Typesense and Meilisearch are the two leading open-source instant search engines. Both deliver typo-tolerant, sub-50ms search over JSON documents and are self-hosted alternatives to Algolia. Railway runs the official `typesense/typesense:30.2` image (not `latest`) with a persistent volume, required API key, and CORS enabled for browser InstantSearch clients. The container listens on port 8108 and starts with `--data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors`. The `/data` volume must be mounted or redeploys wipe the index. `TYPESENSE_API_KEY` is mandatory; losing it means losing admin access. CORS is needed because the InstantSearch adapter runs in the browser and calls port 8108 directly.

Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying Typesense vs Meilisearch on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

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

[View on Railway →](https://railway.com/deploy/typesense-vs-meilisearch)
