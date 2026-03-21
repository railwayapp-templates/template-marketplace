# Deploy Inngest Production Template on Railway

[Updated Mar 2026] Preconfigured production inngest with postgres and redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/inngest-production-template)

## About

Inngest is an event-driven durable execution platform that enables developers to build reliable, multi-step workflows and background jobs without managing infrastructure. It provides automatic retries, state management, scheduling, and observability for complex serverless functions and AI workflows.

Deploying Inngest in production involves running a self-hosted server with external Postgres for persistent storage and Redis for queue and state management. The architecture includes an Event API for receiving events, a Runner for scheduling function executions, a Queue system for flow control, an Executor for running functions, and a Dashboard UI for management and monitoring. This production-ready setup uses pinned container images for stability, external databases for scalability beyond single-node deployments, and proper authentication via event keys and signing keys. The template configures all components to work together seamlessly, providing enterprise-grade reliability for workflow orchestration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| InngestPostgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| InngestRedis | `redis:8.2.1` | Database |
| InngestApp | `inngest/inngest:v1.17.5` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | InngestPostgres | railway | Default database created when image is started. |
| `DATABASE_URL` | InngestPostgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | InngestPostgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | InngestPostgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | InngestPostgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | InngestRedis | 6379 | - |
| `REDISUSER` | InngestRedis | default | - |
| `REDIS_URL` | InngestRedis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | InngestRedis | (secret) | - |
| `REDIS_PASSWORD` | InngestRedis | (secret) | - |
| `REDIS_PUBLIC_URL` | InngestRedis | - | Connection string for connecting to redis externally |
| `INNGEST_DEV` | InngestApp | 0 | - |
| `INNGEST_PORT` | InngestApp | 8288 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "inngest start --event-key $INNGEST_EVENT_KEY --signing-key $INNGEST_SIGNING_KEY --postgres-uri $INNGEST_POSTGRES_URI --redis-uri $INNGEST_REDIS_URI"`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters

[View on Railway →](https://railway.com/deploy/inngest-production-template)
