# Deploy Memos | Open-Source Alternative to Notion on Railway on Railway

Self-host Memos. Open-source lightweight note-taking app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/memos-open-source-notes)

## About

Self-host Memos on Railway and get a privacy-first, Markdown-native note-taking app running in under a minute. Deploy Memos — a lightweight Go binary distributed as a single ~20 MB Docker image (`neosmemo/memos:stable`) — alongside a Railway-managed PostgreSQL database and persistent volume, with a public HTTPS URL generated automatically.

This Railway template provisions the Memos web app, a PostgreSQL 18 database for multi-user storage, and a persistent volume at `/var/opt/memos` for uploaded media. The database connection is wired automatically via a cross-service reference — no manual configuration required.

Memos is an open-source, self-hosted note-taking tool built for quick capture. Created by the usememos team and MIT-licensed with over 58,000 GitHub stars, it solves the problem of needing a fast, private place to capture thoughts without the complexity of Notion or the local-only limitation of Obsidian.

**Key features:**
- Full Markdown support with syntax highlighting, tables, and LaTeX math
- Timeline-first UI — open, write, done. No folder hierarchy to manage
- Drag-and-drop attachments: images, videos, audio, documents
- Full-text search and flexible `#tag` system
- Complete REST and gRPC APIs for custom integrations
- Built-in RSS feeds for public memos and webhook support
- Multi-user support with PostgreSQL or MySQL backends
- ~20 MB Docker image — runs on a Raspberry Pi

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Memos | `neosmemo/memos:stable` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Memos | 5230 | HTTP server listening port |
| `MEMOS_DSN` | Memos | - | Postgres connection string |
| `MEMOS_DRIVER` | Memos | postgres | Database driver type selection |
| `MEMOS_INSTANCE_URL` | Memos | - | Public instance base URL |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/memos`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/memos-open-source-notes)
