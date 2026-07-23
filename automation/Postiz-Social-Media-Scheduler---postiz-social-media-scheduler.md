# Deploy Postiz (Social Media Scheduler) on Railway

Self-hosted Buffer alternative: schedule to X, LinkedIn & 15+ platforms.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postiz-social-media-scheduler)

## About

Postiz is the leading open-source social media scheduler — a self-hosted alternative to Buffer and Hootsuite. Plan, schedule, and auto-publish posts to X (Twitter), LinkedIn, Instagram, Facebook, TikTok, YouTube, Reddit, Mastodon, Bluesky, and 15+ platforms from one calendar, with team features and an optional AI copilot.

This template runs the official `ghcr.io/gitroomhq/postiz-app` image (pinned to v2.21.10) with everything Postiz needs: Postgres 17 for data, password-protected Redis 7 for the scheduling queue, and a persistent volume at `/uploads` for media. All URLs are wired to your generated Railway domain automatically, the JWT secret is auto-generated, and the built-in cron worker publishes scheduled posts on time. Databases are reachable only over Railway private networking — nothing but the app itself is exposed to the internet. Register your account right after deploy, then set `DISABLE_REGISTRATION=true` to lock signups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Postiz | `ghcr.io/gitroomhq/postiz-app:v2.21.10` | Web service |
| Redis | `redis:7.4-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | postiz | Database name used by Postiz. |
| `DATABASE_URL` | Postgres | - | Full connection string consumed by the Postiz service over private networking. |
| `POSTGRES_USER` | Postgres | (secret) | Postgres username for the Postiz database. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated Postgres password. |
| `MAIN_URL` | Postiz | - | Public URL of the Postiz app (auto-set from the generated Railway domain). |
| `RUN_CRON` | Postiz | true | Run the scheduler worker in this container (required for scheduled posts). |
| `API_LIMIT` | Postiz | 30 | Public API rate limit (requests/hour). |
| `REDIS_URL` | Postiz | - | Redis connection string for queues and caching (private networking). |
| `IS_GENERAL` | Postiz | true | Required for self-hosted Postiz. |
| `JWT_SECRET` | Postiz | (secret) | Auto-generated secret that signs login sessions. Never share it. |
| `NOT_SECURED` | Postiz | false | Keep false - Railway serves HTTPS, so secure cookies work. |
| `DATABASE_URL` | Postiz | - | Postgres connection string (private networking). |
| `FRONTEND_URL` | Postiz | - | Frontend URL - must match MAIN_URL. |
| `OPENAI_API_KEY` | Postiz | (secret) | Optional - enables the AI copilot and AI image generation (platform.openai.com). |
| `STORAGE_PROVIDER` | Postiz | local | Store uploads on the attached volume. |
| `UPLOAD_DIRECTORY` | Postiz | /uploads | Upload path - matches the mounted volume. |
| `BACKEND_INTERNAL_URL` | Postiz | http://localhost:3000 | Internal backend URL (frontend and backend run in one container). |
| `DISABLE_REGISTRATION` | Postiz | false | Set true after you create your account to block new signups. |
| `NEXT_PUBLIC_BACKEND_URL` | Postiz | - | Public API endpoint used by the browser. |
| `NEXT_PUBLIC_UPLOAD_STATIC_DIRECTORY` | Postiz | /uploads | Public path for serving uploaded media. |
| `REDIS_URL` | Redis | - | Connection URL used by Postiz over private networking. |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password (required by the custom start command). |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/uploads`
- **Start command:** `sh -c 'exec redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data --bind 0.0.0.0 ::'`
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/postiz-social-media-scheduler)
