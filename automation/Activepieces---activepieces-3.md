# Deploy Activepieces on Railway

Open-source alternative to Zapier, make.com, n8n

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/activepieces-3)

## About

-

-

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |
| Activepieces | `activepieces/activepieces:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | - | Default PostgreSQL database to create |
| `DATABASE_URL` | Postgres | - | Private PostgreSQL connection URL for internal Railway services |
| `POSTGRES_USER` | Postgres | (secret) | Default PostgreSQL administrator username |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Randomly generated PostgreSQL password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public PostgreSQL connection URL using Railway's TCP proxy |
| `REDISHOST` | Redis | - | Private hostname of the Redis service |
| `REDISPORT` | Redis | - | Redis server port |
| `REDISUSER` | Redis | - | Redis username, usually default |
| `REDIS_URL` | Redis | - | Private Redis connection URL for internal Railway services |
| `REDISPASSWORD` | Redis | (secret) | Redis password exposed using the standard Railway variable name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated Redis password |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL using Railway's TCP proxy |
| `PORT` | Activepieces | - | Application port |
| `AP_REDIS_URL` | Activepieces | - | Redis connection URL |
| `AP_JWT_SECRET` | Activepieces | (secret) | Secret used to sign JWT authentication tokens |
| `AP_ENVIRONMENT` | Activepieces | - | Application environment, such as prod or dev |
| `AP_FRONTEND_URL` | Activepieces | - | Public URL of the Activepieces frontend |
| `AP_POSTGRES_HOST` | Activepieces | - | PostgreSQL server hostname |
| `AP_POSTGRES_PORT` | Activepieces | - | PostgreSQL server port |
| `AP_ENCRYPTION_KEY` | Activepieces | - | Key used to encrypt stored credentials and sensitive data |
| `AP_EXECUTION_MODE` | Activepieces | - | Determines how workflow executions are processed |
| `AP_SIGN_UP_ENABLED` | Activepieces | - | Enables or disables new user registration |
| `AP_POSTGRES_DATABASE` | Activepieces | - | PostgreSQL database name |
| `AP_POSTGRES_PASSWORD` | Activepieces | (secret) | PostgreSQL user password |
| `AP_POSTGRES_USERNAME` | Activepieces | (secret) | PostgreSQL username |
| `AP_TELEMETRY_ENABLED` | Activepieces | - | Enables or disables anonymous telemetry |
| `AP_NODE_EXECUTABLE_PATH` | Activepieces | - | Path to the Node.js executable |
| `AP_TEMPLATES_SOURCE_URL` | Activepieces | - | URL used to retrieve workflow templates |
| `AP_ENGINE_EXECUTABLE_PATH` | Activepieces | - | Path to the Activepieces execution engine |
| `AP_FLOW_WORKER_CONCURRENCY` | Activepieces | - | Maximum number of flows processed concurrently by each worker |
| `AP_WEBHOOK_TIMEOUT_SECONDS` | Activepieces | - | Maximum webhook execution duration in seconds |
| `AP_SANDBOX_RUN_TIME_SECONDS` | Activepieces | - | Maximum sandbox execution duration in seconds |
| `AP_TRIGGER_DEFAULT_POLL_INTERVAL` | Activepieces | - | Default polling interval for scheduled triggers |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/api/v1/pieces`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/activepieces-3)
