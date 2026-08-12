# Deploy drupal-railway-template on Railway

Production-ready Drupal 11 + PostgreSQL on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/drupal-railway-template)

## About

Deploy a production-ready Drupal 11 site backed by PostgreSQL in one click. This template pins a known-good dependency graph (Drupal core, PHP 8.5, Apache) and wires persistent storage, a readiness health check, and automatic first-boot installation — no local tooling required.

Everything runs on Railway's managed platform:

- **Web service** — Apache + PHP 8.5 (Drupal 11.4.x), built from the public `uttkarsh-26/drupal-railway` repo. Apache adapts to Railway's dynamic `PORT`, and a `/health.php` endpoint drives the platform health check.
- **PostgreSQL 18** — managed database service with SSL, auto-provisioned. Drupal is wired to it through `${{Postgres.DATABASE_URL}}`.
- **Persistent volume** — a 500 MB volume mounts at `/data`: uploaded files, the hash salt, and configuration exports survive redeploys. No volume, no persistence — files reset on every deploy.
- **Automatic install** — on first boot the entrypoint runs `drush site:install` (idempotent, guarded by a PostgreSQL advisory lock) with the variables you provide, then hands off to Apache.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [uttkarsh-26/drupal-railway](https://github.com/uttkarsh-26/drupal-railway) | Web service |
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

**Category:** CMS · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/drupal-railway-template)
