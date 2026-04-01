# Deploy The Directus Starter Kit on Railway

Latest Directus with Redis, Postgis and S3 preconfigured!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ZOQXZf)

## About

This railway deploy button combines Directus, Redis, PostgreSQL, and S3 to enable anyone to quickly deploy everything they need right away.

This will be updated soon to allow you to easily add any extension by editing the deployed config file. 

This deploys Directus 11.7.1

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| directus/directus | `directus/directus` | Web service |
| Redis | `redis:8.2.1` | Database |
| postgis/postgis | `postgis/postgis:17-3.5` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | directus/directus | 8055 | - |
| `SECRET` | directus/directus | (secret) | - |
| `DB_CLIENT` | directus/directus | pg | - |
| `LOG_STYLE` | directus/directus | raw | - |
| `CACHE_STORE` | directus/directus | redis | - |
| `CACHE_ENABLED` | directus/directus | true | - |
| `ADMIN_PASSWORD` | directus/directus | (secret) | - |
| `CACHE_AUTO_PURGE` | directus/directus | true | - |
| `STORAGE_LOCATIONS` | directus/directus | s3 | - |
| `STORAGE_S3_DRIVER` | directus/directus | s3 | - |
| `STORAGE_S3_SECRET` | directus/directus | (secret) | - |
| `WEBSOCKETS_ENABLED` | directus/directus | true | - |
| `EXTENSIONS_LOCATION` | directus/directus | s3 | - |
| `SYNCHRONIZATION_STORE` | directus/directus | redis | - |
| `STORAGE_S3_FORCE_PATH_STYLE` | directus/directus | true | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | postgis/postgis | railway | - |
| `POSTGRES_USER` | postgis/postgis | (secret) | - |
| `POSTGRES_PASSWORD` | postgis/postgis | (secret) | - |
| `POSTGRES_INITDB_ARGS` | postgis/postgis | -c ssl=on -c ssl_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem -c ssl_key_file=/etc/ssl/private/ssl-cert-snakeoil.key | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/ZOQXZf)
