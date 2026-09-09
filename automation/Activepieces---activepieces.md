# Deploy Activepieces on Railway

Automation software that's AI-first, no-code & open-source

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/activepieces)

## About

Activepieces is an open-source, AI-powered workflow automation platform for connecting applications, APIs, data, and business processes. It is a self-hosted alternative to platforms such as Zapier, Make, and n8n.

Hosting Activepieces on Railway provides a simple way to build and run automated workflows without managing servers or complex infrastructure.

This template deploys Activepieces with PostgreSQL and Redis as separate services. PostgreSQL stores application and workflow data, while Redis is used for queues and background processing.

Railway provides private networking, persistent storage, HTTPS, environment variable management, and an easy deployment workflow.

After deployment, open the generated Activepieces public URL to access the visual workflow builder and create your automations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Activepieces | `activepieces/activepieces:0.90.4` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Activepieces | 80 | - |
| `AP_DB_TYPE` | Activepieces | POSTGRES | - |
| `AP_JWT_SECRET` | Activepieces | (secret) | - |
| `AP_ENVIRONMENT` | Activepieces | prod | - |
| `AP_EXECUTION_MODE` | Activepieces | UNSANDBOXED | - |
| `AP_TELEMETRY_ENABLED` | Activepieces | false | - |
| `AP_WORKER_CONCURRENCY` | Activepieces | 1 | - |
| `AP_FLOW_TIMEOUT_SECONDS` | Activepieces | 600 | - |
| `AP_FILE_STORAGE_LOCATION` | Activepieces | DB | - |
| `AP_WEBHOOK_TIMEOUT_SECONDS` | Activepieces | 30 | - |
| `AP_TRIGGER_DEFAULT_POLL_INTERVAL` | Activepieces | 5 | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/pieces`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Automation · **Verified:** Yes

[View on Railway →](https://railway.com/deploy/activepieces)
