# Deploy N8N with workers [Mar ’26] on Railway

[Updated Mar '26] Deploy and Host N8N with Workers with one click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/n8n-with-workers-and-queue-redis-postgre)

## About

Deploying N8N with Workers on Railway involves running n8n in queue mode alongside multiple distributed worker containers. Redis handles job distribution, while PostgreSQL serves as the workflow database. With Railway, you can easily orchestrate these services through managed templates, configure environment variables for seamless integration, and enable persistent storage with resilient backups. Railway’s scalable infrastructure allows you to add more worker containers as automation workloads increase, ensuring reliability, speed, and minimal operational overhead, perfect for scaling business automation solutions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |
| N8N UI | [Shinyduo/n8n-railway-updated](https://github.com/Shinyduo/n8n-railway-updated) | Web service |
| N8N Worker | [Shinyduo/n8n-railway-updated](https://github.com/Shinyduo/n8n-railway-updated) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | N8N UI | 5678 |
| `DB_TYPE` | N8N UI | postgresdb |
| `PASSWORD` | N8N UI | (secret) |
| `USERNAME` | N8N UI | (secret) |
| `NODE_OPTIONS` | N8N UI | --max_old_space_size=8192 |
| `N8N_PROXY_HOPS` | N8N UI | 1 |
| `EXECUTIONS_MODE` | N8N UI | queue |
| `DB_POSTGRESDB_USER` | N8N UI | (secret) |
| `N8N_LISTEN_ADDRESS` | N8N UI | :: |
| `N8N_RUNNERS_ENABLED` | N8N UI | true |
| `EXECUTIONS_DATA_PRUNE` | N8N UI | true |
| `DB_POSTGRESDB_PASSWORD` | N8N UI | (secret) |
| `N8N_EXPRESS_TRUST_PROXY` | N8N UI | true |
| `QUEUE_BULL_REDIS_PASSWORD` | N8N UI | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | N8N UI | (secret) |
| `QUEUE_BULL_REDIS_DUALSTACK` | N8N UI | true |
| `N8N_DEFAULT_BINARY_DATA_MODE` | N8N UI | filesystem |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | N8N UI | 200 |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | N8N UI | true |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | N8N UI | true |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | N8N UI | true |
| `PORT` | N8N Worker | 5678 |
| `DB_TYPE` | N8N Worker | postgresdb |
| `PASSWORD` | N8N Worker | (secret) |
| `USERNAME` | N8N Worker | (secret) |
| `NODE_OPTIONS` | N8N Worker | --max_old_space_size=8192 |
| `N8N_PROXY_HOPS` | N8N Worker | 1 |
| `EXECUTIONS_MODE` | N8N Worker | queue |
| `DB_POSTGRESDB_USER` | N8N Worker | (secret) |
| `N8N_LISTEN_ADDRESS` | N8N Worker | :: |
| `N8N_RUNNERS_ENABLED` | N8N Worker | true |
| `N8N_SKIP_MIGRATIONS` | N8N Worker | true |
| `EXECUTIONS_DATA_PRUNE` | N8N Worker | true |
| `DB_POSTGRESDB_PASSWORD` | N8N Worker | (secret) |
| `N8N_EXPRESS_TRUST_PROXY` | N8N Worker | true |
| `QUEUE_BULL_REDIS_PASSWORD` | N8N Worker | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | N8N Worker | (secret) |
| `QUEUE_BULL_REDIS_DUALSTACK` | N8N Worker | true |
| `N8N_DEFAULT_BINARY_DATA_MODE` | N8N Worker | filesystem |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | N8N Worker | 200 |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | N8N Worker | true |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | N8N Worker | true |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | N8N Worker | true |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`
- **Start command:** `n8n worker`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/n8n-with-workers-and-queue-redis-postgre)
