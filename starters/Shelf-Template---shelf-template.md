# Deploy Shelf Template on Railway

Self-hosted saved-link manager with Postgres, Redis, and Meilisearch.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/shelf-template)

## About

Shelf is a self-hosted saved-link manager with email/password session auth, nested folders, tags, full-text search, favicon storage, and a browser-extension-friendly API.

This template deploys Shelf as a single public web/API service backed by Postgres, Redis, and Meilisearch. The app service serves the React frontend and API from the same origin, runs Drizzle migrations before startup, and exposes `/health` for Railway health checks.

After deployment, open the Shelf service URL and create the first account. Registration defaults to `first-user-only`, so signup closes automatically after the first user exists.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Meilisearch | `getmeili/meilisearch:v1.14` | Database |
| Shelf | [eden-lane/shelf](https://github.com/eden-lane/shelf) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/meili_data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, CSS, JavaScript, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/shelf-template)
