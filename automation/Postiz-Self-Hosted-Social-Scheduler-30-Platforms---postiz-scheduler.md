# Deploy Postiz — Self-Hosted Social Scheduler, 30+ Platforms on Railway

Self-host Postiz — schedule 30+ platforms, no per-channel fees

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postiz-scheduler)

## About

Postiz is the open-source alternative to Buffer, Hypefury, and Later — schedule, publish, and analyze content across 30+ platforms from one dashboard, with AI-assisted writing and no per-channel fees. This template deploys the current version of Postiz correctly, including the Temporal workflow engine recent releases require to actually run scheduled posts — the multi-service piece that breaks most self-hosted attempts. Everything is pre-wired over private networking so posts publish on schedule from the first deploy.

---

Postiz looks simple, but recent versions have a hard architectural requirement that catches almost everyone self-hosting — this template handles it.

**Current Postiz requires Temporal — it won't run scheduled posts without it.** As of v2.12, Postiz depends on Temporal, a workflow orchestration engine, to execute scheduled posts — the app can't do its core job without it. Temporal in turn needs its own separate PostgreSQL database and an Elasticsearch instance. That's why a naive "Postiz + Postgres + Redis" deploy on the latest version appears to run but silently never publishes. This template includes the full Temporal stack, wired correctly, so posts actually go out.

**The Elasticsearch dotted-variable fix is Railway-specific.** Elasticsearch expects config like `cluster.routing.allocation.disk.watermark.low`, but Railway rejects env var names with dots. This template uses a wrapped image that bakes the config into `elasticsearch.yml` at build time and fixes volume permissions on startup, so it runs where a stock image fails.

**The URL variables must match your Railway domain for OAuth.** `MAIN_URL`, `FRONTEND_URL`, and `NEXT_PUBLIC_BACKEND_URL` must point at your Railway public domain, because social platforms use them for OAuth callbacks. This template sets them automatically, so connecting X, LinkedIn, and the rest works once you add each platform's API keys.

**Lock down registration after your first login.** Postiz allows open signup by default. Create your admin account, then set `DISABLE_REGISTRATION=true` and redeploy so no one else can register.

**Pin the version, and expect a first-boot pause.** The template pins a specific release rather than `latest`. On first deploy, Postiz may need a moment (or a manual restart) after Temporal's 30–60 second auto-setup — a one-time ordering quirk, not a failure.

Typical cost: **~$15–25/month** on Railway for the full stack, since Temporal and Elasticsearch add services beyond the base app. Postiz is open source and free — versus Buffer's per-channel pricing that climbs fast.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postiz | `ghcr.io/gitroomhq/postiz-app` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | Postiz | 3000 | - |
| `RUN_CRON` | Postiz | true | - |
| `IS_GENERAL` | Postiz | true | - |
| `JWT_SECRET` | Postiz | (secret) | - |
| `NOT_SECURED` | Postiz | true | - |
| `STORAGE_PROVIDER` | Postiz | local | - |
| `UPLOAD_DIRECTORY` | Postiz | /uploads | - |
| `BACKEND_INTERNAL_URL` | Postiz | http://localhost:3000 | - |
| `DISABLE_REGISTRATION` | Postiz | false | - |
| `NEXT_PUBLIC_UPLOAD_DIRECTORY` | Postiz | /uploads | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/uploads`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/postiz-scheduler)
