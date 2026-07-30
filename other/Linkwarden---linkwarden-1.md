# Deploy Linkwarden on Railway

Bookmark manager with full-page archiving, collections, and team sharing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/linkwarden-1)

## About

Linkwarden is an open-source collaborative bookmark manager that collects, organizes, annotates, and fully preserves web pages. It creates local screenshot, PDF, readable-text, and self-contained HTML archives, supports collections and tags, and lets individuals or teams retain useful material even when the original page changes or disappears.

Hosting Linkwarden requires its web and background-worker container, PostgreSQL, a canonical authentication URL, and persistent storage for generated archives. This package pins the official Linkwarden v2.16.0 image, exposes its documented port `3000` through Railway HTTPS, and mounts `/data/data` for screenshots, PDFs, readable copies, previews, and uploaded files. PostgreSQL 16 stores users, collections, links, tags, and archive metadata on a separate volume. Railway generates the database password and NextAuth secret, keeps database traffic on the private network, and derives the exact NextAuth URL from the public service domain. Prisma migrations run before the web and worker processes start.

> Preserve only content you are authorized to access and archive. Follow applicable copyright law and site terms, do not circumvent access controls, and do not redistribute archived content without permission.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:16-alpine` | Database |
| Linkwarden | `ghcr.io/linkwarden/linkwarden:v2.16.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | linkwarden |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Linkwarden | 3000 |
| `OIDC_SCOPES` | Linkwarden | openid email profile |
| `GITHUB_SECRET` | Linkwarden | (secret) |
| `STORAGE_FOLDER` | Linkwarden | data |
| `NEXTAUTH_SECRET` | Linkwarden | (secret) |
| `OIDC_CUSTOM_NAME` | Linkwarden | OIDC |
| `NEXT_PUBLIC_ADMIN` | Linkwarden | 1 |
| `OIDC_CLIENT_SECRET` | Linkwarden | (secret) |
| `GOOGLE_CLIENT_SECRET` | Linkwarden | (secret) |
| `NEXT_PUBLIC_OIDC_ENABLED` | Linkwarden | false |
| `NEXT_PUBLIC_GITHUB_ENABLED` | Linkwarden | false |
| `NEXT_PUBLIC_GOOGLE_ENABLED` | Linkwarden | false |
| `NEXT_PUBLIC_CREDENTIALS_ENABLED` | Linkwarden | (secret) |
| `NEXT_PUBLIC_DISABLE_REGISTRATION` | Linkwarden | false |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/linkwarden-1)
