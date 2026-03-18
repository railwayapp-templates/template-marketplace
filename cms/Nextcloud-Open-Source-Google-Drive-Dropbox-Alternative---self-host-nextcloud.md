# Deploy Nextcloud | Open Source Google Drive, Dropbox Alternative on Railway

Self-Host Nextcloud on Railway — File Storage, Calendars, and Contacts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/self-host-nextcloud)

## About

This Railway template deploys a fully self-hosted **Nextcloud** instance — an open-source Google Drive alternative — with a production-ready stack: the `nextcloud:apache` Docker image, a managed **PostgreSQL** database for structured data, and a managed **Redis** instance for file locking and session caching. All three services are pre-wired via Railway's private network, with secrets auto-generated on deploy.

![Nextcloud railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773129730/nextcloud_arch_iqayzx.png)
---

Nextcloud is a free, open-source content collaboration platform — a self-hosted alternative to Google Drive, Dropbox, and Microsoft 365. It puts you in full control of your files, contacts, calendars, and communications without sending data to third-party cloud providers.

**Key features:**
- File sync and share with desktop and mobile clients (Windows, macOS, Linux, iOS, Android)
- Nextcloud Office — collaborative document editing powered by LibreOffice
- Nextcloud Talk — end-to-end encrypted video calls and chat
- Calendar, Contacts, Mail apps built-in
- 300+ apps in the Nextcloud App Store (two-factor auth, password manager, AI assistant, and more)
- WebDAV, CalDAV, CardDAV support for broad client compatibility
- Brute-force protection, server-side encryption, and audit logging

**Architecture:** Nextcloud (Apache + PHP) connects to Postgres over Railway's private network for metadata, user accounts, and file index. Redis handles distributed file locking and PHP session caching — without it, concurrent file access causes corruption. All traffic between services stays internal; only Nextcloud exposes a public HTTP port.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Nextcloud | `nextcloud:apache` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Nextcloud | 80 | HTTP server listening port |
| `REDIS_HOST` | Nextcloud | - | Hostname of Redis cache server |
| `POSTGRES_DB` | Nextcloud | - | Database name used by Nextcloud |
| `POSTGRES_HOST` | Nextcloud | - | Hostname of Postgres database |
| `POSTGRES_USER` | Nextcloud | (secret) | Username for Postgres authentication |
| `OVERWRITECLIURL` | Nextcloud | - | Base URL used by CLI tasks |
| `REDIS_HOST_PORT` | Nextcloud | - | Redis server port |
| `OVERWRITEPROTOCOL` | Nextcloud | https | Force HTTPS protocol for requests |
| `POSTGRES_PASSWORD` | Nextcloud | (secret) | Password for Postgres authentication |
| `NEXTCLOUD_DATA_DIR` | Nextcloud | /var/www/html/data | Directory storing Nextcloud user data |
| `REDIS_HOST_PASSWORD` | Nextcloud | (secret) | Password for Redis authentication |
| `NEXTCLOUD_ADMIN_USER` | Nextcloud | (secret) | Create username to access Nextcloud |
| `NEXTCLOUD_ADMIN_PASSWORD` | Nextcloud | (secret) | Create password to access Nextcloud |
| `NEXTCLOUD_TRUSTED_DOMAINS` | Nextcloud | - | Allowed domain for Nextcloud access |
| `POSTGRES_DB` | Postgres | railway | Database created during initialization |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default Postgres administrator user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated password for Postgres user |
| `DATABASE_PUBLIC_URL` | Postgres | - | External Postgres connection string |
| `REDISHOST` | Redis | - | Internal hostname for Redis service |
| `REDISPORT` | Redis | 6379 | Default Redis server port |
| `REDISUSER` | Redis | default | Redis authentication username |
| `REDIS_URL` | Redis | - | Internal Redis connection URI |
| `REDISPASSWORD` | Redis | (secret) | Redis password alias variable |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | External Redis connection string |

## Configuration

- **Start command:** `bash -c "a2dismod mpm_event 2>/dev/null; a2enmod mpm_prefork && /entrypoint.sh apache2-foreground"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/self-host-nextcloud)
