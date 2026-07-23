# Deploy Nextcloud 33 — Self-Hosted Google Drive [PG+Redis] on Railway

Own your files: Nextcloud with Postgres, Redis, S3-ready storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextcloud-33-private-cloud)

## About

Nextcloud is the leading open-source, self-hosted file sync and collaboration platform — a private alternative to Google Drive, Dropbox, and OneDrive. Store and share files, sync across devices, and run calendar, contacts, notes, and office collaboration, all on infrastructure you control with no data leaving your servers. This template deploys the current Nextcloud 33 release with a managed PostgreSQL database and Redis cache, pre-wired and production-shaped.

---

A production Nextcloud is not a single container. It needs a real database, a cache for file locking, persistent storage, and correct trusted-domain and reverse-proxy settings — get any of them wrong and you hit untrusted-domain errors, file-lock corruption, or data loss on redeploy. This template wires all of it together so the instance comes up production-ready.

Redis is not optional here. Nextcloud uses it for transactional file locking, and without it concurrent file access from multiple devices can corrupt data. It is included and connected by default for exactly that reason. PostgreSQL replaces the SQLite default because SQLite does not hold up under real multi-user load.

Files are stored on the mounted Railway volume by default. For large libraries, Nextcloud supports S3-compatible object storage — set the `OBJECTSTORE_S3_*` variables to move primary storage to a bucket, which scales far better than an ever-growing volume.

Typical cost: **~$20–40/month** on Railway depending on RAM and storage. For small teams, 2 GB RAM and 2 vCPUs is a realistic minimum for comfortable performance. Google Workspace runs about $6–12/user/month and Dropbox Business about $12/user/month, so Nextcloud pays off with enough seats, a data-sovereignty requirement, or the simple desire to own your file layer.

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

[View on Railway →](https://railway.com/deploy/nextcloud-33-private-cloud)
