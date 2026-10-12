# Deploy Typesense vs Sonic on Railway

Typesense vs Sonic for app search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-vs-sonic)

## About

Sonic keeps the inverted index tiny and the API minimal — until you need facets, typo knobs, or InstantSearch in the browser. This listing is Typesense OSS on Railway for that bake-off: `typesense/typesense:30.2` on port 8108 with `/data`, `TYPESENSE_API_KEY`, and `--enable-cors`.

A database doing search is not a search engine. Deploy `typesense/typesense:30.2` on Railway, attach a persistent volume, and you get typo-tolerant, faceted instant search. Sonic returns only document IDs; Typesense ships relevance, faceting, typo correction, and a JSON REST API.

Run on port 8108 with an API key, a data directory, and `--enable-cors` for browsers. Railway handles networking and health checks. The `/data` volume is non-negotiable: lose it, lose the index. Sonic feels like a library; Typesense feels like a product you configure.

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

[View on Railway →](https://railway.com/deploy/typesense-vs-sonic)
