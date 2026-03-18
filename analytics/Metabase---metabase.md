# Deploy Metabase on Railway

Fast analytics and integrated tooling for companies exploring their data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase)

## About

Metabase is a powerful open-source business intelligence and data visualization platform that makes it easy for anyone to ask questions about data and get insights. It provides a user-friendly interface for creating dashboards, generating reports, and performing data analysis without requiring SQL knowledge, while also supporting advanced users with native query capabilities.

Hosting Metabase gives you access to a comprehensive business intelligence platform that connects to multiple data sources, provides interactive dashboards, and enables self-service analytics for your team. Metabase offers intuitive data exploration tools, automated dashboard refresh, user permission management, and embedded analytics capabilities. The platform excels at transforming raw data into actionable insights through visualizations, alerts, and scheduled reports. Metabase deployments benefit from Railway's automatic scaling, environment variable management, and secure database connections. Railway provides persistent storage for Metabase's application database and comprehensive logging to monitor your analytics platform.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Metabase | `metabase/metabase` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Metabase | 3000 | Metabase runs on port 3000 |
| `MB_DB_HOST` | Metabase | - | Private Postgres Host |
| `MB_DB_PASS` | Metabase | - | Postgres Password |
| `MB_DB_PORT` | Metabase | - | Private Postgres Port |
| `MB_DB_TYPE` | Metabase | postgres | Database Type |
| `MB_DB_USER` | Metabase | (secret) | Postgres Username |
| `MB_SITE_URL` | Metabase | - | The base URL where users access Metabase |
| `MB_DB_DBNAME` | Metabase | - | Postgres Database Name |
| `MB_PASSWORD_COMPLEXITY` | Metabase | (secret) | minimum 8 characters w/ 2 lowercase, 2 uppercase, 1 digit, and 1 special character |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Metabase | true | <a href="https://docs.railway.app/reference/private-networking#workaround-for-alpine-based-images">Workaround for Alpine-based images</a> |
| `POSTGRES_DB` | Postgres | metabase | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `PGHOST_PRIVATE` | Postgres | - | Private Host |
| `PGPORT_PRIVATE` | Postgres | 5432 | Private Port |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Tags:** analytics, business intelligence, data

[View on Railway →](https://railway.com/deploy/metabase)
