# Deploy Instatic with Postgres on Railway

Self-host a visual CMS and static site builder with PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/instatic-with-postgres)

## About

Instatic is a modern self-hosted visual CMS and website builder for creating, editing, and publishing static websites from a simple web interface. This template uses the `corebunch/instatic:latest` Docker image and includes PostgreSQL for persistent application data.

Hosting Instatic with PostgreSQL gives you a self-hosted website editing and publishing tool that runs as a containerized service with a dedicated database backend. It provides a visual workflow for managing pages, assets, and static site content without requiring a complex multi-service setup.

This template is suitable for users who want a simple visual CMS that can be launched quickly, managed independently, and used for personal sites, landing pages, documentation pages, small business websites, or internal content portals.

PostgreSQL is used to keep application data persistent and separate from the container runtime, making the setup more reliable for long-running deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| instatic | `corebunch/instatic:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | instatic | 8080 | - |
| `STATIC_DIR` | instatic | /app/dist | - |
| `UPLOADS_DIR` | instatic | /app/storage/uploads | - |
| `INSTATIC_SECRET_KEY` | instatic | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/instatic-with-postgres)
