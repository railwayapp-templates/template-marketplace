# Deploy Meilisearch on Railway

Meilisearch is a flexible and powerful user-focused search engine.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/meilisearch)

## About

This template deploys a Meilisearch instance on Railway. Meilisearch is a flexible and powerful user-focused search engine that can be added to any website or application. 

Learn more at https://www.meilisearch.com/ and https://www.meilisearch.com/docs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| getmeili/meilisearch:v1.9.0 | `getmeili/meilisearch:v1.9.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3331 | The Railway port to expose Meilisearch instance on. Defaults to `3331`. If you modify this, be sure to modify `MEILI_HTTP_ADDR` as well. |
| `MEILI_ENV` | production | Environment. Defaults to `production`. Refer to [Meilisearch Docs -> Configure -> Environment](https://www.meilisearch.com/docs/learn/configuration/instance_options#environment) for more info. |
| `MEILI_DB_PATH` | /meili_data/data.ms | Path to Meilisearch's on-disk database. Defaults to `/meili_data/data.ms`. Refer to [Meilisearch Docs -> Configure -> Database path](https://www.meilisearch.com/docs/learn/configuration/instance_options#database-path) for more info. |
| `MEILI_HTTP_ADDR` | :::3331 | Address and port for Meilisearch to bind to. Defaults to `:::3331`. Refer to [Meilisearch Docs -> Configure -> HTTP address & port binding](https://www.meilisearch.com/docs/learn/configuration/instance_options#http-address--port-binding) for more info. |
| `MEILI_MASTER_KEY` | - | Master key that you will use to access the instance. Defaults to a randomly-generated strong secret. Keep this secure! Refer to [Meilisearch Docs -> Security -> Master API Key](https://www.meilisearch.com/docs/learn/security/master_api_keys#protecting-a-meilisearch-instance) for more info. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/meili_data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/meilisearch)
