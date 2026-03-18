# Deploy Teable EE on Railway

Teable scalable edition, Airtable alternative with AI agent integrated

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/NtH5uD)

## About

# Teable Enterprise Edition

The Teable Enterprise Edition offers a more comprehensive solution for enterprise users. In addition to the basic features of the community edition, it includes AI Field, Automation, Authority Matrix, and backend management functionalities to help enterprises manage projects and teams more efficiently.

## Main Features

> For Community Edition features, please refer to [Github](https://github.com/teableio/teable)

Building upon the community edition, the enterprise edition adds the following advanced features:

#### AI Field
Text and images are automatically generated through prefabricated or custom prompts, and the generated content can be updated automatically, making it suitable for batch AI generative tasks

#### Automation

With the automation feature, you can set rules and triggers to automate repetitive tasks, improving team efficiency.

#### Authority Matrix

The advanced permission management feature allows you to have more granular control over team members' permissions, ensuring data security and operational standards.

#### Admin Panel

The Admin Panel feature provides administrators with a powerful set of tools for managing users, projects, and system settings.

## How to get License Key?
visite https://app.teable.io/setting/license-plan to subscribe to the License

## Pricing
- https://app.teable.io/public/pricing?host=self-hosted

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Console | [teableio/railway-minio-console](https://github.com/teableio/railway-minio-console) | Web service |
| Teable | `ghcr.io/teableio/teable` | Web service |
| Redis | `redis:8.2.1` | Database |
| Bucket | `minio/minio:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Console | 9090 | - |
| `PASSWORD` | Console | (secret) | - |
| `USERNAME` | Console | (secret) | - |
| `CONSOLE_VERSION` | Console | v1.7.4 | - |
| `PORT` | Teable | 3000 | - |
| `BACKEND_CACHE_PROVIDER` | Teable | redis | - |
| `BACKEND_STORAGE_PROVIDER` | Teable | minio | - |
| `NEXT_ENV_IMAGES_ALL_REMOTE` | Teable | true | - |
| `BACKEND_STORAGE_MINIO_USE_SSL` | Teable | true | - |
| `BACKEND_STORAGE_MINIO_SECRET_KEY` | Teable | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Teable | true | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `MINIO_ROOT_USER` | Bucket | (secret) | - |
| `MINIO_PUBLIC_PORT` | Bucket | 443 | - |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | - |
| `MINIO_PUBLIC_BUCKET` | Bucket | public | - |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | - |
| `MINIO_PRIVATE_BUCKET` | Bucket | private | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/NtH5uD)
