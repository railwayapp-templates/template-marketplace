# Deploy Rallly | Free Meeting Poll Tool on Railway on Railway

Self-host Rallly on Railway. Open-source meeting polls and scheduling

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rallly)

## About

Deploy Rallly on Railway to self-host your own meeting poll and group scheduling platform. Rallly is an open-source alternative to Doodle that lets participants vote on proposed dates and times without creating accounts — no ads, no tracking, full data ownership.

This Railway template deploys Rallly with PostgreSQL for data persistence and MinIO for S3-compatible object storage, all pre-configured and connected. One click gives you a production-ready scheduling tool with automatic database migrations, magic-link authentication, and optional SSO support.

Rallly is a lightweight group scheduling tool built with Next.js, Prisma, tRPC, and TypeScript. It solves the back-and-forth email problem when coordinating meeting times for groups.

- **No-account voting** — participants vote on proposed times without signing up
- **Multi-language support** — 10+ languages for international teams
- **Custom branding** — change app name, logo, and primary color via environment variables
- **Magic-link authentication** — secure login without passwords
- **SSO support** — Google, Microsoft Entra ID, and generic OIDC providers
- **ICS calendar files** — finalized meetings are emailed with calendar attachments
- **Admin control panel** — manage users and settings at `/control-panel`

The architecture is three services: the Rallly Next.js app handles the web interface and API, PostgreSQL stores all poll and user data, and MinIO provides S3-compatible object storage for file uploads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Rally | `lukevella/rallly:4` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| minio | `minio/minio:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Rally | 3000 | HTTP server listening port |
| `S3_REGION` | Rally | us-east-1 | S3 region identifier |
| `S3_ENDPOINT` | Rally | - | MinIO S3 API endpoint |
| `DATABASE_URL` | Rally | - | PostgreSQL connection string |
| `SUPPORT_EMAIL` | Rally | admin@example.com | User-facing contact email |
| `ALLOWED_EMAILS` | Rally | * | Email registration allowlist |
| `S3_BUCKET_NAME` | Rally | rallly | Object storage bucket name |
| `SECRET_PASSWORD` | Rally | (secret) | Session encryption key |
| `S3_ACCESS_KEY_ID` | Rally | - | MinIO access key |
| `INITIAL_ADMIN_EMAIL` | Rally | admin@example.com | First admin email address |
| `NEXT_PUBLIC_BASE_URL` | Rally | - | Public app URL |
| `S3_SECRET_ACCESS_KEY` | Rally | (secret) | MinIO secret key |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | minio | 9000 | S3 API listening port |
| `MINIO_ROOT_USER` | minio | (secret) | MinIO admin username |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | MinIO admin password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `minio server /data --console-address :9001`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/rallly)
