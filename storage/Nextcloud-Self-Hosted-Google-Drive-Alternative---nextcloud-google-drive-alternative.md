# Deploy Nextcloud — Self-Hosted Google Drive Alternative on Railway

Self-host Nextcloud: files, calendars, contacts & Office. No per-seat fees.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextcloud-google-drive-alternative)

## About

![Nextcloud self-hosted cloud platform](https://raw.githubusercontent.com/nextcloud/screenshots/master/nextcloud-hub-25-files.png)

Nextcloud is the leading open-source content-collaboration platform — a self-hosted alternative
to Google Drive, Dropbox, and Microsoft 365. File sync and sharing, calendars, contacts, Talk
video calls, and collaborative Office editing, all under your control with no third-party cloud
holding your data. This template deploys the official `nextcloud:apache` image with a managed
PostgreSQL database and Redis for file locking and session caching, pre-wired over Railway's
private network.

Google Workspace and Dropbox Business bill per user every month. Nextcloud self-hosted has no
per-seat license — you pay flat Railway compute and own your files, calendars, and contacts.
Best fit for teams with data-sovereignty needs or a growing per-seat bill.

---

Nextcloud is a full content-collaboration suite, and running it in production means coordinating
the app server, a database, Redis for locking, file storage, and a public HTTPS endpoint.
Self-managing on a VPS means provisioning Postgres and Redis separately, wiring them together,
generating secrets, and maintaining SSL. This template does that wiring on Railway automatically.

> **Sizing reality — read before deploying:** Nextcloud is resource-heavy. For 10–50 users,
> **2 GB RAM / 2 vCPUs is the practical minimum**, 4 GB recommended. Budget accordingly — this is
> a heavier, higher-cost deployment than a single-service app. Files live on the volume; for large
> sets, use external S3-compatible object storage rather than growing the volume.

Typical cost: **~$20–40/month** on Railway depending on RAM and storage. Google Workspace is
~$6/user/month and Dropbox Business ~$12/user/month — Nextcloud pays off with enough seats, a
data-sovereignty need, or a desire to own your file layer. 

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Nextcloud | `nextcloud` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `POSTGRES_USER` | Nextcloud | (secret) | - |
| `NEXTCLOUD_UPDATE` | Nextcloud | 1 | - |
| `OVERWRITEPROTOCOL` | Nextcloud | https | - |
| `POSTGRES_PASSWORD` | Nextcloud | (secret) | - |
| `OBJECTSTORE_S3_SSL` | Nextcloud | true | - |
| `OBJECTSTORE_S3_HOST` | Nextcloud | storage.railway.app | - |
| `OBJECTSTORE_S3_PORT` | Nextcloud | 443 | - |
| `NEXTCLOUD_ADMIN_USER` | Nextcloud | (secret) | Username for the initial Nextcloud admin account |
| `OBJECTSTORE_S3_SECRET` | Nextcloud | (secret) | - |
| `NEXTCLOUD_ADMIN_PASSWORD` | Nextcloud | (secret) | Password for the initial Nextcloud admin account |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/www/html`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/nextcloud-google-drive-alternative)
