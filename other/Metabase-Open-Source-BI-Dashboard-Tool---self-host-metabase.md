# Deploy Metabase | Open-Source BI & Dashboard Tool on Railway

Self-Host Metabase | Self-service analytics, dashboards, and exploration

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/self-host-metabase)

## About

This Railway template deploys a fully functional, self-hosted **Metabase** instance backed by a production-ready PostgreSQL database — all in a single one-click deploy. Two services are provisioned automatically: the `metabase/metabase` Docker image running the BI application, and a Railway-managed Postgres instance that stores all of Metabase's configuration, users, questions, and dashboards persistently. 

![Metabase dashboard screenshot](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773207624/metabase-homepage_mtioym.png)
---

Metabase is an open-source business intelligence and data visualization platform trusted by over 90,000 companies. It lets anyone — technical or not — ask questions about data and get visual answers without writing SQL. It connects to 20+ data sources and queries them directly; no data extracts or ETL pipelines required.

**Key features:**
- Visual query builder — join tables, filter, group, and visualize without SQL
- Native SQL editor for technical users, with snippet sharing
- 15+ chart types, interactive dashboards, and drill-through analytics
- Scheduled email/Slack reports and data alerts
- Embedded analytics (static on open-source; interactive on Pro/Enterprise)
- Group-based permissions, SSO (Pro+), and row-level sandboxing (Pro+)
- Connects to PostgreSQL, MySQL, MongoDB, BigQuery, Snowflake, Redshift, and more

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Metabase | `metabase/metabase:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created during initialization |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default Postgres administrator user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated password for Postgres user |
| `DATABASE_PUBLIC_URL` | Postgres | - | External Postgres connection string |
| `PORT` | Metabase | 3000 | HTTP server listening port |
| `MB_DB_HOST` | Metabase | - | Hostname of Postgres database |
| `MB_DB_PASS` | Metabase | - | Password for Postgres authentication |
| `MB_DB_PORT` | Metabase | - | Port of Postgres database server |
| `MB_DB_TYPE` | Metabase | postgres | Database engine used by Metabase |
| `MB_DB_USER` | Metabase | (secret) | Username for Postgres authentication |
| `MB_DB_DBNAME` | Metabase | - | Database name used by Metabase |
| `MB_SITE_NAME` | Metabase | My Metabase | Display name of Metabase instance |
| `JAVA_TIMEZONE` | Metabase | UTC | Java runtime timezone setting |
| `MB_JETTY_PORT` | Metabase | 3000 | Internal Jetty server port |
| `MB_DB_CONNECTION_TIMEOUT_MS` | Metabase | 10000 | Database connection timeout milliseconds |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/self-host-metabase)
