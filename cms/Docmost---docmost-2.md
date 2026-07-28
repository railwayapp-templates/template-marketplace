# Deploy Docmost on Railway

Collaborative wiki with PostgreSQL, Redis, and persistent file storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docmost-2)

## About

Docmost is an open-source collaborative wiki and documentation platform for teams. It combines real-time editing, spaces, granular permissions, comments, page history, search, diagrams, and file attachments in a self-hosted alternative to Confluence and Notion.

This Railway template runs Docmost 0.95.0 with PostgreSQL 18 and Redis 8. Docmost is the only public service; database and cache traffic stays on Railway's private network. Persistent volumes retain uploaded files, database records, and Redis AOF state. Startup migrations run inside Docmost, and `/api/health` checks both PostgreSQL and Redis before Railway marks the application healthy. All required secrets and connection strings are generated or referenced automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:18@sha256:3a82e1f56c8f0f5616a11103ac3d47e632c3938698946a7ad26da0df1334744a` | Database |
| Docmost | `docmost/docmost:0.95.0@sha256:3f05c20808ebd680f74bae4686bb123e4a21c166d4fb1b5a653b02ffa9ba2cff` | Web service |
| Redis | `redis:8@sha256:c88d347edef6249a6d2293f926f1eeb48bd40c57cbcd02c07f52e7f1fd2cb46b` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | docmost | Database created for Docmost. |
| `DATABASE_URL` | Postgres | - | Private connection string referenced by Docmost. |
| `POSTGRES_USER` | Postgres | (secret) | Database role used by Docmost. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Authoritative generated PostgreSQL password. |
| `PORT` | Docmost | 3000 | HTTP port exposed by the image. |
| `APP_URL` | Docmost | - | Canonical public origin for links, cookies, and callbacks. |
| `REDIS_URL` | Docmost | - | Private Redis connection for queues and collaboration. |
| `APP_SECRET` | Docmost | (secret) | Application signing secret; minimum 32 characters. |
| `DATABASE_URL` | Docmost | - | Private PostgreSQL connection from Postgres. |
| `STORAGE_DRIVER` | Docmost | local | Store files on the mounted application volume. |
| `DISABLE_TELEMETRY` | Docmost | true | Disable optional upstream telemetry by default. |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data/storage`
- **Start command:** `redis-server --appendonly yes --maxmemory-policy noeviction`
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/docmost-2)
