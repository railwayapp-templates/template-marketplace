# Deploy memos on Railway

Self-hosted note-taking. Markdown-native, lightweight (20MB), 61k+ stars.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/memos-3)

## About

Deploy [Memos](https://usememos.com), the open-source, Markdown-native note-taking app, on Railway with one click. Single container, PostgreSQL-ready, persistent storage, and zero configuration.

Memos is an open-source, self-hosted note-taking tool inspired by Obsidian and Flomo. It features:
- Timeline-first UI for quick capture
- Markdown-native editing with live preview
- Tag-based organization with full-text search
- Mobile-responsive web UI (works as PWA)
- REST and gRPC APIs for integration
- MIT licensed — completely free

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
