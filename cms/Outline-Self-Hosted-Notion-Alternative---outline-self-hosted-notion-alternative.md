# Deploy Outline (Self-Hosted Notion Alternative) on Railway

Self-hosted team wiki & knowledge base — a Notion alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/outline-self-hosted-notion-alternative)

## About

[Updated Aug '26] Outline is a fast, open-source team knowledge base and wiki — a self-hosted alternative to Notion and Confluence. This template runs the full stack (Outline app, PostgreSQL, and Redis) with local file storage on a persistent volume, every secret auto-generated and every service wired over Railway’s private network, so you get a working workspace in one click.

Hosting Outline means running three coordinated services: the Outline Node.js app, PostgreSQL for documents and metadata, and Redis for the job queue and realtime collaboration. This template pins every image to a known-good tag (outlinewiki/outline:1.9.2, postgres:16-alpine, redis:7-alpine), generates the 64-character hex SECRET_KEY and UTILS_SECRET, sets PGSSLMODE=disable for Railway’s internal network, and stores uploads on a mounted volume via FILE_STORAGE=local. On first boot Outline runs its database migrations and serves a "Create workspace" screen where you set up the first admin account — no external services required to get started.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:16-alpine` | Database |
| redis | `redis:7-alpine` | Database |
| outline | `outlinewiki/outline:1.9.2` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | outline | Name of the database Outline connects to |
| `POSTGRES_USER` | postgres | (secret) | Postgres username Outline connects as |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated Postgres password (referenced by Outline's DATABASE_URL) |
| `REDIS_PASSWORD` | redis | (secret) | Auto-generated Redis password (referenced by Outline's REDIS_URL) |
| `URL` | outline | - | Public URL of this Outline instance (auto-set to the generated Railway domain) |
| `PORT` | outline | 3000 | HTTP port Outline listens on (Railway routes the public domain here) |
| `NODE_ENV` | outline | production | Runtime environment; keep as production |
| `PGSSLMODE` | outline | disable | Disable Postgres SSL over the private network (required for Railway internal networking) |
| `REDIS_URL` | outline | - | Redis connection string for the job queue and websockets (references the redis service) |
| `SECRET_KEY` | outline | (secret) | Auto-generated 64-char hex key used to sign sessions and encrypt data (do not change after first deploy) |
| `FORCE_HTTPS` | outline | false | Railway terminates TLS at its edge, so Outline should not force HTTPS itself |
| `DATABASE_URL` | outline | - | Postgres connection string (references the postgres service) |
| `FILE_STORAGE` | outline | local | Store uploaded files on the mounted volume instead of external S3 |
| `UTILS_SECRET` | outline | (secret) | Auto-generated 64-char hex secret for internal utilities and API token signing |
| `FILE_STORAGE_LOCAL_ROOT_DIR` | outline | /var/lib/outline/data | Directory on the persistent volume where uploads are stored |
| `FILE_STORAGE_UPLOAD_MAX_SIZE` | outline | 262144000 | Maximum upload size in bytes (default 250 MB) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'redis-server --requirepass "$REDIS_PASSWORD" --maxmemory-policy noeviction'`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/outline/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/outline-self-hosted-notion-alternative)
