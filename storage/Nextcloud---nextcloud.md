# Deploy Nextcloud on Railway

Deploy Nextcloud with Bucket storage for scalable cloud file hosting

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextcloud)

## About

Nextcloud is a self-hosted, open-source cloud platform for file sync and sharing, calendars, contacts, and collaboration. It provides a private alternative to services like Google Drive or Dropbox, giving you full control over your data, users, and integrations while remaining extensible through a rich app ecosystem.

![](https://raw.githubusercontent.com/nextcloud/screenshots/master/nextcloud-hub-25-files.png)

Hosting Nextcloud on Railway runs the official Nextcloud container as a managed web service, combined with a PostgreSQL database for application metadata and configuration. User files are stored using **Railway Storage Buckets**, which provide S3-compatible, durable object storage well suited for large file uploads and scalable cloud storage. Railway handles networking, secrets, volumes, and service restarts automatically, allowing you to deploy a production-ready Nextcloud instance without manual server management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Nextcloud | `nextcloud` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Nextcloud | - | Name of the PostgreSQL database used by Nextcloud |
| `OVERWRITEHOST` | Nextcloud | - | Forces Nextcloud to generate URLs using this hostname |
| `POSTGRES_HOST` | Nextcloud | - | Hostname of the PostgreSQL database server |
| `POSTGRES_USER` | Nextcloud | (secret) | Username for the PostgreSQL database connection |
| `NEXTCLOUD_UPDATE` | Nextcloud | 1 | Enable install/update logic when using a custom command |
| `OVERWRITEPROTOCOL` | Nextcloud | https | Forces Nextcloud to use HTTPS behind a reverse proxy |
| `POSTGRES_PASSWORD` | Nextcloud | (secret) | Password for the PostgreSQL database user |
| `OBJECTSTORE_S3_KEY` | Nextcloud | - | Access key ID for S3 authentication |
| `OBJECTSTORE_S3_SSL` | Nextcloud | true | Enable SSL/TLS when connecting to the S3 endpoint |
| `OBJECTSTORE_S3_HOST` | Nextcloud | storage.railway.app | S3-compatible endpoint hostname |
| `OBJECTSTORE_S3_PORT` | Nextcloud | 443 | Network port used to connect to the S3 endpoint |
| `NEXTCLOUD_ADMIN_USER` | Nextcloud | (secret) | Username for the initial Nextcloud admin account |
| `OBJECTSTORE_S3_BUCKET` | Nextcloud | - | S3 bucket name used as Nextcloud primary storage |
| `OBJECTSTORE_S3_REGION` | Nextcloud | - | S3 region where the bucket is hosted |
| `OBJECTSTORE_S3_SECRET` | Nextcloud | (secret) | Secret access key for S3 authentication |
| `NEXTCLOUD_ADMIN_PASSWORD` | Nextcloud | (secret) | Password for the initial Nextcloud admin account |
| `NEXTCLOUD_TRUSTED_DOMAINS` | Nextcloud | - | Domains allowed to access Nextcloud (prevents host header attacks) |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Start command:** `sh -lc 'set -e; P="${PORT:-8080}"; a2dismod mpm_event mpm_worker >/dev/null 2>&1 || true; a2enmod mpm_prefork >/dev/null 2>&1 || true; echo "ServerName localhost" > /etc/apache2/conf-available/servername.conf; a2enconf servername >/dev/null 2>&1 || true; sed -i "s/^Listen 80$/Listen ${P}/" /etc/apache2/ports.conf; sed -i "s/<VirtualHost \*:80>/<VirtualHost *:${P}>/" /etc/apache2/sites-available/000-default.conf; exec /entrypoint.sh apache2-foreground'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/nextcloud)
