# Deploy OpenBudgeteer on Railway

Budgeting app based on the bucket budgeting principle

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/openbudgeteer)

## About

Hosting OpenBudgeteer involves running the web application alongside a PostgreSQL database for persistent financial data and a Redis instance for caching and internal coordination. On Railway, this setup is straightforward: OpenBudgeteer runs as a single service, while PostgreSQL and Redis are provisioned as managed services. Configuration is handled entirely through environment variables, with no need for Docker Compose or manual infrastructure setup. Railway manages networking, restarts, and scaling, making it well suited for a stateful application where data reliability is critical.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenBudgeteer | `axelander/openbudgeteer` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `CONNECTION_USER` | OpenBudgeteer | (secret) |
| `APPSETTINGS_CULTURE` | OpenBudgeteer | en-US |
| `CONNECTION_PASSWORD` | OpenBudgeteer | (secret) |
| `CONNECTION_PROVIDER` | OpenBudgeteer | POSTGRES |
| `APPSETTINGS_DEMO_DATA` | OpenBudgeteer | false |
| `CONNECTION_REDIS_USER` | OpenBudgeteer | (secret) |
| `APPSETTINGS_AUTH_ENABLED` | OpenBudgeteer | true |
| `APPSETTINGS_AUTH_PASSWORD` | OpenBudgeteer | (secret) |
| `APPSETTINGS_AUTH_USERNAME` | OpenBudgeteer | (secret) |
| `CONNECTION_REDIS_PASSWORD` | OpenBudgeteer | (secret) |
| `APPSETTINGS_AUTH_SESSION_DAYS` | OpenBudgeteer | 30 |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/openbudgeteer)
