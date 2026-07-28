# Deploy Tandoor Recipes on Railway

Deploy and host Tandoor Recipes with PostgreSQL and persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tandoor-recipes)

## About

Tandoor Recipes is an open-source recipe manager for collecting recipes,
planning meals, building shopping lists, organizing cookbooks, and sharing a
household collection. It combines a mobile-friendly web interface with import
tools, tags, full-text search, meal planning, and durable uploaded media.

This community template deploys Tandoor Recipes 2.6.13 from the official
digest-pinned container image with PostgreSQL 16 and persistent storage. Railway
exposes only Tandoor over managed HTTPS on port `80`; PostgreSQL remains on the
private network. Database credentials use Railway service references, and the
Django signing key is generated when the template is deployed. Tandoor runs
database migrations and regenerates static assets before starting its bundled
nginx and Gunicorn servers. This template is not affiliated with or endorsed by
the Tandoor Recipes project.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tandoor Recipes | `vabene1111/recipes:2.6.13@sha256:f6c58afdea7a721d079ebd6ee5483f2c9da77dd1e709e16d60a82c218e80a451` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16@sha256:d21c9778c3329587a33c4ed70da57fd69c323408cbb480d8ee7bc4291cec73ee` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | Tandoor Recipes | Etc/UTC | Sets a deterministic UTC container and application timezone that can be changed after deployment. |
| `PORT` | Tandoor Recipes | 80 | Tells Railway routing that Tandoor's bundled nginx listener serves HTTP on port 80. |
| `DB_ENGINE` | Tandoor Recipes | django.db.backends.postgresql | Selects Tandoor's recommended PostgreSQL production database backend. |
| `SECRET_KEY` | Tandoor Recipes | (secret) | Generates a fresh 64-character Django signing key for sessions and cryptographic operations. |
| `POSTGRES_DB` | Tandoor Recipes | - | References the database name defined by the authoritative Postgres service. |
| `TANDOOR_PORT` | Tandoor Recipes | 80 | Configures Tandoor's bundled nginx process to listen on port 80. |
| `ALLOWED_HOSTS` | Tandoor Recipes | - | Allows the generated Railway public hostname and Railway's fixed internal readiness-probe hostname. |
| `ENABLE_SIGNUP` | Tandoor Recipes | 0 | Disables ordinary public registration while preserving Tandoor's one-time first-user setup flow. |
| `POSTGRES_HOST` | Tandoor Recipes | - | Connects Tandoor to Postgres over Railway's private network. |
| `POSTGRES_PORT` | Tandoor Recipes | 5432 | Uses the standard PostgreSQL listener port on Railway's private network. |
| `POSTGRES_USER` | Tandoor Recipes | (secret) | References the dedicated database role defined by the Postgres service. |
| `POSTGRES_PASSWORD` | Tandoor Recipes | (secret) | References the one generated Postgres password without copying or prompting for it. |
| `CSRF_TRUSTED_ORIGINS` | Tandoor Recipes | - | Trusts unsafe browser requests from the generated Railway HTTPS origin. |
| `POSTGRES_DB` | Postgres | tandoor | Creates the dedicated database used by Tandoor Recipes. |
| `POSTGRES_USER` | Postgres | (secret) | Creates the dedicated PostgreSQL role used only by Tandoor Recipes. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generates the authoritative database password that Tandoor references automatically. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/recipes/mediafiles`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tandoor-recipes)
