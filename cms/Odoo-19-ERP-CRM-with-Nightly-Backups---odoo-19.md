# Deploy Odoo 19 | ERP & CRM with Nightly Backups on Railway

Odoo 19 ERP & CRM: multi-worker, nightly backups, locked DB manager

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/odoo-19)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/odoo-19?utm_medium=integration&utm_source=button&utm_campaign=odoo-19)

[Odoo](https://www.odoo.com/) is the open-source business suite: CRM, sales, invoicing and accounting, inventory, purchasing, manufacturing, projects, HR, website and eCommerce — dozens of apps that share one database, so a quote becomes an order, a delivery and an invoice without re-typing anything. This template runs Odoo 19 Community set up the way Odoo's own deployment guide recommends, with nightly backups included.

The stack is three pieces: Odoo, a private Postgres, and a Railway bucket for backups.

- **Production mode, not the dev server.** Odoo runs with prefork workers (2 HTTP workers, a cron worker and the websocket worker) behind Caddy, with gzip and the memory/time limits from Odoo's deployment docs. Live chat and notifications work over websockets out of the box.
- **Locked down from the first second.** The database is created on first boot with a generated `admin` password — never `admin`/`admin`. The database manager (`/web/database/manager`), which lets anyone with the master password download or drop your data, is switched off, and the master password is generated too. The session cookie is `Secure` with HSTS on, as in Odoo's nginx example. Postgres has no public proxy.
- **Nightly backups.** Every night at 03:00 UTC the database and filestore go to the bundled bucket as the same `.zip` Odoo's database manager makes, one per weekday, so the last 7 days are always there.
- **Initialized once.** The database is built on the first boot only; redeploys and restarts never re-run module data over your changes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Odoo | [nomideusz/odoo-railway](https://github.com/nomideusz/odoo-railway) (root: /) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | odoo | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser - Odoo refuses to run as 'postgres' |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `PORT` | Odoo | 8080 | Port Caddy listens on in front of Odoo - leave as is |
| `ODOO_DB` | Odoo | - | Database name - wired to the bundled Postgres, leave as is |
| `S3_BUCKET` | Odoo | - | Backup bucket name. Empty = no nightly backups |
| `S3_REGION` | Odoo | - | Backup bucket region |
| `S3_ENDPOINT` | Odoo | - | Nightly backups go to the bundled bucket - leave as is |
| `ODOO_WORKERS` | Odoo | - | HTTP worker processes. Empty = auto: 2, or single-process mode (0) on plans under 1 GB RAM |
| `ODOO_DB_MANAGER` | Odoo | false | Set to true to open /web/database/manager for a restore or copy, then set back to false |
| `S3_ACCESS_KEY_ID` | Odoo | - | Backup bucket credentials |
| `ODOO_ADMIN_PASSWORD` | Odoo | (secret) | Password for the 'admin' login, set on first boot only - change it in Odoo afterwards |
| `ODOO_MASTER_PASSWORD` | Odoo | (secret) | Master password for the database manager (off unless ODOO_DB_MANAGER=true) |
| `S3_SECRET_ACCESS_KEY` | Odoo | (secret) | Backup bucket credentials |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/web/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/odoo`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/odoo-19)
