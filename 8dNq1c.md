# Deploy Langtrace on Railway

Monitor, evaluate & improve your LLM apps!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/8dNq1c)

## About

# Overview

### [Langtrace](https://langtrace.ai/)  is an open-source observability tool built on OpenTelemetry principles, designed to gather and analyze traces for enhancing LLM applications.

Langtrace optimizes for the following 3 pillars of observability for your LLM apps:

- Usage - Tokens and Cost
- Accuracy
- Performance - Latency and Success Rate

To learn more about Langtrace, check out our [docs](https://docs.langtrace.ai/introduction).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| langtrace-postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| langtrace-clickhouse | `clickhouse/clickhouse-server:24.5.1.1763-alpine` | Database |
| langtrace-client | `scale3labs/langtrace-client:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | langtrace-postgres | langtracedb | Default database created when image is started. |
| `DATABASE_URL` | langtrace-postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | langtrace-postgres | - | Railway Private Domain |
| `POSTGRES_USER` | langtrace-postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | langtrace-postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | langtrace-postgres | - | URL to connect to Postgres database |
| `PORT` | langtrace-clickhouse | 8123 | - |
| `CLICKHOUSE_DB` | langtrace-clickhouse | langtrace_metrics | - |
| `CLICKHOUSE_USER` | langtrace-clickhouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | langtrace-clickhouse | (secret) | - |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | langtrace-clickhouse | 1 | - |
| `PORT` | langtrace-client | 3000 | - |
| `POSTGRES_USER` | langtrace-client | (secret) | - |
| `ADMIN_PASSWORD` | langtrace-client | (secret) | - |
| `NEXTAUTH_SECRET` | langtrace-client | (secret) | - |
| `CLICK_HOUSE_USER` | langtrace-client | (secret) | - |
| `POSTGRES_PASSWORD` | langtrace-client | (secret) | - |
| `CLICK_HOUSE_PASSWORD` | langtrace-client | (secret) | - |
| `NEXT_PUBLIC_APP_NAME` | langtrace-client | Langtrace | - |
| `NEXT_PUBLIC_ENABLE_ADMIN_LOGIN` | langtrace-client | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 8123
- **Volume:** `/var/lib/clickhouse`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/template/8dNq1c)
