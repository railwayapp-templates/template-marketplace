# Deploy Meilisearch with Persistent Indexes on Railway

Search API with persistent indexes, production auth and a generated key.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/meilisearch-with-persistent-indexes)

## About

Search API with persistent indexes, production auth and a generated key.

Deploying this template creates Meilisearch in your Railway project. The application receives an HTTPS domain automatically. Database and Redis services, when included, use private networking and generated credentials. Persistent data is stored on the included volumes or object storage, so application redeploys do not discard it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Meilisearch | `getmeili/meilisearch@sha256:ff546679970126f8822e15d1b6a06bfbff1f2ce2e43f810cfb5258012f92de5c` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 7700 | - |
| `MEILI_ENV` | production | - |
| `MEILI_DB_PATH` | /meili_data/data.ms | - |
| `MEILI_DUMP_DIR` | /meili_data/dumps | - |
| `MEILI_HTTP_ADDR` | [::]:7700 | - |
| `MEILI_MASTER_KEY` | - | Server-only master key. Use scoped search-only keys in browser clients. |
| `MEILI_SNAPSHOT_DIR` | /meili_data/snapshots | - |
| `MEILI_SCHEDULE_SNAPSHOT` | 86400 | - |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/meili_data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/meilisearch-with-persistent-indexes)
