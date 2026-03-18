# Deploy Trigger.dev on Railway

Deploy Trigger.dev v4 complete stack: Webapp + Supervisor

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/triggerdev)

## About

Trigger.dev is an open-source platform that lets developers reliably run long-duration background jobs—like AI workflows and data processing—directly in their codebase, without timeouts, manual scaling, or complex setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClickHouse | `clickhouse/clickhouse-server:latest` | Database |
| registry | `registry:2` | Web service |
| minio | `bitnami/minio:latest` | Database |
| nick0lay/trigger-ops-controller:latest | `ghcr.io/nick0lay/trigger-ops-controller:latest` | Worker |
| Redis | `bitnami/redis:7.2.5` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| trigger.dev | [nick0lay/trigger.dev](https://github.com/nick0lay/trigger.dev) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | Username for the ClickHouse database superuser or client |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | Password for the ClickHouse database user |
| `MINIO_BROWSER` | minio | on | Enables or disables the MinIO web browser UI ("on"/"off"). |
| `MINIO_ROOT_USER` | minio | (secret) | Username for MinIO root/admin user |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | Password for the MinIO root/admin user (min 8 chars) |
| `MINIO_DEFAULT_BUCKETS` | minio | packets | Comma-separated list of buckets to create on startup |
| `IS_ACTIVE` | nick0lay/trigger-ops-controller:latest | true | Enable/disable continuous monitoring. Set to "false" to pause monitoring without stopping container |
| `AUTO_DISABLE` | nick0lay/trigger-ops-controller:latest | true | Automatically disable monitoring after successful deployment to save resources |
| `DATABASE_URL` | nick0lay/trigger-ops-controller:latest | - | PostgreSQL connection string from Railway Postgres service. Used for logical replication configuration |
| `CHECK_INTERVAL` | nick0lay/trigger-ops-controller:latest | 1 | Monitoring frequency in minutes (1-60). How often to check supervisor health and configuration |
| `DB_SERVICE_NAME` | nick0lay/trigger-ops-controller:latest | Postgres | Name of PostgreSQL service in Railway project. Change if your service has different name |
| `SUPERVISOR_SIZE` | nick0lay/trigger-ops-controller:latest | s-1vcpu-1gb | DigitalOcean droplet size for supervisor. Options: s-1vcpu-1gb, s-2vcpu-2gb, s-2vcpu-4gb, s-4vcpu-8gb |
| `TRIGGER_VERSION` | nick0lay/trigger-ops-controller:latest | v4.0.0 | Version of Trigger.dev to deploy on supervisor. Should match your webapp version |
| `SUPERVISOR_REGION` | nick0lay/trigger-ops-controller:latest | nyc1 | DigitalOcean region where supervisor droplet will be created. Available: nyc1, nyc3, sfo3, ams3, sgp1, lon1, fra1, tor1, blr1 |
| `DIGITALOCEAN_TOKEN` | nick0lay/trigger-ops-controller:latest | (secret) | DigitalOcean API token for creating and managing droplets. Get from https://cloud.digitalocean.com/account/api/tokens. For example: dop_v1_8ca... |
| `DOCKER_REGISTRY_URL` | nick0lay/trigger-ops-controller:latest | - | Docker registry domain for supervisor images. Optional if using default Docker Hub |
| `WEBAPP_SERVICE_NAME` | nick0lay/trigger-ops-controller:latest | trigger.dev | Name of webapp service in Railway project. Used for token extraction and API configuration |
| `HEALTHY_CYCLES_BEFORE_DISABLE` | nick0lay/trigger-ops-controller:latest | 5 | Number of consecutive healthy cycles before auto-disable triggers |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | - |
| `REDIS_AOF_ENABLED` | Redis | no | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | trigger.dev | 3030 | Port to run the service. |
| `NODE_ENV` | trigger.dev | production | Set node environment, usually "production", "development". |
| `REDIS_URL` | trigger.dev | - | Redis server connection string. |
| `API_ORIGIN` | trigger.dev | - | Base URL where API is available. Used for internal/external API calls. |
| `APP_ORIGIN` | trigger.dev | - | Base URL for serving web application. |
| `DIRECT_URL` | trigger.dev | - | Direct connection URL for database. |
| `REDIS_HOST` | trigger.dev | - | Redis server hostname. |
| `REDIS_PORT` | trigger.dev | - | Redis server port. |
| `ADMIN_EMAILS` | trigger.dev | - | Regex of user emails to automatically promote to admin. |
| `DATABASE_URL` | trigger.dev | - | URL for connecting to PostgreSQL database. |
| `LOGIN_ORIGIN` | trigger.dev | (secret) | URL used for login/auth endpoints. |
| `APP_LOG_LEVEL` | trigger.dev | info | Logging level for the app, e.g. "info", "debug", etc. |
| `CLICKHOUSE_URL` | trigger.dev | - | Connection string for ClickHouse database. |
| `ENCRYPTION_KEY` | trigger.dev | - | Key for encrypting sensitive data like secrets. |
| `REDIS_PASSWORD` | trigger.dev | (secret) | Password for Redis authentication. |
| `REDIS_USERNAME` | trigger.dev | (secret) | Username for Redis authentication. |
| `SESSION_SECRET` | trigger.dev | (secret) | Secret used to sign session cookies and sessions. |
| `TRIGGER_CLI_TAG` | trigger.dev | v4 | Tag for the CLI deployment. |
| `DEPLOY_TIMEOUT_MS` | trigger.dev | 480000 | - |
| `MAGIC_LINK_SECRET` | trigger.dev | (secret) | Secret key for magic link authentication method. |
| `REDIS_TLS_DISABLED` | trigger.dev | true | Disable TLS for Redis connection if true. |
| `DEPLOY_REGISTRY_HOST` | trigger.dev | - | Docker registry host address for images. |
| `DEPLOY_IMAGE_PLATFORM` | trigger.dev | linux/amd64 | Image platform for deployments, e.g. "linux/amd64". |
| `MANAGED_WORKER_SECRET` | trigger.dev | (secret) | Secret used to authenticate managed workers. |
| `OBJECT_STORE_BASE_URL` | trigger.dev | - | Base URL for MinIO/S3-compatible object store. |
| `NODE_MAX_OLD_SPACE_SIZE` | trigger.dev | 4096 | Memory limit for Node.js process heap in MB. |
| `RUN_REPLICATION_ENABLED` | trigger.dev | 1 | Enable or disable run replication. Set to "1" to enable, "0" to disable. |
| `V4_DEPLOY_REGISTRY_HOST` | trigger.dev | - | Host for deployment registry v4. |
| `DEPLOY_REGISTRY_NAMESPACE` | trigger.dev | trigger | Namespace for Docker registry. |
| `GRACEFUL_SHUTDOWN_TIMEOUT` | trigger.dev | 1000 | Graceful shutdown timeout (ms). |
| `RUN_REPLICATION_LOG_LEVEL` | trigger.dev | info | Logging level for run replication, e.g. "info", "debug", "warn", "error". |
| `TRIGGER_BOOTSTRAP_ENABLED` | trigger.dev | 1 | Bootstrap system resources if enabled. |
| `OBJECT_STORE_ACCESS_KEY_ID` | trigger.dev | - | Secret key for MinIO/S3-compatible object store. |
| `TRIGGER_TELEMETRY_DISABLED` | trigger.dev | 1 | Disable telemetry if set. |
| `OBJECT_STORE_SECRET_ACCESS_KEY` | trigger.dev | (secret) | Secret key for MinIO/S3-compatible object store. |
| `RUN_REPLICATION_CLICKHOUSE_URL` | trigger.dev | - | Connection URL for the ClickHouse instance used specifically for run replication. |
| `DEV_OTEL_EXPORTER_OTLP_ENDPOINT` | trigger.dev | - | Endpoint for OpenTelemetry trace export (dev mode). |
| `TRIGGER_BOOTSTRAP_WORKER_GROUP_NAME` | trigger.dev | railway | Name for the worker group during bootstrap. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/bitnami`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** TypeScript, Python, JavaScript, Shell, Smarty, Dockerfile, CSS, PLpgSQL

[View on Railway →](https://railway.com/deploy/triggerdev)
