# Deploy Freqtrade on Railway

Self-hosted crypto trading bot with FreqUI, dry-run defaults, Kraken

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/freqtrade)

## About

Deploy with one click. On first boot the container seeds `/freqtrade/user_data` with a strategy skeleton and a safe default config (spot market, Kraken USD pairs, dry-run wallet of 1000 USD), then starts trading in dry-run mode. Persistent data (config, strategies, SQLite trade database, logs) lives on a Railway volume at `/freqtrade/user_data`.

- Single service, official `freqtradeorg/freqtrade:2026.8` image — no source build
- Persistent Railway volume at `/freqtrade/user_data` (config, strategies, trades DB, logs)
- FreqUI + REST API served on port 8080 with HTTP basic auth (change the defaults!)
- All config values overridable via `FREQTRADE__` env vars (double underscore = nesting)
- Health-checked at `/api/v1/ping` (unauthenticated API endpoint)
- Runs in dry-run (paper trading) mode by default — no exchange keys needed

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| freqtrade | [INAPP-Mobile/freqtrade](https://github.com/INAPP-Mobile/freqtrade) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP server port. Must stay 8080 — it matches the Railway domain target port configured in this template. |
| `FREQTRADE__DRY_RUN` | true | Paper trading mode — simulated orders, no real funds. Keep true until your strategy is proven. |
| `FREQTRADE__STRATEGY` | SampleStrategy | Strategy class name from user_data/strategies/. Replace with your own strategy once uploaded via FreqUI or git. |
| `FREQTRADE__EXCHANGE__KEY` | - | Exchange API key — live trading only. Leave empty for dry-run paper trading. |
| `FREQTRADE__EXCHANGE__NAME` | kraken | CCXT exchange id (kraken, binance, kucoin, gate, okx...). Kraken default works worldwide including US; binance is geo-blocked on some hosts. |
| `FREQTRADE__TELEGRAM__TOKEN` | (secret) | Telegram bot token from @BotFather. Required when Telegram is enabled. |
| `FREQTRADE__EXCHANGE__SECRET` | (secret) | Exchange API secret — live trading only. Leave empty for dry-run paper trading. |
| `FREQTRADE__TELEGRAM__CHAT_ID` | - | Your Telegram chat id for bot notifications. Required when Telegram is enabled. |
| `FREQTRADE__TELEGRAM__ENABLED` | false | Enable the Telegram control bot to manage your bot from chat. |
| `FREQTRADE__API_SERVER__PASSWORD` | (secret) | Password for the FreqUI web interface and REST API (min 8 chars). Auto-generated per deployment — log in at / with username 'freqtrader'. |
| `FREQTRADE__API_SERVER__USERNAME` | (secret) | Username for the FreqUI web interface and REST API. Log in at / with this username and FREQTRADE__API_SERVER__PASSWORD. |
| `FREQTRADE__API_SERVER__WS_TOKEN` | (secret) | Token for the FreqUI WebSocket connection (min 32 chars). Auto-generated per deployment. |
| `FREQTRADE__API_SERVER__JWT_SECRET_KEY` | (secret) | Secret used to sign API auth tokens (min 32 chars). Auto-generated per deployment. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/freqtrade/user_data`

**Category:** Bots · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/freqtrade)
