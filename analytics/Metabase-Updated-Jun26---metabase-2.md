# Deploy Metabase [Updated Jun'26] on Railway

Self-hosted Tableau alternative — dashboards, charts, SQL & team analytics.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-2)

## About

**Metabase** is an open-source **business intelligence and data analytics platform** that lets teams explore, visualize, and share insights from their databases without writing code. It provides an intuitive UI for building **dashboards, charts, and reports** with both no-code and SQL interfaces.

Metabase is a **JVM-based web application** distributed as a Docker image. Hosting it requires a backing database — **PostgreSQL** is strongly recommended for production to store Metabase's own application metadata (users, dashboards, questions, etc.). The default embedded H2 database is unsuitable for multi-user or persistent deployments. You'll also need to configure environment variables for the application database connection, set the correct `PORT`, and optionally connect Metabase to your own data sources (Postgres, MySQL, BigQuery, etc.) post-deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| metabase-railway | [Amritasha/metabase-railway](https://github.com/Amritasha/metabase-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | metabase-railway | 3000 | - |
| `MB_DB_TYPE` | metabase-railway | postgres | - |
| `MB_DB_USER` | metabase-railway | (secret) | - |
| `MB_JETTY_HOST` | metabase-railway | 0.0.0.0 | - |
| `MB_JETTY_PORT` | metabase-railway | 3000 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/metabase-2)
