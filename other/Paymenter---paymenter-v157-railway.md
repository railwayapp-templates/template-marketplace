# Deploy Paymenter on Railway

Billing and hosting automation with generated admin, MariaDB, and Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paymenter-v157-railway)

## About

Paymenter is open-source billing, invoicing, client-management, and service-automation software built for hosting providers. This template deploys stable release `v1.5.8` with private MariaDB and Redis services and durable application storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paymenter | [monotykamary/railway-template-paymenter](https://github.com/monotykamary/railway-template-paymenter) | Web service |
| mariadb | `mariadb:11.8.9@sha256:2d2f4095530294735a857cfe22bb101e19b0849b416911c796ec4aa81b164a62` | Database |
| redis | `redis:7.4.11-alpine@sha256:ff02b58f971e7d7d156a1267e283fcbbeee91773b6aa36c49dac28ecfe28eadf` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | paymenter | 80 | Public nginx port. |
| `APP_ENV` | paymenter | production | Laravel runtime environment. |
| `APP_KEY` | paymenter | - | Generated Laravel encryption key. |
| `APP_URL` | paymenter | - | Canonical public HTTPS URL. |
| `DB_HOST` | paymenter | - | Private MariaDB host. |
| `DB_PORT` | paymenter | 3306 | MariaDB port. |
| `APP_NAME` | paymenter | Paymenter | Application name shown by Laravel. |
| `APP_DEBUG` | paymenter | false | Keep detailed exception pages disabled in production. |
| `REDIS_HOST` | paymenter | - | Private Redis host. |
| `REDIS_PORT` | paymenter | 6379 | Redis port. |
| `CACHE_STORE` | paymenter | redis | Use Redis for application caching. |
| `DB_DATABASE` | paymenter | - | Paymenter database name. |
| `DB_PASSWORD` | paymenter | (secret) | Shared generated database password. |
| `DB_USERNAME` | paymenter | (secret) | Paymenter database user. |
| `LOG_CHANNEL` | paymenter | stderr | Send application logs to Railway. |
| `MAIL_MAILER` | paymenter | log | Log mail safely until SMTP is configured. |
| `APP_TIMEZONE` | paymenter | UTC | Application timezone. |
| `REDIS_CLIENT` | paymenter | phpredis | Use the bundled native Redis extension. |
| `DB_CONNECTION` | paymenter | mariadb | Laravel database driver. |
| `FILESYSTEM_DISK` | paymenter | local | Store private files on the persistent Paymenter volume. |
| `QUEUE_CONNECTION` | paymenter | redis | Use Redis for background jobs. |
| `PAYMENTER_ADMIN_EMAIL` | paymenter | admin@example.com | Initial administrator login email. |
| `PAYMENTER_COMPANY_NAME` | paymenter | Paymenter | Initial company name shown in Paymenter. |
| `PAYMENTER_SKIP_DEFAULT` | paymenter | false | Keep bundled Paymenter themes and extensions updated. |
| `PAYMENTER_ADMIN_PASSWORD` | paymenter | (secret) | Generated initial administrator password. |
| `PAYMENTER_ADMIN_LAST_NAME` | paymenter | Admin | Initial administrator last name. |
| `PAYMENTER_ADMIN_FIRST_NAME` | paymenter | Railway | Initial administrator first name. |
| `MARIADB_USER` | mariadb | (secret) | Paymenter database user. |
| `MARIADB_DATABASE` | mariadb | paymenter | Paymenter database name. |
| `MARIADB_PASSWORD` | mariadb | (secret) | Generated Paymenter database password. |
| `MARIADB_AUTO_UPGRADE` | mariadb | 1 | Upgrade MariaDB system tables safely on image updates. |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Generated MariaDB root password for recovery. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/mysql`
- **Start command:** `redis-server --appendonly yes --appendfsync everysec`

**Category:** Other · **Languages:** Shell, Dockerfile, PHP

[View on Railway →](https://railway.com/deploy/paymenter-v157-railway)
