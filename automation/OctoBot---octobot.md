# Deploy OctoBot on Railway

Trading bot that runs crypto strategies on your exchange accounts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/octobot)

## About

OctoBot is a free, open-source cryptocurrency trading bot that runs your strategy around the clock on your own exchange accounts. You pick a strategy — a grid, dollar-cost averaging, a crypto basket, a technical-analysis setup, a TradingView alert handler or an LLM-driven mode — configure it in a visual dashboard, test it on historical data, and let it place the orders. Developed in Python since 2018 by Drakkar-Software, it ships under GPL-3.0 and reaches Binance, Coinbase, Kraken, Hyperliquid, MEXC, OKX, Bybit, KuCoin and more through CCXT. Your API keys stay inside your own deployment.

This template runs OctoBot's self-contained web interface as a single Railway service, `octobot`, built from the [gridalpha/octobot-railway](https://github.com/gridalpha/octobot-railway) source repository on top of the official `drakkarsoftware/octobot:stable` image. One Railway volume at `/octobot/data` holds everything that must survive a redeploy: your configuration, the exchange credentials OctoBot encrypts, the installed strategy packages ("tentacles") and the SQLite trade and portfolio history. To self-host OctoBot this way you need no database, cache or object storage. The service gets a public HTTPS domain, and the dashboard behind it is password-protected from the first boot.

![Diagram of the single OctoBot service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789371251/octobot-architecture.webp)

A trading bot has to be online when the market moves, which is exactly when a laptop is closed. Self-hosting solves that and keeps your API keys and your strategy private — hosted bot services hold both.

- **Profiles** — a strategy as one switchable unit: trading mode, evaluators, pairs, exchanges, risk, starting portfolio
- **Trading modes** — grid, trailing grid, DCA, smart DCA, index/basket, arbitrage, signal, market making, TradingView, technical-analysis
- **AI trading** — an OpenAI-compatible mode that can point at a local Ollama server, so the model never leaves your infrastructure
- **Backtesting** — replay a profile over months of candles, with a profitability report
- **Paper trading** — a virtual portfolio running the same strategy, no money at risk
- **Interfaces** — the web dashboard, an optional Telegram bot, a TradingView webhook

The architecture is deliberately small: state lives in SQLite on the volume, so there is one service and one thing to back up. Tentacles are cached there after the first boot, so later deploys start in seconds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| octobot | [gridalpha/octobot-railway](https://github.com/gridalpha/octobot-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5001 | Web interface port and healthcheck target |
| `OCTOBOT_WEB_PASSWORD` | (secret) | Web dashboard password, required |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/octobot/data`

**Category:** Automation · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/octobot)
