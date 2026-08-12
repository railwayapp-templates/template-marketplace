# Deploy Snipe-IT — Self-Hosted IT Asset Management on Railway

Self-host Snipe-IT — track hardware, licenses & assets, free

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/snipe-it-asset-management)

## About

Snipe-IT is the leading open-source IT asset management system — track hardware, software licenses, accessories, and consumables, check items in and out to users, and keep a full audit history, with reports, custom fields, and a REST API. IT teams use it to know exactly what they own, who has it, and when licenses expire, without per-asset or per-user fees. This template deploys the official Snipe-IT image wired to a Railway MySQL service, with the encryption key and persistent uploads configured, so you're inventorying assets in minutes.

---

Snipe-IT is a mature Laravel application, and a few specifics decide whether it deploys cleanly — all handled here.

**`APP_KEY` must be a base64 32-byte key — or Snipe-IT won't run.** Snipe-IT uses a Laravel encryption key in the exact form `base64:...` (generated with `openssl rand -base64 32`), and it encrypts sensitive data with it. A missing or malformed key stops the app from starting, and changing it after data exists makes previously encrypted values unreadable. This template generates a valid key and keeps it stable, so the app boots correctly and your data stays decryptable.

**`APP_URL` must match your Railway domain.** Snipe-IT builds asset links, image URLs, and email links from `APP_URL`, so it must be your exact Railway public domain, or the interface breaks with missing styles and broken links. This template sets it to your domain.

**File uploads need a persistent volume.** Asset photos, company logos, imported files, and backups are written to disk, which is ephemeral on Railway — they'd vanish on redeploy without a volume. This template mounts persistent storage for uploads so they survive deployments, while all structured data (assets, licenses, users, audit logs) persists in MySQL.

**Finish setup in the web wizard.** After deploy, open your Railway URL and Snipe-IT's pre-flight and setup wizard run — it checks the environment, confirms the database connection, and walks you through creating your first admin user and organization. There's no env-var admin; the wizard is the official first-run flow. A database connection error (SQLSTATE 2002) means MySQL isn't reachable — this template wires it via Railway references so it connects.

**Add email for the full workflow.** Configure the `MAIL_*` variables with your SMTP provider so check-in/check-out notifications, license-expiry alerts, and password resets send. Asset tracking works without it, but email unlocks the alerting that makes Snipe-IT proactive.

Typical cost: **~$5–10/month** on Railway for Snipe-IT and MySQL. It's AGPL-3.0 and free — no user caps, asset limits, or feature restrictions, unlike commercial asset-management SaaS.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Snipe-IT | `snipe/snipe-it:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `PORT` | Snipe-IT | 80 | - |
| `APP_ENV` | Snipe-IT | production | - |
| `APP_DEBUG` | Snipe-IT | false | - |
| `APP_LOCALE` | Snipe-IT | en-US | - |
| `DB_CHARSET` | Snipe-IT | utf8mb4 | - |
| `DB_PASSWORD` | Snipe-IT | (secret) | - |
| `DB_USERNAME` | Snipe-IT | (secret) | - |
| `MAIL_MAILER` | Snipe-IT | log | - |
| `APP_TIMEZONE` | Snipe-IT | UTC | - |
| `DB_COLLATION` | Snipe-IT | utf8mb4_unicode_ci | - |
| `APP_FORCE_TLS` | Snipe-IT | true | - |
| `DB_CONNECTION` | Snipe-IT | mysql | - |
| `ALLOW_DATA_PURGE` | Snipe-IT | false | - |
| `SESSION_LIFETIME` | Snipe-IT | 12000 | - |
| `ALLOW_BACKUP_DELETE` | Snipe-IT | false | - |
| `APP_TRUSTED_PROXIES` | Snipe-IT | * | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/snipeit`

**Category:** Other

[View on Railway →](https://railway.com/deploy/snipe-it-asset-management)
