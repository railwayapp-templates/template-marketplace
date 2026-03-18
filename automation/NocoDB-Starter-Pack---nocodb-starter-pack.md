# Deploy NocoDB Starter Pack on Railway

Self-hosted NocoDB, a no-code database interface on PostgreSQL and Redis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocodb-starter-pack)

## About

Hosting NocoDB involves running the NocoDB application itself while connecting it to an external database for persistent storage. In this template, PostgreSQL is used as the primary data store and Redis is used for caching and session management. NocoDB runs as a standalone application with a public URL, while PostgreSQL and Redis remain private services. This setup ensures data durability, better performance, and a clean separation between the database layer and the user-facing interface. A persistent volume is also attached to store uploads and internal metadata.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| NocoDB | `nocodb/nocodb` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NC_AUTH_JWT_SECRET` | NocoDB | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | NocoDB | true | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/app/data/`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/nocodb-starter-pack)
