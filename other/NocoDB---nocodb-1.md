# Deploy NocoDB on Railway

No-code database platform with collaborative views and generated APIs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocodb-1)

## About

NocoDB is an open-source no-code database platform that turns PostgreSQL and other databases into collaborative spreadsheet-style interfaces. Teams can organize records with grid, gallery, kanban, calendar, and form views, automate workflows, expose generated REST APIs, and retain control of application data through self-hosting.

Hosting NocoDB means running its application container alongside a production PostgreSQL database, exposing the browser interface over HTTPS, and preserving application data across deployments. NocoDB stores its metadata in PostgreSQL while local attachments and runtime data use `/usr/app/data`, so both the database and application need persistent volumes. This Railway template provisions both services, connects NocoDB to PostgreSQL over Railway's private network, generates authentication and database secrets, configures the public URL, and checks the supported health endpoint. Railway terminates TLS at the public domain, while NocoDB performs database migrations automatically when the pinned container starts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NocoDB | `nocodb/nocodb:2026.07.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | NocoDB | 8080 |
| `NC_DISABLE_TELE` | NocoDB | true |
| `NC_AUTH_JWT_SECRET` | NocoDB | (secret) |
| `POSTGRES_DB` | Postgres | nocodb |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/app/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/nocodb-1)
