# Deploy Kanboard on Railway

Deploy and Host Kanboard: Open-source Kanban with SQLite persistence

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kanboard-qa-test)

## About

Deploy Kanboard, an open-source Kanban project management tool, on Railway in minutes.

Kanboard runs on Railway with zero external dependencies. It uses SQLite for storage, with automatic data persistence through Railway volumes. The Dockerfile includes an nginx reverse proxy with PORT substitution for Railway's routing layer. No external database is required — deploy and start managing your projects immediately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kanboard-qa-test | [INAPP-Mobile/railway-kanboard](https://github.com/INAPP-Mobile/railway-kanboard) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/app/data`

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/kanboard-qa-test)
