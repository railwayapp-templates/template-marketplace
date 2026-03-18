# Deploy Meilisearch | Open-Source Algolia Alternative | Search Engine on Railway

Meilisearch provides lightning-fast search with semantic capabilities

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/meilisearch-open-source-algolia-alternat)

## About

Deploy a production-ready Meilisearch instance on Railway in under 60 seconds. This template provisions Meilisearch v1.9.0 using the official `getmeili/meilisearch:v1.9.0` Docker image with persistent storage, automatic HTTPS, and a secure master key. No Docker knowledge required—Railway handles container orchestration, networking, and SSL certificates automatically.

Meilisearch is an open-source, lightning-fast search engine built in Rust that delivers results in under 50 milliseconds. It's designed as a self-hosted alternative to Algolia and Elasticsearch, offering semantic search, typo tolerance, and geosearch without the complexity or vendor lock-in.

**Key features:**
- **Sub-50ms response times** — optimized for real-time search experiences
- **Typo tolerance** — finds "Interstellar" even when users type "Intersteler"
- **Semantic search** — understands query intent, not just keyword matching
- **Geosearch** — filter and sort results by location coordinates
- **Multi-language support** — handles 30+ languages out-of-the-box
- **RESTful API** — simple HTTP endpoints, no complex query DSL
- **Schemaless indexing** — add documents as JSON, Meilisearch infers structure

Meilisearch runs as a single binary with persistent storage at `/meili_data/data.ms`, making it ideal for applications needing fast, relevant search without managing Elasticsearch clusters.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meilisearch | `getmeili/meilisearch:v1.9.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3331 | HTTP server listening port |
| `MEILI_ENV` | production | Run Meilisearch in production mode |
| `MEILI_DB_PATH` | /meili_data/data.ms | Path for Meilisearch data storage |
| `MEILI_HTTP_ADDR` | - | Network address Meilisearch binds to |
| `MEILI_MASTER_KEY` | - | Master API key for authentication |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/meili_data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/meilisearch-open-source-algolia-alternat)
