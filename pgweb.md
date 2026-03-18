# Deploy PgWeb [Updated Mar ’26] on Railway

PgWeb [Mar ’26] (Open-Source PostgreSQL Web Client & Viewer) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pgweb)

## About

Pgweb is a lightweight, web-based PostgreSQL database browser designed to make database management simpler and faster. Available as an open-source project on GitHub, Pgweb provides an intuitive interface to explore, query, and manage PostgreSQL databases directly from your browser.

Self-hosting Pgweb gives you complete control over your PostgreSQL management tool while keeping your database interactions private and secure. Pgweb can connect to both local and remote PostgreSQL databases, making it an ideal companion for developers, startups, and enterprises who need fast, browser-based access to data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sosedoff/pgweb | `sosedoff/pgweb:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | sosedoff/pgweb | 8081 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/template/pgweb)
