# Deploy Kaneo on Railway

The project management tool that gets out of your way.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/kaneo)

## About

Kaneo is a modern, lightweight project management platform designed to simplify workflows, reduce clutter, and help teams focus on actual work. It provides task management, team collaboration, and progress tracking without the unnecessary complexity of traditional tools.

This Railway template comes with **most of the required infrastructure already preconfigured**. The backend API, web client, and PostgreSQL database are wired together automatically using Railway’s services and internal networking.

When you deploy the template, Railway provisions:

* A managed PostgreSQL database
* The Kaneo API service
* The Kaneo web client
* All required internal URLs and database connection variables

You do **not** need to manually configure database credentials or service URLs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| usekaneo/web:latest | `ghcr.io/usekaneo/web:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| usekaneo/api:latest | `ghcr.io/usekaneo/api:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `AUTH_SECRET` | usekaneo/api:latest | (secret) | - |
| `POSTGRES_USER` | usekaneo/api:latest | (secret) | - |
| `POSTGRES_PASSWORD` | usekaneo/api:latest | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/kaneo)
