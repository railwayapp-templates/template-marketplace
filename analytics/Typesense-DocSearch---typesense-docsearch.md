# Deploy Typesense DocSearch on Railway

DocSearch-style docs UI on Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-docsearch)

## About

Typesense DocSearch clones the Algolia DocSearch modal UX on a GPL-3.0 Typesense node you control: `typesense/typesense:30.2` on port 8108, `/data` volume, `TYPESENSE_API_KEY`, and `--enable-cors`.

The `/` key opening a modal with ranked results is Algolia DocSearch's pattern. Typesense DocSearch clones the UX but the index lives on a node you control. On Railway, that's a container with a persistent volume at `/data` and an API key in env vars. The browser UI calls port 8108 with CORS enabled.

It's two parts: a Typesense instance holding your docs corpus and a static frontend rendering the modal. Railway removes the host setup: you attach a volume, set `TYPESENSE_API_KEY`, expose 8108, and the modal doesn't care where the index lives, as long as latency is low and CORS headers are correct. The volume survives redeploys; snapshots write to `/data` so restart recovery is automatic.

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

[View on Railway →](https://railway.com/deploy/typesense-docsearch)
