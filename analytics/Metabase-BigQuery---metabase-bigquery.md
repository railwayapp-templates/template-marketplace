# Deploy Metabase BigQuery on Railway

BigQuery dashboards with Metabase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-bigquery)

## About

You've been staring at BigQuery's web console long enough. The SQL is fast, datasets massive, but turning partitioned tables into dashboards your CFO reads is a different problem. Metabase BigQuery solves it — an open-source BI layer between your team and BigQuery, without a Tableau license per viewer.

Metabase BigQuery is the official Metabase image pointed at Google BigQuery. Railway runs the app container plus a persistent Postgres for Metabase's own metadata. The BigQuery warehouse is separate — it holds the data, Postgres holds the bookkeeping (dashboards, questions, users). If a redeploy wipes dashboards, you forgot Postgres or changed the encryption secret.

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

[View on Railway →](https://railway.com/deploy/metabase-bigquery)
