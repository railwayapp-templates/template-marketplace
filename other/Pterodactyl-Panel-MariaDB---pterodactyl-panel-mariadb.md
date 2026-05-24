# Deploy Pterodactyl Panel + MariaDB on Railway

Pterodactyl Panel with MariaDB, Redis, volumes, and private networking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pterodactyl-panel-mariadb)

## About

Run the Pterodactyl Panel on Railway with MariaDB, Redis, persistent panel storage, and private networking.

- `panel`: public Pterodactyl Panel service
- `mariadb`: private database service
- `redis`: private cache/session/queue service
- Persistent Panel volume for state, nginx config, certificates, and logs
- Generated database and application secrets
- First-admin creation notes in the template checklist

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
