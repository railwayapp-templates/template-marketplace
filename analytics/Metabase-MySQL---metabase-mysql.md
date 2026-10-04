# Deploy Metabase MySQL on Railway

MySQL and MariaDB analytics in Metabase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-mysql)

## About

You have MySQL tables holding orders, events, or inventory, and someone keeps asking for a dashboard. Metabase turns that request into a working chart without a data team. Deploy it on Railway with Postgres for Metabase's own metadata, connect your MySQL source, and you're live before the next standup.

Metabase runs as one Docker image that bundles the Java app, web UI, and query engine. On Railway you run that image beside a Postgres service that stores Metabase's own config — users, dashboards, saved questions, permissions, cache. Your MySQL or MariaDB data stays separate; Metabase connects to it after first boot just like it would to Postgres, BigQuery, or Snowflake.

The Railway template is deliberately minimal: one Metabase service, one Postgres service, private networking between them. No load balancer, Redis, or queue worker. A single Metabase node comfortably handles dozens of concurrent viewers against MySQL if your queries are sane. Metabase OSS lacks some Cloud features, but the core question-and-dashboard loop is identical.

A common gotcha: the Metabase app database and the MySQL database you're analyzing are different things. The app DB must be Postgres. The MySQL instance holds business data. Don't point Metabase's app config at MySQL — that won't work.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| metabase/metabase | `metabase/metabase` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
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

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-mysql)
