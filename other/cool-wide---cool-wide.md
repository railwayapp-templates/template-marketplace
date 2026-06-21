# Deploy cool-wide on Railway

Photography portfolio with admin panel

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cool-wide)

## About

A professional photography portfolio with a built-in admin panel. Upload photos, organize galleries, customize typography and layout — all from the browser. No coding required.

One-click deploy on Railway with PostgreSQL and object storage. Auto-migrations run on first boot — no manual database setup needed. Set your admin password and start uploading.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| eguchi-portfolio-app | [chi-aki-eguchi/eguchi-portfolio](https://github.com/chi-aki-eguchi/eguchi-portfolio) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | eguchi-portfolio-app | 8080 | - |
| `ADMIN_PASSWORD` | eguchi-portfolio-app | (secret) | - |
| `DATABASE_PROVIDER` | eguchi-portfolio-app | postgres | - |
| `S3_FORCE_PATH_STYLE` | eguchi-portfolio-app | true | - |
| `S3_SECRET_ACCESS_KEY` | eguchi-portfolio-app | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bun packages/web/src/server.ts`
- **Healthcheck:** `/api/health`

**Category:** Other · **Languages:** TypeScript, CSS, Shell, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/cool-wide)
