# Deploy AppFlowy Cloud | (Just Updated) Notion Alternative Whose Admin Login Actually Works on Railway

Notion alternative whose admin login works and public signup is closed

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/appflowy-cloud-or-just-updated-notion-al)

## About

AppFlowy is the open-source Notion alternative: documents, wikis, databases, kanban
boards, AI chat and real-time collaboration, synced across the web app and the
AppFlowy desktop and mobile clients. This template runs the full self-hosted
**AppFlowy Cloud** backend — API, realtime websocket, background worker, GoTrue
authentication, object storage and the web client — with a working admin account
already created for you.

Upstream ships AppFlowy Cloud as nine containers: nginx, `appflowy_cloud`,
`appflowy_worker`, `appflowy_web`, GoTrue, MinIO, an admin frontend, Postgres and
Redis. Railway bills per service, so this template folds everything that needs
neither its own disk nor its own database engine into one supervised container
behind a single nginx gateway — **three billed services instead of eight**. Postgres
(pgvector) and Redis keep their own volumes; the object store lives on the app
service's volume.

The deploy is claimed before it is reachable. The container refuses to boot without an
admin password, seeds the account before any process binds a port, and re-applies that
password on every boot, so a redeploy is a working password reset. Public sign-up is
**closed** by default — set `APPFLOWY_ALLOW_SIGNUP=true` if you want an open instance —
and no SMTP account is required anywhere: the deploy form has zero blank required
fields.

Two things a stock AppFlowy deployment gets wrong are fixed here. AppFlowy Cloud
refuses to create a user record, and therefore a workspace, for a GoTrue **system
admin** — which is exactly what `GOTRUE_ADMIN_EMAIL` produces — so on a stock deploy
signing in with the advertised admin credentials returns
`{"code":1024,"message":"User not found"}` and never recovers. This template seeds an
internal service account for AppFlowy's own admin API calls and gives you a normal
account that owns a real workspace. And `APPFLOWY_S3_PRESIGNED_URL_ENDPOINT` is derived
from your public domain, so presigned upload and download URLs point at an address a
browser can actually reach rather than at the internal object store.

Every upstream image is pinned, the healthcheck proxies AppFlowy Cloud's own
`/api/health` (a green deploy means a working API, not just a running nginx), and
sign-in is rate-limited per client address, keyed on the first `X-Forwarded-For` entry
because Railway's edge hop rotates per request.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| appflowy | `ghcr.io/bon5co/appflowy-railway:0.17.12` | Web service |
| postgres | `pgvector/pgvector:pg16` | Database |
| redis | `redis:8.2.1-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `GOTRUE_JWT_SECRET` | appflowy | (secret) |
| `MINIO_ROOT_PASSWORD` | appflowy | (secret) |
| `APPFLOWY_ADMIN_PASSWORD` | appflowy | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/appflowy-cloud-or-just-updated-notion-al)
