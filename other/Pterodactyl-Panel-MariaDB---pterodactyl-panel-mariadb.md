# Deploy Pterodactyl Panel + MariaDB on Railway

Pterodactyl Panel with MariaDB, Redis, volumes, and private networking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pterodactyl-panel-mariadb)

## About

Run the Pterodactyl Panel on Railway with private MariaDB, Redis, a Panel volume, and a first admin created on boot.

The template starts three services:

- `panel`: public Pterodactyl Panel, pinned to v1.15.1
- `MariaDB`: private MariaDB 11.8 with a volume at `/var/lib/mysql`
- `Redis`: private cache, session, and queue store

The Panel volume at `/app/var` keeps the generated `APP_KEY`. A missing volume would mint a new key on every deploy and make encrypted node tokens unreadable.

This template runs the Panel only. It does not run Wings or game servers. Connect Wings from machines that support Docker, ports, and game workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| panel | [leoisadev1/pterodactyl-panel-mariadb](https://github.com/leoisadev1/pterodactyl-panel-mariadb) | Web service |
| MariaDB | `mariadb:11.8.8` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_PASSWORD` | panel | (secret) |
| `ADMIN_PASSWORD` | panel | (secret) |
| `REDIS_PASSWORD` | panel | (secret) |
| `MARIADB_PASSWORD` | MariaDB | (secret) |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Healthcheck:** `/auth/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/var`
- **Start command:** `/bin/bash -lc 'export MARIADB_USER="${MARIADB_USER:-pterodactyl}"; export MARIADB_DATABASE="${MARIADB_DATABASE:-panel}"; exec docker-entrypoint.sh mariadbd'`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/pterodactyl-panel-mariadb)
