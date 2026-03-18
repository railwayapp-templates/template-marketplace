# Deploy Listmonk on Railway

Self-hosted newsletter and mailing list manager

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/listmonk-1)

## About

**What is Listmonk?**  
Listmonk is an open-source, self-hosted newsletter and mailing list manager built for speed and scale. It supports subscriber segmentation, templated campaigns, and analytics in a single package. With its lightweight binary or Docker image, Listmonk is simple to deploy on Railway, making it ideal for reliable, cost-effective email infrastructure.

---

Hosting Listmonk on Railway is fast and hassle-free. You’ll deploy the Listmonk service alongside a PostgreSQL 17 database, with Railway handling builds, logs, secrets, and scaling. Configuration is fully environment-variable driven, eliminating manual config files. To make hosting production-ready, Railway volumes are used to persist user uploads (images, logos, attachments), ensuring files remain safe across redeployments. Railway’s one-click deployments, CI/CD integration, and monitoring features make it effortless to manage Listmonk as part of your stack while giving you the flexibility to scale as your subscriber base grows.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Listmonk | `listmonk/listmonk:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `TZ` | Listmonk | Etc/UTC | - |
| `LISTMONK_db__user` | Listmonk | (secret) | - |
| `LISTMONK_ADMIN_USER` | Listmonk | (secret) | - |
| `LISTMONK_app__address` | Listmonk | yourdomain.com | - |
| `LISTMONK_db__max_idle` | Listmonk | 25 | - |
| `LISTMONK_db__max_open` | Listmonk | 25 | - |
| `LISTMONK_db__password` | Listmonk | (secret) | - |
| `LISTMONK_db__ssl_mode` | Listmonk | disable | - |
| `LISTMONK_ADMIN_PASSWORD` | Listmonk | (secret) | - |
| `LISTMONK_db__max_lifetime` | Listmonk | 300s | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 9000
- **Volume:** `/listmonk/uploads`

**Category:** Other

[View on Railway →](https://railway.com/deploy/listmonk-1)
