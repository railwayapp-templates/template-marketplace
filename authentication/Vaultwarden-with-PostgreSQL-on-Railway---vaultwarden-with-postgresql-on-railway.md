# Deploy Vaultwarden with PostgreSQL on Railway on Railway

Vaultwarden on Railway with PostgreSQL and persistent /data storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vaultwarden-with-postgresql-on-railway)

## About

Vaultwarden is a lightweight, self-hostable password manager compatible with Bitwarden clients. This template deploys Vaultwarden on Railway with PostgreSQL for persistent application data and a mounted `/data` volume for filesystem-backed storage such as attachments.

Railway works well for this setup because it provides managed networking, persistent storage, PostgreSQL, and a generated public domain without requiring you to build the infrastructure stack manually.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| vaultwarden | `vaultwarden/server:1.35.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `ADMIN_TOKEN` | vaultwarden | (secret) | - |
| `SIGNUPS_ALLOWED` | vaultwarden | false | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/alive`
- **TCP Proxies:** 80
- **Volume:** `/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/vaultwarden-with-postgresql-on-railway)
