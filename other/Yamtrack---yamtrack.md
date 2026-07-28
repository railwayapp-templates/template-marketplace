# Deploy Yamtrack on Railway

Self-hosted tracker for movies, TV, anime, manga, games, and books.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/yamtrack)

## About

Yamtrack is an open-source, self-hosted media tracker for movies, television, anime, manga, video games, books, comics, and board games. It supports multiple users, progress and rating history, custom lists, release calendars, notifications, imports, exports, and optional integrations with media servers and identity providers.

This Railway template deploys Yamtrack v0.25.3 with a private Redis service. Yamtrack uses its upstream SQLite deployment mode and stores its database on a persistent volume at `/yamtrack/db`; Redis stores cache and task state on a separate persistent volume at `/data`. Only Yamtrack receives a public HTTP domain. Railway references connect the services over private networking, the signing secret is generated at deployment time, and `/health/` verifies SQLite, Redis, cache, and Celery readiness.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.0.2@sha256:b43d2dcbbdb1f9e1582e3a0f37e53bf79038522ccffb56a25858969d7a9b6c11` | Database |
| Yamtrack | `ghcr.io/fuzzygrim/yamtrack:0.25.3@sha256:00acf008bca8171226063bc0f8f08ef7ffe24a10bcebf8676cce335ce312c307` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SKIP_DROP_PRIVS` | Redis | 1 | Keeps the official Redis process able to write the Railway volume when lost+found prevents the image's ownership repair. Redis remains private. |
| `TZ` | Yamtrack | UTC | IANA timezone used by Django and Celery; change after deployment if needed. |
| `PORT` | Yamtrack | 8000 | Internal HTTP port exposed by the pinned Yamtrack image and used by Railway health checks. |
| `URLS` | Yamtrack | - | Public Railway origin trusted by Django for CSRF, redirects, and webhooks. |
| `SECRET` | Yamtrack | (secret) | 64-character hexadecimal Django signing secret generated once for this deployment. |
| `REDIS_URL` | Yamtrack | - | Private Redis connection used by cache, health checks, and Celery. |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/health/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/yamtrack/db`

**Category:** Other

[View on Railway →](https://railway.com/deploy/yamtrack)
