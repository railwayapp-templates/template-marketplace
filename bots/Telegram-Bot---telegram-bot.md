# Deploy Telegram Bot on Railway

Launch your Telegram bot with an admin UI, then make the code your own.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/telegram-bot)

## About

Telegram Bot Studio is a ready-to-use Telegram bot with a built-in web dashboard for managing commands, replies, media responses, and reply keyboards without editing code.

This template deploys the bot together with PostgreSQL, so user data and dynamic commands are stored persistently. Developers can also customize the source code later by ejecting the upstream repository and modifying the bot, FastAPI dashboard, handlers, integrations, or business logic.

This template deploys two connected services:

* **Telegram Bot Studio** — runs the Telegram bot and password-protected administration dashboard
* **PostgreSQL** — stores bot users and dynamic command configuration

The bot uses Telegram long polling, while the administration panel runs in the same application process and is exposed through Railway's public HTTPS domain.

PostgreSQL is connected automatically through Railway private networking. Database migrations run automatically when the application starts, so there is no manual database initialization step required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| telegram-bot-studio | [codestorm-official/telegram-bot-studio](https://github.com/codestorm-official/telegram-bot-studio) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | telegram-bot-studio | 8080 | Railway public service port for Telegram Bot Studio |
| `BOT_TOKEN` | telegram-bot-studio | (secret) | Required: Telegram bot token generated from @BotFather |
| `LOG_LEVEL` | telegram-bot-studio | INFO | Application logging level |
| `DATABASE_URL` | telegram-bot-studio | - | PostgreSQL connection for users and dynamic commands |
| `PANEL_PASSWORD` | telegram-bot-studio | (secret) | Strong generated dashboard password |
| `PANEL_USERNAME` | telegram-bot-studio | (secret) | Username for accessing the Telegram Bot Studio dashboard |
| `PANEL_SECRET_KEY` | telegram-bot-studio | (secret) | Persistent secret used to sign panel sessions |
| `PANEL_SECURE_COOKIE` | telegram-bot-studio | true | Require secure HTTPS session cookies |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots · **Languages:** Python, CSS, HTML, Dockerfile, Mako, Shell

[View on Railway →](https://railway.com/deploy/telegram-bot)
