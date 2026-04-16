# Deploy Docmost | Open Source Confluence, Notion, Obsidian Alternative on Railway

Self Host Docmost on Railway. Open-source wiki with real-time collaboration

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docmost-open-source-wiki)

## About

Deploy Docmost on Railway to get an open-source collaborative wiki and documentation platform running in minutes. Self-host Docmost as a powerful alternative to Confluence, Obsidian and Notion with full control over your data.

This Railway template pre-configures Docmost with PostgreSQL 16 for data storage and Redis 7 for caching, giving you a production-ready documentation platform with zero manual setup.

Docmost is an open-source, enterprise-ready wiki and documentation platform built with Node.js (NestJS) and React. It solves the problem of team knowledge management without vendor lock-in or per-seat pricing.

Key features include:
- **Real-time collaboration** — CRDT-based concurrent editing with no conflicts
- **Rich content editor** — tables, code blocks, callouts, diagrams, math (KaTeX), file attachments
- **Spaces & permissions** — organize by team, project, or department with role-based access
- **Full-text search** — find content across all pages and spaces instantly
- **Page history & versioning** — track changes and restore previous versions
- **Import support** — migrate from Confluence, Notion, Markdown, and HTML
- **SSO & LDAP** — SAML 2.0, OpenID Connect, LDAP, and MFA (Enterprise)
- **API access** — JSON-RPC API for custom integrations (Enterprise)
- **Nested pages** — unlimited hierarchical page structure

The architecture consists of three services: the Docmost application server (`docmost/docmost`), PostgreSQL for persistent data storage, and Redis for session management and caching.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Docmost | `docmost/docmost:latest` | Web service |

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
| `PORT` | Docmost | 3000 | HTTP server listening port |
| `APP_URL` | Docmost | - | Public base URL for instance |
| `REDIS_URL` | Docmost | - | Redis connection string |
| `APP_SECRET` | Docmost | (secret) | Application secret key for security |
| `DATABASE_URL` | Docmost | - | Postgres connection string |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data/storage`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/docmost-open-source-wiki)
