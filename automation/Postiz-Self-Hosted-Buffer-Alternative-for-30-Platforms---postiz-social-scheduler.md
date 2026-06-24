# Deploy Postiz — Self-Hosted Buffer Alternative for 30+ Platforms on Railway

Self-host Postiz: schedule 30+ platforms. No per-channel fees

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postiz-social-scheduler)

## About

![Postiz social media scheduling dashboard](https://repository-images.githubusercontent.com/664013991/8b16b484-683a-4ed9-a132-6d070704cc12)

Postiz is the open-source social media scheduler with **29k+ GitHub stars** — built by the
founder of Novu — that publishes to 30+ platforms from one dashboard: X, Instagram, LinkedIn,
Facebook, TikTok, YouTube, Reddit, Threads, Bluesky, Mastodon, Pinterest, Discord, and more.
AI-assisted content generation, a visual calendar, team collaboration, analytics, a public
REST API, and an MCP endpoint for AI-agent workflows — all self-hosted with zero per-channel fees.

This template pins **Postiz v2.11.3** — the last release before Temporal became a required
dependency — so you run a lean 3-service stack (app, PostgreSQL, Redis) instead of the heavier
4-service Temporal setup. Self-host for ~$5–10/month versus Buffer at $6/channel/month or
Hootsuite at $99+/month.

---

Postiz (GitHub: gitroomhq/postiz-app) is an open-source, AGPL-3.0 social media scheduling and
automation platform — a self-hosted alternative to Buffer, Hypefury, Hootsuite, and Later. The
self-hosted version has no feature limitations versus the cloud version.

Recent versions (v2.12+) require a Temporal workflow engine — a fourth service that adds
overhead. This template pins **v2.11.3**, the last release before Temporal, keeping your stack
lean and cheaper while preserving full scheduling functionality.

Railway provisions all three services with private networking, persistent volumes for uploads
and data, and automatic HTTPS. Typical cost: **~$5–10/month** on Railway's Hobby plan. Buffer
charges $6/channel/month — managing 8 channels is $48/month. Hootsuite starts at $99/month.
Postiz self-hosted is free across all 30+ platforms; you pay only Railway compute.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Postiz | `gitroomhq/postiz-app:v2.11.3` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
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
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/uploads`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/postiz-social-scheduler)
