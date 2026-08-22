# Deploy Pterodactyl Panel on Railway

Game server management without compromise, ready to deploy in 1 click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pterodactyl)

## About

Pterodactyl Panel is an open-source game server management platform designed for hosting and controlling game servers through a modern web interface. This template deploys the Panel with MariaDB and Redis, providing a complete control-plane stack that can connect to external Pterodactyl Wings nodes.

![](.png)

This template deploys the **Pterodactyl Panel**, **MariaDB**, and **Redis** as a ready-to-use management stack.

The Panel provides the web interface, API, user management, server configuration, locations, nodes, allocations, databases, schedules, backups, and administrative controls.

MariaDB stores persistent Panel data, while Redis is used for cache, sessions, and queued jobs.

The Panel itself runs on Railway, while actual game workloads should run on external **Pterodactyl Wings** nodes hosted on VPS or dedicated servers with Docker support.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:11` | Database |
| Pterodactyl | `ghcr.io/pterodactyl/panel:latest` | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_URL` | MariaDB | - | Private application connection URI |
| `MARIADB_HOST` | MariaDB | - | MariaDB private hostname |
| `MARIADB_PORT` | MariaDB | 3306 | MariaDB service port |
| `MARIADB_USER` | MariaDB | (secret) | Dedicated application database user |
| `MARIADB_DATABASE` | MariaDB | panel | Database used by Pterodactyl Panel |
| `MARIADB_PASSWORD` | MariaDB | (secret) | Application database password |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | MariaDB root password |
| `PORT` | Pterodactyl | 80 | Railway public service port |
| `APP_ENV` | Pterodactyl | production | Run Panel in production mode |
| `APP_URL` | Pterodactyl | - | Public URL of the Pterodactyl Panel |
| `DB_HOST` | Pterodactyl | - | MariaDB private hostname |
| `DB_PORT` | Pterodactyl | 3306 | MariaDB service port |
| `APP_DEBUG` | Pterodactyl | false | Disable debug output |
| `REDIS_HOST` | Pterodactyl | - | Redis private hostname |
| `REDIS_PORT` | Pterodactyl | - | Redis service port |
| `DB_DATABASE` | Pterodactyl | - | Panel database name |
| `DB_PASSWORD` | Pterodactyl | (secret) | Panel database password |
| `DB_USERNAME` | Pterodactyl | (secret) | Panel database user |
| `APP_TIMEZONE` | Pterodactyl | UTC | Application timezone |
| `CACHE_DRIVER` | Pterodactyl | redis | Use Redis for cache |
| `HASHIDS_SALT` | Pterodactyl | - | Random salt for public IDs |
| `DB_CONNECTION` | Pterodactyl | mysql | Database driver used by Pterodactyl |
| `HASHIDS_LENGTH` | Pterodactyl | 8 | Length used for generated public IDs |
| `REDIS_PASSWORD` | Pterodactyl | (secret) | Redis password |
| `SESSION_DRIVER` | Pterodactyl | redis | Store sessions in Redis |
| `TRUSTED_PROXIES` | Pterodactyl | * | Trust Railway reverse proxy headers |
| `QUEUE_CONNECTION` | Pterodactyl | redis | Use Redis for queued jobs |
| `APP_ENVIRONMENT_ONLY` | Pterodactyl | false | Allow container startup to manage environment configuration |
| `REDISHOST` | Redis | - | Redis private hostname within Railway |
| `REDISPORT` | Redis | 6379 | Redis service port |
| `REDISUSER` | Redis | default | Default Redis username |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias for the generated Redis password |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/var`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pterodactyl)
