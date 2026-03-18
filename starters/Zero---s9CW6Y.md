# Deploy Zero on Railway

Easily deploy Zero on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/s9CW6Y)

## About

This template provides an easy way to deploy [Zero](https://zero.rocicorp.dev) with a multi-node setup allowing horizontal scaling and zero-downtime deployments.

Components:
- Postgres DB (wal_level automatically set to "logical" which is need for Zero)
- [Min.io](https://min.io) bucket to store replica files
- Simple API with Drizzle and database migrations
- React frontend with Zero demo
- Zero Replication Manager
- Zero View Syncer
- Zero Migration Handler

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Console | [Ravensburg-Technologies/minio-console](https://github.com/Ravensburg-Technologies/minio-console) | Web service |
| zero-migrator | [Ravensburg-Technologies/zero-railway](https://github.com/Ravensburg-Technologies/zero-railway) | Worker |
| view-syncer | [Ravensburg-Technologies/zero-railway](https://github.com/Ravensburg-Technologies/zero-railway) (root: packages/zero) | Web service |
| Bucket | `minio/minio:latest` | Database |
| api | [Ravensburg-Technologies/zero-railway](https://github.com/Ravensburg-Technologies/zero-railway) | Web service |
| app | [Ravensburg-Technologies/zero-railway](https://github.com/Ravensburg-Technologies/zero-railway) | Web service |
| replication-manager | [Ravensburg-Technologies/zero-railway](https://github.com/Ravensburg-Technologies/zero-railway) (root: packages/zero) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `POSTGRES_INITDB_ARGS` | Postgres | --set wal_level=logical | Needed for Zero to work |
| `PORT` | Console | 9090 | - |
| `PASSWORD` | Console | (secret) | - |
| `USERNAME` | Console | (secret) | - |
| `API_URL` | zero-migrator | - | Needed as a dependency indicator to run after the api deployment. |
| `PORT` | view-syncer | 4848 | - |
| `ZERO_AUTH_SECRET` | view-syncer | (secret) | - |
| `ZERO_REPLICA_FILE` | view-syncer | sync-replica.db | - |
| `ZERO_CVR_MAX_CONNS` | view-syncer | 10 | - |
| `ZERO_NUM_SYNC_WORKERS` | view-syncer | 10 | - |
| `ZERO_UPSTREAM_MAX_CONNS` | view-syncer | 10 | - |
| `LITESTREAM_SECRET_ACCESS_KEY` | view-syncer | (secret) | - |
| `MINIO_ROOT_USER` | Bucket | (secret) | - |
| `MINIO_PUBLIC_PORT` | Bucket | 443 | - |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | - |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | - |
| `PORT` | replication-manager | 4849 | - |
| `API_URL` | replication-manager | - | Needed as a dependency indicator to run after the api deployment. |
| `ZERO_AUTH_SECRET` | replication-manager | (secret) | - |
| `ZERO_REPLICA_FILE` | replication-manager | sync-replica.db | - |
| `ZERO_CVR_MAX_CONNS` | replication-manager | 10 | - |
| `ZERO_CHANGE_MAX_CONNS` | replication-manager | 3 | - |
| `ZERO_NUM_SYNC_WORKERS` | replication-manager | 0 | - |
| `ZERO_UPSTREAM_MAX_CONNS` | replication-manager | 10 | - |
| `LITESTREAM_SECRET_ACCESS_KEY` | replication-manager | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `cd packages/zero && bun run start`
- **Healthcheck:** `/run-migration`
- **Healthcheck:** `/`
- **Start command:** `/bin/sh -c "mkdir -p \"${RAILWAY_VOLUME_MOUNT_PATH}/backup\" && exec minio server --address '[::]':$MINIO_PRIVATE_PORT \"$RAILWAY_VOLUME_MOUNT_PATH\""`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`
- **Start command:** `cd apps/api && bun run start`

**Category:** Starters · **Languages:** Dockerfile, TypeScript, CSS, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/s9CW6Y)
