# Deploy Typesense - Lightning Fast, Open Source Search (Supports Private Networking) on Railway

Cutting-edge, in-memory search engine for mere mortals.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-lightning-fast-open-source-sea)

## About

Typesense is a fast, open-source search engine designed for instant, typo-tolerant search experiences. It provides a simple API, real-time indexing, and relevance tuning out of the box. This template focuses on a minimal setup to get Typesense running quickly for development or production use.

Hosting Typesense involves running a lightweight server that stores indexed data and serves search queries via a REST API. You’ll need to configure persistent storage for your search index, set an API key for authentication, and expose the service over a network. On Railway, this is simplified through container-based deployment, environment variables, and managed volumes. The platform handles infrastructure concerns like scaling, networking, and uptime, allowing you to focus on integrating search into your application rather than managing servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Typesense | [dane-stevens/typesense-railway](https://github.com/dane-stevens/typesense-railway) (root: /) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `TYPESENSE_API_KEY` | (secret) |
| `TYPESENSE_THREAD_POOL_SIZE` | 64 |
| `TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD` | 32 |

## Configuration

- **Healthcheck:** `/health`
- **Volume:** `/data`

**Category:** Storage · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/typesense-lightning-fast-open-source-sea)
