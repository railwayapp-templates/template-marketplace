# Deploy Typesense Go on Railway

community Go client against Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-go)

## About

Typesense Go on this Railway listing is official typesense/typesense:30.2 on port 8108 with a /data volume, TYPESENSE_API_KEY, and --enable-cors, so InstantSearch clients can query the node.

The first gotcha with a Go backend and Typesense wasn't latency—it was data loss. Run the binary without a volume and every document vanishes on restart. Railway fixes that: mount /data as a persistent volume, and collections survive deploys.

Typesense Go is the community client your Go service imports to create collections, index docs, and query over HTTP. On Railway, run two services: official typesense/typesense:30.2 on port 8108, and your Go app calling it over the private network. Pin the image.

Typesense does in-memory search with disk persistence; the node listens on 8108 for REST and health checks.

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

[View on Railway →](https://railway.com/deploy/typesense-go)
