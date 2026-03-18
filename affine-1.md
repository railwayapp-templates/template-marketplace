# Deploy AFFiNE on Railway

A basic, out-of-the-box setup of Affine.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/affine-1)

## About

One-click template for AFFiNE workspace. Auto-provisions backend, database, caching. Zero config required.

Template orchestrates AFFiNE NestJS server, PostgreSQL, Redis. Links environment variables and runs pre-deploy DB migrations automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| affine | `ghcr.io/toeverything/affine:stable` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | affine | 3010 |
| `REDIS_SERVER_PASSWORD` | affine | (secret) |
| `REDIS_SERVER_USERNAME` | affine | (secret) |
| `AFFINE_INDEXER_ENABLED` | affine | false |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'node ./scripts/self-host-predeploy.js && node dist/main.js'`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.affine`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/affine-1)
