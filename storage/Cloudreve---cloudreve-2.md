# Deploy Cloudreve on Railway

A powerful self-hosted file manager for multi-cloud storage and sharing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudreve-2)

## About

Cloudreve is a self-hosted file management and multi-cloud storage platform that provides a modern web interface for uploading, organizing, sharing, and managing files across local and external storage providers.

This Railway template deploys Cloudreve with PostgreSQL and Redis for a more production-ready setup.

This template deploys Cloudreve using the official `cloudreve/cloudreve:v4` container image.

Cloudreve provides a full web-based user interface and API through port `5212`. PostgreSQL is used as the primary database, while Redis provides cache and supporting runtime functionality.

A persistent Railway volume is mounted at `/cloudreve/data` to preserve Cloudreve application data across deployments and restarts.

Only the Cloudreve service is exposed publicly. PostgreSQL and Redis remain accessible through Railway's private network.

After deployment, open the generated Railway domain and register your first Cloudreve account. The first registered user becomes the administrator.

> ⚠️ **Important:** Register the first account immediately after deployment. The first registered account receives administrator privileges.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Cloudreve | `cloudreve/cloudreve:v4` | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `CR_CONF_Redis.DB` | Cloudreve | 0 | Redis logical database |
| `CR_CONF_Redis.User` | Cloudreve | - | Railway Redis ACL username |
| `CR_CONF_Redis.Server` | Cloudreve | - | Railway Redis private endpoint |
| `CR_CONF_Database.Host` | Cloudreve | - | Railway PostgreSQL private hostname |
| `CR_CONF_Database.Name` | Cloudreve | - | Railway PostgreSQL database name |
| `CR_CONF_Database.Port` | Cloudreve | - | Railway PostgreSQL port |
| `CR_CONF_Database.Type` | Cloudreve | postgres | Use PostgreSQL as Cloudreve database |
| `CR_CONF_Database.User` | Cloudreve | - | Railway PostgreSQL username |
| `CR_CONF_Redis.Password` | Cloudreve | (secret) | Railway Redis password |
| `CR_CONF_Database.Password` | Cloudreve | (secret) | Railway PostgreSQL password |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/cloudreve/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/cloudreve-2)
