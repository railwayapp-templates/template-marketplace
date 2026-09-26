# Deploy Redmine - One Click Deploy on Railway

Redmine — the classic open-source project management, one click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redmine-template)

## About

Deploying Redmine via this template gives you a production-shaped install in about two minutes: a `redmine:7.0` web service exposed on a Railway domain and a `postgres:16-alpine` database that is reachable only over Railway's private network. Both services restart automatically on failure, the web service has an HTTP healthcheck on `/login`, and schema migrations (`rake db:migrate`) run automatically on every deploy — including version upgrades of the Redmine image.

Hosting Redmine yourself means your projects, issues, and attachments never leave infrastructure you control. On Railway this template provisions:

| Service | Image | Notes |
|---|---|---|
| Redmine | `redmine:7.0` (official image) | Public HTTP domain; listens on the Railway-provided port; healthcheck `GET /login`; `ON_FAILURE` restart policy (max 10 retries) absorbs the first-boot race while Postgres initializes |
| Postgres | `postgres:16-alpine` | Private networking only; data persists on a volume at `/var/lib/postgresql` |

Persistent storage: uploaded files and attachments live on a dedicated volume mounted at `/usr/src/redmine/files`, so they survive redeploys and restarts. Database variables are wired by reference — Redmine reads the Postgres service's password and private hostname via `${{...}}` expressions, so there is nothing to type. `SECRET_KEY_BASE` is generated with `${{secret(64,"hex")}}` per deployment; it is stored, stable across redeploys, and must never be rotated or deleted afterwards (rotation invalidates every active session). Postgres's `POSTGRES_PASSWORD` is likewise generated fresh per deployment.

Post-deploy steps (two minutes): open your Railway domain, log in as `admin` / `admin`, accept the forced password change, then click **Administration → Load the default configuration**. Optional: enable the REST API under **Administration → Settings → API** and grab your key from **My account**.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redmine | `redmine:7.0` | Web service |
| Postgres | `postgres:16-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SECRET_KEY_BASE` | Redmine | (secret) |
| `REDMINE_DB_PASSWORD` | Redmine | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/redmine/files`
- **Volume:** `/var/lib/postgresql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/redmine-template)
