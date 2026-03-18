# Deploy Dawarich on Railway

An opensource alternative to Google Timeline (Location History)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/dawarich)

## About

**Dawarich** is a self-hostable web app designed to replace Google Timeline (aka Google Location History).

This template simplifies Dawarich deployment by patching it in a way that it can be packaged into a single docker container + redis + postgis (postgres extended to efficiently handle location data). 

To deploy it you just have to fill in a password and a timezone. Afterward deployment you can immediately login to Dawarich in the webinterface, with:

- Email: `demo@dawarich.app` (you can change this in the webinterface)
- Password - your previously set password

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PostGIS | `postgis/postgis:16-master` | Database |
| Dawarich | [lu4p/dawarich-railway](https://github.com/lu4p/dawarich-railway) | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | PostGIS | dawarich | - |
| `POSTGRES_USER` | PostGIS | (secret) | - |
| `POSTGRES_PASSWORD` | PostGIS | (secret) | - |
| `POSTGRES_INITDB_ARGS` | PostGIS | -c ssl=on -c ssl_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem -c ssl_key_file=/etc/ssl/private/ssl-cert-snakeoil.key | - |
| `PORT` | Dawarich | 3000 | - |
| `RAILS_ENV` | Dawarich | production | - |
| `TIME_ZONE` | Dawarich | - | Your timezone e.g.: Europe/Berlin |
| `SELF_HOSTED` | Dawarich | true | - |
| `STORE_GEODATA` | Dawarich | true | - |
| `SECRET_KEY_BASE` | Dawarich | (secret) | - |
| `DATABASE_PASSWORD` | Dawarich | (secret) | - |
| `DATABASE_USERNAME` | Dawarich | (secret) | - |
| `RAILS_LOG_TO_STDOUT` | Dawarich | true | - |
| `APPLICATION_PROTOCOL` | Dawarich | http | (setting this to https makes the healthcheck fail) |
| `DEFAULT_USER_PASSWORD` | Dawarich | (secret) | The password for the initial user that is going to be created (6 characters minimum) |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/app/storage`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Analytics · **Languages:** Ruby, JavaScript, HTML, CSS, Shell, Dockerfile, Procfile

[View on Railway →](https://railway.com/template/dawarich)
