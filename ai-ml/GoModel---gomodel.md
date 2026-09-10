# Deploy GoModel on Railway

AI gateway with PostgreSQL, Redis caching, and OpenAI/Anthropic APIs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gomodel)

## About

GoModel is a lightweight, open-source AI gateway with OpenAI-compatible and Anthropic-compatible APIs. Connect applications to multiple model providers through one endpoint, with streaming, model routing, and a built-in dashboard. Manage provider access, create application API keys, and track token usage and estimated costs in one place.

**Choose this template if…** you want a separate database, shared response caching, and the option to run multiple GoModel instances. For a simpler single-service setup, choose [GoModel Lite](https://railway.com/deploy/gomodel-lite).

The template includes GoModel's API and dashboard, PostgreSQL for persistent data, and Redis for caching, already connected over Railway's private network. HTTPS and credentials are configured automatically. No provider key is needed to deploy; bring your own provider access to make model requests. This template starts with one instance per service, not a highly available cluster. Configure database backups before production use.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GoModel | `enterpilot/gomodel:0.1.90` | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | GoModel | 8080 | HTTP listener port. Must match the public domain target port; Railway handles HTTPS. |
| `REDIS_URL` | GoModel | - | Private Redis connection for model discovery and exact-response caching. Preconfigured through a service reference. |
| `POSTGRES_URL` | GoModel | - | Private PostgreSQL connection with TLS. Preconfigured through a service reference. |
| `STORAGE_TYPE` | GoModel | postgresql | Store durable application data in the included PostgreSQL service. |
| `ADMIN_UI_ENABLED` | GoModel | true | Change to false and redeploy to hide only the dashboard while retaining the authenticated admin API. Requires ADMIN_ENDPOINTS_ENABLED=true. |
| `GOMODEL_MASTER_KEY` | GoModel | - | Generated administrator key. Retrieve from this service’s Railway Variables tab to sign in to /admin/dashboard. Keep private; use separate application keys. |
| `LOGGING_LOG_BODIES` | GoModel | false | Do not persist full prompts/responses in audit logs. Usage and metadata remain enabled. This does not disable response caching. |
| `ADMIN_ENDPOINTS_ENABLED` | GoModel | true | Change to false and redeploy to disable both the admin API and dashboard, regardless of ADMIN_UI_ENABLED. The model API remains available. |
| `RESPONSE_CACHE_SIMPLE_ENABLED` | GoModel | true | Reuse exact matching model responses. Cached content can be sensitive even with audit-body logging off. Set false and redeploy to disable exact-response caching. |
| `REDISHOST` | Redis | - | Private hostname for connections inside this Railway environment. |
| `REDISPORT` | Redis | 6379 | Redis listener port on the private network. |
| `REDISUSER` | Redis | default | Redis ACL username used in the connection URL. |
| `REDIS_URL` | Redis | - | Private Redis connection URL. Contains credentials; do not expose publicly. |
| `REDISPASSWORD` | Redis | (secret) | Password reference for Redis clients. Keep private. |
| `REDIS_PASSWORD` | Redis | (secret) | Fresh Redis password generated for each installation. Keep private. |
| `POSTGRES_DB` | Postgres | railway | Initial database created on first startup. |
| `DATABASE_URL` | Postgres | - | Private PostgreSQL connection URL. Contains credentials; do not expose publicly. GoModel adds sslmode=require. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL administrator username; used by the connection references below. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Fresh PostgreSQL password generated for each installation. Keep private. |

## Configuration

- **Healthcheck:** `/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/gomodel)
