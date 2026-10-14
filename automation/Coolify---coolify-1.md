# Deploy Coolify on Railway

Deploy and host Coolify on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/coolify-1)

## About

Coolify is an open-source, self-hostable PaaS — an alternative to Heroku, Netlify and Vercel that deploys applications, databases and services onto servers you own. This template runs the Coolify control plane on Railway, with the full web UI, while your actual workloads are built and deployed over SSH on your own remote servers.

![Coolify](https://raw.githubusercontent.com/FournyP/coolify-railway-template/main/assets/coolify-banner.png)

Coolify is a Laravel application: an nginx + php-fpm web tier, a Horizon queue worker, a scheduler, a Reverb websocket server for live logs, and a terminal server for the in-browser terminal. It stores every server, application, secret and SSH key in Postgres, and uses Redis for queues and cache. Coolify itself never builds a container image — it generates shell scripts and pipes them over SSH to the servers you register, where `git clone` and `docker build` actually run. That makes it a natural fit for Railway: the control plane runs as an ordinary stateless web service with no Docker socket and no privileged access, while the heavy build work happens on your own hardware. Railway handles the domain, TLS, Postgres, Redis and private networking, so there is no VPS to patch just to keep the dashboard online.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Coolify | [FournyP/coolify-railway-template](https://github.com/FournyP/coolify-railway-template) (root: coolify) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_ENV` | Coolify | production | Laravel environment name. Kept at production. |
| `APP_KEY` | Coolify | - | Laravel encryption key that protects every registered server's SSH private key. Auto-generated — never rotate it. |
| `APP_URL` | Coolify | - | Public URL of this Coolify instance, built from Railway's public domain. |
| `DB_HOST` | Coolify | - | Postgres host, linked from the postgres service. |
| `DB_PORT` | Coolify | - | Postgres port, linked from the postgres service. |
| `APP_NAME` | Coolify | Coolify | Display name for the Coolify instance. |
| `APP_DEBUG` | Coolify | false | Enables Laravel debug mode. Keep false in production. |
| `AUTOUPDATE` | Coolify | false | Enables Coolify's built-in self-updater. Left false — the updater can't work on Railway. |
| `REDIS_HOST` | Coolify | - | Redis host, linked from the redis service. |
| `REDIS_PORT` | Coolify | - | Redis port, linked from the redis service. |
| `DB_DATABASE` | Coolify | - | Postgres database name, linked from the postgres service. |
| `DB_PASSWORD` | Coolify | (secret) | Postgres password, linked from the postgres service. |
| `DB_USERNAME` | Coolify | (secret) | Postgres username, linked from the postgres service. |
| `PUSHER_APP_ID` | Coolify | - | Reverb app ID. Reverb runs inside this container and reads the same value. |
| `PUSHER_APP_KEY` | Coolify | - | Reverb app key. Reverb runs inside this container and reads the same value. |
| `REDIS_PASSWORD` | Coolify | (secret) | Redis password, linked from the redis service. |
| `PHP_MEMORY_LIMIT` | Coolify | 512M | PHP-FPM memory limit for the Coolify container. |
| `PUSHER_APP_SECRET` | Coolify | (secret) | Reverb app secret. Reverb runs inside this container and reads the same value. |
| `NIGHTWATCH_ENABLED` | Coolify | false | Not used in this setup — nothing reads this variable here. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Automation · **Languages:** Python, TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/coolify-1)
