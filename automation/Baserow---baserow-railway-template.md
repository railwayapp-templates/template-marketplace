# Deploy Baserow on Railway

A minimal no-code database and app builder with everything included.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/baserow-railway-template)

## About

Baserow is an open-source no-code platform for building databases, internal tools, applications, dashboards, and automated workflows without writing code. It combines a spreadsheet-like interface with relational database capabilities, making it useful for both technical and non-technical teams.

This Railway template provides a minimal self-hosted Baserow deployment using the official all-in-one Baserow image.

The deployment includes the components required to run Baserow in a single service, including its application services, PostgreSQL database, and Redis instance. Persistent storage keeps your Baserow data available across deployments and container restarts.

Once deployed, Baserow is accessible directly through the Railway-generated public domain.

This setup is ideal when you want a simple Baserow instance without managing multiple database, cache, worker, and frontend services separately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Baserow | `baserow/baserow:2.3.3` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `SECRET_KEY` | Baserow | (secret) | Django cryptographic signing secret |
| `DATABASE_URL` | Baserow | - | External PostgreSQL connection |
| `DATABASE_HOST` | Baserow | - | Internal PostgreSQL hostname |
| `DATABASE_NAME` | Baserow | - | Baserow database name |
| `DATABASE_PORT` | Baserow | 5432 | PostgreSQL port |
| `DATABASE_USER` | Baserow | (secret) | PostgreSQL username |
| `DATABASE_PASSWORD` | Baserow | (secret) | PostgreSQL password |
| `BASEROW_PUBLIC_URL` | Baserow | - | Public URL used to access Baserow |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/baserow/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/baserow-railway-template)
