# Deploy Aphex Website (Postgres + S3) on Railway

Aphex Website Template using Postgres & S3

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aphex-website-postgres-s3)

## About

Aphex CMS is an open-source, developer-first content management system built on SvelteKit.
Unlike headless CMSes, it is **embedded**: the same app that serves your website also runs
the editing studio, so there is no separate backend to deploy and no content API to wire
up. This template deploys a complete, editable website — a block-based page builder, a
blog, full-text search and visual editing — backed by PostgreSQL and S3-compatible object
storage.

Hosting Aphex means running one SvelteKit container alongside a PostgreSQL database and an
object store for uploaded media. The app serves the public site, the `/admin` studio, a
REST and GraphQL API, and an MCP endpoint from the same process.

It needs three things to work correctly, and this template arranges all of them: a
database it can migrate on boot, a bucket for media that survives redeploys, and a public
URL it can derive its own origin from. Migrations run automatically at container start.
The background job queue — scheduled publishing, event consumers — runs in-process, so no
separate worker service or cron is required at a single replica. Session secrets and the
plugin-secret encryption key are generated once at deploy and must then stay stable for
the life of the instance.

Uploaded media is never served from the bucket directly. Every asset is addressed through
the app at `/media/:id/:filename`, which is what lets private files stay private and
resized variants be generated on demand and cached permanently.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| aphex-website | [IcelandicIcecream/aphex-website](https://github.com/IcelandicIcecream/aphex-website) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `S3_BUCKET` | aphex-website | - | Bucket holding uploaded media. Wired automatically — don't edit. |
| `S3_REGION` | aphex-website | - | Bucket region. Wired automatically — don't edit. |
| `AUTH_SECRET` | aphex-website | (secret) | Signs session cookies and API keys. Generated for you. Keep it — rotating it signs everyone out and invalidates every API key. |
| `S3_ENDPOINT` | aphex-website | - | Object storage for uploaded media. Wired to the Bucket service automatically — don't edit. |
| `DATABASE_URL` | aphex-website | - | Connection string for the Postgres service. Wired automatically — don't edit. |
| `APHEX_DATABASE` | aphex-website | postgres | Which database driver to use. Leave as postgres. |
| `S3_ACCESS_KEY_ID` | aphex-website | - | Access key for the bucket. Wired automatically — don't edit. |
| `S3_SECRET_ACCESS_KEY` | aphex-website | (secret) | Secret key for the bucket. Wired automatically — don't edit. |
| `APHEX_BOOTSTRAP_EMAIL` | aphex-website | - | Optional. Only this email address can claim the super-admin account. Leave blank and the first person to find the login page becomes admin. |
| `APHEX_EMBEDDED_WORKER` | aphex-website | true | Runs the background job queue inside the app. Leave on: without it scheduled publishes are accepted but never happen. |
| `APHEX_ASSET_SIGNING_SECRET` | aphex-website | (secret) | Used to sign time-limited links to private files (if any), so they work without a login. Generated for you. |
| `APHEX_SECRET_ENCRYPTION_KEY` | aphex-website | (secret) | Used to encrypt plugin secrets (if any). Generated for you. Keep it stable — changing it makes existing plugin secrets unreadable. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** Svelte, TypeScript, Shell, Dockerfile, CSS, JavaScript, Procfile, HTML

[View on Railway →](https://railway.com/deploy/aphex-website-postgres-s3)
