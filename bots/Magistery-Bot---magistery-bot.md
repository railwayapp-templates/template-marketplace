# Deploy Magistery Bot on Railway

One-click deploy of the Magistery Telegram prediction market bot.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/magistery-bot)

## About

Magistery Bot is an open-source Telegram trading bot for prediction markets built on the Magistery protocol (Polygon). Operators deploy their own instance to run prediction markets in any Telegram group with USDC settlement.

Magistery Bot requires a PostgreSQL database (included in this template), a Polygon RPC endpoint, and API keys for Telegram and LayerSwap bridging. Once deployed, the bot runs a background keeper loop that handles order matching, market resolution, settlement, and TON bridging automatically. No manual intervention needed after setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| magistery-bot | [0xMagistery/magistery-bot](https://github.com/0xMagistery/magistery-bot) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `RPC_URL` | magistery-bot | - | Polygon RPC endpoint. Get one free at alchemy.com — create an app on Polygon mainnet and copy the HTTPS URL. |
| `NODE_ENV` | magistery-bot | production | - |
| `OPERATOR_SEED` | magistery-bot | - | BIP-39 mnemonic phrase (12 or 24 words). This derives all user wallets. Keep it secret. |
| `LAYERSWAP_API_KEY` | magistery-bot | (secret) | API key from layerswap.io. Sign up, go to Developer tab, create an API key. Required for TON bridging. |
| `TELEGRAM_BOT_TOKEN` | magistery-bot | (secret) | Token from Telegram BotFather. Open Telegram, message @BotFather, send /newbot, copy the token. |
| `OPERATOR_TELEGRAM_ID` | magistery-bot | - | Your numeric Telegram user ID. Message @userinfobot on Telegram to get it. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/magistery-bot)
