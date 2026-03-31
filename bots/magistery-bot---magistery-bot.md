# Deploy magistery-bot on Railway

Deploy your own Telegram prediction market bot. Earn on every trade.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/magistery-bot)

## About

Magistery Bot is a self-hosted Telegram trading bot built on the Magistery prediction market protocol. Operators deploy their own instance, set a fee on bets, and earn on every order placed. Users trade active Polymarket markets copied onto Magistery on demand, with USDT deposits on TON, background settlement, and copy trading.

Deploying Magistery Bot on Railway requires a Telegram bot token, an operator seed phrase, a Polygon RPC endpoint, a LayerSwap API key for TON USDT bridging, and your Telegram user ID for operator commands. The template includes a PostgreSQL database. On startup, the bot migrates the database, derives its service wallet from the operator seed, and if no OperatorResolver is configured, creates one on Polygon via the factory (requires a small amount of POL for gas). After deploy, message your bot and run /setup to configure fees, categories, and branding. Once running, the bot syncs Polymarket markets, derives custodial per-user wallets from the operator seed, places and matches orders on Magistery, and runs background jobs for matching, bridging, resolution, and settlement.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| 0xmagistery/bot-source:latest | `ghcr.io/0xmagistery/bot-source:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `RPC_URL` | 0xmagistery/bot-source:latest | - | Polygon RPC endpoint. Free from alchemy.com or infura.io |
| `DATABASE_URL` | 0xmagistery/bot-source:latest | - | PostgreSQL connection string (auto-configured from Railway Postgres) |
| `OPERATOR_SEED` | 0xmagistery/bot-source:latest | - | 12-word BIP-39 mnemonic - derives all wallets. Generate at iancoleman.io/bip39 |
| `LAYERSWAP_API_KEY` | 0xmagistery/bot-source:latest | (secret) | API key from layerswap.io dashboard. Required for TON deposits/withdrawals |
| `TELEGRAM_BOT_TOKEN` | 0xmagistery/bot-source:latest | (secret) | Bot token from @BotFather on Telegram |
| `OPERATOR_TELEGRAM_ID` | 0xmagistery/bot-source:latest | - | Your Telegram numeric ID. Message @userinfobot to get it |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/magistery-bot)
