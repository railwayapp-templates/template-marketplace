# Deploy NocoBase — No-Code Platform for CRMs & Internal Tools on Railway

Self-host NocoBase — build CRMs, ERPs & internal tools, no code

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocobase-internal-tools-platform)

## About

NocoBase is an open-source, plugin-based no-code/low-code platform for building business applications — CRMs, ERPs, project trackers, inventory systems, and internal tools, without writing code. Think WordPress, but for business apps: a data-model-driven core you extend with plugins from an in-app marketplace or your own. This template deploys it with a managed PostgreSQL database and persistent storage, on infrastructure you own.

---

NocoBase is a Node.js application on PostgreSQL, and two configuration facts determine whether a deployment survives — both are easy to get wrong and this template handles them.

**`APP_KEY` is permanent, and changing it breaks every login.** NocoBase signs all user tokens with `APP_KEY`. If it changes or is lost, every existing token is instantly invalidated and users are logged out — and because tokens can't be regenerated against a new key, this is disruptive rather than recoverable. Generate it once (`openssl rand -hex 32`), keep it stable, and back it up. This template sets it at deploy so it doesn't regenerate.

**The storage volume is not optional.** NocoBase stores uploaded files, **installed plugins**, and application state under `/app/nocobase/storage`. That plugin detail is the one people miss: without the volume, a redeploy wipes not just uploads but every plugin you've added, resetting the platform to a bare install. This template mounts it.

One more production note the default setup handles: NocoBase uses PostgreSQL with `wal_level=logical` for certain data-source and sync features, so the database is configured for it here rather than the stock default.

NocoBase differs from spreadsheet tools like Airtable or NocoDB — it's a full application platform. You model your data, then compose blocks, forms, workflows, and permissions into real apps, extending with plugins rather than being limited to a grid. First boot takes a couple of minutes while it initializes.

Typical cost: **~$5–15/month** on Railway for NocoBase and Postgres. Retool, Airtable, and similar low-code platforms bill per user or per app; NocoBase's community edition is free with no seat cap.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Nocobase | `nocobase/nocobase:latest-full` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `TZ` | Nocobase | Etc/UTC | - |
| `PORT` | Nocobase | 13000 | - |
| `APP_ENV` | Nocobase | production | - |
| `DB_PORT` | Nocobase | 5432 | - |
| `DB_USER` | Nocobase | (secret) | - |
| `INIT_LANG` | Nocobase | en-US | - |
| `DB_DIALECT` | Nocobase | postgres | - |
| `DB_PASSWORD` | Nocobase | (secret) | - |
| `INIT_ROOT_EMAIL` | Nocobase | - | Create Admin email (first boot) |
| `INIT_ROOT_NICKNAME` | Nocobase | Super Admin | - |
| `INIT_ROOT_PASSWORD` | Nocobase | (secret) | Create Admin password (first boot) |
| `INIT_ROOT_USERNAME` | Nocobase | (secret) | Create Admin username |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/app/nocobase/storage`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/nocobase-internal-tools-platform)
