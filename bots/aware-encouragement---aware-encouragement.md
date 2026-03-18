# Deploy aware-encouragement on Railway

elegram Bot Builder - визуальный конструктор ботов

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aware-encouragement)

## About

Deploy a full-featured Telegram Bot Builder with visual drag-and-drop interface. Create bots without coding!

This template runs entirely on Railway's infrastructure. The application is containerized using Docker and automatically scales with your usage.

**Hosting includes:**
- PostgreSQL database with automatic backups
- Web application with auto-scaling
- SSL certificate included
- Automatic deployments from GitHub

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| telegram-bot-builder | [fedorabakumets/telegram-bot-builder](https://github.com/fedorabakumets/telegram-bot-builder) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | telegram-bot-builder | 5000 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots · **Languages:** TypeScript, CSS, JavaScript, Python, Batchfile, Shell, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/aware-encouragement)
