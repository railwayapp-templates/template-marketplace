# Deploy fortunate-achievement on Railway

Deploy and Host fortunate-achievement with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fortunate-achievement)

## About

Понял, тебе нужен текст для шаблона Railway для деплоя твоего проекта (telegram-bot-builder). Давай сначала посмотрю, что представляет собой проект, чтобы написать релевантный текст.

Вот готовый текст для шаблона Railway:

---

## Deploy and Host Telegram Bot Builder on Railway

### What is Telegram Bot Builder?

Visual no-code platform for creating Telegram bots using a drag-and-drop interface. Users design bot logic as node graphs, configure messages, keyboards, user input handlers, media, broadcasts, and database operations — all without writing code. The platform generates and runs Python bots automatically.

### About Hosting Telegram Bot Builder

Telegram Bot Builder is a full-stack SaaS application built with Node.js (Express + React) that generates and manages Python-based Telegram bots. Hosting involves running the web server, PostgreSQL database for user data and bot configurations, Redis for caching and FSM state, and a Python runtime for executing generated bots. The platform uses a worker pool architecture where multiple bots share a single Python process per project, significantly reducing memory usage at scale.

### Common Use Cases

- Self-hosting a private bot-building platform for your team or community
- Running a SaaS service where users visually create and deploy Telegram bots without coding
- Hosting an internal tool for managing multiple Telegram bots with shared infrastructure

### Dependencies for Telegram Bot Builder Hosting

- **Node.js 20** — application server and build toolchain
- **Python 3** — runtime for generated Telegram bots
- **PostgreSQL** — primary database for users, projects, bot configurations, and migrations
- **Redis** — caching layer for bot variables and FSM state storage

#### Deployment Dependencies

- [Railway PostgreSQL Plugin](https://docs.railway.com/databases/postgresql)
- [Railway Redis Plugin](https://docs.railway.com/databases/redis)
- [Telegram BotFather](https://core.telegram.org/bots#botfather) — for obtaining bot tokens and configuring Telegram Login

#### Implementation Details

Environment variables are auto-configured by Railway for database services:

```
DATABASE_URL=${{Postgres.DATABASE_URL}}
REDIS_URL=${{Redis.REDIS_URL}}
```

Key application variables to set manually:

```
NODE_ENV=production
SESSION_SECRET=
PORT=5000
```

Telegram Login credentials (Client ID, Client Secret, Bot Username) are configured through the built-in Setup Wizard on first launch and stored in the database.

The app includes automatic database migrations on startup (`npm run start` runs migrations before the server starts).

### Why Deploy Telegram Bot Builder on Railway?

Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying Telegram Bot Builder on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

---

Текст готов. Если нужно что-то подправить — формулировки, длину, добавить/убрать секции — скажи.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| telegram-bot-builder-_E3U | [hhuita/telegram-bot-builder](https://github.com/hhuita/telegram-bot-builder) | Web service |
| Postgres-QrUo | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | telegram-bot-builder-_E3U | 5000 |
| `TELEGRAM_BOT_TOKEN` | telegram-bot-builder-_E3U | (secret) |
| `TELEGRAM_CLIENT_SECRET` | telegram-bot-builder-_E3U | (secret) |
| `VITE_TELEGRAM_BOT_USERNAME` | telegram-bot-builder-_E3U | (secret) |
| `POSTGRES_DB` | Postgres-QrUo | postgres |
| `POSTGRES_USER` | Postgres-QrUo | (secret) |
| `POSTGRES_PASSWORD` | Postgres-QrUo | (secret) |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, Jinja, Python, CSS, JavaScript, PowerShell, Batchfile, Shell, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/fortunate-achievement)
