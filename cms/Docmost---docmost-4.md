# Deploy Docmost on Railway

Open-source collaborative wiki and knowledge base (Notion alternative).

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docmost-4)

## About

Docmost is an open-source collaborative wiki and documentation platform — a self-hosted alternative to Notion and Confluence. It provides real-time collaborative editing, a rich-text editor with diagram support (Draw.io, Excalidraw, Mermaid), spaces and groups with granular permissions, and full-text search across your entire knowledge base.

Hosting Docmost means running the official `docmost/docmost` container alongside two stateful services: PostgreSQL, which stores all workspaces, pages, and users (schema migrations run automatically at boot), and Redis, which powers queues and real-time collaboration. The app listens on port 3000 and needs `APP_URL` (its public URL), a 32+ character `APP_SECRET`, `DATABASE_URL`, and `REDIS_URL`. Uploads and attachments live on disk at `/app/data/storage`, so a persistent volume is mounted there to survive redeploys. This template provisions all of it: Railway's official Postgres and Redis templates, connection strings injected via service references, a generated secret, and a public domain — no manual wiring required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Docmost | `docmost/docmost:0.95.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `APP_SECRET` | Docmost | (secret) |
| `DISABLE_TELEMETRY` | Docmost | true |
| `POSTGRES_DB` | Postgres | docmost |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data/storage`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/docmost-4)
