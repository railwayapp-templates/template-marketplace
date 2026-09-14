# Deploy Progress Watch on Railway

Self-hostable progress tracking for anything that runs without you.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/progress-watch)

## About

Progress Watch is open source progress tracking for anything that runs without you: a crawl, a training run, a migration, a CI job, an AI agent. Each one reports counts with a single HTTP request, the CLI or MCP. You watch them live in
the browser from anywhere and get a push notification when they finish.

This template runs the published Docker image, `progresswatch/progresswatch`, with Sidekiq embedded in the web process, next to a PostgreSQL database and a Redis instance. PostgreSQL keeps spaces and the structure of each task. Redis
holds live progress and the notification queue; progress is never written to the database, so it stays small however long anything runs. A secret key is generated for every deploy, migrations run on boot, and Railway waits for `/up` to
answer before sending traffic. To turn on push notifications, add a VAPID key pair to the service variables after the first deploy, as described at https://progress.watch/docs/notifications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| progresswatch/progresswatch:latest | `progresswatch/progresswatch:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `FORCE_SSL` | progresswatch/progresswatch:latest | true |  Railway serves HTTPS |
| `REDIS_URL` | progresswatch/progresswatch:latest | - | Live progress. |
| `DATABASE_URL` | progresswatch/progresswatch:latest | - | Spaces and task structure. |
| `SECRET_KEY_BASE` | progresswatch/progresswatch:latest | (secret) | Generated for every deploy. |
| `SIDEKIQ_REDIS_URL` | progresswatch/progresswatch:latest | - |  The notification queue, on the same Redis. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/progress-watch)
