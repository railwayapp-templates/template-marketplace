# Deploy Pterodactyl Panel + MariaDB on Railway

Pterodactyl Panel with MariaDB, Redis, volumes, and private networking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pterodactyl-panel-mariadb)

## About

# Pterodactyl Panel Railway Template

This folder tracks a Railway template for the Pterodactyl Panel.

Published template: 

## Stack

- Pterodactyl Panel via the official `ghcr.io/pterodactyl/panel` image
- MariaDB on a private Railway service, exposed to the Panel as MySQL-compatible storage
- Railway Redis on a private Railway service
- Persistent volumes for database data and Panel state/logs/config
- Railway public domain for the Panel UI

## Why This Template Should Convert

- Pterodactyl has clear marketplace demand and a high active-project ratio.
- The app is sticky because users keep game hosting control planes alive.
- The existing marketplace option leaves room for a clearer, supportable Railway-native setup.
- The official container already handles DB waiting, migrations, seeds, cron, PHP-FPM, nginx, and the queue worker.

## Runtime Shape

- `panel`
  - Image: `ghcr.io/pterodactyl/panel:latest`
  - Public domain on port `80`
  - Volume mounted at `/app/var`
- `mysql`
  - Image: `mariadb:11`
  - Private only
  - Volume mounted at `/var/lib/mysql`
- `redis`
  - Railway Redis database service
  - Private only
  - Ephemeral cache/session/queue service

## Key Variables

Panel:

- `APP_ENV=production`
- `APP_DEBUG=false`
- `PORT=80`
- `APP_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}`
- `APP_TIMEZONE=UTC`
- `APP_SERVICE_AUTHOR=noreply@example.com`
- `APP_ENVIRONMENT_ONLY=false`
- `APP_KEY=`
- `HASHIDS_SALT=`
- `HASHIDS_LENGTH=8`
- `DB_CONNECTION=mysql`
- `DB_HOST=${{mysql.RAILWAY_PRIVATE_DOMAIN}}`
- `DB_DATABASE=${{mysql.MARIADB_DATABASE}}`
- `DB_USERNAME=${{mysql.MARIADB_USER}}`
- `DB_PASSWORD=${{mysql.MARIADB_PASSWORD}}`
- `REDIS_HOST=${{Redis.RAILWAY_PRIVATE_DOMAIN}}`
- `REDIS_PORT=${{Redis.REDISPORT}}`
- `REDIS_PASSWORD=${{Redis.REDIS_PASSWORD}}`
- `CACHE_DRIVER=redis`
- `SESSION_DRIVER=redis`
- `QUEUE_CONNECTION=redis`
- `QUEUE_DRIVER=redis`
- `MAIL_MAILER=log`
- `MAIL_DRIVER=log`
- `MAIL_FROM_ADDRESS=noreply@example.com`
- `MAIL_FROM_NAME=Pterodactyl Panel`

MariaDB/MySQL-compatible database:

- `MARIADB_DATABASE=${{RAILWAY_SERVICE_NAME}}`
- `MARIADB_USER=${{RAILWAY_SERVICE_NAME}}`
- `MARIADB_PASSWORD=`
- `MARIADB_ROOT_PASSWORD=`

## Required First-Admin Step

After the first successful deploy, create the admin account from Railway SSH:

```sh
railway ssh --service panel php artisan p:user:make
```

The Panel is only the web control plane. Users still need one or more Wings nodes on infrastructure that supports Docker and game-server networking.

Railway currently supports one volume mount per service in this template flow, so the Panel persists `/app/var`. Nginx config, cert cache, and logs remain ephemeral.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mysql | `mariadb:11` | Database |
| panel | `ghcr.io/pterodactyl/panel:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MARIADB_USER` | mysql | (secret) |
| `MARIADB_PASSWORD` | mysql | (secret) |
| `MARIADB_ROOT_PASSWORD` | mysql | (secret) |
| `DB_PASSWORD` | panel | (secret) |
| `DB_USERNAME` | panel | (secret) |
| `REDIS_PASSWORD` | panel | (secret) |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/var`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pterodactyl-panel-mariadb)
