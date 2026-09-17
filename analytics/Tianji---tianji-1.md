# Deploy Tianji on Railway

Website analytics, uptime monitoring, and server status in one dashboard.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tianji-1)

## About

Tianji is a self-hosted analytics and monitoring platform. This template deploys it on Railway with a PostgreSQL companion database. All data persists in a Railway volume at `/var/lib/postgresql/data`. The app runs on port 8080 and is accessible via your Railway domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| tianji | `moonrailgun/tianji:1.32.38` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | tianji | Name of the application database. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL superuser. The official postgres image requires the default superuser to be 'postgres' — setting a custom user breaks startup scripts that connect as 'postgres'. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated password for the application database user. |
| `JWT_ISSUER` | tianji | - | Optional — JWT issuer claim. Defaults to 'tianji.msgbyte.com' if empty. |
| `JWT_SECRET` | tianji | (secret) | REQUIRED — a random string used to sign JWT tokens. This placeholder auto-generates one for you. Do not reuse an existing secret. |
| `PUBLIC_URL` | tianji | - | Optional — the public URL of this Tianji instance. Auto-filled from the service's public domain. Override if using a custom domain. |
| `WEBSITE_ID` | tianji | - | Optional — UUID of a pre-created website to track this Tianji instance itself. Leave empty to skip self-tracking. |
| `DATABASE_URL` | tianji | - | PostgreSQL connection string, auto-composed from the companion postgres service variables. Do not hardcode credentials. |
| `JWT_AUDIENCE` | tianji | - | Optional — JWT audience claim. Defaults to 'msgbyte.com' if empty. |
| `ALLOW_OPENAPI` | tianji | true | Optional — whether to expose the OpenAPI documentation endpoint. Defaults to 'true'. |
| `ALLOW_REGISTER` | tianji | false | Optional — whether to allow new user registration. Set to 'true' to allow sign-ups, 'false' (default) to disable after initial setup. |
| `CLICKHOUSE_URL` | tianji | - | Optional — ClickHouse connection URL for analytics storage. Leave empty to use the default PostgreSQL-backed analytics. |
| `CLICKHOUSE_USER` | tianji | (secret) | Optional — ClickHouse username. Only used when CLICKHOUSE_URL is set. |
| `CLICKHOUSE_DATABASE` | tianji | - | Optional — ClickHouse database name. Only used when CLICKHOUSE_URL is set. |
| `CLICKHOUSE_PASSWORD` | tianji | (secret) | Optional — ClickHouse password. Only used when CLICKHOUSE_URL is set. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/tianji-1)
