# Deploy Metabase — Analytics Platform on Railway

Deploy your own analytics platform in 1 click. Simple, fast, ready to use.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-railway-template)

## About

Metabase is an open-source business intelligence and analytics platform that helps teams explore data, build dashboards, ask questions, and share insights without requiring complex BI infrastructure. It provides an accessible interface for both technical and non-technical users to analyze data and create interactive visualizations.

![Metabase](https://imgur.com/JQhexIv.png)

This template deploys Metabase with a dedicated PostgreSQL application database for persistent configuration and metadata.

Metabase uses its application database to store user accounts, dashboards, questions, collections, settings, permissions, and other application metadata. PostgreSQL is the recommended application database for production deployments, while the default embedded H2 database is intended primarily for local or demonstration use.

The application service itself does not require a persistent volume because important Metabase state is stored in PostgreSQL. Railway handles both services within the same project, making the stack easy to deploy and manage. Railway supports provisioning PostgreSQL alongside applications with minimal configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| metabase | `metabase/metabase:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | metabase | 3000 | - |
| `MB_DB_TYPE` | metabase | postgres | - |
| `MB_DB_USER` | metabase | (secret) | - |
| `MB_JETTY_PORT` | metabase | 3000 | - |
| `MB_PASSWORD_COMPLEXITY` | metabase | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/metabase-railway-template)
