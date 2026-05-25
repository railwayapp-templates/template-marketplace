# Deploy calm-deep on Railway

Deploy and Host calm-deep with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calm-deep)

## About

DarkPulse Bot is a Discord bot built for Torn City company management. It tracks employee activity, available trains, stock levels, salaries, and runs weekly lotteries — all automated and connected to the Torn API.

Hosting DarkPulse Bot on Railway runs a persistent Python process that connects to both Discord and the Torn City API. The bot checks trains every 30 minutes, sends daily dashboards, monitors employee activity, alerts on low stock, reminds the director to pay salaries, and automatically runs a weekly lottery every Sunday — all without any manual intervention. Environment variables keep all sensitive credentials secure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bot-discord | [Zeussh123/bot-discord](https://github.com/Zeussh123/bot-discord) (branch: new) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TRAIN_PRICE` | 200000 |
| `CHANNEL_LOGS` | 1508272305271476264 |
| `DIRECTOR_XID` | Zeussh [4268037] |
| `TORN_API_KEY` | (secret) |
| `DISCORD_TOKEN` | (secret) |
| `CHANNEL_STOCKS` | 1508277460230209707 |
| `CHANNEL_TIRAGE` | 1508277539305689219 |
| `CHANNEL_GENERAL` | 1508186511252656130 |
| `STOCK_ALERT_DAYS` | 2 |
| `CHANNEL_CANDIDATURES` | 1508277321600077854 |

**Category:** Other · **Languages:** Python

[View on Railway →](https://railway.com/deploy/calm-deep)
