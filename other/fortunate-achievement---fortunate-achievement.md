# Deploy fortunate-achievement on Railway

Deploy and Host fortunate-achievement with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fortunate-achievement)

## About

Telegram Bot Builder is a comprehensive platform for creating, configuring, and deploying Telegram bots without extensive coding. It provides an intuitive interface for building bot workflows, managing commands, and handling user interactions with PostgreSQL persistence.

Hosting Telegram Bot Builder on Railway streamlines the deployment of your bot creation platform. Railway manages the entire infrastructure stack—from the Node.js application server to PostgreSQL database provisioning and SSL-secured connections. The platform handles automatic scaling, persistent storage for bot configurations and user data, and monitoring out of the box. You can focus on building bot features while Railway handles server management, database backups, and infrastructure scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres-QrUo | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| telegram-bot-builder-_E3U | [fedorabakumets/telegram-bot-builder](https://github.com/fedorabakumets/telegram-bot-builder) (root: /main) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres-QrUo | railway |
| `POSTGRES_USER` | Postgres-QrUo | (secret) |
| `POSTGRES_PASSWORD` | Postgres-QrUo | (secret) |
| `PORT` | telegram-bot-builder-_E3U | 5000 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`

**Category:** Other · **Languages:** TypeScript, Jinja, CSS, Python, JavaScript, Batchfile, Shell, Dockerfile, HTML, PowerShell

[View on Railway →](https://railway.com/deploy/fortunate-achievement)
