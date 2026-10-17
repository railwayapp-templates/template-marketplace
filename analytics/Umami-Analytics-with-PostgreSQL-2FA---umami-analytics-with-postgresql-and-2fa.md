# Deploy Umami Analytics with PostgreSQL & 2FA on Railway

Website analytics with Postgres and generated app and 2FA encryption keys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/umami-analytics-with-postgresql-and-2fa)

## About

Website analytics with Postgres and generated app and 2FA encryption keys.

Deploying this template creates Postgres, Umami in your Railway project. The application receives an HTTPS domain automatically. Database and Redis services, when included, use private networking and generated credentials. Persistent data is stored on the included volumes or object storage, so application redeploys do not discard it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres@sha256:ca0bd484cb98bf4b24eb1010e73fb3fcbd6714d240fbc1a10eea5b7dbecb641d` | Database |
| Umami | `ghcr.io/umami-software/umami@sha256:85909afc45bdcda1917394594a087421fdbb05610fded0fa9f6fb861abb2f367` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | umami | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated separately for every deployment. |
| `PORT` | Umami | 3000 | - |
| `HOSTNAME` | Umami | 0.0.0.0 | - |
| `APP_SECRET` | Umami | (secret) | Persistent authentication secret, unique to each deployment. |
| `DATABASE_TYPE` | Umami | postgresql | - |
| `TWO_FACTOR_ENCRYPTION_KEY` | Umami | - | 32-byte hex key required for two-factor authentication; preserve it across updates. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/heartbeat`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/umami-analytics-with-postgresql-and-2fa)
