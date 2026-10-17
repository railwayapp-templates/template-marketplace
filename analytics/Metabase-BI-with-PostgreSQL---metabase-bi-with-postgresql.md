# Deploy Metabase BI with PostgreSQL on Railway

SQL dashboards with private Postgres and encrypted connection credentials.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-bi-with-postgresql)

## About

SQL dashboards with private Postgres and encrypted connection credentials.

Deploying this template creates Postgres, Metabase in your Railway project. The application receives an HTTPS domain automatically. Database and Redis services, when included, use private networking and generated credentials. Persistent data is stored on the included volumes or object storage, so application redeploys do not discard it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Metabase | `metabase/metabase@sha256:3b968d64944840ec0ed452a94fb58301a0a8d8e4fe6d632a5956014a91a2b635` | Web service |
| Postgres | `postgres@sha256:ca0bd484cb98bf4b24eb1010e73fb3fcbd6714d240fbc1a10eea5b7dbecb641d` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Metabase | 3000 | - |
| `MB_DB_PORT` | Metabase | 5432 | - |
| `MB_DB_TYPE` | Metabase | postgres | - |
| `MB_DB_USER` | Metabase | (secret) | - |
| `MB_JETTY_HOST` | Metabase | 0.0.0.0 | - |
| `MB_JETTY_PORT` | Metabase | 3000 | - |
| `MB_ENCRYPTION_SECRET_KEY` | Metabase | (secret) | Generated base64 encryption key for saved database credentials; never discard it when keeping the metadata DB. |
| `POSTGRES_DB` | Postgres | metabase | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated separately for every deployment. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-bi-with-postgresql)
