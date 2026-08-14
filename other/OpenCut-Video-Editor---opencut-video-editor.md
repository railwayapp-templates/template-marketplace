# Deploy OpenCut Video Editor on Railway

Capcut Alternative Video Editor

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencut-video-editor)

## About

OpenCut Video Editor is an open-source, web-based video editor designed for creating and editing videos directly in the browser. It provides a self-hostable alternative for browser-based video editing, allowing users to work with media and create video projects through a modern web interface.

Hosting OpenCut Video Editor on Railway uses three services: the OpenCut application, PostgreSQL, and Redis. The application runs from the `reesmorris/opencut:latest` Docker image, while PostgreSQL provides persistent relational data and Redis handles application caching and runtime data. Railway connects these services through its private network, so the database and Redis services do not need to be publicly exposed. The OpenCut service can be given a Railway-generated domain for public access, with Railway handling HTTPS and external networking. Using Railway service references for PostgreSQL and Redis keeps credentials and internal connection details within the project and makes the deployment easier to manage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| Serverless Redis HTTP | `hiett/serverless-redis-http:latest` | Database |
| OpenCut | `ghcr.io/reesmorris/opencut:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISHOST` | Redis | - | Private hostname used to connect to the Redis service. |
| `REDISPORT` | Redis | 6379 | Default port used by Redis. |
| `REDISUSER` | Redis | default | Redis username used for authentication. |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Redis password exposed through the REDISPASSWORD variable. |
| `REDIS_PASSWORD` | Redis | (secret) | Generates a secure 32-character Redis password. |
| `URL` | Serverless Redis HTTP | - | The URL for other services to access this |
| `PORT` | Serverless Redis HTTP | 80 | Configure the port SRH runs on. |
| `SRH_MODE` | Serverless Redis HTTP | env | Can be `env` or `file`. If file, see Connecting to multiple Redis servers. |
| `SRH_TOKEN` | Serverless Redis HTTP | (secret) | Set the token that the Rest API will require |
| `SRH_CONNECTION_STRING` | Serverless Redis HTTP | - | Sets the connection string to the Redis server. |
| `PORT` | OpenCut | 8080 | The port the app runs on |
| `DATABASE_URL` | OpenCut | - | Postgres connection string |
| `BETTER_AUTH_URL` | OpenCut | - | Base URL of the app |
| `BETTER_AUTH_SECRET` | OpenCut | (secret) | Random value used by the library for encryption and generating hashes |
| `UPSTASH_REDIS_REST_URL` | OpenCut | - | The URL of the Serverless Redis HTTP endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | OpenCut | (secret) | The same token used by Serverless Redis HTTP |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`

**Category:** Other

[View on Railway →](https://railway.com/deploy/opencut-video-editor)
