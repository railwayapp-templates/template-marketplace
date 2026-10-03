# Deploy Directus | Pinned, With Admin Credentials You Can Find on Railway

Pinned image, admin password in variables instead of the deploy log.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/directus-or-pinned-1)

## About

Directus, the headless CMS, on Postgres with PostGIS, with Redis caching and a volume for uploads. Every image is pinned, and the admin credentials are in your service variables rather than the deploy log.

Log in at the domain with `admin@example.com` and the generated `ADMIN_PASSWORD`.

The existing Directus template is well built: PostGIS and Redis are pinned, files go to S3, caching and websockets are on. Two things are wrong with it.

**The Directus image itself is `:latest`**, the only unpinned image in a stack that pins everything else. Two deploys a month apart are not the same CMS, and a redeploy can change the application over a database it has already migrated.

**The administrator credentials only exist in the deploy log.** Directus creates the first user on bootstrap. With no `ADMIN_EMAIL` and `ADMIN_PASSWORD` set, it generates them and prints them, so getting in means scrolling through logs, and once the log rotates or the volume is lost, that password is gone. Here both are template variables: the password is generated, and it sits in your service settings where you can read it and change it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Directus | `directus/directus:12.4.1` | Web service |
| Redis | `redis:8.10.2-alpine` | Database |
| PostGIS | `postgis/postgis:17-3.5` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Directus | 8055 |
| `SECRET` | Directus | (secret) |
| `DB_PORT` | Directus | 5432 |
| `DB_USER` | Directus | (secret) |
| `DB_CLIENT` | Directus | pg |
| `ADMIN_EMAIL` | Directus | admin@example.com |
| `CACHE_STORE` | Directus | redis |
| `DB_PASSWORD` | Directus | (secret) |
| `CACHE_ENABLED` | Directus | true |
| `ADMIN_PASSWORD` | Directus | (secret) |
| `CACHE_AUTO_PURGE` | Directus | true |
| `STORAGE_LOCATIONS` | Directus | local |
| `STORAGE_LOCAL_ROOT` | Directus | /directus/uploads |
| `WEBSOCKETS_ENABLED` | Directus | true |
| `STORAGE_LOCAL_DRIVER` | Directus | local |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_DB` | PostGIS | directus |
| `POSTGRES_USER` | PostGIS | (secret) |
| `POSTGRES_PASSWORD` | PostGIS | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/directus/uploads`
- **Start command:** `/bin/sh -c 'redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --bind 0.0.0.0 :: --protected-mode no'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/directus-or-pinned-1)
