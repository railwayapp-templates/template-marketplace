# Deploy Typesense CORS on Railway

browser search clients with CORS on

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-cors)

## About

Typesense CORS isn't a separate binary or plugin — it's the same open-source Typesense engine started with `--enable-cors` so browser search clients like InstantSearch.js can hit your Railway-hosted node without blocked preflight requests.

On Railway you get a single Typesense service, a volume at `/data`, and a public URL on port 8108. Flip on `--enable-cors` in the start command and InstantSearch.js can call the API from the browser without an nginx CORS proxy in between.

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

[View on Railway →](https://railway.com/deploy/typesense-cors)
