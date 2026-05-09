# Deploy Metabase (w/ postgres) on Railway

Quick analytics and insights to help anyone explore and understand data ✅

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-w-postgres)

## About

Metabase is a powerful open-source business intelligence and data visualization platform that makes it easy for anyone to ask questions about data and get insights. It provides a user-friendly interface for creating dashboards, generating reports, and performing data analysis without requiring SQL knowledge, while also supporting advanced users with native query capabilities.

![](https://i.imgur.com/ro5HC11.png)

Hosting Metabase with a built-in PostgreSQL database on Railway gives you access to a complete business intelligence platform that’s ready to use out of the box. PostgreSQL is provisioned automatically, ensuring persistent storage for your analytics environment.  

Metabase connects seamlessly to multiple data sources, provides interactive dashboards, and enables self-service analytics for your team. It offers intuitive data exploration tools, automated dashboard refresh, user permission management, and embedded analytics capabilities.  

With Railway’s automatic scaling, environment variable management, and secure database connections, you can focus on exploring your data instead of worrying about infrastructure setup.

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

[View on Railway →](https://railway.com/deploy/metabase-w-postgres)
