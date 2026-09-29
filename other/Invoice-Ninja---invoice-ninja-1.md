# Deploy Invoice Ninja on Railway

Self-hosted invoicing with working PDFs, queue and daily backups

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/invoice-ninja-1)

## About

Invoice Ninja is a free, open-source invoicing app for freelancers and small businesses. It covers invoices, quotes, payments, expenses, time tracking and a client portal, and it takes online payments through Stripe, PayPal and 40+ other gateways. It's a self-hosted alternative to FreshBooks and QuickBooks.

Invoice Ninja v5 is a Laravel app. It needs PHP, a web server, a MySQL database, background queue workers for emails and PDFs, a scheduler for recurring invoices and reminders, and headless Chrome to render PDFs. It also needs persistent storage for logos and documents, and a stable APP_KEY, because gateway and email credentials are encrypted with it. This template packages all of that into the pinned official image, adds nginx, and wires it to Railway MySQL. First boot creates your admin account automatically. A nightly cron job backs up the database to a Railway Bucket and keeps the last 14 backups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Backup | [zer0gravity98/invoice-ninja-railway](https://github.com/zer0gravity98/invoice-ninja-railway) | Worker |
| Invoice Ninja | [zer0gravity98/invoice-ninja-railway](https://github.com/zer0gravity98/invoice-ninja-railway) | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_HOST` | Backup | - | MySQL host, linked to the MySQL service. |
| `DB_PORT` | Backup | - | MySQL port, linked to the MySQL service. |
| `S3_BUCKET` | Backup | - | Backups bucket name. |
| `S3_REGION` | Backup | - | Backups bucket region. |
| `BACKUP_KEEP` | Backup | 14 | How many nightly backups to keep in the bucket. Older ones are deleted. |
| `DB_DATABASE` | Backup | - | MySQL database name, linked to the MySQL service. |
| `DB_PASSWORD` | Backup | (secret) | MySQL password, linked to the MySQL service. |
| `DB_USERNAME` | Backup | (secret) | MySQL user, linked to the MySQL service. |
| `S3_ENDPOINT` | Backup | - | Backups bucket endpoint, used for nightly file backups. |
| `S3_ACCESS_KEY_ID` | Backup | - | Backups bucket access key. |
| `S3_SECRET_ACCESS_KEY` | Backup | (secret) | Backups bucket secret key. |
| `PORT` | Invoice Ninja | 8080 | Port nginx listens on inside the container. Leave as 8080. |
| `APP_KEY` | Invoice Ninja | - | Encryption key, generated automatically. Keep a copy and never change it, or saved credentials break. |
| `APP_URL` | Invoice Ninja | - | Public URL of the app. Change it to https://your.domain if you add a custom domain. |
| `DB_HOST` | Invoice Ninja | - | MySQL host, linked to the MySQL service. |
| `DB_PORT` | Invoice Ninja | - | MySQL port, linked to the MySQL service. |
| `S3_BUCKET` | Invoice Ninja | - | Backups bucket name. |
| `S3_REGION` | Invoice Ninja | - | Backups bucket region. |
| `DB_DATABASE` | Invoice Ninja | - | MySQL database name, linked to the MySQL service. |
| `DB_PASSWORD` | Invoice Ninja | (secret) | MySQL password, linked to the MySQL service. |
| `DB_USERNAME` | Invoice Ninja | (secret) | MySQL user, linked to the MySQL service. |
| `IN_PASSWORD` | Invoice Ninja | (secret) | Admin password for first boot, generated automatically. Change it after logging in. |
| `S3_ENDPOINT` | Invoice Ninja | - | Backups bucket endpoint, used for nightly file backups. |
| `IN_USER_EMAIL` | Invoice Ninja | - | Your email address. It becomes the admin login created on first boot. |
| `S3_ACCESS_KEY_ID` | Invoice Ninja | - | Backups bucket access key. |
| `S3_SECRET_ACCESS_KEY` | Invoice Ninja | (secret) | Backups bucket secret key. |
| `MYSQLHOST` | MySQL | - | Private hostname other services use to connect. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user other services connect as. |
| `MYSQL_URL` | MySQL | - | Full connection URL for the private network. |
| `MYSQLDATABASE` | MySQL | - | Database name other services connect to. |
| `MYSQLPASSWORD` | MySQL | (secret) | Password other services connect with. |
| `MYSQL_DATABASE` | MySQL | railway | Name of the database created on first start. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, generated automatically. |

## Configuration

- **Start command:** `/usr/local/bin/backup-db`
- **Healthcheck:** `/railway_health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/invoice-ninja-1)
