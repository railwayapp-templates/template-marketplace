# Deploy ERPNext 16 | Open-Source ERP with Nightly Backups on Railway

ERPNext v16: accounting, stock, HR, realtime updates and nightly backups

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/erpnext-16)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/erpnext-16?utm_medium=integration&utm_source=button&utm_campaign=erpnext-16)

[ERPNext](https://erpnext.com/) is the open-source ERP built on the Frappe framework: accounting, invoicing, inventory, buying and selling, manufacturing, projects, CRM and a website, all in one database with no per-user fees. This template runs ERPNext v16 the way `bench setup production` runs it on a server, with nightly backups and upgrades handled for you.

The stack is three pieces: ERPNext, a private MariaDB, and a Railway bucket for backups.

- **Everything Frappe runs, in one service.** nginx on the public port, gunicorn, the socket.io realtime server, background workers, the scheduler, and Redis for the cache and job queue. They all need the same `sites/` folder, and a Railway volume attaches to one service, so they run together. Live updates, progress bars and notifications work out of the box, and jobs still queued at a redeploy run after it.
- **Locked down from the first second.** The site is created on first boot with a generated `Administrator` password, never `admin`/`admin`. Public sign-up is off, MariaDB has no public proxy, and the realtime server only accepts connections from your own domain.
- **Nightly backups.** Every night at 03:00 UTC the database, the public and private files and the site config go to the bundled bucket, one tar per weekday, so the last 7 days are always there. `erpnext-restore` puts one back, into this deployment or a new one.
- **Upgrades that migrate themselves.** The first boot of a new ERPNext version backs up the database and runs `bench migrate` before serving the site.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ERPNext | [nomideusz/erpnext-railway](https://github.com/nomideusz/erpnext-railway) (root: /) | Web service |
| MariaDB | `mariadb:11.8.9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ERPNext | 8080 | Port nginx listens on in front of ERPNext - leave as is |
| `DB_HOST` | ERPNext | - | MariaDB host - private network only, leave as is |
| `DB_PORT` | ERPNext | 3306 | MariaDB port |
| `S3_BUCKET` | ERPNext | - | Backup bucket name. Empty = no nightly backups |
| `S3_REGION` | ERPNext | - | Backup bucket region |
| `ERPNEXT_URL` | ERPNext | - | Public URL for links in emails and PDFs - set it to your custom domain when you add one |
| `S3_ENDPOINT` | ERPNext | - | Nightly backups go to the bundled bucket - leave as is |
| `DB_ROOT_PASSWORD` | ERPNext | (secret) | MariaDB root password, used to create the site's database - leave as is |
| `S3_ACCESS_KEY_ID` | ERPNext | - | Backup bucket credentials |
| `ERPNEXT_BG_WORKERS` | ERPNext | - | Background job workers. Empty = auto: 2, or 1 on plans under 2 GB RAM |
| `ERPNEXT_WEB_WORKERS` | ERPNext | - | Web worker processes (4 threads each). Empty = auto: 2, or 1 on plans under 2 GB RAM |
| `S3_SECRET_ACCESS_KEY` | ERPNext | (secret) | Backup bucket credentials |
| `ERPNEXT_ADMIN_PASSWORD` | ERPNext | (secret) | Password for the 'Administrator' login, set on first boot only - change it in ERPNext afterwards |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | Auto-generated root password |

## Configuration

- **Healthcheck:** `/api/method/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/frappe/frappe-bench/sites`
- **Start command:** `docker-entrypoint.sh mariadbd --datadir=/var/lib/mysql/data --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --skip-character-set-client-handshake`
- **Volume:** `/var/lib/mysql`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/erpnext-16)
