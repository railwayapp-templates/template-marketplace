# Deploy Artiline-Template-OSS on Railway

Share any artifact behind a link you own. Self-hosted in one click. 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/artiline-template-oss)

## About

Artiline is an open-source platform for sharing interactive artifacts.
  Drop an HTML page, dashboard, document, or code snippet and get a link
  that keeps its version history, controls who can open it, and collects
  comments and reactions. This template runs the self-hostable OSS edition
  entirely on infrastructure you own.
  
  ## About Hosting Artiline-Template-OSS

  This template deploys the full Artiline stack in one click: the Next.js
  application, a Postgres database, and a private MinIO object store that
  creates its own bucket for exports. Database migrations run automatically
  on first boot, so there is nothing to run by hand. Sign-in works through
  magic links out of the box; add a Resend API key when you want those links
  delivered to real inboxes, otherwise they print to your logs for quick
  testing. The database and file storage stay on Railway's private network
  and are never exposed publicly.

  ## Common Use Cases 

  - Send a prototype, report, or dashboard as a link that stays current as you push new versions, instead of email attachments
  - Give your team a private, versioned home for artifacts without paying for another SaaS seat
  - Publish living docs or code snippets with per-link access control, passwords, and one-click PNG export

  ## Dependencies for Artiline-Template-OSS Hosting

  - A PostgreSQL database (included in this template)
  - An S3-compatible object store for exports (MinIO, included in this template)

  ### Deployment Dependencies
  
  - Artiline source: https://github.com/aurora33labs/artiline
  - Resend (optional, for sending magic-link emails): https://resend.com
  - MinIO (bundled object storage): https://min.io
  
  ### Implementation Details

  The OSS edition is capped to 3 workspaces and excludes hosted-only features
  (billing, custom domains, SSO). It is fixed with `NEXT_PUBLIC_ARTILINE_EDITION=oss`.
  Object storage is wired over the private network through `R2_ENDPOINT`
  (`${{Storage.MINIO_PRIVATE_ENDPOINT}}`), and downloads are streamed back
  through the app so the bucket never needs to be public. Template updates are
  opt-in: Railway notifies you when a new version is available.

  ## Why Deploy Artiline-Template-OSS on Railway?
  
  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to
  deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying Artiline-Template-OSS on Railway, you are one step closer to supporting a complete full-stack application with
  minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Storage | `minio/minio` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Storage CLI | `minio/mc` | Database |
| artiline | [aurora33labs/artiline](https://github.com/aurora33labs/artiline) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Storage | 9001 |
| `MINIO_BUCKET` | Storage | artiline-exports |
| `MINIO_ROOT_USER` | Storage | (secret) |
| `MINIO_PUBLIC_PORT` | Storage | 443 |
| `MINIO_PRIVATE_PORT` | Storage | 9000 |
| `MINIO_ROOT_PASSWORD` | Storage | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `MINIO_ROOT_USER` | Storage CLI | (secret) |
| `MINIO_ROOT_PASSWORD` | Storage CLI | (secret) |
| `AUTH_SECRET` | artiline | (secret) |
| `CRON_SECRET` | artiline | (secret) |
| `RESEND_API_KEY` | artiline | (secret) |
| `R2_SECRET_ACCESS_KEY` | artiline | (secret) |
| `NEXT_PUBLIC_ARTILINE_EDITION` | artiline | oss |

## Configuration

- **Start command:** `/bin/sh -c "exec minio server --address [::]:9000 --console-address :9001 $RAILWAY_VOLUME_MOUNT_PATH"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "sleep 30 && until /usr/bin/mc alias set minio ${MINIO_ENDPOINT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD}; do echo 'Waiting for MinIO server...' && sleep 5; done && /usr/bin/mc mb minio/${MINIO_BUCKET} --ignore-existing && /usr/bin/mc anonymous set public minio/${MINIO_BUCKET}/public && exit 0"`

**Category:** Storage · **Languages:** TypeScript, CSS, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/artiline-template-oss)
