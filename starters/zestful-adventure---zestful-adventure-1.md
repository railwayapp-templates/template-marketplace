# Deploy zestful-adventure on Railway

Wiki.js wiki & knowledge base

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zestful-adventure-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/template/zestful-adventure)

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
| postgres | `postgres:16-alpine` | Database |
| wikijs-app | `requarks/wiki:2.5.314` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `DB_USER` | wikijs-app | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters

[View on Railway →](https://railway.com/deploy/zestful-adventure-1)
