# Deploy Activepieces w/ Zero Configuration on Railway

Activepieces template fully configured for Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/activepieces-w-zero-configuration)

## About

### What is Activepieces w/ Zero Configuration?  
Activepieces is an open-source automation platform for building workflows without code. This Zero Configuration template deploys the full Activepieces platform inside a production-ready Docker container on Railway—no setup, no server configuration, and no DevOps experience required.

---

Hosting Activepieces with Zero Configuration on Railway provides an instant, pre-configured automation environment. The template handles Docker execution, environment variables, port mapping, and database connectivity automatically. Once deployed, you immediately gain access to the visual flow builder, webhook triggers, background workers, and scheduling engine. Railway manages scaling, logs, restarts, and networking so you can focus on building automations instead of managing servers.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Activepieces | `activepieces/activepieces:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Activepieces | 80 |
| `AP_JWT_SECRET` | Activepieces | (secret) |
| `AP_ENVIRONMENT` | Activepieces | prod |
| `AP_EXECUTION_MODE` | Activepieces | UNSANDBOXED |
| `AP_SIGN_UP_ENABLED` | Activepieces | false |
| `AP_POSTGRES_PASSWORD` | Activepieces | (secret) |
| `AP_POSTGRES_USERNAME` | Activepieces | (secret) |
| `AP_TELEMETRY_ENABLED` | Activepieces | false |
| `AP_NODE_EXECUTABLE_PATH` | Activepieces | /usr/local/bin/node |
| `AP_TEMPLATES_SOURCE_URL` | Activepieces | https://cloud.activepieces.com/api/v1/flow-templates |
| `AP_ENGINE_EXECUTABLE_PATH` | Activepieces | dist/packages/engine/main.js |
| `AP_FLOW_WORKER_CONCURRENCY` | Activepieces | 10 |
| `AP_WEBHOOK_TIMEOUT_SECONDS` | Activepieces | 30 |
| `AP_SANDBOX_RUN_TIME_SECONDS` | Activepieces | 600 |
| `AP_TRIGGER_DEFAULT_POLL_INTERVAL` | Activepieces | 5 |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/v1/pieces`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/activepieces-w-zero-configuration)
