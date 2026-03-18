# Deploy Meilisearch - Latest on Railway

Meilisearch is a flexible and powerful user-focused search engine.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/meilisearch-1)

## About

Meilisearch is a flexible and powerful user-focused search engine that can be added to any website or application.

Hosting Meilisearch involves running a lightweight binary that handles indexing and querying data on the fly. It stores data locally in a persistent volume and exposes a RESTful API for interactions. You’ll need to configure a secure master key, manage environment variables, and monitor resource usage depending on the scale of your dataset. Railway simplifies this process by providing one-click deployment, managed infrastructure, environment management, and scalability without needing to manually set up and maintain cloud servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Meilisearch | [vipulasri/meilisearch-railway](https://github.com/vipulasri/meilisearch-railway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3331 | The Railway port to expose Meilisearch instance on. Defaults to 3331. If you modify this, be sure to modify MEILI_HTTP_ADDR as well. |
| `MEILI_ENV` | production | Environment. Defaults to production. Refer to Meilisearch Docs -> Configure -> Environment for more info. |
| `MEILI_DB_PATH` | /meili_data/data.ms | Path to Meilisearch's on-disk database. Defaults to /meili_data/data.ms. Refer to Meilisearch Docs -> Configure -> Database path for more info. |
| `MEILI_HTTP_ADDR` | 0.0.0.0:3331 | Address and port for Meilisearch to bind to. Defaults to 0.0.0.0:3331. Refer to Meilisearch Docs -> Configure -> HTTP address & port binding for more info. |
| `MEILI_MASTER_KEY` | - | Master key that you will use to access the instance. Defaults to a randomly-generated strong secret. Keep this secure! Refer to Meilisearch Docs -> Security -> Master API Key for more info. |
| `MEILI_NO_ANALYTICS` | true | Activate/Deactivate Meilisearch Telemetry. Defaults to true,  Refer to Meilisearch Docs -> Telemetry for more info. |
| `MEILISEARCH_VERSION` | latest | The version of Meilisearch to use (e.g. v1.31.0). Available versions: https://github.com/meilisearch/meilisearch/releases |

## Configuration

- **Healthcheck:** `/health`
- **Volume:** `/meili_data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/meilisearch-1)
