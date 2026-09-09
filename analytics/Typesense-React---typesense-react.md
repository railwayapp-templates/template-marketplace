# Deploy Typesense React on Railway

React InstantSearch on Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-react)

## About

Typesense React on this Railway listing is official typesense/typesense:30.2 on port 8108 with a /data volume, TYPESENSE_API_KEY, and --enable-cors, so InstantSearch clients can query the node.

Typesense React is the React integration for Typesense, the open-source, typo-tolerant instant search engine. Deploying on Railway runs the Typesense server (GPL-3.0, in-memory, API-first) plus the React InstantSearch hooks that render faceted search and autocomplete in the browser. Railway hosts the official typesense/typesense:30.2 Docker image, persists the /data volume, and exposes port 8108 for the React client.

The container starts with `--data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors`. The /data volume is mandatory; without it, redeploys wipe your index. CORS is enabled because React InstantSearch calls the API from a different origin. Typesense React is client-side only; the server runs on Railway, and the React app can be hosted anywhere. Health checks hit port 8108.

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

[View on Railway →](https://railway.com/deploy/typesense-react)
