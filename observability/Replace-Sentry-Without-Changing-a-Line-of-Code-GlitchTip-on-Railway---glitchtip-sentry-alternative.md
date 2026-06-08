# Deploy Replace Sentry Without Changing a Line of Code — GlitchTip on Railway on Railway

Self-host Sentry-compatible error tracking. Change DSN, keep your code.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/glitchtip-sentry-alternative)

## About

![GlitchTip open-source error tracking platform](https://glitchtip.com/assets/home/issues-page@2x.webp)

GlitchTip is the open-source Sentry-compatible error tracking platform — **change your DSN
URL and your existing `@sentry/*` SDK code works immediately, with zero re-instrumentation**.
Error tracking, uptime monitoring, and performance monitoring in 4 containers running on
512 MB RAM. Sentry.io charges $26–$80/user/month. GlitchTip on Railway costs ~$5–10/month
flat for your entire team with unlimited events and unlimited projects.

GlitchTip v6 (February 2026) — improved stack traces, performance monitoring, and active
development.

---

Self-hosting Sentry requires Kafka, ClickHouse, Snuba, and a 1,000+ line Docker Compose
file — significant operational overhead that most small and mid-sized teams cannot justify.
GlitchTip achieves the same Sentry SDK compatibility in 4 containers with 512 MB RAM and
a deployment that takes minutes, not days.

Railway provisions all four GlitchTip services automatically — PostgreSQL, Redis, object
storage, and the web application — pre-wired over private networking with HTTPS and
automatic container lifecycle management. No server administration required.

Typical cost: **~$5–10/month** on Railway's Hobby plan for the full stack. Sentry.io
Team plan costs $26/user/month — for a 3-person team that's $78/month with usage-based
event quotas that spike unexpectedly. GlitchTip on Railway has no event quotas and no
per-user fees.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Glitchtip | `glitchtip/glitchtip:6` | Worker |
| Redis | `redis:8.2.1` | Database |
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
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/glitchtip-sentry-alternative)
