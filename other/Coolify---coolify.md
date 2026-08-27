# Deploy Coolify on Railway

Dashboard that deploys apps and databases to your own servers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/coolify)

## About

Coolify is an open-source, self-hostable platform-as-a-service: a dashboard that connects over SSH to servers you already own and deploys applications, databases and one-click services onto them. It gives small teams the Heroku workflow — push a repository, get a container with TLS, logs, backups and rollbacks — without the per-seat bill, and suits a solo developer with one VPS as readily as an agency running a dozen clients.

Deploy Coolify on Railway and the control plane lives here while your workloads stay on your own machines. This template runs the dashboard, its realtime tier, a Caddy router, PostgreSQL and Redis. The router sends the dashboard to the Coolify container and the websocket paths to the realtime container, so build logs stream live. PostgreSQL holds every project, server and encrypted SSH key; Redis carries the queue Horizon drains. To self-host Coolify without dedicating a server to the dashboard, this is the shape.

![Diagram of the Coolify, realtime, proxy, Postgres and Redis services](https://res.cloudinary.com/rroe4rtk/image/upload/v1787754696/coolify-architecture.png)

Coolify replaces the pile of scripts most teams accumulate around a VPS. It watches a Git repository, builds with Nixpacks, a Dockerfile or a Compose file, runs the container behind Traefik or Caddy with Let's Encrypt certificates, and keeps the previous release so a rollback is one click. It also backs databases up to S3 on a schedule.

Self-hosting it pays off when you want the workflow but not the platform bill, when data residency rules pin workloads to specific machines, or when you already pay for idle servers.

Key features:

- Git-driven deployments from GitHub, GitLab, Gitea and Bitbucket, with per-branch previews
- One-click databases — PostgreSQL, MySQL, MariaDB, MongoDB, Redis, Dragonfly, ClickHouse
- Hundreds of packaged services, from n8n and Ghost to Supabase and Plausible
- Automatic TLS, custom domains and per-resource environment variables
- Scheduled S3 backups, scheduled tasks, teams, roles, API tokens and a full REST API

Three parts sit above the datastores. The **Coolify** container runs the Laravel application, its Horizon queue workers and the scheduler. The **realtime** container runs a Pusher-compatible websocket server that pushes build logs into the browser. The **proxy** owns the public domain and splits it: `/app/*` reaches the websocket server, everything else the dashboard — necessary because the browser derives its socket address from the page it is on.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| coolify-realtime | `coollabsio/coolify-realtime:latest` | Worker |
| coolify | [gridalpha/coolify-railway](https://github.com/gridalpha/coolify-railway) | Database |
| proxy | [gridalpha/coolify-railway](https://github.com/gridalpha/coolify-railway) | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | coolify-realtime | 6002 | Port the health check probes |
| `APP_NAME` | coolify-realtime | Coolify | Must match the app, it derives the session cookie name |
| `SOKETI_HOST` | coolify-realtime | :: | IPv6 bind, required on the private network |
| `SOKETI_DEBUG` | coolify-realtime | false | Quiet websocket logging |
| `SOKETI_DEFAULT_APP_ID` | coolify-realtime | - | Shared realtime app id |
| `SOKETI_DEFAULT_APP_KEY` | coolify-realtime | - | Shared realtime app key |
| `SOKETI_DEFAULT_APP_SECRET` | coolify-realtime | (secret) | Shared realtime app secret |
| `PORT` | coolify | 8080 | HTTP port nginx listens on |
| `APP_ID` | coolify | - | Instance identifier |
| `APP_ENV` | coolify | production | Laravel environment |
| `APP_KEY` | coolify | - | At-rest encryption key, never change it |
| `APP_URL` | coolify | - | Public dashboard URL |
| `APP_NAME` | coolify | Coolify | Branding and session cookie name |
| `APP_DEBUG` | coolify | false | Keep stack traces off in production |
| `REDIS_URL` | coolify | - | Redis connection string |
| `SELF_HOSTED` | coolify | true | Enables the self-hosted feature set |
| `CACHE_DRIVER` | coolify | redis | Cache and scheduler locks |
| `DATABASE_URL` | coolify | - | PostgreSQL connection string |
| `PUSHER_APP_ID` | coolify | - | Realtime app id |
| `PUSHER_SCHEME` | coolify | http | Plain HTTP on the private network |
| `ROOT_USERNAME` | coolify | (secret) | Display name of the first admin |
| `PUSHER_APP_KEY` | coolify | - | Realtime app key |
| `SESSION_DRIVER` | coolify | database | Sessions survive redeploys |
| `ROOT_USER_EMAIL` | coolify | admin@coolify.io | Change to your own email before deploying |
| `BROADCAST_DRIVER` | coolify | pusher | Realtime driver |
| `PHP_MEMORY_LIMIT` | coolify | 512M | PHP memory ceiling |
| `QUEUE_CONNECTION` | coolify | redis | Horizon queue backend |
| `PUSHER_APP_SECRET` | coolify | (secret) | Realtime app secret |
| `PHP_FPM_PM_CONTROL` | coolify | dynamic | Worker pool mode |
| `ROOT_USER_PASSWORD` | coolify | (secret) | First admin password, read it back here |
| `PUSHER_BACKEND_HOST` | coolify | - | Private websocket host |
| `PUSHER_BACKEND_PORT` | coolify | 6001 | Private websocket port |
| `PHP_FPM_PM_MAX_CHILDREN` | coolify | 12 | Worker ceiling |
| `PHP_FPM_PM_START_SERVERS` | coolify | 2 | Workers at boot |
| `PHP_FPM_PM_MAX_SPARE_SERVERS` | coolify | 6 | Maximum idle workers |
| `PHP_FPM_PM_MIN_SPARE_SERVERS` | coolify | 1 | Minimum idle workers |
| `PORT` | proxy | 8080 | Public listening port |
| `APP_HOST` | proxy | - | Dashboard upstream |
| `REALTIME_HOST` | proxy | - | Websocket upstream |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/ready`
- **Volume:** `/var/www/html/storage/app`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/coolify)
