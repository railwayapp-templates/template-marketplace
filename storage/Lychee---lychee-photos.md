# Deploy Lychee on Railway

Flickr Alternative. Photo gallery app for organising & sharing your images

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lychee-photos)

## About

Lychee is an open-source photo-management system for people who want their pictures on their own server rather than someone else's cloud. It gives you albums, tagging, ratings, EXIF metadata, sharing links and password-protected albums behind a fast, dark interface built for looking at photographs rather than filing them. Photographers, designers, families and small studios use it as a self-hosted Flickr or SmugMug replacement, and because every original stays on disk in a directory you control, nothing is locked in a proprietary library.

Deploy Lychee on Railway and you get the whole production shape in one click: the Lychee application, a PostgreSQL database for albums, users and settings, and a Redis instance backing the cache and login sessions. A persistent volume is mounted at the upload directory so originals and every size variant survive redeploys, and a background queue worker handles thumbnail generation without blocking uploads. The public URL, HTTPS, database wiring and first admin account are all configured before the app serves a request.

![Diagram of the Lychee, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787146552/lychee-architecture.png)

Lychee solves a narrow problem well: showing photographs beautifully on the web without handing them to a platform. It is a Laravel application, served here by FrankenPHP with Laravel Octane, that keeps originals as ordinary files on disk while metadata lives in a relational database. That split makes it easy to back up and hard to lose — your pictures are files, not rows.

Key features:

- Albums, nested sub-albums and self-filling smart albums
- Tagging, star ratings, favourites and full-text search
- EXIF, IPTC and XMP extraction, including camera, lens and GPS
- Public sharing links, password-protected albums, per-user permissions
- Video and Live Photo support, OAuth/SSO sign-in and WebAuthn passkeys

Three services make up the deployment. **Lychee** serves the interface and API, writes originals and size variants to its volume, and runs the queue worker in the same container. **PostgreSQL** stores albums, photos, users, tags, settings and the job queue. **Redis** holds the cache and login sessions, which keeps you signed in across a redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lychee | [gridalpha/lychee-railway](https://github.com/gridalpha/lychee-railway) | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | lychee | 8000 | HTTP server listening port |
| `APP_ENV` | lychee | production | Laravel environment |
| `APP_URL` | lychee | - | Public base URL for image and share links |
| `DB_HOST` | lychee | - | Postgres private hostname |
| `DB_PORT` | lychee | - | Postgres port |
| `APP_NAME` | lychee | Lychee | Site name shown in the interface |
| `APP_DEBUG` | lychee | false | Keep debug output off in production |
| `ADMIN_USER` | lychee | (secret) | First administrator username |
| `REDIS_HOST` | lychee | - | Redis private hostname |
| `REDIS_PORT` | lychee | - | Redis port |
| `DB_DATABASE` | lychee | - | Postgres database name |
| `DB_PASSWORD` | lychee | (secret) | Postgres password |
| `DB_USERNAME` | lychee | (secret) | Postgres username |
| `APP_TIMEZONE` | lychee | UTC | Application timezone |
| `CACHE_DRIVER` | lychee | redis | Lychee reads CACHE_DRIVER, not CACHE_STORE |
| `DB_CONNECTION` | lychee | pgsql | Database driver |
| `ADMIN_PASSWORD` | lychee | (secret) | First administrator password |
| `REDIS_PASSWORD` | lychee | (secret) | Redis auth password |
| `SESSION_DRIVER` | lychee | redis | Sessions survive container recreation |
| `APP_FORCE_HTTPS` | lychee | true | Generate https URLs behind the proxy |
| `TRUSTED_PROXIES` | lychee | 0.0.0.0/0,::/0 | Read the real client IP behind the edge |
| `QUEUE_CONNECTION` | lychee | database | Background job queue backend |
| `SESSION_LIFETIME` | lychee | 120 | Session lifetime in minutes |
| `LYCHEE_APP_SECRET` | lychee | (secret) | Source of the derived encryption key |
| `LYCHEE_INLINE_WORKER` | lychee | true | Run the queue worker beside the web server |
| `SESSION_SECURE_COOKIE` | lychee | true | Send the session cookie over HTTPS only |
| `SKIP_PERMISSIONS_CHECKS` | lychee | yes | Skip the slow boot-time ownership pass |
| `SECURITY_HEADER_HSTS_ENABLE` | lychee | true | Send Strict-Transport-Security |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/public/uploads`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/lychee-photos)
