# Deploy Directus [Updated Mar ’26] (Open-Source Headless CMS & Data Platform) on Railway

Directus [Mar ’26] (Visualize & Manage Database Content) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/directus)

## About

Directus is an open-source data management platform that turns any SQL database into a powerful API and intuitive no-code app. It’s like a real-time data layer sitting on top of your database, making it simple to manage, visualize, and interact with your data without writing complex backend code. Directus is perfect for developers and teams that want to stay close to their database while enjoying the convenience of a headless CMS.

Hosting Directus on Railway allows you to take complete control of your data and deployment. You can self-host Directus to ensure all data, configurations, and integrations stay within your environment. Railway’s infrastructure simplifies the entire hosting process - from deployment and scaling to updates and backups - without the hassle of managing servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgis/postgis:16-master` | Database |
| directus | `directus/directus:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `KEY` | directus | 76bk0555vp1909pnvyka5pn6crxah3ov |
| `HOST` | directus | :: |
| `PORT` | directus | 3000 |
| `SECRET` | directus | (secret) |
| `DB_CLIENT` | directus | pg |
| `ADMIN_EMAIL` | directus | admin@example.com |
| `CACHE_STORE` | directus | redis |
| `DB_POOL__MAX` | directus | 5 |
| `DB_POOL__MIN` | directus | 0 |
| `CACHE_ENABLED` | directus | true |
| `ADMIN_PASSWORD` | directus | (secret) |
| `EXTENSIONS_PATH` | directus | /directus/data/extensions |
| `CACHE_AUTO_PURGE` | directus | true |
| `STORAGE_LOCATIONS` | directus | local |
| `STORAGE_LOCAL_ROOT` | directus | /directus/data/uploads |
| `WEBSOCKETS_ENABLED` | directus | false |
| `EMAIL_TEMPLATES_PATH` | directus | /directus/data/email |
| `SYNCHRONIZATION_STORE` | directus | redis |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | directus | true |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/directus/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/template/directus)
