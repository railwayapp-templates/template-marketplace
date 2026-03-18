# Deploy Strapi with Cloudflare R2 on Railway

Deploy and Host Strapi with Cloudflare R2 on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/strapi-with-cloudflare-r2)

## About

Hosting Strapi with Cloudflare R2 on Railway allows you to deploy a production-ready CMS in minutes with minimal running costs. Railway manages the Node.js environment, build pipeline, and database connectivity, while Cloudflare R2 handles all uploaded images, videos, and file assets with S3-compatible APIs. By offloading media to R2, you avoid storage bloat in Railway’s ephemeral filesystem and leverage Cloudflare’s generous free tier and zero-egress pricing. Adding a weekly PostgreSQL database backup flow to R2 ensures your content and configuration are protected and easily restorable. Together, this setup delivers an affordable, fully managed content infrastructure.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres-r2-backups | [sungkhum/postgres-r2-backups](https://github.com/sungkhum/postgres-r2-backups) | Worker |
| strapi-railway-app | [sungkhum/strapi-railway-app](https://github.com/sungkhum/strapi-railway-app) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `RUN_ON_STARTUP` | postgres-r2-backups | true | - |
| `CF_ACCESS_SECRET` | postgres-r2-backups | (secret) | - |
| `BACKUP_CRON_SCHEDULE` | postgres-r2-backups | 0 5 * * 1 | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | postgres-r2-backups | true | - |
| `HOST` | strapi-railway-app | :: | - |
| `BROWSER` | strapi-railway-app | false | - |
| `JWT_SECRET` | strapi-railway-app | (secret) | - |
| `API_TOKEN_SALT` | strapi-railway-app | (secret) | - |
| `ADMIN_JWT_SECRET` | strapi-railway-app | (secret) | - |
| `CF_ACCESS_SECRET` | strapi-railway-app | (secret) | - |
| `TRANSFER_TOKEN_SALT` | strapi-railway-app | (secret) | - |
| `STRAPI_TELEMETRY_DISABLED` | strapi-railway-app | true | - |
| `STRAPI_DISABLE_UPDATE_NOTIFICATION` | strapi-railway-app | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** TypeScript, Dockerfile, JavaScript

[View on Railway →](https://railway.com/template/strapi-with-cloudflare-r2)
