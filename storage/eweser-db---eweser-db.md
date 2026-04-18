# Deploy eweser-db on Railway

Self-host your personal database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/eweser-db)

## About

eweser-db is a local-first, user-owned database stack built on Yjs CRDTs. It lets developers build real-time, offline-capable apps where users own their data instead of being locked into a single platform. This Railway template deploys the full stack: auth API, auth pages, sync server, aggregator, note app, and PostgreSQL.

Hosting eweser-db means deploying the core services that make local-first sync and self-hosted user data possible. On Railway, that includes the auth API, auth pages, Hocuspocus-based sync server, aggregator, note app, and PostgreSQL. The frontend apps connect to the auth and sync services, while the aggregator indexes server-side data for search and discovery. Because this is a monorepo, each Railway service points at the same repository but uses its own Dockerfile and environment variables. Railway handles deployment, networking, restarts, and scaling, while you keep control over the infrastructure and user data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ewe-note | [eweser/eweser-db](https://github.com/eweser/eweser-db) (root: /) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| auth-pages | [eweser/eweser-db](https://github.com/eweser/eweser-db) (root: /) | Web service |
| sync-server | [eweser/eweser-db](https://github.com/eweser/eweser-db) (root: /) | Web service |
| aggregator | [eweser/eweser-db](https://github.com/eweser/eweser-db) (root: /) | Web service |
| auth-api | [eweser/eweser-db](https://github.com/eweser/eweser-db) (root: /) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | ewe-note | 80 |
| `NODE_ENV` | ewe-note | production |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | auth-pages | 80 |
| `NODE_ENV` | auth-pages | production |
| `PORT` | sync-server | 8080 |
| `WEBHOOK_SECRET` | sync-server | (secret) |
| `SYNC_AUTH_SECRET` | sync-server | (secret) |
| `PORT` | aggregator | 3001 |
| `WEBHOOK_SECRET` | aggregator | (secret) |
| `SYNC_AUTH_SECRET` | aggregator | (secret) |
| `PORT` | auth-api | 3000 |
| `SERVER_SECRET` | auth-api | (secret) |
| `SYNC_AUTH_SECRET` | auth-api | (secret) |
| `BETTER_AUTH_SECRET` | auth-api | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** TypeScript, JavaScript, Astro, CSS, Dockerfile, Shell, HTML

[View on Railway →](https://railway.com/deploy/eweser-db)
