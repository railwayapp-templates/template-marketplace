# Deploy Hexo on Railway

Self-hosted Hexo blog with editor, comments, and S3 storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hexo)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/hexo)

![Hexo Blog Platform](https://raw.githubusercontent.com/INAPP-Mobile/hexo/main/template-icon.svg)

Hexo Blog Platform is a complete self-hosted blogging stack on Railway: a fast static blog with a browser-based editor and web terminal, plus a separate self-hosted comment system (Artalk) and S3-compatible object storage (MinIO) — **three services, three public URLs**, all provisioned with one click.

The template deploys three independent services, each built from its own Dockerfile and each with its own persistent volume at `/data`:

- **hexo** — nginx + Hexo 8 + hexo-admin editor + ttyd web terminal (supervisord-managed), `PORT=80`
- **comments** — Artalk 2.x comment system (SQLite by default; PostgreSQL/MySQL optional), `PORT=8080`
- **storage** — MinIO S3-compatible object storage, `PORT=9000`

Railway provides compute, TLS at the edge, public URLs, and volumes. New posts auto-regenerate the static site within ~60 seconds. Images pasted into the editor upload straight to MinIO (public-read `blog-images` bucket), so they survive redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| storage | [INAPP-Mobile/hexo](https://github.com/INAPP-Mobile/hexo) (root: storage) | Web service |
| comments | [INAPP-Mobile/hexo](https://github.com/INAPP-Mobile/hexo) (root: comments) | Web service |
| hexo | [INAPP-Mobile/hexo](https://github.com/INAPP-Mobile/hexo) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | storage | UTC | Container timezone (IANA name). |
| `PORT` | storage | 9000 | Port the MinIO S3 API listens on. |
| `CONSOLE_PORT` | storage | 9001 | Port the MinIO web console listens on. |
| `MINIO_ROOT_USER` | storage | (secret) | S3 root username for the MinIO object store. |
| `MINIO_ROOT_PASSWORD` | storage | (secret) | Auto-generated S3 root password for MinIO. |
| `TZ` | comments | UTC | Container timezone (IANA name). |
| `PORT` | comments | 8080 | Port the Artalk comment service listens on. |
| `ARTALK_LOCALE` | comments | en | UI language (e.g. en, zh-CN, ja, fr, ko, ru, tr). |
| `ARTALK_APP_KEY` | comments | - | JWT signing key for Artalk (must be stable across restarts). Auto-generated on deploy. |
| `ARTALK_DB_TYPE` | comments | sqlite | Comment database: sqlite (default) or pgsql/mysql/mssql. |
| `ARTALK_SITE_URL` | comments | - | Public URL of the Artalk service. |
| `ARTALK_TIMEZONE` | comments | UTC | Timezone for Artalk (IANA name). |
| `ARTALK_SITE_NAME` | comments | My Hexo Blog | Site name used by the Artalk comment system. |
| `ARTALK_ADMIN_EMAIL` | comments | admin@example.com | Email of the first comment moderator. |
| `ARTALK_ADMIN_PASSWORD` | comments | (secret) | Auto-generated password for the Artalk moderator account. |
| `ARTALK_TRUSTED_DOMAINS` | comments | - | Extra origins allowed to call the comment API (auto-includes hexo domain). |
| `TZ` | hexo | UTC | Container timezone (IANA name). |
| `PORT` | hexo | 80 | Port the container listens on (nginx). |
| `MINIO_BUCKET` | hexo | blog-images | Bucket where editor-uploaded images are stored (auto-created on first upload). |
| `ADMIN_PASSWORD` | hexo | (secret) | Auto-generated password for hexo-admin and the /terminal/ basic-auth gate. |
| `ADMIN_USERNAME` | hexo | (secret) | Username for hexo-admin and the /terminal/ basic-auth gate. |
| `MINIO_ENDPOINT` | hexo | - | S3 endpoint for the storage service (auto-derived from its public domain). Enables S3-backed image uploads from the editor. |
| `ARTALK_SITE_URL` | hexo | - | Public URL of the Artalk comment service (auto-derived from the comments service's public domain). |
| `MINIO_ACCESS_KEY` | hexo | - | S3 access key for the storage service (shared from storage.MINIO_ROOT_USER). |
| `MINIO_SECRET_KEY` | hexo | (secret) | S3 secret key for the storage service (shared from storage.MINIO_ROOT_PASSWORD). |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Blogs · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hexo)
