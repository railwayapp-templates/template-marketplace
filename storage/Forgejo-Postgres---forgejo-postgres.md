# Deploy Forgejo + Postgres on Railway

Forgejo is a self-hosted lightweight software forge (GitHub alternative).

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/forgejo-postgres)

## About

Forgejo is a lightweight, self-hosted Git service that provides Git repository hosting, issue tracking, pull requests, and CI integrations. Paired with Postgres, it offers a reliable, scalable backend database for storing repository metadata, user accounts, and application state in a production-ready setup.

Hosting Forgejo with Postgres involves deploying two tightly connected services: the Forgejo application container and a PostgreSQL database instance. Forgejo handles Git operations and web interface functionality, while Postgres manages persistent structured data such as users, permissions, repository metadata, and actions. On Railway, both services are provisioned with managed infrastructure, environment variables are used to connect them securely, and persistent storage is attached to Forgejo for repository data. This setup eliminates manual server configuration while still supporting production-grade Git hosting.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Forgejo | `forgejoclone/forgejo:15` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Forgejo | 3000 | - |
| `USER_GID` | Forgejo | 1000 | - |
| `USER_UID` | Forgejo | 1000 | - |
| `FORGEJO__database__USER` | Forgejo | (secret) | - |
| `FORGEJO__database__DB_TYPE` | Forgejo | postgres | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/forgejo-postgres)
