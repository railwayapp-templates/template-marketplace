# Deploy Postiz | Open-Source Social Media Scheduler for 30+ Platforms on Railway

1 click Self-host Postiz v2.11.3. Schedule, publish & automate social posts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-postiz)

## About

This Railway template deploys **Postiz v2.11.3** — the last version before Temporal became a required dependency — giving you a fully functional social media scheduling platform without the operational overhead of running a Temporal workflow engine. The template provisions three services: the Postiz app (`ghcr.io/gitroomhq/postiz-app:v2.11.3`), PostgreSQL, and Redis, all connected over Railway's private network with persistent volumes for uploads, database data, and Redis data.
![postiz railway deployment](https://res.cloudinary.com/asset-cloudinary/image/upload/v1772994349/postiz_wo_temporal_xxqqe3.png)

Postiz (GitHub: [gitroomhq/postiz-app](https://github.com/gitroomhq/postiz-app)) is an open-source social media scheduling and automation platform — a self-hosted alternative to Buffer, Hypefury, and Later. It centralises scheduling, AI-assisted content creation, and analytics across 30+ platforms including X (Twitter), Instagram, LinkedIn, Facebook, Reddit, Threads, and Mastodon.

**Key features:**
- Schedule posts across 30+ social platforms from one dashboard
- AI-powered content generation and auto-complete
- Team collaboration with comments and role management
- REST API + N8N/Make.com/Zapier-compatible automation
- MCP endpoint (`/api/mcp/{API_KEY}`) for agent-based workflows
- Analytics and engagement tracking
- Full data ownership — no vendor lock-in

![postiz-with-temporal dashboard screenshot](https://github.com/user-attachments/assets/a27ee220-beb7-4c7e-8c1b-2c44301f82ef)

**Architecture:** Postiz runs as a unified Next.js + Node.js app, backed by PostgreSQL (persistent storage) and Redis (job queues and caching). All three services communicate over Railway's private network — no public exposure of database ports.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postiz v2.11.3 | `ghcr.io/gitroomhq/postiz-app:v2.11.3` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Default Redis server port |
| `REDISUSER` | Redis | default | Redis authentication username |
| `REDIS_URL` | Redis | - | Internal Redis connection URI |
| `REDISPASSWORD` | Redis | (secret) | Redis password alias variable |
| `REDIS_PASSWORD` | Redis | (secret) | Redis authentication password |
| `REDIS_PUBLIC_URL` | Redis | - | External Redis connection URI |
| `PORT` | Postiz v2.11.3 | 3000 | HTTP server listening port |
| `MAIN_URL` | Postiz v2.11.3 | - | Primary public application URL |
| `RUN_CRON` | Postiz v2.11.3 | true | Enable background scheduled jobs |
| `REDIS_URL` | Postiz v2.11.3 | - | Redis connection string |
| `IS_GENERAL` | Postiz v2.11.3 | true | Enable general multi-user mode |
| `JWT_SECRET` | Postiz v2.11.3 | (secret) | Secret for signing JWT tokens |
| `NOT_SECURED` | Postiz v2.11.3 | true | Disable strict security checks |
| `DATABASE_URL` | Postiz v2.11.3 | - | Postgres database connection string |
| `FRONTEND_URL` | Postiz v2.11.3 | - | Public frontend application URL |
| `STORAGE_PROVIDER` | Postiz v2.11.3 | local | Use local filesystem for storage |
| `UPLOAD_DIRECTORY` | Postiz v2.11.3 | /uploads | Local directory for file uploads |
| `BACKEND_INTERNAL_URL` | Postiz v2.11.3 | http://localhost:3000 | Internal backend service base URL |
| `DISABLE_REGISTRATION` | Postiz v2.11.3 | false | Allow new user registrations. Can make true after registration. |
| `NEXT_PUBLIC_BACKEND_URL` | Postiz v2.11.3 | - | Public API endpoint URL |
| `NEXT_PUBLIC_UPLOAD_DIRECTORY` | Postiz v2.11.3 | /uploads | Public upload directory path |
| `POSTGRES_DB` | Postgres | railway | Database created during initialization |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default Postgres admin username |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password for Postgres user |
| `DATABASE_PUBLIC_URL` | Postgres | - | External Postgres connection string |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/uploads`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/deploy-postiz)
