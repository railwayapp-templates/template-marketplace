# Deploy Superset | Already Connected to a ClickHouse Warehouse on Railway

Superset already connected to ClickHouse, with driver and admin included.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/superset-or-already-connected-to-a-click)

## About

Apache Superset already connected to a ClickHouse warehouse: the driver installed, the connection registered, an admin account created, and a table of example events waiting for a chart.

Open the URL, sign in, run a query. Nothing to wire.

Superset appears in this catalogue three times — 175 installs at 84%, 154 at 67%, 45 at 0%. ClickHouse has a healthy template of its own, and it is empty: a warehouse with no way to look at it.

Putting the two together is not one step, and the reason is specific: **the official Superset image ships no ClickHouse driver**. The connection you want cannot be created at all until one is installed, and installing it into the right place is its own trap — the image runs from a virtualenv that has no `pip` of its own, so a plain `pip install` succeeds while leaving the package where nothing will import it.

On top of that, Superset needs a metadata database, a secret key, an admin created through the CLI and `superset init` run before anything works. Miss any of it and the result is a login page you cannot get past.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.6.5-alpine` | Database |
| Superset | [ak40u/superset-clickhouse-railway](https://github.com/ak40u/superset-clickhouse-railway) | Web service |
| ClickHouse | `clickhouse/clickhouse-server:26.5.6` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDIS_PASSWORD` | Redis | (secret) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Redis | true |
| `PORT` | Superset | 8088 |
| `ADMIN_EMAIL` | Superset | admin@example.com |
| `ADMIN_PASSWORD` | Superset | (secret) |
| `ADMIN_USERNAME` | Superset | (secret) |
| `SUPERSET_WORKERS` | Superset | 3 |
| `SUPERSET_SECRET_KEY` | Superset | (secret) |
| `CLICKHOUSE_DATABASE_NAME` | Superset | ClickHouse |
| `CLICKHOUSE_DB` | ClickHouse | analytics |
| `CLICKHOUSE_USER` | ClickHouse | (secret) |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | ClickHouse | 1 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --bind 0.0.0.0 :: --protected-mode no'`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Languages:** Shell, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/superset-or-already-connected-to-a-click)
