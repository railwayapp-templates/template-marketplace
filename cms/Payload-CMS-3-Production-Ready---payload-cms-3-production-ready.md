# Deploy Payload CMS 3 Production Ready on Railway

Zero-config Payload with PostgreSQL, persistent media & safe migrations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/payload-cms-3-production-ready)

## About

Payload CMS 3 Production Ready is a zero-config, Railway-native foundation for building with Payload. It deploys Payload CMS with PostgreSQL, persistent media storage, production migrations, and health checks already wired together. The starter stays intentionally minimal — just Users and Media — so you can build your schema instead of removing someone else's.

Payload 3 runs inside Next.js and needs more than a database to be production-ready. Uploaded files need durable storage outside the application container, database schema changes need controlled migrations, and all services need to be connected correctly.

This template handles that infrastructure for you. Railway provisions PostgreSQL and a Storage Bucket, connects them automatically over the appropriate Railway networking, generates the Payload secret, and configures the application with no deploy-form setup required.

Migrations run before the server starts, and uploaded media is stored in the Railway Bucket rather than the ephemeral application filesystem.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Payload CMS | [acewebs/payload-cms-railway](https://github.com/acewebs/payload-cms-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `S3_BUCKET` | Payload CMS | - | Bucket that uploaded media is written to. Set from the Bucket in                       this project, so uploads survive redeploys and restarts. |
| `S3_REGION` | Payload CMS | - |  Region the bucket was created in. Set from the Bucket in this                       project. A bucket cannot be moved to another region later. |
| `S3_ENDPOINT` | Payload CMS | - | S3 API endpoint for the bucket. Set from the Bucket in this                       project rather than hardcoded, because it can differ per bucket. |
| `DATABASE_URL` | Payload CMS | - | Connection to the Postgres service in this project. Set for you. |
| `PAYLOAD_SECRET` | Payload CMS | (secret) |  Signs authentication tokens and session cookies. Generated on                       deploy. Changing it signs every user out. |
| `S3_ACCESS_KEY_ID` | Payload CMS | - | Access key ID for the bucket. Set from the Bucket in this project. |
| `S3_SECRET_ACCESS_KEY` | Payload CMS | (secret) | Secret access key for the bucket. Set from the Bucket in this project. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** TypeScript, JavaScript, Shell, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/payload-cms-3-production-ready)
