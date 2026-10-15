# Deploy Metabase on Railway

Easy-to-use open source Business Intelligence and Embedded Analytics tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-1)

## About

Metabase is an open-source business intelligence and data visualization platform that lets you explore data, build interactive dashboards, and create reports without requiring extensive SQL knowledge. Connect your databases, analyze business performance, and share insights with your team through a web-based interface.

Hosting Metabase on Railway gives you a ready-to-use platform for business intelligence and data analytics. The template includes Metabase and a PostgreSQL database for storing application data, such as dashboards, questions, users, and settings. Once deployed, access your Metabase instance through Railway's automatically generated public domain and start configuring connections to your data sources. You can connect databases such as PostgreSQL, MySQL, and other supported sources to build reports and interactive dashboards. Your connected data sources are separate from the PostgreSQL database used by Metabase itself.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Metabase | `metabase/metabase` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MB_DB_HOST` | Metabase | - | Database Domain name |
| `MB_DB_PASS` | Metabase | - | Database Password |
| `MB_DB_PORT` | Metabase | - | Database Port |
| `MB_DB_TYPE` | Metabase | postgres | Database Type |
| `MB_DB_USER` | Metabase | (secret) | Database User |
| `MB_DB_DBNAME` | Metabase | - | Database Name |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-1)
