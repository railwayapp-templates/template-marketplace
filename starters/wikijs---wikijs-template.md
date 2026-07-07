# Deploy wikijs on Railway

Wiki.js — modern, lightweight wiki and knowledge base with markdown.

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
| wikijs-app | [INAPP-Mobile/wikijs-template](https://github.com/INAPP-Mobile/wikijs-template) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port Wiki.js listens on (default: 3000). |
| `DB_HOST` | - | PostgreSQL database host. Auto-injected from Railway Postgres companion. |
| `DB_NAME` | - | Database name for Wiki.js data. Auto-injected from Railway Postgres companion. |
| `DB_PASS` | - | Database password. Auto-injected from Railway Postgres companion. |
| `DB_PORT` | - | PostgreSQL database port. Auto-injected from Railway Postgres companion. |
| `DB_TYPE` | postgres | Database engine: postgres, mysql, mssql, or sqlite (default: postgres). |
| `DB_USER` | (secret) | Database user for Wiki.js. Auto-injected from Railway Postgres companion. |
| `APP_NAME` | Wiki.js | Display name for your wiki. |
| `TIMEZONE` | UTC | Server timezone (e.g., America/New_York, Europe/London). |
| `URL_BASE` | - | Public URL of your wiki. Required for proper asset serving. |
| `DB_FILEPATH` | /wiki/data/wikijs.db | Path for SQLite database file when using DB_TYPE=sqlite. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/wikijs-template)
