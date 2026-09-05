# Deploy Pelican Panel on Railway

Pelican Panel - Minecraft, CS2, Valheim - Pterodactyl alt

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pelican)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/pelican)

Pelican Panel — open-source game server management panel with a clean UI, egg-based server templates, and multi-server support. Self-host your game servers with automated deployment, monitoring, and user management.

This template deploys three services: **pelican** (the panel), **pelican-db** (PostgreSQL 16), and **pelican-redis** (Redis 7). Database and Redis variables are pre-wired with companion references — no manual configuration needed.

Panel data persists on a Railway volume mounted at `/pelican-data` — configs, plugins, and logs survive deploys and restarts.

**First-run setup: none.** The entrypoint runs migrations and seeds automatically on boot, then creates an admin account:

- **Username:** `admin`
- **Password:** `password`

Log in and change the admin credentials from the settings page immediately after your first deploy.

The panel serves traffic through Caddy listening on Railway's injected `PORT`; Railway handles SSL termination at the proxy layer.

Key environment variables (pre-configured):

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_URL` | `${{RAILWAY_PUBLIC_DOMAIN}}` | Public URL for the panel |
| `APP_ENV` | `production` | Application environment |
| `APP_DEBUG` | `false` | Debug mode |
| `DB_CONNECTION` | `pgsql` | Database driver |
| `DB_HOST` | `${{pelican-db.RAILWAY_PRIVATE_DOMAIN}}` | Postgres companion host |
| `CACHE_DRIVER` | `redis` | Cache driver |
| `SESSION_DRIVER` | `redis` | Session driver |
| `QUEUE_DRIVER` | `redis` | Queue driver |
| `MAIL_DRIVER` | `log` | Mail driver (log/smtp) |
| `TRUSTED_PROXIES` | `*` | Trusted proxy IPs |
| `BEHIND_PROXY` | `true` | Behind Railway's reverse proxy |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pelican-db | `postgres:16` | Database |
| pelican | [INAPP-Mobile/pelican](https://github.com/INAPP-Mobile/pelican) (root: services/pelican) | Web service |
| pelican-redis | `redis:7` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | pelican-db | pelican | Default database name. Pelican uses this database for all its data. |
| `POSTGRES_PORT` | pelican-db | 5432 | Port PostgreSQL listens on inside the container. Must stay 5432. |
| `POSTGRES_USER` | pelican-db | (secret) | PostgreSQL superuser username. Referenced by pelican as ${{pelican-db.POSTGRES_USER}}. |
| `POSTGRES_PASSWORD` | pelican-db | (secret) | PostgreSQL superuser password. Auto-generated at deploy time. Referenced by pelican as ${{pelican-db.POSTGRES_PASSWORD}}. |
| `APP_ENV` | pelican | production | Application environment |
| `APP_URL` | pelican | - | Public URL for the panel |
| `DB_HOST` | pelican | - | PostgreSQL hostname. Auto-resolved to pelican-db service private domain. |
| `DB_PORT` | pelican | - | PostgreSQL port. Auto-resolved from pelican-db service. |
| `APP_DEBUG` | pelican | false | Enable debug mode |
| `REDIS_HOST` | pelican | - | Redis hostname. Auto-resolved to pelican-redis service private domain. |
| `REDIS_PORT` | pelican | - | Redis port. Auto-resolved from pelican-redis service. |
| `SKIP_CADDY` | pelican | false | Skip Caddy web server |
| `DB_DATABASE` | pelican | - | Database name. Auto-resolved from pelican-db service. |
| `DB_PASSWORD` | pelican | (secret) | Database password. Auto-resolved from pelican-db service. |
| `DB_USERNAME` | pelican | (secret) | Database username. Auto-resolved from pelican-db service. |
| `MAIL_DRIVER` | pelican | log | Mail driver (log, smtp) |
| `BEHIND_PROXY` | pelican | true | Set true if behind a reverse proxy |
| `CACHE_DRIVER` | pelican | redis | Cache driver (file, redis, memcached) |
| `QUEUE_DRIVER` | pelican | redis | Queue driver (database, redis, sync) |
| `DB_CONNECTION` | pelican | pgsql | Database driver (sqlite, mysql, pgsql) |
| `SESSION_DRIVER` | pelican | redis | Session driver (file, redis, cookie, database) |
| `TRUSTED_PROXIES` | pelican | * | Trusted proxy IPs |
| `REDIS_HOST` | pelican-redis | - | Redis internal hostname. Referenced by pelican as ${{pelican-redis.REDIS_HOST}}. |
| `REDIS_PORT` | pelican-redis | 6379 | Redis server listening port. Referenced by pelican as ${{pelican-redis.REDIS_PORT}}. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pelican-data`
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/pelican)
