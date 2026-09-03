# Deploy Wagtail on Railway

Content management system for building and editing websites

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wagtail)

## About

Wagtail is an open-source content management system built on Django, used by NASA, Google, the NHS and Mozilla for marketing sites, newsrooms and documentation portals. Editors get a fast, uncluttered admin with a page tree, revision history, scheduled publishing and a shared media library; developers keep ordinary Django models and templates underneath. Wagtail is a framework rather than a packaged app, so self-hosting it normally starts by scaffolding a project — this template removes that step.

Deploy Wagtail on Railway and you get the full production shape rather than one container: a gunicorn web service, a task worker, a scheduler for timed publishing, managed PostgreSQL, Redis for caching and sessions, and an S3-compatible bucket for uploads. The web service migrates the database, seeds the first administrator and serves both the site and the admin, while saves enqueue jobs the worker picks up so search indexing and image processing never block an editor. It builds from [gridalpha/wagtail-railway](https://github.com/gridalpha/wagtail-railway), which you can fork and extend with your own page models.

![Diagram of the Wagtail web, worker and scheduler services over Postgres and Redis](https://res.cloudinary.com/rroe4rtk/image/upload/v1788358989/wagtail-architecture.png)

Wagtail treats content as a tree of typed pages. Each page type is a Python model, so a "Blog post" can have a date, an intro, an image and a structured body, and the admin form follows automatically — an interface built for writing rather than a grid of plugins.

Key features:

- **StreamField** — structured, block-based content instead of one opaque HTML field
- **Revisions** — drafts, previews, workflow approval and full page history
- **Scheduled publishing** — set a go-live or expiry date and let the scheduler act on it
- **Media library** — images with automatic renditions and focal points, plus documents
- **Built-in search** — full-text page search using PostgreSQL, no extra engine
- **Headless-ready** — a REST API for driving a separate frontend
- **Multi-site and multi-language** — many domains and locales, one install

The template splits the roles Wagtail's deployment guidance assumes. **wagtail** is the public gunicorn web service. **wagtail-worker** runs the database-backed task worker: search index updates, reference indexing, image focal points and file cleanup. **wagtail-scheduler** publishes scheduled pages every five minutes and prunes old revisions daily. **Postgres** stores pages, revisions, sessions and the search index, **Redis** backs the cache and sessions, and the bucket holds every upload so a redeploy never takes the media library.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wagtail | [gridalpha/wagtail-railway](https://github.com/gridalpha/wagtail-railway) | Web service |
| wagtail-scheduler | [gridalpha/wagtail-railway](https://github.com/gridalpha/wagtail-railway) | Worker |
| wagtail-worker | [gridalpha/wagtail-railway](https://github.com/gridalpha/wagtail-railway) | Worker |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | wagtail | 8080 | HTTP port gunicorn binds |
| `REDIS_URL` | wagtail | - | Cache and session cache |
| `DATABASE_URL` | wagtail | - | Postgres connection string |
| `AWS_ACCESS_KEY_ID` | wagtail | - | Bucket access key |
| `DJANGO_SECRET_KEY` | wagtail | (secret) | Django signing key, must stay stable |
| `WAGTAIL_SITE_NAME` | wagtail | Wagtail | Site name in header and titles |
| `AWS_S3_REGION_NAME` | wagtail | - | Bucket region |
| `AWS_S3_ENDPOINT_URL` | wagtail | - | Bucket S3 endpoint |
| `AWS_SECRET_ACCESS_KEY` | wagtail | (secret) | Bucket secret key |
| `DJANGO_SUPERUSER_EMAIL` | wagtail | admin@example.com | First administrator email |
| `AWS_STORAGE_BUCKET_NAME` | wagtail | - | Bucket holding uploaded media |
| `DJANGO_SUPERUSER_PASSWORD` | wagtail | (secret) | First administrator password |
| `DJANGO_SUPERUSER_USERNAME` | wagtail | (secret) | First administrator username |
| `PORT` | wagtail-scheduler | 8080 | Port serving the health endpoint |
| `REDIS_URL` | wagtail-scheduler | - | Cache and session cache |
| `DATABASE_URL` | wagtail-scheduler | - | Postgres connection string |
| `AWS_ACCESS_KEY_ID` | wagtail-scheduler | - | Bucket access key |
| `DJANGO_SECRET_KEY` | wagtail-scheduler | (secret) | Shared Django signing key |
| `WAGTAIL_SITE_NAME` | wagtail-scheduler | Wagtail | Site name used in generated URLs |
| `AWS_S3_REGION_NAME` | wagtail-scheduler | - | Bucket region |
| `AWS_S3_ENDPOINT_URL` | wagtail-scheduler | - | Bucket S3 endpoint |
| `AWS_SECRET_ACCESS_KEY` | wagtail-scheduler | (secret) | Bucket secret key |
| `AWS_STORAGE_BUCKET_NAME` | wagtail-scheduler | - | Bucket holding uploaded media |
| `PORT` | wagtail-worker | 8080 | Port serving the health endpoint |
| `REDIS_URL` | wagtail-worker | - | Cache and session cache |
| `DATABASE_URL` | wagtail-worker | - | Postgres connection string |
| `AWS_ACCESS_KEY_ID` | wagtail-worker | - | Bucket access key |
| `DJANGO_SECRET_KEY` | wagtail-worker | (secret) | Shared Django signing key |
| `WAGTAIL_SITE_NAME` | wagtail-worker | Wagtail | Site name used in generated URLs |
| `AWS_S3_REGION_NAME` | wagtail-worker | - | Bucket region |
| `AWS_S3_ENDPOINT_URL` | wagtail-worker | - | Bucket S3 endpoint |
| `AWS_SECRET_ACCESS_KEY` | wagtail-worker | (secret) | Bucket secret key |
| `AWS_STORAGE_BUCKET_NAME` | wagtail-worker | - | Bucket holding uploaded media |
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

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/app/entrypoint.sh scheduler`
- **Start command:** `/app/entrypoint.sh worker`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** Python, HTML, CSS, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/wagtail)
