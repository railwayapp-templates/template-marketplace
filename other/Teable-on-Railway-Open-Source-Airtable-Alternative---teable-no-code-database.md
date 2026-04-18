# Deploy Teable on Railway | Open-Source Airtable Alternative on Railway

Self-Host Teable. No-Code Data Management. AI-Powered Spreadsheet

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/teable-no-code-database)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/teable-no-code-database?referralCode=QXdhdr&utm_medium=integration&utm_source=template&utm_campaign=generic)

Deploy Teable on Railway to get a production-ready, no-code database platform built natively on PostgreSQL. Self-host Teable as a powerful open-source Airtable alternative with real-time collaboration, AI-powered fields, and unlimited rows — all without vendor lock-in.

This Railway template pre-configures Teable (`ghcr.io/teableio/teable:latest`) with a managed PostgreSQL database for persistent storage, Redis for caching and real-time performance, and a volume for file attachments. One click gets you a fully functional spreadsheet-database hybrid with API access.

![Teable Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776445886/teable_railway_arch_xj0jdi.png)

Teable is a next-generation no-code database that gives teams a spreadsheet-like interface backed by a full PostgreSQL database. Unlike Airtable, every workspace runs on real Postgres — so there are no row limits, no query slowdowns at scale, and full SQL compatibility when you need it.

Key features of self-hosted Teable:

- **AI database agent** — describe what you need in plain English and Teable auto-creates tables, relationships, and workflows
- **Multiple views** — Grid, Kanban, Calendar, Gallery, and Form views included on every plan
- **Real-time collaboration** — multiple users editing simultaneously with live cursor tracking
- **Built-in automation** — trigger-based workflows for reminders, data validation, and record updates
- **REST API** — full CRUD API for every table, compatible with any integration tool
- **Plugin system** — extend functionality with custom React plugins connected directly to your data
- **Self-hosted privacy** — AGPL-licensed, your data stays on your infrastructure

The architecture runs as a monolithic Node.js service (NestJS backend + Next.js frontend) connected to PostgreSQL for data and Redis for caching.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Teable | `ghcr.io/teableio/teable:latest` | Web service |

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
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Teable | 3000 | Application listening port |
| `SECRET_KEY` | Teable | (secret) | JWT and session signing key |
| `PUBLIC_ORIGIN` | Teable | - | Public-facing app URL |
| `PRISMA_DATABASE_URL` | Teable | - | PostgreSQL connection string |
| `BACKEND_CACHE_PROVIDER` | Teable | redis | Cache backend selection |
| `BACKEND_CACHE_REDIS_URI` | Teable | - | Redis connection string |
| `BACKEND_STORAGE_PROVIDER` | Teable | local | File storage backend |
| `NEXT_ENV_IMAGES_ALL_REMOTE` | Teable | true | Allow third-party image loading |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.assets`

**Category:** Other

[View on Railway →](https://railway.com/deploy/teable-no-code-database)
