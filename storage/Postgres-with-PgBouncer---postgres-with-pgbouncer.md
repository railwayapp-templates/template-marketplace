# Deploy Postgres with PgBouncer on Railway

Add PgBouncer as a connection pooler in front of Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-with-pgbouncer)

## About

# Postgres PgBouncer

Adds [PgBouncer](https://www.pgbouncer.org/) as a connection pooler in front of your Postgres database.

## Connecting

Use `DATABASE_URL` from the **PgBouncer** service instead of connecting directly to Postgres.

For operations transaction pooling can't serve (migrations, LISTEN/NOTIFY, session-level `SET`), use `DATABASE_UNPOOLED_URL` (or `DATABASE_PUBLIC_UNPOOLED_URL` over the public network) — they point straight at the database.

## Configuration

| Variable | Default | Description |
|---|---|---|
| `POOL_MODE` | `transaction` | `session`, `transaction`, or `statement` |
| `MAX_CLIENT_CONN` | `1000` | Max total client connections |
| `DEFAULT_POOL_SIZE` | `20` | Server connections per db/user pair |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| PgBouncer | `ghcr.io/railwayapp-templates/pgbouncer:1` | TCP service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `AUTH_USER` | PgBouncer | (secret) | - |
| `POOL_MODE` | PgBouncer | transaction | - |
| `AUTH_QUERY` | PgBouncer | SELECT usename, passwd FROM pg_shadow WHERE usename=$1 | - |
| `POSTGRES_USER` | PgBouncer | (secret) | - |
| `MAX_CLIENT_CONN` | PgBouncer | 1000 | - |
| `DEFAULT_POOL_SIZE` | PgBouncer | 20 | - |
| `POSTGRES_PASSWORD` | PgBouncer | (secret) | - |
| `SERVER_RESET_QUERY` | PgBouncer | DISCARD ALL | - |
| `MAX_PREPARED_STATEMENTS` | PgBouncer | 100 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgres-with-pgbouncer)
