# Deploy AFFiNE | Open Source Notion, Miro Alternative on Railway on Railway

Self Host AFFiNE. Docs, whiteboards, databases, auto migrations &  more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/affine-notion-alternative)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/affine-notion-alternative?referralCode=QXdhdr)

AFFiNE is an open-source, privacy-first all-in-one workspace that combines docs, whiteboards, and databases into a single canvas — a self-hostable alternative to Notion + Miro. Self-host AFFiNE on Railway and keep every page, edge, and knowledge base on infrastructure you control, with pgvector-backed Postgres, Redis caching, and an HTTPS-terminated public domain configured out of the box.

This Railway template pre-configures three services for a production-ready AFFiNE deployment: the AFFiNE server (`ghcr.io/toeverything/affine:stable`), a Postgres 16 instance with pgvector for AI and embeddings (`pgvector/pgvector:pg16`), and Railway's managed Redis cache with AUTH enabled. Database migrations run automatically via Railway's pre-deploy command, and the public URL is wired through `AFFINE_SERVER_EXTERNAL_URL` so internal links resolve to your Railway domain.

![AFFiNE Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776782257/affine-railway-architecture_jtkyzk.png)

AFFiNE ships a single real-time collaborative canvas where Markdown docs, Kanban boards, data tables, and infinite whiteboards live side-by-side. Every block is bi-directional, so a database row can also be a page, and a whiteboard element can also be a document.

Key features:
- Block-based editor with Markdown, slash commands, and rich embeds
- Infinite whiteboards with shapes, connectors, handwriting, and mind maps
- Databases with Kanban, grid, list, and calendar views
- Real-time multi-player collaboration with CRDT-backed sync
- Local-first architecture — data syncs to your own server, not a SaaS
- AI copilot hooks (optional, requires pgvector and external LLM keys)

Architecture is a NestJS backend (`affine`) fronted by HTTP, a Postgres database with the pgvector extension for embeddings, and a Redis cache for sessions and job coordination.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| pgvector | `pgvector/pgvector:pg18` | Web service |
| Affine | `ghcr.io/toeverything/affine:stable` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `POSTGRES_DB` | pgvector | railway | Name of the database created on startup. |
| `DATABASE_URL` | pgvector | - | Full public connection string for Postgres. |
| `POSTGRES_USER` | pgvector | (secret) | Postgres superuser name. |
| `PGHOST_PRIVATE` | pgvector | - | Private internal domain for Postgres in Railway. |
| `PGPORT_PRIVATE` | pgvector | 5432 | Private internal port for Postgres. |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Password for the Postgres superuser. |
| `DATABASE_URL_PRIVATE` | pgvector | - | Full private connection string for internal services. |
| `PORT` | Affine | 3010 | HTTP port Railway routes traffic to |
| `NODE_ENV` | Affine | production | Node.js runtime mode |
| `DATABASE_URL` | Affine | - | Postgres connection string |
| `REDIS_SERVER_HOST` | Affine | - | Redis private hostname |
| `REDIS_SERVER_PORT` | Affine | 6379 | Redis port |
| `REDIS_SERVER_USER` | Affine | (secret) | Redis AUTH username |
| `AFFINE_ADMIN_EMAIL` | Affine | - | Create Bootstrap admin email |
| `AFFINE_CONFIG_PATH` | Affine | /root/.affine/config | Config directory inside volume |
| `AFFINE_SERVER_HOST` | Affine | 0.0.0.0 | Bind to all interfaces inside container |
| `AFFINE_SERVER_PORT` | Affine | 3010 | Internal listener port |
| `AFFINE_SERVER_HTTPS` | Affine | false | Railway edge terminates TLS |
| `AFFINE_ADMIN_PASSWORD` | Affine | (secret) | Create Admin password (alteast 1 uppercase + 2 digits + 2 specials) |
| `REDIS_SERVER_PASSWORD` | Affine | (secret) | Redis AUTH password |
| `AFFINE_INDEXER_ENABLED` | Affine | false | Disable search indexer (needs Manticore/ES) |
| `AFFINE_SERVER_EXTERNAL_URL` | Affine | - | Public-facing app URL |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`
- **Volume:** `/root/.affine`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/affine-notion-alternative)
