# Deploy Discourse — Open Source Community Forum on Railway

Self-hosted Discourse with Postgres, Redis, and Sidekiq worker

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/discourse-forum-postgres-redis)

## About

Discourse is the leading open-source community forum platform — threaded discussions, trust levels, moderation tooling, and full-text search, powering communities for Rust, Netlify, and thousands of others. Unlike Discord, where conversations vanish into an endless scroll, Discourse produces organised, searchable, permanent threads. Unlike Reddit, you own the data and set the rules.

This template deploys the full four-service stack: Discourse, a Sidekiq background worker, PostgreSQL, and Redis.

---

Discourse is a Ruby on Rails application, and hosting Rails properly means running more than one process. The web app serves requests; a separate Sidekiq worker handles everything asynchronous — sending registration emails, delivering notifications, optimising uploaded images, and running scheduled maintenance jobs.

**That worker is not optional.** Deploy Discourse without Sidekiq and the forum appears to work while silently doing nothing in the background: nobody receives a registration email, notifications never arrive, and uploaded images never finish processing. This template runs Sidekiq as its own service, connected to the same database and Redis instance, so background work actually happens.

The second non-negotiable is SMTP. Discourse requires a working mail provider before anyone — including you — can complete registration, because account activation runs by email. Configure Mailgun, SendGrid, Postmark, or similar before your first deploy.

Discourse is also genuinely resource-hungry. Rails plus Sidekiq plus Postgres idles around 1.4–1.8 GB of RAM and climbs during image processing and database migrations. Budget 2 GB minimum and 4 GB for a comfortable production forum.

Typical cost: **~$25–45/month** on Railway across all four services, depending on RAM and storage. Discourse's own hosted plans start considerably higher, so self-hosting pays off quickly — and your community's data stays yours.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Discourse | `bitnamilegacy/discourse:3.5.0-debian-12-r0` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Sidekiq | `bitnamilegacy/discourse:3.5.0-debian-12-r0` | Worker |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Discourse | 3000 | - |
| `DISCOURSE_PASSWORD` | Discourse | (secret) | - |
| `DISCOURSE_USERNAME` | Discourse | (secret) | - |
| `DISCOURSE_SITE_NAME` | Discourse | Railway Forums | - |
| `DISCOURSE_DATABASE_USER` | Discourse | (secret) | - |
| `DISCOURSE_REDIS_PASSWORD` | Discourse | (secret) | - |
| `DISCOURSE_REDIS_USERNAME` | Discourse | (secret) | - |
| `DISCOURSE_DATABASE_PASSWORD` | Discourse | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DISCOURSE_PASSWORD` | Sidekiq | (secret) | - |
| `DISCOURSE_USERNAME` | Sidekiq | (secret) | - |
| `DISCOURSE_DATABASE_USER` | Sidekiq | (secret) | - |
| `DISCOURSE_REDIS_PASSWORD` | Sidekiq | (secret) | - |
| `DISCOURSE_REDIS_USERNAME` | Sidekiq | (secret) | - |
| `DISCOURSE_DATABASE_PASSWORD` | Sidekiq | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Volume:** `/bitnami/discourse`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/discourse-forum-postgres-redis)
