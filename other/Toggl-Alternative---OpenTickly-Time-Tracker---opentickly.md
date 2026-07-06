# Deploy Toggl Alternative - OpenTickly Time Tracker on Railway

AI-friendly, Open Source time tracker & toggl-cli compatible

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opentickly)

## About

OpenTickly is a free, private-first, and AI-friendly alternative to the Toggl time tracker. It bypasses strict API rate limits to enable seamless integration with AI agents while maintaining full compatibility with Toggl, allowing you to own your productivity data without sacrificing your existing workflows.

Deploying OpenTickly on a platform like Railway involves provisioning a containerized environment to support its backend operations and web interface. The application requires persistent data storage via a PostgreSQL database and relies on Redis for caching and background processes. To host it successfully, you must deploy these companion database services alongside the main application and link them using the appropriate environment variables (`DATABASE_URL` and `REDIS_URL`). Once hosted, the web UI functions as a fully installable Progressive Web App (PWA), meaning a standard cloud deployment will allow you to install and use it directly on iOS and Android devices just like a native app.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| correctroad/opentickly:latest | `correctroad/opentickly:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | correctroad/opentickly:latest | 8080 | - |
| `OPENTOGGL_SERVICE_NAME` | correctroad/opentickly:latest | opentickly | - |
| `OPENTOGGL_REDIS_PASSWORD` | correctroad/opentickly:latest | (secret) | - |
| `OPENTOGGL_JOBS_QUEUE_NAME` | correctroad/opentickly:latest | default | - |
| `OPENTOGGL_POSTGRES_PASSWORD` | correctroad/opentickly:latest | (secret) | - |
| `OPENTOGGL_FILESTORE_NAMESPACE` | correctroad/opentickly:latest | opentoggl | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/opentickly)
