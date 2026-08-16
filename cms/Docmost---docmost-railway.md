# Deploy Docmost on Railway

Confluence alternative. Open-source collaborative wiki and documentation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docmost-railway)

## About

Docmost is an open-source collaborative wiki and documentation platform — a self-hosted alternative to Confluence and Notion. Teams use it for engineering runbooks, onboarding handbooks, product specs and meeting notes, organised into spaces with per-space and per-page permissions. The editor does real-time co-editing with live cursors, comments and mentions, nested pages, tables, diagrams, code blocks, math and attachments, plus importers for Confluence, Notion, Markdown, HTML and Word. Because it is AGPL-licensed software you run yourself, every page and attachment stays inside infrastructure you control.

Deploy Docmost on Railway and you get the production shape upstream ships, not a single container. The template runs the API and web UI as one service and the real-time collaboration server as a second, matching Docmost's own `start` and `collab` entrypoints. PostgreSQL stores pages, revisions, users, comments and the search index; Redis carries job queues, caching and the document locks that let both servers coordinate; and a Railway bucket holds every uploaded image, avatar and attachment. Your browser talks to the app over HTTP and to the collaboration service over a WebSocket, so live editing never competes with page loads.

![Docmost Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786823090/4b2af555-46fd-402f-b8f9-1047287a40cb.png)

Self-hosting Docmost makes sense when documentation is sensitive, when per-seat wiki pricing stops being worth it, or when the knowledge base should sit beside the rest of your infrastructure. The application is a NestJS API serving a React front end, with collaborative editing built on Yjs and Hocuspocus.

Key features:

- Real-time collaborative editing with live cursors, comments and @mentions
- Spaces, nested page trees, page-level permissions and public share links
- Rich editor: tables, code blocks, math, callouts, embeds and Draw.io diagrams
- Full-text search across pages, comments and attachment contents
- Page history with revision diffs, watchers, notifications and importers for Confluence, Notion, Markdown, HTML and Word

The **app service** serves the UI, the REST API and file downloads, and applies database migrations at boot. The **collaboration service** runs the same image with a different entrypoint and handles only the editing WebSocket; the browser learns where to find it from a runtime configuration value, so no reverse proxy is needed. **PostgreSQL** is the system of record, **Redis** backs queues, cache and cross-server document locking, and the **bucket** holds attachments — which is what lets both services read the same files, since disks are not shared between services on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| docmost | `docmost/docmost:0.95.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| docmost-collab | `docmost/docmost:0.95.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `PORT` | docmost | 3000 | HTTP listening port |
| `APP_URL` | docmost | - | Public base URL of the app |
| `REDIS_URL` | docmost | - | Redis connection string |
| `APP_SECRET` | docmost | (secret) | Signs session and collab tokens |
| `COLLAB_URL` | docmost | - | Collaboration server public URL |
| `DATABASE_URL` | docmost | - | PostgreSQL connection string |
| `AWS_S3_BUCKET` | docmost | - | Bucket name |
| `AWS_S3_REGION` | docmost | - | Bucket region |
| `STORAGE_DRIVER` | docmost | s3 | Store attachments in object storage |
| `AWS_S3_ENDPOINT` | docmost | - | S3-compatible endpoint |
| `AWS_S3_ACCESS_KEY_ID` | docmost | - | Bucket access key |
| `JWT_TOKEN_EXPIRES_IN` | docmost | (secret) | Session token lifetime |
| `AWS_S3_FORCE_PATH_STYLE` | docmost | true | Use path-style bucket addressing |
| `AWS_S3_SECRET_ACCESS_KEY` | docmost | (secret) | Bucket secret key |
| `POSTGRES_DB` | Postgres | rRAILWAY_PRIVATE_DOMAINailway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | docmost-collab | 3000 | Port Railway health-checks |
| `APP_URL` | docmost-collab | - | Public base URL of the app |
| `REDIS_URL` | docmost-collab | - | Redis connection string |
| `APP_SECRET` | docmost-collab | (secret) | Must match the app service exactly |
| `COLLAB_PORT` | docmost-collab | 3000 | Collaboration server listening port |
| `DATABASE_URL` | docmost-collab | - | PostgreSQL connection string |
| `AWS_S3_BUCKET` | docmost-collab | - | Bucket name |
| `AWS_S3_REGION` | docmost-collab | - | Bucket region |
| `STORAGE_DRIVER` | docmost-collab | s3 | Store attachments in object storage |
| `AWS_S3_ENDPOINT` | docmost-collab | - | S3-compatible endpoint |
| `AWS_S3_ACCESS_KEY_ID` | docmost-collab | - | Bucket access key |
| `JWT_TOKEN_EXPIRES_IN` | docmost-collab | (secret) | Session token lifetime |
| `AWS_S3_FORCE_PATH_STYLE` | docmost-collab | true | Use path-style bucket addressing |
| `AWS_S3_SECRET_ACCESS_KEY` | docmost-collab | (secret) | Bucket secret key |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `pnpm collab`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/docmost-railway)
