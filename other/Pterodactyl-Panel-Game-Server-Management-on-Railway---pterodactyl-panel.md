# Deploy Pterodactyl Panel — Game Server Management on Railway on Railway

Self-host Pterodactyl game server panel. Private MariaDB & Redis included.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pterodactyl-panel)

## About

Pterodactyl is the open-source game server management panel that has been the standard since
2015 — a secure, MIT-licensed control panel for Minecraft, Rust, ARK, Valheim, CS2, and
hundreds of other game servers. Built with PHP, React, and Go, it gives you a clean admin UI,
per-user permissions, subusers, API access, and full server lifecycle control.

This template deploys the **Pterodactyl Panel** with a private MariaDB database, Redis for
sessions and queues, persistent panel storage, and private networking — pre-wired on Railway
for ~$5–10/month. Run the control plane in the cloud and connect your Wings game-server nodes
from any Docker-capable infrastructure.

---

Running the Pterodactyl Panel in production requires a MariaDB database, Redis for sessions and
queues, persistent storage for the panel's config and certificates, and a public HTTPS endpoint.
Without a managed host, you're configuring Docker Compose, nginx, SSL certificates, database
backups, and inter-service networking manually.

Railway handles all of it. The panel deploys with private MariaDB and Redis instances, a
persistent volume for panel state, and an automatic HTTPS domain — your control panel is live
without touching a server.

> **Important — Panel only:** This template runs the Pterodactyl **Panel** (the control
> dashboard). It does **not** run Wings or game servers on Railway, because game servers require
> Docker-in-Docker, arbitrary port ranges, and persistent workloads that Railway's platform does
> not support. Connect external Wings nodes from a VPS or dedicated server that supports Docker
> and game-server ports. This is a clean, low-cost way to host the Panel itself.

Typical cost: **~$5–10/month** on Railway's Hobby plan for the Panel, MariaDB, and Redis —
versus a VPS where you manage the OS, database, and SSL yourself.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:11.8.8` | Database |
| Redis | `redis:8.2.1` | Database |
| Pterodactyl | [ak40u/pterodactyl-railway-starter](https://github.com/ak40u/pterodactyl-railway-starter) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_USER` | MariaDB | (secret) | - |
| `MARIADB_DATABASE` | MariaDB | panel | - |
| `MARIADB_PASSWORD` | MariaDB | (secret) | - |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | Pterodactyl | 8080 | - |
| `APP_ENV` | Pterodactyl | production | - |
| `DB_PORT` | Pterodactyl | 3306 | - |
| `APP_DEBUG` | Pterodactyl | false | - |
| `REDIS_PORT` | Pterodactyl | 6379 | - |
| `ADMIN_EMAIL` | Pterodactyl | admin@example.com | - |
| `DB_PASSWORD` | Pterodactyl | (secret) | - |
| `DB_USERNAME` | Pterodactyl | (secret) | - |
| `LOG_CHANNEL` | Pterodactyl | stderr | - |
| `MAIL_MAILER` | Pterodactyl | log | - |
| `APP_TIMEZONE` | Pterodactyl | UTC | - |
| `CACHE_DRIVER` | Pterodactyl | redis | - |
| `ADMIN_PASSWORD` | Pterodactyl | (secret) | - |
| `ADMIN_USERNAME` | Pterodactyl | (secret) | - |
| `REDIS_PASSWORD` | Pterodactyl | (secret) | - |
| `SESSION_DRIVER` | Pterodactyl | redis | - |
| `TRUSTED_PROXIES` | Pterodactyl | * | - |
| `QUEUE_CONNECTION` | Pterodactyl | redis | - |
| `RECAPTCHA_ENABLED` | Pterodactyl | false | - |
| `APP_ENVIRONMENT_ONLY` | Pterodactyl | false | - |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/var`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pterodactyl-panel)
