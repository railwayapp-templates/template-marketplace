# Deploy Automatisch workflow automation on Railway

Private workflow automation with a dedicated worker and durable data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/automatisch-workfl-1)

## About

Automatisch is a self-hosted workflow automation platform for connecting applications and running event-driven flows.

This template runs Automatisch 0.15.0 with a separate queue worker, private PostgreSQL, authenticated Redis with AOF persistence, generated secrets, and no default account. Create the first administrator through the installation screen after deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Automatisch Worker | `automatischio/automatisch:0.15.0@sha256:3bace7a12d5fb3f5b1305a6a52232270e0e0abd8465a8b78baacb07f6ea89594` | Worker |
| Automatisch PostgreSQL | `postgres:14.21-alpine@sha256:0197f365d4245fffa3988018ab1a5040b4ba79b572b21c2c82695d7b68692ff0` | Database |
| Automatisch | `automatischio/automatisch:0.15.0@sha256:3bace7a12d5fb3f5b1305a6a52232270e0e0abd8465a8b78baacb07f6ea89594` | Web service |
| Automatisch Redis | `redis:7.2.4-alpine@sha256:c8bb255c3559b3e458766db810aa7b3c7af1235b204cfdb304e79ff388fe1a5a` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | Automatisch Worker | - | Public Railway hostname used in workflow URLs. |
| `PORT` | Automatisch Worker | 3000 | Shared application URL port setting. |
| `WORKER` | Automatisch Worker | true | Run the BullMQ worker instead of the web process. |
| `API_URL` | Automatisch Worker | - | Public API origin without the private container port. |
| `APP_ENV` | Automatisch Worker | production | Enable production behavior. |
| `PROTOCOL` | Automatisch Worker | https | Public URL protocol. |
| `REDIS_DB` | Automatisch Worker | 0 | BullMQ Redis database number. |
| `LOG_LEVEL` | Automatisch Worker | info | Production logging level. |
| `REDIS_TLS` | Automatisch Worker | false | Use Railway private networking without Redis TLS. |
| `REDIS_HOST` | Automatisch Worker | - | Private Redis hostname. |
| `REDIS_PORT` | Automatisch Worker | 6379 | Private Redis port. |
| `WEBHOOK_URL` | Automatisch Worker | - | Public base URL for incoming webhooks. |
| `WEB_APP_URL` | Automatisch Worker | - | Public browser origin without the private container port. |
| `POSTGRES_HOST` | Automatisch Worker | - | Private PostgreSQL hostname. |
| `POSTGRES_PORT` | Automatisch Worker | 5432 | Private PostgreSQL port. |
| `APP_SECRET_KEY` | Automatisch Worker | (secret) | Use the main service's authentication signing key. |
| `ENCRYPTION_KEY` | Automatisch Worker | - | Use the main service's credential-encryption key. |
| `REDIS_PASSWORD` | Automatisch Worker | (secret) | Referenced Redis credential. |
| `DISABLE_SEED_USER` | Automatisch Worker | (secret) | Disable the insecure upstream sample account. |
| `POSTGRES_DATABASE` | Automatisch Worker | automatisch | Automatisch database name. |
| `POSTGRES_PASSWORD` | Automatisch Worker | (secret) | Referenced database credential. |
| `POSTGRES_USERNAME` | Automatisch Worker | (secret) | Automatisch database user. |
| `TELEMETRY_ENABLED` | Automatisch Worker | false | Disable upstream telemetry. |
| `WEBHOOK_SECRET_KEY` | Automatisch Worker | (secret) | Use the main service's webhook signing key. |
| `POSTGRES_ENABLE_SSL` | Automatisch Worker | false | Use Railway private networking without database TLS. |
| `ENABLE_BULLMQ_DASHBOARD` | Automatisch Worker | false | Keep the unauthenticated queue dashboard disabled. |
| `POSTGRES_DB` | Automatisch PostgreSQL | automatisch | Automatisch database name. |
| `POSTGRES_USER` | Automatisch PostgreSQL | (secret) | Automatisch database user. |
| `POSTGRES_PASSWORD` | Automatisch PostgreSQL | (secret) | Generated database password. |
| `HOST` | Automatisch | - | Public Railway hostname used in generated URLs. |
| `PORT` | Automatisch | 3000 | Automatisch HTTP port. |
| `API_URL` | Automatisch | - | Public API origin without the private container port. |
| `APP_ENV` | Automatisch | production | Enable production behavior. |
| `PROTOCOL` | Automatisch | https | Public URL protocol. |
| `REDIS_DB` | Automatisch | 0 | BullMQ Redis database number. |
| `LOG_LEVEL` | Automatisch | info | Production logging level. |
| `REDIS_TLS` | Automatisch | false | Use Railway private networking without Redis TLS. |
| `REDIS_HOST` | Automatisch | - | Private Redis hostname. |
| `REDIS_PORT` | Automatisch | 6379 | Private Redis port. |
| `WEBHOOK_URL` | Automatisch | - | Public base URL for incoming webhooks. |
| `WEB_APP_URL` | Automatisch | - | Public browser origin without the private container port. |
| `POSTGRES_HOST` | Automatisch | - | Private PostgreSQL hostname. |
| `POSTGRES_PORT` | Automatisch | 5432 | Private PostgreSQL port. |
| `APP_SECRET_KEY` | Automatisch | (secret) | Generated application authentication signing key. |
| `ENCRYPTION_KEY` | Automatisch | - | Generated key for stored connector credentials. |
| `REDIS_PASSWORD` | Automatisch | (secret) | Referenced Redis credential. |
| `DISABLE_SEED_USER` | Automatisch | (secret) | Disable the insecure upstream sample account. |
| `POSTGRES_DATABASE` | Automatisch | automatisch | Automatisch database name. |
| `POSTGRES_PASSWORD` | Automatisch | (secret) | Referenced database credential. |
| `POSTGRES_USERNAME` | Automatisch | (secret) | Automatisch database user. |
| `TELEMETRY_ENABLED` | Automatisch | false | Disable upstream telemetry. |
| `WEBHOOK_SECRET_KEY` | Automatisch | (secret) | Generated webhook signing key. |
| `POSTGRES_ENABLE_SSL` | Automatisch | false | Use Railway private networking without database TLS. |
| `ENABLE_BULLMQ_DASHBOARD` | Automatisch | false | Keep the unauthenticated queue dashboard disabled. |
| `REDIS_PASSWORD` | Automatisch Redis | (secret) | Generated Redis password. |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -ec 'umask 077; printf "appendonly yes\nappendfsync everysec\nrequirepass %s\n" "$REDIS_PASSWORD" >/tmp/redis.conf; exec redis-server /tmp/redis.conf'`
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/automatisch-workfl-1)
