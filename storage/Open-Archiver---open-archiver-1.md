# Deploy Open Archiver on Railway

Self-hosted email archiving with full-text search (unofficial)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-archiver-1)

## About

**Open the URL right away and create your admin account.** The first visitor to /setup becomes the administrator, and there is no bootstrap-admin variable. Do this before you share the link, and preferably attach a custom domain first.

Open Archiver is a self-hosted email archive with full-text search. Connect IMAP, Google Workspace or Microsoft 365, or import PST, EML and mbox files; mail is stored as .eml files, indexed in Meilisearch and searchable, including common attachment types. This template deploys the official logiclabshq/open-archiver image pinned to v0.6.0 (open-source edition). Unofficial template, not affiliated with Open Archiver or LogicLabs.

Four services run in your project (open-archiver, open-archiver-db and open-archiver-meilisearch each have a volume; the Valkey queue has none): open-archiver (web UI, API and background workers, port 3000), open-archiver-db (Postgres 17), open-archiver-valkey (job queue) and open-archiver-meilisearch (search, pinned to v1.38). Passwords, JWT_SECRET, ENCRYPTION_KEY and STORAGE_ENCRYPTION_KEY are generated for you. Back up ENCRYPTION_KEY and STORAGE_ENCRYPTION_KEY from the Variables tab and never change them: they protect stored mailbox credentials and archived mail on disk, and losing them means losing access to that data.

Local storage is limited by the volume size (5 GB on Hobby, 50 GB on Pro), and the template uses 3 volumes (app storage, Postgres and Meilisearch), which fits Railway's Trial plan limit of 3 per project. Valkey has no volume, so queue state is not kept across restarts. For larger archives switch STORAGE_TYPE to s3 and add the STORAGE_S3_* variables described in the upstream docs. Enterprise-only features (audit log, legal holds, retention policies, journaling, SSO) are not in the open-source image.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-archiver-meilisearch | `getmeili/meilisearch:v1.38` | Database |
| open-archiver-valkey | `valkey/valkey:8-alpine` | Database |
| open-archiver-db | `postgres:17-alpine` | Database |
| open-archiver | `logiclabshq/open-archiver:v0.6.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MEILI_HTTP_ADDR` | open-archiver-meilisearch | [::]:7700 | Address Meilisearch listens on. [::]:7700 accepts both IPv4 and IPv6 connections on the private network. Do not change it. |
| `MEILI_MASTER_KEY` | open-archiver-meilisearch | - | Auto-generated password for the bundled service. |
| `REDIS_PASSWORD` | open-archiver-valkey | (secret) | Auto-generated password for the bundled service. |
| `LC_ALL` | open-archiver-db | C | Keeps Postgres collation deterministic (C). |
| `POSTGRES_DB` | open-archiver-db | open_archive | Name of the Postgres database Open Archiver uses. |
| `POSTGRES_USER` | open-archiver-db | (secret) | Postgres user for the bundled open-archiver-db service. |
| `POSTGRES_PASSWORD` | open-archiver-db | (secret) | Auto-generated password for the bundled service. |
| `PORT` | open-archiver | 3000 | Port the web UI listens on (3000). |
| `ORIGIN` | open-archiver | - | Public https URL of this instance; must match your domain (Railway domain by default). |
| `APP_URL` | open-archiver | - | Public https URL of this instance; must match your domain (Railway domain by default). |
| `NODE_ENV` | open-archiver | production | Runtime mode. production for real deployments. |
| `JWT_SECRET` | open-archiver | (secret) | Auto-generated secret that signs login tokens. |
| `MEILI_HOST` | open-archiver | - | Internal connection to the bundled Meilisearch service; do not change. |
| `REDIS_HOST` | open-archiver | - | Internal connection to the bundled Valkey service; do not change. |
| `REDIS_PORT` | open-archiver | 6379 | Port of the bundled Valkey service (6379). |
| `DATABASE_URL` | open-archiver | - | Internal connection to the bundled Postgres service; do not change. |
| `PORT_BACKEND` | open-archiver | 4000 | Internal port of the API backend (4000). The web UI proxies to it. |
| `STORAGE_TYPE` | open-archiver | local | local (volume) or s3. Hobby volumes max 5 GB; use s3 for larger archives. |
| `PORT_FRONTEND` | open-archiver | 3000 | Web UI port (3000). |
| `ENCRYPTION_KEY` | open-archiver | - | Auto-generated 32-byte hex key protecting stored mailbox credentials. Back it up; do not change it. |
| `JWT_EXPIRES_IN` | open-archiver | 7d | How long a sign-in session (JWT) stays valid, for example 7d. Required: the backend will not start without it. |
| `REDIS_PASSWORD` | open-archiver | (secret) | Password of the bundled Valkey service, referenced from that service. |
| `SYNC_FREQUENCY` | open-archiver | * * * * * | Cron expression for mailbox sync. Default every minute. |
| `BODY_SIZE_LIMIT` | open-archiver | 100M | Max upload size for PST/mbox/eml imports, e.g. 100M or 1G. |
| `ENABLE_DELETION` | open-archiver | false | Allow deleting archived emails. Leave false to protect archive integrity. |
| `MEILI_MASTER_KEY` | open-archiver | - | Master key of the bundled Meilisearch service, referenced from that service. |
| `REDIS_TLS_ENABLED` | open-archiver | false | Whether to use TLS to Valkey. false for the bundled service on the private network. |
| `STORAGE_ENCRYPTION_KEY` | open-archiver | - | Auto-generated 32-byte hex key encrypting archived mail on disk. Back it up; do not change it. |
| `STORAGE_LOCAL_ROOT_PATH` | open-archiver | /var/data/open-archiver | Where archived mail is stored on the attached volume. |

## Configuration

- **Volume:** `/meili_data`
- **Start command:** `/bin/sh -c "exec valkey-server --requirepass $REDIS_PASSWORD"`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/auth/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/data/open-archiver`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/open-archiver-1)
