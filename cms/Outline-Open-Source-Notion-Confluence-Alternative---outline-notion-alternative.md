# Deploy Outline | Open Source Notion, Confluence Alternative on Railway

Self-host Outline. Fast Wiki, Docs, Search, Real-Time Collab

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/outline-notion-alternative)

## About

Outline is a fast, open-source team knowledge base and wiki — a self-hosted alternative to Notion and Confluence built on Node.js and React. It gives teams a polished, Markdown-first editor with real-time collaboration, nested collections, powerful search, and 20+ integrations (Slack, Figma, Loom, and more). 

Deploy Outline on Railway with this template and get a production-ready three-service stack — the Outline app, PostgreSQL, and Redis — all pre-wired over Railway's private network with one click. 

![Outline Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773684562/Outline_Railway_Arch_pgwc3p.png)

Outline ([github.com/outline/outline](https://github.com/outline/outline), Docker image: `docker.getoutline.com/outlinewiki/outline:latest`) is a knowledge management platform designed for teams that want the Notion experience with full data ownership. It runs as a Node.js server backed by PostgreSQL for document storage and Redis for WebSocket sessions, caching, and background queues. On Railway, all three services communicate exclusively over the private network — Postgres and Redis are never exposed publicly.

Key features:
- Real-time collaborative editing with comments and @mentions
- Slash commands, Markdown shortcuts, and media embeds
- Nested documents, automatic backlinks, and millisecond-speed search
- Collections with granular read/write permissions and user groups
- Public document sharing and guest user support
- 20+ integrations: Slack, Figma, Loom, Zapier, and an open REST API
- RTL support and translations in 20+ languages
- Dark mode

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| Outline | `outlinewiki/outline` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `URL` | Outline | - | Public Outline instance URL |
| `PORT` | Outline | 3000 | HTTP server listening port |
| `NODE_ENV` | Outline | production | Application runtime environment mode |
| `PGSSLMODE` | Outline | disable | Disable SSL for Postgres connection |
| `REDIS_URL` | Outline | - | Redis connection URL with IPv6 |
| `SECRET_KEY` | Outline | (secret) | Application secret encryption key |
| `FORCE_HTTPS` | Outline | true | Force HTTPS for all requests |
| `DATABASE_URL` | Outline | - | Postgres database connection string |
| `FILE_STORAGE` | Outline | local | File storage backend type |
| `UTILS_SECRET` | Outline | (secret) | Internal utilities secret key |
| `ENABLE_UPDATES` | Outline | true | Enable automatic application updates |
| `WEB_CONCURRENCY` | Outline | 1 | Number of Node.js worker processes |
| `DEFAULT_LANGUAGE` | Outline | en_US | Default application interface language |
| `RATE_LIMITER_ENABLED` | Outline | true | Enable request rate limiting |
| `RATE_LIMITER_REQUESTS` | Outline | 1000 | Maximum requests per window |
| `FILE_STORAGE_LOCAL_ROOT_DIR` | Outline | C:/Program Files/Git/var/lib/outline/data | Local storage root directory |
| `FILE_STORAGE_IMPORT_MAX_SIZE` | Outline | 5120000 | Maximum import file size bytes |
| `FILE_STORAGE_UPLOAD_MAX_SIZE` | Outline | 26214400 | Maximum upload file size bytes |
| `RATE_LIMITER_DURATION_WINDOW` | Outline | 60 | Rate limit window duration seconds |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Outline | true | Enable Alpine internal networking support |
| `AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE` | Outline | 1 | Suppress AWS SDK maintenance warning |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/outline/data`

**Category:** CMS

[View on Railway →](https://railway.com/template/outline-notion-alternative)
