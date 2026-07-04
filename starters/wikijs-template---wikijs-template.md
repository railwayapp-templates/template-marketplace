# Deploy wikijs-template on Railway

Deploy Wiki.js knowledge base on Railway with PostgreSQL support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wikijs-template)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/wikijs-template)

Wiki.js is a modern, lightweight, and highly powerful wiki and knowledge base platform with robust markdown support. One-click deploy on Railway with optional PostgreSQL companion database.

Wiki.js (requarks/wiki) provides a full-featured wiki experience with:

- Beautiful, responsive UI with real-time editing
- Markdown, WYSIWYG, and drag-and-drop editors
- Role-based access control
- Multi-language support
- REST API for integrations
- Support for PostgreSQL, MySQL, MariaDB, SQL Server, and SQLite
- Docker-based deployment on any platform

Deploying on Railway means you get automatic HTTPS, zero-config storage, and continuous updates.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres-kRjT | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| wikijs-app | [INAPP-Mobile/wikijs-template](https://github.com/INAPP-Mobile/wikijs-template) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres-kRjT | (secret) |
| `POSTGRES_PASSWORD` | Postgres-kRjT | (secret) |
| `DB_USER` | wikijs-app | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/wikijs-template)
