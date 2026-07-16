# Deploy wikijs on Railway

Wiki.js wiki & knowledge base

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wikijs-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/wikijs-1)

Wiki.js is a modern, lightweight, and highly powerful wiki and knowledge base platform with robust markdown support. One-click deploy on Railway with a PostgreSQL companion database.

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
| wikijs-app | `requarks/wiki:2.5.314` | Web service |
| postgres | `postgres:16-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | wikijs-app | 3000 | Port Wiki.js listens on (default: 3000). |
| `DB_HOST` | wikijs-app | postgres.railway.internal | PostgreSQL host. Points at the sibling 'postgres' Railway service in this template. |
| `DB_NAME` | wikijs-app | wikijs | Database name for Wiki.js data. Must match the postgres service's POSTGRES_DB (/wikijs). |
| `DB_PASS` | wikijs-app | postgres | Database password. Must match the postgres service's POSTGRES_PASSWORD. Rotate both before production. |
| `DB_PORT` | wikijs-app | 5432 | PostgreSQL port (default: 5432). |
| `DB_TYPE` | wikijs-app | postgres | Database engine: postgres, mysql, mssql, or sqlite (default: postgres). |
| `DB_USER` | wikijs-app | (secret) | Database user. Must match the postgres service's POSTGRES_USER. |
| `APP_NAME` | wikijs-app | Wiki.js | Display name for your wiki. |
| `TIMEZONE` | wikijs-app | UTC | Server timezone (e.g., America/New_York, Europe/London). |
| `URL_BASE` | wikijs-app | - | Public URL of your wiki. Auto-populated from Railway's public domain. |
| `DB_FILEPATH` | wikijs-app | /wiki/data/wikijs.db | Path for SQLite database file when using DB_TYPE=sqlite. |
| `POSTGRES_DB` | postgres | wikijs | Initial database created on first boot. Must match the DB_NAME Wiki.js uses (/wikijs path component). |
| `POSTGRES_USER` | postgres | (secret) | Postgres superuser name. Wiki.js connects with these credentials. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Postgres password. Default literal 'postgres' so a fresh marketplace deploy authenticates out of the box. Rotate this in the dashboard AND update the wiki's DB_PASS to match before production. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/wikijs-1)
