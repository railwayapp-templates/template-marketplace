# Deploy Focalboard | Open Source Trello, Notion, and Asana Alternative on Railway

Self Host Focalboard. Kanban boards, table views, calendar, gallery & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/focalboard)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/focalboard?referralCode=QXdhdr)

Deploy Focalboard on Railway to get a self-hosted, open-source project management tool with Kanban boards, table views, gallery layouts, and calendar views. Self-host Focalboard as an alternative to Trello, Notion, and Asana — with full control over your data and zero subscription fees.

This Railway template deploys Focalboard with a PostgreSQL database for production-grade persistence. The template pre-configures the database connection, persistent storage for file uploads, and a public domain with HTTPS — ready to use in under two minutes.

Focalboard is an open-source, multilingual project management tool built by Mattermost. It provides a clean, focused interface for organizing work across individuals and teams — without the feature bloat of enterprise platforms.

Key features of self-hosted Focalboard:

- **Multiple views** — Kanban boards, tables, galleries, and calendars from the same data
- **Custom properties** — add dates, dropdowns, checkboxes, URLs, and more to any card
- **Filters and sorting** — slice boards by any property combination
- **Board templates** — built-in templates for common workflows (project tasks, roadmaps, sprint planning)
- **Multi-user collaboration** — share boards with team members, set permissions per board
- **File attachments** — attach files directly to cards, stored on your own infrastructure
- **Multilingual** — supports 20+ languages out of the box

Focalboard uses a Go backend with a React/TypeScript frontend. This template connects it to PostgreSQL for reliable, production-grade data storage instead of the default SQLite.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Focalboard | `mattermost/focalboard` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Focalboard | 8000 | HTTP server listening port |
| `DB_CONNECTION_STRING` | Focalboard | - | Postgres connection string |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Start command:** `/bin/sh -c 'printf "{\"serverRoot\":\"https://%s\",\"port\":8000,\"dbtype\":\"postgres\",\"dbconfig\":\"%s?sslmode=disable&connect_timeout=10\",\"useSSL\":false,\"webpath\":\"./pack\",\"filespath\":\"./data/files\",\"telemetry\":false,\"session_expire_time\":2592000,\"session_refresh_time\":18000,\"localOnly\":false,\"enableLocalMode\":false,\"enablePublicSharedBoards\":false}" "$RAILWAY_PUBLIC_DOMAIN" "$DB_CONNECTION_STRING" > /opt/focalboard/config.json && cat /opt/focalboard/config.json && /opt/focalboard/bin/focalboard-server'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/focalboard/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/focalboard)
