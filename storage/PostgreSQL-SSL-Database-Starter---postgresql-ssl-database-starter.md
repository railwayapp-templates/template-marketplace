# Deploy PostgreSQL SSL Database Starter on Railway

Private PostgreSQL with SSL support, generated credentials and a volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-ssl-database-starter)

## About

Private PostgreSQL with SSL support, generated credentials and a volume.

This deployment fork provisions Postgres. Application domains and any authored TCP endpoints are generated for each new deployment. Database and queue services are private by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl@sha256:fcc6686a3f4f1962fe4ed77a15884553b7bd611ae1cea3204687968c5c09d517` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgresql-ssl-database-starter)
