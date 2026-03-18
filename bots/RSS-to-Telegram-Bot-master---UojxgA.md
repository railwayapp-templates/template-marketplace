# Deploy RSS to Telegram Bot (master) on Railway

A Telegram RSS bot that cares about your reading experience

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/UojxgA)

## About

Note: This is the latest **stable** version, which **may be outdated**. It is recommended to deploy the [**dev**](https://railway.app/template/1_Wcri?referralCode=PEOFMi) version.
GitHub repository: https://github.com/Rongronggg9/RSS-to-Telegram-Bot

## Preparation

1. Turn to [@BotFather](https://t.me/BotFather), send `/newbot` create a new bot, then get its token (env variable: `TOKEN`). After that, send `/setinline`, select your bot, and reply with an inline placeholder you like to enable inline mode for your bot. For example, [@RSStT_Bot](https://t.me/RSStT_Bot) is using `Please input a command to continue...`.
2. Turn to [@userinfobot](https://t.me/userinfobot) to get your user ID (env variable: `MANAGER`).
3. [Get Telegraph API access tokens](https://api.telegra.ph/createAccount?short_name=RSStT&author_name=Generated%20by%20RSStT&author_url=https%3A%2F%2Fgithub.com%2FRongronggg9%2FRSS-to-Telegram-Bot) (env variable: `TELEGRAPH_TOKEN`). Refresh the page every time you get a new token. If you have a lot of subscriptions, make sure to get at least 5 tokens.

For more details, refer to the [deployment guide](https://github.com/Rongronggg9/RSS-to-Telegram-Bot/blob/dev/docs/deployment-guide.md).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| RSS-to-Telegram-Bot | [Rongronggg9/RSS-to-Telegram-Bot/tree/master](https://github.com/Rongronggg9/RSS-to-Telegram-Bot/tree/master) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `TOKEN` | RSS-to-Telegram-Bot | (secret) | Your bot token |
| `MANAGER` | RSS-to-Telegram-Bot | - | Your Telegram user ID |
| `MULTIUSER` | RSS-to-Telegram-Bot | - | If set to 0, only the manager can use the bot |
| `DATABASE_URL` | RSS-to-Telegram-Bot | - | Please keep the default value as is |
| `TELEGRAPH_TOKEN` | RSS-to-Telegram-Bot | (secret) | To enable sending via Telegraph, you need to set this |
| `DATABASE_PUBLIC_URL` | RSS-to-Telegram-Bot | - | Please keep the default value as is |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots · **Languages:** Python, Dockerfile, Procfile

[View on Railway →](https://railway.com/deploy/UojxgA)
