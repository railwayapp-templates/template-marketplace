# Deploy Open Wearables | (Just Updated) Wearable Health API, Admin Password Not admin@admin.com on Railway

Wearable health API with a sealed admin account, not the published default

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-wearables-or-just-updated-wearable-)

## About

Open Wearables is an open-source unified API for wearable health data. It pulls
activity, sleep, heart rate and body metrics from Fitbit, Garmin, Oura, Polar, Strava,
Suunto, Withings and Google Health Connect, normalises them into one schema, and serves
them over a documented REST API with webhooks, API keys and a web dashboard. This
template runs it as six services: the API, a Celery worker, a Celery beat scheduler, the
dashboard, PostgreSQL on a volume and Redis on a volume.

Open Wearables is a FastAPI application with a Celery pipeline behind it, and its own
deployment scripts assume a machine you configure by hand. On Railway three things go
wrong without help, and this template fixes all three.

**The admin account is sealed at deploy time.** Upstream's seeding script creates the
first developer from `admin_email` / `admin_password` in `app/config.py`, whose defaults
are `admin@admin.com` and a password published in the upstream repository. A template
that leaves those variables blank ships every deploy with the same publicly known login
on a public URL. This image refuses to start unless an admin email and password are
given, rejects the upstream default password outright, seeds the account before the
container's port is opened, and re-applies the password on every boot — so a redeploy is
a working password reset, which the product otherwise has no path for.

**The dashboard is a Vite build, so its API URL is baked in at build time.** Setting an
environment variable on the container cannot move it. This template builds the dashboard
against a placeholder, restores a pristine copy of the built tree on every boot, rewrites
the placeholder to this deployment's own API domain, and exits with an error if any
placeholder survives — so the dashboard can never come up silently pointing somewhere
else.

**Every service agrees on one secret key and one CORS origin.** `SECRET_KEY` derives the
Svix webhook JWT and the provider webhook secrets, so the API, the worker and the
scheduler must share it exactly. `CORS_ORIGINS` is parsed as a JSON list by pydantic
settings, and a value the app cannot parse is a crash at import time, before anything
listens.

Images: `ghcr.io/bon5co/open-wearables-railway` and
`ghcr.io/bon5co/open-wearables-railway-frontend`, both built from upstream 0.7.0 and
pinned. Source:
[bon5co/open-wearables-railway](https://github.com/bon5co/open-wearables-railway).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frontend | `ghcr.io/bon5co/open-wearables-railway-frontend:0.7.0` | Web service |
| redis | `redis:8.2.1-alpine` | Database |
| backend | `ghcr.io/bon5co/open-wearables-railway:0.7.0` | Web service |
| postgres | `postgres:17.10-alpine` | Database |
| celery-worker | `ghcr.io/bon5co/open-wearables-railway:0.7.0` | Worker |
| celery-beat | `ghcr.io/bon5co/open-wearables-railway:0.7.0` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDIS_PASSWORD` | redis | (secret) |
| `SECRET_KEY` | backend | (secret) |
| `DB_PASSWORD` | backend | (secret) |
| `ADMIN_PASSWORD` | backend | (secret) |
| `REDIS_PASSWORD` | backend | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `SECRET_KEY` | celery-worker | (secret) |
| `DB_PASSWORD` | celery-worker | (secret) |
| `ADMIN_PASSWORD` | celery-worker | (secret) |
| `REDIS_PASSWORD` | celery-worker | (secret) |
| `SECRET_KEY` | celery-beat | (secret) |
| `DB_PASSWORD` | celery-beat | (secret) |
| `ADMIN_PASSWORD` | celery-beat | (secret) |
| `REDIS_PASSWORD` | celery-beat | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Start command:** `/usr/local/bin/railway-entrypoint.sh scripts/start/app.sh`
- **Volume:** `/var/lib/postgresql`
- **Start command:** `/usr/local/bin/railway-entrypoint.sh scripts/start/worker.sh`
- **Start command:** `/usr/local/bin/railway-entrypoint.sh scripts/start/beat.sh`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-wearables-or-just-updated-wearable-)
