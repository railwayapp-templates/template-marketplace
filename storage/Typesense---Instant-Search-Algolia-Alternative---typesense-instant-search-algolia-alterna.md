# Deploy Typesense - Instant Search Algolia Alternative on Railway

Typo-tolerant instant search engine. Self-hosted Algolia alternative.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-instant-search-algolia-alterna)

## About

Typesense is an open-source, typo-tolerant search engine written in C++ built for instant "search-as-you-type" experiences. Index documents and run sub-50ms full-text, faceted, and vector search behind a clean REST API — a self-hosted, developer-friendly alternative to Algolia and Elasticsearch.

This template runs the official `typesense/typesense` image wired for Railway. Typesense serves its REST API on port 8108; the template sets `PORT=8108` so Railway's proxy targets it and exposes the service over HTTPS. The search index lives on an attached volume at `/data`, so your collections survive redeploys. Every data route is protected by the `TYPESENSE_API_KEY` auto-generated at deploy — only `/health` stays open so Railway can healthcheck the service. The start command wires the rest in for you (`--data-dir=/data`, `--api-port`, `--api-key`), including one Railway-specific tuning: `--thread-pool-size=8`, so Typesense does not size its thread pool from the container host's core count and crash at boot. Typesense is memory-resident: it holds the index in RAM for fast search, so size the service to your dataset.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typesense | `typesense/typesense:30.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TYPESENSE_API_KEY` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c '/opt/typesense-server --data-dir=/data --thread-pool-size=8 --api-port=${PORT:-8108} --api-key=${TYPESENSE_API_KEY}'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/typesense-instant-search-algolia-alterna)
