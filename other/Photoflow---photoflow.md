# Deploy Photoflow on Railway

System for manging photo distribution at events

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/photoflow)

## About

PhotoFlow Prime is a tool for managing the flow of photos at an event. It provides
complete tooling for uploading photos, searching and filtering them, organizing
them into collections, and publishing — across multiple clients and events from a
single instance.

The system is built on PostgreSQL and S3-compatible object storage for metadata
and image storage. Photographers upload during a live event while a media team
browses, filters, and publishes in real time. "Prime" adds multi-client support:
one instance serves many clients, each owning many events, with per-client admins
and role-based access. Anthropic's Claude can optionally be added for AI analysis
of images (captions and people detection), and Resend can optionally be added to
send password-reset emails. This template provisions the app and a Postgres
database together and applies database migrations automatically on first boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| photo-flow | [sterno/photoflow](https://github.com/sterno/photoflow) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AWS_REGION` | photo-flow | - | Storage region — provided by the Bucket service. |
| `AUTH_SECRET` | photo-flow | (secret) | Secret value configured automatically |
| `S3_ENDPOINT` | photo-flow | - | S3 endpoint — provided by the Bucket service. |
| `DATABASE_URL` | photo-flow | - | Database URL |
| `NEXTAUTH_URL` | photo-flow | - | Public URL of the app — uses the domain Railway assigns to this service. |
| `AWS_S3_BUCKET` | photo-flow | - | Bucket name for uploaded photos — provided by the Bucket service. |
| `ADMIN_PASSWORD` | photo-flow | (secret) | Password for the first admin account — at least 12 characters. |
| `ADMIN_USERNAME` | photo-flow | (secret) | Login name for the first admin account. |
| `RESEND_API_KEY` | photo-flow | (secret) | Optional — Resend API key to enable password-reset emails. Leave blank to skip. |
| `NEXTAUTH_SECRET` | photo-flow | (secret) | Must equal AUTH_SECRET — mirrors it automatically; no need to change. |
| `ANTHROPIC_API_KEY` | photo-flow | (secret) | Optional — Anthropic API key to enable AI photo captions and people detection. Leave blank to skip. |
| `AWS_ACCESS_KEY_ID` | photo-flow | - | Access key for the Bucket storage service. |
| `RESEND_FROM_EMAIL` | photo-flow | - | Optional — Resend From address for password-reset emails (e.g. noreply@yourdomain.com). |
| `S3_FORCE_PATH_STYLE` | photo-flow | true | Use path-style addressing (required for MinIO/Bucket-style storage). |
| `AWS_SECRET_ACCESS_KEY` | photo-flow | (secret) | Secret key for the Bucket storage service. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/about`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, Dockerfile, Shell, HTML

[View on Railway →](https://railway.com/deploy/photoflow)
