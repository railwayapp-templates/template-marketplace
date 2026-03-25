# Deploy vektora-bot-template on Railway

Deploy and Host vektora-bot-template with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vektora-bot-template)

## About

Vektora Auto-Trade Bot connects to the Vektora signal server via WebSocket, receives algo-powered crypto trading signals, and automatically
  executes Binance USD-M futures trades with stop-loss protection. No trading experience required — just deploy and go.

  ## About Hosting vektora-bot-template

  The bot runs as a lightweight Python service on Railway. It connects to the Vektora signal server to receive real-time direction signals for 18
  crypto pairs, then executes trades on your Binance futures account via a secure proxy. Your Binance API keys stay in your own Railway instance —
   Vektora never stores them. The bot handles position sizing, stop-loss placement, and automatic position flipping when signals change direction.

  ## Common Use Cases

  - Automated 24/7 crypto futures trading without manual monitoring
  - Hands-free execution of backtested algo signals across 18 symbols
  - Paper-to-live transition after validating performance on Vektora's live paper trading dashboard

  ## Dependencies for vektora-bot-template Hosting

  - A Vektora Auto-Trade subscription ($99/mo) — provides your signal API key
  - A Binance account with Futures enabled and an API key (whitelist IP 208.77.246.15)

  ### Deployment Dependencies

  - [Vektora](https://vektora.trade) — Subscribe and get your signal API key
  - [Binance](https://www.binance.com) — Create an API key with Futures permission, whitelist IP 208.77.246.15

  ## Why Deploy vektora-bot-template on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with
  configuration, while allowing you to vertically and horizontally scale it.

  By deploying vektora-bot-template on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host
  your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vektora-bot | [twahidin/vektora-bot](https://github.com/twahidin/vektora-bot) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BINANCE_KEY` | - | Your Vektora signal API key (from email after purchase)   |
| `BINANCE_SECRET` | (secret) |  Your Binance API key (Futures enabled) |
| `SIGNAL_API_KEY` | (secret) | Your Binance API secre |

**Category:** Other · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/vektora-bot-template)
