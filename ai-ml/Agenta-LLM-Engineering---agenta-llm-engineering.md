# Deploy Agenta LLM Engineering on Railway

LLM evaluation and tracing with databases, workers and object storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agenta-llm-engineering)

## About

LLM evaluation and tracing with databases, workers and object storage.

**Validation scope: static configuration checks only. Image builds and Railway application workflows have not been validated.** Deploying this template incurs Railway usage and any external provider charges.

Thirteen services adapted from the upstream Railway OSS layout: PostgreSQL, Redis, SeaweedFS 4.37, web/mobile, API/services/runner, two workers, cron, Supertokens and gateway. API migrations gate background startup, and its signing key persists on /data. SeaweedFS is pinned to the upstream-required STS-compatible version. Runner execution uses external Daytona; host Docker/FUSE is unavailable. No model or sandbox credits, enterprise features, HA or fixed hosting cost are included. The OSS code is MIT-licensed; enterprise code has separate terms. This is the largest and highest-validation-effort draft in this batch.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:7.4@sha256:71da9275c5f3fcb97d0fa0c8c5b36cc995327265420f17a04bfd544f458059f7` | Database |
| seaweedfs | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Database |
| agenta | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Web service |
| worker-queues | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Worker |
| web | `ghcr.io/agenta-ai/agenta-web:v0.118.0@sha256:dc1c408c0574ebc0c90fa290f997bbd04cc2d8dad9414eeaa15a0ec9fe2bd68a` | Worker |
| services | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Worker |
| api | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Database |
| postgres | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Database |
| runner | `ghcr.io/agenta-ai/agenta-runner:v0.118.0@sha256:9b4de2365b8931773d88105e1b13daabaa0111d9e0137321bc424b3e70d261a5` | Worker |
| web-mobile | `ghcr.io/agenta-ai/agenta-web-mobile:v0.118.0@sha256:ee2b6abd0e9e6a3fe43d8032b4b747343743d8fac482628a5a73a4f148f5eb69` | Worker |
| supertokens | `supertokens/supertokens-postgresql:11@sha256:7a71606ee6ff6a1173f13e4dc1ee27bd0169c09a74515149a9e0ac82994cfac7` | Database |
| worker-streams | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Worker |
| cron | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `AGENTA_STORE_BUCKET` | seaweedfs | agenta-store | Agenta store bucket for seaweedfs. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_STORE_ACCESS_KEY` | seaweedfs | - | Agenta store access key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_STORE_JWT_ISSUER` | seaweedfs | - | Agenta store jwt issuer resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_STORE_SECRET_KEY` | seaweedfs | (secret) | Agenta store secret key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_STORE_SIGNING_KEY` | seaweedfs | - | Agenta store signing key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PORT` | agenta | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `API_HOST` | agenta | - | Api host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `OWNER_AUTH` | agenta | true | Owner auth for agenta. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MOBILE_HOST` | agenta | - | Mobile host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `SERVICES_HOST` | agenta | - | Services host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_HOST` | agenta | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | agenta | 8080 | Upstream port for agenta. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | agenta | (secret) | Generated access password. Keep private and preserve with backups. |
| `REDIS_URI` | worker-queues | - | Redis uri resolved automatically from the linked service. Keep this reference when using the included topology. |
| `START_ROLE` | worker-queues | worker-queues | Start role for worker-queues. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_API_URL` | worker-queues | - | Agenta api url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_LICENSE` | worker-queues | oss | Agenta license for worker-queues. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_WEB_URL` | worker-queues | - | Agenta web url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `API_HEALTH_URL` | worker-queues | - | Api health url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_AUTH_KEY` | worker-queues | (secret) | Agenta auth key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_CRYPT_KEY` | worker-queues | - | Agenta crypt key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRES_URI_CORE` | worker-queues | - | Postgres uri core resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_URI_DURABLE` | worker-queues | - | Redis uri durable resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_URI_VOLATILE` | worker-queues | - | Redis uri volatile resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_SERVICES_URL` | worker-queues | - | Agenta services url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRES_URI_TRACING` | worker-queues | - | Postgres uri tracing resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_API_INTERNAL_URL` | worker-queues | - | Agenta api internal url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRES_URI_SUPERTOKENS` | worker-queues | (secret) | Postgres uri supertokens resolved automatically from the linked service. Keep this reference when using the included topology. |
| `SUPERTOKENS_CONNECTION_URI` | worker-queues | (secret) | Supertokens connection uri resolved automatically from the linked service. Keep this reference when using the included topology. |
| `HOSTNAME` | web | 0.0.0.0 | Application bind address. Keep 0.0.0.0 for container networking. |
| `AGENTA_API_URL` | web | - | Agenta api url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_LICENSE` | web | oss | Agenta license for web. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_WEB_URL` | web | - | Agenta web url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_AUTH_KEY` | web | (secret) | Agenta auth key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_CRYPT_KEY` | web | - | Agenta crypt key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_MOBILE_GATE` | web | true | Agenta mobile gate for web. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_SERVICES_URL` | web | - | Agenta services url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PORT` | services | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `REDIS_URI` | services | - | Redis uri resolved automatically from the linked service. Keep this reference when using the included topology. |
| `START_ROLE` | services | services | Start role for services. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SCRIPT_NAME` | services | /services | Script name for services. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_API_URL` | services | - | Agenta api url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_LICENSE` | services | oss | Agenta license for services. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_WEB_URL` | services | - | Agenta web url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `API_HEALTH_URL` | services | - | Api health url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_AUTH_KEY` | services | (secret) | Agenta auth key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_CRYPT_KEY` | services | - | Agenta crypt key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRES_URI_CORE` | services | - | Postgres uri core resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_URI_DURABLE` | services | - | Redis uri durable resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_URI_VOLATILE` | services | - | Redis uri volatile resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_RUNNER_TOKEN` | services | (secret) | Agenta runner token resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_SERVICES_URL` | services | - | Agenta services url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_STORE_BUCKET` | services | agenta-store | Agenta store bucket for services. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `POSTGRES_URI_TRACING` | services | - | Postgres uri tracing resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_API_INTERNAL_URL` | services | - | Agenta api internal url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_STORE_ACCESS_KEY` | services | - | Agenta store access key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_STORE_SECRET_KEY` | services | (secret) | Agenta store secret key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_STORE_SIGNING_KEY` | services | - | Agenta store signing key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRES_URI_SUPERTOKENS` | services | (secret) | Postgres uri supertokens resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_STORE_ENDPOINT_URL` | services | - | Agenta store endpoint url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_RUNNER_INTERNAL_URL` | services | - | Agenta runner internal url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_SERVICES_INTERNAL_KEY` | services | - | Agenta services internal key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PORT` | api | 8000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `REDIS_URI` | api | - | Redis uri resolved automatically from the linked service. Keep this reference when using the included topology. |
| `START_ROLE` | api | api | Start role for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SCRIPT_NAME` | api | /api | Script name for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_API_URL` | api | - | Agenta api url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_LICENSE` | api | oss | Agenta license for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_WEB_URL` | api | - | Agenta web url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_AUTH_KEY` | api | (secret) | Generated agenta auth key. Keep private and preserve with backups. |
| `AGENTA_CRYPT_KEY` | api | - | Generated agenta crypt key. Keep private and preserve with backups. |
| `POSTGRES_PASSWORD` | api | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `POSTGRES_URI_CORE` | api | - | Postgres uri core resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_URI_DURABLE` | api | - | Redis uri durable resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_URI_VOLATILE` | api | - | Redis uri volatile resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_RUNNER_TOKEN` | api | (secret) | Generated agenta runner token. Keep private and preserve with backups. |
| `AGENTA_SERVICES_URL` | api | - | Agenta services url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_STORE_BUCKET` | api | agenta-store | Agenta store bucket for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `POSTGRES_URI_TRACING` | api | - | Postgres uri tracing resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ALEMBIC_CFG_PATH_CORE` | api | /app/oss/databases/postgres/migrations/core/alembic.ini | Alembic cfg path core for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_STORE_ACCESS_KEY` | api | - | Generated agenta store access key. Keep private and preserve with backups. |
| `AGENTA_STORE_JWT_ISSUER` | api | - | Agenta store jwt issuer resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_STORE_SECRET_KEY` | api | (secret) | Generated agenta store secret key. Keep private and preserve with backups. |
| `AGENTA_STORE_SIGNING_KEY` | api | - | Generated agenta store signing key. Keep private and preserve with backups. |
| `ALEMBIC_CFG_PATH_TRACING` | api | /app/oss/databases/postgres/migrations/tracing/alembic.ini | Alembic cfg path tracing for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `POSTGRES_URI_SUPERTOKENS` | api | (secret) | Postgres uri supertokens resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_STORE_ENDPOINT_URL` | api | - | Agenta store endpoint url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_RUNNER_INTERNAL_URL` | api | - | Agenta runner internal url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `SUPERTOKENS_CONNECTION_URI` | api | (secret) | Supertokens connection uri resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_SERVICES_INTERNAL_KEY` | api | - | Generated agenta services internal key. Keep private and preserve with backups. |
| `POSTGRES_DB` | postgres | agenta | Initial PostgreSQL database name, or the matching database selected by the application. |
| `DATABASE_URL` | postgres | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `AGENTA_API_URL` | runner | - | Agenta api url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_RUNNER_HOST` | runner | 0.0.0.0 | Agenta runner host for runner. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_RUNNER_PORT` | runner | 8765 | Agenta runner port for runner. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_RUNNER_TOKEN` | runner | (secret) | Agenta runner token resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_STORE_BUCKET` | runner | agenta-store | Agenta store bucket for runner. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_API_INTERNAL_URL` | runner | - | Agenta api internal url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_STORE_ACCESS_KEY` | runner | - | Agenta store access key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_STORE_SECRET_KEY` | runner | (secret) | Agenta store secret key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_STORE_SIGNING_KEY` | runner | - | Agenta store signing key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_STORE_ENDPOINT_URL` | runner | - | Agenta store endpoint url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_RUNNER_DAYTONA_TARGET` | runner | - | Optional Daytona target region. |
| `AGENTA_RUNNER_DAYTONA_API_KEY` | runner | (secret) | Required operator-owned Daytona key. Agent execution uses a separate sandbox service; no host Docker socket or FUSE device is provisioned. |
| `AGENTA_RUNNER_DAYTONA_SNAPSHOT` | runner | - | Optional Daytona snapshot name for the chosen runtime. |
| `AGENTA_RUNNER_DEFAULT_SANDBOX_PROVIDER` | runner | daytona | Agenta runner default sandbox provider for runner. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_RUNNER_ENABLED_SANDBOX_PROVIDERS` | runner | daytona | Agenta runner enabled sandbox providers for runner. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `HOSTNAME` | web-mobile | 0.0.0.0 | Application bind address. Keep 0.0.0.0 for container networking. |
| `AGENTA_API_URL` | web-mobile | - | Agenta api url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_LICENSE` | web-mobile | oss | Agenta license for web-mobile. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_WEB_URL` | web-mobile | - | Agenta web url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_AUTH_KEY` | web-mobile | (secret) | Agenta auth key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_CRYPT_KEY` | web-mobile | - | Agenta crypt key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_MOBILE_GATE` | web-mobile | true | Agenta mobile gate for web-mobile. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_SERVICES_URL` | web-mobile | - | Agenta services url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_MOBILE_REVERSE_GATE` | web-mobile | false | Agenta mobile reverse gate for web-mobile. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `POSTGRES_URI_SUPERTOKENS` | supertokens | (secret) | Postgres uri supertokens resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRESQL_CONNECTION_URI` | supertokens | - | Postgresql connection uri resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_URI` | worker-streams | - | Redis uri resolved automatically from the linked service. Keep this reference when using the included topology. |
| `START_ROLE` | worker-streams | worker-streams | Start role for worker-streams. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_API_URL` | worker-streams | - | Agenta api url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_LICENSE` | worker-streams | oss | Agenta license for worker-streams. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_WEB_URL` | worker-streams | - | Agenta web url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `API_HEALTH_URL` | worker-streams | - | Api health url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_AUTH_KEY` | worker-streams | (secret) | Agenta auth key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_CRYPT_KEY` | worker-streams | - | Agenta crypt key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRES_URI_CORE` | worker-streams | - | Postgres uri core resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_URI_DURABLE` | worker-streams | - | Redis uri durable resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_URI_VOLATILE` | worker-streams | - | Redis uri volatile resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_SERVICES_URL` | worker-streams | - | Agenta services url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRES_URI_TRACING` | worker-streams | - | Postgres uri tracing resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_API_INTERNAL_URL` | worker-streams | - | Agenta api internal url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRES_URI_SUPERTOKENS` | worker-streams | (secret) | Postgres uri supertokens resolved automatically from the linked service. Keep this reference when using the included topology. |
| `SUPERTOKENS_CONNECTION_URI` | worker-streams | (secret) | Supertokens connection uri resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_URI` | cron | - | Redis uri resolved automatically from the linked service. Keep this reference when using the included topology. |
| `START_ROLE` | cron | cron | Start role for cron. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_API_URL` | cron | - | Agenta api url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_LICENSE` | cron | oss | Agenta license for cron. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AGENTA_WEB_URL` | cron | - | Agenta web url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `API_HEALTH_URL` | cron | - | Api health url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_AUTH_KEY` | cron | (secret) | Agenta auth key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_CRYPT_KEY` | cron | - | Agenta crypt key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRES_URI_CORE` | cron | - | Postgres uri core resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_URI_DURABLE` | cron | - | Redis uri durable resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_URI_VOLATILE` | cron | - | Redis uri volatile resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_SERVICES_URL` | cron | - | Agenta services url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRES_URI_TRACING` | cron | - | Postgres uri tracing resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AGENTA_API_INTERNAL_URL` | cron | - | Agenta api internal url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRES_URI_SUPERTOKENS` | cron | (secret) | Postgres uri supertokens resolved automatically from the linked service. Keep this reference when using the included topology. |
| `SUPERTOKENS_CONNECTION_URI` | cron | (secret) | Supertokens connection uri resolved automatically from the linked service. Keep this reference when using the included topology. |

## Configuration

- **Start command:** `sh -c 'exec redis-server --bind 0.0.0.0 :: --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -lc '/app/entrypoint.sh node /app/oss/server.js'`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node_modules/.bin/tsx src/server.ts`
- **Start command:** `sh -lc '/app/entrypoint.sh node /app/mobile/server.js'`

**Category:** AI/ML · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/agenta-llm-engineering)
