# Deploy Nextcloud 34 Files and Collaboration on Railway

Your own cloud for files, calendars and contacts, with Redis and cron.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextcloud-34-files-and-collaboration)

## About

Nextcloud is an open-source cloud for files, calendars, contacts and collaboration that you run yourself. This community template deploys Nextcloud 34 on Railway with PostgreSQL, Redis for file locking and caching, background jobs on cron, and a choice between volume storage and a Railway Bucket for your files.

Nextcloud is a PHP application served by Apache. It needs a database, Redis for transactional file locking and caching, a place to store files, and a cron job that runs background tasks every five minutes. On Railway a volume belongs to one service, so this template runs cron inside the Nextcloud container instead of a separate service. Nextcloud installs itself on first start with a generated admin password, installs the Calendar and Contacts apps, and trusts Railway's proxy so links use HTTPS and client IP addresses are correct. Files go to the service volume by default or, if you choose it before deploying, to a Railway Bucket.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Nextcloud | [baranberkay96/nextcloud-railway](https://github.com/baranberkay96/nextcloud-railway) (branch: main) (root: /services/nextcloud) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `PORT` | Nextcloud | 80 | Apache port (domain and healthcheck). |
| `REDIS_HOST` | Nextcloud | - | Redis host for file locking, distributed cache and PHP sessions. |
| `BUCKET_NAME` | Nextcloud | - | Railway Bucket name (used when NEXTCLOUD_PRIMARY_STORAGE=bucket). |
| `POSTGRES_DB` | Nextcloud | - | Database name. |
| `BUCKET_REGION` | Nextcloud | - | Railway Bucket region. |
| `POSTGRES_HOST` | Nextcloud | - | Postgres host (private network). |
| `POSTGRES_USER` | Nextcloud | (secret) | Database user used for installation (Nextcloud creates its own user). |
| `NEXTCLOUD_CRON` | Nextcloud | true | Run background jobs with cron inside this container every 5 minutes. |
| `BUCKET_ENDPOINT` | Nextcloud | - | Railway Bucket S3 endpoint. |
| `OVERWRITECLIURL` | Nextcloud | - | Base URL used in links created by cron/CLI (emails, notifications). Update for a custom domain. |
| `REDIS_HOST_PORT` | Nextcloud | 6379 | Redis port. |
| `TRUSTED_PROXIES` | Nextcloud | 100.64.0.0/10 10.0.0.0/8 172.16.0.0/12 192.168.0.0/16 fd00::/8 | Railway proxy ranges, so Nextcloud sees real client IPs (brute-force protection). |
| `PHP_MEMORY_LIMIT` | Nextcloud | 512M | PHP memory limit per request. |
| `PHP_UPLOAD_LIMIT` | Nextcloud | 512M | Max single (non-chunked) upload; browsers and sync clients upload large files in chunks. |
| `OVERWRITEPROTOCOL` | Nextcloud | https | Generate https:// links behind Railway's TLS proxy. |
| `POSTGRES_PASSWORD` | Nextcloud | (secret) | Database password. |
| `REDIS_HOST_PASSWORD` | Nextcloud | (secret) | Redis password. |
| `BUCKET_ACCESS_KEY_ID` | Nextcloud | - | Railway Bucket access key. |
| `NEXTCLOUD_ADMIN_USER` | Nextcloud | (secret) | Admin account created on first start. |
| `FORWARDED_FOR_HEADERS` | Nextcloud | HTTP_X_FORWARDED_FOR | Header holding the client IP. |
| `NEXTCLOUD_INSTALL_APPS` | Nextcloud | calendar contacts | App-store apps installed right after the first install (space-separated). |
| `BUCKET_FORCE_PATH_STYLE` | Nextcloud | false | Railway Buckets use virtual-hosted URLs; true only if the Bucket's Credentials tab says path-style. |
| `NEXTCLOUD_INIT_HTACCESS` | Nextcloud | true | Refresh .htaccess on start (pretty URLs without index.php). |
| `BUCKET_SECRET_ACCESS_KEY` | Nextcloud | (secret) | Railway Bucket secret key. |
| `NEXTCLOUD_ADMIN_PASSWORD` | Nextcloud | (secret) | Admin password (generated). Used only for the first install; change it later in Personal settings. |
| `NEXTCLOUD_PRIMARY_STORAGE` | Nextcloud | volume | Where files are stored: 'volume' (service volume, 5 GB on Hobby) or 'bucket' (Railway Bucket, unlimited). Choose before the first deploy; locked after installation. |
| `NEXTCLOUD_TRUSTED_DOMAINS` | Nextcloud | - | Space-separated domains allowed to reach Nextcloud. Add your custom domain here; re-applied on every start. |
| `APACHE_MAX_REQUEST_WORKERS` | Nextcloud | 16 | Max parallel PHP requests (~60-120 MB each). Raise with more RAM. |
| `NEXTCLOUD_DEFAULT_PHONE_REGION` | Nextcloud | - | Optional ISO 3166-1 country code (e.g. DE) for phone numbers without a country prefix. |
| `NEXTCLOUD_MAINTENANCE_WINDOW_START` | Nextcloud | 1 | UTC hour when heavy background jobs may run. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres (private network). |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/status.php`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Tags:** nextcloud, file-sharing, cloud-storage, calendar, contacts · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/nextcloud-34-files-and-collaboration)
