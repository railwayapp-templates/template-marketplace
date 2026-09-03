# Deploy Wagtail on Railway

A production-ready Wagtail CMS starter template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wagtail-starter)

## About

Wagtail Starter is a production-ready Wagtail CMS template pre-configured for Railway. It runs Wagtail 7.4 LTS on Django 5.2 LTS and Python 3.13, and includes PostgreSQL, WhiteNoise for static files, split development/production settings, Argon2 password hashing, persistent database connections, and a health check endpoint. Deploy a fully working Wagtail site in under a minute and start building your content-managed application.

Hosting Wagtail Starter on Railway requires a web service running Django with Gunicorn and a PostgreSQL database. Railway automatically provisions the database, sets environment variables like `DATABASE_URL` and `SECRET_KEY`, and runs migrations on deploy. Static files are served via WhiteNoise with brotli compression, so no separate web server is needed. For media uploads (images, documents managed through Wagtail), you'll need S3-compatible storage since Railway doesn't provide persistent disk. The template includes commented-out S3 configuration ready to enable.

Both Wagtail and Django are pinned to their long-term support releases (Wagtail 7.4 LTS is supported until November 2027, Django 5.2 LTS until April 2028), so a site you deploy today keeps receiving security updates without forced upgrades. The repository ships with GitHub Actions CI (linting, Django checks, tests) and Dependabot, so dependency updates arrive as reviewed pull requests.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| wagtail-starter-template | [fasouto/wagtail-starter-template](https://github.com/fasouto/wagtail-starter-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `SECRET_KEY` | wagtail-starter-template | (secret) | - |
| `ALLOWED_HOSTS` | wagtail-starter-template | .railway.app    | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health/`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** Python, HTML, CSS

[View on Railway →](https://railway.com/deploy/wagtail-starter)
