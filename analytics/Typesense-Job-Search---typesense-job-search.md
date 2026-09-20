# Deploy Typesense Job Search on Railway

job board search with Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-job-search)

## About

Typesense Job Search runs Typesense on Railway as a single container with a persistent `/data` volume, `TYPESENSE_API_KEY`, and `--enable-cors` on port 8108 — so role, location, salary, and remote filters stay fast without Algolia-style per-search billing.

Typesense is an open-source, in-memory search engine for typo-tolerant, instant queries. On Railway, you deploy the official `typesense/typesense:30.2` image, map port 8108, attach a volume to `/data`, and pass three flags: `--data-dir /data`, `--api-key=$TYPESENSE_API_KEY`, and `--enable-cors`. The volume persists your index across redeploys. `TYPESENSE_API_KEY` is required — never lose it, because there’s no reset. CORS lets browser clients use InstantSearch. Railway handles reverse proxy, TLS, and logs, so you skip nginx and Let’s Encrypt.

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

[View on Railway →](https://railway.com/deploy/typesense-job-search)
