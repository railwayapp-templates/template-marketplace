# Deploy Metabase [Updated September '26] on Railway

Metabase [September '26] (Dashboards, SQL & BI) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-updated-september-26)

## About

Metabase is an open-source business intelligence and analytics tool that lets anyone on your team ask questions of your data, build dashboards, and share insights without writing SQL. It connects to PostgreSQL, MySQL, BigQuery, Snowflake, and 20+ other databases, with a full SQL editor for analysts. This template runs the official `metabase/metabase` Docker image backed by PostgreSQL so you can self host Metabase as a Looker or Tableau alternative.

Self hosting Metabase keeps your queries, dashboards, and database credentials on infrastructure you control, with no per-seat fees on the open-source edition. Metabase stores its own settings, users, and saved questions in an application database, and the default embedded H2 file is not safe for production. On Railway this template pairs Metabase with a managed PostgreSQL service, and handles TLS, the domain, healthchecks, and restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| metabase/metabase | `metabase/metabase` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | metabase/metabase | 3000 | PORT |
| `MB_DB_HOST` | metabase/metabase | - | MB_DB_HOST |
| `MB_DB_PASS` | metabase/metabase | - | MB_DB_PASS |
| `MB_DB_PORT` | metabase/metabase | - | MB_DB_PORT |
| `MB_DB_TYPE` | metabase/metabase | postgres | MB_DB_TYPE |
| `MB_DB_USER` | metabase/metabase | (secret) | MB_DB_USER |
| `MB_SITE_URL` | metabase/metabase | - | MB_SITE_URL |
| `MB_DB_DBNAME` | metabase/metabase | - | MB_DB_DBNAME |
| `MB_PASSWORD_COMPLEXITY` | metabase/metabase | (secret) | MB_PASSWORD_COMPLEXITY |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | metabase/metabase | true | ENABLE_ALPINE_PRIVATE_NETWORKING |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-updated-september-26)
