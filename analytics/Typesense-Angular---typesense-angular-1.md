# Deploy Typesense Angular on Railway

Angular InstantSearch on Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-angular-1)

## About

Typesense Angular puts GPL-3.0 Typesense behind an Angular InstantSearch UI: `typesense/typesense:30.2` on port 8108, volume at `/data`, `TYPESENSE_API_KEY`, and `--enable-cors` so `localhost:4200` can query the node.

You wire an Angular search box, hit keys, and results land before the third character. The gotcha isn't Angular—it's the backend. If you forget `--enable-cors`, the browser blocks queries from `localhost:4200`. Lose `TYPESENSE_API_KEY` and you rebuild `/data` from scratch. Railway hosts the `typesense/typesense:30.2` container with a volume on `/data`, port 8108, and CORS enabled. That's the whole backend.

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

[View on Railway →](https://railway.com/deploy/typesense-angular-1)
