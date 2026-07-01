# Deploy kanboard on Railway

Deploy and Host kanboard with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kanboard-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/nNza4s)

![OG Image](https://raw.githubusercontent.com/INAPP-Mobile/railway-kanboard/main/og-image.svg)

Kanboard is a free and open-source Kanban project management software. It focuses on simplicity, speed, and a minimalistic approach — no complexity, no external dependencies. Manage your projects, tasks, and team workflow visually with an intuitive Kanban board deployed on Railway in minutes.

Kanboard runs as a single container with SQLite for persistence. Railway provides the compute, TLS at the edge, and a public URL. The service includes an Nginx reverse proxy with automatic PORT substitution, a persistent volume for the SQLite database and file uploads, and a built-in health check that Railway monitors for automatic restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kanboard | [INAPP-Mobile/railway-kanboard](https://github.com/INAPP-Mobile/railway-kanboard) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DB_NAME` | kanboard | Database name (required for MySQL/Postgres) |
| `DB_HOSTNAME` | - | Database name (required for MySQL/Postgres) |
| `DB_PASSWORD` | (secret) | Database password (required for MySQL/Postgres) |
| `DB_USERNAME` | (secret) | Database username (required for MySQL/Postgres) |

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/kanboard-1)
