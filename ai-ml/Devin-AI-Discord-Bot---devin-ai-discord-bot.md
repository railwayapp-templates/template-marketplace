# Deploy Devin AI — Discord Bot on Railway

Deploy Devin, your friendly AI software engineer, directly into Discord.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/devin-ai-discord-bot)

## About

A self-hosted Discord bot that integrates with the Devin AI API. Start autonomous coding sessions, review PRs, write tests, and fix bugs directly from Discord using slash commands or @mentions.

Devin Discord Bot brings AI-powered autonomous coding to your Discord workspace. Deploy the bot as a persistent service on Railway, connect it to your Devin AI account, and let your team start coding sessions without leaving Discord. The bot manages real-time session polling, thread-based conversations, PostgreSQL-backed session persistence, and color-coded status updates—all self-hosted under your control.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Devin AI | `wgtechlabs/devin-discord-bot` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `LOG_LEVEL` | Devin AI | info | Application Log Level (debug | info | warn | error) |
| `DATABASE_URL` | Devin AI | - | PostgreSQL Database Connection String |
| `DEVIN_ORG_ID` | Devin AI | - | Devin Organization ID (format: org_...) |
| `DEVIN_API_KEY` | Devin AI | (secret) | Devin API Key (format: cog_...) |
| `DISCORD_BOT_TOKEN` | Devin AI | (secret) | Discord Bot Token |
| `DISCORD_CLIENT_ID` | Devin AI | - | Discord Application Client ID |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/devin-ai-discord-bot)
