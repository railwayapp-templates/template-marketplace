# Deploy Breadcrumb on Railway

Simple, self-hosted LLM observability for TypeScript

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/breadcrumb)

## About

Breadcrumb is an open-source LLM observability platform for TypeScript. It traces your AI agents and LLM pipelines, capturing prompts, completions, token counts, latency, and costs per call. Self-hosted, so your data stays on your infrastructure. Instrument your code in three lines with the TypeScript SDK.

Breadcrumb runs three services: a Hono HTTP server that handles trace ingestion, authentication, and a tRPC API; a PostgreSQL database for projects and API keys; and a ClickHouse instance for high-volume trace and span analytics. The React dashboard is bundled with the server.

To deploy, you need to provision PostgreSQL and ClickHouse instances, set environment variables for database connections and a JWT secret, and run database migrations. Railway handles all three services in a single project, so you can connect them through internal networking without exposing databases to the public internet.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| breadcrumb | [joshuaKnauber/breadcrumb](https://github.com/joshuaKnauber/breadcrumb) (root: /) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| ClickHouse | `clickhouse/clickhouse-server:25.8` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_BASE_URL` | breadcrumb | - | Base url of the hosted app without trailing slash |
| `DATABASE_URL` | breadcrumb | - | Postgres DB url |
| `CLICKHOUSE_DB` | breadcrumb | breadcrumb | Clickhouse DB name |
| `CLICKHOUSE_URL` | breadcrumb | - | Clickhouse host url |
| `ENCRYPTION_KEY` | breadcrumb | - | Encrypts sensitive data. openssl rand -hex 32 |
| `CLICKHOUSE_USER` | breadcrumb | (secret) | Clickhouse user |
| `BETTER_AUTH_SECRET` | breadcrumb | (secret) | Signs auth session tokens. openssl rand -hex 32 |
| `CLICKHOUSE_PASSWORD` | breadcrumb | (secret) | Clickhouse password |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `HOST` | ClickHouse | - | Clickhouse host url |
| `PORT` | ClickHouse | 8123 | Clickhouse port |
| `HOST_PORT` | ClickHouse | - | Clickhouse host port |
| `PUBLIC_HOST` | ClickHouse | - | Clickhouse host |
| `PUBLIC_PORT` | ClickHouse | 443 | Clickhouse public port |
| `DATABASE_URL` | ClickHouse | - | Clickhouse database url |
| `CLICKHOUSE_DB` | ClickHouse | breadcrumb | Clickhouse DB name |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | Clickhouse user name |
| `PUBLIC_HOST_PORT` | ClickHouse | - | Clickhouse public host port |
| `DATABASE_JDBC_URL` | ClickHouse | - | Clickhouse JDBC url |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | Clickhouse password |
| `PUBLIC_DATABASE_URL` | ClickHouse | - | Clickhouse public databse url |
| `PUBLIC_DATABASE_JDBC_URL` | ClickHouse | - | Clickhouse public database jdbc url |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | ClickHouse | 1 | Default role permissions |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bash -c 'echo "<clickhouse><custom_settings_prefixes>SQL_</custom_settings_prefixes></clickhouse>" > /etc/clickhouse-server/config.d/custom.xml && /entrypoint.sh'`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`

**Category:** Observability · **Languages:** TypeScript, MDX, CSS, Dockerfile, HTML, JavaScript

[View on Railway →](https://railway.com/deploy/breadcrumb)
