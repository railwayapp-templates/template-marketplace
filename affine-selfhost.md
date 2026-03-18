# Deploy AFFiNE-latest on Railway

Selfhosted sync backend for AFFiNE version 0.23.0+

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/affine-selfhost)

## About

[AFFiNE](https://affine.pro) is an open-source, all-in-one workspace and an operating system for all the building blocks that assemble your knowledge base and much more -- wiki, knowledge management, presentation and digital assets. It's a better alternative to Notion and Miro.

This template offers a simple way to host AFFiNE Cloud on Railway with all the default settings. Tested for AFFiNE 0.25.7 on Jan 27, 2026 with the official recommended docker-compose setup mirrored as a Railway project. Auto update are disabled by default, but can be enabled by the user.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis` | Database |
| Postgres | `pgvector/pgvector:pg16` | Database |
| AFFiNE | `ghcr.io/toeverything/affine:stable` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | The internal private hostname used by other services within the same Railway project to reach this Redis instance. |
| `REDISPORT` | Redis | 6379 | The standard network port for Redis connections. |
| `REDISUSER` | Redis | default | The default username for Redis (Redis 6+ supports ACLs/usernames, but "default" is standard). |
| `REDIS_URL` | Redis | - | The internal connection string used by your apps running inside Railway to cache data. |
| `REDISPASSWORD` | Redis | (secret) | Sets the Redis environment variable to match the generated secret below. |
| `REDIS_PASSWORD` | Redis | (secret) | Generates a random, secure 32-character password using Railway's secret generation syntax. |
| `REDIS_PUBLIC_URL` | Redis | - | The external connection string (via TCP proxy) allowing you to connect to Redis from your local computer or outside tools. |
| `POSTGRES_DB` | Postgres | affine | The actual name of the database to be created (hardcoded to "affine"). |
| `DATABASE_URL` | Postgres | - | The internal connection string used by your apps running inside Railway. |
| `POSTGRES_USER` | Postgres | (secret) | The actual username to be created for the database owner (hardcoded to "affine"). |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generates a random, secure 32-character password using the Railway template syntax. |
| `DATABASE_PUBLIC_URL` | Postgres | - | The external connection string (using a TCP proxy) allowing you to connect to the DB from your local computer. |
| `PORT` | AFFiNE | - | Port used for railway HTTP domain, referring to the AFFiNE server port |
| `DB_DATABASE` | AFFiNE | - | The name of the PostgreSQL database to use (e.g., "affine"). |
| `DB_PASSWORD` | AFFiNE | (secret) | The password for the PostgreSQL user. |
| `DB_USERNAME` | AFFiNE | (secret) | The username for the PostgreSQL database owner. |
| `DATABASE_URL` | AFFiNE | - | The full connection string (postgres://user:pass@host:port/db) used by Prisma. |
| `AFFINE_REVISION` | AFFiNE | stable | The Docker image tag/version to pull, "stable", "beta", or "canary", etc. |
| `CONFIG_LOCATION` | AFFiNE | /root/.affine/config | The file system path where AFFiNE stores its configuration files. |
| `UPLOAD_LOCATION` | AFFiNE | /root/.affine/storage | The directory where user uploads (images, blobs) will be persisted. |
| `DB_DATA_LOCATION` | AFFiNE | - | The path on disk where PostgreSQL stores the actual raw database files. This is not relevant on railway since they are deployed as separate service and volumes, but keeping for consistency with offie AFFiNE guide |
| `REDIS_SERVER_HOST` | AFFiNE | - | The hostname or IP address of the Redis cache server. |
| `REDIS_SERVER_PORT` | AFFiNE | - | The network port for Redis (usually 6379). |
| `AFFINE_SERVER_PORT` | AFFiNE | 3010 | The internal port the AFFiNE Node.js server listens on. |
| `AFFINE_SERVER_HTTPS` | AFFiNE | false | Set to "true" if the app handles SSL termination internally; usually "false" if behind a reverse proxy (like Nginx) or using railways generated HTTP domains. |
| `REDIS_SERVER_PASSWORD` | AFFiNE | (secret) | The password for Redis authentication (leave empty if no auth is set). |
| `REDIS_SERVER_USERNAME` | AFFiNE | (secret) | The username for Redis (often "default" or empty for older Redis versions). |
| `AFFINE_SERVER_EXTERNAL_URL` | AFFiNE | - | The base link for invite and other referrence outside of server. Default to railway HTTP public domain. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.affine`

**Category:** Starters

[View on Railway →](https://railway.com/template/affine-selfhost)
