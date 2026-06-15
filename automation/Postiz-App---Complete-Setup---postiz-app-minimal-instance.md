# Deploy Postiz App - Complete Setup on Railway

[Jun'26] All-in-One agentic social media scheduling tool. 1-Click Deploy🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postiz-app-minimal-instance)

## About

Postiz App - Minimal Instance is a lightweight Railway template for deploying Postiz, an open-source social media scheduling and publishing platform. It includes the core Postiz application with PostgreSQL, Redis, and persistent storage, giving you a simple starting point for hosting your own social media management instance.

Hosting Postiz App - Minimal Instance on Railway gives you a simple way to run your own social media scheduling platform without manually configuring servers, databases, cache services, or persistent storage. This template provisions the Postiz application together with PostgreSQL for database storage, Redis for caching and background processing, and a persistent volume for uploaded media and application files. It is designed as a minimal but complete setup for users who want to self-host Postiz quickly while keeping the infrastructure easy to understand, manage, and scale on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Postiz | `ghcr.io/gitroomhq/postiz-app` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Postiz | 3000 | - |
| `MAIN_URL` | Postiz | https://${RAILWAY_PUBLIC_DOMAIN} | - |
| `IS_GENERAL` | Postiz | true | - |
| `JWT_SECRET` | Postiz | (secret) | - |
| `BACKEND_URL` | Postiz | https://${RAILWAY_PUBLIC_DOMAIN}/api | - |
| `FRONTEND_URL` | Postiz | https://${RAILWAY_PUBLIC_DOMAIN} | - |
| `BACK_END_PORT` | Postiz | 3000 | - |
| `STORAGE_PROVIDER` | Postiz | local | - |
| `UPLOAD_DIRECTORY` | Postiz | /uploads | - |
| `BACKEND_INTERNAL_URL` | Postiz | http://localhost:3000 | - |
| `NEXT_PUBLIC_BACKEND_URL` | Postiz | https://${RAILWAY_PUBLIC_DOMAIN}/api | - |
| `NEXT_PUBLIC_UPLOAD_DIRECTORY` | Postiz | /uploads | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/uploads`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/postiz-app-minimal-instance)
