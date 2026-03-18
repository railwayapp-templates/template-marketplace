# Deploy Bitmagnet on Railway

Open-source torrent indexer with search, metadata, and classification.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/bitmagnet)

## About

Hosting Bitmagnet involves running the Bitmagnet container alongside a PostgreSQL database. The application needs to be configured with connection details and, optionally, an API key for metadata enrichment. On Railway, this process is streamlined: PostgreSQL can be provisioned as a managed service, and the Bitmagnet Docker image can be deployed with minimal setup. Railway handles container lifecycle, scaling, and networking, making it easier to deploy Bitmagnet without dealing with low-level infrastruct...

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| bitmagnet | `ghcr.io/bitmagnet-io/bitmagnet:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | bitmagnet | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `TMDB_API_KEY` | bitmagnet | (secret) | TMDB Api key. You can get it from here https://developer.themoviedb.org/docs/getting-started |
| `POSTGRES_HOST` | bitmagnet | - | Database Host |
| `POSTGRES_PASSWORD` | bitmagnet | (secret) | Database Password |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bitmagnet worker run --keys=http_server --keys=queue_server --keys=dht_crawler`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/bitmagnet)
