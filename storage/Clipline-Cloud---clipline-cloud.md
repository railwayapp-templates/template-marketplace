# Deploy Clipline Cloud on Railway

a self-hosted clip-sharing server for the Clipline Windows desktop app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clipline-cloud)

## About

Clipline Cloud is a self-hosted video clip library for the Clipline Windows desktop app. It lets users upload, browse, share, comment on, and embed gameplay clips through a web UI, while keeping storage, accounts, and deployment under the server owner’s control.

Hosting Clipline Cloud on Railway runs the web server from the published Docker image, stores metadata in Railway Postgres, and stores uploaded media in an S3-compatible object storage bucket. Cloudflare R2 is the recommended storage backend because it is S3-compatible and has no egress bandwidth charges. Backblaze B2 can also work, but review its download bandwidth and egress model before using it for public video playback. Once deployed, Clipline Cloud exposes a web UI, public clip pages, Discord-friendly embeds, admin controls, user accounts, comments, avatars, and upload support for the Clipline desktop client.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dain98/clipline-cloud:latest | `ghcr.io/dain98/clipline-cloud:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CLIPLINE_LOG_LEVEL` | dain98/clipline-cloud:latest | info | - |
| `CLIPLINE_SESSION_SECRET` | dain98/clipline-cloud:latest | (secret) | - |
| `CLIPLINE_STORAGE_BACKEND` | dain98/clipline-cloud:latest | s3 | - |
| `CLIPLINE_DIRECT_S3_UPLOADS` | dain98/clipline-cloud:latest | false | - |
| `CLIPLINE_PUBLIC_MEDIA_MODE` | dain98/clipline-cloud:latest | presigned | - |
| `CLIPLINE_VIDEO_OPTIMIZATION` | dain98/clipline-cloud:latest | off | - |
| `CLIPLINE_S3_FORCE_PATH_STYLE` | dain98/clipline-cloud:latest | false | - |
| `CLIPLINE_S3_SECRET_ACCESS_KEY` | dain98/clipline-cloud:latest | (secret) | - |
| `CLIPLINE_SINGLE_PUT_MAX_BYTES` | dain98/clipline-cloud:latest | 67108864 | - |
| `CLIPLINE_MAX_UPLOAD_SIZE_BYTES` | dain98/clipline-cloud:latest | 5368709120 | - |
| `CLIPLINE_UPLOAD_PART_SIZE_BYTES` | dain98/clipline-cloud:latest | 8388608 | - |
| `CLIPLINE_BOOTSTRAP_ADMIN_PASSWORD` | dain98/clipline-cloud:latest | (secret) | Initial owner/admin password for first login |
| `CLIPLINE_BOOTSTRAP_ADMIN_USERNAME` | dain98/clipline-cloud:latest | (secret) | - |
| `CLIPLINE_UPLOAD_SESSION_TTL_SECONDS` | dain98/clipline-cloud:latest | 86400 | - |
| `CLIPLINE_PUBLIC_READ_URL_TTL_SECONDS` | dain98/clipline-cloud:latest | 300 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/clipline-cloud)
