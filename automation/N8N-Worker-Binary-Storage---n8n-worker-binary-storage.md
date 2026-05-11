# Deploy N8N (Worker, Binary Storage) on Railway

n8n v2 - Redis/Worker crash fix

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-worker-binary-storage)

## About

n8n is a "fair-code" workflow automation platform blending no-code speed with code flexibility. In high-performance setups, **Workers** execute heavy tasks asynchronously to prevent blocking the main instance. **Binary Storage** is configured to save files to a **persistent local disk** , ensuring fast, low-latency access for both the main instance and workers without external cloud dependencies.

Hosting n8n in this configuration involves deploying **Queue Mode** to maximize throughput. You run a main **Editor/Webhook** instance that handles incoming traffic and immediately delegates workflow executions to separate **Worker** nodes via a Redis message broker.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker | `n8nio/n8n:stable` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:13.23` | Database |
| Redis | `redis:8.2.1` | Database |
| Primary | `n8nio/n8n:stable` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Worker | 5678 | - |
| `DB_TYPE` | Worker | postgresdb | - |
| `EXECUTIONS_MODE` | Worker | queue | - |
| `DB_POSTGRESDB_USER` | Worker | (secret) | - |
| `N8N_LISTEN_ADDRESS` | Worker | :: | - |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `PGPORT_PRIVATE` | Postgres | 5432 | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | Primary | 5678 | - |
| `DB_TYPE` | Primary | postgresdb | - |
| `DB_POSTGRESDB_USER` | Primary | (secret) | - |
| `N8N_LISTEN_ADDRESS` | Primary | :: | - |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) | - |
| `N8N_BINARY_DATA_STORAGE_PATH` | Primary | /N8N_USER_FOLDER/binaryData | - |
| `N8N_DEFAULT_BINARY_DATA_MODE` | Primary | default | - |
| `N8N_AVAILABLE_BINARY_DATA_MODES` | Primary | filesystem | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Primary | true | - |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/N8N_USER_FOLDER/binaryData`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-worker-binary-storage)
