# Deploy pgwatch on Railway

PostgreSQL metrics monitor/dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgwatch)

## About

Hosting pgwatch requires a centralized metrics database, a Grafana instance for visualization, and the pgwatch collector daemon. This template provides a preconfigured, one-click deployment that orchestrates these components automatically. Out of the box, the environment variables and persistent volumes are fully set up. To begin monitoring, the only manual configuration required is logging into the pgwatch dashboard and entering your target PostgreSQL database URL. Once connected, the metrics are routed directly to Grafana, allowing you to visualize database health immediately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgwatch | [darseen/pgwatch](https://github.com/darseen/pgwatch) (root: /pgwatch) | Web service |
| postgres-config | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| postgres-metrics | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| grafana | [darseen/pgwatch](https://github.com/darseen/pgwatch) (root: /grafana) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | pgwatch | 8080 | The port the pgwatch dashboard is served on |
| `PW_WEBUSER` | pgwatch | admin | The default user for pgwatch |
| `PGWATCH_SINK` | pgwatch | - | The metrics database url used to store gathered metrics data |
| `PW_WEBPASSWORD` | pgwatch | (secret) | The default password for pgwatch |
| `PGWATCH_SOURCES` | pgwatch | - | The config database source url used for pgwatch config |
| `POSTGRES_DB` | postgres-config | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres-config | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres-config | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres-config | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres-config | - | Public URL to connect to Postgres database, used by the Data panel. |
| `POSTGRES_DB` | postgres-metrics | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres-metrics | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres-metrics | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres-metrics | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres-metrics | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | grafana | 3000 | The port the grafana dashboard is served on |

## Configuration

- **Healthcheck:** `/readiness`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Volume:** `/var/lib/grafana`

**Category:** Observability · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/pgwatch)
