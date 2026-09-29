# Deploy piwigo-template on Railway

Self-host your photos: Piwigo gallery + MariaDB, one-click deploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/piwigo-template)

## About

Hosting Piwigo self-hosted means you own your photo archive: two services are provisioned — a Piwigo web/gallery service (official image, port 80, volume at `/var/www/html/piwigo`) and a MariaDB 11.8 database service (private networking, volume at `/var/lib/mysql`). Both services restart on failure automatically. The gallery needs about 512 MB of RAM; MariaDB about 512 MB — roughly $5–10/month on Hobby, growing with your photo library's storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | [lNamelessl/piwigo-railway-template](https://github.com/lNamelessl/piwigo-railway-template) (root: mariadb) | Database |
| piwigo | [lNamelessl/piwigo-railway-template](https://github.com/lNamelessl/piwigo-railway-template) (root: piwigo) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQL_PASSWORD` | mariadb | (secret) |
| `PIWIGO_DB_PASSWORD` | piwigo | (secret) |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/piwigo`

**Category:** CMS · **Languages:** Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/piwigo-template)
