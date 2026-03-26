# Deploy magistery-bot on Railway

Telegram trading bot for Magistery prediction markets

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/magistery-bot)

## About

Magistery Bot is a Telegram trading bot for the Magistery prediction market protocol. Operators deploy their own instance. Users trade prediction markets, deposit and withdraw via TON, and copy trade, all through Telegram chat commands.

One-click deploy gives you a running Telegram bot connected to a Postgres database. Set your Telegram bot token, wallet seed, and RPC endpoint. The bot handles everything else: market mirroring from Polymarket, order matching, bridging between TON and Polygon, settlement, and copy trading. The included Postgres database stores users, orders, and market state. The bot runs a background keeper loop that processes trades, polls resolutions, and settles payouts automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| magistery-bot | [0xMagistery/magistery-bot](https://github.com/0xMagistery/magistery-bot) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `RPC_URL` | magistery-bot | - | Polygon RPC endpoint (Alchemy, Infura, etc.) |
| `DATABASE_URL` | magistery-bot | - | Postgres connection string |
| `OPERATOR_SEED` | magistery-bot | - | BIP-39 mnemonic (12 words) |
| `LAYERSWAP_API_KEY` | magistery-bot | (secret) | From layerswap.io |
| `TELEGRAM_BOT_TOKEN` | magistery-bot | (secret) | From @BotFather on Telegram |
| `OPERATOR_TELEGRAM_ID` | magistery-bot | - | Your Telegram user ID — enables /resolve, /newmarket |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/magistery-bot)
