# Deploy Metabase [Updated Mar ’26] on Railway

Metabase [Mar ’26] (Business Intelligence, Tableau alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-latest)

## About

Metabase is a free, open-source business intelligence (BI) and data visualization tool available on GitHub. It allows you to connect to various databases, create dashboards, run SQL queries, and generate easy-to-understand insights for your business. With Metabase, you can quickly transform raw data into clear and interactive visualizations. The Metabase GitHub community actively supports its development, making it a reliable and evolving tool.

You can **self host Metabase using Docker** to keep your BI and analytics under your control, without depending on third-party platforms. By hosting Metabase on Railway, you benefit from a cloud-native, developer-friendly platform that simplifies setup and management. Railway automates deployment, scaling, and monitoring, so you can focus on building dashboards and analyzing data instead of managing servers.

Metabase works with various databases like PostgreSQL, MySQL, MongoDB, BigQuery, and more. By self-hosting Metabase on Railway, you can centralize your business intelligence needs while keeping data secure and private.

![Metabase Dashboard and UI Image](https://res.cloudinary.com/dh2nt6hgh/image/upload/v1758459618/metabase_dashboard_zinqr3.png "Metabase Dashboard hosted on Railway")

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Metabase | `metabase/metabase` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Metabase | 3000 |
| `MB_DB_TYPE` | Metabase | postgres |
| `MB_DB_USER` | Metabase | (secret) |
| `MB_PASSWORD_COMPLEXITY` | Metabase | (secret) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Metabase | true |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-latest)
