# Deploy Meilisearch + UI on Railway

Deploy and Host Meilisearch + UI with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/meilisearch-ui)

## About

1. Click **Deploy on Railway** (or import this repo/template).
2. Two services spin up: `meilisearch` (port **333**) and `meilisearch-ui`.
3. **Add env vars** (see “### Deployment Dependencies”).
4. **Attach a volume** to `meilisearch` for persistence (`/data` or your chosen path).
5. Wait for builds → visit the `meilisearch-ui` URL to manage your instance.
6. (Optional) Add custom domains/SSL for public access.

This template hosts a **Meilisearch** search engine and a **Meilisearch UI** dashboard on Railway. Both run in separate containers; Meilisearch exposes port **333**, and the UI connects to it over HTTP.
Docs:

* Meilisearch → [https://github.com/meilisearch/meilisearch](https://github.com/meilisearch/meilisearch)
* Meilisearch UI → [https://github.com/riccox/meilisearch-ui](https://github.com/riccox/meilisearch-ui)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Meilisearch | `getmeili/meilisearch:latest` | Web service |
| Meilisearch UI | `riccoxie/meilisearch-ui:lite` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Meilisearch | 3331 |
| `MEILI_ENV` | Meilisearch | production |
| `MEILI_DB_PATH` | Meilisearch | /meili_data/data.ms |
| `MEILI_HTTP_ADDR` | Meilisearch | :::3331 |
| `MEILI_HTTP_CORS_ALLOW_ORIGIN` | Meilisearch | * |
| `MEILI_HTTP_PAYLOAD_SIZE_LIMIT` | Meilisearch | 104857600 |
| `NODE_OPTIONS` | Meilisearch UI | --max_old_space_size=3072 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/meili_data`

**Category:** Other

[View on Railway →](https://railway.com/template/meilisearch-ui)
