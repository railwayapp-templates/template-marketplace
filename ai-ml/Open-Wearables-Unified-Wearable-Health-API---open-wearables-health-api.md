# Deploy Open Wearables — Unified Wearable Health API on Railway

Self-host one API for Garmin, Whoop, Oura & Fitbit health data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-wearables-health-api)

## About

Open Wearables is an open-source platform that unifies wearable and fitness data behind one normalized API. Instead of building separate OAuth integrations for Garmin, Whoop, Oura, Fitbit, Polar, Suunto, Strava, and more, you connect once and get consistent, deduplicated health data from every provider. It ships open health-scoring algorithms and an MCP server for AI reasoning over the data — and because it's self-hosted, every user's health data stays on infrastructure you control. This template gets it running on Railway.

---

Open Wearables solves a specific, painful problem — every wearable provider has its own API, OAuth flow, and data format — and self-hosting it has a few things worth understanding.

**One API instead of a dozen integrations.** The platform handles OAuth, syncing, and normalization for cloud providers (Garmin, Oura, Whoop, Suunto, Polar, Ultrahuman, Strava, Fitbit) and SDK-based sources (Apple HealthKit, Samsung Health, Google Health Connect). Data arrives deduplicated with consistent timestamps in a single schema, so an app reads HRV or sleep the same way regardless of device. That normalization is the core value — the months of integration work you skip.

**You bring each provider's developer credentials.** The template deploys the platform, but connecting a provider means registering a developer app with that provider and adding its client ID and secret. Each connects via OAuth 2.0 or an SDK — the one setup step per device; the platform handles everything after.

**Single-organization by design — no multi-tenancy.** Each deployment serves one organization, which keeps it simple and is right for a self-hosted instance: your data, your infrastructure, full control over access and retention. That single-tenant model is also why it's HIPAA-eligible when you add the appropriate controls.

**It's early-stage — pin your version.** Open Wearables is under active development and pre-1.0, so APIs may change between releases. Pin a specific version rather than tracking latest, and follow the changelog before upgrading.

The included MCP server lets an LLM reason over the unified health data, enabling AI health assistants and natural-language health automations on top of the platform.

Typical cost: **~$10–15/month** on Railway for the platform and database. Open Wearables is MIT-licensed with no per-user fees at any scale — where commercial wearable-API vendors bill per connected user.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| celery-flower | [the-momentum/open-wearables](https://github.com/the-momentum/open-wearables) | Worker |
| frontend | [the-momentum/open-wearables](https://github.com/the-momentum/open-wearables) | Worker |
| Redis | `redis:8.2.1` | Database |
| celery-worker | [the-momentum/open-wearables](https://github.com/the-momentum/open-wearables) | Worker |
| celery-beat | [the-momentum/open-wearables](https://github.com/the-momentum/open-wearables) | Worker |
| backend | [the-momentum/open-wearables](https://github.com/the-momentum/open-wearables) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DB_USER` | celery-flower | (secret) | - |
| `REDIS_DB` | celery-flower | 0 | - |
| `SECRET_KEY` | celery-flower | (secret) | - |
| `DB_PASSWORD` | celery-flower | (secret) | - |
| `ENVIRONMENT` | celery-flower | production | - |
| `REDIS_PASSWORD` | celery-flower | (secret) | - |
| `REDIS_USERNAME` | celery-flower | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `DB_USER` | celery-worker | (secret) | - |
| `REDIS_DB` | celery-worker | 0 | - |
| `SECRET_KEY` | celery-worker | (secret) | - |
| `DB_PASSWORD` | celery-worker | (secret) | - |
| `ENVIRONMENT` | celery-worker | production | - |
| `REDIS_PASSWORD` | celery-worker | (secret) | - |
| `REDIS_USERNAME` | celery-worker | (secret) | - |
| `DB_USER` | celery-beat | (secret) | - |
| `REDIS_DB` | celery-beat | 0 | - |
| `SECRET_KEY` | celery-beat | (secret) | - |
| `DB_PASSWORD` | celery-beat | (secret) | - |
| `ENVIRONMENT` | celery-beat | production | - |
| `REDIS_PASSWORD` | celery-beat | (secret) | - |
| `REDIS_USERNAME` | celery-beat | (secret) | - |
| `DB_USER` | backend | (secret) | - |
| `REDIS_DB` | backend | 0 | - |
| `SECRET_KEY` | backend | (secret) | - |
| `DB_PASSWORD` | backend | (secret) | - |
| `ENVIRONMENT` | backend | production | - |
| `ADMIN_PASSWORD` | backend | (secret) | - |
| `REDIS_PASSWORD` | backend | (secret) | - |
| `REDIS_USERNAME` | backend | (secret) | - |
| `SENTRY_ENABLED` | backend | false | - |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | backend | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Python, TypeScript, MDX, CSS, Shell, Dockerfile, Makefile, Mako, JavaScript

[View on Railway →](https://railway.com/deploy/open-wearables-health-api)
