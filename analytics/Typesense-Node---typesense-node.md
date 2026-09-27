# Deploy Typesense Node on Railway

official Node client against Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-node)

## About

First time I pointed `typesense-js` at a fresh Railway hostname, the search worked and the import hung — I had forgotten the volume at `/data`, so every redeploy wiped the collection. Typesense Node here means the official `typesense` npm client talking to `typesense/typesense:30.2` on port 8108 with `TYPESENSE_API_KEY` and `--enable-cors`. The client lives in your Express or Next API route; the search server is this one-service template.

Typesense is an in-memory search server you run yourself. This Railway template gives you a single Docker container pinned to `typesense/typesense:30.2` (never `latest`), a persistent volume at `/data`, and an env var for your API key. The server listens on port 8108. Your Node.js app talks to it via the `typesense-js` client — the client lives in your app, not as a separate Railway service. Mount a volume or you lose your index on every deploy.

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

[View on Railway →](https://railway.com/deploy/typesense-node)
