# Deploy Meilisearch on Railway

Meilisearch is a flexible and powerful user-focused search engine.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/meilisearch-2)

## About

Meilisearch is a fast, open-source search engine for building typo-tolerant search experiences. It supports ranking rules, filters, facets, synonyms, and highlighted results, making it a good fit for product catalogs, documentation, marketplaces, dashboards, and internal tools that need relevant search without running a large search cluster.

Hosting Meilisearch involves running the Meilisearch server, securing it with a master key, and attaching persistent storage so indexes survive restarts and redeploys. This template deploys Meilisearch with production mode enabled, telemetry disabled, and a persistent Railway volume mounted for index data. Once deployed, your application can connect to Meilisearch over HTTPS using the generated public domain and `MEILI_MASTER_KEY`. You can create indexes, configure search settings, and sync documents from your app or background workers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meilisearch | `getmeili/meilisearch:v1.42.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3331 | The Railway port to expose the instance on. |
| `MEILI_ENV` | production | Configures the instance’s environment. Value must be either `production` or `development`. |
| `MEILI_DB_PATH` | /meili_data/data.ms | Designates the location where database files will be created and retrieved. |
| `MEILI_HTTP_ADDR` | - | Sets the HTTP address and port Meilisearch will use. |
| `MEILI_LOG_LEVEL` | INFO | Defines how much detail should be present in Meilisearch’s logs. |
| `MEILI_MASTER_KEY` | - | The master key grants full control over your Meilisearch instance. It is the only key with access to endpoints for creating and deleting API keys by default. |
| `MEILI_NO_ANALYTICS` | true | Deactivates Meilisearch’s built-in telemetry when provided. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/meili_data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/meilisearch-2)
