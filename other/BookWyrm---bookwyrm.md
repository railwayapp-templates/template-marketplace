# Deploy BookWyrm on Railway

Federated social reading catalog for tracking books, shelves and reviews.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bookwyrm)

## About

BookWyrm v0.9.3 is a self-hosted, federated social reading catalog for tracking what you have read, are reading and want to read, with shelves, reviews and ActivityPub federation. The stack pairs the official BookWyrm image with a persistent PostgreSQL database, an authenticated private Redis service, and an in-container nginx that serves static and media files from a single volume.

This is an unpublished draft prepared locally; it has not yet been deployment-tested on Railway. The validation scope below states exactly what has and has not been checked.

The template defines 3 services with pinned container digests, generated deployment secrets, explicit service references, and persistent volumes for stateful dependencies. The BookWyrm adapter builds from `main`. Railway terminates HTTPS for the public endpoint; PostgreSQL and Redis are private with no public TCP proxies. The adapter runs migrations, initial data, theme compilation and static collection on boot, then supervises gunicorn, a Celery worker, Celery beat and nginx. Filesystem-backed services should remain single-replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17@sha256:f4c66b820c6f974249089d3d16d86a3698eae11e8746eb6644b2271031e91232` | Database |
| bookwyrm | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Web service |
| redis | `redis:7.4@sha256:c6eabf748fc7a61dbb5a705c78bcf3d6377b1127a97d0ce965c11c44ba46896f` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | bookwyrm | Initial PostgreSQL database name, or the matching database selected by the application. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `PORT` | bookwyrm | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `DEBUG` | bookwyrm | false | Debug for bookwyrm. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DOMAIN` | bookwyrm | - | Domain resolved automatically from the linked service. Keep this reference when using the included topology. |
| `EMAIL_HOST` | bookwyrm | - | SMTP server hostname. Leave empty to disable outbound email; set a real host for invitations and password resets. |
| `EMAIL_PORT` | bookwyrm | 587 | Email port for bookwyrm. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MEDIA_ROOT` | bookwyrm | /data/images | Media root for bookwyrm. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SECRET_KEY` | bookwyrm | (secret) | Generated secret key. Keep private and preserve with backups. |
| `POSTGRES_DB` | bookwyrm | bookwyrm | Initial PostgreSQL database name, or the matching database selected by the application. |
| `STATIC_ROOT` | bookwyrm | /data/static | Static root for bookwyrm. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `EMAIL_USE_SSL` | bookwyrm | false | Email use ssl for bookwyrm. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `EMAIL_USE_TLS` | bookwyrm | true | Email use tls for bookwyrm. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `POSTGRES_HOST` | bookwyrm | - | Private PostgreSQL hostname. Automatically resolved from the postgres service. |
| `POSTGRES_USER` | bookwyrm | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `EMAIL_HOST_USER` | bookwyrm | (secret) | SMTP username. Required only when EMAIL_HOST is configured. |
| `REDIS_BROKER_URL` | bookwyrm | - | Redis broker url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRES_PASSWORD` | bookwyrm | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `REDIS_ACTIVITY_URL` | bookwyrm | - | Redis activity url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `EMAIL_HOST_PASSWORD` | bookwyrm | (secret) | SMTP password. Required only when EMAIL_HOST is configured. |
| `UPLOAD_IMAGE_DIMENSIONS` | bookwyrm | 400,1200,2000 | Upload image dimensions for bookwyrm. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `sh -c 'exec redis-server --bind 0.0.0.0 :: --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/bookwyrm)
