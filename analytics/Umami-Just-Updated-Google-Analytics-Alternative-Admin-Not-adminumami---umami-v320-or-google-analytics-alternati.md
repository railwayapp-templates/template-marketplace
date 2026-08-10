# Deploy Umami | (Just Updated) Google Analytics Alternative, Admin Not admin/umami on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/umami-v320-or-google-analytics-alternati)

## About

Umami is a privacy-focused, cookieless alternative to Google Analytics: pageviews, events,
sessions, funnels and UTM breakdowns for as many sites as you like, from a ~2 KB tracking
script, with the data in your own Postgres. This template runs Umami 3.2.0 with Postgres and
Redis, and it hands the admin account to *you* rather than to whoever finds the URL first.

Every stock Umami deployment creates its admin user inside database migration `01_init`, with
a hardcoded bcrypt hash of the password `umami` and a fixed user id. Upstream exposes no
environment variable to change it — the documented flow is "log in and change the password",
which is a race with the entire internet on a public Railway domain. This template's image
sets the admin credentials from a per-deploy generated secret after the migrations run and
**before** the HTTP server binds its port, and refuses to start if that secret is empty. The
first request the public URL ever serves is against a claimed instance, and the password is
rotatable afterwards by editing the variable and redeploying.

The rest is ordinary Railway plumbing done properly: the Umami version is pinned (Umami
applies one-way Prisma migrations on boot, so a rolling `latest` tag turns every redeploy into
an unrequested upgrade), Postgres keeps its data on a volume mounted at the parent directory
so the entrypoint owns its own data dir, and Redis — which Umami 3.x really does read on the
tracking hot path for website, user and team lookups plus auth tokens — is passworded and
persisted on its own volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| umami | `ghcr.io/bon5co/umami-railway:3.2.0` | Web service |
| redis | `redis:8.2.1` | Database |
| postgres | `postgres:17.10-trixie` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `APP_SECRET` | umami | (secret) |
| `UMAMI_ADMIN_PASSWORD` | umami | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/heartbeat`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/umami-v320-or-google-analytics-alternati)
