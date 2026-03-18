# Deploy Behemoth FastAPI on Railway

FastAPI Template For Engineers Building Complex Systems

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/CtmI_O)

## About

# Behemoth FastAPI
(still working on the template overview but its simple enough)

- Create a .env file
- copy the contents of the .env_sample into the .env file
- replace the values of POSTGRES_DATABASE_URL with your postgres username, password, host and port
- run `fastapi dev`
- you are good to go

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Redis | `redis:8.2.1` | Database |
| Behemoth | [GrandGaleTechnologies/behemoth-fastapi](https://github.com/GrandGaleTechnologies/behemoth-fastapi) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `ASYNC_DATABASE_URL` | Postgres | - | Database url for async database connections |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `ASYNC_DATABASE_PUBLIC_URL` | Postgres | - | Database url for public async database connections |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `DEBUG` | Behemoth | true | - |
| `SECRET_KEY` | Behemoth | (secret) | - |
| `LOGFIRE_TOKEN` | Behemoth | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, Mako, Dockerfile, Shell

[View on Railway →](https://railway.com/template/CtmI_O)
