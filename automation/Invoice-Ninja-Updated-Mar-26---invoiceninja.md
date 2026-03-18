# Deploy Invoice Ninja [Updated Mar '26] on Railway

Invoice Ninja [Mar '26] (Create, Send & Track Invoices Easily) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/invoiceninja)

## About

Invoice Ninja is a powerful, open-source invoicing, billing, and payment management platform available on GitHub. It enables freelancers, small businesses, and enterprises to manage their invoices, track expenses, and automate payment workflows efficiently. With Invoice Ninja, you can send invoices, create quotes, manage recurring billing, and accept payments - all in one place, while keeping complete control of your data.

* * *

You can self-host Invoice Ninja to maintain full control over your client data, invoices, and payment records, ensuring security and privacy. When you host Invoice Ninja on Railway, you gain an optimized cloud infrastructure that automates scaling, backups, and deployment processes - making it easy to set up your own billing and invoicing system with minimal technical hassle.


* * *

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| invoiceninja | [Shinyduo/railway-invoiceninja](https://github.com/Shinyduo/railway-invoiceninja) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQLPORT` | MySQL | 3306 |
| `MYSQLUSER` | MySQL | root |
| `MYSQLPASSWORD` | MySQL | (secret) |
| `MYSQL_DATABASE` | MySQL | railway |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |
| `PORT` | invoiceninja | 80 |
| `APP_ENV` | invoiceninja | production |
| `APP_KEY` | invoiceninja | base64:z4ilN8hv5L+3KXkNw0AeHbq1ShB3v/d3F1qGRkfP7vM= |
| `APP_DEBUG` | invoiceninja | false |
| `DB_PASSWORD` | invoiceninja | (secret) |
| `DB_USERNAME` | invoiceninja | (secret) |
| `LOG_CHANNEL` | invoiceninja | stderr |
| `SELF_HOSTED` | invoiceninja | true |
| `CACHE_DRIVER` | invoiceninja | file |
| `DB_CONNECTION` | invoiceninja | mysql |
| `SESSION_DRIVER` | invoiceninja | cookie |
| `FILESYSTEM_DISK` | invoiceninja | public |
| `QUEUE_CONNECTION` | invoiceninja | sync |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/app/storage`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/invoiceninja)
