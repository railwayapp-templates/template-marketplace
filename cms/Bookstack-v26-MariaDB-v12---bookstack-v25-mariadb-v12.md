# Deploy Bookstack v26 + MariaDB v12 on Railway

Deployment of BookStack with Redis caching and MariaDB database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bookstack-v25-mariadb-v12)

## About

BookStack v25 is a modern, open-source documentation and wiki platform built with PHP/Laravel. This template includes BookStack v25 with MariaDB v12 for data persistence and Redis for session management and caching, providing a complete self-hosted documentation solution.

Hosting BookStack v25 with MariaDB v12 on Railway involves deploying three interconnected services: the BookStack application container, a MariaDB database instance, and a Redis cache server. The template automatically configures all necessary environment variables including secure auto-generated passwords, database connections, and Redis authentication. BookStack uses MariaDB for storing all content (books, chapters, pages, users, and settings) while Redis handles session storage and application caching for improved performance. The deployment requires minimal configuration - Railway handles service orchestration, networking between services, and persistent storage volumes for the database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.6.1` | Database |
| Bookstack | `andreidrang/bookstack-railway:26.03.1` | Web service |
| MariaDB | `mariadb:12.1.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PGID` | Bookstack | 1000 | - |
| `PUID` | Bookstack | 1000 | - |
| `APP_URL` | Bookstack | https://wiki.yourdomain.xyz/ | Setup your HTTPS domain/subdomain URL |
| `DB_PORT` | Bookstack | 3306 | - |
| `DB_PASSWORD` | Bookstack | (secret) | - |
| `DB_USERNAME` | Bookstack | (secret) | - |
| `CACHE_DRIVER` | Bookstack | redis | - |
| `STORAGE_TYPE` | Bookstack | s3 | - |
| `SESSION_DRIVER` | Bookstack | redis | - |
| `STORAGE_S3_SECRET` | Bookstack | (secret) | - |
| `MYSQL_USER` | MariaDB | (secret) | - |
| `MYSQL_DATABASE` | MariaDB | bookstack | - |
| `MYSQL_PASSWORD` | MariaDB | (secret) | - |
| `MYSQL_ROOT_PASSWORD` | MariaDB | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/bookstack-v25-mariadb-v12)
