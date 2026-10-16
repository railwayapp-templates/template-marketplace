# Deploy paperless-ngx on Railway

Document management system with automated tagging, search and AI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperless-ngx-6)

## About

paperless-ngx is an open-source document management system that turns your physical and digital paperwork into a searchable online archive. It scans, OCRs, and indexes documents, then automatically tags and sorts them by correspondent, type, and date, so you can find any receipt, contract, or letter in seconds.

Hosting paperless-ngx involves running several cooperating services: the Django web application and its background workers, a PostgreSQL database for metadata, Redis for the task queue, and optionally Apache Tika and Gotenberg for parsing Office files and emails. Documents, thumbnails, and the search index must live on persistent storage so nothing is lost between deploys. You also need to set a secret key, configure the public URL and allowed hosts, and wire the services together over a private network. This template provisions and connects all of these for you, with sensible defaults and persistent volumes already in place.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Valkey | `valkey/valkey:9` | Database |
| Gotenberg | `gotenberg/gotenberg:8` | Worker |
| Tika | `apache/tika` | Worker |
| paperless-ngx | `paperlessngx/paperless-ngx:3.3` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Gotenberg | 3000 | Port the Gotenberg API listens on for document conversion requests. |
| `OTEL_LOGS_EXPORTER` | Gotenberg | none | OpenTelemetry logs exporter |
| `OTEL_TRACES_EXPORTER` | Gotenberg | none | OpenTelemetry trace exporter |
| `OTEL_METRICS_EXPORTER` | Gotenberg | none | OpenTelemetry metrics exporter |
| `PAPERLESS_URL` | paperless-ngx | - | Public URL where Paperless is reachable (e.g. https://docs.example.com). Used for CSRF checks and generated links. |
| `PAPERLESS_PORT` | paperless-ngx | 8000 | Port the Paperless web server listens on. |
| `PAPERLESS_REDIS` | paperless-ngx | - | Redis-like connection URL used for the task queue and caching. |
| `PAPERLESS_DBHOST` | paperless-ngx | - | Hostname of the PostgreSQL database. |
| `PAPERLESS_DBNAME` | paperless-ngx | - | Name of the PostgreSQL database Paperless uses. |
| `PAPERLESS_DBPASS` | paperless-ngx | - | Password for the PostgreSQL database user. |
| `PAPERLESS_DBPORT` | paperless-ngx | - | Port of the PostgreSQL database. |
| `PAPERLESS_DBUSER` | paperless-ngx | - | Username for connecting to PostgreSQL. |
| `PAPERLESS_DATA_DIR` | paperless-ngx | /data/data | Directory for internal data such as the search index and classifier model. Should be on a persistent volume. |
| `PAPERLESS_DBENGINE` | paperless-ngx | postgresql | Database engine to use. |
| `PAPERLESS_ADMIN_USER` | paperless-ngx | (secret) | Super admin username |
| `PAPERLESS_MEDIA_ROOT` | paperless-ngx | /data/media | Directory where original documents, archived PDFs and thumbnails are stored. Should be on a persistent volume. |
| `PAPERLESS_SECRET_KEY` | paperless-ngx | (secret) | Secret key used to sign sessions and tokens. Generated automatically. |
| `PAPERLESS_TIKA_ENABLED` | paperless-ngx | true | Enables Tika and Gotenberg so Office documents and emails can be parsed and converted. |
| `PAPERLESS_ALLOWED_HOSTS` | paperless-ngx | - | Comma-separated list of hostnames Paperless will accept requests for. |
| `PAPERLESS_TIKA_ENDPOINT` | paperless-ngx | - | URL of the Apache Tika server used to extract text from Office files and emails. |
| `PAPERLESS_ADMIN_PASSWORD` | paperless-ngx | (secret) | Super admin password |
| `PAPERLESS_CONSUMPTION_DIR` | paperless-ngx | /data/consume | Folder Paperless watches for new documents to import automatically. |
| `PAPERLESS_DB_READ_CACHE_ENABLED` | paperless-ngx | false | Caches database reads in Redis to speed up page loads. Defaults to "false". |
| `PAPERLESS_TIKA_GOTENBERG_ENDPOINT` | paperless-ngx | - | URL of the Gotenberg server used to convert documents and emails to PDF. |
| `PAPERLESS_EMAIL_PARSE_DEFAULT_LAYOUT` | paperless-ngx | 2 | Default layout for PDFs generated from emails: 1 = text then HTML, 2 = HTML then text (default), 3 = HTML only, 4 = text only. |
| `PGPORT ` | Postgres | 5432 | Port PostgreSQL listens on. |
| `POSTGRES_DB` | Postgres | railway | Name of the database created on first startup. |
| `DATABASE_URL` | Postgres | - | Full connection string for the database over Railway’s private network. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser account created on first startup. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password for the superuser account. Generated automatically. |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/paperless-ngx-6)
