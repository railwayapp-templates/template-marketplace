# Deploy Typesense Elixir on Railway

community Elixir client against Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-elixir)

## About

Phoenix search feels instant until the SaaS invoice arrives. Typesense Elixir points your Elixir/OTP app at self-hosted Typesense on Railway — `typesense/typesense:30.2` on port 8108 with `/data`, `TYPESENSE_API_KEY`, and `--enable-cors`.

Typesense is a single Go binary you drop onto Railway, point a Phoenix app at, and get faceted, typo-tolerant search in an afternoon. The Elixir pattern drives the Typesense HTTP API using Req or HTTPoison, then feeds results into a LiveView. One container, one volume, one API key. If you call Typesense server-side, CORS doesn’t matter; browser InstantSearch requires `--enable-cors`.

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

[View on Railway →](https://railway.com/deploy/typesense-elixir)
