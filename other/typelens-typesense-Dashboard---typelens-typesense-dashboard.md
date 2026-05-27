# Deploy typelens (typesense + Dashboard) on Railway

Deploys typesense and typelens, an open source typesense Dashboard UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typelens-typesense-dashboard)

## About

typelens is a self-hostable dashboard for Typesense — the open-source, typo-tolerant search engine. Browse collections, manage API keys, and import data from JSON or CSV without touching the raw API. One Railway deploy ships both the search engine and the dashboard, ready to go.

This template deploys two Railway services: Typesense (the search engine) and typelens (the Next.js dashboard). Both live in the same Railway project and communicate over private networking, so your admin key is never publicly exposed. Typesense runs as a persistent service with a mounted volume for data durability. typelens is zero-configuration — it auto-connects to the bundled Typesense instance on first boot. For teams, sensitive operations are proxied server-side through Next.js API routes. To connect an existing Typesense instance instead of the bundled one, set `TYPESENSE_HOST`, `TYPESENSE_PORT`, `TYPESENSE_API_KEY`, `TYPESENSE_PROTOCOL`, and `TYPESENSE_SERVER_NAME` on the typelens service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typesense | [copperline-ai/typesense-railway](https://github.com/copperline-ai/typesense-railway) | Web service |
| typelens | `ghcr.io/copperline-ai/typelens:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | typesense | 8080 | The port typesense runs through |
| `TYPESENSE_URL` | typesense | - | The internal typesense URL |
| `TYPESENSE_API_KEY` | typesense | (secret) | The admin API key for typesense |
| `TYPESENSE_DATA_DIR` | typesense | - | The volume mount path |
| `TYPESENSE_PUBLIC_URL` | typesense | - | The public URL for typesense |
| `TYPESENSE_THREAD_POOL_SIZE` | typesense | 64 | Number of threads used for handling concurrent requests |
| `TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD` | typesense | 32 | Number of collections that are loaded in parallel during start up |
| `AUTH_PASSWORD` | typelens | (secret) | Set a basic authentication password (optional) |
| `AUTH_USERNAME` | typelens | (secret) | Set a basic authentication username (optional) |
| `TYPESENSE_HOST` | typelens | - | The typesense internal address |
| `TYPESENSE_PORT` | typelens | - | The typesense api port |
| `TYPESENSE_API_KEY` | typelens | (secret) | The typesense api key |
| `TYPESENSE_PROTOCOL` | typelens | http | The typesense api protocol (http or https) |
| `TYPESENSE_SERVER_NAME` | typelens | Typesense | The name/label for the typesense server |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/api/healthz`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/typelens-typesense-dashboard)
