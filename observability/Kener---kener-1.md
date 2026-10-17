# Deploy Kener on Railway

Kener status page using the official v4 image and its required Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kener-1)

## About

Kener (rajnandan1/kener) is an open-source status page. This template uses the official rajnandan1/kener:4.1.7 image and v4's required Redis, instead of the existing community-fork template.

Hosting Kener on Railway means running two services: the kener service (built from the kener folder, based on rajnandan1/kener:4.1.7) on port 3000 with a volume mounted at /app/database and the /healthcheck health check, and a Railway Redis service that Kener v4 requires. The template generates KENER_SECRET_KEY, sets ORIGIN from your public Railway domain, points REDIS_URL at the Redis service and stores data in SQLite at sqlite://./database/kener.sqlite.db by default. You can optionally use a Postgres service instead of SQLite by setting DATABASE_URL to the Postgres DATABASE_URL reference.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| railway-templates | [prime3679/railway-templates](https://github.com/prime3679/railway-templates) (root: /kener) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `PORT` | railway-templates | 3000 | HTTP port Kener listens on; must match the public networking port. |
| `ORIGIN` | railway-templates | - | Public URL of the status page, derived from the Railway public domain. |
| `REDIS_URL` | railway-templates | - | Redis connection URL (Kener v4 requires Redis); references the Redis service. |
| `DATABASE_URL` | railway-templates | sqlite://./database/kener.sqlite.db | Database connection string: SQLite file by default, or ${{Postgres.DATABASE_URL}}. |
| `KENER_SECRET_KEY` | railway-templates | (secret) | Secret key used by Kener to sign sessions. Generated automatically. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/database`

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/kener-1)
