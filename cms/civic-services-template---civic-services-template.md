# Deploy civic-services-template on Railway

Drupal 11 civic services directory on Railway with demo content.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/civic-services-template)

## About

Deploy a ready-to-publish, independent civic-services directory built on
Drupal 11 + PostgreSQL in one click. The site installs itself on first boot
**and ships fully populated**: a "Service" content type, a "Service
Categories" taxonomy, six clearly-labeled fictional demo services, a
category-grouped front page, and the independent-service disclaimer — no
manual steps. This template pins a known-good dependency graph (Drupal core,
PHP 8.5, Apache) and wires persistent storage and a readiness health check.

Everything runs on Railway's managed platform:

- **Web service** — Apache + PHP 8.5 (Drupal 11.4.x), built from the public `uttkarsh-26/civic-services-directory-railway` repo. Apache adapts to Railway's dynamic `PORT`, and a `/health.php` endpoint drives the platform health check.
- **PostgreSQL 18** — managed database service with SSL, auto-provisioned. Drupal is wired to it through `${{Postgres.DATABASE_URL}}`.
- **Persistent volume** — a 500 MB volume mounts at `/data`: uploaded files, the hash salt, and configuration exports survive redeploys. No volume, no persistence — files reset on every deploy.
- **Automatic install** — on first boot the entrypoint runs `drush site:install` (idempotent, guarded by a PostgreSQL advisory lock), then the content bootstrap creates the directory product (content type, taxonomy, demo services, front-page view, disclaimer block). Both are idempotent — redeploys create nothing twice.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [uttkarsh-26/civic-services-directory-railway](https://github.com/uttkarsh-26/civic-services-directory-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/civic-services-template)
