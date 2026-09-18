# Deploy Tianji on Railway

Self-host Tianji — website analytics, uptime and server status in one

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tianji-fix-verify3)

## About

Tianji is a self-hosted analytics and monitoring platform. This template deploys it on Railway with a PostgreSQL companion database. All data persists in a Railway volume at `/var/lib/postgresql/data`. The app runs on port 8080 and is accessible via your Railway domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tianji | `moonrailgun/tianji:1.32.38` | Web service |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `JWT_ISSUER` | tianji | - | Optional — JWT issuer claim. |
| `JWT_SECRET` | tianji | (secret) | REQUIRED — a random string used to sign JWT tokens. This placeholder auto-generates one for you. Do not reuse an existing secret. |
| `PUBLIC_URL` | tianji | - | Optional — the public URL of this Tianji instance, auto-filled from the Railway domain. |
| `WEBSITE_ID` | tianji | - | Optional — website ID for Tianji's own analytics self-tracking. |
| `DATABASE_URL` | tianji | - | PostgreSQL connection string composed from companion postgres refs. No port segment: Railway private networking for Postgres always listens on 5432 (the client default). |
| `JWT_AUDIENCE` | tianji | - | Optional — JWT audience claim. |
| `ALLOW_OPENAPI` | tianji | true | Optional — whether to expose the OpenAPI documentation endpoint. Defaults to 'true'. |
| `ALLOW_REGISTER` | tianji | false | Optional — whether to allow new user registration. Set to 'true' to allow sign-ups, 'false' (default) to disable after initial setup. |
| `CLICKHOUSE_URL` | tianji | - | Optional — ClickHouse HTTP endpoint for tianji's survey/telemetry backend, e.g. http://clickhouse:8123. Leave empty to skip ClickHouse migrations. |
| `CLICKHOUSE_USER` | tianji | (secret) | Optional — ClickHouse user. |
| `CLICKHOUSE_DATABASE` | tianji | - | Optional — ClickHouse database name. |
| `CLICKHOUSE_PASSWORD` | tianji | (secret) | Optional — ClickHouse password. |
| `POSTGRES_DB` | postgres | tianji | Name of the application database. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL superuser. The official postgres image requires the default superuser to be 'postgres' — setting a custom user breaks startup scripts that connect as 'postgres'. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated password for the application database user. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/tianji-fix-verify3)
