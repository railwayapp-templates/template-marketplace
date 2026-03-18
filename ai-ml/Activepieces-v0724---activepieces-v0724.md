# Deploy Activepieces v0.72.4 on Railway

Open source no-code AI automation (alternative to n8n)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/activepieces-v0724)

## About

=======================================

**Activepieces** is an open-source, no-code automation platform designed to streamline business processes by integrating various applications and services. It empowers teams to build AI-driven workflows effortlessly, enhancing productivity across different domains.

--------------------------

Hosting Activepieces provides a robust solution for automating tasks and integrating services without the need for extensive coding knowledge. Whether you choose to self-host or utilize cloud-based deployment, Activepieces offers flexibility and control over your automation workflows. By deploying on Railway, you can leverage managed infrastructure to ensure scalability, reliability, and ease of maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| activepieces | `activepieces/activepieces:0.72.4` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_DB` | Postgres | actievepieces |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | activepieces | 80 |
| `AP_JWT_SECRET` | activepieces | (secret) |
| `AP_ENVIRONMENT` | activepieces | prod |
| `AP_EXECUTION_MODE` | activepieces | UNSANDBOXED |
| `AP_SIGN_UP_ENABLED` | activepieces | false |
| `AP_POSTGRES_PASSWORD` | activepieces | (secret) |
| `AP_POSTGRES_USERNAME` | activepieces | (secret) |
| `AP_TELEMETRY_ENABLED` | activepieces | false |
| `AP_NODE_EXECUTABLE_PATH` | activepieces | /usr/local/bin/node |
| `AP_TEMPLATES_SOURCE_URL` | activepieces | https://cloud.activepieces.com/api/v1/flow-templates |
| `AP_ENGINE_EXECUTABLE_PATH` | activepieces | dist/packages/engine/main.js |
| `AP_FLOW_WORKER_CONCURRENCY` | activepieces | 10 |
| `AP_WEBHOOK_TIMEOUT_SECONDS` | activepieces | 30 |
| `AP_SANDBOX_RUN_TIME_SECONDS` | activepieces | 600 |
| `AP_TRIGGER_DEFAULT_POLL_INTERVAL` | activepieces | 5 |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/template/activepieces-v0724)
