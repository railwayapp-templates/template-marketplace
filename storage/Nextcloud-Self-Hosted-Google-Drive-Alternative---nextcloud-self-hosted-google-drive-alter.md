# Deploy Nextcloud (Self-Hosted Google Drive Alternative) on Railway

Self-hosted Google Drive/Dropbox alternative — files, calendar & contacts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextcloud-self-hosted-google-drive-alter)

## About

Nextcloud is an open-source content-collaboration platform — a self-hosted alternative to Google Drive, Dropbox, and Google Workspace. Store and sync files, share links, and run calendar, contacts, notes, and hundreds of apps from a server you fully control, with clients for web, desktop, iOS, and Android. [Updated August '26]

This template runs Nextcloud with the official apache image, a PostgreSQL database, and Redis for file locking and caching. On first boot the admin account is created automatically from the NEXTCLOUD_ADMIN_USER and NEXTCLOUD_ADMIN_PASSWORD variables — copy the generated password to log in. The trusted domain and https overwrite settings are wired to the Railway domain so links and logins work behind the TLS proxy. All of your files and config persist to a volume at /var/www/html. A custom start command loads the single prefork MPM so Apache boots cleanly on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nextcloud | `nextcloud:31-apache` | Web service |
| redis | `redis:7-alpine` | Database |
| postgres | `postgres:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_HOST` | nextcloud | - | Redis host for file locking and caching. References the redis service. |
| `POSTGRES_DB` | nextcloud | nextcloud | Database name Nextcloud uses. Matches the postgres service. |
| `POSTGRES_HOST` | nextcloud | - | Postgres host over Railway's private network. References the postgres service. |
| `POSTGRES_USER` | nextcloud | (secret) | Database user. Matches the postgres service. |
| `OVERWRITECLIURL` | nextcloud | - | Base URL used for CLI and cron. Auto-filled from the generated domain. |
| `REDIS_HOST_PORT` | nextcloud | 6379 | Redis port. Leave as the default. |
| `OVERWRITEPROTOCOL` | nextcloud | https | Forces Nextcloud to generate https URLs behind Railway's TLS proxy. Leave as https. |
| `POSTGRES_PASSWORD` | nextcloud | (secret) | Database password. References the postgres service. |
| `NEXTCLOUD_ADMIN_USER` | nextcloud | (secret) | Username of the admin account created on first boot. Change if you like. |
| `NEXTCLOUD_ADMIN_PASSWORD` | nextcloud | (secret) | Auto-generated admin password. Copy it from here to log in the first time. |
| `NEXTCLOUD_TRUSTED_DOMAINS` | nextcloud | - | Domains allowed to serve Nextcloud. Auto-filled from the generated Railway domain. |
| `POSTGRES_DB` | postgres | nextcloud | Database Nextcloud uses. Referenced by the nextcloud service. |
| `POSTGRES_USER` | postgres | (secret) | Database user Nextcloud connects as. Referenced by the nextcloud service. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated database password. Alphanumeric to stay safe inside connection strings. |

## Configuration

- **Start command:** `bash -c "a2dismod mpm_event mpm_worker >/dev/null 2>&1; a2enmod mpm_prefork >/dev/null 2>&1; apache2-foreground"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/nextcloud-self-hosted-google-drive-alter)
