# Deploy Activepieces on Railway

Automation software that's AI-first, no-code & open-source

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/activepieces)

## About

**Activepieces** is an open-source, no-code automation platform designed to streamline business processes by integrating various applications and services. It empowers teams to build AI-driven workflows effortlessly, enhancing productivity across different domains.

Hosting Activepieces provides a robust solution for automating tasks and integrating services without the need for extensive coding knowledge. Whether you choose to self-host or utilize cloud-based deployment, Activepieces offers flexibility and control over your automation workflows. By deploying on Railway, you can leverage managed infrastructure to ensure scalability, reliability, and ease of maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Activepieces | `activepieces/activepieces:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Activepieces | 80 | - |
| `AP_JWT_SECRET` | Activepieces | (secret) | - |
| `AP_ENVIRONMENT` | Activepieces | prod | - |
| `AP_EXECUTION_MODE` | Activepieces | UNSANDBOXED | - |
| `AP_SIGN_UP_ENABLED` | Activepieces | false | - |
| `AP_POSTGRES_PASSWORD` | Activepieces | (secret) | - |
| `AP_POSTGRES_USERNAME` | Activepieces | (secret) | - |
| `AP_TELEMETRY_ENABLED` | Activepieces | false | - |
| `AP_NODE_EXECUTABLE_PATH` | Activepieces | /usr/local/bin/node | - |
| `AP_TEMPLATES_SOURCE_URL` | Activepieces | https://cloud.activepieces.com/api/v1/flow-templates | - |
| `AP_ENGINE_EXECUTABLE_PATH` | Activepieces | dist/packages/engine/main.js | - |
| `AP_FLOW_WORKER_CONCURRENCY` | Activepieces | 10 | - |
| `AP_WEBHOOK_TIMEOUT_SECONDS` | Activepieces | 30 | - |
| `AP_SANDBOX_RUN_TIME_SECONDS` | Activepieces | 600 | - |
| `AP_TRIGGER_DEFAULT_POLL_INTERVAL` | Activepieces | 5 | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/pieces`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/activepieces)
