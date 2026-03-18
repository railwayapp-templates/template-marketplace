# Deploy n8n w/ worker, external pgsql on Railway

Deploy and Host n8n w/ worker, external pgsql with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-w-worker-externa)

## About

n8n is an open-source workflow automation platform. This template sets up a production-ready architecture with a primary n8n instance (handling the UI and triggers), a worker instance for background job processing, Redis for task queueing, and an external PostgreSQL database for persistent storage — all deployed on Railway.

This deployment separates the responsibilities of the n8n application to ensure better performance, fault tolerance, and scalability. The `n8n-main` service handles incoming triggers and user interactions via the UI, while the `n8n-worker` processes jobs asynchronously through a Redis queue. The external PostgreSQL database stores workflow definitions, credentials, execution logs, and more, decoupling state from the runtime. This architecture mirrors the recommended setup for production environments and gives you complete control of how you scale each component.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n-main | `n8nio/n8n:latest` | Worker |
| n8n-worker | `n8nio/n8n:latest` | Worker |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_TYPE` | n8n-main | postgresdb | - |
| `N8N_HOST` | n8n-main | 0.0.0.0 | - |
| `N8N_PORT` | n8n-main | 5678 | - |
| `QUEUE_MODE` | n8n-main | redis | - |
| `REDIS_HOST` | n8n-main | redis | - |
| `REDIS_PORT` | n8n-main | 6379 | - |
| `N8N_WORKER_ID` | n8n-main | main | - |
| `N8N_REDIS_MODE` | n8n-main | queue | - |
| `EXECUTIONS_MODE` | n8n-main | queue | - |
| `DB_POSTGRESDB_HOST` | n8n-main | ${DB_HOST} | - |
| `DB_POSTGRESDB_PORT` | n8n-main | ${DB_PORT} | - |
| `DB_POSTGRESDB_USER` | n8n-main | (secret) | - |
| `N8N_ENCRYPTION_KEY` | n8n-main | ${N8N_ENCRYPTION_KEY} | - |
| `WEBHOOK_TUNNEL_URL` | n8n-main | https://${RAILWAY_STATIC_URL} | - |
| `DB_POSTGRESDB_DATABASE` | n8n-main | ${DB_NAME} | - |
| `DB_POSTGRESDB_PASSWORD` | n8n-main | (secret) | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-main | false | - |
| `DB_TYPE` | n8n-worker | postgresdb | - |
| `QUEUE_MODE` | n8n-worker | redis | - |
| `REDIS_HOST` | n8n-worker | redis | - |
| `REDIS_PORT` | n8n-worker | 6379 | - |
| `N8N_WORKER_ID` | n8n-worker | worker | - |
| `N8N_REDIS_MODE` | n8n-worker | queue | - |
| `EXECUTIONS_MODE` | n8n-worker | queue | - |
| `DB_POSTGRESDB_HOST` | n8n-worker | ${DB_HOST} | - |
| `DB_POSTGRESDB_PORT` | n8n-worker | ${DB_PORT} | - |
| `DB_POSTGRESDB_USER` | n8n-worker | (secret) | - |
| `N8N_ENCRYPTION_KEY` | n8n-worker | ${N8N_ENCRYPTION_KEY} | - |
| `DB_POSTGRESDB_DATABASE` | n8n-worker | ${DB_NAME} | - |
| `DB_POSTGRESDB_PASSWORD` | n8n-worker | (secret) | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-worker | false | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other

[View on Railway →](https://railway.com/deploy/n8n-w-worker-externa)
