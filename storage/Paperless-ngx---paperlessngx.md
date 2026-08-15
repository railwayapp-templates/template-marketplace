# Deploy Paperless-ngx on Railway

Open-source document management with automatic tagging and OCR

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperlessngx)

## About

Paperless-ngx is an open-source document management system that turns scanned paper, PDFs and Office files into a searchable archive. You feed it a document, it runs OCR, extracts the text, guesses the date, correspondent and tags from what it learned about your previous filing, and stores the original alongside a text-searchable archive copy. It is the community-maintained continuation of Paperless-ng, and the usual pick for a self-hosted DocuWare replacement that keeps every original on infrastructure you control.

Deploy Paperless-ngx on Railway and you get upstream's full production topology rather than a stripped-down single container. Five services run: the application, a PostgreSQL database, a Redis broker for the background task queue, and the Gotenberg and Apache Tika services that convert Word, Excel, PowerPoint and LibreOffice files before indexing. Only the application has a public URL; everything else stays on Railway's private network. Uploaded files, OCR archive copies, thumbnails and the search index live on a persistent volume, so redeploying never costs a document.

![Paperless-ngx Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786744659/d7db6769-4955-4f15-acfb-c1c90a1283ca.png)

Paperless-ngx solves a narrow problem completely: you have documents, and you need to find them again years later. Self-hosting matters more here than in most categories, because the archive is your most sensitive paper — bank statements, medical letters, legal agreements.

Key features:

- OCR via Tesseract with over 100 language packs, producing selectable-text archive PDFs
- Automatic tagging, correspondent and document-type matching that learns from your filing
- Full-text search with advanced query syntax and saved views
- Office document support via Gotenberg and Tika: `.docx`, `.xlsx`, `.pptx`, `.odt`, `.eml`
- Workflows that trigger on consumption, plus a watched folder for scanner drops
- Per-user permissions, two-factor authentication, a REST API, and IMAP mailbox ingestion

The Railway architecture maps onto upstream's production Docker Compose file. The application container runs the web server, Celery worker, scheduler and folder watcher together. Gotenberg converts Office formats to PDF with headless Chromium and LibreOffice; Tika extracts their text and metadata.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| gotenberg | `gotenberg/gotenberg` | Worker |
| Redis | `redis:8.2` | Database |
| paperless | `ghcr.io/paperless-ngx/paperless-ngx:latest` | Web service |
| tika | `apache/tika` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | rRAILWAY_PRIVATE_DOMAINailway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | gotenberg | 3000 | Health check target port |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `PORT` | paperless | 8000 | HTTP port the app listens on |
| `PAPERLESS_URL` | paperless | - | Public base URL for CSRF and CORS |
| `PAPERLESS_REDIS` | paperless | - | Celery broker connection URL |
| `PAPERLESS_DBHOST` | paperless | - | Private Postgres hostname |
| `PAPERLESS_DBNAME` | paperless | - | Postgres database name |
| `PAPERLESS_DBPASS` | paperless | - | Postgres password |
| `PAPERLESS_DBPORT` | paperless | - | Postgres port |
| `PAPERLESS_DBUSER` | paperless | - | Postgres username |
| `PAPERLESS_DATA_DIR` | paperless | /data/data | Search index and models on the volume |
| `PAPERLESS_DBENGINE` | paperless | postgresql | Database backend selector |
| `PAPERLESS_TIME_ZONE` | paperless | Etc/UTC | Time zone for document dates |
| `PAPERLESS_ADMIN_MAIL` | paperless | admin@example.dev | First superuser email address |
| `PAPERLESS_ADMIN_USER` | paperless | (secret) | First superuser username |
| `PAPERLESS_MEDIA_ROOT` | paperless | /data/media | Originals and thumbnails on the volume |
| `PAPERLESS_SECRET_KEY` | paperless | (secret) | Signs sessions and API tokens |
| `PAPERLESS_OCR_LANGUAGE` | paperless | eng | Tesseract OCR language |
| `PAPERLESS_TASK_WORKERS` | paperless | 2 | Documents processed in parallel |
| `PAPERLESS_TIKA_ENABLED` | paperless | 1 | Enable Office document conversion |
| `PAPERLESS_TIKA_ENDPOINT` | paperless | - | Private Tika address |
| `PAPERLESS_ADMIN_PASSWORD` | paperless | (secret) | First superuser password |
| `PAPERLESS_CONSUMPTION_DIR` | paperless | /data/consume | Watched folder for scanner drops |
| `PAPERLESS_PROXY_SSL_HEADER` | paperless | ["HTTP_X_FORWARDED_PROTO", "https"] | Detect HTTPS behind Railway |
| `PAPERLESS_WEBSERVER_WORKERS` | paperless | 2 | Web server worker processes |
| `PAPERLESS_THREADS_PER_WORKER` | paperless | 2 | OCR threads per document |
| `PAPERLESS_USE_X_FORWARD_HOST` | paperless | true | Trust forwarded host header |
| `PAPERLESS_USE_X_FORWARD_PORT` | paperless | true | Trust forwarded port header |
| `PAPERLESS_ACCOUNT_ALLOW_SIGNUPS` | paperless | false | Keep self-registration closed |
| `PAPERLESS_TIKA_GOTENBERG_ENDPOINT` | paperless | - | Private Gotenberg address |
| `PAPERLESS_ALLAUTH_TRUSTED_PROXY_COUNT` | paperless | 1 | Real client IP for login rate limits |
| `PORT` | tika | 9998 | Health check target port |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/usr/bin/tini -- gotenberg --chromium-disable-javascript=true --chromium-allow-list=file:///tmp/.*`
- **Healthcheck:** `/health`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/accounts/login/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/tika`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/paperlessngx)
