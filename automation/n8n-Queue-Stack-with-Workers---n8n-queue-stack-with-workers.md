# Deploy n8n Queue Stack with Workers on Railway

n8n queue execution with Postgres, private Redis and a separate worker.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-queue-stack-with-workers)

## About

n8n queue execution with Postgres, private Redis and a separate worker.

This deployment fork provisions Primary, Worker, Redis, Postgres. Application domains and any authored TCP endpoints are generated for each new deployment. Database and queue services are private by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker | `n8nio/n8n@sha256:3db21366be1d3c77c1708963129c051948573019659e8873e0294be035ffc1b2` | Worker |
| Primary | `n8nio/n8n@sha256:3db21366be1d3c77c1708963129c051948573019659e8873e0294be035ffc1b2` | Web service |
| Redis | `redis@sha256:47670742d7924adbcdb404d1288b6327815b23141969c0939b8e5d61f78c2634` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl@sha256:87184beace8ec657a760401a466a13c5b689066b31b77993103b4771933a9d31` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Worker | 5678 | The HTTP port the application responds to |
| `DB_TYPE` | Worker | postgresdb | Database type |
| `NODE_OPTIONS` | Worker | --max_old_space_size=8192 | The memory limit for the task runner Node.js process |
| `EXECUTIONS_MODE` | Worker | queue | Whether executions should run directly or using queue |
| `N8N_WEBHOOK_URL` | Worker | - | Used to manually provide the Webhook URL when running n8n behind a reverse proxy |
| `DB_POSTGRESDB_HOST` | Worker | - | Database host |
| `DB_POSTGRESDB_PORT` | Worker | - | Database port |
| `DB_POSTGRESDB_USER` | Worker | (secret) | Database user |
| `N8N_LISTEN_ADDRESS` | Worker | :: | The IP address n8n should listen on |
| `QUEUE_BULL_REDIS_HOST` | Worker | - | Redis host |
| `QUEUE_BULL_REDIS_PORT` | Worker | - | Redis port |
| `DB_POSTGRESDB_DATABASE` | Worker | - | Database name |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) | Database password |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) | Redis password |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) | Redis user |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker | true | Enable dual-stack support (IPv4 and IPv6) on Redis connections |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true | Enable alpine private networking |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Worker | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Worker | true | - |
| `PORT` | Primary | 5678 | The HTTP port the application responds to |
| `DB_TYPE` | Primary | postgresdb | Database type |
| `N8N_PROTOCOL` | Primary | https | - |
| `NODE_OPTIONS` | Primary | --max_old_space_size=8192 | The memory limit for the task runner Node.js process |
| `N8N_PROXY_HOPS` | Primary | 1 | - |
| `EXECUTIONS_MODE` | Primary | queue | Whether executions should run directly or using queue |
| `N8N_TRUST_PROXY` | Primary | true | - |
| `N8N_WEBHOOK_URL` | Primary | - | Used to manually provide the Webhook URL when running n8n behind a reverse proxy |
| `DB_POSTGRESDB_HOST` | Primary | - | Database host |
| `DB_POSTGRESDB_PORT` | Primary | - | Database port |
| `DB_POSTGRESDB_USER` | Primary | (secret) | Database user |
| `N8N_ENCRYPTION_KEY` | Primary | - | Generates a secure random 32-character string |
| `N8N_LISTEN_ADDRESS` | Primary | :: | The IP address n8n should listen on |
| `EXECUTIONS_DATA_PRUNE` | Primary | true | - |
| `QUEUE_BULL_REDIS_HOST` | Primary | - | Redis host |
| `QUEUE_BULL_REDIS_PORT` | Primary | - | Redis port |
| `DB_POSTGRESDB_DATABASE` | Primary | - | Database name |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) | Database password |
| `EXECUTIONS_DATA_MAX_AGE` | Primary | 168 | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) | Redis password |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) | Redis user |
| `QUEUE_BULL_REDIS_DUALSTACK` | Primary | true | Enable dual-stack support (IPv4 and IPv6) on Redis connections |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | Primary | 5000 | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Primary | true | Enable alpine private networking |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Primary | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Primary | true | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Start command:** `n8n worker`
- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --save 60 1 --maxmemory-policy noeviction --bind 0.0.0.0 :: --dir /data'`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-queue-stack-with-workers)
