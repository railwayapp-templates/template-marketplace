# Deploy green-vast on Railway

Kalshi auto-trader with dashboard. Use your own API keys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/green-vast)

## About

Kalshi Trading Bot is an automated market scanner and trader with a web dashboard. Connect your own Kalshi API keys, scan prediction markets for positive-EV opportunities, and trade with configurable risk limits.

You deploy one Railway service from this repository. Railway builds the Docker image, runs the FastAPI app, and serves the dashboard over HTTPS. Each user supplies their own Kalshi API credentials — you never share keys between accounts. The bot starts in dry-run mode by default for safe testing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kalshi-trading-bot | [universalLaw91/kalshi-trading-bot](https://github.com/universalLaw91/kalshi-trading-bot) | Worker |

**Category:** Bots · **Languages:** Python, JavaScript, HTML, CSS, PowerShell, Batchfile, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/green-vast)
