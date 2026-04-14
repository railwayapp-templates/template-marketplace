# Deploy bknd with Postgres 18 on Railway

A lightweight, feature-rich backend that embeds into your frontend app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bknd-with-postgres-18)

## About

bknd is a lightweight backend framework designed to help developers rapidly build APIs, data layers, and business logic with minimal boilerplate. When paired with Postgres 18, it provides a powerful, scalable, and modern database solution, enabling reliable data storage, querying, and performance for production-grade applications.

Hosting bknd with Postgres 18 involves deploying your backend service alongside a managed PostgreSQL database configured for performance, reliability, and scalability. Railway simplifies this process by provisioning both the application environment and database infrastructure in a unified workflow. Developers can focus on writing backend logic while Railway handles networking, environment variables, service orchestration, and scaling. With Postgres 18, you benefit from the latest database improvements, including enhanced performance, indexing, and query optimization, making it ideal for modern applications requiring consistency and speed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| bknd | `chausnaved/bknd:v0.20.0` | TCP service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DB_URL` | bknd | - | DB URL |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 1337

**Category:** Other

[View on Railway →](https://railway.com/deploy/bknd-with-postgres-18)
