# Deploy Nextcloud on Railway

Google Drive alternative. File sync, share and collaboration suite

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextcloud-railway)

## About

Nextcloud is the open-source file sync and share platform teams reach for when they want Google Drive without handing their documents to somebody else's cloud. It grew from a Dropbox alternative into a full collaboration suite: files with versioning and granular link sharing, desktop and mobile sync clients, calendars and contacts over CalDAV and CardDAV, collaborative editing, Photos and Talk. Companies and public-sector bodies self-host Nextcloud because the data stays on infrastructure they control, under an AGPL licence with no per-seat fee.

Deploy Nextcloud on Railway and a production install arrives already wired together. The `nextcloud` service builds on the official `nextcloud:34-apache` image and serves the web UI, WebDAV and the sync-client API on port 80 behind a Railway HTTPS domain. Managed PostgreSQL holds accounts, file metadata, shares and calendars; managed Redis provides transactional file locking, the distributed cache and PHP sessions. A Railway object-storage bucket is Nextcloud's **primary** storage, so user files never touch the disk — the volume keeps only the application, custom apps and themes. Apache and Nextcloud's cron share one container under supervisord, because Railway volumes cannot be shared between services, and that keeps background jobs in the recommended Cron mode.

![Nextcloud Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786742207/9bfead2b-fba2-48ba-90a0-5538a92ad594.png)

Nextcloud solves the problem of a team's documents living in an account nobody administers: one server holds the files, the sharing rules, the versions and the record of who touched what, and every client — browser, desktop, phone, WebDAV mount — talks to it. Teams self-host when data residency or retention rules rule out a hosted drive.

- **Files** — versioning, trash bin, password-protected expiring links, federated sharing
- **Sync clients** — Windows, macOS, Linux, iOS and Android, with virtual files
- **Groupware** — calendars, contacts, mail and tasks over open protocols
- **Office, Photos and Talk** — collaborative editing, media browsing, chat and calls
- **App store** — hundreds of community apps, from forms to end-to-end encryption

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| nextcloud | [gridalpha/nextcloud-railway](https://github.com/gridalpha/nextcloud-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `PORT` | nextcloud | 80 | Apache HTTP listening port |
| `REDIS_HOST` | nextcloud | - | Private Redis hostname |
| `POSTGRES_DB` | nextcloud | nextcloud | Application database name |
| `OVERWRITEHOST` | nextcloud | - | Public host for generated links |
| `POSTGRES_HOST` | nextcloud | - | Private database hostname |
| `POSTGRES_USER` | nextcloud | (secret) | Scoped application database role |
| `OVERWRITECLIURL` | nextcloud | - | Base URL used by background jobs |
| `REDIS_HOST_PORT` | nextcloud | - | Redis port |
| `TRUSTED_PROXIES` | nextcloud | 100.64.0.0/10 fd00::/8 | Railway edge ranges for client IP |
| `PHP_MEMORY_LIMIT` | nextcloud | 1024M | PHP memory ceiling |
| `PHP_UPLOAD_LIMIT` | nextcloud | 10G | Maximum upload and post size |
| `APACHE_BODY_LIMIT` | nextcloud | 1073741824 | Apache request body limit |
| `OVERWRITEPROTOCOL` | nextcloud | https | Force https in generated links |
| `POSTGRES_PASSWORD` | nextcloud | (secret) | Password for that database role |
| `OBJECTSTORE_S3_KEY` | nextcloud | - | Bucket access key id |
| `OBJECTSTORE_S3_SSL` | nextcloud | true | Use HTTPS to reach storage |
| `OBJECTSTORE_S3_HOST` | nextcloud | t3.storageapi.dev | Storage host, no URL scheme |
| `OBJECTSTORE_S3_PORT` | nextcloud | 443 | Storage port |
| `REDIS_HOST_PASSWORD` | nextcloud | (secret) | Redis password |
| `NEXTCLOUD_ADMIN_USER` | nextcloud | (secret) | First administrator username |
| `FORWARDED_FOR_HEADERS` | nextcloud | HTTP_X_FORWARDED_FOR | Header carrying the client IP |
| `OBJECTSTORE_S3_BUCKET` | nextcloud | - | Primary storage bucket name |
| `OBJECTSTORE_S3_REGION` | nextcloud | - | Bucket region |
| `OBJECTSTORE_S3_SECRET` | nextcloud | (secret) | Bucket secret access key |
| `NEXTCLOUD_ADMIN_PASSWORD` | nextcloud | (secret) | First administrator password |
| `NEXTCLOUD_TRUSTED_DOMAINS` | nextcloud | - | Hostnames Nextcloud will answer for |
| `OBJECTSTORE_S3_AUTOCREATE` | nextcloud | false | Bucket already exists |
| `NEXTCLOUD_DB_BOOTSTRAP_URL` | nextcloud | - | Superuser URL creating role and database |
| `OBJECTSTORE_S3_USEPATH_STYLE` | nextcloud | true | Path-style bucket addressing |
| `NEXTCLOUD_DEFAULT_PHONE_REGION` | nextcloud | US | ISO region for phone parsing |
| `NEXTCLOUD_MAINTENANCE_WINDOW_START` | nextcloud | 1 | UTC hour for heavy background jobs |
| `POSTGRES_DB` | Postgres | rRAILWAY_PRIVATE_DOMAINailway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** Shell, Dockerfile, PHP

[View on Railway →](https://railway.com/deploy/nextcloud-railway)
