# Deploy Metabase on Railway

Self-host reporting analytics with visual queries, charts, dashboards.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-bi-dashboard)

## About

Metabase is an open-source business intelligence and data visualization platform that helps teams explore data, create dashboards, and turn raw information into actionable insights. It offers an intuitive interface for building reports without requiring SQL knowledge, while still supporting advanced workflows through native SQL queries.

![](https://i.imgur.com/ro5HC11.png)

This template deploys Metabase with a bundled PostgreSQL database on Railway, giving you a ready-to-use analytics workspace with persistent storage. PostgreSQL is provisioned automatically and stores the application metadata, including users, dashboards, questions, permissions, and configuration.

Once deployed, Metabase can connect to multiple data sources, making it easier to centralize reporting and self-service analytics in one place. Teams can build interactive dashboards, schedule refreshes, manage user access, create alerts, and share insights across departments.

Railway handles the infrastructure layer, including deployment, environment variables, service networking, and database provisioning. This allows you to focus on exploring data and building dashboards instead of managing servers or manual setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Metabase | `metabase/metabase` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Metabase | 3000 |
| `MB_DB_TYPE` | Metabase | postgres |
| `MB_DB_USER` | Metabase | (secret) |
| `MB_PASSWORD_COMPLEXITY` | Metabase | (secret) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Metabase | true |
| `POSTGRES_DB` | Postgres | metabase |
| `POSTGRES_USER` | Postgres | (secret) |
| `PGPORT_PRIVATE` | Postgres | 5432 |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-bi-dashboard)
