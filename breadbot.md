# Deploy Breadbot on Railway

Automated crypto trading bot. Scans Solana & Base 24/7.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/breadbot)

## About

Breadbot is an automated crypto trading bot that scans Solana and Base chain tokens 24/7, monitors stablecoin yields, and delivers Telegram alerts with trade recommendations. No coding required.

Breadbot runs as a single service on Railway, connecting to your exchange accounts and Telegram bot. All credentials are stored as environment variables — never hardcoded or shared. The bot scans every 5 minutes and sends alerts directly to your phone.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| breadbot-deploy | [getbreadbot/breadbot-deploy](https://github.com/getbreadbot/breadbot-deploy) | Worker |

**Category:** Other · **Languages:** Python, HTML, JavaScript, CSS, Shell, Dockerfile

[View on Railway →](https://railway.com/template/breadbot)
