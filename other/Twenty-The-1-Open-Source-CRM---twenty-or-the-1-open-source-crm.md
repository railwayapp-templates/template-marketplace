# Deploy Twenty | The #1 Open-Source CRM on Railway

Modern, powerful, affordable platform to manage your customer relationships

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twenty-or-the-1-open-source-crm)

## About

Twenty is the first open-source CRM designed to provide a modern, sovereign alternative to Salesforce. Built with a flexible architecture and an intuitive interface, it allows you to manage opportunities, contacts, and sales processes while maintaining total control over your business data.

Hosting Twenty requires a robust architecture capable of simultaneously managing the application server, task queues, and the database. By deploying Twenty on Railway, you benefit from a containerized infrastructure that automatically orchestrates the Node.js backend and associated services. This template is designed for a "zero-effort" setup: all environment variables, dependencies, and network bindings are pre-configured. Railway simplifies this complexity by managing the deployment lifecycle, allowing you to move from a prototype to a production-ready instance in minutes, with no manual configuration required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Twenty Server | `twentycrm/twenty:latest` | Web service |
| Twenty Worker | `twentycrm/twenty:latest` | Database |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Twenty Server | - | Alias for NODE_PORT |
| `NODE_PORT` | Twenty Server | 3000 | The port Node is listening to |
| `REDIS_URL` | Twenty Server | - | Redis URL |
| `APP_SECRET` | Twenty Server | (secret) | Random encryption secret. Save it somewhere safe ! |
| `SERVER_URL` | Twenty Server | - | The URL used to access your app |
| `STORAGE_TYPE` | Twenty Server | s3 | The type of storage where data will be stored |
| `PG_DATABASE_URL` | Twenty Server | - | PostgreSQL URL |
| `STORAGE_S3_NAME` | Twenty Server | - | The S3 Bucket name |
| `STORAGE_S3_REGION` | Twenty Server | - | The S3 Region |
| `STORAGE_S3_ENDPOINT` | Twenty Server | - | The S3 Endpoint |
| `STORAGE_S3_ACCESS_KEY_ID` | Twenty Server | - | The S3 Access Key |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty Server | (secret) | The S3 Secret Key |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Twenty Server | true | Set to true to allow communication between containers |
| `REDIS_URL` | Twenty Worker | - | Check Twenty Server for description |
| `APP_SECRET` | Twenty Worker | (secret) | Check Twenty Server for description |
| `SERVER_URL` | Twenty Worker | - | Check Twenty Server for description |
| `STORAGE_TYPE` | Twenty Worker | - | Check Twenty Server for description |
| `PG_DATABASE_URL` | Twenty Worker | - | Check Twenty Server for description |
| `STORAGE_S3_NAME` | Twenty Worker | - | Check Twenty Server for description |
| `STORAGE_S3_REGION` | Twenty Worker | - | Check Twenty Server for description |
| `STORAGE_S3_ENDPOINT` | Twenty Worker | - | Check Twenty Server for description |
| `DISABLE_DB_MIGRATIONS` | Twenty Worker | true | Check Twenty Server for description |
| `STORAGE_S3_ACCESS_KEY_ID` | Twenty Worker | - | Check Twenty Server for description |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty Worker | (secret) | Check Twenty Server for description |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty Worker | true | Check Twenty Server for description |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Twenty Worker | - | Check Twenty Server for description |
| `REDISHOST` | Redis | - | Private domain for intercontainers networking |
| `REDISPORT` | Redis | 6379 | The port Redis will be listening to |
| `REDISUSER` | Redis | default | The Redis username |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias for REDIS_PASSWORD |
| `REDIS_PASSWORD` | Redis | (secret) | The main Redis user's password |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/packages/twenty-server/.local-storage`
- **Start command:** `yarn worker:prod`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/twenty-or-the-1-open-source-crm)
