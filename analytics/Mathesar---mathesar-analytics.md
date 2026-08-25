# Deploy Mathesar on Railway

Spreadsheet-style editor for the data in a Postgres database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mathesar-analytics)

## About

Mathesar is a spreadsheet-like web interface for PostgreSQL. Anyone on a team can browse, filter, edit and query real database tables without writing SQL, while every row stays where it already lives. There is no proprietary storage layer and no sync job: a table in Mathesar *is* a Postgres table, a "relationship" is a foreign key, and permissions are ordinary Postgres roles. Built by Mathesar Foundation, a 501(c)(3) nonprofit and released under GPLv3, it gives teams Airtable's ergonomics on a database their engineers control.

Deploy Mathesar on Railway and you get the whole self-hosted stack in one click: the application container from the official `mathesar/mathesar` image, a managed PostgreSQL 18 database, a volume for uploaded spreadsheets, and an object storage bucket for attachments. Your browser reaches only Mathesar, over HTTPS; Mathesar reaches Postgres over the private network, so the database is never exposed to the internet. Self-host Mathesar this way and your data stays on infrastructure you own.

![Diagram of the Mathesar and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787342560/mathesar-architecture.png)

Most no-code database tools ask you to move your data into them. Mathesar does the opposite: point it at a Postgres server and it manages the schemas, tables, constraints and roles already there. That takes it where Airtable clones cannot go — in front of a production database, with no second copy of the data.

- **Spreadsheet-style editing** of real Postgres rows, with filtering, sorting and grouping.
- **Data Explorer**, a visual query builder that follows foreign keys so joins need no SQL.
- **Schema design** — create tables, change types, move columns, add relationships.
- **Shareable forms** that write submissions from people without accounts into a table.
- **Postgres-native permissions**: what a user sees is what their database role allows.
- **CSV and TSV import**, plus a file column type backed by S3-compatible storage.

The deployment has two services. **Mathesar** runs the Django application behind Gunicorn, serving the interface, the JSON-RPC API and its static assets. **Postgres** holds Mathesar's metadata and hosts the databases created in the UI. A volume at `/code/.media` keeps uploaded spreadsheets across redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mathesar | `mathesar/mathesar:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Mathesar | 8000 | Port Railway probes and routes to |
| `DEBUG` | Mathesar | false | Never enable in production |
| `SECRET_KEY` | Mathesar | (secret) | Session signing and credential encryption key |
| `POSTGRES_DB` | Mathesar | - | Internal metadata database name |
| `ALLOWED_HOSTS` | Mathesar | * | Host header allow-list; edge routes by host |
| `POSTGRES_HOST` | Mathesar | - | Private hostname of the database |
| `POSTGRES_PORT` | Mathesar | - | Database port |
| `POSTGRES_USER` | Mathesar | (secret) | Role Mathesar connects as |
| `WEB_CONCURRENCY` | Mathesar | 3 | Gunicorn sync worker count |
| `POSTGRES_SSLMODE` | Mathesar | prefer | TLS mode for the internal connection |
| `FILE_STORAGE_DICT` | Mathesar | - | S3 backend for file columns |
| `POSTGRES_PASSWORD` | Mathesar | (secret) | Password for that role |
| `FORWARDED_ALLOW_IPS` | Mathesar | * | Trust proxy headers from Railway's edge |
| `MATHESAR_ADMIN_EMAIL` | Mathesar | admin@example.com | Email for that administrator |
| `DJANGO_SETTINGS_MODULE` | Mathesar | config.settings.production | Django settings module to load |
| `MATHESAR_ADMIN_PASSWORD` | Mathesar | (secret) | Password for that administrator |
| `MATHESAR_ADMIN_USERNAME` | Mathesar | (secret) | First administrator, created at boot |
| `PER_USER_DATABASES_ENABLED` | Mathesar | false | Experimental per-user database mode |
| `MATHESAR_DJANGO_ADMIN_ENABLED` | Mathesar | false | Django /admin/ page, off by default |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Start command:** `/bin/bash -c 'for i in $(seq 1 60); do python3 -m mathesar.install && break; echo "mathesar-bootstrap: internal database not ready, retry $i"; sleep 5; done; if [ -n "$MATHESAR_ADMIN_USERNAME" ] && [ -n "$MATHESAR_ADMIN_PASSWORD" ]; then DJANGO_SUPERUSER_USERNAME="$MATHESAR_ADMIN_USERNAME" DJANGO_SUPERUSER_EMAIL="${MATHESAR_ADMIN_EMAIL:-admin@example.com}" DJANGO_SUPERUSER_PASSWORD="$MATHESAR_ADMIN_PASSWORD" python3 manage.py createsuperuser --noinput && echo "mathesar-bootstrap: created admin user $MATHESAR_ADMIN_USERNAME" || echo "mathesar-bootstrap: admin user already present, left unchanged"; fi; exec bash ./bin/mathesar run -ne'`
- **Healthcheck:** `/healthz/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/code/.media`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/mathesar-analytics)
