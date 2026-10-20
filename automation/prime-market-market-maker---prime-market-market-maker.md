# Deploy prime-market-market-maker on Railway

Automated market maker for Polymarket.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prime-market-market-maker)

## About

PrimeMarket MM Bot is an automated market maker for Polymarket prediction markets. It offers to buy a little below the current price and sell a little above it across several markets at once, earning the gap when other traders take both sides. Every install starts in practice mode, trading a simulated balance against the real markets, and needs a license key to trade live.

The bot is a single always-on service from a public Docker image. It serves a password-protected web dashboard on its public URL and keeps its settings, encrypted wallet key and profit history on a Railway volume mounted at /app/data, so nothing is lost on redeploys or updates. After deploying, open the URL, log in with the dashboard password you chose, and a setup page connects your Polymarket account and saves everything; there is nothing to copy back into Railway. Updates are a redeploy, and the dashboard tells you when one is available.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PrimeMarket MM Bot | `ghcr.io/git-gizmo/prime-market:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LICENSE_KEY` | - | Your PrimeMarket license key. Copy it from your Whop orders page: whop.com/@me/settings/orders. Without it the bot runs in practice mode only. |
| `SETTINGS_SECRET` | (secret) | Generated automatically. Leave it as it is. It encrypts the wallet key saved on your volume, so you can change your dashboard password later without setting up again. |
| `DASHBOARD_PASSWORD` | (secret) | Choose a password for your bot's dashboard. Keep it safe: it protects the dashboard and encrypts the wallet key you save during setup. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/prime-market-market-maker)
