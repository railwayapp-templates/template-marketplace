# Deploy outline on Railway

An open source workspace for docs, wikis, whiteboards, and knowledge

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/outline-1)

## About

Outline is a fast, collaborative knowledge base for teams. Built with React and Node.js, it offers real-time editing, Markdown support, full-text search, and a clean interface for building and sharing team documentation.

Hosting Outline on Railway provisions the full stack with minimal configuration. This template includes a managed PostgreSQL database for documents, collections, and user data; a managed Redis instance for caching, sessions, and real-time collaboration; and a persistent volume for local file storage. Outline runs as a single container from the official `outlinewiki/outline` image, with `DATABASE_URL`, `REDIS_URL`, `SECRET_KEY`, `UTILS_SECRET`, and `URL` wired automatically. Database migrations run on startup, and a `/_health` healthcheck (with a 600-second timeout) waits for Postgres and Redis before marking the deployment live. Generate a Railway domain, set Google OAuth credentials for sign-in, and optionally configure SMTP for invitations and notifications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:8.2.1` | Database |
| outline | `outlinewiki/outline:latest` | Web service |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | redis | - | Redis server hostname on the private network. |
| `REDISPORT` | redis | - | Redis server hostname on the private network. |
| `REDISUSER` | redis | - | Redis username for authentication. |
| `REDIS_URL` | redis | - | Internal Redis connection URL for service-to-service communication. |
| `REDISPASSWORD` | redis | (secret) | Redis password (alias of REDIS_PASSWORD). |
| `REDIS_PASSWORD` | redis | (secret) | Auto-generated Redis password. |
| `REDIS_PUBLIC_URL` | redis | - | Public Redis connection URL via TCP proxy for external access. |
| `URL` | outline | - | Public URL of your Outline instance. Uses the Railway-generated domain. |
| `PORT` | outline | - | HTTP port for the Outline web server. Set automatically by Railway. |
| `NODE_ENV` | outline | - | Node.js runtime environment. Use production for deployed instances. |
| `REDIS_URL` | outline | - | Redis connection URL. References the managed redis service. |
| `SECRET_KEY` | outline | (secret) | Secret key for encrypting sessions and cookies. Auto-generated; do not change after first deploy. |
| `FORCE_HTTPS` | outline | - | Redirect HTTP requests to HTTPS. Should remain enabled in production. |
| `DATABASE_URL` | outline | - | PostgreSQL connection URL. References the managed postgres service. |
| `FILE_STORAGE` | outline | - | File storage backend. Use local storage with the attached volume. |
| `NODE_OPTIONS` | outline | - | Node.js runtime flags. Suppresses localStorage warnings on newer Node versions. |
| `UTILS_SECRET` | outline | (secret) | Secret used for utility operations and background tasks. Auto-generated; do not change after first deploy. |
| `DEFAULT_LANGUAGE` | outline | - | Default language for the Outline user interface. |
| `FILE_STORAGE_LOCAL_ROOT_DIR` | outline | - | Directory path for locally stored uploads and attachments. |
| `POSTGRES_DB` | postgres | - | Default database name created on initialization. |
| `DATABASE_URL` | postgres | - | Internal PostgreSQL connection URL for service-to-service communication. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL superuser username. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated PostgreSQL password. |
| `DATABASE_PUBLIC_URL` | postgres | - | Public PostgreSQL connection URL via TCP proxy for external access. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `_health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/outline/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/outline-1)
