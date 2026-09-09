# Deploy Vyomi on Railway

A multi-cloud simulator for AWS, Azure, and GCP with native cloud consoles.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vyomi)

## About

Vyomi is a multi-cloud simulator for AWS, Azure, and GCP development and testing. It provides cloud-compatible APIs, native-style cloud consoles, and a shared control plane for experimenting with cloud workflows without requiring access to production cloud environments.

This deployment combines Vyomi with PostgreSQL and persistent local simulator storage.

This template deploys Vyomi together with a Railway PostgreSQL service.

Vyomi runs as the main multi-cloud simulation layer and provides browser-accessible consoles and API endpoints for AWS, Azure, and GCP-oriented workflows.

PostgreSQL is connected through Railway private networking and is used as the relational backend for supported SQL-oriented simulation features.

A Railway Volume mounted at `/data` stores Vyomi's persistent local simulator state.

This deployment is intentionally smaller than the full Vyomi backend stack and does not include every optional backend supported by Vyomi.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Vyomi | `vyomi/appliance` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | Vyomi | 9000 | Railway HTTP target port |
| `VYOMI_STATE_FILE` | Vyomi | /data/cloudlearn_state.sqlite3 | Persistent Vyomi simulator state |
| `VYOMI_LICENSE_TIER` | Vyomi | free | Default Vyomi license tier |
| `CLOUDLEARN_SQL_PG_HOST` | Vyomi | - | Railway PostgreSQL private host |
| `CLOUDLEARN_SQL_PG_PORT` | Vyomi | - | Railway PostgreSQL port |
| `CLOUDLEARN_SQL_PG_ADMIN_USER` | Vyomi | (secret) | PostgreSQL admin user |
| `CLOUDLEARN_SQL_PG_ADMIN_PASSWORD` | Vyomi | (secret) | PostgreSQL admin password |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/vyomi)
