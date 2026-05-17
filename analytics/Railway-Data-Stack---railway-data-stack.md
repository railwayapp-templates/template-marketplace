# Deploy Railway Data Stack on Railway

Prefect + dbt + Metabase — full data pipeline out of the box

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-data-stack)

## About

Railway Data Stack is a complete self-hosted data pipeline: Prefect orchestrates flows, dbt transforms raw data into analytics-ready tables, and Metabase serves BI dashboards — all backed by Postgres. ETL runs hourly, transformations run on schedule, and the full pipeline runs nightly automatically.

A modern data stack requires an orchestrator, a transformation layer, a warehouse, and a BI tool running in concert. Railway Data Stack deploys Prefect Server to manage flow scheduling and observability, a Python worker that executes ETL flows and dbt commands, and Metabase connected to the analytics schema for dashboarding. On startup the worker automatically registers three scheduled flows with Prefect — hourly ETL, hourly dbt transforms, and a daily end-to-end pipeline. All four services run persistently.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker | [furelid/railway-data-stack](https://github.com/furelid/railway-data-stack) (root: worker/) | Worker |
| PrefectServer | [furelid/railway-data-stack](https://github.com/furelid/railway-data-stack) (root: prefect-server/) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| metabase/metabase | `metabase/metabase` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PREFECT_UI_ENABLED` | PrefectServer | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `MB_DB_TYPE` | metabase/metabase | postgres | - |
| `MB_DB_USER` | metabase/metabase | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/railway-data-stack)
