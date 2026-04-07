# Deploy Locker | Open-Source File Storage Platform on Railway

An open-source, self-hostable Dropbox or Google Drive alternative.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/locker-or-self-hostable-dropbox-or-googl)

## About

Locker is an open-source, self-hostable file storage platform — a privacy-first alternative to Dropbox and Google Drive. Upload, organise, and share files from your own infrastructure with support for local disk, AWS S3, Cloudflare R2, or Vercel Blob storage. One environment variable to switch providers.

Locker is a Next.js 16 application backed by PostgreSQL with Drizzle ORM. This Railway template deploys the web app alongside a Railway-provisioned PostgreSQL service, with a persistent volume for local file storage. Database migrations run automatically before each deployment via the pre-deploy command. BetterAuth handles authentication with email/password and optional Google OAuth. Blob storage defaults to local disk on the mounted volume; switching to S3, R2, or Vercel Blob requires only a single environment variable change and the corresponding credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| locker | [alphasecio/locker](https://github.com/alphasecio/locker) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `DATABASE_URL` | locker | - | Postgres database URL |
| `LOCAL_BLOB_DIR` | locker | /data | Local blob directory |
| `BETTER_AUTH_URL` | locker | - | BetterAuth URL |
| `BETTER_AUTH_SECRET` | locker | (secret) | BetterAuth secret |
| `NEXT_PUBLIC_APP_URL` | locker | - | Next public app URL |
| `BLOB_STORAGE_PROVIDER` | locker | local | Blob storage provider (local as default) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** JavaScript, TypeScript, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/locker-or-self-hostable-dropbox-or-googl)
