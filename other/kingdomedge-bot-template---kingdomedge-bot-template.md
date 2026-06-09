# Deploy kingdomedge-bot-template on Railway

Self-hosted trading bot. TradingView signals -> Alpaca bracket orders.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kingdomedge-bot-template)

## About

This is KingdomEdge Algo's self-hosted trading bot. It receives webhook signals from the KingdomEdge SETS Trade indicator on TradingView, runs eight pre-trade risk checks (kill switch, daily loss cap, position size limit, trading hours window, cooldown, etc.), and places Alpaca bracket orders with up to three take-profit targets. You own the Alpaca broker keys; KingdomEdge never sees them.

Deploy in roughly five minutes with the button below. Railway will prompt you for three required environment variables — WEBHOOK_SECRET (a 32-character random string you generate locally), ALPACA_API_KEY and ALPACA_API_SECRET (paper-trading keys from app.alpaca.markets) — and three optional ones with safe defaults (ALPACA_PAPER=true, QUANTITY_OVERRIDE=1, SENTRY_DSN). Once deployed, copy the Railway service URL into your TradingView SETS Trade alert's webhook URL, paste the matching secret into the alert's JSON message under the "secret" field, and your signals will route through the bot end-to-end. Monthly cost is roughly five dollars on Railway's Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kingdomedge-bot-template | [markjramos2009/kingdomedge-bot-template](https://github.com/markjramos2009/kingdomedge-bot-template) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SENTRY_DSN` | - | Optional Sentry DSN for error tracking. Skip if you don't have a Sentry account. Get yours at sentry.io -> your project -> Settings -> Client Keys (DSN). |
| `ALPACA_PAPER` | true | Set "true" for paper trading (recommended for the first 30 days). Set "false" for live trading. Only switch to live after you've watched the bot's bracket behavior in paper for at least a month and you trust the structure. |
| `ALPACA_API_KEY` | (secret) | Your Alpaca paper API key (starts with PK). Get from app.alpaca.markets -> API Keys -> Generate New Keys. The API key shows in plaintext; the secret only shows ONCE - save both immediately in a password manager. |
| `WEBHOOK_SECRET` | (secret) | 32-character random string. Generate locally with: openssl rand -hex 32 (Mac/Linux) or PowerShell -join ((48..57)+(65..90)+(97..122) | Get-Random -Count 32 | %{[char]$_}). Save in a password manager. Paste the SAME secret into your TradingView alert's webhook JSON message under the "secret" field. |
| `ALPACA_API_SECRET` | (secret) | Your Alpaca paper API secret. Save in a password manager - Alpaca only displays it once at generation. Pair with ALPACA_API_KEY above. |
| `QUANTITY_OVERRIDE` | 1 | Shares/contracts per trade. Recommended: 1 for the first 2 weeks of live trading so you can observe the bracket structure on small size before sizing up. Leave at 1 if unsure. |

**Category:** Other · **Languages:** Python, Procfile

[View on Railway →](https://railway.com/deploy/kingdomedge-bot-template)
