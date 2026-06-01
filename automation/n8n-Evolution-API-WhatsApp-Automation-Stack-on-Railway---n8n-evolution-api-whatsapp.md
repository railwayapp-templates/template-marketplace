# Deploy n8n + Evolution API — WhatsApp Automation Stack on Railway on Railway

WhatsApp automation with n8n + Evolution API. No per-message fees.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-evolution-api-whatsapp)

## About

The complete self-hosted stack for WhatsApp workflow automation: **Evolution API** as the
WhatsApp gateway, **n8n** as the visual workflow engine, and **PostgreSQL** as the persistent
data layer — all pre-wired on Railway's private network with one-click deployment.

Connect a WhatsApp account via QR code, design automation flows in n8n, and handle real-time
WhatsApp events via webhook — no Meta Business API approval, no per-message billing, fully
self-hosted on Railway for ~$10–15/month flat.

---

Running a production WhatsApp automation stack requires three coordinated services: Evolution
API for the WhatsApp connection, n8n for workflow logic, and a PostgreSQL database shared
between them — all behind HTTPS with proper webhook routing between services.

Without a managed host, you're configuring Docker Compose, inter-service networking, SSL,
and environment variable coordination across three containers manually. Railway provisions all
of it automatically — private networking, shared credentials, and HTTPS endpoints for both
n8n and Evolution API.

Typical cost: **~$10–15/month** on Railway's Hobby plan for the three-service stack.
Compare to WATI (managed WhatsApp + automation) at $49/month, or Twilio WhatsApp at
$0.005–$0.085 per message combined with n8n Cloud at $20/month with execution caps. This
stack gives you unlimited WhatsApp messaging and unlimited n8n executions at flat compute
pricing.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| n8n | `n8nio/n8n` | Database |
| Evolution API | `evoapicloud/evolution-api` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `TZ` | n8n | Asia/Jakarta | - |
| `PORT` | n8n | 5678 | - |
| `DB_TYPE` | n8n | postgresdb | - |
| `N8N_PORT` | n8n | 5678 | - |
| `N8N_PROTOCOL` | n8n | https | - |
| `N8N_LOG_LEVEL` | n8n | info | - |
| `N8N_LOG_OUTPUT` | n8n | console | - |
| `N8N_PROXY_HOPS` | n8n | 1 | - |
| `EXECUTIONS_MODE` | n8n | regular | - |
| `GENERIC_TIMEZONE` | n8n | Asia/Jakarta | - |
| `N8N_RUNNERS_MODE` | n8n | internal | - |
| `EVOLUTION_API_KEY` | n8n | (secret) | - |
| `N8N_SECURE_COOKIE` | n8n | true | - |
| `DB_POSTGRESDB_PORT` | n8n | 5432 | - |
| `DB_POSTGRESDB_USER` | n8n | (secret) | - |
| `N8N_RUNNERS_ENABLED` | n8n | true | - |
| `EXECUTIONS_DATA_PRUNE` | n8n | true | - |
| `DB_POSTGRESDB_DATABASE` | n8n | railway | - |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | - |
| `DB_POSTGRESDB_POOL_SIZE` | n8n | 5 | - |
| `EXECUTIONS_DATA_MAX_AGE` | n8n | 336 | - |
| `N8N_DIAGNOSTICS_ENABLED` | n8n | false | - |
| `N8N_HIRING_BANNER_ENABLED` | n8n | false | - |
| `EXECUTIONS_DATA_SAVE_ON_ERROR` | n8n | all | - |
| `N8N_COMMUNITY_PACKAGES_ENABLED` | n8n | true | - |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n | 10000 | - |
| `EXECUTIONS_DATA_SAVE_ON_SUCCESS` | n8n | none | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n | true | - |
| `EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS` | n8n | true | - |
| `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE` | n8n | true | - |
| `PORT` | Evolution API | 8080 | - |
| `N8N_ENABLED` | Evolution API | true | - |
| `DATABASE_PROVIDER` | Evolution API | postgresql | - |
| `CACHE_REDIS_ENABLED` | Evolution API | true | - |
| `AUTHENTICATION_API_KEY` | Evolution API | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Volume:** `/evolution/instances`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-evolution-api-whatsapp)
