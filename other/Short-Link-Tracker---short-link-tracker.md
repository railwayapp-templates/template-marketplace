# Deploy Short Link Tracker on Railway

URL shortening ,QR code generator,Analytics,Tracking

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/short-link-tracker)

## About

Short Link Tracker is a modern URL shortening platform built with Next.js 15 that provides link management, click tracking, analytics dashboards, QR code generation, CSV exports, and customizable branding. Designed for individuals, businesses, and marketing teams, it makes it easy to create, manage, and analyze shortened links from a secure web-based administration panel.

Railway makes deploying Short Link Tracker simple by automatically building the application and provisioning the required services. This template requires both PostgreSQL and Redis, which Railway can provide as managed services. PostgreSQL stores links, click analytics, settings, and authentication data, while Redis accelerates frequently accessed data and analytics. Railway also manages HTTPS, deployments, networking, and environment variables, allowing you to focus on managing your short links instead of infrastructure. Once deployed, the application includes an administrator dashboard for creating links, viewing analytics, exporting reports, and customizing branding.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| short-link-tracker | [bilalnawaz072/short-link-tracker](https://github.com/bilalnawaz072/short-link-tracker) | Web service |

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
| `PORT` | short-link-tracker | 8080 | - |
| `BASE_URL` | short-link-tracker | - | Public Railway URL used for generated short links. |
| `NODE_ENV` | short-link-tracker | production | - |
| `REDIS_URL` | short-link-tracker | - | Redis connection string. Use the Railway Redis reference variable. |
| `JWT_SECRET` | short-link-tracker | (secret) | Secret used to sign authentication tokens. |
| `DATABASE_URL` | short-link-tracker | - | PostgreSQL connection string. Use the Railway PostgreSQL reference variable. |
| `ADMIN_PASSWORD` | short-link-tracker | (secret) | Administrator login password. |
| `MAXMIND_LICENSE_KEY` | short-link-tracker | - | Optional Enables visitor country detection using MaxMind GeoLite2. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/short-link-tracker)
