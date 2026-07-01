# Deploy memos on Railway

Open-source note-taking for quick capture. Markdown-native, lightweigh

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/memos-3)

## About

Deploy this template on Railway with one click. Railway provides compute, TLS at the edge, and a public URL. The service restarts automatically on failures.

This template runs as a single container with no external database dependencies. All data is stored using built-in storage — no PostgreSQL, Redis, or additional services required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Postgres-c8ht | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| memos | [INAPP-Mobile/railway-memos](https://github.com/INAPP-Mobile/railway-memos) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `POSTGRES_USER` | Postgres-c8ht | (secret) |
| `POSTGRES_PASSWORD` | Postgres-c8ht | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/memos`

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/memos-3)
