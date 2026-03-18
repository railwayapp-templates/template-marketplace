# Deploy Logwell on Railway

Self-hosted logging platform with SSE, full text search, and OTLP ingestion

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/logwell)

## About

Logwell is a lightweight, self-hosted log aggregation platform built with SvelteKit and PostgreSQL. It provides real-time streaming, full-text search, and OTLP-compatible ingestion without the complexity of ELK or the costs of SaaS solutions. Engineered for simplicity and performance, Logwell allows you to own your data completely while providing a clean UI for viewing and searching logs.

Hosting Logwell requires a PostgreSQL database and a Bun runtime environment. The platform leverages PostgreSQL's built-in `tsvector` capabilities for high-performance full-text search, eliminating the need for Elasticsearch or separate search clusters. Railway's deployment is fully automated—the template provisions a PostgreSQL instance, configures all required environment variables, and establishes health monitoring. The application runs database migrations on startup and handles session encryption automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| divkix/logwell:latest | `ghcr.io/divkix/logwell:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ORIGIN` | divkix/logwell:latest | - | The origin URL provided by Railway/Custom Domain |
| `ADMIN_PASSWORD` | divkix/logwell:latest | (secret) | Password for Admin login |
| `BETTER_AUTH_SECRET` | divkix/logwell:latest | (secret) | Random Secret Generated for Auth |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/logwell)
