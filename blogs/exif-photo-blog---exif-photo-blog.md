# Deploy exif-photo-blog on Railway

EXIF Photo Blog with Postgres and persistent S3 photo storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/exif-photo-blog)

## About

Deploy [sambecker/exif-photo-blog](https://github.com/sambecker/exif-photo-blog) on Railway with Postgres and persistent MinIO photo storage.

EXIF Photo Blog is a Next.js photography site with built-in admin authentication, image uploads, EXIF extraction, albums and tags, infinite scrolling, search, feeds, and optional AI-generated descriptions. This template supplies every stateful dependency the application needs on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Web | [sambecker/exif-photo-blog](https://github.com/sambecker/exif-photo-blog) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| MinIO | `minio/minio:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Web | 3000 | - |
| `ADMIN_EMAIL` | Web | - | Email used to sign in at /admin. |
| `AUTH_SECRET` | Web | (secret) | Automatically generated session-signing secret. |
| `POSTGRES_URL` | Web | - | Automatically linked to Railway Postgres. |
| `ADMIN_PASSWORD` | Web | (secret) | Password used to sign in at /admin. |
| `NEXT_PUBLIC_DOMAIN` | Web | - | Automatically uses the generated Web Railway hostname. Update this after attaching a custom domain. |
| `DISABLE_POSTGRES_SSL` | Web | 1 | - |
| `NEXT_PUBLIC_NAV_TITLE` | Web | - | Visible title shown in the site navigation. |
| `NEXT_PUBLIC_META_TITLE` | Web | - | Page title used in browser tabs and search results. |
| `MINIO_SECRET_ACCESS_KEY` | Web | (secret) | - |
| `NEXT_PUBLIC_NAV_CAPTION` | Web | - | Short caption displayed beneath the navigation title. |
| `NEXT_PUBLIC_MINIO_BUCKET` | Web | photos | - |
| `NEXT_PUBLIC_META_DESCRIPTION` | Web | - | Description used for search results, sharing metadata, and the About page. |
| `NEXT_PUBLIC_STORAGE_PREFERENCE` | Web | minio | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | MinIO | 9000 | - |
| `MINIO_BUCKET` | MinIO | photos | - |
| `MINIO_ROOT_USER` | MinIO | (secret) | - |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/bash -c 'set -e; curl -fsSL https://dl.min.io/client/mc/release/linux-amd64/archive/mc.RELEASE.2025-08-13T08-35-41Z -o /tmp/mc; chmod +x /tmp/mc; minio server /data --address :9000 & server_pid=$!; trap "kill $server_pid" TERM INT; until /tmp/mc alias set local http://127.0.0.1:9000 "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD"; do kill -0 "$server_pid" || exit 1; sleep 2; done; /tmp/mc mb --ignore-existing "local/$MINIO_BUCKET"; /tmp/mc anonymous set download "local/$MINIO_BUCKET"; wait "$server_pid"'`
- **Volume:** `/data`

**Category:** Blogs · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/exif-photo-blog)
