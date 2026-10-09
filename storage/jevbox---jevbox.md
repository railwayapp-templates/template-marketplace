# Deploy jevbox on Railway

Permission-aware document library with search, chat, and a browser UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jevbox)

## About

Jevbox is a full-stack, permission-aware document library for browsing, organizing, previewing, and searching files through a polished browser UI. It stores document metadata and content in PostgreSQL, evaluates permissions with SpiceDB, and runs durable background jobs for parsing, indexing, thumbnails, email, and source-grounded AI chat.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jevbox)

Railway runs the Jevbox web UI, background worker, SpiceDB authorization service, and two private PostgreSQL databases as Docker-image services. Railway provides HTTPS networking, private service discovery, persistent database volumes, generated secrets, and one-click environment provisioning.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `xiaosong233/jevbox-railway:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Postgres-Hl7_ | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| worker | `xiaosong233/jevbox-railway:latest` | Worker |
| spicedb | `xiaosong233/jevbox-spicedb-railway:latest` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `BOOTSTRAP_TOKEN` | app | (secret) |
| `BETTER_AUTH_SECRET` | app | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `POSTGRES_USER` | Postgres-Hl7_ | (secret) |
| `POSTGRES_PASSWORD` | Postgres-Hl7_ | (secret) |
| `BETTER_AUTH_SECRET` | worker | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node --import tsx server/worker.ts`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/jevbox)
