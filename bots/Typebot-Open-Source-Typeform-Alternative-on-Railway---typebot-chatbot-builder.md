# Deploy Typebot | Open-Source Typeform Alternative on Railway on Railway

Self-host Typebot. Open-source advanced chatbot builder on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typebot-chatbot-builder)

## About

Deploy Typebot on Railway to get a self-hosted, open-source chatbot builder with a visual drag-and-drop editor. Self-host Typebot to own your data, avoid per-chat pricing, and integrate AI-powered conversational flows into any website or WhatsApp channel.

This Railway template pre-configures **Typebot Builder** (the editor UI), **Typebot Viewer** (the bot runtime), **PostgreSQL 16** for persistent storage, and **Redis** for caching — all wired together and ready to use.

Typebot is an open-source conversational form and chatbot builder with 9,500+ GitHub stars. It replaces static forms with engaging chat interfaces that achieve higher completion rates.

- Visual drag-and-drop flow editor with 30+ block types
- AI-ready: native OpenAI/LLM integration for intelligent responses
- Embed anywhere: websites, WhatsApp, standalone pages
- Conditional logic, variables, and branching for complex flows
- Google Sheets, webhooks, Zapier, and Make integrations
- Fair Source License (FSL) — free to self-host

The architecture is multi-service: the Builder (Next.js) handles bot creation and management, while the Viewer (Next.js) executes published bots for end users. Both share a PostgreSQL database and Redis cache layer.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| Typebot Viewer | `baptistearno/typebot-viewer:3` | Web service |
| Typebot Builder | `baptistearno/typebot-builder:3` | Web service |

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
| `PORT` | Typebot Viewer | 3000 | HTTP server listening port |
| `HOSTNAME` | Typebot Viewer | 0.0.0.0 | Bind address for service |
| `REDIS_URL` | Typebot Viewer | - | Redis connection string |
| `DATABASE_URL` | Typebot Viewer | - | Postgres connection string |
| `NEXTAUTH_URL` | Typebot Viewer | - | NextAuth base URL reference |
| `NEXTAUTH_SECRET` | Typebot Viewer | (secret) | Shared NextAuth secret key |
| `ENCRYPTION_SECRET` | Typebot Viewer | (secret) | Shared encryption secret key |
| `NEXT_PUBLIC_VIEWER_URL` | Typebot Viewer | - | Public viewer application URL |
| `PORT` | Typebot Builder | 3000 | HTTP server listening port |
| `HOSTNAME` | Typebot Builder | 0.0.0.0 | Bind address for service |
| `REDIS_URL` | Typebot Builder | - | Redis connection string |
| `DATABASE_URL` | Typebot Builder | - | Postgres connection string |
| `NEXTAUTH_URL` | Typebot Builder | - | NextAuth base URL |
| `NEXTAUTH_SECRET` | Typebot Builder | (secret) | NextAuth authentication secret key |
| `ENCRYPTION_SECRET` | Typebot Builder | (secret) | Encryption key for sensitive data |
| `NEXT_PUBLIC_VIEWER_URL` | Typebot Builder | - | Viewer service public URL reference |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/deploy/typebot-chatbot-builder)
