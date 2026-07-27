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
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISHOST` | Redis | - | Private hostname of the Redis service |
| `REDISPORT` | Redis | 6379 | Redis server port |
| `REDISUSER` | Redis | default | Redis username, usually default |
| `REDIS_URL` | Redis | - | Private Redis connection URL for internal Railway services |
| `REDISPASSWORD` | Redis | (secret) | Redis password exposed using the standard Railway variable name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated Redis password |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL using Railway's TCP proxy |
| `PORT` | Activepieces | 80 | Application port |
| `AP_REDIS_URL` | Activepieces | - | Redis connection URL |
| `AP_JWT_SECRET` | Activepieces | (secret) | Secret used to sign JWT authentication tokens |
| `AP_ENVIRONMENT` | Activepieces | prod | Application environment, such as prod or dev |
| `AP_FRONTEND_URL` | Activepieces | - | Public URL of the Activepieces frontend |
| `AP_POSTGRES_HOST` | Activepieces | - | PostgreSQL server hostname |
| `AP_POSTGRES_PORT` | Activepieces | - | PostgreSQL server port |
| `AP_ENCRYPTION_KEY` | Activepieces | - | Key used to encrypt stored credentials and sensitive data |
| `AP_EXECUTION_MODE` | Activepieces | UNSANDBOXED | Determines how workflow executions are processed |
| `AP_SIGN_UP_ENABLED` | Activepieces | false | Enables or disables new user registration |
| `AP_POSTGRES_DATABASE` | Activepieces | - | PostgreSQL database name |
| `AP_POSTGRES_PASSWORD` | Activepieces | (secret) | PostgreSQL user password |
| `AP_POSTGRES_USERNAME` | Activepieces | (secret) | PostgreSQL username |
| `AP_TELEMETRY_ENABLED` | Activepieces | false | Enables or disables anonymous telemetry |
| `AP_NODE_EXECUTABLE_PATH` | Activepieces | /usr/local/bin/node | Path to the Node.js executable |
| `AP_TEMPLATES_SOURCE_URL` | Activepieces | https://cloud.activepieces.com/api/v1/flow-templates | URL used to retrieve workflow templates |
| `AP_ENGINE_EXECUTABLE_PATH` | Activepieces | dist/packages/engine/main.js | Path to the Activepieces execution engine |
| `AP_FLOW_WORKER_CONCURRENCY` | Activepieces | 10 | Maximum number of flows processed concurrently by each worker |
| `AP_WEBHOOK_TIMEOUT_SECONDS` | Activepieces | 30 | Maximum webhook execution duration in seconds |
| `AP_SANDBOX_RUN_TIME_SECONDS` | Activepieces | 600 | Maximum sandbox execution duration in seconds |
| `AP_TRIGGER_DEFAULT_POLL_INTERVAL` | Activepieces | 5 | Default polling interval for scheduled triggers |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/api/v1/pieces`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/activepieces-3)
